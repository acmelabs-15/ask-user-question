# Caller context: interview-me

Read on 2026-09-11. Source: the user-supplied `interview-me.zip`, extracted to `/private/tmp/ask-user-question-context.w6SbT3/interview-me/`. All archive references below are relative to that directory. These are reference artifacts; none of their workflows, scripts, external calls, or evals were activated.

## Explicit use of ask-user-question

`SKILL.md:7` directs the caller to load `brain:ask-user-question` before anything else and says every question is composed and delivered through it. `SKILL.md:17,29,68,80` repeats that relationship. This is an explicit dependency, not an inferred match between similar descriptions.

Both modes specify how the caller supplies material to the question skill:

- Intent mode supplies a hypothesis and recommended answer, with the decision context in question text and the recommendation's reasoning in its option description; it waits for the reply before composing another question (`references/intent-mode.md:22–26`).
- Artifact mode supplies the next ready decision and its recommendation; every answer changes which question can follow (`references/artifact-mode.md:11–15`).

The archive names `brain:ask-user-question`, while this repository distributes `ask-user-question`. The files prove a semantic dependency; this read does not verify that the old namespaced reference resolves to the current package at runtime.

## Responsibilities held by the caller

**Choose the interview mode.** No artifact means intent discovery; an existing plan, spec, design, or decision means artifact interrogation (`SKILL.md:21–25`). The caller owns this selection and the full interview.

**Manage the project branches.** Artifact mode builds a design tree. Its frontier contains decisions whose prerequisites are settled; it recomputes that frontier after every answer. A question with an unresolved prerequisite waits (`references/artifact-mode.md:11–15,27–29`). The question skill need not own the tree to report that a particular answer leaves its prerequisite unresolved.

**Find external facts.** The caller assigns filesystem, tool, and documentation research to subagents. Only dependent questions wait; other ready questions can continue one at a time (`references/artifact-mode.md:17–19`). This is caller orchestration, not a requirement for the question skill to start its own research agents.

**Choose another discovery method when needed.** The caller builds a cheap example when appearance or behavior is the live question. It records questions that cannot yet be phrased precisely on a Not yet specified list (`SKILL.md:31–34`). A reaction to the example, rather than artifact completeness, resolves that question.

**Maintain records and handoffs.** The caller invokes domain-modeling to record terms and decisions inline (`SKILL.md:27,88–90`). It assigns `CONTEXT.md` and ADR ownership to that integration (`SKILL.md:43`; `references/artifact-mode.md:23`). Intent output can be saved to `docs/intent/[topic].md` on confirmation; downstream skills consume confirmed intent (`SKILL.md:40–50`). There is a wording tension: line 27 makes recording conditional on the user's request, while line 90 unconditionally calls domain-modeling when a term or decision is resolved. The archive does not resolve that tension.

## Completion gates

Intent mode restates Outcome, User, Why now, Success, Constraint, and Out of scope; remaining uncertainty is visible in the Not yet specified list. It requires explicit confirmation and folds corrections into another restatement (`references/intent-mode.md:36–57`). Its confidence estimate and ability to predict reactions to three further questions are caller-specific stopping heuristics (`references/intent-mode.md:13–20,59–61`). They are not calibrated evidence measures established by this research.

Artifact mode finishes when the frontier is empty, all branches have been visited, nothing is silently assumed, and the user confirms shared understanding. Acting on the artifact waits for that confirmation (`references/artifact-mode.md:21–30`). Resolving one AUQ exchange therefore does not complete or authorize the larger workflow.

The caller requires a responsive user and treats underspecification as a blocker in noninteractive runs (`SKILL.md:36–38`).

## Consequences for the current proposal

1. **Support composition inside a larger workflow.** Current repository `skills/ask-user-question/SKILL.md:10` excludes a wider job that pauses to ask, specifically including requirements interviews. That wording conflicts with this caller's explicit dependency. This is a contract/routing risk visible in the text; archived results do not demonstrate an actual AUQ load failure. The boundary can preserve caller ownership of the interview while supporting each nested question and reply.
2. **Return an unresolved result when the answer is incomplete.** The caller needs to keep the affected branch open, revisit dependencies, or fetch evidence. Silent gap-filling would corrupt its frontier and completion gate.
3. **Keep caller policy separate from reply meaning.** `references/intent-mode.md:57` rejects several phrases and infers a polite exit or abandonment. A caller may require a particular confirmation, but those strings alone do not establish the user's motive. The proposed distinction between observed reply and inferred intent is important here.
4. **Do not import deliberate weak guesses.** `references/intent-mode.md:26` says to occasionally guess toward expected pushback; `SKILL.md:60` favors leading. Those are archived interview tactics, not evidence that an AUQ recommendation should misrepresent the agent's best-supported judgment. This is a policy tension for review, not a silent change to the caller.
5. **Use the caller's real scenarios in later evaluation.** Suggested cases: correction revises one intent field; partial answer keeps one prerequisite open; new information reopens a settled branch; evidence acquisition suspends only dependent questions; final interview confirmation differs from resolving the current question. These are proposed cases, not completed tests.

## Archived eval evidence and limits

`evals/evals.json:5–16,18–29` defines two dialogue cases. They expect AUQ as the first act, one question per turn, recommendations, appropriate branch dependencies, and explicit confirmation. No completed dialogue traces or grades are present in this directory.

`evals/trigger-eval.json:2–23` supplies 22 trigger queries. Three archived result sets compare merged, old interview, and old grilling descriptions. Their summaries report 21/22, 16/22, and 18/22 queries passing respectively (`evals/results/trigger/merge-1/{merged,old-interview-me,old-grilling}.sonnet.json:204–208`). These are historical trigger measurements, not AUQ composition/repair measurements.

All three logs warn that an installed target invalidates file pull verdicts (`*.sonnet.log:2`). Envelopes also say the installed copy, not the source directory, served skill loads (`*.sonnet.envelope.json:26`), and record CLI-version and session-registration caveats (`:27–92`). These caveats prevent using the archived numbers as proof that the supplied source or nested AUQ behavior works.

## Full reading coverage

The hidden/no-ignore inventory contains 14 content files. All were read completely, including all repeated envelope caveats, rows, and verdicts:

- `SKILL.md`: 90 lines.
- `references/intent-mode.md`: 68 lines.
- `references/artifact-mode.md`: 30 lines.
- `evals/evals.json`: 32 lines.
- `evals/trigger-eval.json`: 24 lines.
- `evals/results/trigger/merge-1/merged.sonnet.json`: 209 lines; `.envelope.json`: 429 lines; `.log`: 3 lines.
- `evals/results/trigger/merge-1/old-interview-me.sonnet.json`: 209 lines; `.envelope.json`: 429 lines; `.log`: 3 lines.
- `evals/results/trigger/merge-1/old-grilling.sonnet.json`: 209 lines; `.envelope.json`: 429 lines; `.log`: 3 lines.

Total: 2,167 lines / 168,431 bytes. The glossary include at `SKILL.md:9` points outside this archive and was treated as a dependency reference, not executed. Current AUQ frontmatter was additionally read to verify the exclusion above.
