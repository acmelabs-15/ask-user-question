# Intent discovery — working memory

## Resume here

- Date: 2026-09-11.
- Workflow: Intent 0.4.0 scaffold. Run domain discovery, tree generator, then generate skills, in order.
- Current step: Step 3, complete replacement authorized. Peter rejects preserving any old skill structure, references, examples, or compatibility constraints. The old seven-file skill implementation is removed; generation uses the reviewed requirements and evidence.
- The small-library path was selected from the initial single-purpose scope. Revisit that choice if the interview expands the skill's responsibilities.
- The scope boundary is settled: this skill guides the question-and-reply cycle, its language, and its visual organization. Further answers identify unsupported gap filling, concealed disagreement, and useful deferred topics as required cases.
- Peter redirects the request for a failure example to research: he supplies desired outcomes, and the agent should research the communication model that makes those outcomes operational.
- domain_map.yaml and skill_spec.md contain one domain, one skill, fifteen failure modes, three host subsystems, four tensions, and three remaining verification gaps. The new layout is derived from those needs: one shared skill body and three host-contract references. Worked exchanges live with the rules they test, not in an inherited examples file.
- Persist new findings, answers, decisions, and open questions here as work proceeds. These are project working files, not changes to the agent's global memory.

The governing skill is:

```text
/Users/peterkloss/.npm/_npx/5834814a68760709/node_modules/@tanstack/intent/meta/domain-discovery/SKILL.md
```

Read it in full when resuming without its instructions in context. Read its Phase 3 reference before the deep read. Use its artifact schemas for the domain map and skill specification. Follow the current conversation and project instructions over historical session instructions. Keep questions open-ended during this interview and ask one at a time.

## Verified repository orientation

- The current plugin and skill version is 0.1.6.
- This is one repository, with no workspaces, packages directory, or lerna.json. The default skills root is skills/.
- The package manifest is private and development-only. It has no peerDependencies or peerDependenciesMeta.
- The plugin manifest supplies the repository and homepage: https://github.com/acmelabs-15/ask-user-question.
- The shipped artifact is skills/ask-user-question/SKILL.md, with examples.md and five references: wording, layout, failed-question, reading-answers, and asking-again.
- The current description includes composing questions, repairing failed questions, and interpreting replies. It explicitly excludes wider requirements interviews, host/SDK repair, dialog rendering, surveys, and general documentation about asking questions.
- The repository documents installation in Claude Code, Codex, and Gemini CLI. This is documentation of distribution, not verification that all hosts render questions identically.
- Evaluation and release tooling support the plugin. Their presence alone does not establish additional consumer-facing skill responsibilities.

## Reading completed for the initial scan

- Intent domain-discovery/SKILL.md, in full.
- Intent domain-discovery/references/artifacts.md, in full, before creating this working file.
- Repository package.json, README.md, plugin manifest, Gemini manifest, and Makefile.
- Current skill, examples, and all five reference files, in full.
- All nine Markdown documents under docs/, in full. A research agent read the session ledger's 1,592 lines; the main agent read the seven analyses and process note.
- All Markdown documents under evals/, plus CHANGELOG.md and .changeset/README.md, in full. A research agent completed this read and checked selected current harness paths against stale prose.
- The official skill-creator skill was loaded because the supplied AGENTS.md requires it for skill authoring. Intent controls the current sequence and review points.
- The user-supplied AGENTS.md instructions were read. No repository AGENTS.md, .cursorrules, or CONTEXT glossary was found in the scan.
- The external talk-plain output style was read in full after the first interview answer.

External reference supplied by Peter:

```text
/Users/peterkloss/.claude/output-styles/talk-plain.md
```

It requires one line of context first, then the answer or outcome, then only what the reader needs to act. It calls for short sentences, one idea per sentence, active voice, consistent project words, and structure suited to the content. It explicitly sends question layout to ask-user-question and requires loading that skill before composing a call.

## Historical evidence — limits to preserve

- Historical notes contain later corrections. The session header and task table do not reliably reflect the final event sequence.
- Initial zero reference-read results were invalidated by measurement defects. They are not evidence for deleting the references.
- Most of the old eleven-gap inventory was already resolved by later edits. Do not implement those gaps again from the old inventory.
- The examples file's claimed necessity for the measure-a-draft scenario was withdrawn on the later tested base. The corpus was updated to mark that scenario as needing no reference, with a model-tier caveat.
- A proposed draft-review description hook failed its recorded gate. The later release restored an earlier measured description. Use current files for present wording and version.
- Frozen eval history is evidence of earlier runs, not a current authoring input or a comparable baseline.
- Terminal rendering claims in the old analyses are tied to the audited Claude Code build. They are not verified claims about this session's question tool.
- The latest runtime tools and their schemas govern the calls available in this session.

## Interview 1 — desired collaboration

Question asked:

> Walk me through a real task where you want an agent to use this skill—from needing your input to acting on your reply.

Source: Peter's answer in this conversation, 2026-09-11. The following records his intent; it is not an approved implementation design.

- Peter wants the agent to use the skill throughout work they do together, especially on medium-sized and larger programming projects.
- The early portion of a project should be highly collaborative. He describes the first half, potentially through three quarters, as the period for reaching a shared understanding.
- The goal is that Peter and the agent understand the same work, why it matters, how it will be done, and their respective responsibilities.
- Once that shared understanding exists, the agent can work independently while Peter does something else, with a higher likelihood of success.
- The agent continually draws on three sources: Peter's intent, analysis of the local code, and external research.
- These activities form a repeating cycle. An answer may reveal another question, require code analysis or research, close a gap, or open a different branch of the project.
- The agent records findings, answers, and decisions continuously in Markdown memory files. A replacement agent must be able to read those files and resume after a crash or loss of conversation context.
- Long periods of solo work followed by a large batch of questions overwhelm Peter and defeat the collaboration goal.
- Ask one thoughtful question at a time. Explain the relevant context so Peter understands the small piece being decided.
- Both the question and its answers must use plain language and a layout that is easy to scan. Include the agent's view and recommendation.
- After each answer, record what was learned and then do the next useful action: analysis, research, or the next question.
- Even with this skill installed, Peter often supplies talk-plain.md again as shorthand for these communication expectations.

Key statements to preserve:

> "both you and the agent have a completely shared understanding of the work, why it needs to be done, how it's going to be done"

> "all that stuff needs to constantly be persisted into what I call like markdown memory files"

> "One question at a time"

## Interview 2 — the skill's responsibility

Question asked:

> What should this skill itself guide, and what should the project's other instructions guide?

The question recommended keeping question composition reusable across projects, with clear instructions for how it supports the wider collaboration cycle. Peter agreed and said that was the skill's intention.

Source: Peter's answer in this conversation, 2026-09-11.

### Flow

The skill teaches the agent to communicate its intent, ask a clear question, digest the reply, and choose the correct next action. Peter distinguishes three cases:

1. **The reply provides sufficient clarity.** Peter understands the question and supplies enough information. The agent can move forward: continue to the next branch, or do the analysis or research needed before its next question.
2. **Peter does not understand the question.** His reply therefore does not resolve it. The agent diagnoses the communication failure. It may supply missing context, rephrase the question, or split a question that combines multiple scopes into smaller questions asked in sequence. The repair depends on the failure.
3. **Peter understands, but the reply is insufficient.** The question reached him, but his answer does not supply what the agent needs. The agent recognizes the remaining gap and asks a follow-up to obtain it.

These are response cases, not an approved file or skill split. Peter explicitly leaves room for further cases he has not enumerated.

### Language

- Use vocabulary Peter knows in the project: its local terms and familiar terms from the relevant community, such as front-end engineering.
- Avoid unfamiliar jargon, excessive length, buried premises, and conflated ideas.
- Write concise, clear, focused thoughts.
- Apply this to communicating the agent's intent and to the question-and-reply cycle, not only to the final option labels.

### Visual organization

- Sequence the thoughts so the reader first receives the supporting context needed to understand the question.
- Transition into the specific, bounded subject of the question.
- Break up the text where useful. Suitable devices include headings, very short paragraphs, and lists of concise thoughts.
- Transition into well-crafted multiple-choice answers.
- A large paragraph is not a substitute for a readable sequence of thoughts. This is a requirement for clarity, not a direction to put every question into one fixed visual template.

### Scope decision

- The public skill owns effective communication within the small question-and-reply cycle: flow, language, and visual organization.
- It recognizes when the reply permits a return to code analysis, research, or the next branch. Owning those activities' execution or the project's whole lifecycle is not the stated scope.
- The larger project's collaboration plan and Markdown memory scheme remain surrounding workflow concerns. This discovery still records its own answers and decisions continuously, as requested in Interview 1.
- Broad use within a collaborative project does not mean the skill must take over that project's full workflow.
- The description's exclusion of wider interviews needs review for whether it wrongly prevents the intended use for a question inside such an interview. The wording change, if any, is not decided.

## Open questions

1. Reply completeness: Peter supplies three common failures below. Derive explicit checks from these requirements and research; do not ask him to repeat these examples.
2. Adoption: Why does Peter still need to supply talk-plain.md? Possible explanations include skill selection, instruction wording, or execution after loading. None has been established for current sessions.
3. Host scope: Which question tools or environments must the generated guidance cover? The current repository documents several installation targets, but that does not settle intended behavior on each.
4. Exclusions: Are any current capabilities experimental or unsuitable to include in generated guidance?

The project's overall readiness for autonomous work is contextual motivation, not a separate lifecycle this skill must implement. The half-to-three-quarters timing from Interview 1 is not an agreed automatic transition rule.

## Source check after Interview 2

- reading-answers.md:47-85 primarily distinguishes reply shapes and whether to proceed or repair an option set. It explicitly says that free text means the option set was rejected; that is narrower than all the purposes a free-text answer can serve in Peter's account.
- failed-question.md:104-118 addresses splitting a compound question. This directly supports one repair Peter names.
- asking-again.md:105-123 distinguishes a genuine follow-up from re-confirming an existing answer.
- The third response case warrants a focused completeness check during the deep read. These observations do not establish that the entire current skill lacks it.

## Interview 3 — research responsibility

The agent asked for a case where Peter understood a question but the agent incorrectly treated his answer as sufficient. Peter clarified that he is not a linguist or communication specialist. He expects research to identify a concrete, clear model for the flow, organization, and language he has described, so an agent can understand and follow it.

Source: Peter's reply in this conversation, 2026-09-11.

- Treat Peter's answers as requirements and evidence of his experience, not a request for him to construct an expert communication taxonomy.
- Research the technical model before asking further questions that the literature or code can answer.
- Retain questions for Peter's preferences and choices that evidence cannot settle.
- This is a requested change in the immediate sequence, not approval of a skill rewrite or a generated skill tree.
- Supporting research is now underway on conversation grounding and repair, plus plain language and visual organization.
- Distinguish research findings, authoritative design guidance, Peter's preferences, and proposed applications. A source about human dialogue or web forms does not directly prove an LLM skill's effectiveness.
- Preserve a source for each proposed rule and name uncertainties. Do not turn context-dependent guidance into invented universal numeric limits.

Research outputs are planned at research-conversation.md, research-language-layout.md, and a combined proposal in this artifacts directory. Source captures go in the ignored .firecrawl/ directory. The existing skill remains the implementation under review.

## Further answers — evidence, disagreement, and deferred topics

Source: Peter's next two messages during research, 2026-09-11. These answer the earlier request for common cases. The research continues with these requirements.

### Missing evidence

- The agent sees that an answer leaves uncertainty, fills the remainder with assumptions, and treats the result as permission to proceed.
- Peter's explicit requirement is: "agents never make any assumptions" and "Everything has to be based in evidence" from him, code analysis, or internet research.
- An answer may reveal that the gap is larger than the agent originally understood. The agent must recognize the expanded gap instead of forcing it into the initial question's scope.
- Stop work that depends on the unresolved information. Analyze what is missing and select the right way to resolve it: inspect evidence, research, or ask focused follow-up questions one at a time.
- Clear phrasing alone is not enough. The answer must supply the evidence needed for the next action. A confident or plausible completion invented by the agent is not a user answer.

### Conflicting information

- The agent may believe something Peter says is incorrect. It must not silently replace that statement with its own belief.
- Surface and challenge the disputed point. Make the evidence and the conflict clear so it can be discussed.
- A suspicion is not proof that Peter is wrong. Research or inspect the relevant evidence before presenting a contradiction as established.
- Keep preferences and intent separate from factual claims; a difference in preference is not a factual error to correct.

### Useful information outside the current question

- A reply can be long, include valuable information outside the current scope, and still leave the original question unanswered.
- Identify the useful material, preserve it for later, and communicate that it has been recorded and deferred.
- Return to the current unresolved question. Say which missing piece still matters rather than treating the long reply as a complete answer.
- A single reply can contain an answer, qualifications, a conflicting claim, and future topics. Handle its parts separately; do not assign the entire reply one category and discard the rest.
- Deferred topics need a recoverable record and a reason or condition for returning to them. The user requires preservation and follow-up; the exact record fields are a proposed implementation detail.

Source distinction for design: the evidence requirement and the obligation to surface a conflict come from Peter. Research can inform the detection and repair procedure; it must not be used to weaken these requirements.

Research is extended to uncertainty and human-AI correction. Its report will be research-evidence-conflicts.md. The combined proposal will include the evidence check and mixed-reply handling before the next action.

## Supplied workflow examples

Peter supplies three archived skills as concrete context for uses where ask-user-question matters. Inspect these as reference artifacts; do not install them or execute their workflows.

Archives, supplied 2026-09-11:

```text
/Users/peterkloss/Downloads/brain-main/skills/domain-modeling.zip
SHA-256: 2337db3eee2d50c206a0037fc204b7edc5653a9b1eef133d8907efce8a4f9d63

/Users/peterkloss/Downloads/brain-main/skills/idea-refine.zip
SHA-256: ec7564e8b1b2ad3a476450e54af191e0e6f24ba1d1492049f42c9132574a7302

/Users/peterkloss/Downloads/brain-main/skills/interview-me.zip
SHA-256: 89aa63551f8a2c8d5bf7f9152350ba8e9145db814945d1242bb20ce152bde513
```

Archive entries were inspected before extracting their named skill directories. macOS resource-fork metadata was excluded. Extraction is temporary, at /private/tmp/ask-user-question-context.w6SbT3; the archives and recorded hashes are the durable source identifiers.

Read the skill bodies and their bundled content fully. Record explicit skill invocation separately from a call to a question tool or a workflow that merely describes asking questions. Reports go in context-domain-modeling.md, context-idea-refine.md, and context-interview-me.md. Use these examples to check the proposal's boundary between caller-owned analysis/persistence and question-and-reply behavior.

All three initial archives are fully read: domain-modeling (4 content files, 176 lines), idea-refine (5 files, 677 lines), and interview-me (14 files, 2,167 lines, including archived eval records). The main agent also read all three skill bodies and the two interview mode references, and checked reported source conflicts.

- idea-refine and interview-me explicitly invoke brain:ask-user-question.
- domain-modeling provides directly relevant question scenarios, but its supplied content does not explicitly name the question skill.
- The caller owns its domain analysis, workflow completion, and persistence destinations. The question skill supports the exchange and reports what the reply settles or leaves open.
- Explicit source invocation is not proof that the namespaced target resolves to this repository's installed version or that a nested question succeeds at runtime.
- Caller examples and policies contain conflicts: batched example questions; deliberately provocative guesses; motive inferred from affirmative phrases; and conditional versus unconditional glossary recording. These are recorded for review, not silently copied or changed.

Peter then supplies /Users/peterkloss/Downloads/brain-main/skills/wait-what.zip as a frequently used repair trigger. He says it is sometimes very helpful but not always.

SHA-256: f06c8080fd14f4ed52de0bf9f56d7189ce63037a7b805792ef151dfc7e50c1dd.

Both content files are read fully (12 lines). context-wait-what.md records its scope and limits. It requests context, plain language, and project vocabulary; it does not specify a diagnostic repair procedure. Its apparent effectiveness remains Peter's report rather than a measured outcome. Do not claim the missing procedure proves the cause of any particular failed invocation.

## Confirmed hierarchy

Peter clarifies that wait-what represents a tiny part of this skill's lifecycle, and this skill is itself a small part of larger workflow lifecycles.

The relationship is: larger workflow -> question-and-reply cycle -> repair one unclear message. Repair is a nested behavior, not a competing top-level workflow. The question skill still owns flow, language, and visual organization for the exchange. The caller retains project direction, research orchestration, persistence destinations, and overall completion.

This confirms the conceptual boundary, not permission to edit the supplied caller archives or to merge the separate wait-what package. The domain map will propose one integrated ask-user-question skill with repair inside its cycle.

## Automatic use

Peter says he wishes he never had to explicitly point agents to this skill; he wants them to reach for it automatically. In the current ask-user-question work, record automatic use during relevant question-and-reply exchanges as a desired behavior, including exchanges inside larger workflows.

- Selecting the skill and following it correctly after selection are separate properties to evaluate.
- The current description excludes larger workflows that pause to ask, including requirements interviews. This is a verified wording mismatch with the desired usage, not proof of the cause of every observed failure to load.
- Supplied idea-refine and interview-me explicitly invoke brain:ask-user-question. Those calls do not prove automatic selection without the caller directive.
- The separate wait-what archive explicitly disables implicit invocation. Its manual repair trigger should not be confused with automatic use of the question-and-reply guidance or automatic recognition of confusion.
- Proposed trigger evaluation must include relevant questions arising during broader programming work without naming the skill, plus nearby tasks whose deliverable is different. Preserve the useful boundary against taking over the whole workflow.
- Verify selection from actual tool activity and then check the resulting exchange. A clear answer without a skill load and a skill load followed by a poor question are distinct outcomes.

The draft domain map now includes this requirement. The installed configuration and live trigger behavior have not yet been tested.

## Draft review boundary

- Read skill_spec.md for the human-readable draft and domain_map.yaml for the structured map. research-proposal.md supplies the operational detail; the research and archive reports carry evidence and limitations.
- The YAML parsed successfully with the yaml package bundled with Intent, under Bun. Duplicate keys, required failure-mode fields, domain links, skill uniqueness, priorities, gap references, and tension references were checked.
- Bun.YAML.parse parsed the file but did not reject a duplicate-key control case. It was not used to claim duplicate-key validation. The strict parser check then passed, without installing another dependency.
- GitHub coverage was checked live: issues are enabled, discussions are disabled, open issue count is zero, and a paginated all-state issue listing contains no non-PR issues. There are no issue threads to extract for this repository at this check.
- Automatic selection, rendered question behavior, and revised-skill efficacy are not yet evaluated. Historical caller trigger logs are not evidence for those properties.
- The initial draft review boundary is now passed for direction, as recorded below. Settle the remaining maintainer inputs before closing discovery and proceeding to tree generation. Live behavior is still unverified.

## Maintainer review and refinements

Peter says he is very happy with the work and supplies a Claude Code Fable review, reconciled with his own view. The direction is approved. The reviewer's claim of a large improvement is a qualitative assessment of the design, not a measured effect of a new skill.

Applied refinements:

- Add a failure mode for asking about a small, reversible implementation choice. Keep it separate from filling a missing requirement with an assumption. Both candidate implementations must preserve the agreed behavior and remain within authorization; state the choice and its reason.
- Add the ordinary coding-task fork to tasks. Named caller workflows are additional scenarios, not the only entry points.
- Add an explicit skip-or-silence consent failure mode.
- Add an original wrong/correct exchange to every failure mode. When asking is the failure, the correction is an action rather than another question. These are proposed examples, not observed test results or host-specific tool payloads.
- Keep automatic selection in gap 1 of the map, rather than duplicating it as a failure mode or task. Preserve the requirement and separate its measurement from performance after loading.
- Remove the approval gap and record Peter's approval here and in the specification.
- Name the composing library Brain; keep the skill name as the separate composition field. Namespace resolution remains unverified.

The review anticipates replacing the old evaluations. They still exist in this checkout; no deletion is performed in this map-refinement step. New evaluations should derive from the approved behavior and concrete examples rather than inherit old doctrine as their grading contract. The earlier study records retain their historical status.

Two maintainer questions remain, in order:

1. Which agent environments must the next version explicitly support? The agent will verify their actual contracts after Peter chooses the scope.
2. How should the recorded conflicts in the separate Brain callers be handled? Those archives remain reference inputs; this task has not edited them.

The host-scope question is next. Installation instructions currently name Claude Code, Codex, and Gemini CLI; that is discoverable context, not Peter's decision about the next version's support target.

## Host scope answered; waiting requirement

Peter chooses Claude Code, Codex, and Gemini and requests research into their actual question tools. Research focuses on Claude Code, Codex's available/native interfaces, and Gemini CLI; do not generalize CLI findings to every app carrying the same brand.

He reports two experiences, one with Codex and one with Claude Code: an agent displayed a response timer and closed the unanswered question after treating him as idle. The duration is uncertain, possibly around 30 seconds. No trace is supplied, so the cause is not established.

Requirement: agents must wait for the user. They must not impose response deadlines, infer idle status from elapsed time, close an unanswered question, or treat silence as permission to continue. A tool-polling interval is not a deadline for the user. If a host independently expires a request, preserve the unresolved decision, explain the limitation, and restore a usable way to answer; do not turn expiry into a choice.

Research must identify each tool's exact name, fields, supported answer modes, return shape, availability, and timeout ownership. Separate per-call controls from host/user settings and agent-created timers. The research does not authorize changing Peter's app settings or claiming that a skill can override an enforced host timeout.

Reports are host-claude-code.md, host-codex.md, and host-gemini.md. Their source/version evidence will inform conditional host references while the shared question-and-reply flow stays one skill.

## Host research result

Read host-contracts.md for the combined findings and the three host reports for details.

- Claude Code: installed 2.1.268. Current official docs expose AskUserQuestion with no per-call timeout. Questions wait indefinitely by default; user/managed auto-continue settings and an AFK environment override can expire them. Zero in that environment variable closes immediately. No effective user settings were inspected or changed.
- Codex: installed CLI 0.154.0, source pinned to 6b9826e3aa83b1a5947db50f4332cb9c65f1b340. The native synchronous handler sets isBlocking from Plan mode and sets the deprecated autoResolutionMs to none. The TUI instead uses isBlocking to apply a fixed 60-second grace plus 60-second countdown to non-blocking requests. The agent-facing schema has no timeout or isBlocking parameter. This proves a host mechanism, not the cause of Peter's specific incident.
- Codex async: request_user_input_async uses title plus optional string options, emits a question message, and returns accepted immediately. That is delivery, not an answer. No timer is installed in the inspected handler; all client display lifetimes are not verified.
- Gemini CLI: ask_user exposes explicit choice/text/yesno types and positional string answers; the current schema requires type despite a looser documentation claim. The inspected wait path installs no deadline but follows an upstream cancellation signal. The tool is excluded in headless and ACP modes. Main is pinned, with the stated stable-source comparisons; Peter's installed version was not checked.
- The source review uses the active schema and separates it from broader protocol types, documentation guidance, and rendered behavior. For example, a Codex array of answer strings can contain one selected label plus notes; it does not imply a multi-select control.

The main agent verified critical source passages for all three reports. No live question test was imposed on Peter, no host setting changed, and no unsupported timeout field added.

The map now has an explicit agent-imposed-deadline failure mode in addition to the no-consent-from-silence mode. It declares three conditional host instruction paths while retaining one core skill. The human choice of host scope is resolved; the corresponding gap now tracks live delayed-response/rendering verification instead.

Next maintainer question: how should the documented conflicts in the separate Brain caller skills be handled? Present the actual conflicts and the boundary of this repository; do not reopen the settled host scope or treat source research as successful interactive testing.

## wait-what repair — Brain skill alignment

Peter invokes wait-what because “Brain callers” is unclear. He correctly identifies the intended referent as the Brain skills he supplied, which use ask-user-question during larger development workflows. Use those names or “Brain skills” in discussion. This is another observed vocabulary failure in the current session, not a defect in Peter's answer.

The invoked skill at /Users/peterkloss/.agents/skills/wait-what/SKILL.md was read in full. The prior unclear question was quoted inside a do-not-follow block; it was treated as the text to repair, not an instruction to repeat.

Peter answers the underlying question: yes, review the Brain skills. Alignment, standardization, consistency, and a single shared understanding are critical. The earlier recommendation to leave their fixes as separate follow-up work was not accepted and must not be treated as a decision.

brain-skill-alignment.md now records the review. Existing decisions already resolve batching and dishonest recommendations. Review the remaining questions one at a time: confirmation after an interview, readiness criteria, and recording policy. Agree on the rules before treating a proposed edit plan as settled. The supplied source archives remain unchanged.

Do not ask again whether to review these skills. That decision is answered. The next substantive discussion concerns confirmation of a concrete plan in interview-me.

## Preparing the resolution — live failure and research request

Peter narrows in on the alignment question itself. Identifying inconsistencies was useful; asking “How would you like those caller conflicts handled?” was not. It handed him the work of deciding how to investigate and align them.

His direction:

- The goal is shared understanding of the issue, intended action, approach, and implementation.
- The agent must actively move toward that goal. It owns identifying the discrepancy, determining what it does not understand, researching or inspecting the relevant sources, breaking down the issue, and preparing the explanation and decision.
- If an API is involved, learn the API before asking the user to resolve a mismatch. The user should not have to direct that factual investigation.
- Present the whole issue or a smaller part as appropriate, then ask focused follow-ups for the remaining user-owned decisions. Choosing this sequence is the agent's responsibility.
- This does not permit assumptions about Peter's intent or filling in his answers. Initiative in the method and authority over the user's choice are different responsibilities.

Peter explicitly requests specialist research on this failure because handling it well is critical. Research on mixed-initiative assistance and useful decision preparation is underway in research-initiative.md and research-decision-preparation.md. Apply the findings to this actual exchange, with evidence and limits, rather than just adding an exhortation to be proactive.

The map adds failure mode 15: reporting a discrepancy without advancing its resolution. It is distinct from asking for a discoverable fact: the wrong question can offer the user the entire investigative process even when it mentions no specific factual lookup.

The prior approval question remains unanswered; this correction is not approval of a proposed confirmation policy. Do not reissue that broad question while the user has directed research. Prepare concrete alignment wording first, then identify whether any material user-owned choice remains.

## Initiative research completed and applied

research-initiative.md verifies Horvitz (1999) and TRAINS-95 (Ferguson, Allen, and Miller, 1996). research-decision-preparation.md verifies Active Task Disambiguation (2025) and Structured Uncertainty guided Clarification (2026 version). The main agent checked the relevant source passages and evaluation limits.

Usable mechanisms: separate missing user specification from limitations in the agent's understanding; gather constraints and domain evidence; construct viable alternatives; expose the consequential difference; ask about the user's remaining priority. These are research-supported design candidates, not a validated universal algorithm or measured improvement in this skill.

Do not import automatic action based on confidence, low question value, or elapsed time. Those appear in parts of the research but conflict with Peter's explicit boundaries. An open question is still valid when it seeks information only the user has; the failure here was handing him the agent's investigation and preparation work.

alignment-proposed-wording.md applies the process to the actual Brain inconsistency. It provides a shared evidence-based approval rule and two concrete variants: accept clear approval of the concrete plan, or always request a dedicated final confirmation. Both remove unsupported motive inference. The recommendation is the former to avoid redundant questions; the latter buys an explicit transition at the cost of another exchange.

The next question is that single prepared choice. Neither variant has been approved or applied to the archived Brain skills. Other alignment topics remain recorded rather than bundled into this question.

## Step 1 finalized

Peter replies “okay, sounds good to me?” to the recommendation to avoid repeating clear approval, then asks where the scaffold stands. After receiving that status, he replies “sounds good.” Record Choice A as accepted and continue the agreed scaffold sequence. This is not approval of unspecified implementation, publication, or every future artifact.

The remaining readiness and recording wording is derived from his explicit requirements, not another preference inferred silently: use evidence and resolved dependencies instead of uncalibrated confidence numbers; keep continuous project working records; keep the glossary a glossary; preserve final-artifact confirmation and decision-record criteria. brain-alignment-wording.md gives the concrete text, affected files, and checks.

The one-domain, one-skill map is marked reviewed. The three remaining gaps concern future verification: automatic selection, live host behavior, and revised-skill efficacy. They are not unanswered questions about the intended scope. Brain archive source edits remain unapplied; their concrete alignment text travels with the generation inputs and eventual edit plan.

Proceed with the specified Intent tree-generator skill. Present its skill_tree.yaml for review and wait before invoking generate-skill. Do not mark unrun tests as passed or treat this stage transition as publication authorization.

## Step 2 file plan

The specified tree-generator/SKILL.md was read in full. Workflow A applies because this is the approved scaffold workflow, even though an older skill already exists. The minimal-library fast path applies: one mapped skill and no framework adapter packages. Use a flat standalone core skill; no router or overview skill.

skill_tree.yaml plans:

- skills/ask-user-question/SKILL.md: the shared preparation, question, reply, evidence, waiting, and completion flow.
- Existing reference paths: wording.md, layout.md, reading-answers.md, failed-question.md, and asking-again.md under references/.
- Existing top-level examples.md path: complete worked exchanges.
- Three new host references: references/claude-code.md, references/codex.md, and references/gemini-cli.md.

Each reference has a distinct role recorded in the YAML comments. Shared critical rules remain in the main skill; only conditional detail goes behind pointers. The applicable host reference is read before the first question through that tool. The proposed description permits relevant exchanges inside larger workflows without taking over their scope.

Validation passed: strict YAML with unique keys, 1:1 map-to-tree skill coverage, matching skill name and directory, unique safe paths, 23 existing source inputs, and one reference per selected host. The plan has ten files total: one skill and nine supporting files. Generated content checks and model/UI evaluations do not apply yet because no replacement files are written.

Next: review skill_tree.yaml. After that confirmation, load the specified generate-skill/SKILL.md and continue Step 3. The Brain alignment text remains prepared input; it is not a claim that those source archives were edited.

## Complete replacement authorized

Peter explicitly directs removal and replacement of the current SKILL.md, references, and examples. No existing structure, reference count, wording, or backwards compatibility requirement constrains the replacement. Decisions must serve the best outcome, not ease of retaining old material.

The seven existing skill files are deleted. Git retains repository history; no old skill snapshot is created as a baseline or authoring input. The new evaluation baseline is no skill. Research artifacts remain the evidence and accepted requirements, not preservation of the old implementation.

The specified generate-skill/SKILL.md and tree-generator/references/write-skills.md are read fully. Mode A and the single standalone core skill apply. There is only one skill, so individual versus batch review is the same result and needs no question. The fresh structure is a main body containing the complete exchange, preparation, language/layout, and failure examples; three references exist because the selected hosts have different contracts. No other reference is justified merely by its old existence.

Generation follows the official skill-creator evaluation process with the reviewed scenarios. Runtime statements stay scoped to verified host evidence; behavior tests will not be called live UI verification.

At this read, skills/_artifacts.zip is also present as an untracked file created outside this run. It is left untouched; live artifacts are the directory's files, not that snapshot archive.
