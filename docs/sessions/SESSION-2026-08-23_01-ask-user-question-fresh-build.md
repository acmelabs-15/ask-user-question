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
