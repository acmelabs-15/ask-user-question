#!/usr/bin/env bun
/**
 * Real-skill trigger measurement.
 *
 * Measures whether an INSTALLED skill wins the queries it should and loses the
 * ones it should not, against its real neighbours. Differs from skill-creator's
 * run-loop.ts in one decisive way, and everything else follows from it:
 *
 *   run-loop.ts installs a synthetic stub in <projectRoot>/.claude/commands/ and
 *   asks whether the router picks THE STUB. Isolating that stub requires the real
 *   skill to be absent -- which, for a plugin-bundled skill, means disabling the
 *   whole plugin and therefore every sibling it ships with. The measurement then
 *   answers "does a lone stub attract these queries in an empty room", when the
 *   question worth answering is "does this skill beat its actual competitors".
 *
 * This runner asks the router directly and reads which skill it chose. Consequences:
 *
 *   - No stub files, so nothing leaks into a real project on interrupt and
 *     concurrent workers cannot shadow one another.
 *   - No config mutation. Nothing is disabled to make room.
 *   - A miss reports WHICH skill won, so a false negative is diagnostic rather
 *     than a tally.
 *   - `--max-turns 1` bounds each call. Triggering IS the first tool call, so
 *     later turns cannot change the verdict; measured 34s -> 16s per call.
 *
 * Reused from skill-creator so the numbers stay comparable: the stratified,
 * seeded train/holdout split, the concurrency pool, and the trigger-rate
 * threshold semantics (a query counts as triggering at rate >= threshold).
 */

/**
 * Borrowed from skill-creator so the numbers stay comparable with RESULTS-baseline.json.
 *
 * The path is absolute and machine-specific, which means this file does not run on a fresh
 * clone. That is deliberate rather than an oversight, and the failure is made loud on purpose:
 * reimplementing the split locally would change which queries land in the holdout, and every
 * number in RESULTS-baseline.json would stop being comparable without anything reporting that
 * it had. A loud import error is cheaper than a quiet incomparability.
 *
 * Override the location with SKILL_CREATOR_DIR if your checkout lives elsewhere.
 */
const SKILL_CREATOR =
  process.env.SKILL_CREATOR_DIR ?? "/Users/peter.kloss/Dev/ACMElabs/skill-creator";

import { progress } from "../lib/progress.ts";

let mapWithConcurrency: <T, R>(items: readonly T[], limit: number, fn: (item: T, i: number) => Promise<R>) => Promise<R[]>;
let splitEvalSet: <T>(set: readonly T[], holdout: number) => [T[], T[]];
try {
  ({ mapWithConcurrency } = await import(`${SKILL_CREATOR}/skills/skill-creator/scripts/lib/pool.ts`));
  ({ splitEvalSet } = await import(`${SKILL_CREATOR}/skills/skill-creator/scripts/run-loop.ts`));
} catch (e) {
  console.error(`
This runner needs skill-creator for its concurrency pool and its seeded train/holdout split.
Looked in: ${SKILL_CREATOR}

  export SKILL_CREATOR_DIR=/path/to/skill-creator

Why it is not vendored: the split decides which queries land in the holdout, and a local
reimplementation would silently make every number in RESULTS-baseline.json incomparable. The
composition evals in evals/composition/ are self-contained and need none of this.

Original error: ${e instanceof Error ? e.message : String(e)}
`);
  process.exit(2);
}

interface EvalItem {
  readonly query: string;
  readonly should_trigger: boolean;
}

/** What the router did with one query. */
interface Probe {
  /** The skill the router invoked, e.g. "skills:defrag". Null when it called no skill. */
  readonly chosenSkill: string | null;
  /** First tool called at all, e.g. "Bash". Null when it answered directly. */
  readonly firstTool: string | null;
  readonly elapsedMs: number;
  readonly failed?: string;
}

/**
 * The plugin-qualified skill name to score as a hit.
 *
 * Parameterised rather than hardcoded because extracting this skill into its own
 * plugin changes the qualified name, and a stale constant here does not error:
 * every comparison simply misses and the run reports a 0 percent trigger rate.
 * That reads as a total description failure and sends you hunting a bug that does
 * not exist.
 *
 * Override with --target, or TRIGGER_TARGET in the environment.
 */
const TARGET =
  (() => {
    const flag = process.argv.indexOf("--target");
    if (flag !== -1 && process.argv[flag + 1]) return process.argv[flag + 1];
    return process.env.TRIGGER_TARGET ?? "ask-user-question:ask-user-question";
  })();

/**
 * Does the router's chosen skill name refer to the skill under test?
 *
 * Compared on the LAST path segment rather than the whole string, because one skill can
 * answer under more than one qualified name and an exact match silently scores every one
 * of them as a miss. Measured twice: a run where the skill won 10 of 10 should-trigger
 * queries scored 4/10 on exact match, because the router answered as
 * `ask-user-question` and as `skills:ask-user-question` in the same run while
 * both copies were installed. A second run, after deduplicating, scored 0/10 for the same
 * reason with the single surviving name.
 *
 * That failure mode is silent and reads exactly like a broken description, which is the
 * expensive part: the obvious response is to rewrite prose that was never at fault.
 */
const tail = (name: string): string => name.split(":").pop() ?? name;
const isTarget = (chosen: string | null): boolean =>
  chosen !== null && tail(chosen) === tail(TARGET);

/**
 * Run one query and report which skill the router reached for.
 *
 * Reads the streaming form because it lets us stop at the first tool block
 * instead of waiting for prose we discard. `CLAUDECODE` is dropped from the
 * environment so a nested `claude -p` is legal inside a Claude Code session.
 */
async function probe(query: string, model: string, timeoutMs: number): Promise<Probe> {
  const started = Date.now();
  const env: Record<string, string> = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (k === "CLAUDECODE" || v === undefined) continue;
    env[k] = v;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const proc = Bun.spawn(
    [
      "claude", "-p", query,
      "--output-format", "stream-json",
      "--verbose",
      "--include-partial-messages",
      "--max-turns", "1",
      "--model", model,
    ],
    { cwd: "/tmp", env, stdin: "ignore", stdout: "pipe", stderr: "ignore", signal: controller.signal },
  );

  let firstTool: string | null = null;
  let pendingSkillJson: string | null = null;
  let buffer = "";

  const finish = (chosen: string | null, failed?: string): Probe => {
    clearTimeout(timer);
    if (!proc.killed) proc.kill("SIGKILL");
    return { chosenSkill: chosen, firstTool, elapsedMs: Date.now() - started, failed };
  };

  try {
    const reader = proc.stdout.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      for (let nl = buffer.indexOf("\n"); nl !== -1; nl = buffer.indexOf("\n")) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line) continue;
        let event: any;
        try { event = JSON.parse(line); } catch { continue; }

        // Fast path: the streaming form names the tool before its input arrives,
        // then streams the input as JSON fragments. For a Skill call we need the
        // fragments, because the tool name alone does not say WHICH skill.
        if (event?.type === "stream_event") {
          const se = event.event;
          if (se?.type === "content_block_start" && se.content_block?.type === "tool_use") {
            const name = String(se.content_block.name ?? "");
            firstTool ??= name;
            if (name === "Skill") pendingSkillJson = "";
            else return finish(null);          // routed somewhere that is not a skill
          } else if (se?.type === "content_block_delta" && pendingSkillJson !== null) {
            if (se.delta?.type === "input_json_delta") {
              pendingSkillJson += String(se.delta.partial_json ?? "");
              const m = /"skill"\s*:\s*"([^"]+)"/.exec(pendingSkillJson);
              if (m) return finish(m[1]);
            }
          } else if (se?.type === "message_stop" && pendingSkillJson === null) {
            return finish(null);
          }
          continue;
        }

        // Fallback for hosts that do not emit partial messages.
        if (event?.type === "assistant") {
          for (const block of event.message?.content ?? []) {
            if (block?.type !== "tool_use") continue;
            firstTool ??= String(block.name ?? "");
            if (block.name === "Skill") return finish(String(block.input?.skill ?? "") || null);
            return finish(null);
          }
        }
        if (event?.type === "result") return finish(null);
      }
    }
    return finish(null);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return finish(null, controller.signal.aborted ? `timeout after ${timeoutMs}ms` : message);
  }
}

interface QueryResult {
  readonly query: string;
  readonly shouldTrigger: boolean;
  readonly triggers: number;
  readonly runs: number;
  readonly rate: number;
  readonly passed: boolean;
  /** Which skills won instead, counted. Only interesting when we lost. */
  readonly wonBy: Record<string, number>;
  readonly meanMs: number;
  readonly failures: readonly string[];
}

function score(results: readonly QueryResult[]) {
  const positives = results.filter((r) => r.shouldTrigger);
  const negatives = results.filter((r) => !r.shouldTrigger);
  const tp = positives.filter((r) => r.passed).length;
  const tn = negatives.filter((r) => r.passed).length;
  const fn = positives.length - tp;
  const fp = negatives.length - tn;
  const precision = tp + fp === 0 ? 1 : tp / (tp + fp);
  const recall = positives.length === 0 ? 1 : tp / positives.length;
  return {
    correct: tp + tn,
    total: results.length,
    accuracy: results.length === 0 ? 0 : (tp + tn) / results.length,
    precision,
    recall,
    f1: precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall),
    truePositives: tp, falseNegatives: fn, trueNegatives: tn, falsePositives: fp,
  };
}

const args = process.argv.slice(2);
const flag = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : (args[i + 1] ?? fallback);
};

const evalSetPath = flag("eval-set", "");
if (!evalSetPath) {
  console.error("usage: bun trigger-runner.ts --eval-set <path> [--model opus] [--runs 3] [--workers 6] [--holdout 0.4] [--threshold 0.5] [--timeout 180] [--out <dir>]");
  process.exit(2);
}
const model = flag("model", "opus");
const runsPerQuery = Number(flag("runs", "3"));
const workers = Number(flag("workers", "6"));
const holdout = Number(flag("holdout", "0.4"));
const threshold = Number(flag("threshold", "0.5"));
/**
 * 180s, matching run-eval.ts, and NOT the 90 this used to be.
 *
 * A timeout here returns chosenSkill null, and the scorer counts only probes the target
 * won -- so a slow call is recorded as "the skill did not fire". skill-creator hit this
 * and wrote the measurement down: calls up to 124s, against a ceiling that was then 30.
 * 124 is from their sweep rather than this one, and `--max-turns 1` makes these probes
 * much shorter (16s mean, measured), but a mean says nothing about the tail and the tail
 * is what a timeout cuts. 90 sat below a number someone had already observed.
 *
 * The cost of setting it too high is a wedged child holding a worker slot. The cost of
 * setting it too low is a false negative that looks like a real one.
 */
const timeoutMs = Number(flag("timeout", "180")) * 1000;
const outDir = flag("out", "");

const evalSet: EvalItem[] = JSON.parse(await Bun.file(evalSetPath).text());
const [trainSet, testSet] = splitEvalSet(evalSet, holdout);

console.error(`Target skill: ${TARGET}`);
console.error(`${evalSet.length} queries x ${runsPerQuery} runs, ${workers} workers, model=${model}`);
console.error(`Split: ${trainSet.length} train, ${testSet.length} held-out (holdout=${holdout}, seed=42)\n`);

const attempts = evalSet.flatMap((item) => Array.from({ length: runsPerQuery }, () => item));
const bar = progress(attempts.length, "trigger ");
const probes = await mapWithConcurrency(attempts, workers, async (item) => {
  const result = await probe(item.query, model, timeoutMs);
  // + target won this probe, . another skill did, ! the subprocess failed. Tallied
  // beside the bar so a run that is failing shows it at 20% rather than in the report.
  bar.tick(result.failed ? "!" : isTarget(result.chosenSkill) ? "+" : ".");
  return { item, result };
});
bar.done();

const byQuery = new Map<string, { item: EvalItem; results: Probe[] }>();
for (const { item, result } of probes) {
  const entry = byQuery.get(item.query) ?? { item, results: [] };
  entry.results.push(result);
  byQuery.set(item.query, entry);
}

const results: QueryResult[] = [...byQuery.values()].map(({ item, results }) => {
  const triggers = results.filter((r) => isTarget(r.chosenSkill)).length;
  const rate = triggers / results.length;
  const triggered = rate >= threshold;
  const wonBy: Record<string, number> = {};
  for (const r of results) {
    if (isTarget(r.chosenSkill)) continue;
    const key = r.chosenSkill ?? (r.firstTool ? `(${r.firstTool}, no skill)` : "(answered directly)");
    wonBy[key] = (wonBy[key] ?? 0) + 1;
  }
  return {
    query: item.query, shouldTrigger: item.should_trigger,
    triggers, runs: results.length, rate,
    passed: triggered === item.should_trigger,
    wonBy, meanMs: Math.round(results.reduce((a, r) => a + r.elapsedMs, 0) / results.length),
    failures: results.filter((r) => r.failed).map((r) => r.failed as string),
  };
});

const trainQueries = new Set(trainSet.map((i) => i.query));
const trainResults = results.filter((r) => trainQueries.has(r.query));
const testResults = results.filter((r) => !trainQueries.has(r.query));

const report = (label: string, subset: readonly QueryResult[]) => {
  const s = score(subset);
  console.log(`## ${label}\n`);
  console.log(`${s.correct}/${s.total} correct — accuracy ${(100 * s.accuracy).toFixed(1)}%, precision ${(100 * s.precision).toFixed(0)}%, recall ${(100 * s.recall).toFixed(0)}%, F1 ${s.f1.toFixed(2)}`);
  console.log(`TP ${s.truePositives}  FN ${s.falseNegatives}  TN ${s.trueNegatives}  FP ${s.falsePositives}\n`);
  console.log("| ok | expect | rate | mean | query | won by (when not ours) |");
  console.log("|:--:|:--:|:--:|--:|---|---|");
  for (const r of [...subset].sort((a, b) => Number(a.passed) - Number(b.passed))) {
    const won = Object.entries(r.wonBy).map(([k, n]) => `${k} ×${n}`).join(", ") || "—";
    console.log(`| ${r.passed ? "✓" : "✗"} | ${r.shouldTrigger ? "fire" : "quiet"} | ${r.triggers}/${r.runs} | ${(r.meanMs / 1000).toFixed(0)}s | ${r.query.slice(0, 58).replace(/\|/g, "\\|")}… | ${won} |`);
  }
  console.log();
  return s;
};

console.log(`# Trigger measurement — ${TARGET}\n`);
console.log(`Model \`${model}\`, ${runsPerQuery} runs/query, trigger threshold ${threshold}, seed 42.`);
console.log(`Measures the installed skill against its real neighbours; no stubs, no config changes.\n`);
const trainScore = report("Train", trainResults);
const testScore = report("Held-out", testResults);
const overall = report("All queries", results);

const failures = results.flatMap((r) => r.failures);
if (failures.length) console.log(`**${failures.length} subprocess failure(s)** — first: ${failures[0]}\n`);
const totalSeconds = probes.reduce((a, p) => a + p.result.elapsedMs, 0) / 1000;
console.log(`${attempts.length} calls, ${totalSeconds.toFixed(0)}s of subprocess time, mean ${(totalSeconds / attempts.length).toFixed(1)}s/call.`);

if (outDir) {
  await Bun.write(`${outDir}/trigger-results.json`, JSON.stringify(
    { target: TARGET, model, runsPerQuery, threshold, holdout, seed: 42,
      scores: { train: trainScore, heldOut: testScore, overall }, results }, null, 2));
  console.error(`\nWrote ${outDir}/trigger-results.json`);
}
process.exit(testScore.falsePositives > 0 || testScore.falseNegatives > 0 ? 1 : 0);
