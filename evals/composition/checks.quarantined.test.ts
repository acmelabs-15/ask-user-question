#!/usr/bin/env bun
/**
 * Calibration test for checks.ts, run against this skill's own corpus.
 *
 * The README claims the linter scores every broken call in
 * `references/before-and-after.md` at 0.00 and every repair at 1.00, with no overlap. That
 * claim was true when written and unverifiable by anyone else, because the script that
 * produced it lived outside the repo. This is that script.
 *
 * It exists for two reasons beyond honesty. It is a regression test: a threshold loosened to
 * stop a false positive can silently start passing a broken call, and this catches that. And
 * it is the calibration standard in executable form, which is the only form that does not
 * rot. **A check that fails the exemplars is the check's problem**, and the exemplars are
 * here rather than in a fixtures file so they cannot drift from the documentation that
 * teaches them.
 *
 *   bun checks.test.ts          # exits non-zero on any failure
 */

// Points at the quarantined module, which is what this file is the record OF. It used to
// import `./checks.ts`, which was harmless while that module held no rules and became
// misleading the moment it held 27 different ones derived from a different artifact: a reader
// would have taken this as calibration of the active set against thresholds it never shared.
//
// This file still cannot run. `before-and-after.md` below belongs to the retired fork and does
// not exist here, so it exits ENOENT — the honest reason, and the same one it had before. It is
// not in `make checks`. Restoring it means bringing a corpus for the CURRENT rules, which is
// what `checks.test.ts` now does from SKILL.md's own worked example.
import { checkCall, scoreFindings, type Call } from "./checks.quarantined.ts";

const CORPUS = new URL("../../skills/ask-user-question/references/before-and-after.md", import.meta.url).pathname;

/**
 * Calls appear in the file as fenced json blocks, alternating before/after per example,
 * except example 6 whose repair is prose rather than a dialog. Indices rather than parsing
 * the headings, because the headings are prose and the fences are structure.
 */
const BROKEN = new Set([0, 2, 4, 6, 8, 10]);

const md = await Bun.file(CORPUS).text();
const blocks = [...md.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m) => m[1]!);

let failures = 0;
const fail = (msg: string) => { console.log(`  FAIL ${msg}`); failures++; };

console.log(`corpus: ${blocks.length} calls from before-and-after.md\n`);

if (blocks.length !== 11) fail(`expected 11 json blocks, found ${blocks.length}. The corpus changed; update BROKEN.`);

const scores: { i: number; broken: boolean; score: number; errors: number }[] = [];

blocks.forEach((raw, i) => {
  let call: Call;
  try { call = JSON.parse(raw); }
  catch (e) { fail(`block ${i} is not valid JSON: ${e}`); return; }
  const findings = checkCall(call);
  const { value, errors } = scoreFindings(findings, call);
  scores.push({ i, broken: BROKEN.has(i), score: value, errors });
});

const broken = scores.filter((s) => s.broken);
const repaired = scores.filter((s) => !s.broken);

console.log("broken calls   :", broken.map((s) => s.score.toFixed(2)).join(" "));
console.log("repaired calls :", repaired.map((s) => s.score.toFixed(2)).join(" "), "\n");

// 1. Every broken call is caught.
for (const s of broken) {
  if (s.errors === 0) fail(`block ${s.i} is a broken call and raised no errors`);
  if (s.score !== 0) fail(`block ${s.i} is a broken call and scored ${s.score.toFixed(2)}, expected 0.00`);
}

// 2. Every repair passes clean. This is the half that matters most: a linter that fails the
//    exemplars is worse than no linter, because people learn to ignore it.
for (const s of repaired) {
  if (s.errors > 0) fail(`block ${s.i} is a REPAIRED call and raised ${s.errors} error(s); the check is wrong, not the call`);
  if (s.score !== 1) fail(`block ${s.i} is a repaired call and scored ${s.score.toFixed(2)}, expected 1.00`);
}

// 3. The populations do not overlap. Stated separately because it is the claim the README
//    makes, and it can fail even when 1 and 2 pass if the scoring formula changes.
const worstRepair = Math.min(...repaired.map((s) => s.score));
const bestBroken = Math.max(...broken.map((s) => s.score));
if (!(worstRepair > bestBroken)) fail(`populations overlap: worst repair ${worstRepair}, best broken ${bestBroken}`);

// 4. Malformed input must produce findings, never a throw. checks.ts ships as a standalone
//    linter for drafts that have not been near the tool's schema.
const hostile: Call[] = [
  { questions: [] } as unknown as Call,
  { questions: [{ header: "x", options: [{ description: "no label here at all" } as any, { label: "Keep it", description: "d" }] }] } as unknown as Call,
  { questions: [{ question: "?", header: "x", options: [] }] } as unknown as Call,
  {} as unknown as Call,
];
hostile.forEach((c, i) => {
  try { checkCall(c); }
  catch (e) { fail(`hostile input ${i} threw instead of reporting: ${e}`); }
});

console.log(failures === 0
  ? `PASS  ${broken.length} broken at 0.00, ${repaired.length} repaired at 1.00, no overlap, ${hostile.length} hostile inputs handled`
  : `\n${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
