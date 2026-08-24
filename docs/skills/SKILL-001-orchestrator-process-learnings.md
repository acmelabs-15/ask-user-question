---
title: "SKILL-001: Orchestrator Process Learnings"
type: skill
status: IN_PROGRESS
permalink: skills/skill-001-orchestrator-process-learnings
tags:
- reflection
- process
- orchestration
- memory-governance
---

# SKILL-001: Orchestrator Process Learnings

**Last Updated**: 2026-08-24
**Sessions Analyzed**: 1

Inline reflect capture for the active session note SESSION-2026-08-23_01: Ask User Question Fresh Build, named here as plain text because the pointer back to this note lives in that session's ledger as an Event plus a typed relation. Findings are bucketed by confidence and stay here until end-of-session retrospective synthesis promotes them.

## Constraints (HIGH confidence)

- [HIGH] Do not create auto-memories directly. Every learning flows through the reflect protocol chain instead: inline reflect capture (a skill-sidecar note plus a session-Event pointer), then end-of-session retrospective synthesis, then the skillbook agent as the ONLY writer of durable feedback memories. Delegated agents must be told the same in their dispatch briefs — a subagent one level deep cannot see this rule from the orchestrator's context, and a memory it writes directly bypasses the chain entirely, so the synthesis step never sees the finding and never gets to reject, merge or sharpen it.
  - Source: "Don't create auto memories instead use the Reflection protocol make sure that your delegated agents know this as well" (user, 2026-08-24).

- [HIGH] A teammate's report is only real when it goes through SendMessage. Plain text written at the end of a turn is invisible to the team and reads as an agent idling with finished work, so the report is lost exactly when it carries the most that cannot be recovered from the artifacts: the verification evidence, the defect reports, and any disclosed deviation from the brief. Finished artifacts on disk do not substitute — they show what landed, never what was checked, what broke, or what was done outside scope.
  - Source: this agent's own failure delivering the reflect-capture report, plus the toc-writer's identical failure earlier the same day; third-person observed (team-lead, 2026-08-24).

## Preferences (MED confidence)

- [MED] When an operator habitually misuses a generic knob against a standing ruling, the remedy is removing the knob and giving deliberate uses a purpose-named escape hatch — not a louder warning. Warnings were measured ineffective against habit in this session: a code warning sat on the flag and the flag was passed again anyway, against an explicit prior ruling. A generic knob invites the habitual reach; a purpose-named one forces the operator to state intent before the knob is reachable at all.
  - Source: the `--num-workers` corrections and the subsequent `--model` / `--permission-mode` removal (commit d01cdd9), same session.

## Edge Cases (MED confidence)

- [MED] `write_note` silently drops the `status` frontmatter field even when `metadata` is populated on the call — three of three occurrences today, so reproducible rather than flake and ticket-worthy against the brain tooling. Until it is fixed, every write is followed by a read-back and a `find_replace` repair with `expected_replacements: 1`; the note is otherwise indexed and queryable, which is why the drop is easy to miss.
  - Source: three repairs across two projects, 2026-08-24.

## Notes for Review (LOW confidence)

- none yet

## Observations

- [constraint] Durable feedback memories have exactly one writer — the skillbook agent at retrospective synthesis; inline capture produces a sidecar note and a session-Event pointer and nothing else #reflect-protocol #memory-governance
- [decision] Dispatch briefs to delegated agents carry the auto-memory prohibition explicitly, because the rule is invisible from a subagent's context #delegation #dispatch-briefs
- [insight] A warning attached to a generic knob did not change operator behaviour; removing the knob and naming a purpose-built escape hatch did #affordance-design #measured
- [technique] Reflect capture is two artifacts and never one — the confidence-bucketed sidecar plus the dated Event pointer that makes the sidecar findable from the session ledger #capture-mechanics #traceability

- [constraint] A teammate's final report is real only when sent through the messaging tool — plain text at end of turn is invisible to the team, and what is lost is exactly what a disk listing cannot show: what was checked, what broke, and what was done outside scope #delegation #reporting
- [problem] The brain write path silently drops the frontmatter status field even with metadata populated, three of three occurrences on 2026-08-24, while leaving the note indexed and queryable — which is why every write is followed by a read-back and a targeted repair #brain-tooling #write-path

## Relations
- caused_by [[SESSION-2026-08-23_01: Ask User Question Fresh Build]]
- relates_to [[ANALYSIS-002: Evidence Rules From Measured Failures]]
