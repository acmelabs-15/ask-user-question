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

- [MED] A doctrine strike colonises output templates and severity schemes, not only the prose that teaches the struck rule. The sweep specified for the re-grounding found the text teaching the rule and missed a report-table column headed by the same rule, which leaves an agent that has stopped teaching the rule still enforcing it on every run it produces. A strike-driven edit therefore needs a second sweep over output templates, checklists and severity schemes, not only over the explanatory prose.
  - Source: the reviewer-modernization agent's report, 2026-08-24, verified against the diff.

- [MED] A struck rule can be bundled with a claim that survives it. One reviewer's block joined the struck pointer-form rule to a structurally sound schema-deferral finding, so deleting the block as a unit would have silently dropped a valid Major check along with the struck one. When re-grounding on a strike, read each sentence of the target block against the strike list individually rather than treating the block as the unit of deletion.
  - Source: the reviewer-modernization agent's report, 2026-08-24, verified against the diff.

- [MED] A measured behaviour finding lands in more than one document, and the scoped one is not always the load-bearing one. The headless caveat was briefed into a skill-local reference while the contradicting "Add these freely" advice lived in a shared reference read by all five creator skills, so the briefed edit left the contradiction standing exactly where most readers would meet it. A finding brief naming one file pairs with a grep for the same field across the shared pool before the edit is called complete.
  - Source: the same agent's scope-extension report, which found shared/references/portability.md contradicting the briefed edit, 2026-08-24.

- [MED] On an artifact with a hard token budget sitting at its ceiling, sequence the strictly-shortening edits BEFORE the ones that need room. The deletions fund the additions, so the new wording can be written for correctness and then checked, rather than written to a length.
  - Source: the skill-creator body re-grounding, where doing the pure deletion first turned 2 tokens of headroom into 18 and landed the file at 4,990 of 5,000 — the modernization agent's stated lesson, verified against the counts, 2026-08-24.

- [MED] When one session orchestrates work landing in two projects, BOTH projects' session notes stay current per state change — not only the orchestrating session's ledger. The instance: the ask-user-question ledger was updated turn by turn while nine plugin-kit commits accumulated unrecorded in plugin-kit's own session note, which had been closed that morning; the owner caught the drift. The repair shape that works is consolidated per-thread events in the companion note pointing at the orchestrating ledger for the full narrative — temporal honesty without duplicating the record — plus a State rewrite. The rule already existed for graph rollups, where the SPEC root and the PLAN are synced at every batch close; this extends it to companion SESSION notes across projects.
  - Source: "Make sure you're always keeping the session note completely up to date for each of the respective plugins, plugin kit and ask user question" (user, 2026-08-24), after nine plugin-kit commits landed unrecorded in that project's note.

- [MED] A dispatch brief states the test runner explicitly — "the suite runs under bun test with bun:test imports; test() not it(); no other runner" — rather than leaving the standard to convention. The instance: the owner thought they saw a delegated agent using vitest; the sweep found the tree clean — no vitest processes, imports, or dependencies, and the in-flight agent's new test file already on bun:test — but the check exposed that no brief had ever stated the runner, so the standard held only because agents inferred it from the surrounding code. A convention that holds by inference breaks silently the first time an agent's training prior prefers a different tool, and one sentence in the brief closes it. This is the same shape as the house practice of embedding the canonical status enum inline in status-transition briefs: a constraint an agent cannot see from its own context rides in the brief.
  - Source: owner watch-item "I think I saw one of your delegated agents maybe using VI test... It should just be doing bun test." (user, 2026-08-24); tree swept clean, the gap was the unstated constraint.

## Edge Cases (MED confidence)

- [MED] `write_note` silently drops the `status` frontmatter field even when `metadata` is populated on the call — three of three occurrences today, so reproducible rather than flake and ticket-worthy against the brain tooling. Until it is fixed, every write is followed by a read-back and a `find_replace` repair with `expected_replacements: 1`; the note is otherwise indexed and queryable, which is why the drop is easy to miss.
  - Source: three repairs across two projects, 2026-08-24.

- [MED] The report-through-SendMessage miss has a second cause beyond forgetting: an agent can explicitly reason that its automatic final return suffices and that a closing send would be redundant. That is a wrong inference about the channel rather than a lapse, which is why the rule needs its flat form — the report is only real through the tool, and the automatic return is not a substitute — rather than a reminder form.
  - Source: the genre-writer's self-diagnosis, third instance, 2026-08-24.

- [MED] A question composed by the skill's own rules can still fail the cold-reader test on vocabulary rather than on layout. Every layout rule passed, yet the call assumed the project's measurement jargon — corpus row, expects_references, recall signal — as shared ground, and the reader answered that they did not understand what was being asked. So the cold-reader re-read has to check the NOUNS as hard as it checks the facts: a premise carried in a term the reader does not own is as buried as one left in chat prose above the dialog. The wording rule already says to take the reader's nouns from the conversation, and the reader here is the project owner, not the measurement tooling. The fix was restating the same decision in plain words — a test-scenario tag that says which file should be read — rather than adding more context around the jargon.
  - Source: "I didn't understand what you were asking me" (user, 2026-08-24), on a call that passed the full pre-flight; diagnosed as Mode 1 via the skill's own failed-question reference.

- [MED] `git commit` with an explicit pathspec commits the WORKING-TREE state of the named paths, which silently re-adds a file over a staged index-only deletion (`git rm --cached`) — the commit reports success and the file stays tracked. The house commit-by-pathspec habit is for content edits; an untracking commit must be pathspec-free, with the staged state verified by `git status` first.
  - Source: the HANDOFF.md untracking, which needed two commits because the first — in pathspec form — silently dropped the deletion, 2026-08-24.

- [MED] A loaded skill is a snapshot taken at invocation time and CANNOT be refreshed in-session: re-invoking answers that it is already loaded above and the instructions are unchanged, without comparing bytes, so a session can hold a stale skill for its whole life while the tree moves underneath it. A version claim about a running session must distinguish the invocation-time snapshot from what a fresh read serves; in-context currency comes only from reading the changed files directly or restarting.
  - Source: "So you're telling me this conversation is using 0.1.4 right now" (user, 2026-08-24) — the claim was wrong, and the re-invocation attempt surfaced the dedupe.

- [MED] The vocabulary trap includes everyday words used as terms of art, not only technical identifiers. A re-asked question replaced tool jargon with compressed metaphor — "pickup check", "misses sit right on it", "hook", "pasted-text twin fires 3 of 3" — and failed the same reader the same way ("the wording here is actually very confusing... What do you mean by..."). The first instance taught checking nouns the reader does not own; this instance shows the check must also catch domain metaphors that LOOK like plain words. The repair that worked both times: answer the reader's specific questions in prose, then re-ask with the mechanism spelled out in full sentences — "whether Claude chooses to load the skill" not "pickup", "the description has no wording about reviewing a draft" not "no hook".
  - Source: "I feel like the wording here is actually very confusing. I'm having a hard time following it." (user, 2026-08-24), on the re-asked next-sweep question — second Mode-1 vocabulary failure in one session.

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
- [constraint] The vocabulary trap covers everyday words used as terms of art, not only technical identifiers — a re-asked question swapped tool jargon for compressed metaphor ("pickup check", "misses sit right on it", "hook") and failed the same reader the same way, so the cold-reader noun check must also catch domain metaphors that LOOK like plain words, and the repair that worked twice is answering the reader's specific questions in prose then re-asking with the mechanism spelled out in full sentences — "whether Claude chooses to load the skill" not "pickup" #ask-user-question #vocabulary #metaphor
- [constraint] When one session orchestrates work landing in two projects, both projects' session notes stay current per state change — not only the orchestrating session's ledger; nine plugin-kit commits accumulated unrecorded in that project's own already-closed note while the ask-user-question ledger was updated turn by turn, and the repair that works is consolidated per-thread events in the companion note pointing at the orchestrating ledger for the full narrative plus a State rewrite — the same discipline already applied to graph rollups, extended to companion SESSION notes across projects #session-notes #dual-ledger #cross-project

### Verification techniques

- [technique] A detection signature handed from an analysis note gets its finished detector run back over the corpus the note counted, turning a plausible implementation into a checkable claim — confirming two counts and refuting a third in one run #verification #detectors
- [technique] A signature that cannot be implemented as written gets the nearest unit that cannot mis-split, stated at the call site with the direction the error runs #detectors #honest-error
- [technique] A stated count and the examples supporting it come out of the same command; written separately they drift, and a sentence naming three while asserting five reads plausibly enough to survive two reviews #counting #drift
- [technique] A reported error is a sample, not the population — sweep the class before closing, which here turned one count fix into three #verification #class-sweep
- [technique] A gap inventory authored before a revision pass is a snapshot of the artifact as it stood, not evidence of a gap — re-verify every entry against the artifact as of now before implementing from it, which here found ten of the eleven gaps already closed and shrank the task from eleven edits to one judgment call #verification #stale-inventory
- [technique] A dispatched agent whose governing definition is proven stale mid-run is stopped and re-dispatched on the corrected definition, never left to finish so its output can be filtered at triage — stale criteria shape severity and attention across the whole run, so a filter removes the named misses and leaves the distortion, and the stale run costs more than the re-dispatch #delegation #stale-definition #verification
- [technique] A doctrine strike colonises output templates and severity schemes, not only the prose teaching the struck rule — the specified re-grounding sweep found the teaching text and missed a report-table column headed by the same rule, leaving the agent enforcing what it had stopped teaching, so a strike-driven edit gets a second sweep over templates, checklists and severity schemes #doctrine-strike #output-templates
- [technique] A struck rule can be bundled with a claim that survives it — one reviewer's block joined the struck pointer-form rule to a structurally sound schema-deferral finding, so deleting the block as a unit would have silently dropped a valid Major check; re-grounding reads each sentence of the target block against the strike list individually #doctrine-strike #sentence-level
- [insight] A measured behaviour finding lands in more than one document and the scoped one is not always the load-bearing one — the headless caveat was briefed into a skill-local reference while the contradicting advice sat in a shared reference read by all five creator skills, so a brief naming one file pairs with a grep for the same field across the shared pool before the edit is called complete #shared-references #class-sweep
- [problem] `git commit` with an explicit pathspec commits the working-tree state of the named paths, silently re-adding a file over a staged index-only deletion while reporting success — the house commit-by-pathspec habit is for content edits, so an untracking commit must be pathspec-free with the staged state verified first #git #pathspec-trap
- [constraint] A loaded skill is a snapshot taken at invocation time and cannot be refreshed in-session — re-invoking reports it already loaded and unchanged without comparing bytes, so a version claim about a running session must distinguish that snapshot from what a fresh read serves, and in-context currency comes only from reading the changed files directly or restarting #skill-snapshot #session-currency
- [technique] On an artifact sitting at its hard token ceiling, the strictly-shortening edits are sequenced before the ones needing room — the deletions fund the additions, so the new wording is written for correctness and then checked rather than written to a length, which here turned 2 tokens of headroom into 18 #token-budget #edit-order
- [technique] A dispatch brief states the test runner explicitly — the suite runs under bun test with bun:test imports, test() not it(), no other runner — rather than leaving the standard to convention; a sweep prompted by an owner watch-item found the tree clean but exposed that no brief had ever named the runner, so the standard held only by agents inferring it from surrounding code, which breaks silently the first time a training prior prefers a different tool — the same shape as embedding the canonical status enum inline in status-transition briefs #dispatch-briefs #test-runner

### Affordance and capture mechanics

- [insight] A warning attached to a generic knob did not change operator behaviour; removing the knob and naming a purpose-built escape hatch did #affordance-design #measured
- [technique] Reflect capture is two artifacts and never one — the confidence-bucketed sidecar plus the dated Event pointer that makes the sidecar findable from the session ledger #capture-mechanics #traceability

## Relations
- caused_by [[SESSION-2026-08-23_01: Ask User Question Fresh Build]]
- relates_to [[ANALYSIS-002: Evidence Rules From Measured Failures]]
