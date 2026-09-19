# Research: prepare the decision before asking

Research date: 2026-09-11. Intermediate evidence; no skill or approved scope changed.

## Finding

Two recent primary papers add a mechanism to the existing communication research: identify what is uncertain, construct plausible actions or solutions, and ask about the distinction that matters. Finding a discrepancy is not itself a prepared decision. The recommendation to investigate technical facts before transferring a choice to Peter is our application of these mechanisms and his stated division of work, not a directly tested result in either paper.

## Primary sources and limits

**D1. Suri, Mathur, Lipka, Dernoncourt, Rossi, and Manocha, “Structured Uncertainty guided Clarification for LLM Agents.”** [arXiv:2511.08798v2](https://arxiv.org/html/2511.08798v2), dated 10 April 2026; first submitted November 2025. Evidence type: research preprint with a formal method and benchmark experiments. Peer-reviewed publication status was not established.

The method distinguishes **specification uncertainty**—what the user wants—from uncertainty in the model's predictions. It reasons over candidate tool calls, identifies uncertain parameter domains, generates questions aimed at particular aspects, and estimates their value while penalizing repeated questioning. Answers refine the candidate domains. Relevant passages: introduction, section 4, and appendix A.2.

The benchmark uses tool-call tasks and an LLM user simulator. Human annotation checks generated query quality; that is not a study of live human collaboration. Its algorithm can execute the best candidate when the estimated value of another question is too low. **Do not adopt that stopping rule for an unresolved decision Peter owns.** Neither model confidence nor a question-cost threshold supplies his missing choice. Appendix B.2 also identifies whether parameter values depend on external data or user context, but this does not establish a complete investigation policy.

**D2. Kobalczyk, Astorga, Liu, and van der Schaar, “Active Task Disambiguation with LLMs.”** [arXiv:2502.04485](https://arxiv.org/abs/2502.04485), February 2025. Evidence type: research preprint with theoretical analysis and experiments; publication status beyond arXiv was not verified.

The method samples solutions compatible with current requirements, then selects questions whose answers distinguish those solutions. This makes question preparation an explicit reasoning task instead of simply prompting for a question. It also argues that asking the user to examine every possible solution can impose excessive mental work. Relevant passages: sections 2–3 and code-generation evaluation.

In the coding experiments, executable reference programs supply answers; generated programs are filtered against collected tests. The evaluation reports improved solution accuracy with selected questions. It does not measure how real users experience a recommendation dialog. The authors acknowledge that poor generated code can reflect model limitations even when the user's request is unambiguous. Thus, model disagreement alone is not proof that the user omitted something.

## Candidate procedure for the observed failure

These are proposed checks derived from the papers and Peter's request:

1. **State the unresolved fact or choice.** Identify what the discrepancy changes. Separate missing evidence from conflicting requirements or a missing user preference.
2. **Resolve discoverable facts.** Inspect the relevant code, instructions, tests, or official sources. A question should not ask Peter to choose a research method simply because the agent has not performed that research.
3. **Prepare viable alternatives.** Remove options that evidence rules out. For each remaining path, identify its outcome, relevant cost, and dependency. If there is one clear repair within the authorization already given, perform it; the papers do not independently establish that authorization.
4. **Locate the user-owned distinction.** Ask only when defensible paths remain and their difference depends on Peter's intent, priorities, or an unrecorded choice. Research cannot invent those values. If the alternatives are not yet understood, continue preparation rather than presenting a vague “what should we do?”
5. **Ask a bounded, answerable question.** Include the relevant finding, the concrete difference, and a reasoned recommendation. After the reply, update what is settled and retain any unresolved part.

A useful check before calling the question tool: **Can the agent say how each plausible answer changes the next action, and why further inspection would not settle that difference?** This is a proposed evaluation condition, not a validated universal metric.

## Captures

`.firecrawl/decision-preparation-index.md`; `decision-preparation-structured-metadata.md`; `decision-preparation-structured-passages.md`; `decision-preparation-active-metadata.md`; `decision-preparation-active-passages.md`; `decision-preparation-active-evaluation.md`. The paper index was used first; load-bearing method and evaluation claims were checked against in-body passages. No feedback or live user question was sent.
