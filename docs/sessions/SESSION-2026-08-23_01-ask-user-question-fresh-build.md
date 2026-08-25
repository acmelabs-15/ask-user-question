---
title: "SESSION-2026-08-23_01: Ask User Question Fresh Build"
type: session
status: IN_PROGRESS
permalink: sessions/session-2026-08-23-01-ask-user-question-fresh-build
tags:
- session
- ask-user-question
- skill-authoring
- measurement
- plugin-kit
---

# SESSION-2026-08-23_01: Ask User Question Fresh Build

**Scope**: Build a new ACMElabs plugin `ask-user-question` authored fresh against plugin-kit standards, optimize its description and progressive-disclosure layout with plugin-kit tooling, evaluate it, and retire the `asking-users-questions` plugin entirely.
**State** (through Event 103, 2026-08-24): the skill is PROVEN — outcomes measured by design at +16.1 assertion points on sonnet (69.5% with against 53.4% without, Event 93), version 0.1.1 shipped with the locked table-of-contents standard in all six references as pure additions. The ground-truth map is derived by two-stage ablation and lives in the eval corpus as `expects_references` (16 rows, 6 negatives); every one of the six references is causally needed by at least one scenario, with the examples.md attribution refined to the file-plus-prose bundle after a 0-of-42-reads null killed the pointer lever on that route. The three-layer rewrite landed in plugin-kit (verdicts key on recall; doctrine and operator guide evidence-labeled), the structural-genre thread is complete (taxonomy, authoring reference, informational detectors), plugin-kit merged to a published main and its habit flags are removed. The reflect protocol replaced auto-memory writing; the sidecar SKILL-001 holds ten findings. Nothing posts to external GitHub, by owner ruling. Ledger timestamps are measured clock from Event 101. Open: D-8 (coverage gaps, budget stale), T-13 (install detection), the prepush residue, the examples.md content-boundary lever, and the owner's pending call on retiring the uninstall-plugin-kit item.
**Prior art**: this build follows the shared-layer restructure work carried out in the separate `plugin-kit` Brain project. Two notes there are load-bearing context and are named as plain text rather than wikilinks, because Brain wikilinks cannot resolve across projects: SESSION-2026-08-09_01 "Plugin Kit Shared Layer Restructure", and ADR-001 "Skill Creator Merge Conflict Resolutions".

## Tasks

Canonical task registry for this session. T-NN is the stable session-note ID; editor IDs are mirrors.

### Active (in_progress)

_Empty. All dispatched work is landed or explicitly stopped; the session is at a user decision point._

| T-ID | Group | Subject | Agent | Files | Effort | Created |
|:--|:--|:--|:--|:--|:--|:--|

### Backlog (pending)

#### Unblocked — ready to pick up

| T-ID | Group | Subject | Agent | Files | Effort | Created |
|:--|:--|:--|:--|:--|:--|:--|
| T-06 | Wave 5 | Wire `measure-outcomes` into the Makefile and reshape the eval set to `evals.json` shape | — | `Makefile`, `evals/` | M | Event 31 |
| T-07 | Wave 5 | Supply the 27 lint rules to `measure-outcomes` as an injected grader, so the run keeps a deterministic floor | — | `evals/composition/checks.ts` | M | Event 31 |
| T-11 | Wave 4 | Spend the held 18 characters on the review-a-draft hook | — | `SKILL.md` frontmatter + description sha rebind + trigger re-measure | XS | Event 29 |
| T-13 | — | Fix plugin-kit's install detection so it distinguishes "no competing copy" from "not reachable" | — | plugin-kit `shared/envelope.ts` | M | Event 30 |

#### Blocked

| T-ID | Group | Subject | Agent | Files | Effort | Blocked by | Created |
|:--|:--|:--|:--|:--|:--|:--|:--|
| T-09 | Wave 6 | Uninstall plugin-kit and hand-remove its marketplace entry | — | user config | S | GATED by owner ruling Event 119: executes only once plugin-kit is no longer needed for ask-user-question work — not before | Event 22 |

### Archive (completed + deleted)

<details>
<summary>8 archived tasks</summary>

| T-ID | Status | Group | Subject | Agent | Files | Effort | Created | Resolved |
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
| T-10 | completed | Wave 4 | Close the coverage gaps the user selects | — | `skills/ask-user-question/**` | M | Event 34 | Event 110 |
| T-12 | completed | Wave 5 | Run the outcome measurement | — | `evals/` | L | Event 31 | Event 93 |
| T-08 | completed | Wave 6 | Retire `asking-users-questions` and sweep its stray copies | — | external | M | Event 03 | Event 70 |
| T-01 | completed | Wave 1 | Create the `ACMElabs/ask-user-question` repo | W1a-repo | `<repo root>/**` | S | Event 10 | Event 15 |
| T-02 | completed | Wave 1 | Environment dedup plus copy inventory of the prior WIP | W1b-hygiene | prior WIP tree | S | Event 10 | Event 15 |
| T-03 | completed | Wave 1 | Verify plugin-kit tooling runs | W1c-tooling | `Makefile`, harness scripts | S | Event 10 | Event 15 |
| T-04 | completed | Wave 1 | Author the plugin-kit authoring standards brief | W1d-standards | standards brief | M | Event 10 | Event 15 |
| T-05 | completed | Wave 1 | Create this IN_PROGRESS session note | memory | `sessions/` | XS | Event 01 | Event 10 |

</details>

### Editor mirror IDs

| T-ID | CC-ID | Cursor-ID | Last synced |
|:--|:--|:--|:--|
| T-01 — T-05 | — | — | Event 15 |
| T-06 — T-13 | — | — | Event 34 |

### Pending User Decisions (surface on resume)

- None currently. D-8 locked at Event 108 (fold into owning sections); the fold draft is in flight with the gap inventory under re-verification.


## Event 01 — Session started

- Timestamp: 2026-08-23 20:22
- Project: plugin-kit (active project at session start; switched at Event 11)
- Branch: `restructure-shared-layer`
- Starting commit: `e6b584c`
- Dirty at start: `docs/continuation.md` uncommitted
- Goal: fresh-author the `ask-user-question` plugin against plugin-kit standards, optimize and evaluate it, retire `asking-users-questions`

## Event 02 — Brain context recovered after bootstrap_context timeout

- Timestamp: 2026-08-23 20:22
- Issue: `bootstrap_context` on the plugin-kit project timed out at 30s
- Fixed: context recovered via `search` instead; no context loss carried into wave 1
- Verified: session protocol satisfied without the bootstrap call

## Event 03 — D-1 locked: full waves 1-6 with a fresh-authored skill artifact

- Timestamp: 2026-08-23 20:22
- Decision: D-1 build sequence → run the full sequence waves 1 through 6
- Decision: D-1 skill artifact → fresh-authored, not ported from the prior fork

## Event 04 — D-2 locked: measurement infrastructure carries over, skill content does not

- Timestamp: 2026-08-23 20:22
- Decision: D-2 carryover → trigger runner, composition harness, judge, frontmatter tests and Makefile carry over from the prior WIP
- Decision: D-2 no-carryover → the skill body, all 8 reference files and the description are re-authored from scratch

## Event 05 — D-3 locked: the retired plugin is neither content source nor baseline arm

- Timestamp: 2026-08-23 20:22
- Decision: D-3 role of `asking-users-questions` → not a content source, and not a measurement baseline arm
- Decision: D-3 comparison arm → the no-skill baseline arm is the comparison
- Decision: D-3 disposition → deleted in wave 6

## Event 06 — D-4 locked: inherited composition lint rules quarantined

- Timestamp: 2026-08-23 20:22
- Decision: D-4 → composition lint rules inherited from the prior fork are quarantined and re-derived from the fresh doctrine
- Rationale: grading a fresh skill against the retired skill's rubric is circular

## Event 07 — D-5 locked: wait-what merges into the new plugin

- Timestamp: 2026-08-23 20:22
- Decision: D-5 → `wait-what` from mattpocock-skills merges into the new plugin, placed per plugin-kit standards

## Event 08 — Four measured defects recorded as the fresh author's fix list

- Timestamp: 2026-08-23 20:22
- Defect (a): references never pulled — pullRate 0 on all 8 against a 4,657-token body
- Defect (b): prose essayistic rather than actionable
- Defect (c): skill arm lost to the no-skill baseline on judge dimensions recognises-mistake 3.97 vs 4.19 and honest-recommendation 3.90 vs 4.21, and produced 4 recommend.multiple lint errors versus baseline 0
- Defect (d): description a 1022-of-1024-character wall
- Measured on: the prior fork, not the fresh artifact

## Event 09 — Standing rule adopted: probe the harness before editing prose

- Timestamp: 2026-08-23 20:22
- Rule: probe the harness before editing prose, carried forward as prior art for every wave
- Evidence: three separate scoring or configuration faults on the previous build each produced a number that read as a description defect — an invalid model id, the wrong harness, and an exact-match target string

## Event 10 — Wave 1 dispatched

- Timestamp: 2026-08-23 20:22
- Task: T-01 created → in_progress — repo creation (W1a-repo)
- Task: T-02 created → in_progress — environment dedup plus copy inventory (W1b-hygiene)
- Task: T-03 created → in_progress — plugin-kit tooling verification (W1c-tooling)
- Task: T-04 created → in_progress — authoring standards brief (W1d-standards)
- Task: T-05 in_progress → completed — this session note (memory)
- Next: reconcile wave 1 returns, then open wave 2

## Event 11 — Brain MCP outage, create_project root cause, and ledger migration

- Timestamp: 2026-08-23 20:36
- Issue: Brain MCP went down mid-session and stayed down across repeated retries; reads and writes both returned `Connection closed`
- Root cause: `create_project` wrote the new project's entry into the basic-memory config as a bare path string where every healthy entry is an object carrying `path`, `mode`, `workspace_id`, `local_sync_path`, `bisync_initialized` and `last_sync`; basic-memory died dereferencing `.path` on a string
- Fixed: entry repaired to the sibling object shape and the JSON revalidated; `list_projects` then returned the new project with a real UUID. Backup retained alongside the config as a `.bak-preflight` file
- Precedent: the same defect is recorded in the 2026-08-09 plugin-kit session ledger, so this is a reproducible `create_project` write-path bug rather than a transient crash
- Created: Brain project `ask-user-question`, mode CODE, memories rooted at the repo's `docs/` directory
- Changed: active Brain project plugin-kit → ask-user-question
- Migrated: this ledger from the plugin-kit project into ask-user-question by read, write, verify, delete; renamed off the now-wrong plugin-kit slug
- Changed: two prior-art relation edges downgraded from wikilinks to plain-text prose, because Brain wikilinks cannot resolve across projects
- Verified: zero stray edges left behind in plugin-kit; an exhaustive literal sweep over all 7 indexed notes there returned no reference to this note

## Event 12 — Orchestration budget ceiling lifted for this session

- Timestamp: 2026-08-23 20:55
- Decision: the default 15-delegation orchestration ceiling, with its 75 percent warn and 90 percent escalate thresholds, is lifted for this session; no cap on delegation count
- Decision: per-agent token figures in dispatch briefs are expected scale rather than limits — exceeding one is authorised, and the agent reports the overrun instead of truncating
- Withdrawn: the wave-1 brief instruction telling agents to name what they did not finish if budget ran short; completing the work now takes precedence over honestly reporting a gap
- Forbidden: trimming coverage to stay inside a stated number
- Precedent: the repo-creation agent spent roughly 74k against a stated 60k because it read all 365 lines of the inherited lint-rule file rather than guessing rule ids and line numbers, which produced a machine-verified table of 32 rules — correct under the new rule, and the kind of overrun that should happen
- Granted by: the user, explicit and unconditional

## Event 13 — Correction: the harness-gap observation was wrong on two counts

- Timestamp: 2026-08-23 20:55
- Issue: an observation recorded earlier this session stated that plugin-kit's skill-creator is documentation-only, and that the runnable harness scripts exist solely in an out-of-tree local checkout
- Contradicted by: the wave-1 authoring-standards analysis in this project, which verified ten harness scripts present on disk inside plugin-kit under `shared/operations/`, `shared/validate/`, `shared/report/` and `shared/tools/`
- Confirmed part: there is genuinely no `skills/skill-creator/scripts/` directory and no `run-loop.ts` anywhere in plugin-kit, so any brief citing that path is wrong about the path
- Corrected: the observation now records the path-level absence without the documentation-only claim and without the out-of-tree-only claim
- Mechanism: plugin-kit groups executables by function under `shared/` rather than by load mode, because none of it is read into context

## Event 14 — Evidence rules landed as a durable analysis note

- Timestamp: 2026-08-23 21:47
- Created: the evidence-rules analysis, recording four rules each derived from a failure in this session rather than from theory
- Rules: a flag reporting success is not evidence it took effect; a relayed or scope-widened claim is weaker evidence or none; a differential test must run where the variable is live; a selectively quoted measurement is a false claim
- Reason: the rules were paid for by four corrected premises and existed only in conversation prose
- Relations: reciprocal edges formed with this ledger and with the authoring-standards analysis

## Event 15 — Skill authored

- Timestamp: 2026-08-23 22:08
- Commit: `ba24391` — the skill authored, four files
- Verified: validator clean at both tiers; `make checks` exit 0
- Verified: the bundled specimen satisfies 19 of the skill's own rules mechanically

## Event 16 — make composition gated on absence, and a recorded belief corrected

- Timestamp: 2026-08-23 22:08
- Commit: `c6f85ef` — `make composition` now gated on the artifact being absent
- Corrected in the same commit: the recorded belief that the composition run needed no gate
- Mechanism: the `disclosed` arm does not inject — it points cwd at the skill directory and counts `Read` calls, so a visible copy floors its reference metrics

## Event 17 — Sentinel-value fault class added to the register

- Timestamp: 2026-08-23 22:08
- Commit: `447511a`
- Fault: `lsof` returning `0` reached `process.kill(0)`, which signals the caller's whole process group
- Why nothing rejected it: `Number.isInteger(0)` is true — a type test is not a range test

## Event 18 — Trustworthiness gate committed

- Timestamp: 2026-08-23 22:08
- Commit: `ff8d491` — the 876-line trustworthiness gate
- Also in scope: the records the gate judges, rescued from a directory `make clean` deletes

## Event 19 — Four triggering gaps closed by folding rather than appending

- Timestamp: 2026-08-23 22:08
- Commit: `746889b`
- Approach: folding into existing clauses rather than appending new ones
- Measured: eleven scenarios in user voice — two matched before, eleven after
- Cost: eleven characters

## Event 20 — Factual layer fixed after independent review

- Timestamp: 2026-08-23 22:08
- Commit: `09be5a4`
- Review returned: three HIGH and seven MEDIUM findings
- Verified: every claim re-checked against the installed 2.1.241 build
- Ship-blocker: the skill claimed a free-text box always exists, when a preview question has none

## Event 21 — Evidence-rules note committed

- Timestamp: 2026-08-23 22:08
- Commits: `4a9cd37`, `9889986`

## Event 22 — plugin-kit installed temporarily to run current-generation reviewers

- Timestamp: 2026-08-23 22:08
- Issue: the review that returned the ten findings used a different generation's reviewer
- Action: plugin-kit installed temporarily so its own current-generation reviewers could run against the artifact

## Event 23 — check-overlap is blind to the plugin cache tree

- Timestamp: 2026-08-23 22:08
- Issue: `check-overlap` cannot see 273 installed skills, because it never scans the plugin cache tree
- Inside the blind spot: the near-duplicate skill being retired, so the tool could not have reported the overlap it exists to find

## Event 24 — User ruling on retirement ordering

- Timestamp: 2026-08-23 22:08
- Decision: `oncall`'s dependency is fixed before the near-duplicate is disabled

## Event 25 — Trigger measurement of record

- Timestamp: 2026-08-23 22:13
- Measured: 52-query candidate eval set, 3 runs each, 156 probes; 47/52 passed, recall 90.1%, false triggers 11.1%
- Verified: all 15 gap-test rows fired, 45 of 45 attempts, across six `gap-*` groups
- Corrected: an aggregate of "14 rows / 42 attempts" was wrong; per-group figures were right and sum to 15
- Boundary read: row 51 fired 3/3 while row 32 declined 0/3, confirming the redrawn third exclusion
- Committed: `1ad0e60` — the measured eval set of record, with its annotation sidecar

## Event 26 — Composition lint rules re-derived from the frozen skill

- Timestamp: 2026-08-23 22:20
- Commit: `e41b79f` — 27 rules, 16 errors and 11 warnings, each carrying its SKILL.md line
- Verified: the acceptance probe that scored 1.00 against zero wired rules now fails at 0.00
- Declined: the inherited 22-pattern banned-words table, adopting only the two words the skill itself quotes
- Threshold correction: a sentence limit derived at 20 words would have fired on the skill's own 24-word worked example; set to 25
- Rejected: `recommend.absent` as an error, which the current skill contradicts at :222-224

## Event 27 — Absence guard made advisory on the three isolated targets

- Timestamp: 2026-08-23 22:41
- Commit: `6fb39ab` — `GUARD_FATAL := 0` on `measure-disclosure`, `disclosure` and `composition`
- Evidence: the harness spawn measured both ways — 0 plugin-namespaced entries with the isolation flags against 97 without, with `Read` surviving in both cases
- Corrected: a header conclusion stating this project's own plugin must be disabled before measuring; refuted by that measurement
- Corrected: an orchestrator citation naming the wrong file — the Makefile runs `measure-disclosure.ts`, which reaches isolation through a shared `runScenario` rather than declaring the flags itself
- No configuration was mutated; `oncall`'s dependency is untouched

## Event 28 — Description optimization loop rejected in favour of a hand-edit

- Timestamp: 2026-08-23 22:52
- Ran: the description optimizer, 5 iterations authorised, stopped at 2 on `all_passed`
- Result: winner scored train 32/32 and held-out 18/20, but train precision improved sixfold while held-out precision degraded — a memorisation stop
- Rejected: the winner deleted the five named exclusions, and a requirements-interview query then fired 3/3 on held-out, which a different skill owns
- Noise floor established: the loop scored identical baseline bytes at 45/52 where the dedicated run scored 47/52, so figures carry roughly ±2 queries of variance

## Event 29 — D-6 locked: ship three harvested phrasings, hold the fourth pending measurement

- Timestamp: 2026-08-23 23:00
- Decision: apply the three harvested clauses plus the compressions funding them; hold the review-a-draft hook and measure it instead of guessing
- Commit: `263146b` — description at 1002 characters, sha256 `107a6cea…`, one physical line, three parsers agreeing
- Re-measured: 49/52, recall 95.5%, false triggers 6.7%, all six gap groups holding at 15/15 rows and 45/45 attempts
- Corrected: the clause called "held-out validated" reached only 1/3 when extracted alone, while the clause labelled unverified delivered 0/3 to 3/3 — a held-out gain inside a multi-clause rewrite is not evidence for any one clause
- Commit: `b6e44ca` — the two queries deciding the held hook; the no-paste form fails 1/3 while the pasted form passes 3/3 twice

## Event 30 — Disclosure measured; all three references scored zero pulls

- Timestamp: 2026-08-23 22:48
- Measured: 12 scenarios × 2 runs; pass rate 88.6%, body 4,190 tokens, context mean 227,102
- Result: `register.md`, `re-pitch.md` and `reading-answers.md` each 0 pulls of 24, all verdicted `prune`
- Not the void signature: the skill loaded 24 of 24 times and the model made 40 `Read` calls on other things, so `Read` was available and simply never spent on a reference
- Confirmed absent: `measure-disclosure` takes no holdout, so the 12-scenario thinness cannot corrupt it the way it would corrupt the optimizer
- Defect found: the envelope records `install_state: absent` while the local guard exits 1, because plugin-kit's `detectInstallState` excludes the artifact under test by design

## Event 31 — D-7 locked: retire the local composition runner for plugin-kit's outcome measurement

- Timestamp: 2026-08-23 23:05
- Decision: retire `evals/composition/composition-runner.ts`, adopt plugin-kit's `measure-outcomes.ts`, keep the 27 lint rules as a standalone check
- Cause: two defects in the local runner were both symptoms of maintaining parallel infrastructure — eight reference expectations naming files that do not exist, flooring reference recall at 0.00; and a precision metric returning 1.00 when nothing was opened, rewarding not reading the references at all
- Migration cost established from source: reference-open counting moves to `measure-disclosure`; the lint rules survive as an injected grader; the eval format is `evals.json` shape, a copy of which is already archived under `evals/history/`
- Inherited: `measure-outcomes` calls the same install detection, so one fix in plugin-kit corrects both operations

## Event 32 — Typecheck gate added, and it found a dead guard on its first run

- Timestamp: 2026-08-23 23:12
- Commit: `b1d4432` — `tsconfig.json`, `package.json` and a `typecheck` target, following plugin-kit's own `tsc --noEmit` pattern
- Established: plugin-kit typechecks its own source and offers no typechecking service to other plugins, so this is convention-matching rather than duplication
- Found: `ACTIVE_RULE_COUNT === 0` was provably false against an inferred literal type, so the emptied-rule-set guard could never fire
- Commit: `1096bea` — annotation widened to `number` to keep the guard live, rather than deleting a check that protects against a state this module was actually in earlier today

## Event 33 — Session working directory was a stale non-git copy

- Timestamp: 2026-08-23 23:25
- Issue: the session's working directory was a separate directory from the repo, holding the previous generation of the skill including the eight reference files this session had been calling nonexistent
- Blast radius checked and clean: no artifact references the stale tree; the disclosure run recorded an absolute repo path; and the shipped trigger measurement's description sha256 matches the repo file exactly at 1002 characters
- Fixed: the stale copy moved to a dated backup and the path replaced with a link to the repo, so relative paths and `process.cwd()` consumers now resolve correctly without losing the session
- Residual: the absence guard's content sweep had been sweeping the stale tree all session; its config route, the half that found the plugin, was unaffected

## Event 34 — Coverage check against the retired skill

- Timestamp: 2026-08-23 23:27
- Created: ANALYSIS-003, the coverage check against the retired skill
- Method: plugin-kit's `synthesize-scenarios --inventory-only` against both skills for two independently derived capability inventories, then a rule-by-rule read of all 9 files and 2,267 lines
- Result: 11 real gaps of which 7 are strong; 6 groups correctly excluded by the description; roughly 40 rules covered differently
- Three findings are wrong guidance rather than silence: the ask-or-decide test lost its reversibility tiebreaker and now gives the opposite verdict on a confident-but-irreversible call; the meta-label ban is absent, so `Yes` and `No` pass every rule and every pre-flight item; and the independence test positively licenses pairing a decision with a sequencing question
- Corrected: two of ten prior candidates do not survive, and a third was declined as inflation
- Cost: the seven body-shaped gaps total roughly 300-340 tokens against about 600 spare
- Open: which gaps to close is undecided and sits with the user

## Event 35 — plugin-kit's authoring standard read in full, and two of my positions corrected

- Timestamp: 2026-08-24 00:05
- Read: the `plugin-kit:skill-creator` skill and all twenty files it points at, about 3,100 lines, after the user observed that framing a 600-token ceiling as the binding constraint meant progressive disclosure was not being used
- Corrected: the token budget is not the constraint it was being treated as. The doctrine says that at the limit the answer is another layer of hierarchy with clear pointers, not tighter prose
- Corrected: the disclosure result was over-read. `prune` means the pointer works and nothing needed the file, but the same page says deleting it is a hypothesis the loop tests, and only the measuring half was run. Two runs per scenario is named as the smallest number that can distinguish always from sometimes, and that is what was run. The twelve scenarios were also authored against the eight-reference fork, so they may never create the conditions the three current references fire on
- Established: the measured render facts are Gotcha-shaped by the doctrine's own rule, which keeps environment-specific traps in the body regardless of size
- Surfaced: plugin-kit's inventory tool reports four capabilities the description never mentions — the Gotchas block, the finished-call example, the pre-flight loop, and the bundled-files section. Its own guidance says to put that list in front of the user immediately, and it had been sat on

## Event 36 — nine findings from live use, distinct from the retired-skill gaps

- Timestamp: 2026-08-24 00:05
- Source: five rejected dialogs put in front of the user during this session, each rejection a real defect
- Finding: the question-length ceiling of about 25 words is stated in the body and checked by nothing; one dialog ran to 180 words
- Finding: no layout rule exists at all — the body governs word choice and sentence shape and says nothing about the visual form of the string
- Finding: the register standard is mandated but never demonstrated on a string that resists, so every rule can be satisfied while the sentence stays unreadable
- Finding: **the self-containment rule and the length rule cannot both hold.** Everything needed to decide goes inside the call, and the question is about 25 words. For a decision carrying eleven items both are impossible, and the skill offers no resolution. This is the root cause of the rejected dialogs
- Finding: nothing requires the question to state what the reader is being asked to do; one dialog served as a layout test and a decision at once and was unanswerable for that reason
- Finding: sentence case with terminal punctuation reads better than lowercase fragments in a list, per direct user observation
- Finding: the middle dot reads well as a marker; circled numerals carry marker weight at single width
- Finding: decoration with a closing right edge cannot be hand-authored reliably — drawn boxes misaligned in both the question field and the preview pane on the same render
- Finding: emoji degrade to their monochrome text glyph rather than rendering in colour

## Event 37 — two research tracks dispatched, each authoring its own analysis note

- Timestamp: 2026-08-24 00:07
- Dispatched: tool-capability research — per-field render behaviour, Unicode width safety, length limits, Claude Desktop versus Claude Code, and an audit of the retired 348-line tool contract against the current build
- Dispatched: readability research — scannability in monospace without colour or weight, list and hierarchy in plain text, marker glyphs, sentence case, chunking limits, and decision-dialog design, with concrete checkable rules as the required output
- Both briefed to author their findings as Brain analysis notes directly rather than reporting prose, and to separate measured evidence from convention from judgement
- Held until the research lands: the placement plan for the eleven retired-skill gaps and the nine findings above

## Event 38 — a follow-up gap found, and it is another rule pointing the wrong way

- Timestamp: 2026-08-24 00:20
- Raised by: the user, asking whether the skill covers when an answer should prompt a follow-up
- Verified: three narrow cases are covered — a sequence planned in advance when one answer changes another's options, a confirming second question when the recommendation is irreversible, and asking again after a question failed
- Gap: nothing covers a clean answer that opens a new fork, and the nearest rule discourages it. `reading-answers.md` says of a matched label "Proceed with that option and do not re-confirm it", which is right for re-confirming and reads as blanket discouragement of a second dialog
- Structural consequence: six findings are the same topic — series position, run budget, approval scope widening after a clean answer, re-ask hygiene, follow-ups after a successful answer, and the reader's picture of the work drifting across calls. The earlier plan scattered them across three destinations; they belong in one reference that owns the run, with the firing condition "you are about to ask a second time"
- Also assessed: plugin-kit's diagram doctrine. Most sections fail its test, since a diagram that restates a table or a linear checklist costs tokens on every invocation for less clarity. The run reference is the one candidate that passes, because its branches want opposite fixes

## Event 39 — monospace layout rules landed as an analysis note

- Timestamp: 2026-08-24 00:22
- Created: ANALYSIS-005, thirteen layout rules each with a mechanical check and a confidence class
- Overturned, with evidence, two glyph choices this session had adopted: the dingbat circled numerals are present in 1 of 7 monospace faces surveyed and absent from both the macOS and Windows terminal defaults, while the middle dot is present in all 7 but is East Asian Ambiguous, so its width depends on an invisible terminal setting. The intersection of universally present and unambiguous is the hyphen, asterisk, greater-than and bullet-operator
- Corrected: box-drawing failure was structural rather than arithmetic. The whole block is Ambiguous width, and one surveyed face carries the box characters in its Regular weight and none in its Bold
- Rule derived: decoration is worth it exactly when the host owns the padding, which makes the preview pane the positive case and hand-drawn boxes the negative one
- Corrected: uppercase group headers cost 10 to 20 percent reading speed against Title Case, measured 1955 and replicated 2019
- Honest negative: no controlled study was found either supporting or refuting that lowercase fragments read worse than complete sentences. The sentence-hood claim was replaced with a checkable substitute rather than dressed as measured
- Measured against the real case: eleven items across four groups is 2.75 per group and inside every threshold found, so the risk is the group count rather than the item count
- Left open and flagged rather than guessed: whether the pane soft-wraps and where a continuation starts, whether width is measured by display cells or code units, and the pane's actual column width

## Event 40 — tool capability audited against the shipped binary

- Timestamp: 2026-08-24 00:35
- Created: ANALYSIS-004, read out of the installed 2.1.241 binary with byte offsets recorded, and measured with the host's own width function
- Reversed a current skill claim: previews are **on by default** in the terminal. The format env var defaults to markdown for the CLI client type, the renderer never checks the format, and the layout selector branches only on whether a single-select question carries a preview
- Established: `preview` is the only field that renders markdown, and it renders it fully — headings, emphasis, lists, blockquotes, tables and fenced code with highlighting. `question` preserves newlines but renders no markdown; `label` and `description` turn a newline into a literal replacement character
- Established: the host measures width with its runtime's width function under narrow-ambiguous, not string length, and truncates grapheme-aware. The dingbat circled numerals measure 1 under both settings, so no terminal setting can widen them — which confirms the width half of the user's suggestion while ANALYSIS-005's font-coverage half still rules them out
- Costed: the preview layout drops every option description, has no free-text box, and its pane is the terminal's columns minus 34 by rows minus 26, so it is a large-terminal feature
- Corrected three further skill claims: multiSelect does have a conversational escape behind a screen-reader gate, option lists do scroll, and the header's hard cut is 48 display columns rather than the advisory 12
- Named as unused: image paste, an external editor on a keystroke, notes on a preview question, an AFK timeout setting, and the fact that "Chat about this" returns a reformulation instruction with the reader's partial answers rather than abandoning the call

## Event 41 — surface portability resolved, and it is smaller than feared

- Timestamp: 2026-08-24 00:37
- Created: ANALYSIS-006
- Frame that decides it: there is exactly one implementation of the tool, compiled into the binary. Only two things vary — whether the binary runs, and who draws the dialog. A bridge can race the terminal dialog and win; a chat channel cannot, because the tool declares that it requires user interaction, which is the predicate excluding channel callbacks
- Split: three claims are universal because one implementation exists; four are terminal-dialog facts; one is wrong as worded, since headless is conditional rather than prohibited and scheduled runs are the same clause
- Finding worth its own line: the destructive-first rule is correct everywhere and its stated reason is terminal-only. It rests on a single single-select submitting on one keystroke, so the rule needs a surface-independent justification — a first option is the default, and a default carries decision weight whatever draws it
- Exposure bounded: the skill ships as a plugin, and plugins load only in Claude Code, Desktop Code and Cowork. Chat, web and mobile cannot load it at all, so an over-broad claim cannot mislead a reader there
- Recommended and accepted in principle: narrow the compatibility field to drop the any-runtime clause, mark exactly four Gotchas as terminal facts with a marker used nowhere else, leave the rest unmarked, and restate the headless clause as conditional
- Measured: the description is 1002 characters against a 200-character cap on the web surface, so that route would require rewriting the field the skill can least afford to compress

## Event 42 — glyph set ruled on, and the preview trap identified as a session-long own goal

- Timestamp: 2026-08-24 00:50
- Measured with the host's own width function, both ambiguity settings: the approved markers `◦` and `∙` are one cell under both, as are the pointer and status glyphs and the dingbat circled numerals. The plain bullet is ambiguous at one or two cells, and the warning sign with a variation selector is always two — which is the mechanism behind the degraded glyph seen in an earlier render
- Decision: the owner rules `◦` and `∙` as the marker set and waives font coverage as a concern for their own machine. Width facts are kept because they are what breaks alignment; coverage caveats are dropped
- Found: adding a preview to any option on a single-select question switches the whole question to the preview layout, which renders pointer, index and label and **drops every option description**. Every dialog put in front of the user this session carried carefully written descriptions stating costs and tradeoffs, and none of them were displayed
- Consequence: the reasoning meant to make those dialogs answerable was being written into a field the layout discarded, which is a sufficient explanation for several of the rejections on its own

## Event 43 — the authoring dispatch, and the baseline it must be measured against

- Timestamp: 2026-08-24 00:52
- Snapshot taken before any edit, per the method's rule that the arrived-with version is the baseline and is gone once editing starts in place: 366 lines, 20,027 bytes, description 1002 characters at sha `107a6cea`
- Dispatched: one authoring pass over four ordered commits — corrections first because they are the only category actively misleading a reader, then the layout standard, then nineteen gaps, then six unused capabilities with the surface marking
- Briefed to load the authoring skill formally and read the disclosure doctrine before deciding any placement, rather than improvising the method
- Instructed: if a group would breach the 500-line or 5,000-token budget, stop and report rather than compressing prose, because the doctrine's answer at a size limit is more hierarchy and not tighter writing
- Still open and unowned: the trustworthiness document carries an uncommitted diff with two claims that have since become false — that the composition lint module holds zero rules, and that the absence guard is a hard prerequisite of the composition target

## Event 44 — the revision landed in four groups, then kept going

- Timestamp: 2026-08-24 01:00
- Commits `0f03584` through `d8b43f3`: five false tool claims corrected, the layout standard added with its render facts as Gotchas, nineteen coverage gaps closed, six unused capabilities documented, four Gotchas marked terminal-only, and the compatibility field narrowed
- Structure changed on the owner's direction that the reference set was not fixed: the layout standard was split out of the wording file rather than crammed into it, on the test that they have different firing conditions — one fires when a string will not come down, the other when a call needs shaping
- Result: five references and a root specimen where there were three references

## Event 45 — a budget dispute I lost, and the arithmetic error behind it

- Timestamp: 2026-08-24 01:05
- I ruled that a forecast breach was not real, on a measurement showing the repo's estimator overstating tokens by 9.1 percent
- Corrected by the author agent, which read the test rather than accepting the figure: the test divides by 4.35 and not by 4. My divisor was the outlier; the test's estimator is accurate to about one percent and the breach was real
- Confirmed independently by plugin-kit's own validator at 5,456 body tokens, within one token of the tokenizer figure
- Resolution better than either option on the table: plugin-kit's validator reports the same content as **valid with one warning**, so the repo gate was stricter than the upstream tool whose doctrine it enforces. The gate now matches that severity — warn at 5,000, fail at 5,800 — and measures with a real tokenizer rather than an estimator
- Rejected: moving the pre-flight list behind a pointer, because the doctrine names the validation loop as one of exactly two things that stay in the body regardless of size. Rejected: cutting researched content to fit a number

## Event 46 — the glyph set, ruled twice and wrong once in each direction

- Timestamp: 2026-08-24 01:15
- The owner waived font coverage and asked for a richer set. Measured against the host's own width function, every glyph he named is one display cell except the plain bullet, so granting the whole list cost one caveat rather than a redesign
- Ruled: one glyph per job, because offering two without a condition is the menu-of-equals pattern the authoring doctrine names by name
- Corrected by the author agent: my first table claimed every glyph was stable, and the circled-numeral family has near-identical siblings that are Ambiguous and needed their own prohibition
- Corrected by me, wrongly: I told it the middle dot was stable per the host's function. An independent review confirmed it is East Asian Ambiguous and that the host simply does not honour that class for it — the claim is about what a terminal draws, so the file was right and I retracted
- Fourth width claim of the session to need checking, and the second I got wrong

## Event 47 — every file and heading renamed in plain words

- Timestamp: 2026-08-24 01:25
- Raised by the owner: a reader could not guess what two of the reference filenames were about
- Principle behind it: a filename is a pointer's first word, so an opaque name defeats a well-written firing condition. This is the same failure the zero-pull measurement was about
- Renamed to say what each file is for, with the run file taking the name of its own condition

## Event 48 — an independent review, and eight findings

- Timestamp: 2026-08-24 01:35
- Ran plugin-kit's skill-reviewer against the revised artifact
- Worst finding: the run reference set an obligation and never said which field carries it, so a composer could follow every word of it, put the signal in the message above the call, and reach nobody — for a reason the body's first Gotcha already documents
- Second: its flowchart collapsed two cases the file's own opening paragraph says need opposite treatment
- Third: both worked examples in the layout standard breached the standard's own 60-column rule, and the summary under one of them asserted the opposite
- Also found the predicted duplication failure already realised: a reference enumerating four non-decisions where the body has five, having drifted within hours of being written
- All verified fixed against the files rather than the report

## Event 49 — three specimens, and the priority rule the owner identified

- Timestamp: 2026-08-24 01:50
- Added: a preview specimen showing three options whose previews carry the same four items changing verdict, with the trap annotated — the preview layout displays no description, so every description in that call is written on the assumption nobody reads it
- Added: the rendered form beside the escaped JSON, because a specimen whose shape is invisible is prose
- Added: a long-context specimen, the commonest real case and the one with no example — several items, no rendering needed, so the structure stays in the question
- Behavioural correction the owner identified: agents fear a long question and drop context, which is the failure that costs a round trip. The word ceiling governs the decision sentence and not the field, and everything the reader needs goes in regardless
- Added: a selection table the skill never had, giving the four cases and what each costs
- Measured: the long specimen renders at 57 cells widest across 14 lines, with a 10-word decision sentence

## Event 50 — the decision sentence rule, settled by the artifact rather than by either argument

- Timestamp: 2026-08-24 01:55
- Commit `23f36d0`. I framed it as decision-last against front-loading-wins and asked the author agent to pick a side; it took neither
- Resolution: orient first, context, decide last — which is what the long specimen already did. The distinguishing thing at field level is the subject rather than the question mark, so this is the front-loading rule applied one level up rather than an exception to it
- Why that matters beyond precision: carving an exception would have left a reader believing the standard contradicts itself where it does not
- Placement: the reasoning sits beside the rule it reconciles rather than in the section that states it, because a reconciliation stated far from one of its halves is one nobody meets
- Recorded: stating it in full in the body would have breached the ceiling, so it moved to the reference instead — the agent applying to itself the rule it had been given

## Event 51 — the body is full on both axes

- Timestamp: 2026-08-24 01:55
- Measured: 5,785 tokens against a 5,800 ceiling, and 457 lines against 500
- Every round of this revision has found something that belonged in the body, so the next finding arrives with nowhere to go
- Consequence recorded now rather than under pressure: the honest options at that point are a restructure that pushes a whole section behind a pointer with a real firing condition, or a considered raise with an argument. Not another squeeze

## Event 52 — plugin-level audit, and a correction to plugin-kit's own documentation

- Timestamp: 2026-08-24 02:05
- Structurally sound: both silent-failure layout invariants satisfied, no path overrides, no dangling references, no machine-anchored paths in shipped content, version agreement across manifest and marketplace, and `claude plugin validate --strict` clean
- Four findings, all distribution hygiene rather than loading failures. The retired plugin is still listed in the shared marketplace with a near-duplicate description, which would split triggers for a fresh install although it is disabled on this machine. No LICENSE file despite the manifest declaring one. The homepage and repository fields name a remote that does not exist and has never been pushed to. And roughly a megabyte of development payload would travel with every install against a hundred kilobytes of skill, including seven knowledge-graph notes carrying wikilinks that resolve to nothing outside this project
- Correction to plugin-kit, proven with a control plugin rather than read: under `--strict`, a manifest-stage warning short-circuits the run before component checks happen at all. Its own reference says the validator walks the component directories, which holds only once the manifest passes
- Deferred deliberately: none of the fixes land while disclosure measurements are in flight, because mutating installed state mid-measurement produces a figure nobody can reproduce

## Event 53 — two independent plugin reviews, and the second found what the first called clean

- Timestamp: 2026-08-24 02:20
- Ran plugin-kit's plugin-creator skill as one pass and its plugin-reviewer agent as a second, deliberately independent, with the first asked to predict what the second would catch
- The second escalated two findings the first classified as hygiene, corrected one figure by a factor of 2.5, and found two the first missed — one of them a loading failure rather than hygiene
- **The installed plugin has no skill in it.** Its cache directory holds a zero-byte placeholder where the skill should be, frozen at a timestamp before the skill was authored. The version has never moved off its initial value and the cache is version-keyed, so it has never been invalidated. It loads on this machine only because a file-source marketplace serves the live directory instead
- The sharper half: the first pass read three-way version agreement as a clean result. Agreement is not the property that matters — the version never moving is what broke the cache, so a frozen number that matches everywhere is the defect rather than the reassurance
- Also found: no install path exists for anyone else. The plugin has no git remote, its parent directory is not a repository, and the manifest advertises a GitHub URL that does not resolve
- Correction to my own relayed claim: the install payload is 396K rather than the megabyte I reported, and against its neighbours in the same cache this is the leanest plugin there by an order of magnitude. I had measured the repository rather than what installs

## Event 54 — a false claim with three homes, and the fix that ends the class

- Timestamp: 2026-08-24 02:30
- The claim that the composition linter holds zero rules and scores a clean figure on any input was corrected in the trustworthiness document earlier today, and declared fixed
- It had two more homes: the README, found by an outside reviewer, and the pending-rules note, found by the author agent. All three had drifted independently
- Rule taken from it: when a stale claim is found, sweep for its copies before calling it fixed. A claim worth stating once is usually worth stating twice by someone, and the copies drift apart
- Fix adopted is stronger than correcting three copies: the number is now stated in no prose anywhere, and the README points at the command that computes it and verifies each rule fires on a broken call and stays quiet on a correct one. A fourth copy cannot drift because there is no fourth copy to write

## Event 55 — the diagnosis that explains four errors in one sentence

- Timestamp: 2026-08-24 02:35
- Four rulings today held as reasoning and failed as citation: the token divisor, the middle-dot width class, which file carried the isolation flags, and a header convention with its line arithmetic
- **The failure mode is not reasoning, it is citing.** Reasoning gets checked by argument, which happens naturally in a conversation. A citation only gets checked when someone opens the thing, and four times nobody did until it mattered
- Why it stayed invisible: every one of those claims sat inside an argument that was sound, so the argument passed review and carried the unexamined citation through with it
- Turned into a test rather than a story: any sentence of the form "X was measured as Y" where nobody has opened X. The author agent applied it to its own staged work and opened all four of its own such claims

## Event 56 — two layout rules the owner's use surfaced, and a contradiction one of them created

- Timestamp: 2026-08-24 02:45
- A group header takes no blank line after it. The blank separates groups, so one on both sides makes a header ambiguous about which group it labels. Verified against three command-line tools' help output rather than asserted — every header, items immediately beneath
- Where every item in a group carries a status, the status glyph replaces the leading marker, so the verdicts form a column and the answer is first on the line rather than last. This is the front-loading rule applied to status
- The condition is per group rather than per list; a mixed group keeps the ordinary marker; a nested item keeps its own regardless
- Two payoffs, and the second is the one a composer misses: varying statuses make the column informative row by row, while uniform ones mark that whole group against the others, which survives a reader whose eye lands mid-list rather than on the header
- **The second rule made an existing rule false** — the marker rule said a list uses one glyph then another "and stops there" — and the author agent caught it and fixed both in the same change. A file that argues with itself teaches whichever half a reader opens first

## Event 57 — the disclosure measurement, and it is the answer nobody wanted

- Timestamp: 2026-08-24 02:55
- Ran against a rebuilt scenario set of 27 scenarios and 131 expectations, each reference given four or five scenarios designed to create its stated firing condition, plus four no-fire controls. Install state probed absent before launch, so a same-named installed copy could not floor the rates
- Result over 54 runs: the skill loaded 53 of 53, expectations passed 219 of 257 at 85.2 percent, context averaged 312,068 tokens, and **not one of the six references was opened in any run**
- The decisive detail came from the per-run logs rather than the summary: the model used the read tool **154 times across 42 of the 53 runs**. It had the tool, reached for it freely, and never once pointed it at a bundled file. So this is not an absence of reads; it is reads landing everywhere except the skill's own files
- Three independent fixes had gone into that failure the same day — an explicit firing condition on every pointer, plain-language filenames, and a split from three files to six so each carries one recognisable trigger. **No effect on pull rate**
- Honest form of the claim, and the one to quote: zero observed by an instrument with a known blind spot. The shell ran in all 53 runs across 173 calls, and a file opened that way is invisible to this measurement. That does not overturn 154 explicit reads landing elsewhere, but the caveat travels with the number
- Consequence: the question is no longer how to lay the references out. It is whether roughly nine hundred lines across six files earn their existence when the artifact works without them and nothing opens them. The optimizer tests deletion as a hypothesis rather than assuming it, and it runs next

## Event 58 — the citing rule extends, and the author agent found the extension in itself

- Timestamp: 2026-08-24 03:00
- Before applying its staged change set, the author agent compared its own item count against the apply script's anchor count — thirteen against twelve — and found two edits it had measured, reported with confidence, and **never staged**
- Landing on its own report rather than on the artifact would have shipped an empty commit while claiming the rebuilt specimen was in
- The generalisation, which is broader than the rule we had been using: **a measurement is not evidence that the thing measured exists in the artifact.** Every earlier instance today was one party checking another's claim about a measured thing. This was a party's own claim about something genuinely measured and never built, and it passed its own review because the measurement was real and only the deliverable was missing
- Landed as `048339e` and `80ea10d`: the layout standard's internal contradictions resolved, its three undefined nouns defined, a check that cited two different measures reconciled, per-rule examples added where a shape shows what a sentence cannot, a recognition table replacing prose that described strings, and both specimens rebuilt
- Verified against the artifact rather than the report: the eleven-finding repair renders at 22 lines, widest 58 display cells, nothing over 60, four groups at the cap, with the status glyph taking the marker slot in the group where every item carries one

## Event 59 — the zero was the instrument, and finding that took five dead hypotheses

- Timestamp: 2026-08-24 03:30
- The disclosure result reported in Event 57 — six references, zero pulls across 54 runs — is void. The references were being read the whole time
- Evidence that forced the reopening: transcripts reproduced text present only in a reference and absent from the body, across all six files and 28 of 54 runs, including a phrase added by a commit minutes before the sweep began, which rules out memorisation
- Five explanations were killed in turn: prune the references, the instrument is broken in general, our pointers are unresolvable, reads are being denied, and the pointer-form difference. Two of the five were mine. The instrument records pulls up to 1.00 on the tool's own skills, and those skills use the same bare relative pointer form as ours
- **Root cause, found by reading the collector rather than reasoning about it:** on macOS the temp directory is reached through a symlink, so the skill directory the collector holds and the paths the model actually uses differ by that symlink. The comparison normalises but does not canonicalise, so a genuine in-skill read is classified as outside and never counted
- Reproduced independently: the relative path between the two forms comes back with a parent-directory prefix, which the check reads as outside the skill. Four of six diagnostic probes opened at least one reference by correct absolute path; none was counted
- Second defect found alongside it: the flag recording whether the skill loaded is set when the request is seen and never checks the result. One probe called the skill twice, both returned errors, the model improvised the entire answer with nothing from the body or the references in its reply, and that run would still have been recorded as having loaded the skill
- **The two compound, and that is the finding worth carrying:** a run that measured nothing looks like a clean sweep of deletion verdicts, and the pass-rate guardrail cannot catch it because the content is still reaching the model by a route the instrument cannot see

## Event 60 — measured again without touching the tool

- Timestamp: 2026-08-24 03:40
- Fix chosen: point the run's temp root at a path not reached through a symlink, rather than edit a tool that belongs to another project and is under active development. Verified with the collector's own comparison before launching and against a live worker root during the run — literal path and canonical path identical in both checks
- Re-launched against the corrected artifact, three commits later than the void sweep, with the write-permission flag the first run omitted. That omission had depressed the earlier pass rate by about one point, measured rather than assumed
- The tool's own repository confirmed untouched: no edit, no patch, no local divergence
- An upstream report is drafted covering both defects with file, line, reproduction, blast radius and a workaround available today, so a reader has something to do rather than waiting for a fix
- What stands from the void sweep: body tokens, context cost per run, and the pass rate, none of which depend on the path comparison. What does not: every per-file verdict

## Event 61 — the install cache fixed, and two claims in the brief were wrong

- Timestamp: 2026-08-24 01:50 PDT
- Clock note: every stamp from Event 47 to Event 60 runs about two hours ahead of this machine's clock, which agrees with `date`, with file mtimes and with commit times. Stamps from here carry an explicit zone. The apparent jump backwards at this event is that correction, not disorder
- Version moved 0.0.1 to 0.1.0 in three coupled places: the plugin manifest, the skill's frontmatter `metadata.version`, and the marketplace entry. The coupling is enforced by `evals/frontmatter.test.ts`, which asserts the first two agree. Commit 21a9c1f
- `claude plugin update ask-user-question@ACMElabs` then repopulated the cache with all seven files. Verified in the cache copy rather than in the report: SKILL.md at 456 lines, description 1002 characters, sha 107a6cea, `metadata.version` 0.1.0
- First correction. The empty cache was not what served the skill and was never load-bearing. The ACMElabs marketplace is a `file` source whose `installLocation` is the working tree, so the loader reads the repository directly — which is why the live skill was current all session while the cache held a zero-byte `.gitkeep`. The contradiction was visible from the start: the skill was in the session's own skill list
- Second correction. It was not a packaging defect either. All seven skill files are tracked and unignored, so a fresh clone was never broken. What was stale was one snapshot of commit b8583360, taken before the skill was written
- `homepage` and `repository` are not a naming error and were left alone. Every sibling plugin uses `acmelabs-15/<name>`, and `oncall` and `zephyr-mcp` ship with the same not-yet-created repository. The org exists; four sibling repos resolve
- The retired plugin was removed from the marketplace, which left a dangling install record reporting `Plugin asking-users-questions not found in marketplace ACMElabs`. Uninstalled properly to close the half-state rather than leave the error standing

## Event 62 — the references cleared, and the instrument was the whole story

- Timestamp: 2026-08-24 01:52 PDT
- The sweep launched at Event 60 completed: 27 scenarios, two runs each, 54 of 54 logs
- Every bundled file inverted. examples.md 32 pulls at 59.3%, wording.md 24 at 44.4%, layout.md 21 at 38.9%, failed-question.md 12 at 22.2%, asking-again.md 11 at 20.4%, reading-answers.md 6 at 11.1%. All six verdict `keep`, where all six had been 0 pulls and `prune`
- The cleanest proof is not the verdicts but the read counts. Sweep one recorded 159 `Read` calls and 0 classified in-skill; sweep two recorded 154 and 106. Near-identical behaviour, opposite measurement
- Both sweeps returned `success` on all 54 runs, so no part of the difference is failed runs
- Pass rate moved 0.8473 to 0.9008. Explicitly NOT attributed to the fix: the temp-root change alters only how a read is classified, never what the model receives. Treat it as run-to-run variation until a repeat bounds it
- Context per run moved 317,145 to 412,953, which the classification account does not explain. That figure is a sum dominated by cached-prefix reads, so it is recorded as unexplained rather than reasoned about
- The standing decision to reject deleting the references is now measured rather than argued. The evidence that would have justified deletion was an artifact of the tool

## Event 63 — both collector defects fixed, and the second one had disabled a guardrail

- Timestamp: 2026-08-24 02:00 PDT
- Worked in a git worktree at /tmp/pk-fix on branch `fix-disclosure-collector-symlink`, so the shared plugin-kit checkout kept its own branch and the session working there was not disturbed. Baseline before any edit: 1495 pass, 0 fail across 43 files
- First defect, commit 4710db8. `resolve` is string arithmetic and leaves symlinks intact, so a skill installed under a `/var/...` temp root never matched reads reported through the canonical `/private/var/...`. Fixed by resolving the longest existing ancestor and rejoining the missing remainder, which also handles a path that no longer exists
- Second defect, commit 02248f3. `skillLoaded` was set the moment a `Skill` tool-use appeared and never read the result. The interface already documented the opposite — "whether the body reached context at all" — so this restored the contract rather than changing it
- Blast radius of the second, which is wider than the field. `skillLoaded` gates `countedRuns`, so failed runs sat in the denominator of every pull rate; it gates `runsWithoutSkill`, which drives the harness warning, the report health banner, and the baseline warning in optimize-disclosure. None of those could fire, because the input was true whenever a load was merely attempted. CORRECTION: this bullet, and commit 02248f3's message, both called that last one a guardrail that REFUSES a layout. It does not. optimize-disclosure.ts:566 emits a console warning and blocks nothing; the only thing that refuses is the assertion pass rate, named as the guardrail at optimize-disclosure.ts:17. Asserted twice without opening the function, which is the session's own rule broken again
- Verified by replay over six real transcripts rather than by argument. Unfixed: 6 of 6 loaded, 0 pulls. Fixed: 4 of 6 loaded, 6 pulls. The two that flip are the runs whose `Skill` calls returned `is_error: true`, one of them the probe where both calls failed and the model improvised the entire answer
- A near-miss worth recording. `is_error` is ABSENT on success, not `false`. Twelve successful results across those transcripts carried no flag, so `=== false` would have called every one a failure — the same shape of mistake as the defect being fixed. Caught by opening the transcripts instead of assuming the shape
- Pulls were deliberately left on the request. A pull asks whether the body's pointer sent the model to a file, and reaching for it is the evidence; a load asks whether content arrived. The distinction is commented in place so it does not read as the same bug left half-fixed
- Each fix carries a regression test that fails on its parent commit. The symlink test is the only case in that file touching the disk, because a symlink cannot be faked with a synthetic path. After both: 1502 pass, 0 fail, typecheck clean. Nothing pushed
- A third sweep is running against the fix-1-only commit with the temp root back to default, deliberately holding fix two out so the comparison isolates one change

## Event 64 — the patch agrees with the workaround, and the outlier was the middle run

- Timestamp: 2026-08-24 02:15 PDT
- Third sweep complete against commit 4710db8, temp root back to default, fix two deliberately held out so the comparison moved one variable
- Verdicts agree on all six files, `keep` against `keep`. The patch reproduces the workaround's conclusion without the workaround
- Per-file pulls move in both directions and total 106 against 96: examples.md 32 to 23, layout.md 21 to 23, wording.md 24 to 21, asking-again.md 11 to 11, failed-question.md 12 to 9, reading-answers.md 6 to 9. Nothing collapses to zero and no verdict flips, so the movement is the model not reading identically run to run
- The third point settles two figures Event 62 refused to interpret. Pass rate across three sweeps of identical bytes: 0.8473, 0.9008, 0.8321. Context per run: 317,145, 412,953, 299,156. The workaround sweep was the outlier on both. This bullet called that noise, and CORRECTED IN EVENT 65: the pass-rate spread is not noise, it is the load-failure rate, which was unmeasurable until the second fix landed
- Noise band for pass rate on this scenario set is therefore about seven points across three runs, wider than the two-query band measured for triggering. Quote it when comparing sweeps
- `runs_without_skill: 0` on all three sweeps is NOT evidence of anything. All three predate the second fix, so the field was true whenever a load was merely attempted; it cannot distinguish no failures from invisible failures
- A fourth sweep is running against commit 02248f3 with both fixes to close that, and to show whether the guardrail in optimize-disclosure now has anything to fire on

## Event 65 — a third of the runs never got the skill, and that was the noise all along

- Timestamp: 2026-08-24 02:25 PDT
- Fourth sweep, commit 02248f3, both fixes, temp root default. 18 of 54 runs never loaded the skill. All 18 requested it and were refused, so this is a load failure and not a routing failure — the distinction the second fix added `skillRequested` to make, paying off on its first real run
- `countedRuns` falls 54 to 36 and every pull rate rises accordingly: examples.md 42.6% to 69.4%, wording.md 38.9% to 69.4%, layout.md 42.6% to 50.0%, failed-question.md 16.7% to 41.7%, asking-again.md 20.4% to 36.1%, reading-answers.md 16.7% to 27.8%. All six stay `keep`
- The harness warning fired for the first time: "the skill never loaded on 18 run(s). Those runs are excluded from every pull rate, so the verdicts rest on less evidence than the run count suggests." It could never have fired before, because its input was true whenever a load was attempted
- Checked for a false negative rather than assuming the number. The two populations separate on every independent axis: loaded runs score 0.949 with a mean of 2.94 in-skill reads and 350k context; unloaded runs score 0.667 with ZERO in-skill reads in all 18, 7 Read calls between them, and 226k context. Not one unloaded run pulled a single in-skill file, which is the contradiction a false negative would have produced. The classification is sound
- CORRECTION to Event 64. The pass-rate spread across sweeps is not noise. Pass rate is a mix of the two populations: observed = 0.949x + 0.667(1-x) for x the fraction that loaded. Measure four's 36 of 54 predicts 0.8550 against an observed 0.8550, to four decimals. The earlier sweeps imply about 83%, 59% and 67% loaded, which is what moved their pass rates and their context per run
- So the seven-point band recorded in Event 64 as a noise figure to quote is withdrawn. It was a real signal that no instrument in this session could see until now
- Consequence for every disclosure figure taken before this: pull rates were computed over a denominator roughly one and a half times too large, and were understated by about that factor. The verdicts do not change; the rates do
- New question for plugin-kit, not for this skill: the disclosure harness fails to deliver the skill on about a third of its runs. That is a measurement-quality problem in the tool, now visible for the first time, and it belongs in the upstream report alongside the two defects

## Event 66 — a third plugin-kit defect: the report was written but never advertised

- Timestamp: 2026-08-24 02:45 PDT
- Found by the owner opening a dashboard link and getting a status table where the results belonged. The report existed on disk the whole time
- `serveReport` in generate-dashboard.ts:663 serves a run's real report when `detail.reportPath` is set and falls back to the progress page when it is not. measure-disclosure.ts published `resultsDir` alone, and writes `report.html` about thirty lines further down without ever saying where. optimize-disclosure.ts:395 and optimize-description.ts:456 both set the field, which is why only measured sweeps dead-ended
- The fallback carries a comment calling this "the dead end the user actually hit", written about the description report and left open for this one. The same defect had already been diagnosed once in the same file
- Fixed in commit e70b881 by resolving the path before the run starts and publishing it on the reporter's detail. Safe ahead of the file existing, because the dashboard checks for it and falls through while missing, so one run links to progress while measuring and to its report afterwards
- Coverage recorded honestly rather than claimed complete. `liveReportPath` is pure and tested four ways; the dashboard half was already covered; the single line joining them is not unit-testable without exporting `main`, and was verified by hand — setting the field on five live status files made the dashboard serve real tables at URLs that had shown status a moment before. 1506 pass, 0 fail, typecheck clean
- A related cost of the temp-root workaround, found in the same pass. `statusDir()` is `${tmpdir()}/skill-creator-progress` at progress.ts:219, so the second sweep registered into the workaround's temp root and never appeared on the dashboard at all. The run was fine and its results were written; it was simply invisible. Restored by copying the status file across. A fourth argument that the workaround was never a durable answer
- A claim of mine retracted within the minute it was made. I reported a `180%` on the report page as a value no pull rate could hold. It is `backdrop-filter: saturate(180%)` in the page stylesheet. Grepping rendered HTML for percentages returns CSS, and quoting the result without opening it is the session's own recurring error committed once more, in miniature

## Event 67 — the three fixes landed in plugin-kit proper

- Timestamp: 2026-08-24 03:00 PDT
- All three commits moved onto `restructure-shared-layer`, the branch the repository actually has checked out and the line this work was based on. Fast-forward, so history stays linear and no merge commit was made: 4710db8 symlink canonicalisation, 02248f3 load believed only on its result, e70b881 the report path advertised to the dashboard
- No divergence to resolve. The branch had not moved from the merge base since the worktree was cut, and the tree was clean, which is the only reason a fast-forward was honest rather than convenient
- Verified in the real checkout rather than inherited from the worktree, which carried its own dependencies: 1506 pass, 0 fail across 43 files, typecheck clean. Each of the five code markers confirmed present by reading the checked-out files
- The temporary worktree at /tmp/pk-fix is removed and the now-merged branch deleted. Nothing of this work sits on a temp path any more, which was the standing risk since it was written
- Nothing pushed. Three commits sit ahead of the upstream on that branch
- These are on `restructure-shared-layer` and NOT on `main`, which is a separate line at b0d1c9b. Whoever merges that line will need these carried across
- Consequence worth stating: the temp-root workaround is now unnecessary. A measurement run from this checkout classifies in-skill reads correctly at the default temp root, reports a load only when one succeeded, and links from the dashboard to its own results

## Event 68 — the loop was scoring the layout on runs the layout never reached

- Timestamp: 2026-08-24 03:20 PDT
- Owner ruling: fix it properly rather than quickly, and leave nothing parked
- The defect. computeFileStats counted pulls over runs where the body loaded; scoreRuns counted the pass rate and the context cost over every error-free run, loaded or not. Two halves of one measurement disagreeing about what a valid run is
- It broke both numbers in opposite directions. The objective: an unloaded run is cheap, 226k tokens against 350k measured, so a candidate that made loading fail more often reported a LOWER context cost and cleared the check more easily — the loop was rewarded for breaking the skill. The guardrail: pass rate became a mix of 0.949 loaded against 0.667 unloaded, so it tracked the load-failure rate rather than the layout
- The number that decided it. DEFAULT_PASS_RATE_TOLERANCE is 0.05, documented as absorbing about one assertion of sampling noise. Load-failure variation alone moved the pass rate 6.9 points across three sweeps of identical bytes. The environmental noise was larger than the entire tolerance the guardrail had to work with
- Chesterton's Fence, and the fence had a sign. RunTally.unloaded was documented "In the pass rate, out of every pull rate" — deliberate, not an oversight. What it protected is real: a layout that stops the skill loading has broken the work. So that protection is now `loadRate`, guarded by name in trainGate and selectCandidate and checked BEFORE the cost check, rather than folded into two figures that mean something else
- The load tolerance is deliberately wide at 0.25 and documents why: whether the body loads is mostly the environment's decision, so the check catches a layout that breaks loading outright and admits it cannot catch drift. Only one of the three load rates behind that number was measured directly; the others are inferred from the mix model, and the constant says so
- The envelope follows the schema rather than habit. `scored` is defined as units that reached the numbers, so unloaded runs left it; `excluded` is units deliberately left out of the denominators, so they joined it; `failed` stays what the harness could not complete and no longer coincides with excluded, which the schema explicitly permits
- A bug I introduced and caught in the same pass: widening `excluded` silently widened `failed`, which was assigned from it. A run that answered without the skill completed perfectly well and is not a failure
- Commit e0be400. Seven new tests, two of which fail on the parent commit reporting 0.5 where the pass rate should be 1 and 600 where the context mean should be 1000. That 600 is the perverse incentive in a single number. 1513 pass, 0 fail, typecheck clean
- Root cause of the load failures themselves is NOT plugin-kit's and is not fixed. Reproduced directly: the Skill tool returns is_error with content "Execute skill: <alias>" and no body, and the model then says so in its own answer. Not the permission mode — acceptEdits loads fine in isolation — and not path scoping, since --add-dir changes nothing. It belongs in the upstream report as a Claude Code finding

## Event 69 — a notes-only reply is an answer that lost its option

- Timestamp: 2026-08-24 03:35 PDT
- Owner ruling: the notes mechanism misleads readers. They type a note and press enter believing they have both chosen and annotated. So a note without a selection should be read as an intended selection plus a note specific to it, not as a skip
- The old guidance called it a sentinel and a skip, and a skip authorises nothing. That gave the reader who engaged MORE — moved to an option, opened the notes field, typed the qualification that actually mattered — strictly less than the reader who tapped a label
- The mechanism supports the ruling. Notes exist only in the preview layout, and in that layout the digit keys move the highlight WITHOUT selecting, so believing you have done both is the natural reading of the interface rather than a mistake
- Where the ruling had to be qualified against the tool audit: the note is attached to the question, not to a row, and the result builder reports no option selected. The intent is recoverable; the identity of the option is not carried. So the guidance recovers rather than assumes — take it from the note where the note settles it, ask once with the note quoted back where it does not, and never match it to the nearest label by similarity
- The note stays binding either way. A pick plus "only for staging" is still not approval for production
- Changed in all four homes: the recognition table, the prose under it, the section itself, and the eval expectations — which asserted the skip reading and would have gone on enforcing it against the new text. Commit d602879
- A near-miss caught by diffing rather than by trusting the write: re-serialising the eval JSON without `ensure_ascii=False` escaped every em dash in the file to `\\u2014`. Semantically identical, and it would have rewritten bytes across a file where only six lines were meant to change

## Event 70 — the old plugin retired, and the findings written up where they belong

- Timestamp: 2026-08-24 03:55 PDT
- Retirement completed. The directory was deleted only after checking what deletion would cost: the local commit 09195199 is present on the remote at refs/heads/main, same SHA, so all committed history survives on GitHub. The only local-only content was a five-line prose rewording of the retired skill's opening paragraph, and porting from that plugin is a standing prohibition, so nothing recoverable was lost
- Verified after rather than assumed: the marketplace still validates, `claude plugin list` no longer carries it, and the Makefile's OLD_NAMES guard still passes — that guard keys on the plugin NAME, not the path, so deleting the directory does not blind it
- Deliberately NOT done: uninstalling plugin-kit, which the old queue paired with this step. Its reviewer agents are needed by the extended-optimization item still ahead, so it moves to last rather than being done now
- The upstream write-up went into plugin-kit's own ANALYSIS-003 "Measurement Fault Classes" rather than a new note. That note already exists to catalogue exactly this — a harness that fails by returning a healthy-looking wrong number — and its Finding 1 already described the zero-pull `prune` table as the signature of a wrong install state
- Which produced the sharpest finding of the set. The symlink defect reproduced that identical signature from a cause with nothing to do with install state. The state was checked, found correct, and the table was believed anyway. A known signature is not identification, and treating it as one cost a session
- Six findings added, numbered 11 to 16, five recommendations, fourteen observations under a new sub-heading. The executive summary was corrected from five groups to six and the context line updated, so the note's own header no longer disagrees with its body. Commit e04004b in plugin-kit
- HANDOFF.md rewritten. It had become the largest concentration of stale claims in the repo: the disclosure measurement described as void, the instrument bug as unfixed with a workaround to apply, the empty install cache as "the one that bites", and a queue with three completed items still on it. The temp-root workaround is now flagged as dead weight to delete rather than as advice to follow. Commit 87109ec
- A process note worth keeping. One edit script asserted its way to a failure partway through and did not write the file, so an earlier successful replacement in the same script was silently lost. It was caught only by sweeping the file for the stale string afterwards rather than by trusting the run. Multi-edit scripts need the sweep, not the exit code

## Event 71 — the load failure root-caused: a permission ask, terminal in headless

- Timestamp: 2026-08-24 05:10 PDT
- Root cause, read from the binary at offset 296541987. The Skill tool's permission ladder is deny rules, then allow rules, then an auto-allow predicate, then a fallthrough returning `behavior: "ask"` with `message` of `Execute skill: <alias>`. The string everyone was reading as an error is the PERMISSION PROMPT LABEL, and it is also the tool's own `description` field at 296538443
- The decisive corroboration is Anthropic's own embedded SDK schema doc at 287400600, describing the `permission_denied` event: "Without one (bare -p / SDK query() with no canUseTool), 'ask' decisions are terminal, so this event also covers those implicit denials." Their text, in their binary, saying bare `-p` turns an ask into a denial
- The real success payload is a different string entirely, `Launching skill: <name>`, so any run showing `Execute skill:` never reached the tool's `call()` at all
- Fix measured, not argued: baseline 0 of 4 runs load; `--allowedTools Skill` gives 4 of 4, with the `Launching skill:` payload present. Scoped forms `Skill(<alias>)` and `Skill(<alias>:*)` also work
- Project `settings.json` with `permissions.allow: ["Skill"]` does NOT work: 0 of 4, even though `--setting-sources project` reads that file. The CLI flag works and the settings route does not, which is worth reporting upstream on its own
- The grant is additive rather than restrictive, checked because the opposite would have been catastrophic: with `--allowedTools Skill` the runs still made 3, 3, 0 and 2 reference reads, so `Read` survives and pulls stay measurable
- The "70% loaded" was never the skill system. It was the model reading SKILL.md as a file after the refusal. Measured: opus falls back 3 of 4 with 2-3 reference reads; sonnet falls back 0 of 4 and reads nothing at all. So the same sweep on sonnet would have reported near-zero load and a full table of `prune`
- Consequence for every disclosure figure taken so far: they were measured in the wrong regime. The body arrived by the model rummaging in the skill directory, not by injection, and it then read references while already in that directory. That is not how a pointer sends a model to a file in real use
- Blast radius across the repo, from all eight `claude` spawn sites. measure-triggering.ts:697 is UNAFFECTED and this was verified rather than assumed: its reader decides on `content_block_start` and `content_block_delta`, the streamed tool_use request, which precedes any permission check. So the trigger measurements stand. disclosure-measure.ts:208 is BROKEN. measure-outcomes.ts:917 is BROKEN. The other four are grader and proposer helper calls that involve no skill
- measure-outcomes is the worst case and has never been run. Its design is treatment against `control: "artifact-withheld"`; with no grant the treatment arm never loads the skill and collapses into the control, so the operation built to answer whether a skill helps would have answered no for every skill
- No spawn site passes `--allowedTools` today, so adding the grant is a clean addition with no merge hazard
- Process correction from the owner, and it was deserved. Probes were taking ten minutes because they ran sequentially, on opus, with full scenario prompts, and waited for completion when the answer arrives in the first seconds. Rebuilt concurrent, on sonnet, one-line prompt, killing each run the moment the Skill result arrives: 6 probes in 4.8 seconds, and a 20-run five-arm experiment in 14.9 seconds. The trigger harness already short-circuits this way; the probe work simply had not

## Event 72 — the trigger is our own frontmatter, and the bug was total rather than intermittent

- Timestamp: 2026-08-24 05:45 PDT
- Three independent lines converged on one trigger. The binary: `LST(a)` walks the resolved skill record against a 43-key allowlist and `allowedTools` is NOT among them, so a skill declaring it can never reach the auto-allow branch. The web: GitHub issue 77363, open against 2.1.208, reports the identical error string with the trigger "allowed-tools in SKILL.md frontmatter, headless, permission mode default or acceptEdits", 100% reproducible. The measurement: as shipped 0 of 2 loaded, with `allowed-tools` stripped 2 of 2 loaded and no grant needed
- So the failure was never 30%. It was 100% deterministic for this skill. What varied was only whether the model bothered to read SKILL.md itself afterwards, and that is a property of the model rather than of the bug
- Two fixes, both measured, and they are for different problems. The harness grant already committed fixes MEASUREMENT for every skill plugin-kit tests whatever its frontmatter. Removing `allowed-tools` from the skill would fix the ARTIFACT, which is a separate question about what we ship
- The shipping consequence, stated plainly because it is not a measurement artifact: as shipped, this skill does not load in a headless Claude Code session for anyone. Interactively it is fine, because a human answers the permission ask. That is a real property of the thing we are publishing, discovered only because the harness bug forced us to look
- Prior art found by the web search. Issue 59816, closed as completed in May 2026, is the original headless regression and carries the cleanest diagnostic anywhere: broken runs return `Execute skill: <name>` while working ones return `Launching skill: <name>`. Issue 83076, open against 2.1.220, is the mirror image with `disallowed-tools` and acceptEdits. Nothing in the changelog between 2.1.140 and 2.1.245 acknowledges any of them
- Corroboration that the fix is the sanctioned one: a public eval harness by Scott Spence already runs `claude -p --allowedTools Skill`, arrived at independently and without explaining why
- A claim NOT to carry upstream, flagged by the search: commenters on issue 38505 assert that skills are not loaded in `-p` mode and that the docs say so. The docs say the opposite. Repeating it would undercut a report
- The settings.json result is documented behaviour, not a bug, and should not be filed. Project `permissions.allow` grants capability and is gated on the workspace trust dialog, which a `-p` session never shows, so the file is inert there by design while the CLI flag is not. An untracked `.claude/settings.local.json` is the documented way to make rules apply without the trust step, and is untested here
- Docs recommend a stricter pairing than the bare flag: `--allowedTools` with `--permission-mode dontAsk`, so an unlisted tool is denied outright rather than falling through silently. Not adopted, and deliberately: the scenarios write files, so `dontAsk` would require enumerating every tool a scenario needs and would deny the rest. That is a real change with breakage risk rather than a drop-in

## Event 73 — the performance pass, including the two ideas that failed

- Timestamp: 2026-08-24 06:40 PDT
- Owner asked for a significant speed improvement, then for the remaining items, and corrected the probe method along the way. That correction was deserved: probes were taking ten minutes because they ran sequentially, on opus, with full scenario prompts, and waited for completion when the answer lands in the first seconds. Rebuilt concurrent, on sonnet, one-line prompt, killing each run at the Skill result: 6 probes in 4.8 seconds, and a 20-run five-arm experiment in 14.9 seconds
- WORKED, and it is the whole gain. Worker count was a fixed 12; measured on a 10-core box at 54 runs, 12 workers gave 15.8s per run at 43-49% CPU idle, 24 gave 8.1s, and 48 gave 43.6s at 0.6% idle and load average 143. The curve peaks rather than plateaus and overshooting costs about five times, so the default is now twice the core count, floored at 4 and capped at 24 because 24 is the highest value measured good. Resolves to 20 here. Commit b91f945
- WORKED. Longest-first scheduling, commit 4cbda74. Durations range 51s to 376s on this corpus and one 254s scenario that started at t=122s set the whole 376s makespan by itself. Runs now record their duration and the optimizer schedules later sweeps longest-first. Unknown scenarios sort last, because an unknown is not evidence of being short
- WORKED, though it buys no time. The pool's only callback was `onSettled`, so a bar read 0/N for about 90 seconds while every worker was busy, and a genuinely parallel pool looked sequential because staggered completions tick one at a time. `onStarted` now reports in flight. Commit f8b4ff7
- FAILED, measured, reverted. Decoupling grading from the run pool: predicted 15-20%, measured MINUS 12%, 490s against a 439s baseline. The cause was my own design — the grading limiter was set to the worker count, so peak concurrency doubled to 48, which is the configuration already measured as five times slower. A shared budget would leave total work unchanged through the same bottleneck, so the remaining gain was a slightly shorter tail against real added complexity. Reverted rather than kept because it was built
- FAILED, measured, discarded in seven seconds. Running scenarios under `--bare`, which the grader already uses to skip hooks, LSP, plugin sync, keychain and CLAUDE.md discovery: 0 of 3 loaded, no tool calls at all, run over in 1.1s. It strips the skill system along with everything else
- REJECTED after argument, not measurement. Running scenarios on sonnet for a 3-5x gain. Owner reasoned that if sonnet passes then opus passes, which is sound for triggering and outcomes and INVERTS for disclosure: a low pull rate is a deletion trigger, sonnet reads less eagerly, so a sonnet sweep would recommend pruning references that opus users pull. The weaker model is the less safe choice here, not the more
- Also landed: a warning when `--num-workers` exceeds three times the core count, commit f0e31c7. The flag stays because a rate-limited account needs to turn it DOWN and no machine measurement can see that; what it lacked was a sign on the cliff

## Event 74 — the measurement of record, taken with a trustworthy instrument

- Timestamp: 2026-08-24 06:55 PDT
- 27 scenarios, two runs each, 20 workers, opus, 488 seconds. `counted 54/54`, `runs_without_skill 0`, `runs_loaded_via_file 0` — every run received the body from the skill system
- All six files `keep`, at layout.md 53.7%, examples.md 48.1%, wording.md 40.7%, failed-question.md 27.8%, reading-answers.md 27.8%, asking-again.md 20.4%. Pass rate 0.927
- The verdicts survive and the RATES DO NOT. Most fell sharply against the broken-regime figures: examples.md 69.4 to 48.1, wording.md 69.4 to 40.7, asking-again.md 36.1 to 20.4. Only layout.md rose, 50.0 to 53.7
- That drop is the rummaging-model prediction confirmed. In the broken regime the body arrived because the model went and read SKILL.md, which left it inside the skill directory choosing what to open next; it opened more. A model handed the body follows pointers less often. So every pull rate taken before today was inflated, in the direction predicted rather than at random
- Consequence for the standing decision: the references still earn their place, and now on evidence rather than on an instrument that could not see reads at all. The rejection of deleting them is confirmed a second time, on a different and correct measurement
- A gap of mine closed on the owner's prompting, commit 792e17c. The load-path distinction was recorded and then ignored: both `computeFileStats` and `scoreRuns` filtered on `skillLoaded`, which is true whether the body was injected or fetched, so contaminated runs were detected, warned about, and counted anyway. That is inconsistent with the same argument already applied to unloaded runs. Only injected runs now count, which costs nothing today and makes a future breakage collapse `countedRuns` loudly instead of quietly describing a rummaging model as layout quality

## Event 75 — the disclosure does not work on Sonnet, and the tool cannot say so

- Timestamp: 2026-08-24 07:40 PDT
- Same 27 scenarios twice, sonnet against the opus baseline. Every reference falls: layout.md 53.7 to 24.1, examples.md 48.1 to 11.1, wording.md 40.7 to 5.6, failed-question.md 27.8 to 5.6, reading-answers.md 27.8 to 11.1, asking-again.md 20.4 to 14.8. Two references are reached in 3 runs of 54
- It shows in the output, not just the reads. Pass rate falls 0.927 to 0.832. References are not reached, so answers get worse — a coherent chain rather than noise
- Every file is still verdicted `keep`, because `keep` is simply "not zero". A file reached 29 times of 54 and one reached 3 times of 54 get the identical verdict, so the tool can neither flag this nor optimize against it. That is the inadequacy the owner identified, now measured
- Sonnet also ran in 285s against 488s, so the harder test is 1.7x cheaper
- An inconvenient finding that killed the obvious explanation. Four references carry textbook conditional pointers of the form "Read X when Y"; two — layout.md and examples.md — carry no conditional pointer at all, only descriptive mentions. The two with NO pointer are reached MOST. The best-written pointer is reached least. Pointer quality does not predict the rate here, which means the documented guidance is not sufficient and possibly not the operative variable
- The confound that cannot be resolved from this data: layout.md is named three times in the body and examples.md twice, while every loser is named once. Surface area tracks the rates better than phrasing does. But so does topic centrality, and a raw pull rate cannot separate "the pointer failed" from "only three scenarios needed it"
- plugin-kit already documents the ambiguity and does not act on it. Its progressive-disclosure reference states that a pointer without a firing condition "is the single most common reason a well-written reference is never read, and it LOOKS IDENTICAL IN THE DATA to a reference nobody needs" — and `decideFileVerdict` then resolves exactly that ambiguity toward `prune`

## Event 76 — the objective changes: reachability becomes something the loop protects and repairs

- Timestamp: 2026-08-24 07:55 PDT
- Owner ruling, and it reframes what the tool is for: do not prune content the model cannot reach, work out how to reach it. The optimizer should improve the skill until progressive disclosure fires when it should, on a model like sonnet, and report when it does not — the way the description loop already works for triggering
- A correction I owed on the way there. I had described the tool as pruning on low pull rates; `decideFileVerdict` only prunes at EXACTLY zero and only when the body already names the file. Any non-zero rate is `keep`, and zero-with-no-pointer is `signpost`, which is already the owner's principle. My argument against sonnet rested on the wrong reading of the rule
- The design fork, resolved. Making recall the objective outright is self-defeating: the surest way to guarantee a reference is read is to inline it into the body, so a loop told to maximize reaching would delete every reference and paste it into SKILL.md. The token budget stays the objective and stays enforced — that is what progressive disclosure IS — with reachability added as a second thing the loop must not break, plus a propose step that repairs a pointer rather than deleting the file behind it
- Ground truth landed as scenario field `expects_references`, commit 8d79a13. Absent means the set declares nothing; an EMPTY array is the negative case, a scenario that should reach nothing. Without negatives a layout pulling every file on every run would score perfectly, which is the failure the body budget exists to prevent
- The repo caught the change properly: a test asserts the recognized key set matches the format document, so the field could not be added without documenting it
- Standing constraint from the owner on the research: plugin-kit is Claude-first. Cross-vendor findings are evidence about the problem and techniques adoptable within Claude conventions; where anything conflicts, the Claude standard wins. Notably we could not adopt another mechanism even if we wanted to — Claude Code skills load references by the model choosing to read them, so auto-attachment elsewhere tells us the difficulty rather than offering us an escape

## Event 77 — recall reframes everything, and the two models fail in opposite directions

- Timestamp: 2026-08-24 08:40 PDT
- The annotation was applied to the two completed sweeps and the picture inverted. Opus reaches the right reference 100% of the time on five of six files and 75% on the sixth. Sonnet reaches 90, 75, 60, 50, 37.5 and 33 percent. The raw pull rates that looked like a uniform failure — opus 20-54%, sonnet 5-24% — were mostly measuring how many scenarios needed each file at all
- The clearest single case: wording.md read as 5.6% on sonnet, which looked catastrophic. Only four scenarios should reach it, and it was reached in three of their eight runs. Recall 37.5%, not 5.6%. The other 94% of the raw denominator was scenarios correctly not needing it
- The negatives earned their place immediately. Sonnet pulled nothing on all 8 runs of the four should-reach-nothing scenarios. Opus pulled something on 3 of 8 — a 37.5% over-fetch that no previous measurement could see, and which is paid in tokens on every run
- So the two models fail in opposite directions. Opus has near-perfect recall and poor precision; sonnet has perfect precision and misses a third to two-thirds. Raw pull rate showed neither, because it is a ratio over the wrong denominator
- This sharpens the owner's sonnet ruling beyond where either of us had it. Sonnet is not merely the harder test — it is the only place the recall problem is visible at all, because opus papers over every routing defect by reading eagerly. A skill tuned only on opus cannot be shown to have working disclosure
- The structural hypothesis survived its first real test. Ranked by sonnet recall, layout.md is top at 90% and is the ONLY reference pointed to from inside the numbered workflow steps. The two worst, failed-question.md at 33% and wording.md at 37.5%, are each a single pointer in a trailing section the model reaches after it has already composed its answer. Position-at-end is not the explanation, since those trailing sections sit at lines 369-439 of 456 and end-of-context is supposed to be a favoured position
- A confound checked and cleared before any of this was believed. An open upstream issue reports that relative reference paths fail to resolve, which would have made low rates into attempted-and-failed reads. Measured across six scenarios: zero failed in-skill reads. Our collector also records a pull on the request rather than the result, so a failed attempt would have counted anyway. The low numbers are genuine non-attempts

## Event 78 — the literature says our pointer rule was invented

- Timestamp: 2026-08-24 08:45 PDT
- Research returned with primary sources. The rule this project has been applying — name the file, the condition that fires it, and the cost of skipping — has no published basis anywhere, including at Anthropic. Their own two canonical examples do not follow it and contradict each other: the best-practices page uses condition-fronted inline pointers, their skill-development skill uses a flat descriptive list collected at the end. Neither is imperative, neither names a cost, neither is measured
- Anthropic does name our exact failure mode and prescribes the variable we found by accident: "Does Claude fail to follow references to important files? Your links might need to be more explicit or PROMINENT." Prominence is surface area, and it is unquantified by them
- Three findings have real measurement behind them. A second level of reference nesting never helps and can collapse accuracy from 0.91 to 0.64. Focused skills of at most three reference modules outperform larger bundles, and we ship six. And an explicit ordered workflow instruction beat conditional availability by a wide margin in one vendor's evals, taking skill invocation from 44% to 95% and pass rate from 53% to 79%
- Two of our observations have no prior art at all. Nobody has published a frontier-tier model comparison of reference-open rates, so our opus-versus-sonnet gap is novel. Nobody has measured whether naming a file more than once raises the odds it is opened, so our surface-area confound is untested. If we measure either we are first
- The mechanism that best explains our data is the know-versus-do gap: tool necessity is linearly decodable from a model's hidden states at 0.89-0.96 AUROC while the model still fails to act on it. If that transfers, pointer wording optimizes the wrong stage entirely — the model already knows it should read wording.md and simply does not. That reframes the intervention from writing a better pointer to removing the option of proceeding without the read, which is what a workflow step does and a trailing reference section does not
- A process warning worth carrying: the researcher caught its own fetch tool FABRICATING a paper summary, complete with invented experimental conditions and a "40%+ improvement" figure. It verified against primary text and reported the fabrication rather than the summary. Every citation above is primary text read directly

## Event 79 — the placement hypothesis is refuted, and the annotation is validated

- Timestamp: 2026-08-24 09:40 PDT
- Placement A/B, on a copy of the skill so the shipped artifact was never touched. The wording.md pointer was MOVED — not duplicated — from its trailing section at line 369 into workflow step 3 at line 194, holding mention count at one so the test isolated placement from surface area. Four scenarios, ten attempts each, both arms interleaved at 20 concurrent so drift hit both equally
- Result: trailing 8/40, in-step 4/40. Moving it in HALVED the reach. Run properly, 20% against 10% at n=40 gives z about 1.27 and p about 0.20, so the honest reading is no detectable effect with a trend AGAINST the hypothesis. It does not go into guidance
- A first underpowered run of 8 per arm returned 2/8 against 2/8 and was not reported as a null. At that n the only detectable effect is enormous, and the trailing arm had already measured 3/8 in the sweep and 2/8 here, so the noise was the size of any difference the design could see
- So layout.md's 90% recall still has no explanation. Mention count and topic centrality both remain live and both remain untested
- The annotation was validated by outcome rather than by judgement, which retires it as a bottleneck. Across the four scenarios annotated as needing wording.md: runs that READ it passed 86.7% of assertions, runs that did not passed 51.4%. A 35-point gap
- That answers the sharper question too. three-words-one-concept and first-call-in-a-new-vocabulary reached wording.md zero times in 20 sonnet runs, which looked like evidence the annotation was wrong. It is the opposite: three-words scores 2/5 on sonnet without the file and 5/5 on opus with it. They need it and sonnet never gets there
- The generalizable method, and it is worth more than the specific answer: ground truth is DERIVABLE from outcome. A scenario needs reference X if reading X improves its assertion score. No judgement, and the data is already collected. The passive form only works where the model happened to be inconsistent; the rigorous form is ablation — remove a reference, re-run, see whose scores drop
- A two-stage ablation design was scoped and not yet run: stage 1 removes ALL references and runs 27 scenarios twice, about 54 runs and ten minutes, which sorts scenarios into needs-something and needs-nothing and validates the four negatives as a by-product. Stage 2 ablates individual files only for scenarios that dropped, against only their plausible candidates. About 22 minutes total against 324 runs for the full grid

## Event 80 — the reference-count cap does not exist, and was a category error

- Timestamp: 2026-08-24 09:55 PDT
- Owner pushed back on a claim I had relayed into the guidance draft as measured: that skills should carry at most three references. He was right, and the reason is worse than the number being low
- The source sentence is real but means something else. In the cited paper, "module" is never defined; it appears three times in 112k characters. The body evidence is a table whose column header is "Skills Count" with rows of 1 skill, 2-3 skills, 4+ skills. A module is a whole SKILL attached to a task, not a bundled reference file. The paper says nothing at all about how many references belong inside a skill
- Even on its own terms it does not say what I quoted. One skill scores +17.8 against 2-3 at +18.6, statistically indistinguishable, so the finding is that 4+ degrades rather than that three is optimal. The three strata also carry different no-skills baselines of 24.4, 23.4 and 26.9, so they are different task sets — observational, not a controlled manipulation of count
- Anthropic states the opposite of a cap. Their own skill-creator: "Bundled resources - As needed (unlimited, scripts can execute without loading)." A grep of their docs for any at-most-N-references pattern returns zero matches
- Shipped practice settles it. Anthropic's claude-api skill carries 66 reference files; 13 of their 20 skills exceed three. Across 398 deduped installed skills, p90 is 10 bundled files and the maximum is 223. plugin-kit's own five skills carry 2-3 each
- The likely origin of the impression: the docs' own "Good example: One level deep" happens to show exactly three links. An illustration read as a limit
- The defensible constraint is DEPTH, not count. Anthropic's actual rule is that references stay one level deep from SKILL.md, because a nested reference gets partially read via head -100 and yields incomplete information. That matches the independently measured collapse from 0.91 to 0.64 when a second level is introduced. Fan-out is unbounded; depth is capped at one
- Third time this session I relayed a claim without opening the source. The pattern is consistent enough to belong in the guidance itself: a number in authoring advice needs its DEFINITION checked, not merely its citation

## Event 81 — the destination is plugin-kit's mainline, and the exposure is larger than the brief said

- Timestamp: 2026-08-24 05:56 PDT, taken from the machine clock. Worth flagging rather than reconciling silently: Events 73-80 carry timestamps running about two and a half hours ahead of file mtimes on this box, and the filesystem is the side with corroborating artifacts, since the sonnet sweep Event 75 describes wrote its results directory at 05:06
- Owner ruling: every change this work produces lands in the real plugin-kit codebase, not on a side branch and not in a scratch copy. `restructure-shared-layer` is a staging area rather than a destination, so merging it is part of the work rather than an optional tidy-up
- Measured rather than quoted, and both figures in the cold-start brief were low. 14 commits sit ahead of `origin/restructure-shared-layer`, against the brief's 16, counted from the remote the branch was published to at Event 03. And 57 commits sit on the branch that are not on `main`, which is the number that matters for this ruling
- The landing is cheap: `restructure-shared-layer..main` is 0, so `main` holds nothing the branch lacks and the merge is a fast-forward. It stays queued behind the guidance rewrite rather than done now, because more plugin-kit commits are still coming
- Baseline comparability checked before reusing anything. The sonnet sweep results at `~/auq-results/sonnet-sweep` were written at 05:06, after `792e17c` narrowed counting to injected runs at 04:53 and before `8d79a13` added the scenario field at 05:14, which touches parsing and docs and no scoring path. The stored baseline is therefore comparable with the current code

## Event 82 — the stage-1 ablation, and the design fork the owner settled

- Timestamp: 2026-08-24 05:56 PDT
- Design fork raised before running, because it changes what the null arm means. Removing the six bundled files leaves six pointers in SKILL.md aimed at nothing, and a model that attempts a read and gets an error is in a different condition from one never offered the content. Owner took the recommendation: strip the files AND their pointers, on a copy, so the shipped artifact is never touched
- A confound cleared before the run rather than after. No expectation in the 27 scenarios names a bundled file, checked across all 262, so stripping references cannot fail a scenario for the trivial reason that an assertion asked for a file that is no longer there. The arm measures whether the content was needed
- Both arms run concurrently at 10 workers each rather than sequentially at 20, so the same API conditions reach both. Sequential arms would have let drift land on one of them, which is the error the placement A/B at Event 79 was designed around
- The stored 05:06 sonnet sweep is kept as a third sample on the control arm. It costs nothing and it is the only way to estimate the control's own run-to-run variance, which is what decides whether a scenario has genuinely dropped rather than moved within noise

## Event 83 — the first ablation run ruled interrupted, quarantined, and relaunched

- Timestamp: 2026-08-24 06:20 PDT
- Session resumed from the cold-start brief. Rehydration surfaced two things the brief did not carry: Events 81-82 existed uncommitted on disk, and result directories for the stage-1 ablation existed at `~/auq-results/ablation-control` and `ablation-stripped`, written 06:07-06:08
- Owner ruling on resume: that run had not completed properly — if started and interrupted, it is rerun. The artifact corroborates the ruling rather than contradicting it: the two arms report different assertion denominators, 262 control against 259 stripped, over the identical 27-scenario twice-run set. Same scenarios must grade the same total, so at least three assertions were never graded — the partial-run signature that returns a confident number instead of an error, the exact fault shape the measurement-fault-classes analysis catalogues
- Both result directories and logs quarantined under `-interrupted` suffixes rather than deleted, so the partial data stays available for forensics and cannot be mistaken for a measurement
- The stripped copy at `/tmp/auq-ablation/ask-user-question` verified before reuse: built 05:57 against the shipped SKILL.md whose last commit is `1f83f92` at 03:47, zero mentions of `references/` or `examples.md`, and pointer clauses removed by rewording sentences rather than deleting lines, which is the Event 82 design. Shipped skill tree clean, 27 evals confirmed in the scenario set
- Relaunched per the Event 82 design, unchanged: both arms concurrent at 10 workers each on sonnet, 2 runs per scenario, `acceptEdits`, results to fresh `ablation-control` and `ablation-stripped` directories

## Event 84 — correction: the first pair was complete, and Event 83's diagnosis was wrong

- Timestamp: 2026-08-24 06:45 PDT
- Verified from per-run logs rather than headlines: all 54 runs in BOTH quarantined arms carry full grading, summing to 262 assertions each. Nothing was ungraded. Event 83's claim that "at least three assertions were never graded" is withdrawn
- The real mechanism: the counting narrowed at plugin-kit commit `792e17c` excludes runs whose body loaded via file Read rather than the skill system. The quarantined stripped arm had one such run (3 assertions, 262−3=259); the fresh stripped arm has two (262−6=256); every one is the `sentry-dsn-not-in-repo` scenario. The headline `assertions_total` is a counted-runs figure, and `results.json` already named the cause in `runs_loaded_via_file` — the field was present and unread
- The quarantined pair therefore appears complete rather than interrupted: the detached processes outlived the driving session and wrote full results at 06:07-06:08. The rerun stands on the owner's ruling. Whether the quarantined pair may now serve as extra samples is surfaced to the owner as a decision, not taken here
- Copies swept per the stale-claim rule: the same wrong diagnosis went into the plugin-kit ledger event and both commit messages. The plugin-kit ledger gets its own dated correction; the commits stand as history with this event as the correction of record
- The citing rule collects another instance, now from inside this session: a denominator mismatch was read as an interruption signature without opening the per-run logs that disproved it

## Event 85 — stage-1 ablation result: the references earn their existence

- Timestamp: 2026-08-24 06:45 PDT
- Both arms 54/54 runs, all graded, exit 0, install state absent. On skill-delivered runs: control 217/262 = 82.8%, stripped 185/256 = 72.3%. Removing the six bundled files and their pointers costs about ten points of assertion pass rate on sonnet
- Sixteen scenarios dropped more than 5 points against the two-sample control mean (fresh control plus the stored sonnet sweep, per the Event 82 design). The strong set, quarantined pair agreeing in direction: notes-only-sentinel −40, prepush-checks-in-question −38, multiselect-empty-and-parsing −25, third-call-of-an-open-run −25, measure-a-draft-against-a-good-one −20, two-release-notes-rendered −20, three-words-one-concept −20, timeout-with-partial-selection −15, reader-says-options-are-the-same −15
- One drop excluded as unstable rather than real: reader-says-it-depends reads −25 but its control samples span 0.00 to 0.70 across three sweeps, so its control mean is not a baseline
- The needs-nothing set: approval-widened-past-its-words, clean-answer-opened-a-fork, free-text-names-a-fifth-option, just-show-me-a-finished-call, sentry-dsn-not-in-repo, which-of-the-three-shapes — flat at or near 1.00 with and without references. The negatives are validated by outcome, no judgement involved, which was stage 1's purpose
- Anomaly worth carrying: first-call-in-a-new-vocabulary scores 20 points HIGHER without references (0.70 to 0.90). Consistent with Event 79 — sonnet never reads wording.md on that scenario, so the file cannot be helping sonnet there; what the drop map measures is content need, not pointer health
- Stripped-arm quirk, harmless but real: sentry-dsn-not-in-repo loaded the body via file Read in 3 of 4 stripped runs across both pairs and never in control; all such runs passed 3/3

## Event 86 — LOCKED: the quarantined pair folds in as extra samples

- Timestamp: 2026-08-24 07:05 PDT
- Owner chose, verbatim: "Fold it in (Recommended)" — the quarantined first pair, proven complete by per-run inspection, joins the measurement of record. n rises to 4 runs per scenario on the stripped arm and 6 on the control arm (both pairs plus the stored sonnet sweep)
- The folded map holds the aggregate at a 10-point cost: control 82.4%, stripped 72.5%. Two n=2 artifacts dissolved — two-release-notes-rendered and retry-budget-two-options were noise. reader-says-it-depends returns to the dropped list at −28: still the highest-variance scenario (control samples 0.00 to 0.70), but at n=6 against n=4 the gap is credible
- Final stage-1 verdict: 15 scenarios dropped more than 5 points, 9 strong; 6 scenarios need nothing and validate the negatives; the references earn their existence as a set

## Event 87 — stage 2 launched: one file removed at a time, candidates assigned from prompts

- Timestamp: 2026-08-24 07:10 PDT
- The hand annotation never reached the corpus — `expects_references` exists in the schema and no eval row declares it — so candidate assignment for stage 2 was re-derived from the scenario prompts against each reference's stated job. This is judgement and is labelled as such; stage 2 exists to replace it with outcome
- Six variants built from the shipped skill, each removing ONE file and its pointers, with the pointer prose re-worded rather than line-deleted, per the Event 82 principle. Every edit asserted exactly-one match; every variant swept for residual mentions of the removed filename. Variants under `/tmp/auq-ablation-stage2/minus-*/`
- Assignments: minus-layout gets prepush-checks-in-question and layout-choice-migration-steps; minus-wording gets description-will-not-shorten, defend-rewrite-to-its-author, three-words-one-concept; minus-failed-question gets reader-says-options-are-the-same and reader-says-it-depends; minus-reading-answers gets notes-only-sentinel, multiselect-empty-and-parsing, timeout-with-partial-selection, reader-says-it-depends; minus-asking-again gets third-call-of-an-open-run and reask-after-the-options-moved; minus-examples gets measure-a-draft-against-a-good-one and prepush-checks-in-question. Two scenarios carry two candidates each
- Held out with no plausible candidate: off-by-one-already-fixed (−8) and no-tool-in-this-context (−6) — ask-or-decide and the no-tool fallback are body content; they escalate to wider ablation only if stage 2 leaves them unexplained
- 15 scenario-variant pairs, 30 runs, six arms concurrent at 3 workers each — 18 children, inside the measured-good zone. Results to `~/auq-results/ablation2-minus-*`
- Operational note: the launch wrapper's wait failed on unsplit pids under zsh and exited early; the nohup'd arms were unaffected and a watcher now covers both completion and death of any arm

## Event 88 — stage 2 lands: ten causal attributions, three refuted candidates, the corpus annotated

- Timestamp: 2026-08-24 07:40 PDT
- Gate PASS on all six arms: 30 of 30 runs, every one skill-delivered, zero file-loads, install absent. The completeness check is now the cross-arm one the interrupted-pair episode taught
- Nine scenario-candidate pairs REPRODUCE: removing the candidate file alone lands the score at or near the all-stripped floor. layout-choice-migration-steps to layout, description-will-not-shorten and defend-rewrite-to-its-author to wording, reader-says-it-depends to failed-question, multiselect-empty-and-parsing and notes-only-sentinel to reading-answers, reask-after-the-options-moved and third-call-of-an-open-run to asking-again, measure-a-draft-against-a-good-one to examples. The two-candidate design paid off once: reader-says-it-depends reproduces under minus-failed-question at 0.10 and shows nothing under minus-reading-answers at 0.60, a clean single-file attribution
- prepush-checks-in-question is partial: minus-layout lands 0.42 between control 0.67 and stripped 0.25, minus-examples refuted at 0.83. The largest stage-1 drop (−42) is more than one file's worth; layout is causally implicated and declared, the residue stays open
- Three candidates refuted outright: three-words-one-concept under minus-wording (0.40, exactly control — consistent with Event 79, where sonnet never reads wording.md on it, so removing what is never read changes nothing), reader-says-options-are-the-same under minus-failed-question (0.80, above control), timeout-with-partial-selection under minus-reading-answers (1.00, perfect without the file). All three stay undetermined rather than guessed
- Corpus populated at `evals/composition/disclosure-evals.json`: 16 rows annotated — ten derived attributions plus six negatives — and 11 left absent, which the schema distinguishes from empty by design. Validated through plugin-kit's scenario-set schema, zero findings. Caveat carried: the six negatives are measured-flat at or near ceiling, so a pull there reads as over-fetch by the outcome definition even where the scenario was designed around a reference; the body alone suffices on sonnet for those
- n=2 per stage-2 cell is thin; the reproductions are believed because nine of ten agree with the folded stage-1 direction, not because any single cell is powered

## Event 89 — the interrupted conversation recovered, and the plan for the guidance rewrite reshapes

- Timestamp: 2026-08-24 08:20 PDT
- Owner pointed at the previous conversation's transcript; the pointer first named the plugin-kit one (a 16-minute bootstrap that verified the five in-flight patches landed), then corrected to the ask-user-question one. Both read in full, plus the two documents the interrupted session was verifying when it died: plugin-kit's continuation and architecture documents
- What the interrupted session's own rehydration report carries that this session had not recovered: the reference-count cap NEVER reached plugin-kit's shipped guidance — caught in draft, so the rewrite is smaller on that half. And the raw-pull-rate verdict lives at THREE layers that must change together or the guidance will contradict the tool: the progressive-disclosure doctrine reference ("Pulled on no run, body points at it → Delete it"), the disclosure-optimization operator reference (prune at zero-with-pointer AND inline at ≥80% raw — equally a raw-rate rule), and `decideFileVerdict` in the disclosure code
- The largest recovered fact: the 5,000-token post-compaction retention claim — "after auto-compaction only the first 5,000 tokens of each skill are re-attached" — is the stated justification for the entire disclosure objective, the 5,800 fail gate, and this skill's body-at-ceiling constraint. It is asserted in the architecture document with no source; the continuation document's open-questions section already says of its 25,000 companion "find the source"; and the interrupted session's grep for any source came back empty. By this session's own citing rule the load-bearing number of the whole operation is unverified. Opened as a work item rather than assumed
- Both documents are stale as handovers: the continuation document describes the pre-restructure tree, says measure-disclosure and measure-outcomes do not exist (both now built), and its reference-merging guidance — "run optimize-disclosure and let co-pull decide" — is another home of raw-rate doctrine. The architecture document's proposed tree has about seven paths that do not exist and its anti-Zod position is superseded by the continuation document's own evidence-marked reversal
- Consequence for the queue: items 2 and 3 are one change — recall reporting (in flight with the engineer agent), verdict logic made recall-aware within the Event 76 rulings (budget stays the objective, reachability protected and repaired, never prune the unreachable), and both reference documents rewritten in the same pass, with the continuation document's disclosure guidance updated or marked superseded
- Ledger hygiene from the recovered report: T-08 (retire the old plugin) completed at Event 70 but still sat in the unblocked backlog; moved to the archive in this edit

## Event 90 — the first recall-carrying sweep of record, and the two instruments already disagree

- Timestamp: 2026-08-24 08:55 PDT
- The shipped skill, 27 scenarios twice on sonnet, through plugin-kit's new reporting at commit `1b3ff64`, against the ablation-derived ground truth committed at `fce4f2a`. Gate clean: 54/54 delivered, zero file-loads, install absent, pass rate 83.2%. Results at the recall-sweep directory; the results file carries the new `ground_truth` block — 16 annotated scenarios, 6 negatives, 32 annotated runs
- Per-file, quoted with denominators because they are small: reading-answers 4/4 and failed-question 2/2 at 100%; layout 3/4; asking-again 2/4 and wording 2/4 at 50%; **examples.md 0/2** — the scenario the ablation proved needs it (measure-a-draft, removal drops 0.80 to 0.60) never opened it in either run this sweep. That is the needed-and-missed signature the whole investigation exists to expose, now legible in a single results file instead of requiring a cross-sweep derivation
- The same file shows why the verdict layer redesign is necessary rather than cosmetic: examples.md is verdicted `keep` on 8 raw pulls of 54 while its recall is 0 of 2. The raw instrument says healthy, the recall instrument says its one proven consumer misses it, and `decideFileVerdict` can only see the first. The motivating example for the pending change, produced by the tool itself on its first recall run
- Over-fetch reads 50% — 6 of 12 negative runs opened a reference — against the old hand-annotation era's 0 of 8. Not a regression: the derived negative set includes ceiling-bound scenarios designed around references, so a model correctly following a pointer there scores as over-fetch under the outcome definition, exactly the ceiling caveat the ablation analysis carries. The figure means "reads that did not improve score", not "reads that made no sense", and the guidance rewrite should say so where over-fetch is documented
- Queue item 2 is complete end to end: schema field, populated corpus, reporting, and a live sweep proving the chain

## Event 91 — the predecessor conversation found in full, and the standardization thread inherits its lineage

- Timestamp: 2026-08-24 09:50 PDT
- The conversation the owner meant all along ran in the HOME directory — which is why neither project's transcript folder held it — and its tail (the last ~550 entries) is now read completely, no sampling. It is the session that ran Events 40-80, authored the cold-start brief, and held the structural-standardization discussion the owner restated today
- What it adds: when the owner first proposed standardizing skill sections and flow, a six-rule standard shape was drafted with evidence labels — and two of its rules were refuted by measurement within the same session: pointer-in-step placement (the n=40 A/B halved reach) and the three-reference cap (the category error). Four rules survive as candidates: numbered workflow as the spine, depth one, gotchas and validation staying in the body, and tables of contents past 100 lines. The lineage is relayed to the structure-genres survey now running in the plugin-kit project, so the taxonomy carries the refutations and cannot resurrect the dead rules
- The owner's restated goal today — Osmani's process-over-prose, anti-rationalization tables, non-negotiable verification, consistent section structures, identifiable and measurable in bodies AND references — is the direct continuation of that thread, now formalized as three deliverables: the structural-genre taxonomy (analyst dispatched), skill-creator guidance encoding it, and lint-detectable signatures wired toward outcome measurement
- Also recovered: the handoff-authoring sequence that produced the brief, which explains the commit-count drift the brief carried (the number moved between drafts as commits landed)

## Event 92 — the predecessor conversation read end to end, and one coverage gap recovered

- Timestamp: 2026-08-24 10:20 PDT
- The full predecessor conversation is now read — every dialogue entry from session start to the handoff authoring, not only the tail. It confirms today's work implements its threads faithfully: the verdict table locked today is the direct descendant of the owner's do-not-prune-what-you-cannot-reach principle and the four-piece redesign sketched there; the recall substrate, the ablation, and the remedy ladder all trace to explicit owner statements in that conversation
- One open item recovered that no note or queue carries: **sonnet coverage for triggering and outcomes**. The owner's instinct — if it works on sonnet it should work on opus, so test the weaker model — was acknowledged there as a real gap for the pass/fail measurements: the 49/52 trigger sweep predates the question, and measure-outcomes has never run on any model. When queue item 5 (outcomes) runs, it should run on sonnet per that standing instinct; a sonnet trigger sweep is a cheap companion. The disclosure half of the instinct is already implemented (sonnet is the detection instrument)
- Also confirmed from the full read: measure-outcomes' treatment arm silently collapsed into its control before the grant fix — the operation built to answer "does this skill help" would have answered "no" for every skill ever tested. Fixed at the grant commit; worth re-stating when outcomes finally runs so the first result is read against that history

## Event 93 — the skill helps: plus 16 points, measured by design

- Timestamp: 2026-08-24 11:35 PDT
- The first honest outcomes measurement ever taken of this skill, and the first of any skill through the repaired harness: 27 scenarios, one run per arm, sonnet per the coverage ruling, treatment (skill installed) against control (artifact withheld) with identical flags so the skill's presence is the only variable. All 54 cells scored, zero failures, `exit_reason: complete`. Results in the outcomes-1 directory
- **With the skill 91/131 assertions, 69.5%. Without it 70/131, 53.4%. The skill is worth +16.1 points on sonnet.** The accidental natural experiment from the load-failure era suggested ~28 points on opus-mixed populations; the designed measurement on the harder tier says +16, and both agree on the direction and the magnitude class
- Per-scenario deltas are single-run-per-arm and are hints, not findings. Directionally: the largest gains sit on rendering and parsing scenarios (two-release-notes-rendered and multiselect-empty-and-parsing at +80%, nine-findings-one-question +67%, description-will-not-shorten +60%); the negative deltas cluster on exactly the scenarios already flagged as body-content or unresolved — no-tool-in-this-context and off-by-one-already-fixed (the two held-out from the ablation) and prepush-checks-in-question (the partial-attribution residue). At n=1 per cell those negatives warrant a repeat before any conclusion, but the coincidence with the ablation's problem-list is worth the note
- Caveats that travel with the number: sonnet only; one run per arm per scenario (the aggregate over 131 assertions is the reliable figure, per-eval deltas are not); and one worker mid-run escalated its scenario fixture out of the sandbox (recorded in the plugin-kit ledger as an isolation finding) — its scenario, timeout-with-partial-selection, shows no anomaly in its scored rows
- With the run complete, the skill's six references are clear to receive the locked table-of-contents standard, where the intervention has a recall baseline to measure against

## Event 94 — the six references carry the standard table of contents, `258ae2a`

- Timestamp: 2026-08-24 12:20 PDT
- All six bundled files now open with the locked standard block — `## Table of Contents` as the first H2, flat anchor-link bullets — applied as PURE additions: zero deletions across all six, verified per file by numstat, body untouched at 5,795 tokens. `make checks` and the frontmatter test pass
- The purity constraint is the point: these six are the measurable test bed for the table-of-contents intervention, with sonnet recall baselined at 33-75%. A future disclosure sweep now compares exactly one variable. That re-measure is the natural next measurement when the optimization loop resumes
- plugin-kit's new validator rule reports zero findings on this skill — the first artifact outside plugin-kit validated against the standard
- Open micro-item: shipped skill content changed, so the next release bumps the version to 0.1.1 across plugin.json, the skill metadata, and the marketplace entry; the live file-source marketplace reads the working tree, so nothing is stale meanwhile

## Event 95 — the table-of-contents intervention goes under measurement

- Timestamp: 2026-08-24 12:35 PDT
- Launched the recall re-measure of the six ToC-carrying references: identical command, corpus, model, permission mode and runs-per-scenario as the morning's sweep of record, results to the recall-sweep-toc directory. The comparison baseline is that sweep's per-file recall — reading-answers 4/4, failed-question 2/2, layout 3/4, asking-again 2/4, wording 2/4, examples 0/2 — with the ToC blocks the only changed bytes, verified pure additions at commit `258ae2a`
- What the experiment can and cannot say, stated before the result: denominators are 2-4 runs per file, so single-file movements are hints; the honest read is the direction of the whole table plus whether the two dead spots (examples at 0/2, wording at 2/4) move at all. A null is a finding — the ToC rule's mechanism is partial-read completeness, not pointer-following, so recall may well not move, and saying so would keep the ToC standard honest about what it buys
- Completeness gate on landing: 54/54 delivered, zero file-loads, denominators matching the baseline sweep

## Event 96 — the ToC intervention readout: direction up, not established, and one dead spot untouched

- Timestamp: 2026-08-24 12:55 PDT
- Both sweeps gate clean and identical in parameters: 54/54 delivered, zero file-loads, install absent. Aggregate should-reach recall moved 13/20 to 16/20 — three files each gained one run (layout 3/4 to 4/4, asking-again 2/4 to 3/4, wording 2/4 to 3/4), three held, none fell. Pass rate 83.2% to 85.9%; over-fetch 6/12 to 7/12, flat within one run; context per run up ~12k tokens, consistent with the ToC bytes plus the extra reads
- The pre-registered read holds and is the record: at these denominators each movement is one run flipping, and 16/20 against 13/20 is p≈0.3 — **directionally encouraging, not established**. The claim "tables of contents raise recall" is NOT licensed by this table and does not enter guidance; the ToC standard's justification remains the published partial-read mechanism, which this result is consistent with and does not prove
- The finding with the most information is the non-mover: examples.md stays at 0/2 — its proven consumer (measure-a-draft-against-a-good-one, ablation-attributed) still never opens it. Whatever blocks that route, it is not partial-read completeness. examples.md is now the sharpest single remedy target on the board, and the remedy ladder says the next levers are the pointer and the content boundary, not the map
- The null-that-was-not: a result this shape reported without the pre-registration would have read as a win. Registered first, it reads as what it is — a trend worth one more sample if the number ever needs to be load-bearing, and a dead spot worth acting on now

## Event 97 — pre-registration: the examples.md dead-route experiment

- Timestamp: 2026-08-24 13:15 PDT
- Target: the sharpest remedy candidate on the board — examples.md at 0/2 recall in both sweeps, unmoved by the ToC intervention, with an ablation-proven consumer (measure-a-draft-against-a-good-one, removal drops 0.80 to 0.60). The remedy under test is the only intervention shape with a positive external measurement: an explicit ordered instruction in the workflow the run actually traverses (invocation 44 to 95 percent in the external evaluation), against the shipped trailing descriptive-conditional, which is the form that measured dead
- Arms: A = shipped skill; B = a copy where the draft-judging condition MOVES into the head of the pre-flight loop as an imperative ("First read examples.md and set the draft beside the specimen of its shape, then run this list against it") and the trailing section loses that clause. Twenty runs per arm of the single measure-a-draft scenario, arms concurrent at 10 workers each per the sanctioned A/B pattern, sonnet
- Confounds disclosed before the result: B carries 3 body mentions of the file against A's 2 (an imperative cannot avoid naming its file), and about 28 extra body tokens — B tests the Vercel intervention as a bundle of form, location and surface area, not form alone. If B moves, decomposition is a later experiment; if B does not move, the bundle's failure covers all three components at once
- Decision rule, registered now: B minus A of at least 6 reads out of 20 is acting evidence (roughly the Fisher-exact threshold at these n); below that the result is directional-only and is reported as underpowered, not as a finding. A B-arm null on a bundle this strong would be the third refutation of intuitive pointer advice and would sharpen the know-versus-do reading — the model may know and still not act, in which any prose fix is aimed at the wrong stage
- Launch HOLDS until the flag-removal task lands in measure-disclosure, because the experiment runs through the tool being edited and bun executes working-tree code

## Event 98 — reflect capture: the auto-memory prohibition

- Timestamp: 2026-08-24 13:40 PDT
- Captured to the reflect sidecar SKILL-001: Orchestrator Process Learnings — named here as plain text because a wikilink inside a prose bullet is parsed as a typed relation in this project; the typed edge to the sidecar is recorded in this note's Relations section instead
- [reflect-capture] HIGH, constraint: auto-memories are never created directly, because every learning flows through the reflect chain — inline capture, then end-of-session retrospective synthesis, then the skillbook agent as the only writer of durable feedback memories — and delegated agents must carry the same prohibition in their dispatch briefs, since the rule is invisible from a subagent's context. MED, preference: a warning on a generic knob was measured ineffective against operator habit this session, so the remedy for habitual misuse is removing the knob and giving deliberate uses a purpose-named escape hatch rather than a louder warning.

## Event 99 — the pre-registered null lands at full strength, and the ablation attribution refines

- Timestamp: 2026-08-24 13:55 PDT
- The examples.md A/B completed, gates clean on both arms: 20/20 delivered each, zero file-loads, tier-study marker correctly absent. Arm A (shipped trailing conditional): examples.md read 0/20, pass 74.0%. Arm B (imperative at the head of the pre-flight loop, plus one mention): 0/20, pass 73.0%. B minus A is zero against the registered acting threshold of six
- The dead route is confirmed at real n — 0 of 42 cumulative reads across every sonnet sweep — and the strongest intervention shape available did nothing. Third refutation of intuitive pointer advice this session, and the sharpest support yet for the know-versus-do reading: on this route, prose is the wrong stage
- The null exposed an attribution confound in the ablation. The stage-2 minus-examples variant removed the file AND its pointer-section prose, and that section carries teaching content of its own — the dropped-cost-half lesson. A file never read on sonnet cannot have supplied the content whose removal dropped the scenario, so the 0.80-to-0.60 attribution belongs to the file-plus-prose bundle, with the body prose as the plausible carrier on this tier; the file's proven consumer remains the stronger tier, where its recall is 100%. Dated corrections issued to the reference-ablation analysis here and to the method finding in the plugin-kit research note
- Remedy-ladder consequence, recorded: the reachability lever is measured-exhausted for this route on sonnet. If this scenario's sonnet score ever needs raising, the candidate lever is the content boundary — the teaching prose, not the file — and any such change re-derives its ground truth by ablation with the prose-versus-file split held apart

## Event 100 — version 0.1.1, and three parallel workstreams open

- Timestamp: 2026-08-24 14:20 PDT
- The version bump owed since the references gained their tables of contents: 0.1.1 across all three bound sites (plugin manifest, skill metadata, marketplace entry), frontmatter test passing, committed at `a91647f`. The installed cache refreshed 0.1.0 to 0.1.1 — note the update command needs the marketplace-qualified name (`ask-user-question@ACMElabs`); the bare name reports not-found even while `plugin list` shows it
- Three disjoint-file workstreams dispatched in parallel per owner approval: the structural-genre authoring reference for skill-creator (new body-structure.md plus a checklist hop, since the skill body sits at its ceiling); the three remaining genre detectors as informational-only reporters in validate — deliberately never warnings, because unvalidated genres reported as facts must not become guidance dressed as enforcement; and the draft upstream comment for the open Claude Code issue on allowed-tools skills failing headless, carrying the mechanism, the 0-of-4-to-4-of-4 measurement, and the flow-terminates-in-a-mislabeled-error framing — draft only, to be shown before anything is posted
- Every dispatch brief now carries the standing reflect-protocol line: agents never write auto-memories; learnings return in reports and route through the reflect chain

## Event 101 — the ledger clock corrected, and the reflect boundary closed

- Timestamp: 2026-08-24 08:45 PDT, measured from the system clock — and this stamp breaks the sequence deliberately. The ledger's convention had drifted nearly six hours ahead of real time (Event 100 says 14:20 while the clock read 08:26), because since the drift was first flagged at Event 81 every writer, this session's included, derived each stamp from the previous event rather than from the clock. From this event forward, stamps are the measured clock; earlier stamps from Event 73 onward are ledger-convention time, not wall time, and file mtimes are the corroborated source for that span
- The reflect sidecar gained two verified entries in one pass: the SendMessage constraint — a teammate's report is real only through the messaging tool, with what is lost being exactly what a disk listing cannot show — and the write-path status-drop edge case at three of three occurrences today, ticket-worthy against the brain tooling rather than a repair habit. The sidecar's Observations now mirror all four findings
- Also swept into this boundary: the convention-mandated inverse edge on the evidence-rules analysis, and a checklist defect pair found on read — an own-goal relative path one level short, and the struck pointer rule still stated as a checkable standard in the authoring checklist, both routed to the writer currently holding that file

## Event 102 — no external posting, the genre reporters land, and a note corrects itself

- Timestamp: 2026-08-24 08:40 PDT, measured
- Owner ruling, explicit abandonment with reason rather than deferral: nothing is posted to Anthropic's GitHub — the queued comment on the upstream skills issue is withdrawn as an action. The draft remains a local record at the results directory, and the finding lives in our own notes. The ruling is captured to the reflect sidecar as a HIGH constraint covering all external public repositories
- The three structural-genre reporters landed in plugin-kit at `924a74f`: ordered-step contiguity, the anti-rationalization table, and the manifest-form split, as an informational section that structurally cannot touch the verdict — suite 1612 passing, pushed. The engineer's back-run of the finished detector over the note's own corpus confirmed two ANALYSIS-005 counts digit for digit and refuted a third: the Genre 1 repository line says 5 of 5 numbered-step spines where the strict signature finds 3 of 5. Dated correction routed to the note's author; two method learnings routed to the reflect sidecar
- Still in flight: the genre authoring reference with three checklist fixes folded in, the ANALYSIS-005 correction, and the sidecar captures

## Event 103 — the closing reports: three counts corrected, one channel inference diagnosed

- Timestamp: 2026-08-24 08:41 PDT, measured
- The structural-genres note corrected itself a second time, landed at plugin-kit `93d4110`: the detector-reported Genre 1 count fixed to 3 of 5, plus two neighbours the class sweep found — the manifest count was also 3 of 5, with two creator skills using exclusively the refuted in-step pointer form (a substantive asymmetry now honestly recorded), and the gotchas-first placement was three, not four. The generalizable diagnoses are captured: a count and its examples must come from the same command, and a reported error is a sample rather than the population — sweep the class before closing
- The genre writer's own miss produced the sharpest process finding of the closing round: its final report was withheld not by forgetting but by an explicit wrong inference that the automatic return channel suffices — which is why the sidecar rule carries the flat form rather than a reminder form. Its two unrequested edits to the genre reference, both chasing the struck-rule inconsistency into lines that would have licensed enforcing it, were verified as landed improvements
- The final reflect batch is with the capture agent: the channel-inference edge case and the two counting preferences. With it, the day's capture work closes at ten findings

## Event 104 — session close: notes current, the handoff rewritten complete

- Timestamp: 2026-08-24 08:50 PDT, measured
- Both session notes brought fully current for close: this note's State rewritten through Event 103 with T-12 archived as completed at the outcomes measurement; the plugin-kit note's State rewritten to the published-main close with its five hardening tasks archived as landed-and-verified
- HANDOFF.md overwritten with the next conversation's cold-start brief, built against the last brief's failure mode: every thread now lives in a durable note and the brief's inventory maps all of them, so no future session needs a raw transcript. It carries the settled results with their numbers, the owner rulings including the reflect protocol and the no-external-posting constraint, the refuted list with receipts, the working rules distilled from the sidecar, the open items in recommended order with D-8's stale budget flagged, the updated command surface with the removed flags, and both identifier collisions named
- The session pauses here rather than closes: status stays IN_PROGRESS, the retrospective over the ledger and the ten sidecar captures is queued as the next session's protocol step

## Event 105 — session resumed; D-8 grounded against the current body

- Timestamp: 2026-08-24 08:56 PDT, measured
- Resumed from the handoff brief per its Section 0: memory skill loaded, bootstrap on ask-user-question, both repos verified on `main`, required notes read — this ledger (State, Tasks, pending decisions, Events 83-104 in full), the reflect sidecar whole, the ablation ground truth whole, the plugin-kit session record whole, the reference research's ablation-method finding with its four design caveats and open list, the genre taxonomy's lineage, and the coverage-gap analysis whole
- No conflict found between the brief and the notes or repos on any settled result
- D-8's premise re-measured before asking: the body reads ~5,794 tokens against the 5,800 fail gate, so the coverage note's ~600-spare assumption is confirmed stale. The seven body-shaped gaps (~300-340 tokens) cannot land without funded trims, and the three wrong-guidance gaps (~101 tokens by the note's own costs) are body-rule edits by nature — a wrong rule in the body cannot be corrected from a reference the reader may not open
- Also stale in the coverage note, to be errata'd when D-8 closes: "three references" (now six) and the zero-pulls-across-24-runs disclosure claim, which predates the collector fixes; post-ToC recall is 16/20 aggregate with per-file figures, which weakens that note's case against reference placement
- Environment check on the shipped skill reports 4 trigger-collision errors, all attributed to over-claiming neighbours (pptx, pdf, docx, capture); the validator's stated fix is on the neighbours — recorded, not acted on
- Next: D-8 to the owner as grouped closure packages, per the pending-decisions entry

## Event 106 — the license removed on owner ruling, and the D-8 ask rejected for missing context

- Timestamp: 2026-08-24 09:02 PDT, measured
- Owner rulings on the rejected D-8 ask, two in one: the gap descriptions must live inside the question itself, and the plugin carries no license
- License removal executed at commit bd5aaba: LICENSE file deleted, the plugin.json license field and the SKILL.md frontmatter license line removed — the wait-what acknowledgement stays, since it records the source's license rather than ours. Version 0.1.2 across the three bound sites, frontmatter test and make checks pass, installed cache refreshed 0.1.1 to 0.1.2. The skill frontmatter now carries four standard fields, so the handoff brief's "five standard fields" line is superseded by the tree
- [reflect-capture] HIGH, constraint: an AskUserQuestion call carries its whole decision context inside the call — question text and option descriptions — never in chat prose above it; the D-8 ask named eleven gaps whose definitions sat outside the dialog and was rejected on exactly that. The rule already existed in the skill's own first Gotcha and in the handoff brief, and was violated by this project's own orchestrator in live use. Capture dispatched in the background to the reflect sidecar SKILL-001: Orchestrator Process Learnings, named here as plain text; the typed edge to the sidecar already stands in this note's Relations
- Next: D-8 re-asked with all eleven gaps defined inside the call

## Event 107 — the D-8 ask composed by the skill's own rules, and the specimen that already solved it

- Timestamp: 2026-08-24 09:07 PDT, measured
- Owner correction on the re-asked D-8: use the ask-user-question skill we ship — load it formally and format the call per its rules, not one large block of question text. The skill's do-not-use clause for a wider job pausing to ask is overridden by owner ruling for this project's own session questions: live use here is also a test surface
- [reflect-capture] HIGH, constraint: AskUserQuestion calls in this project's sessions are composed by formally loading the project's own skill and following its layout rules; loading is not following — the call is checked against the skill's pre-flight before sending. Capture dispatched in the background to the reflect sidecar SKILL-001: Orchestrator Process Learnings, named as plain text; the typed edge stands in Relations
- The skill was loaded and followed end to end: body, then layout reference (its eleven-items shape), then the examples file — whose final section, one-that-failed-five-times, is this exact D-8 decision from the authoring session, with the diagnosis (findings are not options; cut points are not approaches; the real decision is how to integrate) and a finished repair call. The repair is adopted verbatim plus one fact that changed since authoring: the body at 5,794 of 5,800 means funded trims, added to the orient line and the option costs, plus a fourth leave-open option to cover the do-nothing path
- Defect found while measuring the draft against the specimen: the repair section's closing measured line quotes 14 lines and two groups, which are the checkout specimen's numbers, not the repair call's own four groups — a count-and-examples drift instance inside shipped content. Work item: fix with the next content release; it is the same defect class the sidecar's counting rule names
- Live-use disclosure note: on this strong-tier route the skill's pointers fired — layout.md and examples.md were both followed from the body. Consistent with the tier split the ablation established; recorded as an observation, not a measurement

## Event 108 — D-8 LOCKED: fold into owning sections, and the inventory found stale

- Timestamp: 2026-08-24 09:14 PDT, measured
- Owner chose, verbatim: "we should go with option 1" — fold each coverage gap into the section that already owns its topic, next to the rule it corrects; the three wrong-guidance rules rewritten in place; body changes funded by trims; the diff shown before anything lands. The oldest open decision closes as decided; the pending-decisions entry clears on this edit
- The ask that landed was the skill's own repair specimen from its examples file, adapted with the current body budget and a fourth leave-open option; it was answered on first presentation after five recorded rejections of the cut-point form in the authoring session
- Owner note on the reply asked for clarification of the plan-mode gap; answered in prose. Verifying the answer surfaced that the shipped body ALREADY carries the plan-mode rule at SKILL.md line 37 — the coverage note measured zero hits on 2026-08-23 and the body was revised after, so gap 10 is already closed and the eleven-gap inventory is stale. Consequence: the fold pass re-verifies every gap against the current tree before drafting, and already-covered gaps become dated erratum candidates for the coverage note rather than edits
- Dispatched d8-fold-draft (implementer, background): re-verify all eleven by grep, then draft the fold as a diff in a copy under the results directory — shipped tree untouched, description frozen, body at or under 5,800 post-edit, trims itemized and barred from Gotchas and ablation-attributed content, references keep their ToC accurate, gap 11 flagged as a judgment point. Brief carries the reflect-protocol line and the report-via-SendMessage rule

## Event 109 — the fold report: ten of eleven gaps were already closed

- Timestamp: 2026-08-24 09:24 PDT, measured
- The d8-fold-draft report arrived via the messaging tool and was verified against the artifacts before acting: gaps 4, 5 and 8 confirmed by grep in the asking-again reference at the cited lines; gaps 1, 2, 3, 6, 7, 9 and 10 confirmed directly against the skill body already loaded this session; the gap-11 counter-evidence confirmed in the tool-capability audit, whose still-true list includes the review screen on a multi-question call, read from the shipped binary
- Result: the coverage note's eleven-gap inventory (2026-08-23) predates the authoring revisions, which absorbed ten of the eleven — the fold locked at Event 108 is substantively already done. Only gap 11 (multi-question host fragility) is still absent, and on the scoped host the claim is contradicted rather than merely unverified; the coverage note itself pre-endorsed dropping it as a defensible authoring choice
- The draft exists and the shipped tree is untouched: a 120-line diff (a hedged gap-11 Gotcha funded by six wording trims, net zero body tokens, no reference or frontmatter change) in the d8-fold results directory, apply-check clean. The trims exist only to fund gap 11
- One agent-report caveat recorded verbatim: the draft validation ran without the environment flag, so the neighbour-collision errors were skipped rather than resolved; structure and token count both ran
- Because ten-of-eleven reverses the premise of a decision locked minutes earlier, the gap-11 and diff disposition goes to the owner rather than being taken here; the coverage note receives a dated erratum in every case, per the house errata convention
- [reflect-capture] MED, preference: a gap inventory authored before a revision pass is not evidence of a gap — re-verify every entry against the artifact as of now before implementing; here that changed the task from eleven folds to one judgment call. Capture dispatched in the background to the reflect sidecar SKILL-001: Orchestrator Process Learnings, which crosses its 15-observation threshold on this addition and takes H3 sub-grouping in the same edit

## Event 110 — gap 11 lands hedged at 0.1.3, and D-8 closes end to end

- Timestamp: 2026-08-24 09:28 PDT, measured
- Owner chose, verbatim: "Land gap 11 hedged" — against the recorded drop recommendation, on stated costs; dissent closed. The diff was read in full before applying, and the hedge is stronger than the objection assumed: it states the host history, states no known instance at this build, and steers against splitting for fear of the host
- Landed at commit 9136ba4: the hedged caution in the schema-limits Gotcha, funded by six wording trims — body net zero at ~5,794 tokens, 440 lines, references and the frozen description untouched. make checks, the frontmatter test and the validator all pass; version 0.1.3 across the three bound sites; installed cache refreshed 0.1.2 to 0.1.3
- Comparability boundary recorded: the +16.1 outcomes figure and the 16-of-20 recall table were measured against the 0.1.1 body; from 0.1.3 the body differs by the hedge and six trims, so those baselines are directional context rather than strict comparators until re-measured
- The coverage note received its dated erratum: ten gaps closed by post-authoring revisions with the evidence map, gap 11's landing, the stale token budget, the stale reference count, the pre-collector-fix zero-pulls measurement, and the re-pitch rename — verified in place before this event
- D-8 is closed end to end: locked at Event 108, premise corrected at Event 109, disposition ruled and landed here. The oldest open decision on the board is done

## Event 111 — the third capture lands, and corrects its own brief

- Timestamp: 2026-08-24 09:30 PDT, measured
- The stale-inventory capture landed and verified against the artifact: the MED preference in place, the mirrored observation added, and the Observations section restructured into three H3 sub-groups (governance 8, verification 5, affordance 2) with all fourteen pre-existing bullets byte-identical
- The capture agent corrected the dispatch brief's premise before executing: Observations held fourteen bullets, not the fifteen the brief asserted, so the restructure was permitted rather than required at this count; it was performed anyway to avoid a second pass one bullet later. The wrong fifteen came from the second capture agent's read-back tally — a stated count that did not come from the counting command, which is the sidecar's own counting rule firing on the sidecar's own maintenance chain
- Sidecar committed in this boundary alongside this event

## Event 112 — pre-registration: the examples content-boundary experiment

- Timestamp: 2026-08-24 09:31 PDT, measured
- Hypothesis: on sonnet, the teaching prose around the examples pointer — the shape-of-a-finished-call section, including the dropped-cost-half lesson — is the carrier of the measure-a-draft attribution, not the file, which reads 0 of 62 cumulative on this tier. This is the split the research note's fourth design caveat prescribes: prose and file removed separately
- Arms, all built from the 0.1.3 tree so the trims and the hedge are common to every arm: A = shipped, the control. B = prose-reduced — the pointer to the examples file stays, the section's teaching content is reworded out, per the reword-not-line-delete principle. C = file-removed — the file and its pointers removed, the stage-2 minus-examples form rebuilt on the current base
- Scenarios: measure-a-draft-against-a-good-one is the registered subject (ablation-attributed, control 0.80, bundle-removal floor 0.60). prepush-checks-in-question rides along exploratory only — its minus-examples arm was refuted at 0.83, so no prediction is registered for it and nothing about its residue is claimed in advance
- n and decision rule, registered now: 10 runs per arm per scenario, 60 runs total. Acting evidence for prose-carried: B's measure-a-draft mean at least 15 points under A's, with C within 5 points of B. C materially under B would contradict the zero-read record and forces a re-examination before any conclusion. Anything smaller than the 15-point threshold is directional only and is reported as underpowered, not as a finding. Sized against the 0.20 attributed gap; per-run scores are coarse (about five assertions), so the threshold sits under the attributed effect but well over one assertion's noise
- Confounds disclosed before the result: B shortens the body with no compensating addition, so arm B tests prose-removal plus a smaller body as a bundle; C differs from B in file presence and pointer presence together. A clean 2x2 is not run because the file-present-pointer-removed cell is the error-condition arm the stage-1 design ruling excluded
- Workers: three arms concurrent so drift lands on all equally, 7 workers each — 21 children against the machine's derived 20 budget, the sanctioned explicit-workers pattern for concurrent arms. Results to examples-boundary-a, -b, -c under the results home. Completeness gate: per-run grading compared across arms, never the headline assertions figure
- Launch HOLDS until the owner rules on the launch gate; the registration stands regardless of the ruling

## Event 113 — launch LOCKED, and the arms go to the builder

- Timestamp: 2026-08-24 09:35 PDT, measured
- Owner chose, verbatim: "Launch as registered (Recommended)" — the Event 112 registration runs unchanged: three arms on the 0.1.3 base, 10 runs per arm per scenario over measure-a-draft plus the exploratory prepush rider, 60 runs, three arms concurrent at 7 workers each
- Dispatched examples-arm-builder (implementer, background): arm B keeps the examples pointer and rewords out the section's teaching content including the dropped-cost-half lesson; arm C removes the file and every pointer, the stage-2 form rebuilt on 0.1.3; both with exactly-one-match edits, residual greps, untouched frontmatter, and the two-scenario filtered eval set. No launches from the builder — sweeps launch from this session once the arms verify, so permission prompts stay in the foreground
- Standing caveat renewed for the run window: mid-run messages from sessions named like eval workers are fixture leakage and get no reply

## Event 114 — the arm builder died on auth, partials quarantined, rebuilt fresh

- Timestamp: 2026-08-24 09:44 PDT, measured
- The first arm builder failed mid-edit with a not-logged-in error — the C-arm reference sweep was in progress at the failure moment and the B-arm copy was incomplete. The owner re-authenticated the CLI; the cause is cleared
- Partial output quarantined by rename to a -interrupted suffix rather than deleted, per the house forensics convention; the rebuild starts from a fresh directory so no half-applied edit can survive into a measured arm
- examples-arm-builder-2 dispatched with the same brief plus the quarantine warning. The registration at Event 112 is unaffected — nothing had launched

## Event 115 — arms verified, and the three sweeps launched

- Timestamp: 2026-08-24 09:54 PDT, measured
- The rebuilt arms verified against the report and by direct check: arm B keeps the pointer with the teaching prose reworded out (body 5,687 tokens, −107 against the measured 5,794 baseline); arm C removes the file and all four pointer sites with residual greps at zero including the case-insensitive sweep the builder added on its own initiative; both frontmatter blocks byte-identical to source; the two-scenario eval set passes the scenario-set schema with a 27-row control run proving the checker parses the format
- The builder's arm-structure question answered in this session rather than by re-cut: C as built matches the registration — the stage-2 form removes the whole section, and the registered decision rule assumes exactly this A/B/C structure (A teaching+pointer+file, B pointer+file, C none), so A-vs-B isolates the teaching prose and B-vs-C isolates file-plus-pointer with teaching constant
- Three sweeps launched concurrently from this session at 09:54: arm A the shipped 0.1.3 tree, arm B minus-prose, arm C minus-file; 10 runs per scenario over the two-scenario set, 7 workers per arm, results to examples-boundary-a/-b/-c. Sixty runs in flight
- The builder's own reflect findings (two HIGH: section-removal interaction surfaced before the run; briefed-pattern sweeps widened to the class) ride in its report for the retrospective; the fixture-leakage caveat stands for the run window

## Event 116 — the content-boundary readout: a double null, and the attribution does not reproduce

- Timestamp: 2026-08-24 10:08 PDT, measured
- Completeness gate PASS on all three arms: 20 of 20 run files each, every run graded, identical 110-assertion denominators, zero file-loads, install state absent. The per-run comparison was made across arms per the standing rule, not read from headlines
- The registered subject, measure-a-draft-against-a-good-one at n=10 per arm: A (shipped 0.1.3) 0.700, B (minus-prose) 0.740, C (minus-file) 0.720. The registered prose-carried condition — B at least 15 points under A with C within 5 of B — is NOT met: B sits 4 points ABOVE A and all three arms lie within 4 points of each other
- Two findings, both against the going theory. First, the teaching-prose-carrier hypothesis is refuted at this n on this base: removing the dropped-cost-half lesson and the shape enumeration cost nothing. Second, the stage-2 bundle attribution itself (0.80 to 0.60 at n=2 on the pre-ToC base) does not reproduce: removing the entire file-plus-prose bundle on 0.1.3 at five times the sample moves the score 2 points. Whether the n=2 cell was noise or the base drift (ToC blocks, trims) dissolved the need cannot be separated from this data; the ablation note's own Finding 8 warned no stage-2 cell stands alone
- The dead route holds and extends: examples.md read 0 of 10 on measure-a-draft in A and 0 of 10 in B — the cumulative sonnet record on that route grows by 20 runs, still zero. The file WAS pulled 3 of 20 (A) and 4 of 20 (B) — but on the prepush rider, not the registered subject; the earlier per-run extraction that showed zero everywhere used a wrong key and was corrected from the authoritative files table before this event
- The exploratory prepush rider, no registered prediction: A 0.717, B 0.583, C 0.833 — and in C, layout.md recall reaches 10 of 10 against 7 of 10 in both arms carrying the examples file. Directionally consistent with stage 2's refutation (minus-examples 0.83 over control 0.67): the examples file may distract from layout.md on this scenario. Hint only at these n; a registered follow-up would be needed before any claim
- Verdict-layer guard recorded: these results files compute per-file verdicts against a two-scenario subset, so their verdict columns (including a prune on wording.md) are NOT of record and must not be quoted outside this experiment
- Consequences held for the owner's ruling before any note or corpus edit: the corpus row's examples annotation, the ANALYSIS-007 dated correction, and the method addendum to the plugin-kit research note

## Event 117 — the row goes negative by ruling, and a Mode 1 failure repaired on the way

- Timestamp: 2026-08-24 10:21 PDT, measured
- The corpus-row ask failed twice before it landed: the owner opened the chat escape on the first form, then answered "I didn't understand what you were asking me" to the offer of clarification. Diagnosed via the skill's own failed-question reference as Mode 1 — the premise was buried in measurement jargon (corpus row, expects_references, recall) the reader does not own, on a call that passed the full pre-flight. Repaired by restating the same decision in the reader's nouns: a test-task tag saying which file should be read. The repaired call was answered on first presentation
- [reflect-capture] MED, edge case: a call can pass every layout rule and still fail Mode 1 on vocabulary — the cold-reader re-read must check the nouns as hard as the facts. Capture dispatched in the background to the reflect sidecar SKILL-001: Orchestrator Process Learnings
- Owner chose, verbatim: "Needs no file (Recommended)" — the measure-a-draft row is re-derived to an outcome negative. Executed at fe1d8f9: `expects_references: []`, corpus validates clean through the scenario-set schema (16 annotated, 7 negatives, 27 rows). First validation attempt errored on my own call — the checker takes (raw, source) and I passed one argument; the builder's control run had proven the checker sound, so the signature was checked before the edit was suspected
- ANALYSIS-007 carries the dated erratum (attribution withdrawn on the current base, row negative by ruling, stage-2 counts read as-of-stage-2, the stronger-tier caveat as the deletion guard); plugin-kit's ANALYSIS-004 Finding 18 gains the fifth design detail — re-derive ground truth after base drift, stamp attributions with their base version — committed and pushed at plugin-kit 173cea7
- Brain edit_note timeouts that mask completed writes are now three of three under sweep-adjacent load this session; every ledger and note write this window was disk-verified before commit

## Event 118 — the session continues, and the sonnet trigger sweep launches

- Timestamp: 2026-08-24 10:27 PDT, measured
- Owner correction on framing: the session is NOT closing — the retrospective is the queue's last item, not the next one. The open board stands: this sweep, then the plugin-kit engineering (T-13 plus the improvement candidates, held while runs go through the tooling), the genre experiments, and the two pending rulings
- Launched the sonnet trigger sweep, the Event 92 coverage companion: make measure-trigger, MODEL=sonnet, the 52-row candidate eval set to mirror the sweep of record (49/52 on the default model), 3 runs per query, results to a stamped measure-trigger directory. Detached; the skill tree and plugin-kit are both edit-frozen until it lands
- Sequencing note: the sweep runs through plugin-kit's measure-triggering, so T-13 and the improvement-candidate work queue behind it per the tool-edits-versus-runs rule

## Event 119 — T-09 ruled GATED, not obsolete, and the task board reconciled

- Timestamp: 2026-08-24 10:43 PDT, measured
- Owner ruled on the uninstall item, verbatim: "we should keep this - we only installed it temporarily so that we could use it with ask-user-question plugin - once we're done using it with the ask-user-question plugin we still need to do this to-do item." T-09 is neither executed nor retired: it is GATED on the end of this project's use of plugin-kit, and the gate is now written on its row so no future session re-litigates it
- The handoff brief's "obsolete on its face" framing is corrected by this ruling: the install was always scoped-temporary by owner intent, and current dependence is evidence of active use, not of permanence. The Recommended option in the ask had the same wrong premise
- Board reconciled in the same pass: T-10 archived as completed (the D-8 closure at Event 110 was its resolution; archive count 7 to 8), T-11 moved to Unblocked with its real scope noted (description is sha-frozen, so spending the 18 characters means a rebind plus trigger re-measure), T-13 moved to Unblocked (its blocker was never a dependency, just out-of-repo scoping)
- [reflect-capture] MED, preference: a to-do that looks overtaken by events may instead be gated on an end condition only the owner knows — recommendation premises come from owner intent, not from current-state inference, and the fix is writing the gate on the task row. Capture dispatched in the background to the reflect sidecar SKILL-001: Orchestrator Process Learnings

## Event 120 — the brain-tooling ticket deferred to the retrospective, by ruling

- Timestamp: 2026-08-24 10:49 PDT, measured
- Owner chose, verbatim: "Defer to session end" — the bug report against the Brain write path (write_note status-drop at 3 of 3; edit_note timeout-masking-completed-writes at 6 of 6 today) is written by the retrospective as part of its synthesis, when every instance sits in one place. Not dropped: the deferral is the disposition, and the retrospective's brief carries it as a deliverable
- Both pending owner rulings from the handoff brief are now resolved: T-09 gated (Event 119), the ticket deferred here. The pending-decisions section stays empty
- In flight: the sonnet trigger sweep, and the fifth reflect capture

## Event 121 — the sonnet trigger readout: half the positives never fire, and every negative is clean

- Timestamp: 2026-08-24 10:52 PDT, measured
- The Event 92 coverage companion lands: make measure-trigger on sonnet, the candidate eval set (now 54 rows: 39 positive, 15 negative), 3 runs per query, against the shipped 0.1.3 description. Results in the stamped measure-trigger directory under the 102813 run
- Headline: recall 20 of 39 = 51.3 percent; false triggers 0 of 15. The under-reach is one-sided — sonnet never fires where it should not, and misses half of where it should. The tier split the disclosure work established (opus over-reaches, sonnet under-reaches) reproduces at the triggering layer
- Per-group: all four negative groups clean (15/15). author-eleven — the owner's own phrasings — 3 of 11. generated-positive 3 of 7. The gap-* groups built to probe capabilities without a description hook fail on sonnet where they passed on the record model: gap-cost 1/3, gap-comparability 2/3, gap-evidence 2/3, gap-rejection 2/3. The failing queries share a shape: symptom-phrased ("my three choices dont line up", "i want them to see what theyre giving up") or file-referenced, without composition vocabulary
- Comparability stated honestly, from the sidecar's own SUPERSEDED markers: the 49/52 record was measured against an earlier description (998 chars at ddfdbd9, then 965 at 746889b — both superseded by the frozen 1,002-char description) and a 52-row set. Today's sweep is therefore the FIRST trigger measurement of the shipped description on any model, and the sonnet-versus-record delta confounds model, description bytes and two added rows. The absolute sonnet floor stands regardless: 19 of 39 positives at zero or one-third rate
- Disposition goes to the owner: description-recall work would re-open the frozen description (sha rebind, T-11 interaction, baseline reset), and that is not this session's call to make

## Event 122 — no lock on the description; the diagnosis-and-review wave dispatched instead

- Timestamp: 2026-08-24 10:56 PDT, measured
- The owner answered the pickup-gap ask with free text rather than an option: show the intended description changes and more on why the misses miss, before any decision. The description stays frozen; nothing is edited
- Owner also asked whether we run the latest plugin-kit and use all of it. Answered by check: installed plugin-kit is 0.4.0 matching the repo, and the ACMElabs marketplace is file-source, so the installed surfaces read the working tree carrying today's pushes. The honest usage gaps found: the skill-reviewer agent has never run against the finished artifact, and the genre catalog has not been applied to this skill as an authoring lens
- Two dispatches, parallel, background: plugin-kit's skill-reviewer over the shipped 0.1.3 tree (read-only findings report, briefed with the measured context so it separates defect from measured-and-deliberate); and an analyst on the 19 sonnet trigger misses — per-miss diagnosis, hook clusters, and two candidate one-line descriptions at or under 1,024 chars with funding trims and risk checks against the 20 currently-passing rows, grounded in plugin-kit's current evidence-labeled doctrine
- Synthesis of both reports comes back to the owner as the informed version of the pickup-gap decision

## Event 123 — the owner's sync suspicion verified: four reviewer agents carry struck doctrine

- Timestamp: 2026-08-24 10:58 PDT, measured
- Owner flagged that the create-skill skill was updated but the skill-reviewer agent was not. Verified and widened by class sweep: skill-, agent-, command- and mcp-reviewer all embed the struck pointer-condition rule inline (each teaching "a pointer should carry the condition that makes the reader open it" as the Minor-finding fix), all last committed 2026-08-09 — before the recall reframing, the ToC standard, the genre catalog and the strike list. plugin-reviewer is clean on the swept markers. The plugin-kit session note's open candidate about the two creator skills using the refuted in-step pointer form now extends to the reviewer class
- Precision that shapes the fix: current doctrine KEEPS pointer repair as remedy lever one; what was struck is the mandated pointer FORM (file plus firing condition plus cost of skipping, measured 33-75 percent recall despite full conformance). The reviewers are re-grounded in the rewritten disclosure-optimization language, not stripped of signposting
- Consequence for the review in flight: auq-skill-review spawned on the stale definition; its structural findings stand, its pointer-form findings get triaged against current doctrine before any reach the owner
- Reviewer-modernization dispatch queued behind this event; the running review instance is unaffected by definition edits, which load at spawn

## Event 124 — the stale review stopped by owner call, to re-run on the fixed definition

- Timestamp: 2026-08-24 10:59 PDT, measured
- Owner: a review running on a definition just proven stale should not keep running. Correct, and stronger than the plan it replaces — Event 123 had the review continuing with its pointer-form findings filtered at triage; filtering a stale reviewer is strictly weaker than re-running a current one, and the run costs more than the re-dispatch saves. auq-skill-review stopped mid-run; no findings were consumed from it
- The review re-dispatches after the reviewer-modernization diff is reviewed and committed. The diagnosis agent is unaffected (it reads doctrine references directly, not the reviewer definition) and keeps running
- [reflect-capture] MED, preference: when the definition governing a dispatched agent is proven stale mid-run, stop the run and re-dispatch on the corrected definition — planning to filter the stale output at triage is the weaker remedy and spends the same review twice. Capture dispatched in the background to the reflect sidecar SKILL-001: Orchestrator Process Learnings

## Event 125 — the second sync sweep: the frontmatter reference teaches the measured trap, five skills carry it

- Timestamp: 2026-08-24 11:02 PDT, measured
- Owner asked whether skill-creator's authoring checklist and its frontmatter reference survived the doctrine updates. Verified: authoring-checklist.md is CURRENT (last touched in the 08-24 genre commit; the Event 101 defect pair fixed there; ToC item and 5,000-token check present). skill-frontmatter.md is 08-09 vintage and actively recommends `allowed-tools: Read, Grep, Glob` as prompt-free orientation — the exact field Events 71-72 measured as a 100 percent deterministic headless load failure (not in the binary's 43-key allowlist; upstream issue 77363), the reason this project's skill ships without it
- Class sweep: ALL FIVE plugin-kit creator skills carry `allowed-tools` in their own frontmatter, so each has the same headless defect their reference taught. The plugin-kit session note's open candidate (two creator skills on the refuted pointer form) now has a sibling class finding at the frontmatter layer
- Scope note held onto: command-frontmatter `allowed-tools` and MCP grant strings are different mechanisms and are NOT covered by the Event 72 measurement; any fix there needs its own verification, not a blanket strip
- Disposition to the owner: strip the field from the five (the precedent this project set), or keep it documented as interactive-only. The Event 72 record is the evidence either way

## Event 126 — LOCKED: the field stays a capability; the reference teaches the trap beside it

- Timestamp: 2026-08-24 11:08 PDT, measured
- Owner ruled on the allowed-tools question in two parts, verbatim core: "we can't just not let skills define that property in their front matter." The strip option is rejected — banning the field would restrict every future skill authored through skill-creator, which is not acceptable. The five creator skills keep their field. And "I don't mind stripping it for the headless optimization" — permission for a harness-side strip, not a mandate; NOT built, because the spawn-site grant (SKILL_EXECUTION_GRANT, verified at disclosure-measure.ts:248 and measure-outcomes.ts:931) already makes measurement work whatever the frontmatter carries, and a copy-time strip would measure bytes that differ from what ships, the wrong-regime fault class
- Correction issued to my own earlier framing in the same exchange: the first ask overstated the exposure ("invisible to every scripted, CI, or eval run") — plugin-kit's own harness measures the five skills fine; the exposure is only headless consumers outside the harness who pass no grant
- Executed: the running reviewer-modernization agent's scope extended by message to include skill-frontmatter.md — keep the field and its interactive rationale, add the measured headless caveat with the upstream issue numbers and the Execute-versus-Launching diagnostic, fenced explicitly against any ban or deprecation
- Still running: the modernization (now five files), the trigger-miss diagnosis, and the stop-stale-run reflect capture

## Event 127 — owner asked whether the grant works; verified on three lines

- Timestamp: 2026-08-24 11:09 PDT, measured
- Live: all 60 of today's content-boundary runs report skillLoaded true with loadedVia skill in their observation blocks — every run skill-system-delivered through the granted spawn site, zero file fallbacks, zero refusals. First extraction attempt guessed wrong key names and read as 60 not-loaded; corrected from the real run-file schema before any conclusion, the second wrong-key instance today
- With the field present: Event 71's measured cell stands — 4 of 4 loads under the grant while the skill still carried allowed-tools, before the Event 72 strip
- Instrument: skillLoaded is set from the tool result (the Launching-skill payload) per the 02248f3 collector fix, so a refused load cannot read as loaded
- Verdict: the grant works correctly, measured not argued

## Event 128 — the modernization lands and pushes; the diagnosis resumes; the review re-runs clean

- Timestamp: 2026-08-24 11:11 PDT, measured
- The reviewer-modernization report verified against the artifacts (diff stat, the re-run sweep showing one historicizing hit per edited file and zero teaching hits, strict validate pass, suite 1,612) and committed at plugin-kit f88fb50, pushed. Five files: the four re-grounded reviewers plus skill-frontmatter.md — whose scope-extension edit had landed on disk before any second report arrived, was read in full, and matches the fence exactly: field kept, trap taught with the upstream issue numbers, the Execute-versus-Launching diagnostic included
- The modernization report's process learnings ride in its report for the retrospective, the sharpest being that a doctrine strike colonises output templates and severity schemes, not only prose — the specified sweep found the teaching text and missed a table column enforcing the same rule. Also surfaced: all five reviewer descriptions exceed 1,024 chars (1,876-2,530), a standing pre-existing finding queued for plugin-kit backlog; and measure-triggering covers agents and commands too, an available follow-on re-grounding deliberately not taken
- Owner verification answered from source: the optimizers are safe with allowed-tools in a skill's frontmatter — optimize-disclosure runs scenarios through the granted disclosure-measure module, optimize-description through the pre-permission trigger path, and callClaude in both is the skill-free grader helper
- The trigger-miss diagnosis agent died on an API server error mid-response; per owner instruction it was nudged to resume from its transcript and deliver rather than re-dispatched from scratch
- The skill review re-dispatched on the corrected, committed reviewer definition; the sixth sidecar capture (stop-stale-runs) verified and committed at bee0fca

## Event 129 — the second home found: portability.md still says add-freely

- Timestamp: 2026-08-24 11:12 PDT, measured
- The modernization agent's scope-extension report landed after the commit and surfaced one contradiction it was correctly fenced out of fixing: shared/references/portability.md line 38 classifies allowed-tools fail-safe and says "Add these freely" — right on its own axis (other runtimes ignoring the field), materially misleading for headless Claude Code consumers, and in the shared pool all five creator skills read, so the stale advice had the wider audience while the correction landed in the narrower file
- Follow-on dispatched to the same agent under the same fence: qualify the add-freely sentence with the measured headless behaviour and point to the full treatment in skill-frontmatter.md; classification kept; uncommitted; report back
- The agent's three process learnings batch-dispatched to the reflect sidecar: a doctrine strike colonises output templates and severity schemes beyond prose; a struck rule can bundle a claim that survives it, so re-grounding reads the block sentence by sentence; a measured finding lands in more than one document and the scoped file is not always the load-bearing one — grep the shared pool before calling the edit complete
- Still in flight: the resumed trigger-miss diagnosis, the clean skill review, the portability fix, and the batch capture

## Event 130 — the miss diagnosis lands: mostly tier, one clean gap, one suspect clause

- Timestamp: 2026-08-24 11:13 PDT, measured
- The resumed diagnosis delivered in full and its headline verified against both results files by independent join: of the 19 sonnet misses, 15 PASSED on the prior opus sweep against byte-identical hook text, 3 failed on both tiers, 1 was never measured on opus. The sweep is primarily a model-tier measurement confounded with a description edit (opus/998-char versus sonnet/1,002-char), quantified beyond Event 121's caution. Eight rows carry near-literal hook vocabulary and still miss on sonnet — the hook lever is measured-weak there, and more text is fitting to a variable the text does not control
- The one word-level suspect: the register clause edit ("the plain wording of a question nobody could answer" became "wording a cold reader could not act on") is the single change that could have hurt, confounded with the tier; its clean separation costs one sweep — the preserved 998-char bytes on sonnet against the same 54-row set
- The one clean uncontested gap: row 53, review-a-draft named by path, 0/3 with no hook while the pasted form fires 3/3 — the evidence T-11's held 18 characters were waiting for, by the eval set's own design criterion
- Two candidate descriptions delivered with full accounting: (a) minimal-edit at 1,020 chars — the axes deepening, the draft-review hook, the register revert, the render-contradiction removal, funded by negative-clause compression, with named precision risks (the plain/house-style negative, the axes clause's measured opus false positive); (b) restructured at 1,011 chars, six of seven clusters, materially higher risk to passing rows. The diagnosis recommends (a), and before (a), the separating sweep
- Also delivered: the prompt-noun observation (eight misses use "prompt" as their artifact noun; the description carries it only inside a load-bearing negative) and the file-path hypothesis for the author-eleven rows (mutation-before-trigger detection; counter-evidenced by three passing path rows; testable by stripping paths) — both recorded as hypotheses, not findings
- Disposition to the owner next; nothing edited

## Event 131 — portability landed and pushed, the batch capture committed, and the subset-runner feature opens

- Timestamp: 2026-08-24 11:16 PDT, measured
- The portability.md follow-on verified and landed at plugin-kit 61befe4, pushed: the add-freely imperative qualified in the same breath it is stated, the classification affirmed before the exception (the agent's own framing — Chesterton's Fence applied to prose), the diagnostic pointed at rather than duplicated. Its report also flagged, recorded not acted: two bare-filename cross-references in shared/references that do not resolve as paths, plugin-creator's body 12 tokens over the 5,000 target, and portability.md now six lines from the ToC threshold
- The three-finding batch capture verified against the sidecar and committed at 5add0b2 — the sidecar holds twenty-one observations and fourteen MED-or-higher process findings. The capture agent corrected the dispatch brief's observation count again (18 to 21, not 17 to 20): the second stated-count-drift instance in the sidecar's own maintenance chain, both now on record
- Owner feature request, driving the next engineering dispatch: the iterative optimization measures should run a SELECT GROUP of measures rather than the full set every time — focus on one group or one query while making small changes, full runs only to confirm. Direct fit to the description-iteration loop the diagnosis opened
- The next-sweep decision (separating test versus minimal edit versus hold) was interrupted by this request and remains OPEN on the pending stack, to re-surface when the owner returns to it

## Event 132 — the clean review lands verified, and the subset runner gains its display requirements

- Timestamp: 2026-08-24 11:20 PDT, measured
- The re-dispatched skill review (on the modernized reviewer definition) delivered: zero Critical, one High, three Medium, five Low, with the measured-and-deliberate set correctly fenced (no allowed-tools, ToC blocks, body-at-gate, frozen description all recognized, not flagged). Its three sharpest claims verified against the artifacts before any reached a decision: M1's two wrong self-measurement lines in the examples file (checkout 12 lines not 14; the repair 22 lines and four groups against its stale "14 lines, two groups" — converging with Event 107's independent catch), H1's noun audit exact (answer 0, user 1, dialog 1, prompt 1 — the symptom-side nouns anchored only in exclusion clauses, the mechanism consistent with the trigger diagnosis), and M3's destructive-confirmation contradiction at the cited lines in both references
- One number held unsettled rather than adopted: the repair call's widest-line figure reads 58 display cells in the review and 62 codepoints in my check — remeasure with the host's own width function at fix time rather than trusting either
- H1's candidate description (symptom-noun anchoring at 1,023 chars) joins the diagnosis's two candidates as a third input to the OPEN next-sweep decision — three draft descriptions now exist and none lands without the owner
- Owner requirements for the subset runner relayed to the builder mid-build: the CLI displays only the filtered rows with subset-sized denominators and an explicit subset statement; the HTML report and dashboard listing carry an unmissable subset badge so an iteration run can never be mistaken for a run of record
- Pending decisions stack, surfaced per the persistence rule: (1) the next-sweep decision — separating test, minimal edit, or hold, now with H1 as a third candidate; (2) the review-fix disposition for the three Mediums

## Event 133 — review-fix disposition LOCKED: the three Mediums draft now, toward 0.1.4

- Timestamp: 2026-08-24 11:23 PDT, measured
- Owner chose, verbatim: "Fix the three now (Recommended)" — the two wrong self-measurements in the examples file, the two missing reply-shape rows in the reading-answers recognition table, and the destructive-confirmation exception clause in both references. Diff shown before landing; version 0.1.4 across the three bound sites rides in the same working tree
- The disputed widest-line figure resolves by measurement in the fix itself: the drafter measures with the host's own width function rather than adopting either prior number
- The review's remaining findings stay recorded, not acted: H1 (the symptom-noun description proposal) is an input to the open next-sweep decision; L1-L5 hold — L2 explicitly because the outcome assertion set may target the sentence it would cut
- Pending stack unchanged: (1) the next-sweep decision, now with three candidate descriptions; (2) this fix's diff approval when the draft returns

## Event 134 — 0.1.4 lands: the three review defects corrected

- Timestamp: 2026-08-24 11:28 PDT, measured
- Owner approved the drafted diff at the gate, verbatim "Land 0.1.4 (Recommended)"; committed at 21f40ae, installed cache refreshed 0.1.3 to 0.1.4
- What shipped: the examples file's two self-measurement corrections (the checkout field at 12 lines; the repair's closing line at 22 lines, widest 58 display cells by the host's own width function, four groups at rule 4's ceiling — the Event 107 catch now fixed); the reading-answers recognition table honouring its own match-against-me contract with the chat-escape row and the timeout row split into with- and without-selection cases; and the destructive-confirmation exception clause in both references, each naming Section 5 as the rule being followed
- The width dispute resolved by measurement with a diagnosis: the review's 58 was display cells, my 62 was UTF-8 bytes in disguise (the marker glyphs are three bytes each) — five metrics tabulated in the fix report, the host's function is the authority
- Gates: make checks PASS, frontmatter test binds 0.1.4 across the sites, frozen description hash byte-identical before and after, SKILL.md diff exactly the version line
- Comparability note extends: recall baselines now trail the 0.1.1 references by the ToC additions (pure), the 0.1.4 reference content changes (rows and clauses), while the body trails 0.1.1 by the 0.1.3 trims and hedge — the next disclosure sweep of record re-baselines everything
- Still running: the subset-runner build with the report-badge requirements. Still open: the next-sweep decision, three candidate descriptions waiting

## Event 135 — published: the repo goes to GitHub, and the no-push convention is superseded

- Timestamp: 2026-08-24 11:33 PDT, measured
- Owner ruling: "To be turned into a git repo and pushed" with the URL — the AUQ-does-not-push convention from the handoff brief is superseded by explicit instruction. This is the owner's own org, so the no-external-posting constraint (which governs OTHER parties' repositories, Anthropic's included) is untouched
- Executed: the local repo was already a git repo on main; the GitHub side did not exist. Created public at github.com/acmelabs-15/ask-user-question, mirroring the sibling plugin-kit's visibility; origin added; main pushed with full history through b9f960d and set to track
- Pre-publish secret sweep run over the tracked tree: the broad pattern pass hit only prose vocabulary; the high-signal credential pass (provider key prefixes, bearer shapes, JWT shapes) returned zero. Nothing redacted, nothing to redact
- Standing behavior from here: AUQ commits push to origin main like plugin-kit's — ledger commits included, starting with this one

## Event 136 — HANDOFF.md out of the published repo, and a pathspec trap caught

- Timestamp: 2026-08-24 11:34 PDT, measured
- Owner: the published repo should not include HANDOFF.md. Executed at 81085ee: untracked and ignored, pushed; the file stays on disk as the local cold-start brief. Verified: zero in ls-files, ignored, present locally
- The first attempt (5ce7133) silently failed to carry the deletion: committing with an explicit pathspec commits the WORKING-TREE state of those paths, which re-added the file over the staged git rm --cached. The house commit-by-pathspec habit — adopted against the shared-index sweep hazard — inverts for index-only deletions; the fix is a pathspec-free commit with only the deletion staged, verified by status before committing
- [reflect-capture] MED, edge case: git commit with a pathspec re-adds a working file over a staged index-only deletion (git rm --cached), so untracking commits must be pathspec-free with the staged state verified first — the pathspec habit is for content edits, not for tracking changes. Capture to the sidecar rides the next batch rather than a dedicated dispatch
- History note, stated not acted: HANDOFF.md remains in the pushed history prior to 81085ee (it carries no secrets, swept). Scrubbing history would need a force push to main, which the house rules forbid — that only changes on an explicit owner ruling

## Event 137 — owner catches an overclaim, and the re-invocation dedupe is discovered

- Timestamp: 2026-08-24 11:38 PDT, measured
- Owner challenged "this conversation is using 0.1.4 right now" and the challenge was correct: a loaded skill is a snapshot at invocation time, and this session's snapshot predates the 0.1.3 body edits and the 0.1.4 fixes. What was true: a fresh invocation serves 0.1.4; what was overclaimed: that this equalled the running conversation using it
- The remedy attempt surfaced a tool behaviour worth keeping: re-invoking an already-loaded skill is DEDUPED in-session — the harness answers "already loaded above; instructions unchanged" and injects nothing, so the stale snapshot cannot be refreshed by re-invocation. In-context currency comes only from reading the changed files directly or from a session restart. This sharpens the compaction-retention picture: the most-recent-invocation rule and the in-session dedupe together mean a session can hold a stale skill for its whole life while the tree moves
- This conversation's working knowledge is nonetheless current by a different route: every delta between the snapshot and 0.1.4 was authored or reviewed in this session, so the diffs are in context even though the reload was refused
- [reflect-capture] MED, edge case, queued for the next batch with the pathspec trap: version claims about a running session must distinguish the invocation-time snapshot from what a fresh read serves; and re-invocation cannot refresh a loaded skill — the dedupe answers instructions-unchanged without comparing bytes

## Event 138 — the live invocation catches the third home: skill-creator's own body

- Timestamp: 2026-08-24 11:43 PDT, measured
- Owner invoked Skill(plugin-kit:skill-creator) directly — after correcting my unqualified notation, which in this environment is genuinely ambiguous (a standalone skill-creator plugin also ships a skill-creator skill; the qualified name is the address, same lesson as the marketplace update command)
- Reading the freshly served body against current doctrine caught three stale lines the day's sweeps had not reached, because they live in body PROSE rather than in agents or references: line 85 routes reviews to the standalone plugin's un-modernized reviewer by name (skill-creator:skill-reviewer, not the re-grounded plugin-kit:skill-reviewer); line 212 teaches raw pull rate as the disclosure evidence, superseded by recall in the three-layer rewrite that landed hours after this body's last commit; line 218 teaches the struck pointer-without-a-condition rule as fact
- Class sweep localizes the drift: the other four creator bodies are clean on all markers. Fix dispatched to the modernization agent under the standing fence plus one hard constraint — this body sits deliberately at 4,999 of 5,000 tokens and MUST NOT grow, so every edit is token-neutral or negative, verified by the validator before and after
- The day's doctrine-propagation map now spans four layers: reviewer agents, the frontmatter reference, the shared portability reference, and a skill body — each found by a different route (owner suspicion, owner suspicion, agent flag, live invocation), which is itself the strongest argument yet for the strike-sweep-the-class rule the sidecar carries

## Event 139 — the subset runner verified, and two follow-ups close its scope

- Timestamp: 2026-08-24 11:47 PDT, measured
- The subset build verified against the tree: suite 1,666 from 1,612 with zero failures (captured output this time, per the builder's own intermittency warning), typecheck clean, engine and both optimizers untouched by numstat, the smoke run exercising group resolution end to end on one row. The stamp design's strongest part: subset runs are MECHANICALLY incomparable, not just labeled — the eval-set hash is computed over the rows that ran, so compareRuns refuses subset-versus-full and subset-versus-subset deltas by construction
- The builder corrected the dispatch brief's file name (the tier-study pattern lives in measure-disclosure.ts, not disclosure-measure.ts — near-anagram names, engine versus CLI), the fourth agent-corrects-brief instance today. It also flagged pre-existing suite intermittency it could not capture (two red runs across seven, both slow, test names lost by tailing rather than capturing) — plugin-kit backlog candidate, with capture-full-output-in-shared-trees as its own lesson
- Two follow-ups dispatched to close the scope: the dashboard listing has ZERO not-of-record awareness (verified by grep — neither subset nor the pre-existing tier-study class), so run rows gain a badge for both; and the owner's directive that the feature be reflected in the skill references — both operator guides gain an iterating-on-a-slice subsection with the stamp semantics and the never-record rule
- Optimizer wiring deliberately parked with the builder's analysis on record: the holdout-split interaction (a small subset makes selection rest on single attempts) and the apply fence (a slice must never auto-edit a shipped artifact) are decisions, not plumbing
- Also on disk, report pending: the modernize agent's skill-creator body fix — commits separately once verified

## Event 140 — the third home lands under its ceiling, and the fourth home settles by distribution check

- Timestamp: 2026-08-24 11:49 PDT, measured
- The skill-creator body fix verified and landed at plugin-kit 6c0bc4e, pushed: review routing to the modernized reviewer, recall named as the disclosure evidence with pull rate demoted-but-retained beside it (it stays a real report column; the objection was verdict status, not visibility), and the struck clause removed by ending its sentence early. Body 4,998 to 4,990 tokens — the deletion sequenced FIRST so its savings funded the reframe, the ceiling-edit-order lesson the agent stated cleanly
- The agent's flagged fourth home resolved by checking the fact it could not reach: the standalone skill-creator plugin ships its OWN copy of the authoring checklist naming its own reviewer, correct for its users; plugin-kit's copy serves plugin-kit users, so its line 7 was repointed to plugin-kit:skill-reviewer in the same commit
- The agent also warned unprompted about the shared working tree (a bare commit would sweep the subset builder's in-flight files) — the shared-index hazard held by both agents independently, and the pathspec commit kept the trees separate
- plugin-creator's body at 5,012 tokens (12 over ceiling) re-confirmed by the agent's own instrument — already on the plugin-kit backlog from Event 131
- Batch reflect capture dispatched for the three queued findings: the pathspec-recommit trap, the loaded-skill snapshot with its re-invocation dedupe, and deletions-before-additions on a hard-budget artifact

## Event 141 — the second batch lands: twenty-four observations, and the read-back rule extends to success payloads

- Timestamp: 2026-08-24 11:51 PDT, measured
- The batch-2 capture verified against the artifact and committed in this boundary: the pathspec-recommit trap and the loaded-skill snapshot as edge cases, the deletions-before-additions ceiling technique as a preference, all three mirrored — the sidecar holds twenty-four observations across its three sub-groups, none near the cap
- New Brain-tooling instance for the deferred bug report: a SUCCESS payload carried phantom doubled tallies (HIGH 10, MED 34 against a true 5 and 16) on a write that was in fact correct and single — the capture agent read back instead of "fixing" the phantom duplication, extending the read-back-before-reacting rule from error payloads to bogus success payloads. The Event 116 tally noise is now independently confirmed by a second observer

## Event 142 — the display work verified, and two owed items returned to the builder

- Timestamp: 2026-08-24 11:59 PDT, measured
- The subset display round verified: suite 1,684 from 1,666 with zero failures (captured), the CLI showing only filtered rows with subset denominators and the one-line caveat in three deliberate placements, the dashboard chip and run-page banner carrying subset-ness as a FIELD rather than parsed label prose, and a half-written marker dropped whole rather than rendered beside wrong counts. The builder's own test round caught a real self-defect: a banner sentence split mid-phrase across a concatenation rendered fine but was ungreppable — re-split on phrase boundaries and pinned
- Two brief items confirmed missing and returned: the tier-study chip (the brief said BOTH not-of-record classes; the builder built the pattern and wired only subsets, disclosing the gap honestly) and the operator-docs subsections (item 2 of the follow-up, absent from the diff — git over shared/references/ is empty). The feature commits as one when both land
- Held facts for the eventual commit: the CLI smoke's gap-register 0/1 row is a smoke, not a measurement — stamped as such by the tool itself

## Event 143 — the subset feature lands whole at plugin-kit 1600348

- Timestamp: 2026-08-24 12:05 PDT, measured
- All follow-ups closed and verified (suite 1,688 from the 1,612 baseline, zero failures, captured; no skill body in the diff; both docs subsections present), committed as one feature commit and pushed. Sixteen files: the subset vocabulary module, both measurement CLIs, the progress/status layer, three report surfaces, two operator references, six test files
- What the owner asked for, delivered end to end: run a select group instead of all measures (per-index, per-scenario-id, and group-via-sidecar selection), the CLI showing only the filtered rows with subset denominators, and subset-ness visible in the reports and the dashboard at a glance. Beyond the ask, by the brief's both-classes rule: tier-study runs — previously unmarked in the listing — now chip alongside subsets, and a run carrying both shows both
- The builder's final round corrected the dispatch brief's third wrong premise (the dashboard reads heartbeated status files, not results.json — a results-driven badge would never have fired for the trigger tool and would have missed the during-run visibility the owner asked for), caught its own invented-example defect before shipping (scenario ids that no shipped set uses), and matched each doc's own wrap convention with the lint delta measured rather than assumed
- Parked with rationale on the ledger: optimizer wiring (holdout floor, apply fence), the plugin-creator token breach, the reviewer description lengths, the suite intermittency
- The board after this: nothing in flight; open — the next-sweep decision; queued — the retrospective with the three-defect-class Brain bug report

## Event 144 — LOCKED: the disclosure envelope builds, and T-13 rides with it

- Timestamp: 2026-08-24 12:09 PDT, measured
- Owner asked whether measure-disclosure should write an envelope; the source check found it is the ONLY measurement tool without one — the hardening pass patched the install-state hole the missing envelope caused, not the envelope itself. The costs are on this ledger already: disclosure subset runs are label-only where trigger runs are hash-refused, the interrupted-pair misdiagnosis was a by-hand denominator comparison the envelope layer mechanizes, and the counted-versus-all totals candidate is envelope-shaped provenance
- Owner chose, verbatim: "Build it, with T-13 (Recommended)" — one dispatch takes the envelope (set hash over rows that ran, model, install state, subset and tier-study caps, counted-versus-all totals with exclusion causes, compareRuns working across disclosure arms) and T-13's install-detection split (absent versus not-reachable, the absent-is-not-unknown principle, every consumer updated so a void measurement cannot read clean)
- Dispatched to the Bun engineer, background, tree clean and to itself; diff before commit; the smoke is stamped not-a-measurement by design
- T-13 leaves the Unblocked backlog into active work on this dispatch

## Event 145 — crossed messages reconciled, and the asymmetry stated honestly until the build erases it

- Timestamp: 2026-08-24 12:10 PDT, measured
- The subset builder's final report reconciled a crossing: its third report had already delivered both owed items into the feature commit before my two-items-owed message landed — the tier-study chip at every layer (shared amber deliberately: the reader's question is binary, may-I-quote-this-or-not, and two colours would invite a milder-versus-worse reading the classes do not have), and both docs subsections with unchanged ToCs
- Its self-verification caught the day's best defect-that-never-shipped: the disclosure docs could not honestly claim compareRuns enforcement because measure-disclosure writes no envelope — the exact gap the owner's envelope question had just surfaced independently, found a third time by a third route. Rather than ship the false claim or stay silent, the builder wrote the asymmetry: the disclosure subset stamp is a statement, not a guard
- That +2 paragraph committed at plugin-kit c78e6b3 as the honest current state, and its supersession handed to the envelope builder mid-flight as part of that deliverable — when the envelope lands, the paragraph flips to stating the enforcement that then holds. The envelope builder also received the corrected tree position and the sibling's independent envelope-writer map
- The subset thread is fully closed; the envelope build is the only work in flight

## Event 146 — the next-sweep question repaired twice, then answered: the separating run launches, and a research track opens

- Timestamp: 2026-08-24 12:51 PDT, measured
- The re-presented next-sweep ask failed on vocabulary a second time — the owner named three confusing phrases ("the sonnet pickup check", "misses sit right on it", the "pasted-text twin") and the options as unclear. Diagnosis: compressed metaphor is jargon too — everyday words used as terms of art bury the premise as effectively as identifiers. Repaired by answering the three questions in prose and re-asking with mechanisms spelled out; the repaired call was answered immediately. Second vocabulary capture dispatched to the sidecar, escalating the existing Mode-1 edge case
- Owner's answer, two directives in one: "open to option one" — the separating run — plus a research track on why weaker models route progressive disclosure worse and what the community (Anthropic, Google Gemini, OpenAI, Addy Osmani and peers) favors as remedies, extended mid-flight by a third dimension: how the community DETECTS tier-dependent failures (cross-model eval matrices, canaries, routing observability, model-upgrade regression gates)
- The separating run launched at 12:47: a copy of the current tree carrying the OLD 998-char description byte-exact (sha 0aefd25e verified against the preserved measurement bytes), sonnet, the 54-row candidate set, 3 runs per query, no early stop, envelope on — every parameter mirroring the morning sweep so the description text is the only variable. Detached; results to the separating directory
- The research dispatched to the analyst, background, delivering a Brain ANALYSIS note in the plugin-kit project (counter verified before writing, expected ANALYSIS-006), grounded in the reference research's tier findings and the day's measured facts, with the primary-text-only evidence rule and all three known write-path defects in the brief
- In flight now: the separating sweep, the research, the envelope build, and the jargon capture

## Event 147 — the envelope lands at 1719, and an escalation is held for the owner

- Timestamp: 2026-08-24 12:58 PDT, measured
- The envelope-plus-T-13 build verified (suite 1,719 from 1,688, zero failures; the one-of-six intermittent red re-observed and again uncaptured — the pre-existing flake candidate strengthens) and committed at plugin-kit 3819d55, pushed. measure-disclosure now writes the envelope by reusing the shared builder with optimizer-only caps gated per operation; slice-versus-full and tier-versus-record deltas are mechanically refused for disclosure; the counted-versus-all cap names both denominators and every exclusion cause, closing the interrupted-pair improvement candidate. T-13 done beyond its brief: the not-reachable state distinguishes a blind sweep from a non-applicable one, blindness downgrades absent and installed but never shadowed, and measure-outcomes gained the conflict check it never had. The follow-up round superseded the asymmetry paragraph with the enforcement that now holds — noting the asymmetry inverted: disclosure is now the stricter sweep on the tier class, since triggering records a nullable model
- Held for the owner, NOT acted on — the builder's escalation: the install-state sweep is structurally blind to the plugin cache directory where marketplace installs actually live (five copies of this very skill sit there), so every historical install_state absent was an unearned claim; the runs were very likely fine anyway because the isolation flag fences plugin skills out of eval children, but the envelope never records that isolation. Builder recommends recording the isolation in the envelope over widening the sweep (which would wrongly void the corpus). Decision queued behind the separating-sweep decision, one at a time
- The research agent gained two owner-named sources mid-flight (Vercel — already prior art via the invocation measurement — and TanStack, with stated-negative discipline if nothing is published), and the owner confirmed the deliverable is a Brain ANALYSIS note by a brain analyst, which the brief already mandated
- The jargon capture (metaphor is vocabulary too) verified and committed at e737c20

## Event 148 — the separating sweep answers: the edit cost ten rows, and the model costs nine

- Timestamp: 2026-08-24 12:58 PDT, measured
- The separating run landed clean: the OLD 998-char description (sha-verified bytes) on sonnet, full 54-row set, 3 runs per query — 26 of 39 should-fire phrases load the skill against the shipped wording's 20 of 39, negatives silent 15 of 15 on both
- TEN of the nineteen morning misses RECOVER under the old wording on the same model. The diagnosis's mostly-model-bound headline is overturned in part: the description edit carried roughly ten rows of sonnet recall, spread far beyond the single register clause the per-word diff had flagged (recovered rows span reply-reading, costs, axes, default-signal and register clusters). Which individual clause carried which row remains open; the whole-edit effect is proven at full n
- What remains missing under EITHER wording on sonnet, nine rows: both ask-or-decide phrasings, the evidence-skim, one comparability phrasing, the sanity-check and read-three-times register rows, the recommending-monolith cost row, the dialog-never-appears row, and review-a-draft-by-path — the last confirmed as a genuine missing-words gap (fails on both wordings; its pasted-text twin fires 3 of 3)
- Comparability note: the opus record (49/52) was measured on the OLD description, so restoring that wording also restores strict comparability with the record; the shipped 1,002-char wording has no opus measurement of its own
- Disposition to the owner next; nothing edited

## Event 149 — the description direction set, execution gated on the research

- Timestamp: 2026-08-24 13:00 PDT, measured
- Owner on the separating result, verbatim: "I think option one makes sense, but I don't want to do it until we get the results of our research back. Which should give us something to think about." Direction: restore the proven old description text and add the review-my-draft wording. Gate: the weak-model routing research report, whose findings may shape the final text before anything ships. No edit until then; the description stays frozen at the shipped bytes
- Pending stack after this: the tooling escalation (next), then nothing until the research or the gated description work returns

## Event 150 — the escalation reframed by the owner: guarantee isolation, do not just record it

- Timestamp: 2026-08-24 13:05 PDT, measured
- The record-the-isolation ask drew two owner challenges that each sharpened the problem. First: "shouldn't it always be isolated?" — answered from source: it already is, the flag and empty temp cwd are hardwired at all three spawn sites through one wrapper. Second, the reframe that superseded the options entirely: "what really should happen is we should look into what changes have to be made to ensure that it is always actually isolated and that there will never be contamination"
- The honest channel inventory behind that answer: cross-session agent messaging is open and was observed live this morning (the eval worker's fixture escalation); the child's visible surface is believed from one probe on one build, not proven per run; and the machine-state backup check is blind to the plugin cache. Recording a flag fixes none of those
- Dispatched isolation-guarantee-build (Bun engineer, background): phase 1 a channel-by-channel audit with evidence (skills, settings, MCP, env, network, grader, cross-session messaging), phase 2 hardening in value order — a per-run isolation PROOF asserting the child's world is exactly the skill under test plus built-ins, landing in the envelope so verified isolation supersedes requested isolation; severing or namespacing the cross-session channel if a clean mechanism exists, named upstream ask if not; the install-state sweep kept as belt with the cache root added only if history's meaning survives
- The builder's original record-the-flag recommendation is superseded by this stronger form, with the disposition recorded rather than silently dropped

## Event 151 — the research lands as ANALYSIS-006, and the description gate can open

- Timestamp: 2026-08-24 13:07 PDT, measured
- The weak-model routing research delivered and verified: ANALYSIS-006 in the plugin-kit project, 15 evidence-labeled findings, committed and pushed at plugin-kit b49a383 with inverse edges closed on ANALYSIS-004, ANALYSIS-005 and the plugin-kit session ledger (the last added by this session, as the agent correctly declined to race an active ledger)
- The write-path status-drop reproduced again exactly as briefed (metadata does not prevent it; repair-after-read-back is the only path), and the primary-text rule caught a second fabricated-summary instance — a search summary attributed a headline figure and a claim to a paper whose full text contains neither and argues the opposite; the fabrication was confirmation-shaped, which is the dangerous kind
- The findings most load-bearing for the gated description decision: remedy benefit is capability-graded (power A/Bs on the weak tier; a strong-tier null is the predicted result, not a refutation — this re-frames how the ToC and placement results should be quoted); a strong-model rewrite can make a weak model route WORSE, measured — which validates reverting a rewrite the weak tier measured as harmful; three sources converge that there is no portable weak-model phrasing rule, only the measure-on-the-weak-tier method this house already practises; the two-surface split (concise text routes, detail governs) is the vendor articulation of our frontmatter-versus-body mechanism; and consolidation-over-proliferation names description overlap as the confusion mechanism, with embedding-similarity over sibling descriptions as a detectable form — a future validator candidate
- Also stated as scoped negatives: Addy Osmani publishes nothing on model tiers (his convergent idea is the two-surface split in other words), and skills have no forced-invocation analogue — ANALYSIS-004's central mechanism gap recurring at the triggering surface
- The description work's gate condition is met; the go/no-go goes to the owner with the research's bearing attached

## Event 152 — the gate opens both ways: the ship-gate sweep launches, and the standards integration begins

- Timestamp: 2026-08-24 13:17 PDT, measured
- Owner ruled in two parts. Option one proceeds: the combined description — the measured old text plus the review-my-draft clause — built from the preserved 998-char bytes (insertion at the deliverable clause, 1,021 chars, one line, sha 30126307, roundtrip verified) and launched on the full 54-row set on sonnet at the same parameters as both prior sweeps; the result returns to the owner before anything ships
- And the larger directive, verbatim core: the analysis "should become part of our skill standards that we very clearly define so that our ability to evaluate and identify problems is very strong and accurate as well as our ability to create skills first or second try... ideally just first shot." The identification findings become evaluation criteria; the remedy findings become authoring doctrine
- The integration dispatched to the modernization agent, which holds the reference-file registers and the evidence-label discipline: the two-surface split and no-portable-phrasing-rule into description-writing; capability-graded reading of nulls and the cross-tier detection doctrine into both optimization guides; compositional load into progressive-disclosure as external-measured consistent-with; sibling-overlap and installed-set-size evaluation items into the authoring checklist; the skill-creator body only on a token-neutral hook. Fenced: principles inlined with external sources named, never Brain-entity citations; labels survive integration; validator rules held as named candidates, not built
- In flight: the ship-gate sweep, the standards integration, and the isolation audit

## Event 153 — the research doubles, and a two-note misattribution goes to correction

- Timestamp: 2026-08-24 13:20 PDT, measured
- ANALYSIS-006 expanded to 24 findings with the detection section and the two named sources, committed and pushed at plugin-kit d4f2610. The named-source sweep delivered beyond expectation: Vercel measured the MOST forceful pointer phrasing as the worst performer (converging with our 0/20 imperative null and the compositional-load account); Vercel's headline result is tier-blind (no model named anywhere — the most-cited external figure in our guidance has unknown tier-sensitivity, now recorded); and TanStack independently generalizes Vercel's remedy into a distributable task-to-file map in passive context — two unconnected teams converging on the same mechanism, the survey's strongest non-measured signal, alongside TanStack's scoped negative on measurement
- The sharpest new instrument, Finding 19: a scenario whose answer the model already holds from training cannot detect a routing failure — it passes either way. The should-fire trigger set has never been audited for this, and the outcome corpus's ablation data provides the audit free (a scenario flat under stripping is prior-answerable). Queued as an audit before the 20-of-39 figure is quoted further
- The research also caught a misattribution that survived two notes: the Vercel invocation figure cited as measured support for the numbered-workflow rule was actually host-prompt forced invocation OUTSIDE the skill (published as 56 percent never-invoked and 95-plus; our 44 was a computed complement). Rule 1 loses its only measured support — the THIRD of six proposed rules to fall on evidence contact — and the correction is authorized and routed: the researcher writes ANALYSIS-005's dated correction at its three sites; the modernize agent corrects body-structure.md's two sites inside its integration pass with an import fence on the figure. The verify-inherited-citations lesson rides the reports for the retrospective
- Also confirmed again in passing: write_note status-drop (repaired), and insert_before_section as the safe growth primitive with append reserved for Relations — both now multiply corroborated
- In flight: the ship-gate sweep, the standards integration (now with the correction and the 24-finding re-read), the ANALYSIS-005 correction, and the isolation audit

## Event 154 — the ship gate holds: the review clause fails on all three counts

- Timestamp: 2026-08-24 13:24 PDT, measured
- The combined-description sweep landed clean and the gate's pre-committed read is FAIL for the addition: combined 24 of 39 positives against the plain restore's 26, a new false fire on the assumptions-and-open-risks-log negative (0.67, plausibly drawn by the draft-to-check-over vocabulary), and the target row itself — check-this-call-over-by-path — still at zero. The clause bought nothing and cost twice
- The target row's persistence under its own purpose-built hook strengthens the diagnosis's file-reference hypothesis (the model opens the named file and starts editing, so no trigger is ever counted) and the training-prior lens now on record; its remedy is not description vocabulary
- The plain restore stands fully measured and clean: 26 of 39, 15 of 15 silent, strictly comparable with the opus record it was measured under. Disposition to the owner: ship the restore alone, iterate the review clause on subsets, or hold
- Per-row movements between old-alone and combined arms (five lost, three gained at n=3 per row) are within run noise and are not individually quoted

## Event 155 — 0.1.5 ships: the description returns to its measured form

- Timestamp: 2026-08-24 13:27 PDT, measured
- Owner chose at the ship gate, verbatim "Ship the plain restore (Recommended)". Executed at 5e6948d, pushed, cache refreshed 0.1.4 to 0.1.5: the 998-char description (sha 0aefd25e) is the shipped bytes again — 26 of 39 on sonnet, 15 of 15 silent, strictly comparable with the 49-of-52 opus record measured on the same text. make checks and the frontmatter test pass; the description freeze re-binds to sha 0aefd25e
- The trigger-description saga closes with a clean causal story: the post-record rewrite cost the weak tier ten phrases (measured by the separating run), the restore recovers them, and the one purpose-built addition failed its own gate three ways — so the day ends with the description exactly where the evidence says it should be, and every step of the path measured rather than argued
- Still open on the board, now as a mechanism-level item rather than a wording one: the review-a-draft-by-path phrase (the model plausibly opens the named file and works, never triggering — the file-reference hypothesis, testable by stripping paths), alongside the training-prior audit of the should-fire set before further quoting
- In flight: the standards integration (with corrections), the ANALYSIS-005 dated correction, and the isolation audit

## Event 156 — the standards integration lands, and the lineage loses its last measured rule

- Timestamp: 2026-08-24 13:29 PDT, measured
- Both deliveries verified against artifacts and landed at plugin-kit 3ca48a1 and 853237f, pushed. The integration: identification findings as evaluation criteria (sibling-overlap, routing-tier measurement, the no-inert-scenario item from the training-prior test, deliberate installed-set sizing with the tools-to-skills transfer fence), remedy findings as doctrine (two-surface split, method-not-phrasings with three converging sources, capability-graded null reading in both loops, compositional load as consistent-with beside the null it explains) — fence-grep zero, ToCs verified, checklist counts mechanically checked, skill-creator body untouched at 4,990. Four validator automations recorded as candidates for the owner, none built: the embedding-overlap detector, the inert-scenario audit over existing ablation output, the installed-set reporter, and the cross-tier diff column
- The ANALYSIS-005 correction ran to NINE sites, not the three my grep found — the researcher swept the downstream framing claims and observations the citations fed. The sharpened honest claim now stated at every site: after the withdrawal, none of the four surviving structural rules carries a positive measured result. Rule 1's verdict is SURVIVES, EVIDENCE WITHDRAWN — kept distinct from refutation because nothing tested the shape; its citation measured a different mechanism. New discipline written into the note: a citation inherited from a sibling note counts as unverified until opened in primary text here
- body-structure.md's twin sites were corrected by the modernize agent AFTER its report was sent — a report-lags-artifact instance caught because the tree was checked rather than the report trusted; the diff matched the instruction exactly and landed in the integration commit
- Tooling: the phantom-tally defect now observed at 3x as well as 2x — the multiplier is not stable, only the read-back is; joins the bug-report dossier
- The placement lesson from the integration report rides for the retrospective: integrating a research note is a placement problem, and the position carries the argument
- In flight: the isolation audit alone

## Event 157 — the second-pass report reconciles: all of it was already in the commit

- Timestamp: 2026-08-24 13:30 PDT, measured
- The modernize agent's final report crossed with the commits; the tree is clean and 853237f already carries everything it describes, including three second-pass integrations Event 156 did not name: the Vercel/TanStack passive-context convergence into progressive-disclosure (placed as the built version of the missing declarative mechanism, honestly bounded — not a lever a skill author holds), the forceful-phrasing counterexample into the method-not-phrasings section, and the suite-hardening controls beside the training-prior twin. Its re-read also corrected the dispatch brief's premise a fifth time today: it had been working from the 24-finding note all along, confirmed byte-for-byte
- The withdrawal-needs-a-destination lesson rides for the retrospective: deleting the misattributed figure would have been the smaller and worse edit — because the convergence gave the sound measurement a correct home, the correction says "this belongs there" rather than "this was wrong", which is more honest and harder to accidentally undo
- Every Vercel citation across the file set audited to its home; the withdrawn figure survives only inside its own withdrawal paragraph, on the same never-re-derive reasoning as the struck-rule historicizing clauses
- The board: the isolation audit is the sole thread in flight; then the mechanism-level items and the retrospective

## Event 158 — owner catches the stale companion ledger; both notes now current per state change

- Timestamp: 2026-08-24 13:38 PDT, measured
- Owner correction: keep BOTH plugins' session notes completely current. The drift was real — this ledger ran turn by turn while nine plugin-kit commits (f88fb50 through 853237f) accumulated unrecorded in plugin-kit's own session note, closed since morning. Repaired at plugin-kit d616581: three consolidated per-thread events (the doctrine-propagation sweep, subset-plus-envelope, the research-correction-integration arc), each pointing here for the full narrative, plus the State paragraph rewritten through 853237f with the candidates list updated for what the afternoon closed and opened
- Standing rule from here: a state change landing in plugin-kit gets its event in plugin-kit's note in the same boundary as this ledger's, with this ledger holding the narrative and the companion holding the repository-local record — the same one-source-plus-pointers shape the two notes already used this morning
- Capture dispatched to the sidecar: the dual-ledger rule as the cross-project extension of the sync-per-batch discipline

## Event 159 — the vitest watch-item: tree swept clean, and the runner constraint made explicit

- Timestamp: 2026-08-24 14:22 PDT, measured
- Owner thought a delegated agent might be using vitest. Sweep result: clean everywhere — no vitest process, no vitest import or dependency in either repo, the isolation agent's in-flight test file already on bun:test with test() throughout, and the whole 1,719-test suite running under bun test. Also verified while checking: the isolation build is RUNNING, not stuck — its own probe session appeared in the peer list one second before the check, live evidence it is mid-audit on the cross-session channel
- The real gap the watch-item exposed: no dispatch brief had ever STATED the runner — the standard held only because agents inferred it from surrounding code. Closed both ways: the running agent got the constraint explicitly (no reply needed unless it changes something), and every future brief states it, the same brief-carries-what-context-cannot principle as inline status enums
- Standing caution renewed: if the isoprobed peer session messages this conversation, it is the audit's own probe demonstrating the open channel — recorded, never answered
- Capture dispatched to the sidecar, with the auto-memory-naming fence stated in the brief this time

## Event 160 — the last thread lands: isolation proven per run, and the audit's second channel

- Timestamp: 2026-08-24 14:38 PDT, measured
- The isolation build delivered, verified (suite 1,800 from 1,719 at zero failures, captured; tsc clean; the flags, envelope field and proof module confirmed in the tree) and landed at plugin-kit 10622f0 with its ledger event at 3e8db8b — both ledgers current per the standing rule
- The owner's guarantee reframe is vindicated twice over: the audit found a SECOND open channel beyond the observed one — every eval child and grader ever spawned had the operator's private auto-memory inlined into its system prompt, unfenced by any existing flag. Both channels now closed (the dedicated env var post-merge; messaging tools denied — the probe corrected the mechanism, children bind their own inboxes so env scrubbing severs nothing), and every run now PROVES its surface from the init event at zero extra spawns, with run.isolation a required comparability key
- Honest implication for this project's numbers: every A/B today carried the auto-memory confound in both arms equally, so all deltas stand — the separating result, the boundary null, the outcomes gap; absolute levels carried a constant contaminant now removed, folding into the standing re-baseline note for the next sweep of record
- Residuals on the board, named not hidden: inbound cross-session reachability (upstream ask specified), graders unprovable under text output, env and network open by design
- The board is CLEAR of running work. Remaining: the mechanism-level items, the four validator candidates, and the retrospective over Events 1-160 plus the thirty sidecar findings — the queued protocol step whenever the owner calls it

## Event 161 — the vitest sighting root-caused: persona noise, and the hazard it leaves

- Timestamp: 2026-08-24 14:39 PDT, measured
- The isolation agent's confirmation closes the watch-item with the probable source found: the bun-ts-engineer persona's stock operating instructions mandate bunx vitest run in their completion gate, and the persona's bundled audit script prints failure marks for the ABSENCE of vitest and biome config — so "vitest" plausibly scrolled as audit noise in an agent pane without any runner being used. Verified airtight in the tree: zero vitest hits across the working diff and all repo source, package.json and lockfile untouched, bun:test imports with 54 test() and zero it(), five full-suite runs all under bun test
- The agent resolved the persona-versus-repo conflict correctly and silently (the codebase in front of it beat the generic default, and both its subagents were briefed on the runner explicitly), flagging it afterwards — the disclosed-deviation shape the reporting rule exists for
- The standing hazard it names, now on the board: anyone running the persona's audit script against these repos will see vitest-absence findings that read as defects, and "fixing" them into existence is the one path by which vitest could actually arrive. Candidate, owner's call: amend the bun-ts-engineer agent definition (a user-level config file, out of this session's scope to touch unprompted) so its completion gate and audit defer to the repository's own runner where one is established
- With this, every watch-item of the day is closed or on the board as a named candidate; the retrospective remains the sole queued step

## Event 162 — readable editions commissioned for the three research notes

- Timestamp: 2026-08-24 15:54 PDT, measured
- Owner directive: create new versions of plugin-kit's ANALYSIS-004, 005 and 006 alongside the originals — more readable, understandable, concise, without confusing jargon, losing none of the content, depth or information; consistent words, vocabulary and layouts for humans and agents alike. Identity resolved by one ask, owner chose: readable versions as NEW SIBLINGS (ANALYSIS-007, 008, 009 — counters verified free), originals byte-identical including titles, existing links unmoved
- Owner process requirements honoured before dispatch: every provided style reference read IN FULL (wording.md whole this turn; layout.md and the skill body whole earlier today; both mattpocock skills whole plus their pointer targets SKILL-MECHANICS.md and the CONTEXT.md glossary), and the unknowns looked up rather than assumed — ASD-STE100 verified against current primary sources (Issue 9, 2025-01-15: writing rules in 9 sections with 53 rules, plus the controlled dictionary this house deliberately declines)
- Three technical-writer agents dispatched in parallel, one per note, each brief carrying: the full-read mandate on source and references, the distilled style doctrine (one word per concept with a CONTEXT.md-pattern Language section, STE sentence rules, parallel groups, front-loading, co-location, positive phrasing), the preservation contract (every finding, figure, evidence label, dated correction, limit and recommendation survives — readability from rewording and layout, never omission), the sibling identity with pairs_with edges and the no-inverse-on-originals exception commented, all four measured write-path defects, and a section-by-section PARITY GATE against the original before reporting
- The A5 brief additionally binds the three dated corrections as record; the A6 brief names the passive-context explanation that confused the owner today as a required plain-language fix

## Event 163 — the readable-editions batch completes: three siblings, three parity walks, three catches

- Timestamp: 2026-08-24 16:08 PDT, measured
- All three readable editions landed in plugin-kit (de57467, b22bbf5, 5c27f27, its ledger event at f9ce4ce) — ANALYSIS-007, 008, 009 beside their untouched notes of record, each opening with a Language glossary, each holding one uniform shape for repeating content, each passing a mechanical parity gate over findings, quotes, figures, entities, labels and dated corrections
- The parity gates paid beyond style, once per writer: 008's walk found a FOURTH dated correction the commissioning brief did not know about plus two unswept contradiction sites still inside ANALYSIS-005 (routed to the researcher, in flight); 007's writer caught and restored a sentence its own first draft dropped; 009's writer separated capability-graded from model-dependent — a distinction the original leaves implicit and null-reading depends on
- All four measured write-path defects fired across the batch exactly as briefed and were handled by read-back every time: the masked-write timeout twice, the status drop three of three, phantom tallies at 2x and one uncategorized-note artifact from ToC bullets colliding with the observation parser (fixed by numbering the ToC — a new parser edge case for the bug dossier)
- Convention enforcement: the five-tag cap applied consistently (the third writer's six-tag set trimmed to match its siblings before commit), the no-inverse-on-originals exception commented in every sibling, symmetric relates_to edges closed on the plugin-kit session note
- Open from the batch: the two ANALYSIS-005 residue corrections with the researcher; then the board returns to the mechanism items and the retrospective

## Event 164 — the batch closes clean: eleven correction sites, zero bare stale hits

- Timestamp: 2026-08-24 16:10 PDT, measured
- The two paraphrase residues corrected in ANALYSIS-005 and verified independently (the corrected wordings present, the old denominator gone, single frontmatter), landed at plugin-kit 7d90437. The note of record and its readable sibling now agree everywhere; the correction's running total is eleven sites, and the extended sweep returns zero stale hits outside dated-correction prose
- Two lessons ride for the retrospective: a correction sweep needs patterns for the corrected proposition's PARAPHRASES, not just its original wording — or a parity walk, which is what caught both; and the phantom-tally multiplier is now observed at 2x and 3x across three instances in one correction thread, so the tally is never usable as a check — only the read-back is
- The readable-editions thread is fully closed. The board: the mechanism items, the validator candidates, the upstream asks, and the retrospective over Events 1-164 with the thirty sidecar findings — on the owner's call

## Event 165 — round two commissioned: research first, complete briefs, all three writers

- Timestamp: 2026-08-24 16:15 PDT, measured
- Owner pushed for a second pass on the three readable editions — "I think you can do better" — with full structural latitude (names, filenames, sections, structure all free; the ANALYSIS-00N title prefix, the frontmatter fields, and the Observations-then-Relations tail fixed; titles and headers plain enough that the name alone says what the note is), a research mandate (writing UX, concision, examples), and mid-flight a second research dimension: what makes documents easier for AGENTS to read, not only humans
- Process correction honoured: the first two round-2 briefs went out before the agent-readability research existed; owner had both writers cancelled, the research finished, and all three re-dispatched with complete briefs — the same incomplete-premise-in-a-brief failure the day has been correcting all along, this time caught before any work was spent
- The research, primary sources: plain English keeps all substance and precision while stripping what makes reading hard, and experts read it faster and prefer it (GOV.UK); readers scan F-pattern so the inverted pyramid applies at every level (NN/g); the worked-example effect — concrete beside abstract measurably improves understanding; Diátaxis separates lookup from explanation. The agent layer: just-in-time retrieval via lightweight identifiers makes stable greppable anchors the navigation surface (Anthropic engineering); the house-verified first-5,000-tokens compaction rule makes the inverted pyramid agent-optimal; chunked offset reads demand self-contained sections; one-word-one-concept is what makes a note searchable, since a synonym hides content from grep; uniform shapes parse predictably; curated canonical examples beat laundry lists
- All three writers re-dispatched with the complete two-layer briefs, default plain titles offered (do reference files get read; the fourteen shapes of skill content; why weaker models miss skills), parity gates against the CURRENT notes of record (ANALYSIS-005 at eleven corrected sites), round-1 notes and originals untouched — deletion and graph-edge repair stay with the orchestrator after verification

## Event 166 — round two lands whole: three plain-titled rebuilds replace round one

- Timestamp: 2026-08-24 16:34 PDT, measured
- All three round-2 notes landed in plugin-kit (947e80d, 441bb5f, be4e0ce, its ledger event at a26811c), round-1 siblings deleted into git history, session-note edges repointed, the three originals byte-identical throughout. The titles now say what the notes are: Do Reference Files Get Read, and How to Tell · The Fourteen Genres of Skill Content · Why Weaker Models Miss Skills, and What Helps
- What round two bought, beyond round one: conclusions-first leads sized to the compaction-surviving head; recommendations above the method; worked examples co-located with the claims they make visible (the denominator arithmetic, the two-tier asymmetry tables, both pointer shapes verbatim, fourteen genre specimens verified against their corpora, the routing map rendered as it sits in a real file); glossaries demoted to lookup position; uniform greppable shapes with machine-scannable label lines; prohibitions rephrased positive; and measured readability where claimed
- The batch corrected its own commissioners three more times: the 008 title kept Genres over my Shapes default because Genre N is the citation key (the synonym rule applied against its own brief); the 009 title declined to promise a fix its own findings refute; and 008's re-check needed two rounds of its own detection medicine before its census was honest, ending in the lesson that a detector answers the question its signature encodes, never the question the reader assumed. One cross-project repair made at landing by this session: the ToC change was measurement-bracketed, so the reference set offers replication, not a first measurement
- The readable-editions thread closes for the second and final time. The board: mechanism items, validator candidates, upstream asks, and the retrospective over Events 1-166 with the thirty sidecar findings — on the owner's call

## Event 167 — round three: the cross-note standard designed, then dispatched

- Timestamp: 2026-08-24 16:49 PDT, measured
- Owner commissioned a standardization pass over the three rebuilt notes: identify which sections become standard, their order, per-section templates, the ToC-versus-arrangement-section question, and further alignments — analysis first, then consistent briefs. Numbers 007-009 keep; filenames and contents fully rewritable
- The analysis, grounded in the H2 inventories: the three notes converged on one heading (the results lead) and diverged on everything else — three names each for navigation, glossary, method and open questions, recommendations in two positions, one glossary third and another last, and 008's specimen headings leaking into its own H2 namespace
- The standard, designed on the recognizability test (the name a human and an agent have seen most), the compaction-head and F-pattern rules, and the house-locked ToC precedent: orientation line, Summary, Recommendations, Table of Contents (numbered, no links, glossed, with the agent anchor lines), How to read the findings (the legend: five-marker shape, one Labels token grammar, conditional-marker rule), the body with examples at first point of need and never a gallery, Method, conditional Corrections with a Summary pointer, Open questions, Glossary, Observations, Relations. The ToC-versus-arranged answer: both, each doing the half it wins — the universal heading for navigation, a compact bespoke legend at point of use
- Cross-note alignments beyond sections: one label-token grammar (spaces not hyphens, middle-dot separators, vocabulary defined once), fenced specimens keeping quoted headings out of the note's namespace, one tag policy, identical orientation and footer wording, titles and permalinks held stable from round two so edges survive
- All three writers dispatched with briefs sharing the standard block verbatim plus per-note deltas (007: five renames, the Evidence-line split, the tag swap; 008: the corrections slot move, the nav dissolution, the fence-namespace fix; 009: mostly renames since its round-2 conventions became the law, plus the gallery dissolution into first-point-of-need). Rewrites land on the same titles via overwrite so identity and edges hold

## Event 168 — round three closes: one section architecture across all three notes

- Timestamp: 2026-08-24 17:04 PDT, measured
- All three round-3 rewrites landed in place on unchanged permalinks (plugin-kit 46ca466, ab09a4b plus 3ee561e, 9503995, its ledger event at 9f62da4) — the three notes now share the twelve-slot architecture, one label-token grammar, glossed numbered ToCs, uniform marker shapes with the conditional-marker rule working (Limits absent informatively), and measured sentence statistics inside the 15-20 band on every note
- Each pass earned beyond structure: 007 discovered the fence-blind link parsing and its ruling (fidelity over tidiness, artifact documented, Relations authoritative); 008 found the fragment-anchor SELF-edge variant, fixed the predicted specimen heading collision, and caught a dropped figure by its own token diff; 009 restored a round-2 compression loss its dissolution exposed and disclosed the single reconstructed character in its routing-map fence. The receipt-unreliability rule is now total: every edit-receipt counter was wrong at least once across the batch, both directions, both counters — read-back is the only truth
- The three originals byte-identical through all three rounds. The standardization thread closes; the twelve-slot standard, its templates and the two artifact variants are all recorded here and in the notes themselves for whatever future standard-writing the owner wants
- The board: mechanism items, validator candidates, upstream asks, and the retrospective over Events 1-168 with the thirty sidecar findings — on the owner's call

## Event 169 — 009 verifies clean, and the counter dossier gains its final two entries

- Timestamp: 2026-08-24 17:06 PDT, measured
- The 009 phantom-edge check came back clean with zero changes needed: no link syntax anywhere including fences, authored edges 2, and the third resolved edge correctly diagnosed as the INBOUND session-note edge this session added at the round-1 cleanup — which build_context renders indistinguishably from a self-edge, a near-false-positive the writer caught by checking direction before hunting for minting text. No artifact sentence was added, because documenting a phantom that does not exist would itself be a false claim
- Two further counter behaviours join the Brain bug dossier: build_context's total_relations counts BOTH directions (an inbound edge naming the note reads like a self-edge), and its total_observations aggregates across the returned context rather than the primary note (119 reported for a note holding 49). The three-round verdict across every server-side counter exercised: edit-receipt observation tallies (correct, doubled, tripled, absent), edit-receipt relation tallies (1 and 3 alternately), build_context both counters — only a read-back of the file is truth
- The standardization thread is confirmed fully closed with no residue; nothing changed on disk this round

## Observations

### Build decisions

- [decision] Full waves 1-6 sequence approved, with the skill artifact fresh-authored rather than ported from the prior fork #scope #fresh-authoring
- [decision] Measurement infrastructure carries over from the prior WIP; the skill body, all 8 reference files and the description are re-authored #carryover #measurement
- [decision] The retired plugin is neither a content source nor a measurement baseline arm — the no-skill arm is the comparison, and the plugin is deleted in wave 6 #baseline #retirement
- [decision] Composition lint rules inherited from the prior fork are quarantined pending re-derivation from the fresh doctrine, because grading a fresh skill against the retired skill's rubric is circular #lint #circularity
- [decision] `wait-what` from mattpocock-skills merges into the new plugin, placed per plugin-kit standards #merge #layout

### Session operating rules

- [decision] The 15-delegation orchestration ceiling and its 75 and 90 percent thresholds are lifted for this session, and per-agent token figures are expected scale rather than limits; trimming coverage to stay inside a stated number is forbidden, and an overrun is reported rather than avoided #orchestration #budget
- [constraint] Probe the harness before editing prose — three scoring or configuration faults on the previous build each produced a number that read as a description defect #harness #false-signal
- [constraint] No Brain note write this session can be trusted without a verifying read: two independent write-path defects both returned success while writing something wrong, so every write is followed by a read-back before its result is reported #brain-mcp #verify-after-write

### Prior-fork defects the fresh author must fix

- [problem] References were never pulled on the prior fork — pullRate 0 across all 8 against a 4,657-token body #progressive-disclosure #defect
- [problem] The prior fork's skill arm lost to the no-skill baseline on recognises-mistake 3.97 vs 4.19 and honest-recommendation 3.90 vs 4.21, and produced 4 recommend.multiple lint errors against a baseline of 0 #judge #regression
- [problem] The prior description filled 1022 of the 1024 available characters, leaving no headroom #description #defect

### Brain MCP and tooling state

- [risk] `bootstrap_context` on the plugin-kit project timed out at 30s this session; context was recovered via `search` instead #brain-mcp #tooling
- [risk] Two Brain MCP write-path defects surfaced this session: `write_note` silently drops a `status` passed via `metadata`, and `create_project` writes a malformed bare-string config entry that kills the server on next start. Both report success while writing something wrong #brain-mcp #write-path
- [fact] plugin-kit has no `skills/skill-creator/scripts/` directory and no `run-loop.ts` anywhere, so any brief citing that path is wrong about the path; its skill-creator is not documentation-only, though — ten harness scripts were verified present on disk under `shared/operations/`, `shared/validate/`, `shared/report/` and `shared/tools/`, grouped by function because none of it enters context #harness #tooling

### Cross-project graph state

- [fact] This build follows the plugin-kit shared-layer restructure work; the two prior-art notes it rests on — the 2026-08-09 session ledger and the skill-creator merge-conflict ADR — live in the separate `plugin-kit` Brain project and are referenced here as plain text only #prior-art #cross-project
- [risk] The prior-art link to the skill-creator merge-conflict ADR carries no graph edge in either direction: outbound was dropped as un-resolvable across projects, and the inverse was never added because writing to a `decision`-type note invokes the mandatory blocking ADR review gate, which is disproportionate to one edge #graph-debt #adr-gate

## Relations
- relates_to [[ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin]]
- leads_to [[ANALYSIS-002: Evidence Rules From Measured Failures]]
- leads_to [[ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill]]
- leads_to [[ANALYSIS-005: Monospace Decision Dialog Layout Rules]]
- leads_to [[ANALYSIS-004: AskUserQuestion Tool Capability Audit at Build 2.1.241]]
- leads_to [[ANALYSIS-006: Surface Portability of the Ask User Question Skill's Claims]]

<!-- The two-relation minimum is met as of the evidence-rules analysis landing in this project. The two prior-art notes this session rests on live in the plugin-kit project and cannot be wikilinked across projects; they are named as plain text in the Prior art header line, in Event 11, and in the Observations above. -->
- leads_to [[ANALYSIS-007: Reference Ablation Ground Truth]]
- leads_to [[SKILL-001: Orchestrator Process Learnings]]
