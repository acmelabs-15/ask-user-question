# Ask-user-question — Skill Spec

**Status: complete replacement generated and validated; human review pending.** Source version: 0.1.6. Date: 2026-09-11. The selected hosts are Claude Code, Codex, and Gemini. Simulated behavior and two Claude Code selection probes have run; live question rendering and delayed replies remain unverified.

This skill guides a question-and-reply exchange inside a larger workflow. It helps the agent communicate clearly, interpret the reply using evidence, and choose whether to continue, investigate, or repair.

The confirmed hierarchy is **larger workflow → question-and-reply cycle → repair one unclear message**. Flow, language, and visual organization work together inside one skill.

## Domains

| Domain | Description | Skills |
| --- | --- | --- |
| Communicating with the user | Establish what the current exchange settles, while keeping unresolved information visible. | ask-user-question |

## Skill Inventory

| Skill | Type | Domain | What it covers | Failure modes |
| --- | --- | --- | --- | --- |
| ask-user-question | Core | Communicating with the user | Prepared decisions; clear questions; evidence-based reply handling; targeted repair; untimed waiting; return to the larger workflow. | 15 |

The ordinary case is a coding task that reaches an unresolved user-owned choice: the agent asks once, reads the answer, and returns to the task. The supplied Brain workflows provide additional cases, not the only entry points.

Proposed exchange:

1. Identify the information needed for the next step. Inspect available evidence before asking. Make small, reversible implementation choices that preserve the agreed behavior; state the choice and its reason.
2. Compose one question with the necessary context, familiar words, and readable structure.
3. Interpret each part of the reply: answers, conditions, gaps, conflicts, and useful later topics can coexist.
4. Check that the next action's required inputs have evidence. Pause dependent work when they do not.
5. Continue, investigate, or ask one focused follow-up. Repair an unclear question and preserve useful deferred material through the larger workflow's records.

An answer can settle the current exchange without completing the larger workflow. A long answer can contain useful information without settling the current question. Understanding, factual support, and permission are distinct. A skip or silence supplies no consent.

Leave an unanswered question pending. The agent must not set a response deadline, infer idle status from delay, or close the question because a polling interval ends. Prefer a supported untimed path. If the host independently expires a question, keep the decision unresolved and explain the limitation; do not invent an answer or an unsupported timeout parameter.

Choosing an authorized implementation detail does not fill a gap in user intent. A one-line change to product behavior can still be the user's decision; small code size alone does not make the choice the agent's.

Finding an inconsistency starts the agent's investigation; it does not create a question about how the user wants the investigation managed. Read the relevant source, explain what differs and why it matters, and prepare a concrete resolution. Ask only about the remaining user-owned choice. When existing evidence and decisions settle the result, state it and continue.

## Failure Mode Inventory

These are risks the skill must handle. Several already have guards in the current skill; the inventory does not claim fifteen newly discovered defects.

### ask-user-question (15 failure modes)

| # | Mistake | Priority | Source | Cross-skill? |
| --- | --- | --- | --- | --- |
| 1 | Ask before identifying the evidence actually missing. | High | Peter's research clarification; interview-me artifact mode. | Larger workflow |
| 2 | Ask about a small, reversible implementation choice. | High | AGENTS.md; current reversibility rule; approved review feedback. | Larger workflow |
| 3 | Combine decisions before prerequisites are settled. | High | Current sequence rules; interview-me artifact mode. | Larger workflow |
| 4 | Hide the premise in unfamiliar or dense wording. | High | Peter; current wording rules; W3C and Google. | No |
| 5 | Recommend choices without comparable outcomes and consequences. | High | Current option rules; W3C; conflicting Brain instructions. | Larger workflow |
| 6 | Infer intent or motive from the reply's format alone. | Critical | Current reply rules; interview-me intent mode; grounding research. | Larger workflow |
| 7 | Fill an incomplete answer with unsupported assumptions. | Critical | Peter; partial-answer and deferred-inference research. | Larger workflow |
| 8 | Treat a skip or silence as user consent. | Critical | Current no-consent rule; approved review feedback. | No |
| 9 | Silently substitute another belief for the user's claim. | Critical | Peter; domain-modeling discrepancy questions; correction guidance. | Larger workflow |
| 10 | Lose useful topics or close an unanswered question after a mixed reply. | High | Peter; Roberts's discourse model. | Larger workflow |
| 11 | Rephrase without repairing the actual defect. | High | Current repair reference; wait-what; repair research. | Repair trigger |
| 12 | Treat one resolved exchange as completion of the larger workflow. | Critical | All three supplied workflow archives. | Larger workflow |
| 13 | Assume all hosts preserve the same fields and reply behavior. | High | Existing terminal and portability audits. | Host boundary |
| 14 | Close an unanswered question after an invented deadline. | Critical | Peter's waiting requirement; current host-contract research. | Host boundary |
| 15 | Report a discrepancy without preparing its resolution. | High | Peter's correction of the live alignment question; responsibility for factual research. | Larger workflow |

The [domain map](domain_map.yaml) contains mechanisms, source pointers, version context, and a wrong/correct exchange for every row. These examples are authored illustrations, not observed results. Some repairs correctly avoid another question. Evidence type and research limitations are in the linked reports below.

## Tensions

| Tension | Skills | Agent implication |
| --- | --- | --- |
| Brevity and necessary context | ask-user-question | Shortening must preserve the premise and meaningful qualifications. |
| Progress and unresolved evidence | ask-user-question | Keep unsupported inputs open without re-asking settled decisions. |
| Current focus and useful additions | ask-user-question | Check dependencies before deferring; preserve later topics without expanding scope. |
| Shared communication and larger workflows | ask-user-question and the Brain skills | Support nested questions without taking over the larger workflow's analysis or completion. |

These tensions are kept inside one skill or at its boundary with the larger workflow. Splitting flow, language, and layout would make one exchange depend on several skills.

## Cross-References

No new sibling skill is proposed. The composition relationships below connect to existing workflows; they are not instructions to generate or modify those workflows.

## Subsystems & Reference Candidates

| Skill | Subsystems | Reference candidates |
| --- | --- | --- |
| ask-user-question | Claude Code; Codex; Gemini CLI. | Reply interpretation and repair; language and visual organization; conditional references for each host's actual question tools. |

These are host-specific instruction paths, not three new skills or a proposed software adapter package. Codex itself has synchronous and asynchronous question contracts. Gemini research covers Gemini CLI; other Gemini interfaces are not assumed to expose the same tool.

Peter explicitly removes all preservation and compatibility constraints. The revised [file plan](skill_tree.yaml) now matches four newly written files: the shared body and three host references. Worked exchanges live beside their rules in the body. The old references, example file, and evaluation scaffolding are removed.

## Remaining Gaps

| Skill | Question | Status |
| --- | --- | --- |
| ask-user-question | Does it select itself reliably for relevant exchanges without an explicit invocation? | Two Claude Code probes selected the positive case and skipped the negative. Broader and cross-host reliability remain unmeasured. |
| ask-user-question | Do the selected host surfaces preserve a question and return a delayed answer correctly? | Host scope is settled; source contracts are researched, but live rendering and delayed-response checks remain. |
| ask-user-question | Does the replacement reliably improve the next action and repair? | Second simulated pass: new skill 10/10, no-skill baseline 9/10 after conservative adjudication. One sample per arm is not a reliable effect estimate. |

Gap 1 owns the automatic-use requirement and its measurement. The last gap measures behavior after loading. A load alone is not success; a good answer without a load does not prove automatic use.

Peter approves the direction and directs a complete replacement. The old evaluations are removed. New cases, assertions, and checks derive from the reviewed behavior; no retired skill is used as a baseline.

## Recommended Skill File Structure

- **Core:** One ask-user-question skill. Preserve its identity and cover the full exchange.
- **Framework:** No framework-specific skill is proposed. Use conditional host references for the verified tool contracts.
- **Lifecycle:** The exchange is the skill's lifecycle. Project lifecycle control remains with the larger workflow.
- **Composition:** Describe the handoff to existing Brain skills in this skill. No new wrapper skill is needed merely to name a Brain skill.
- **References:** The three newly written host references carry only their distinct contracts. The central body contains the shared preparation, language, layout, reply, evidence, and repair rules with all fifteen failure cases.

## Composition Opportunities

| Existing workflow or trigger | Interaction | New composition skill needed? |
| --- | --- | --- |
| idea-refine | Supplies the next ideation question; owns critique, convergence, and the one-pager. Explicitly calls brain:ask-user-question. | No; support its existing handoff. |
| interview-me | Supplies a ready question; owns intent/artifact modes, branches, research, and final confirmation. Explicitly calls brain:ask-user-question. | No; return what remains unresolved. |
| domain-modeling | Supplies glossary/code discrepancy scenarios and owns glossary/ADR writes. This archive does not explicitly name the question skill. | No; preserve the larger workflow's evidence and record boundaries. |
| wait-what | Signals that a message needs repair. Peter places this behavior inside the question skill's smaller cycle. | No new skill proposed; no change to the separate package is implied. |

All four supplied workflows belong to Brain. The structured map names Brain as the library and records each skill separately.

The Brain skill examples establish intended composition, not successful runtime behavior. Some examples and policies conflict with Peter's current requirements. Those findings are in the archive reports, not silently imported into this specification.

Supporting material:

- [Research proposal](research-proposal.md): operational flow, source links, and candidate checks.
- [Conversation research](research-conversation.md), [language and layout](research-language-layout.md), [evidence conflicts](research-evidence-conflicts.md), and [mixed replies](research-mixed-replies.md).
- [Domain modeling](context-domain-modeling.md), [idea refinement](context-idea-refine.md), [interviewing](context-interview-me.md), and [wait-what](context-wait-what.md).
- [Working memory](discovery-notes.md): Peter's answers, confirmed boundaries, archive hashes, and current state.
- [Brain skill alignment](brain-skill-alignment.md): settled rules, source conflicts, and their aligned wording.
- [Concrete alignment wording](brain-alignment-wording.md): readiness, recording, recommendation, and example changes derived from the established requirements.
- [Claude Code](host-claude-code.md), [Codex](host-codex.md), and [Gemini](host-gemini.md): host-contract research and remaining verification.

The supporting research includes theory, empirical studies, official design guidance, and host source inspection. The replacement has passed structural validation and the recorded diagnostic evaluations. These results do not establish live UI behavior or broad effectiveness. The prepared Brain alignment wording remains separate source work to apply at its proper targets. See [generation verification](generation-verification.md) for the exact completion boundary and evidence.
