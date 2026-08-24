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

## Preferences (MED confidence)

- [MED] When an operator habitually misuses a generic knob against a standing ruling, the remedy is removing the knob and giving deliberate uses a purpose-named escape hatch — not a louder warning. Warnings were measured ineffective against habit in this session: a code warning sat on the flag and the flag was passed again anyway, against an explicit prior ruling. A generic knob invites the habitual reach; a purpose-named one forces the operator to state intent before the knob is reachable at all.
  - Source: the `--num-workers` corrections and the subsequent `--model` / `--permission-mode` removal (commit d01cdd9), same session.

## Edge Cases (MED confidence)

- none yet

## Notes for Review (LOW confidence)

- none yet

## Observations

- [constraint] Durable feedback memories have exactly one writer — the skillbook agent at retrospective synthesis; inline capture produces a sidecar note and a session-Event pointer and nothing else #reflect-protocol #memory-governance
- [decision] Dispatch briefs to delegated agents carry the auto-memory prohibition explicitly, because the rule is invisible from a subagent's context #delegation #dispatch-briefs
- [insight] A warning attached to a generic knob did not change operator behaviour; removing the knob and naming a purpose-built escape hatch did #affordance-design #measured
- [technique] Reflect capture is two artifacts and never one — the confidence-bucketed sidecar plus the dated Event pointer that makes the sidecar findable from the session ledger #capture-mechanics #traceability

## Relations
- caused_by [[SESSION-2026-08-23_01: Ask User Question Fresh Build]]
- relates_to [[ANALYSIS-002: Evidence Rules From Measured Failures]]
