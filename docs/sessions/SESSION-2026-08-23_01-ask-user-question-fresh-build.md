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
**State**: Skill authored and measured. Description at 1002 characters scoring 49/52, recall 95.5%, false triggers 6.7%. Disclosure measured: all three references at 0 pulls of 24, verdicted `prune`, on a run where `Read` was available and spent elsewhere. Seven decisions locked. The local composition runner is retired in favour of plugin-kit's outcome measurement, which is scoped but not yet wired. A coverage check against the retired skill found 11 real gaps, 7 strong, three of which are wrong guidance rather than silence; which to close is the open decision. Cleanup and retirement of the old plugin have not started.
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
| T-08 | Wave 6 | Retire `asking-users-questions` and sweep its stray copies | — | external | M | Event 03 |
| T-09 | Wave 6 | Uninstall plugin-kit and hand-remove its marketplace entry | — | user config | S | Event 22 |

#### Blocked

| T-ID | Group | Subject | Agent | Files | Effort | Blocked by | Created |
|:--|:--|:--|:--|:--|:--|:--|:--|
| T-10 | Wave 4 | Close the coverage gaps the user selects | — | `skills/ask-user-question/**` | M | D-8 undecided | Event 34 |
| T-11 | Wave 4 | Spend the held 18 characters on the review-a-draft hook | — | `SKILL.md` frontmatter | XS | sequenced after T-10, which may need description coverage | Event 29 |
| T-12 | Wave 5 | Run the outcome measurement | — | `evals/` | L | T-06, T-07 | Event 31 |
| T-13 | — | Fix plugin-kit's install detection so it distinguishes "no competing copy" from "not reachable" | — | plugin-kit `shared/envelope.ts` | M | out of repo; needs its own task | Event 30 |

### Archive (completed + deleted)

<details>
<summary>5 archived tasks</summary>

| T-ID | Status | Group | Subject | Agent | Files | Effort | Created | Resolved |
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
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

- **D-8, open**: which of the 11 coverage gaps to close. Seven are body-shaped and total roughly 300-340 tokens against about 600 spare, so they fit together. Three of them are wrong guidance rather than silence and are therefore not optional in the same way as the rest: the ask-or-decide test has lost its reversibility tiebreaker, the meta-label ban is absent so `Yes` and `No` pass every rule, and the independence test positively licenses pairing a decision with a sequencing question. To be put to the user as grouped choices rather than eleven separate ones.


### Active (in_progress)

| T-ID | Group | Subject | Agent | Files | Effort | Created |
|:--|:--|:--|:--|:--|:--|:--|
| T-01 | Wave 1 | Create the `ACMElabs/ask-user-question` repo (absent at session start) | W1a-repo | `<repo root>/**` | S | Event 10 |
| T-02 | Wave 1 | Environment dedup plus copy inventory of the prior WIP | W1b-hygiene | prior WIP tree | S | Event 10 |
| T-03 | Wave 1 | Verify plugin-kit tooling runs (trigger runner, composition harness, judge, frontmatter tests, Makefile) | W1c-tooling | `<repo root>/Makefile`, harness scripts | S | Event 10 |
| T-04 | Wave 1 | Author the plugin-kit authoring standards brief for the fresh skill | W1d-standards | standards brief | M | Event 10 |

### Backlog (pending)

#### Unblocked — ready to pick up

_Empty. Waves 2-6 are approved in sequence but not yet decomposed into T-NN rows; decomposition happens as each wave opens._

| T-ID | Group | Subject | Agent | Files | Effort | Created |
|:--|:--|:--|:--|:--|:--|:--|

#### Blocked

_Empty._

| T-ID | Group | Subject | Agent | Files | Effort | Blocked by | Created |
|:--|:--|:--|:--|:--|:--|:--|:--|

### Archive (completed + deleted)

<details>
<summary>1 archived task</summary>

| T-ID | Status | Group | Subject | Agent | Files | Effort | Created | Resolved |
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
| T-05 | completed | Wave 1 | Create this IN_PROGRESS session note | memory | `sessions/` | XS | Event 01 | Event 10 |

</details>

### Editor mirror IDs

| T-ID | CC-ID | Cursor-ID | Last synced |
|:--|:--|:--|:--|
| T-01 | — | — | Event 10 |
| T-02 | — | — | Event 10 |
| T-03 | — | — | Event 10 |
| T-04 | — | — | Event 10 |
| T-05 | — | — | Event 10 |

### Pending User Decisions (surface on resume)

- None currently. Five decisions locked at Events 03-07.

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

<!-- The two-relation minimum is met as of the evidence-rules analysis landing in this project. The two prior-art notes this session rests on live in the plugin-kit project and cannot be wikilinked across projects; they are named as plain text in the Prior art header line, in Event 11, and in the Observations above. -->
