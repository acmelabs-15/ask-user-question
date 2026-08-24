#!/usr/bin/env bun
/**
 * Calibration for the active rule set.
 *
 * Two jobs. The first is the one this file existed for while the rule set was empty: hold the
 * PROBE, a deliberately broken call, and report what it scored. It scored 1.00 then, and that
 * number was the evidence that nothing was wired. **So the acceptance test for the rules is
 * that the probe now fails.** If it comes back at 1.00 again, the rules are not connected and
 * every composition score is meaningless whatever else passes here.
 *
 * The second job is per-rule coverage: one call per rule, shaped to fire exactly that rule.
 * Without it, a threshold loosened to kill a false positive can silently stop catching the
 * thing it was written for, which is how the quarantined set's numbers drifted from the corpus
 * they were calibrated against.
 *
 * Every fixture is checked BOTH ways: the broken call fires the rule, and a corrected version
 * of the same call does not. A test that only asserts the positive cannot tell a rule that
 * works from a rule that fires on everything.
 *
 *   bun checks.test.ts
 */

import {
  ACTIVE_RULE_COUNT,
  checkCall,
  parallelismDiagnostic,
  scoreFindings,
  type Call,
  type Finding,
} from "./checks.ts";

let failures = 0;
const fail = (what: string, detail: string): void => {
  failures += 1;
  console.error(`  FAIL  ${what}\n        ${detail}`);
};

const ids = (findings: readonly Finding[]): string[] => findings.map((f) => f.id);

/** Asserts `id` fires on `broken` and does not fire on `clean`. */
function rule(id: string, broken: Call, clean: Call): void {
  const onBroken = ids(checkCall(broken));
  const onClean = ids(checkCall(clean));
  if (!onBroken.includes(id)) fail(id, `did not fire on its broken fixture; got [${onBroken.join(", ")}]`);
  if (onClean.includes(id)) fail(id, `fired on its clean fixture; got [${onClean.join(", ")}]`);
}

/**
 * A well-formed call, lifted from SKILL.md's own worked example at :285-304.
 *
 * Using the artifact's exemplar rather than one of mine is deliberate: if a rule fires on this,
 * the rule is wrong, because this is the shape the skill teaches. It is also the fixture that
 * caught the sentence-length threshold, whose second description runs to 24 words.
 */
const EXEMPLAR: Call = {
  questions: [{
    question: "The migration drops the legacy search index. Rebuild it now, or ship without it?",
    header: "Index",
    options: [
      {
        label: "Rebuild now (Recommended)",
        description: "Runs the rebuild inside this migration. Your index is 40 MB, so this adds about two minutes of downtime, and the deploy window you booked is thirty.",
      },
      {
        label: "Ship without it",
        description: "Deploys immediately with no downtime. Search returns no results until someone rebuilds by hand, and nothing in the deploy reminds them.",
      },
    ],
  }],
};

/** Deep-clones the exemplar so a fixture can break exactly one thing about it. */
const from = (mutate: (call: { questions: Question[] }) => void): Call => {
  const copy = JSON.parse(JSON.stringify(EXEMPLAR)) as { questions: Question[] };
  mutate(copy);
  return copy as Call;
};
interface Question {
  question: string;
  header: string;
  options: { label: string; description: string; preview?: string }[];
  multiSelect?: boolean;
}

console.log("checks calibration\n");
console.log(`  active rules      ${ACTIVE_RULE_COUNT}`);
console.log("  quarantined       32  (checks.quarantined.ts, kept as the record)");

// ---------------------------------------------------------------------------
// 1. The exemplar must be clean. Everything else depends on this.
// ---------------------------------------------------------------------------
const onExemplar = checkCall(EXEMPLAR);
console.log(`  exemplar findings ${onExemplar.length}`);
if (onExemplar.length > 0) {
  fail("SKILL.md's own worked example", `scored ${onExemplar.length} finding(s): [${ids(onExemplar).join(", ")}]`);
}

// ---------------------------------------------------------------------------
// 2. THE ACCEPTANCE TEST: the probe that used to score 1.00 must now fail.
// ---------------------------------------------------------------------------
const PROBE: Call = {
  questions: [{
    question: "Proceed",
    header: "A header far past twelve characters",
    options: [
      { label: "Yes", description: "Do it." },
      { label: "No", description: "Do it." },
    ],
  }],
};

const probeFindings = checkCall(PROBE);
const probeScore = scoreFindings(probeFindings, PROBE);
console.log(`  probe findings    ${probeFindings.length}`);
console.log(`  probe score       ${probeScore.value.toFixed(2)}`);

if (ACTIVE_RULE_COUNT === 0) {
  fail("rule set", "ACTIVE_RULE_COUNT is 0, so nothing was checked");
}
if (probeFindings.length === 0) {
  fail("the probe", "produced no findings; the rules are not wired");
}
if (probeScore.value >= 1) {
  fail("the probe", `scored ${probeScore.value.toFixed(2)}; it is a broken call and must not score 1.00`);
}
if (probeScore.errors === 0) {
  fail("the probe", "produced no ERRORS, so `cleanCallRate` would still count it as clean");
}
// Named, so a future edit cannot quietly stop catching the defects this probe was built from.
for (const id of [
  "question/no-question-mark",
  "header/over-chip",
  "option/identical-descriptions",
  "rec/none-without-equivalence-note",
  "option/description-single-sentence",
]) {
  if (!ids(probeFindings).includes(id)) fail("the probe", `expected ${id} among its findings`);
}

// ---------------------------------------------------------------------------
// 3. Per-rule coverage. Broken fires it, corrected does not.
// ---------------------------------------------------------------------------

// --- schema limits ---------------------------------------------------------
rule("schema/question-count",
  { questions: [] },
  EXEMPLAR);
rule("schema/option-count",
  from((c) => { c.questions[0]!.options = [c.questions[0]!.options[0]!]; }),
  EXEMPLAR);
rule("schema/duplicate-question",
  from((c) => { c.questions.push(JSON.parse(JSON.stringify(c.questions[0]))); }),
  from((c) => {
    const second = JSON.parse(JSON.stringify(c.questions[0])) as Question;
    second.question = "Should the rebuild run before or after the release?";
    second.options[0]!.label = "Before the release (Recommended)";
    second.options[1]!.label = "After the release";
    c.questions.push(second);
  }));
rule("schema/duplicate-label",
  // Differs from its sibling only by the marker, which the schema accepts and a reader cannot.
  from((c) => { c.questions[0]!.options[1]!.label = "Rebuild now"; }),
  EXEMPLAR);
rule("schema/missing-question",
  from((c) => { c.questions[0]!.question = ""; }),
  EXEMPLAR);
rule("schema/missing-label",
  from((c) => { c.questions[0]!.options[1]!.label = ""; }),
  EXEMPLAR);
rule("schema/missing-description",
  from((c) => { c.questions[0]!.options[1]!.description = ""; }),
  EXEMPLAR);
rule("schema/missing-header",
  from((c) => { c.questions[0]!.header = ""; }),
  EXEMPLAR);
rule("schema/preview-unsafe",
  from((c) => { c.questions[0]!.options[0]!.preview = "<script>alert(1)</script>"; }),
  from((c) => {
    c.questions[0]!.options[0]!.preview = "<p>Rebuilt index, 40 MB</p>";
    c.questions[0]!.options[1]!.preview = "<p>No index</p>";
  }));

// --- layout ----------------------------------------------------------------
rule("layout/preview-on-multiselect",
  from((c) => {
    c.questions[0]!.multiSelect = true;
    c.questions[0]!.options[0]!.preview = "<p>a</p>";
    c.questions[0]!.options[1]!.preview = "<p>b</p>";
  }),
  from((c) => {
    c.questions[0]!.options[0]!.preview = "<p>a</p>";
    c.questions[0]!.options[1]!.preview = "<p>b</p>";
  }));
rule("layout/preview-partial",
  from((c) => { c.questions[0]!.options[0]!.preview = "<p>only one</p>"; }),
  from((c) => {
    c.questions[0]!.options[0]!.preview = "<p>a</p>";
    c.questions[0]!.options[1]!.preview = "<p>b</p>";
  }));

// --- the recommendation ----------------------------------------------------
rule("rec/multiple-markers",
  from((c) => { c.questions[0]!.options[1]!.label = "Ship without it (Recommended)"; }),
  EXEMPLAR);
rule("rec/marker-not-first",
  from((c) => {
    c.questions[0]!.options[0]!.label = "Rebuild now";
    c.questions[0]!.options[1]!.label = "Ship without it (Recommended)";
  }),
  EXEMPLAR);
rule("rec/marker-spelling",
  from((c) => { c.questions[0]!.options[0]!.label = "Rebuild now (recommended)"; }),
  EXEMPLAR);
rule("rec/none-without-equivalence-note",
  from((c) => { c.questions[0]!.options[0]!.label = "Rebuild now"; }),
  // The permitted no-marker path: no marker, and the question says the options are equivalent.
  from((c) => {
    c.questions[0]!.options[0]!.label = "Rebuild now";
    c.questions[0]!.question = "Both paths are equivalent here. Rebuild the index now, or ship without it?";
  }));
rule("rec/virtue-justification",
  from((c) => {
    c.questions[0]!.options[0]!.description = "Runs the rebuild inside this migration. This is cleaner, and it adds about two minutes of downtime.";
  }),
  EXEMPLAR);

// --- the options -----------------------------------------------------------
rule("option/reserved-name",
  from((c) => { c.questions[0]!.options[1]!.label = "Skip"; }),
  EXEMPLAR);
rule("option/identical-descriptions",
  from((c) => { c.questions[0]!.options[1]!.description = c.questions[0]!.options[0]!.description; }),
  EXEMPLAR);
rule("option/label-word-count",
  from((c) => { c.questions[0]!.options[1]!.label = "Ship it without the legacy search index"; }),
  EXEMPLAR);
rule("option/description-single-sentence",
  from((c) => { c.questions[0]!.options[1]!.description = "Deploys immediately with no downtime."; }),
  EXEMPLAR);

// --- the question string ---------------------------------------------------
rule("question/no-question-mark",
  from((c) => { c.questions[0]!.question = "The migration drops the legacy search index. Rebuild it now."; }),
  EXEMPLAR);
rule("question/word-count",
  from((c) => {
    c.questions[0]!.question = "The migration drops the legacy search index that the reporting dashboards and the internal admin tools both read from every hour, so rebuild it now, or ship without it?";
  }),
  EXEMPLAR);
rule("question/multi-sentence",
  from((c) => {
    c.questions[0]!.question = "The migration drops the legacy search index. It is 40 MB. Rebuild it now, or ship without it?";
  }),
  EXEMPLAR);

// --- header ----------------------------------------------------------------
rule("header/over-chip",
  from((c) => { c.questions[0]!.header = "Legacy search index rebuild"; }),
  EXEMPLAR);

// --- register --------------------------------------------------------------
rule("register/sentence-length",
  from((c) => {
    c.questions[0]!.options[1]!.description = "Deploys immediately with no downtime, and search returns no results at all until somebody on the team remembers to rebuild the index by hand at some later point. Nothing reminds them.";
  }),
  EXEMPLAR);
rule("register/compound-tense",
  from((c) => { c.questions[0]!.options[1]!.description = "Deploys immediately. The index will be rebuilt by hand later, and nothing reminds anyone."; }),
  EXEMPLAR);
rule("register/cross-reference",
  from((c) => { c.questions[0]!.options[1]!.description = "Deploys immediately with no downtime. As discussed above, someone rebuilds by hand."; }),
  EXEMPLAR);

// ---------------------------------------------------------------------------
// 4. Every rule the module claims must have a test. A count is not coverage.
// ---------------------------------------------------------------------------
const TESTED_RULES = [
  "schema/question-count", "schema/option-count", "schema/duplicate-question", "schema/duplicate-label",
  "schema/missing-question", "schema/missing-label", "schema/missing-description", "schema/missing-header",
  "schema/preview-unsafe", "layout/preview-on-multiselect", "layout/preview-partial",
  "rec/multiple-markers", "rec/marker-not-first", "rec/marker-spelling",
  "rec/none-without-equivalence-note", "rec/virtue-justification",
  "option/reserved-name", "option/identical-descriptions", "option/label-word-count",
  "option/description-single-sentence", "question/no-question-mark", "question/word-count",
  "question/multi-sentence", "header/over-chip", "register/sentence-length",
  "register/compound-tense", "register/cross-reference",
];
if (TESTED_RULES.length !== ACTIVE_RULE_COUNT) {
  fail("coverage", `${TESTED_RULES.length} rules have tests but ACTIVE_RULE_COUNT is ${ACTIVE_RULE_COUNT}`);
}
if (new Set(TESTED_RULES).size !== TESTED_RULES.length) {
  fail("coverage", "a rule id is listed twice in TESTED_RULES");
}

// ---------------------------------------------------------------------------
// 5. Malformed input reports, never throws.
//
// Adopted from the quarantined calibration, which is where this belongs: `checks.ts` ships as a
// standalone linter over drafts that have not been near the tool's schema, so a missing or
// wrongly-typed field has to become a finding rather than a TypeError from inside the checker.
// The rule set changed; this requirement did not.
// ---------------------------------------------------------------------------
const HOSTILE: readonly unknown[] = [
  {},
  { questions: [] },
  { questions: [{ header: "x", options: [{ description: "no label at all" }, { label: "Keep it", description: "d" }] }] },
  { questions: [{ question: "?", header: "x", options: [] }] },
  { questions: [{ question: null, header: 5, options: [{ label: undefined, description: {} }] }] },
  { questions: [{ question: "Which?", header: "x" }] },
  { questions: null },
];
HOSTILE.forEach((c, i) => {
  try {
    const findings = checkCall(c as Call);
    scoreFindings(findings, c as Call);
  } catch (e) {
    fail("hostile input", `case ${i} threw instead of reporting: ${e instanceof Error ? e.message : String(e)}`);
  }
});

// ---------------------------------------------------------------------------
// 6. The diagnostic still reports, since the runner renders it per scenario.
// ---------------------------------------------------------------------------
const diag = parallelismDiagnostic(EXEMPLAR);
if (diag.length !== 2) fail("parallelismDiagnostic", `emitted ${diag.length} lines for a 2-option call`);
if (!diag[0]?.includes("Runs the rebuild inside this migration.")) {
  fail("parallelismDiagnostic", `first line was "${diag[0]}"`);
}

// ---------------------------------------------------------------------------
console.log("");
if (failures > 0) {
  console.error(`${failures} calibration failure(s).`);
  process.exit(1);
}
console.log(`Exemplar clean at ${onExemplar.length} findings.`);
console.log(`Probe scores ${probeScore.value.toFixed(2)} with ${probeScore.errors} error(s) -- it fails, as it must.`);
console.log(`All ${TESTED_RULES.length} rules fire on a broken call and stay quiet on a correct one.`);
process.exit(0);
