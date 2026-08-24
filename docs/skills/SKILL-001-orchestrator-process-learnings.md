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

- [HIGH] A teammate's report is only real when it goes through SendMessage. Plain text written at the end of a turn is invisible to the team, and this holds regardless of any automatic final return — that return is not the report and does not substitute for the send and reads as an agent idling with finished work, so the report is lost exactly when it carries the most that cannot be recovered from the artifacts: the verification evidence, the defect reports, and any disclosed deviation from the brief. Finished artifacts on disk do not substitute — they show what landed, never what was checked, what broke, or what was done outside scope.
  - Source: this agent's own failure delivering the reflect-capture report, plus the toc-writer's identical failure earlier the same day; third-person observed (team-lead, 2026-08-24).

- [HIGH] Nothing is posted to external public repositories — Anthropic's GitHub included — regardless of queue history. A finding being drafted, queued, or previously approved for posting is not standing authorization; upstream findings are drafted local-only and stay local unless the owner explicitly orders a post.
  - Source: "I don't want to post anything to Anthropics GitHub" (user, 2026-08-24, overriding the earlier queued comment on the claude-code issue).

- [HIGH] An AskUserQuestion call carries its whole decision context inside the call — the question text and the option descriptions — and never in chat prose above it, because the person answering sees only the dialog. Before sending any AskUserQuestion, re-read it as a cold reader who sees ONLY the call text: if any option, or any item the question refers to, is not decidable from that text alone, the call is not ready and the missing context moves into the question or the option descriptions. The rule already existed twice here — as the first Gotcha in this project's own skill (context placed before the call is invisible) and as the handoff brief's instruction to include all context in a question — and this project's own orchestrator still violated it in live use, composing a D-8 coverage-gap question whose gap definitions sat in a prose table above the dialog. A rule that survives being written twice and is still broken by its own author has to be flat and mechanical, not advisory.
  - Source: "I don't have any context for what those 11 coverage gaps are … should be in the context on the question." (user, 2026-08-24).

- [HIGH] When this project's own sessions compose an AskUserQuestion, the orchestrator formally loads this project's ask-user-question skill and composes the call by its rules — question text, labels, option descriptions, layout — rather than improvising, and specifically never as one large block of question text. The skill's own description excludes the case where a wider job merely pauses to ask, but the owner overrode that exclusion for this project's own session questions: live use here is also a test surface for the artifact being built, so a call composed outside the skill's rules by the skill's own project is both a UX failure and a missed dogfooding observation. Loading is not following — after loading, the composed call is checked against the skill's pre-flight before it is sent.
  - Source: "Please use the ask user question skill we're creating to not just add the context needed for each question but format it correctly per the skill not just one big block of text for the question text" (user, 2026-08-24).

## Preferences (MED confidence)

- [MED] When an operator habitually misuses a generic knob against a standing ruling, the remedy is removing the knob and giving deliberate uses a purpose-named escape hatch — not a louder warning. Warnings were measured ineffective against habit in this session: a code warning sat on the flag and the flag was passed again anyway, against an explicit prior ruling. A generic knob invites the habitual reach; a purpose-named one forces the operator to state intent before the knob is reachable at all.
  - Source: the `--num-workers` corrections and the subsequent `--model` / `--permission-mode` removal (commit d01cdd9), same session.

- [MED] When a task hands you a detection signature from an analysis note, run the finished detector back over the corpus the note counted. It turns a plausible implementation into a checkable claim, and today it confirmed two counts and refuted a third.
  - Source: the genre-detector run finding the plugin-kit project's structural-genres analysis (its ANALYSIS-005 — not this project's, whose ANALYSIS-005 is the monospace layout note) at a Genre 1 repo count at 3 of 5 against a recorded 5 of 5, 2026-08-24.

- [MED] A detection signature that cannot be implemented as written — such as same-sentence matching over tokens containing sentence terminators — gets the nearest unit that cannot mis-split, stated at the call site with the direction the error runs.
  - Source: the line-unit decision in the manifest-form detector, same report.

- [MED] A stated count and the examples supporting it come out of the same command. A count written separately from its example list drifts, and prose that names three while asserting five reads plausibly enough to survive two reviews.
  - Source: the structural-genres note's Genre 1 count, corrected 2026-08-24.

- [MED] A reported error is a sample, not the population. When one defect of a class is reported, sweep the class before closing; the sweep found two more count errors in adjacent lines that the report did not name.
  - Source: the same correction pass, which grew from one fix to three.

- [MED] A gap inventory authored before a revision pass is not evidence of a gap — it is a snapshot of the artifact as it stood. Before implementing from any inventory, re-verify every entry against the artifact as of now; the re-verification costs a few greps and can change the task's size class. The instance: the coverage note's eleven-gap inventory (authored 2026-08-23) drove a locked fold decision, and re-verification found ten of the eleven already closed by body revisions that landed after the inventory — the fold shrank from eleven edits to one judgment call, and each of the ten would otherwise have been a duplicate edit against content that already said the same thing.
  - Source: the d8-fold-draft verification table, ten of eleven already-covered with file-and-line evidence, 2026-08-24.

- [MED] A to-do item that looks overtaken by events may instead be gated on an end condition only the owner knows. The instance: the uninstall-plugin-kit item read as obsolete because the whole measurement workflow now depends on plugin-kit, and the orchestrator recommended retiring it; the owner corrected the premise — the install was always scoped-temporary for the ask-user-question work, and current dependence is evidence of active use, not permanence. Recommendation premises come from owner intent, not from current-state inference; the fix is writing the gate on the task row so no future session re-litigates the item.
  - Source: "we should keep this - we only installed it temporarily so that we could use it with ask-user-question plugin - once we're done using it with the ask-user-question plugin we still need to do this to-do item." (user, 2026-08-24), rejecting the Recommended retire-it option.

- [MED] When the definition governing a dispatched agent is proven stale mid-run, stop the run and re-dispatch on the corrected definition — do not let it finish with a plan to filter its output at triage. The instance: a skill review was dispatched, the reviewer agent's definition was then proven to embed struck doctrine, and the orchestrator's plan was to let the run finish and filter the stale findings out at triage; the owner corrected that plan — a run governed by a definition already known to be stale should not keep running. Filtering is strictly weaker than re-dispatching, because stale criteria shape severity and attention across the whole review rather than only the rules they flag, so a filter removes the named misses and leaves the distortion; and the stale run's own cost exceeds the re-dispatch's.
  - Source: "If the reviewer agents are really stale it probably doesn't make sense to have the stale skill reviewer agent running right now" (user, 2026-08-24); the run was stopped mid-flight and re-dispatched on the corrected definition.

## Edge Cases (MED confidence)

- [MED] `write_note` silently drops the `status` frontmatter field even when `metadata` is populated on the call — three of three occurrences today, so reproducible rather than flake and ticket-worthy against the brain tooling. Until it is fixed, every write is followed by a read-back and a `find_replace` repair with `expected_replacements: 1`; the note is otherwise indexed and queryable, which is why the drop is easy to miss.
  - Source: three repairs across two projects, 2026-08-24.

- [MED] The report-through-SendMessage miss has a second cause beyond forgetting: an agent can explicitly reason that its automatic final return suffices and that a closing send would be redundant. That is a wrong inference about the channel rather than a lapse, which is why the rule needs its flat form — the report is only real through the tool, and the automatic return is not a substitute — rather than a reminder form.
  - Source: the genre-writer's self-diagnosis, third instance, 2026-08-24.

- [MED] A question composed by the skill's own rules can still fail the cold-reader test on vocabulary rather than on layout. Every layout rule passed, yet the call assumed the project's measurement jargon — corpus row, expects_references, recall signal — as shared ground, and the reader answered that they did not understand what was being asked. So the cold-reader re-read has to check the NOUNS as hard as it checks the facts: a premise carried in a term the reader does not own is as buried as one left in chat prose above the dialog. The wording rule already says to take the reader's nouns from the conversation, and the reader here is the project owner, not the measurement tooling. The fix was restating the same decision in plain words — a test-scenario tag that says which file should be read — rather than adding more context around the jargon.
  - Source: "I didn't understand what you were asking me" (user, 2026-08-24), on a call that passed the full pre-flight; diagnosed as Mode 1 via the skill's own failed-question reference.

## Notes for Review (LOW confidence)

- none yet

## Observations

### Governance constraints

- [constraint] Durable feedback memories have exactly one writer — the skillbook agent at retrospective synthesis; inline capture produces a sidecar note and a session-Event pointer and nothing else #reflect-protocol #memory-governance
- [decision] Dispatch briefs to delegated agents carry the auto-memory prohibition explicitly, because the rule is invisible from a subagent's context #delegation #dispatch-briefs
- [constraint] A teammate's final report is real only when sent through the messaging tool — plain text at end of turn is invisible to the team, and what is lost is exactly what a disk listing cannot show: what was checked, what broke, and what was done outside scope #delegation #reporting
- [problem] The brain write path silently drops the frontmatter status field even with metadata populated, three of three occurrences on 2026-08-24, while leaving the note indexed and queryable — which is why every write is followed by a read-back and a targeted repair #brain-tooling #write-path
- [constraint] Nothing is posted to external public repositories regardless of queue history — prior approval expires, and drafts for upstream stay local unless the owner explicitly orders a post #external-posting #consent
- [constraint] An AskUserQuestion call carries its whole decision context inside the call — question text and option descriptions — never in chat prose above the dialog; re-read every call as a cold reader who sees only the call text, and if any option or referenced item is not decidable from it, the call is not ready #ask-user-question #context-in-call
- [constraint] AskUserQuestion calls in this project's own sessions are composed by formally loading this project's ask-user-question skill and following its rules for question text, labels, option descriptions and layout — never improvised, never one large block of question text — because live use here is also the test surface for the artifact being built #ask-user-question #dogfooding #skill-invocation
- [insight] The report-through-the-tool rule needs its flat form because the miss has a second cause: an agent can explicitly reason that its automatic final return suffices — a wrong channel inference a reminder would never catch #delegation #reporting
- [insight] A question can pass every layout rule and still fail the cold-reader test on vocabulary — jargon owned by the project's tooling rather than by the reader buries a premise as effectively as leaving it in chat prose, so the re-read checks the nouns as hard as the facts and the fix is restating the decision in plain words rather than adding context around the jargon #ask-user-question #vocabulary #mode-1
- [insight] A to-do item that looks overtaken by events may instead be gated on an end condition only the owner knows — current dependence on the very thing a task would remove is evidence of active use, not of permanence, so a recommendation's premise comes from owner intent rather than current-state inference, and the fix is writing the gate onto the task row so no future session re-litigates the item #owner-intent #task-gating #recommendations

### Verification techniques

- [technique] A detection signature handed from an analysis note gets its finished detector run back over the corpus the note counted, turning a plausible implementation into a checkable claim — confirming two counts and refuting a third in one run #verification #detectors
- [technique] A signature that cannot be implemented as written gets the nearest unit that cannot mis-split, stated at the call site with the direction the error runs #detectors #honest-error
- [technique] A stated count and the examples supporting it come out of the same command; written separately they drift, and a sentence naming three while asserting five reads plausibly enough to survive two reviews #counting #drift
- [technique] A reported error is a sample, not the population — sweep the class before closing, which here turned one count fix into three #verification #class-sweep
- [technique] A gap inventory authored before a revision pass is a snapshot of the artifact as it stood, not evidence of a gap — re-verify every entry against the artifact as of now before implementing from it, which here found ten of the eleven gaps already closed and shrank the task from eleven edits to one judgment call #verification #stale-inventory
- [technique] A dispatched agent whose governing definition is proven stale mid-run is stopped and re-dispatched on the corrected definition, never left to finish so its output can be filtered at triage — stale criteria shape severity and attention across the whole run, so a filter removes the named misses and leaves the distortion, and the stale run costs more than the re-dispatch #delegation #stale-definition #verification

### Affordance and capture mechanics

- [insight] A warning attached to a generic knob did not change operator behaviour; removing the knob and naming a purpose-built escape hatch did #affordance-design #measured
- [technique] Reflect capture is two artifacts and never one — the confidence-bucketed sidecar plus the dated Event pointer that makes the sidecar findable from the session ledger #capture-mechanics #traceability

## Relations
- caused_by [[SESSION-2026-08-23_01: Ask User Question Fresh Build]]
- relates_to [[ANALYSIS-002: Evidence Rules From Measured Failures]]
