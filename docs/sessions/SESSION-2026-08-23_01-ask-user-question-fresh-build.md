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
**State**: Wave 1 dispatched (repo creation, environment dedup plus copy inventory, tooling verification, authoring standards brief, this session note). Five decisions locked; four measured defects recorded as the fresh author's fix list. Ledger migrated into this project at Event 11.
**Prior art**: this build follows the shared-layer restructure work carried out in the separate `plugin-kit` Brain project. Two notes there are load-bearing context and are named as plain text rather than wikilinks, because Brain wikilinks cannot resolve across projects: SESSION-2026-08-09_01 "Plugin Kit Shared Layer Restructure", and ADR-001 "Skill Creator Merge Conflict Resolutions".

## Tasks

Canonical task registry for this session. T-NN is the stable session-note ID; editor IDs are mirrors.

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

<!-- One relation short of the two-note minimum: this project holds only two notes, so the analysis above is the sole valid target. The two prior-art notes this session rests on live in the plugin-kit project and cannot be wikilinked across projects; they are named as plain text in the Prior art header line, in Event 11, and in the Observations above. -->
