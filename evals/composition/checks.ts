#!/usr/bin/env bun
/**
 * Deterministic checks on a composed AskUserQuestion call. CURRENTLY EMPTY.
 *
 * This module is the active rule set, and it holds no rules. That is deliberate and it is
 * not a bug to fix by re-enabling the old ones.
 *
 * The previous fork's 32 rules survive verbatim in `checks.quarantined.ts`, which nothing
 * imports. Every one of them encoded a claim the old SKILL.md made -- that a description
 * must carry a figure, that exactly one option is marked, that a label of two words is too
 * short -- and those claims were calibrated against a corpus that no longer exists here.
 * Left wired up, they would grade a skill they were never derived from and report a number
 * that looks like a measurement. `LINT-RULES-PENDING.md` lists what each asserted; that
 * file is the input to re-deriving them once the new skill states its own rules.
 *
 * READ THIS BEFORE TRUSTING A SCORE: with zero rules, `checkCall` returns no findings and
 * `scoreFindings` therefore returns 1.00 for every input, including a call that is plainly
 * broken. A 1.00 from this module means "nothing was checked", not "nothing was wrong".
 * The runner prints that caveat alongside the number.
 *
 * `parallelismDiagnostic` is kept live. It was never a pass/fail -- it emits the first
 * sentence of each description for a human to compare -- so it carries no doctrine and
 * cannot mis-grade anything.
 */

export interface Option {
  readonly label: string;
  readonly description: string;
  readonly preview?: string;
}

export interface Question {
  readonly question: string;
  readonly header: string;
  readonly options: readonly Option[];
  readonly multiSelect?: boolean;
}

export interface Call {
  readonly questions: readonly Question[];
}

export interface Finding {
  /** Stable id, so a results file can be differenced across runs. */
  readonly id: string;
  readonly severity: "error" | "warn";
  /** Which question and option it landed on, for pointing at the right string. */
  readonly at: string;
  readonly message: string;
}

/** Rules pending re-derivation. Callers get a well-typed empty list, not a crash. */
export const ACTIVE_RULE_COUNT = 0;

/**
 * Always returns no findings while the rule set is empty.
 *
 * The parameter is read so the signature stays honest against the quarantined
 * implementation, which a re-derivation will restore in place.
 */
export function checkCall(call: Call): Finding[] {
  void call;
  return [];
}

const sentences = (s: string): string[] =>
  s.trim().split(/(?<=[.?!]["'’”)\]]?)\s+/).map((x) => x.trim()).filter(Boolean);

/** First sentence of each description, lined up. The judge decides if they are parallel. */
export function parallelismDiagnostic(call: Call): string[] {
  return (call.questions ?? []).flatMap((q, qi) =>
    (q.options ?? []).map((o, oi) => `q${qi + 1}.o${oi + 1}  ${sentences(o.description ?? "")[0] ?? ""}`),
  );
}

export interface Score {
  readonly errors: number;
  readonly warnings: number;
  /** 1.0 when nothing fired, floored at 0. With no rules active, always 1.0. */
  readonly value: number;
}

export function scoreFindings(findings: readonly Finding[], call: Call): Score {
  const errors = findings.filter((f) => f.severity === "error").length;
  const warnings = findings.filter((f) => f.severity === "warn").length;
  const optionCount = Math.max(1, (call.questions ?? []).reduce((a, q) => a + (q.options?.length ?? 0), 0));
  const penalty = (errors + 0.35 * warnings) / optionCount;
  return { errors, warnings, value: Math.max(0, 1 - penalty) };
}

// --- standalone use: bun checks.ts <call.json> ------------------------------
if (import.meta.main) {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: bun checks.ts <call.json>");
    console.error("  where call.json is the AskUserQuestion input, i.e. { \"questions\": [...] }");
    process.exit(2);
  }
  const call: Call = JSON.parse(await Bun.file(path).text());
  const findings = checkCall(call);
  const score = scoreFindings(findings, call);

  console.log(`no findings -- ${ACTIVE_RULE_COUNT} rules are active`);
  console.log("The inherited rule set is quarantined in checks.quarantined.ts pending");
  console.log("re-derivation against the new skill. See LINT-RULES-PENDING.md.");

  console.log("\nFirst sentence of each description, for the parallelism read:");
  for (const line of parallelismDiagnostic(call)) console.log(`  ${line}`);

  console.log(`\n${score.errors} error(s), ${score.warnings} warning(s), score ${score.value.toFixed(2)}`);
  console.log("This score checked nothing. It is 1.00 for every input while the rule set is empty.");
  process.exit(score.errors > 0 ? 1 : 0);
}
