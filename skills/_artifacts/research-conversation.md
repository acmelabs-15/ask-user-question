# Research notes: question, reply, and repair

Date: 2026-09-11. Supporting research for Intent domain discovery. These notes propose applications; they do not change the skill or approve a scope decision.

## Finding

Research supports distinguishing **understanding prior meaning** from **needing more information**. It also supports treating communication trouble as a joint repair task: identify the uncertain part, preserve the understood part, and use the most specific repair the evidence allows. Receiving a reply is not itself evidence that the question's intended decision is settled.

The final sentence is our operational inference from these sources and Peter's requirements. None of these sources defines an agent permission policy or a universal test for sufficient clarity.

## 1. Grounding Gaps in Language Model Generations

- Authors: Omar Shaikh, Kristina Gligorić, Ashna Khetan, Matthias Gerstgrasser, Diyi Yang, Dan Jurafsky.
- Source: primary research paper, arXiv version 2, 2024-04-02. Publication/peer-review status beyond this version was not checked.
- URL: https://arxiv.org/html/2311.09144v2
- Captures: `.firecrawl/flow-grounding-gaps-passages.md` (paper-index body passages); `.firecrawl/flow-grounding-gaps-full.md` (full source).
- Verified sections: 2, 3, 7.3, 9, and Limitations. Definitions are at capture lines 88–104.

Supported concepts:

- Clarification concerns the meaning of information already presented; follow-up seeks elaboration or additional information while signaling understanding of the prior contribution.
- Acknowledgement signals understanding and readiness for a relevant next turn. The paper's narrow annotation category includes utterances whose sole purpose is acknowledgement.
- The paper finds that tested language models often produce presumptive responses where human speakers ground the interaction.
- Prompting models to use grounding acts increases their use but does not improve agreement with where humans use them. Question frequency alone is therefore an inadequate evaluation target for this skill.

Limits:

- English conversations from education, emotional support, and persuasion; not programming collaboration.
- The three categories are a selected subset, explicitly excluding model-initiated repair. They are not a complete conversation state machine.
- Historical tested models and tasks do not establish a current failure rate for Codex or this skill.
- The paper does not equate acknowledgement with agreement, selection, or permission. Keeping those separate is our application, not an evaluated rule from this paper.

## 2. Universal Principles in the Repair of Communication Problems

- Authors: Mark Dingemanse and colleagues.
- Source: primary empirical paper, PLOS ONE, 2015-09-16.
- URL: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0136100
- Capture: `.firecrawl/flow-repair-dingemanse.md`.
- Verified body: Methods; Results on repair types and specificity (capture lines 150–194); conservation (line 220); Discussion limitations (line 252).

Supported concepts:

- In naturally occurring conversation across 12 languages, recipients signal trouble and original speakers provide a repair.
- Three recurring forms: an open signal that something is unclear; a request that identifies the unclear part; a proposed interpretation offered for confirmation.
- People favor the most specific repair they can support. A specific request communicates what was understood as well as what was not.
- Repair can preserve the understood material and supply only the problematic part. Repeated repair attempts tend to become more specific.

Limits:

- Informal conversations between families and friends, including speech and sign; not an experiment on AI question dialogs.
- The three forms concern initiating repair, not all reasons a user might respond without answering.
- Specificity depends on evidence. This does not support inventing a candidate meaning or asking a leading confirmation question.
- The study does not establish fixed word counts, number of options, or one-question-at-a-time UI requirements.

## 3. Grounding in Communication

- Authors: Herbert H. Clark and Susan E. Brennan.
- Source: primary theoretical book chapter, 1991; synthesis with human conversational examples, not a controlled AI study.
- URL: https://web.stanford.edu/~clark/1990s/Clark,%20H.H.%20_%20Brennan,%20S.E.%20_Grounding%20in%20communication_%201991.pdf
- Capture: `.firecrawl/flow-clark-brennan.md`, retrieved by the main agent. This researcher checked lines 27–81; the main agent additionally checked relevant-next-turn and joint-effort sections.

Supported concepts:

- Grounding aims for mutual belief in understanding sufficient for the current purpose, rather than perfect understanding.
- Merely uttering a question differs from successfully communicating the question's intended meaning.
- Presentation and acceptance are distinct phases. Here, acceptance means evidence of understanding; it does not mean consent to a proposed action. Their example completes acceptance when the listener begins a negative answer.
- The absence of an objection is weaker than positive evidence of understanding.

Limits: this framework concerns human conversation. Its account of acceptance should not be copied into agent instructions as a synonym for permission. The chapter does not validate a programming workflow or tell us how accurately an LLM can infer any of these states.

## Proposed operational conditions for this skill

These are applications to evaluate, not source quotations or settled design decisions.

1. Before asking, identify what the answer must resolve for the next step. This is a task-specific condition, not a universal confidence score.
2. After any reply, interpret its meaning in the question's context. A button label, free text, note, or silence is a message form; none alone proves the user's intent.
3. When the reply supplies the needed decision or information, retain its conditions and continue within that scope.
4. When the user signals that the question is unclear, repair the question. Locate the trouble when the reply provides evidence: missing premise, unfamiliar term, uncertain referent, conflated decisions, or unclear consequences. These example diagnoses come from the task, not a validated taxonomy in these papers.
5. When the prior meaning is clear but a necessary detail remains absent, acknowledge what is settled and ask a focused follow-up for the missing detail.
6. When the agent is unsure what the reply means, request clarification of that meaning. Offer a candidate interpretation only when the reply supports it.
7. Preserve understood material across repair and follow-up. A user's correction may revise one part without rejecting every option or changing the whole goal.
8. Evaluate whether the next turn resolves the specific gap. More questions, more acknowledgement language, or a longer explanation are not success measures by themselves.

Examples proposed for evaluation: free text that clearly accepts an option; an exact label with a limiting note; an acknowledgement that conveys understanding without selecting; a response that answers one of two conflated decisions; a correction of the premise; and an expression of confusion about a term. In particular, `only for staging` must be interpreted against the preceding question. These sources cannot justify categorizing it as a qualified yes in every context.

## Source coverage and rerun inputs

Used Firecrawl's paper index first: semantic query on grounding, clarification, misunderstanding, and sufficient understanding; reference expansion from `arxiv:2311.09144`; in-body reading of that paper. Expansion mostly returned contemporary NLP work, so primary-source web search located the older cross-language repair study. Search captures: `.firecrawl/flow-related-grounding.json` (CLI returned Markdown despite extension), `.firecrawl/flow-search-repair.json`. A Clark/Brennan search was also saved as `.firecrawl/flow-search-clark.json`; the main agent retrieved and independently verified that source.

This is a targeted three-source investigation. It covers grounding and repair mechanics. It does not claim exhaustive literature coverage, validate a new taxonomy, or establish the skill's efficacy.
