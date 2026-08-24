#!/usr/bin/env bun
/**
 * Calibration test for the active rule set. There is nothing to calibrate yet.
 *
 * The prior fork's version of this file scored 11 worked examples from
 * `references/before-and-after.md` and asserted every broken call landed at 0.00 and every
 * repair at 1.00. It survives verbatim as `checks.quarantined.test.ts`. Two things stop it
 * running here: the corpus it reads does not exist until the skill is authored, and the
 * thresholds it pins belong to rules that are quarantined.
 *
 * What runs instead is a report, not an assertion. It states how many rules are active and
 * exits 0, because a red `make checks` here would carry no information the frontmatter test
 * does not already carry -- that runs first and fails on the absent SKILL.md, which is the
 * honest signal that the skill is not written yet.
 *
 * When the new skill states its rules, this file's job is to come back: restore the shape of
 * checks.quarantined.test.ts against the new corpus, so a threshold loosened to kill a false
 * positive cannot silently start passing a broken call.
 *
 *   bun checks.test.ts
 */

import { ACTIVE_RULE_COUNT, checkCall, scoreFindings, type Call } from "./checks.ts";

/** A call with a defect under every quarantined rule, used to show that nothing fires. */
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

console.log("checks calibration\n");
console.log(`  active rules      ${ACTIVE_RULE_COUNT}`);
console.log("  quarantined       32  (checks.quarantined.ts, see LINT-RULES-PENDING.md)");

const findings = checkCall(PROBE);
const score = scoreFindings(findings, PROBE);
console.log(`  probe findings    ${findings.length}`);
console.log(`  probe score       ${score.value.toFixed(2)}`);

if (ACTIVE_RULE_COUNT === 0) {
  console.log("\nNo rules are active, so this asserted nothing.");
  console.log("The probe above is a deliberately broken call and it scored 1.00.");
  console.log("Re-derive the rule set before treating any composition score as a measurement.");
  process.exit(0);
}

// Reached only once rules exist again, at which point the corpus-backed calibration from
// checks.quarantined.test.ts is what belongs here.
console.error(`\n${ACTIVE_RULE_COUNT} rules are active but this file still has no corpus to`);
console.error("calibrate them against. Port checks.quarantined.test.ts forward.");
process.exit(1);
