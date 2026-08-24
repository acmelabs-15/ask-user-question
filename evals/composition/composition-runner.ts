#!/usr/bin/env bun
/**
 * Composition measurement: does the skill's CONTENT produce better calls?
 *
 * This is not the trigger harness and the two numbers are not comparable. See
 * evals/README.md for the general rule; the specific split is:
 *
 *   trigger-runner.ts     does the ROUTER reach for this skill?      (routing)
 *   composition-runner.ts do the CALLS get better once it does?      (content)
 *
 * A skill can pass one and fail the other, and the repairs are different: a routing
 * failure is a description problem, a composition failure is a body problem. Reporting
 * one number for both is how a skill ends up with a well-tuned description in front of
 * advice nobody measured.
 *
 * Design decisions worth knowing before you read a result:
 *
 * SKILL CONTENT IS INJECTED, NOT ROUTED TO. The skill arm prepends SKILL.md and EVERY file
 * in `references/`, globbed at the point of use rather than listed, to the prompt rather
 * than relying on the router to load them. That deliberately removes routing from the
 * measurement, because routing is
 * already measured next door and leaving it in makes every composition number a product
 * of two effects. The cost is that this measures the skill's ceiling: what it does when
 * it is definitely read.
 *
 * TWO LAYERS, REPORTED SEPARATELY. checks.ts is deterministic, free and stable, so it
 * is the layer to gate on. The judge is none of those, so it is the layer to read. They
 * are never averaged into one score, because a 0.9/5.0 pair and a 0.5/4.5 pair mean
 * completely different things and a mean hides which one you have.
 *
 * ABSTENTION IS SCORED. Four scenarios have expect_call false, where the correct output
 * is a stated decision and no dialog. An arm that composes beautiful calls for all
 * twelve is worse than one that composes eight and declines four, and a harness that
 * only grades calls cannot see that. This is the measurement most likely to move, because
 * "do not ask" is the skill's least obeyed instruction.
 *
 * SELF-CONTAINED. No imports outside this directory, unlike trigger-runner.ts which
 * borrows the pool and the split from skill-creator. That harness is measuring against a
 * baseline produced by that code and has to keep using it; this one has no baseline to
 * stay comparable with yet, so it takes portability instead.
 */

import { checkCall, scoreFindings, parallelismDiagnostic, type Call, type Finding } from "./checks.ts";
import { progress } from "../lib/progress.ts";

interface Scenario {
  readonly id: string;
  readonly situation: string;
  readonly expect_call: boolean;
  /**
   * Concept tags for what the scenario probes. NOTHING READS THIS.
   *
   * Declared and unused, which is fine as intent and dangerous as data: one entry used to name
   * a retired reference file, so the day someone wires this up they would inherit a name that
   * does not exist. Kept and kept correct rather than deleted.
   */
  readonly probes: readonly string[];
  /**
   * Which references this situation should pull, if disclosure works. Feeds recall at
   * `expectedRefHitRate` and precision at `refPrecision`.
   *
   * An entry naming a file that does not exist can never be hit, so it floors recall while
   * printing a populated column. Every value must be a real basename under `references/`, and
   * the correct value is an empty list wherever the deciding content is in SKILL.md itself --
   * the body is injected, so it produces no `Read`.
   */
  readonly expect_refs?: readonly string[];
  /** Additionally permitted without counting against precision. Not required. */
  readonly allow_refs?: readonly string[];
}

type Arm = "baseline" | "skill" | "disclosed";

interface Attempt {
  readonly scenario: Scenario;
  readonly arm: Arm;
  readonly run: number;
  /** Parsed call, when the model produced one. */
  readonly call: Call | null;
  /** Set when the model correctly declined to ask. */
  readonly declined: boolean;
  readonly declineText: string;
  readonly raw: string;
  readonly findings: readonly Finding[];
  readonly lintScore: number;
  readonly judge: Record<string, number> | null;
  readonly judgeNote: string;
  /** disclosed arm only: reference basenames the agent chose to Read. */
  readonly refsRead: readonly string[];
  readonly elapsedMs: number;
  readonly failed?: string;
}

const args = process.argv.slice(2);
const flag = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : (args[i + 1] ?? fallback);
};
const has = (name: string) => args.includes(`--${name}`);

const skillDir = flag("skill-dir", new URL("../../skills/ask-user-question/", import.meta.url).pathname);
const scenarioPath = flag("scenarios", new URL("./scenario-set.json", import.meta.url).pathname);
const rubricPath = flag("rubric", new URL("./judge-rubric.md", import.meta.url).pathname);
const model = flag("model", "opus");
const judgeModel = flag("judge-model", model);
const runsPer = Number(flag("runs", "3"));
const workers = Number(flag("workers", "4"));
const timeoutMs = Number(flag("timeout", "180")) * 1000;
const outDir = flag("out", "");
const armFilter = flag("arm", "");
const noJudge = has("no-judge");
/**
 * Turn ceiling for the disclosed arm.
 *
 * Not cosmetic. At 10 the deepest engagements were truncated: the five attempts that read the
 * most references (3.0 against 1.3) and ran longest (143s against 78s) hit the ceiling before
 * emitting an answer and scored as unparseable, which silently excluded exactly the runs where
 * disclosure was working best. A ceiling that removes your successes from the sample biases
 * every number computed over the survivors.
 */
const maxTurns = flag("max-turns", "24");

/**
 * Flags that keep every call in this harness out of the operator's own configuration.
 *
 * Verbatim from plugin-kit's helper path, where the pair was measured together; shipping one
 * of the two would ship an arrangement no evidence covers. `--setting-sources project`
 * excludes more than its name promises -- not just project settings, but plugin skills and
 * user-level skills too.
 *
 * Load-bearing HERE for two arms, in opposite directions.
 *
 * The `disclosed` arm decides whether progressive disclosure works by counting `Read` calls.
 * Content served through the skill system produces no Read, so a copy of this skill visible
 * to the loader floors `refsRead`, reference recall, precision and `refCounts` together, and
 * the arm reports that disclosure does not work when what failed was the measurement. Same
 * void signature the disclosure targets gate against; the injection the `skill` arm relies on
 * never covered this arm.
 *
 * The `baseline` arm is the no-guidance control. A visible copy puts this skill in front of
 * the very runs that define zero, biasing the control up and making the harness understate
 * its own subject.
 *
 * MEASURED against a throwaway skill directory, running this file's own spawn both ways:
 * with the flags the run saw 0 plugin-namespaced entries, without them 97. In both cases the
 * disclosed arm still read SKILL.md and the reference it points to, so isolation does not
 * cost the metric -- which was the open question, since a flag that silenced `Read` would
 * have traded one void number for another.
 */
const ISOLATION_FLAGS: readonly string[] = ["--setting-sources", "project", "--strict-mcp-config"];

/** Minimal concurrency pool. Kept local so this file has no external dependency. */
async function mapWithConcurrency<T, R>(
  items: readonly T[], limit: number, fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      for (;;) {
        const i = next++;
        if (i >= items.length) return;
        out[i] = await fn(items[i]!, i);
      }
    }),
  );
  return out;
}

/**
 * Run with Read available and report which files the agent chose to open.
 *
 * This is the whole point of the disclosed arm: progressive disclosure only works if an
 * agent decides a reference is worth a tool call, and that decision is observable. Reads
 * the streaming form so tool_use blocks can be counted as they arrive.
 */
async function claudeWithReads(
  prompt: string, useModel: string, cwd: string,
): Promise<{ text: string; readPaths: string[] }> {
  const env: Record<string, string> = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (k === "CLAUDECODE" || v === undefined) continue;
    env[k] = v;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const readPaths: string[] = [];
  let text = "";
  try {
    const proc = Bun.spawn(
      ["claude", "-p", prompt, "--model", useModel, "--max-turns", maxTurns,
       "--output-format", "stream-json", "--verbose",
       ...ISOLATION_FLAGS,
       "--allowedTools", "Read,Glob,Grep,Bash(bun:*),Write"],
      { cwd, env, stdin: "ignore", stdout: "pipe", stderr: "ignore", signal: controller.signal },
    );
    const raw = await new Response(proc.stdout).text();
    for (const line of raw.split("\n")) {
      if (!line.trim()) continue;
      let ev: any;
      try { ev = JSON.parse(line); } catch { continue; }
      if (ev?.type === "assistant") {
        for (const b of ev.message?.content ?? []) {
          if (b?.type === "text") text += b.text;
          if (b?.type === "tool_use" && b.name === "Read") {
            const fp = String(b.input?.file_path ?? "");
            if (fp) readPaths.push(fp);
          }
        }
      }
      if (ev?.type === "result" && typeof ev.result === "string") text += ev.result;
    }
  } finally {
    clearTimeout(timer);
  }
  return { text, readPaths };
}

async function claude(prompt: string, useModel: string): Promise<string> {
  const env: Record<string, string> = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (k === "CLAUDECODE" || v === undefined) continue;
    env[k] = v;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const proc = Bun.spawn(
      ["claude", "-p", prompt, "--model", useModel, "--max-turns", "1", ...ISOLATION_FLAGS],
      { cwd: "/tmp", env, stdin: "ignore", stdout: "pipe", stderr: "ignore", signal: controller.signal },
    );
    return await new Response(proc.stdout).text();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Pull the last JSON object out of a reply.
 *
 * Last rather than first: models routinely restate the schema or show a rejected draft
 * before the real answer, and taking the first object grades the draft. Brace-matched
 * rather than regexed because option descriptions contain braces often enough to break a
 * lazy pattern, and a parse failure here is indistinguishable from a bad call in the
 * results.
 */
function extractJson(text: string): unknown | null {
  const candidates: string[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== "{") continue;
    let depth = 0, inStr = false, esc = false;
    for (let j = i; j < text.length; j++) {
      const c = text[j]!;
      if (esc) { esc = false; continue; }
      if (c === "\\") { esc = true; continue; }
      if (c === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) { candidates.push(text.slice(i, j + 1)); i = j; break; }
      }
    }
  }
  for (const c of candidates.reverse()) {
    try { return JSON.parse(c); } catch { /* try the next one out */ }
  }
  return null;
}

const OUTPUT_CONTRACT = `
Produce your answer as a single JSON object and nothing else after it.

If surfacing a decision to the user is the right move, emit the exact input you would pass
to the AskUserQuestion tool:
  {"questions": [{"question": "...", "header": "...", "multiSelect": false,
                  "options": [{"label": "...", "description": "..."}, ...]}],
   "prose": "the text you would say to the user immediately before the dialog opens"}

If surfacing a decision is NOT the right move here, emit instead:
  {"no_call": true, "decision": "what you decided and why, exactly as you would say it to the user"}
`.trim();

const scenarios: Scenario[] = JSON.parse(await Bun.file(scenarioPath).text());
const rubricRaw = await Bun.file(rubricPath).text();
const rubricMatch = /```text\n([\s\S]*?)\n```/.exec(rubricRaw)?.[1];
if (!rubricMatch) {
  console.error(`No fenced \`\`\`text block found in ${rubricPath}. The rubric is read from that block, not from the whole file.`);
  process.exit(2);
}
const rubric: string = rubricMatch;

/**
 * The skill arm injects SKILL.md plus EVERY reference.
 *
 * It used to inject SKILL.md plus one reference, which quietly made the "ceiling" number a
 * ceiling for a two-file subset rather than for the skill. When references were added, the
 * arm kept measuring the old subset and nothing failed: the number just stopped meaning what
 * its label said. Globbing rather than listing is deliberate, so a new reference is included
 * the moment it exists.
 */
const skillBody = await Bun.file(`${skillDir}/SKILL.md`).text();
const refPaths = [...new Bun.Glob("*.md").scanSync(`${skillDir}/references`)].sort();
const refBodies = await Promise.all(
  refPaths.map(async (f) => `=== references/${f} ===\n${await Bun.file(`${skillDir}/references/${f}`).text()}`),
);
const skillPreamble = [
  "You have the following guidance available. Follow it.",
  "", "=== SKILL.md ===", skillBody,
  "", ...refBodies,
  "", "=== end of guidance ===", "",
].join("\n");
console.error(`skill arm injects SKILL.md + ${refPaths.length} references: ${refPaths.join(", ")}`);

/**
 * The disclosed arm gets what a real session gets: the skill routed to, and references it
 * must decide to open. Naming SKILL.md but NOT the reference files is deliberate. The router
 * surfaces the skill; whether a reference is worth a tool call is the skill's own job, and
 * that is exactly what this arm measures.
 */
const disclosedPreamble = [
  `A skill that applies here is installed at ${skillDir}.`,
  "Read its SKILL.md before you answer, and follow it. It refers to files you may also read.",
  "",
].join("\n");

const arms: Arm[] = armFilter ? (armFilter.split(",") as Arm[]) : ["baseline", "skill"];
const attempts = arms.flatMap((arm) =>
  scenarios.flatMap((scenario) => Array.from({ length: runsPer }, (_, run) => ({ scenario, arm, run }))),
);

console.error(`${scenarios.length} scenarios x ${arms.length} arm(s) x ${runsPer} runs = ${attempts.length} calls`);
console.error(`model=${model} judge=${noJudge ? "off" : judgeModel} workers=${workers}\n`);

const bar = progress(attempts.length, "composition ");
const results = await mapWithConcurrency(attempts, workers, async ({ scenario, arm, run }): Promise<Attempt> => {
  const started = Date.now();
  const prompt = [
    arm === "skill" ? skillPreamble : "",
    arm === "disclosed" ? disclosedPreamble : "",
    `SITUATION\n${scenario.situation}`,
    "",
    OUTPUT_CONTRACT,
  ].filter(Boolean).join("\n");

  let raw = "";
  let failed: string | undefined;
  let refsRead: string[] = [];
  try {
    if (arm === "disclosed") {
      const r = await claudeWithReads(prompt, model, skillDir);
      raw = r.text;
      // Basenames only: the agent may reach a file by absolute or relative path.
      refsRead = [...new Set(r.readPaths.map((f) => f.split("/").pop() ?? f)
        .filter((f) => f.endsWith(".md") && f !== "SKILL.md"))];
    } else {
      raw = await claude(prompt, model);
    }
  } catch (e) { failed = e instanceof Error ? e.message : String(e); }

  const parsed = extractJson(raw) as any;
  const declined = Boolean(parsed?.no_call);
  const call: Call | null = !declined && Array.isArray(parsed?.questions) ? (parsed as Call) : null;
  const findings = call ? checkCall(call) : [];
  const lintScore = call ? scoreFindings(findings, call).value : 0;

  let judge: Record<string, number> | null = null;
  let judgeNote = "";
  if (!noJudge && !failed) {
    const output = declined
      ? `The agent did NOT open a dialog. It decided and said:\n\n${parsed?.decision ?? "(no text)"}`
      : call
        ? `Prose shown before the dialog:\n${parsed?.prose ?? "(none)"}\n\nThe dialog:\n${JSON.stringify({ questions: call.questions }, null, 2)}`
        : `The agent produced no parseable call and no decision. Raw output:\n${raw.slice(0, 2000)}`;
    // Replacer FUNCTIONS, not replacement strings. `output` is raw model text that
    // routinely contains code, and in a string replacement `$&`, `` $` ``, `$'` and
    // `$1` are substitution patterns: a call whose description contains `$1` would
    // silently corrupt the judge's prompt.
    const judgePrompt = rubric
      .replace("{{SITUATION}}", () => scenario.situation)
      .replace("{{EXPECT_CALL}}", () => scenario.expect_call
        ? "yes, this had a real fork in it"
        : "no, the agent should have decided and said so")
      .replace("{{OUTPUT}}", () => output);
    try {
      const reply = await claude(judgePrompt, judgeModel);
      const j = extractJson(reply) as any;
      if (j && typeof j === "object") {
        judgeNote = String(j.worst_failure ?? "");
        judge = Object.fromEntries(
          Object.entries(j).filter(([, v]) => typeof v === "number"),
        ) as Record<string, number>;
      }
    } catch { /* a judge failure leaves judge null; it is reported, not retried */ }
  }

  // + clean call, x call with an error finding, o declined to ask, ? unparseable,
  // ! subprocess failure. Tallied beside the bar: a run drifting to ? early is a
  // harness problem, and there is no reason to wait 45 minutes to learn that.
  bar.tick(failed ? "!" : declined ? "o" : call ? (findings.some((f) => f.severity === "error") ? "x" : "+") : "?");

  return {
    scenario, arm, run, call, declined, declineText: String(parsed?.decision ?? ""),
    raw, findings, lintScore, judge, judgeNote, refsRead, elapsedMs: Date.now() - started, failed,
  };
});
bar.done();

const mean = (xs: readonly number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const JUDGE_KEYS = ["decidable_cold", "recognises_mistake", "comparable_options",
  "honest_recommendation", "evidence_boundary", "right_call_about_asking"] as const;

function summarise(arm: Arm) {
  const rows = results.filter((r) => r.arm === arm);
  const asked = rows.filter((r) => r.call !== null);
  // An attempt that produced neither a call nor a decision answered no question, so it
  // is excluded from the ask/abstain denominators and reported on its own line. Left
  // in, it scored as a wrong choice: in the first run each arm's single parse failure
  // silently cost it a point on one of the two headline rates, which is a measurement
  // artifact wearing the clothes of a finding.
  const parseable = rows.filter((r) => r.call !== null || r.declined);
  const shouldAsk = parseable.filter((r) => r.scenario.expect_call);
  const shouldNotAsk = parseable.filter((r) => !r.scenario.expect_call);
  return {
    arm,
    attempts: rows.length,
    unparseable: rows.length - parseable.length,
    lintMean: mean(asked.map((r) => r.lintScore)),
    cleanCallRate: asked.length ? asked.filter((r) => !r.findings.some((f) => f.severity === "error")).length / asked.length : 0,
    askedWhenItShould: shouldAsk.length ? shouldAsk.filter((r) => r.call !== null).length / shouldAsk.length : 0,
    askedDenominator: shouldAsk.length,
    abstainedWhenItShould: shouldNotAsk.length ? shouldNotAsk.filter((r) => r.declined).length / shouldNotAsk.length : 0,
    abstainedDenominator: shouldNotAsk.length,
    judge: Object.fromEntries(
      JUDGE_KEYS.map((k) => [k, mean(rows.map((r) => r.judge?.[k]).filter((v): v is number => typeof v === "number" && v > 0))]),
    ),
    // Disclosure. Only meaningful for the disclosed arm; zero elsewhere by construction.
    refsPerCall: mean(rows.map((r) => r.refsRead.length)),
    anyRefRate: rows.length ? rows.filter((r) => r.refsRead.length > 0).length / rows.length : 0,
    // Did the reference this situation calls for actually get opened?
    // Precision: of the references actually opened, how many were needed. Recall alone
    // rewards opening everything, and the first eight runs were read as "more is better"
    // when refs-per-call had already passed the ceiling. A skill that opens two references
    // where one was needed is wasting a tool call and the tokens behind it.
    // `null` when nothing was opened, NOT 1. Precision over an empty set is undefined, and
    // reporting it as perfect inverted the metric: an arm that opened no reference at all
    // scored 100% while an arm that correctly opened one scored less. It rewarded the exact
    // behaviour the docblock above says the metric was added to catch.
    //
    // This is not hypothetical. The frozen 2026-08-08 report shows precision at 100% for both
    // the baseline and skill arms, and both opened 0.00 references per call -- the inversion
    // has already printed as perfection in a real report.
    //
    // Changing a scoring formula is normally off the table because it makes new figures
    // incomparable with old ones. It is allowed here on a ground that does not generalise:
    // composition has never run against the current artifact, so there is no baseline to stay
    // comparable with. The only consumer renders `n/a` rather than coercing -- see the
    // precision row below, and do not let a later edit multiply this by 100.
    refPrecision: ((): number | null => {
      const opened = rows.flatMap((r) => r.refsRead.map((f) => ({
        f, want: [...(r.scenario.expect_refs ?? []), ...(r.scenario.allow_refs ?? [])] })));
      if (!opened.length) return null;
      return opened.filter((o) => o.want.includes(o.f)).length / opened.length;
    })(),
    expectedRefHitRate: (() => {
      const withExpectation = rows.filter((r) => (r.scenario.expect_refs ?? []).length > 0
        && (r.call !== null || !r.scenario.expect_call));
      if (!withExpectation.length) return 0;
      const hits = withExpectation.filter((r) =>
        (r.scenario.expect_refs ?? []).some((e) => r.refsRead.includes(e))).length;
      return hits / withExpectation.length;
    })(),
    refCounts: rows.flatMap((r) => r.refsRead)
      .reduce<Record<string, number>>((a, f) => { a[f] = (a[f] ?? 0) + 1; return a; }, {}),
    errorsByRule: rows.flatMap((r) => r.findings).filter((f) => f.severity === "error")
      .reduce<Record<string, number>>((acc, f) => { acc[f.id] = (acc[f.id] ?? 0) + 1; return acc; }, {}),
  };
}

const summaries = arms.map(summarise);

console.log(`# Composition measurement\n`);
console.log(`Model \`${model}\`, judge \`${noJudge ? "off" : judgeModel}\`, ${runsPer} runs per scenario.`);
console.log(`${scenarios.length} scenarios, ${scenarios.filter((s) => s.expect_call).length} where a dialog is correct and ${scenarios.filter((s) => !s.expect_call).length} where it is not.\n`);
console.log(`Skill content is injected, not routed to. This measures the body, not the description.\n`);

console.log(`## Headline\n`);
console.log(`| metric | ${summaries.map((s) => s.arm).join(" | ")} |`);
console.log(`|---|${summaries.map(() => "--:").join("|")}|`);
const row = (label: string, get: (s: ReturnType<typeof summarise>) => string) =>
  console.log(`| ${label} | ${summaries.map(get).join(" | ")} |`);
row("lint score, mean (0 to 1)", (s) => s.lintMean.toFixed(2));
row("calls with zero lint errors", (s) => `${(100 * s.cleanCallRate).toFixed(0)}%`);
row("asked when it should have", (s) => `${(100 * s.askedWhenItShould).toFixed(0)}% (n=${s.askedDenominator})`);
row("**abstained when it should have**", (s) => `${(100 * s.abstainedWhenItShould).toFixed(0)}% (n=${s.abstainedDenominator})`);
if (!noJudge) for (const k of JUDGE_KEYS) row(`judge: ${k.replace(/_/g, " ")}`, (s) => (s.judge[k] ?? 0).toFixed(2));
row("unparseable, excluded above", (s) => String(s.unparseable));
if (arms.includes("disclosed")) {
  row("references opened per call", (s) => s.refsPerCall.toFixed(2));
  row("calls opening any reference", (s) => `${(100 * s.anyRefRate).toFixed(0)}%`);
  row("**recall**: scenarios where a needed reference was opened", (s) => `${(100 * s.expectedRefHitRate).toFixed(0)}%`);
  // `n/a`, not 0%, when the arm opened nothing. There is no precision to report over an empty
  // set, and both wrong answers mislead in opposite directions: 100% reads as perfect and 0%
  // reads as broken, where the truth is that the question does not apply.
  row("**precision**: opens that were on the needed list",
    (s) => (s.refPrecision === null ? "n/a (nothing opened)" : `${(100 * s.refPrecision).toFixed(0)}%`));
}
console.log();
console.log(`The two rate rows exclude unparseable attempts from their denominators, which is why \`n\` is shown.\n`);

console.log(`## Lint errors by rule\n`);
const allRules = [...new Set(summaries.flatMap((s) => Object.keys(s.errorsByRule)))].sort();
if (allRules.length === 0) console.log("None.\n");
else {
  console.log(`| rule | ${summaries.map((s) => s.arm).join(" | ")} |`);
  console.log(`|---|${summaries.map(() => "--:").join("|")}|`);
  for (const rule of allRules) console.log(`| \`${rule}\` | ${summaries.map((s) => String(s.errorsByRule[rule] ?? 0)).join(" | ")} |`);
  console.log();
}

if (arms.includes("disclosed")) {
  console.log(`## Which references got opened\n`);
  const d = summaries.find((x) => x.arm === "disclosed");
  const counts = Object.entries(d?.refCounts ?? {}).sort((a, b) => b[1] - a[1]);
  if (!counts.length) console.log("None. Progressive disclosure is not happening.\n");
  else {
    console.log(`| reference | times opened |`);
    console.log(`|---|--:|`);
    for (const [f, n] of counts) console.log(`| \`${f}\` | ${n} |`);
    // Derived from the same glob the skill arm injects from, rather than a list. The list that
    // was here named the retired fork's seven references and none of them exist, so this line
    // was wrong in both directions at once: it reported seven phantom files as never-opened
    // every run, and the three real references could never appear in it even when genuinely
    // unopened. A populated "Never opened:" line reads as evidence the check ran.
    //
    // `refPaths` is the glob at the top of this file, whose entries are basenames -- the same
    // shape as `refCounts` keys, which come from `refsRead` after `.split("/").pop()`. Verified
    // against the installed skill: the glob yields re-pitch.md, reading-answers.md, register.md.
    const never = refPaths.filter((f) => !(f in (d?.refCounts ?? {})));
    console.log();
    if (never.length) console.log(`**Never opened:** ${never.map((f) => `\`${f}\``).join(", ")}\n`);
  }
  console.log(`| scenario | reference it needs | opened | everything opened |`);
  console.log(`|---|---|:--:|---|`);
  for (const sc of scenarios) {
    const rows = results.filter((r) => r.arm === "disclosed" && r.scenario.id === sc.id);
    const want = sc.expect_refs ?? [];
    const got = [...new Set(rows.flatMap((r) => r.refsRead))];
    const hit = want.length === 0 ? "n/a" : want.some((w) => got.includes(w)) ? "yes" : "**no**";
    console.log(`| ${sc.id} | ${want.join(", ") || "none"} | ${hit} | ${got.join(", ") || "nothing"} |`);
  }
  console.log();
}

console.log(`## Per scenario\n`);
console.log(`| scenario | correct move | ${arms.map((a) => `${a}: asked / lint`).join(" | ")} |`);
console.log(`|---|:--:|${arms.map(() => "--:").join("|")}|`);
for (const s of scenarios) {
  const cells = arms.map((arm) => {
    const rows = results.filter((r) => r.arm === arm && r.scenario.id === s.id);
    const askedN = rows.filter((r) => r.call !== null).length;
    const lint = mean(rows.filter((r) => r.call).map((r) => r.lintScore));
    return `${askedN}/${rows.length} · ${rows.some((r) => r.call) ? lint.toFixed(2) : "n/a"}`;
  });
  console.log(`| ${s.id} | ${s.expect_call ? "ask" : "**decide**"} | ${cells.join(" | ")} |`);
}
console.log();

const worst = results.filter((r) => r.judgeNote && r.judgeNote !== "none").slice(0, 12);
if (worst.length) {
  console.log(`## What the judge flagged\n`);
  for (const r of worst) console.log(`- \`${r.arm}/${r.scenario.id}\` ${r.judgeNote}`);
  console.log();
}

const failures = results.filter((r) => r.failed);
if (failures.length) console.log(`**${failures.length} subprocess failure(s)**, first: ${failures[0]!.failed}\n`);

if (outDir) {
  await Bun.write(`${outDir}/composition-results.json`, JSON.stringify({
    model, judgeModel: noJudge ? null : judgeModel, runsPer, scenarioCount: scenarios.length,
    summaries,
    results: results.map((r) => ({
      id: r.scenario.id, arm: r.arm, run: r.run, expectCall: r.scenario.expect_call,
      asked: r.call !== null, declined: r.declined, lintScore: r.lintScore, refsRead: r.refsRead,
      findings: r.findings, judge: r.judge, judgeNote: r.judgeNote,
      parallelism: r.call ? parallelismDiagnostic(r.call) : [], elapsedMs: r.elapsedMs, failed: r.failed,
    })),
  }, null, 2));
  console.error(`Wrote ${outDir}/composition-results.json`);
}
