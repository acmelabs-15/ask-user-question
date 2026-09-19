# Research: mixed replies and the current question

Research date: 2026-09-11. Intermediate evidence, not an approved skill change.

## Primary source

Craige Roberts, *Information Structure: Towards an integrated formal theory of pragmatics*, **Semantics and Pragmatics** 5, article 6 (published 19 December 2012). [Journal record](https://semprag.org/article/view/sp.5.6), [direct paper](https://semprag.org/article/download/sp.5.6/pdf), DOI: 10.3765/sp.5.6.

This is a formal theory of discourse, not an empirical evaluation of AI collaboration. The paper models conversation around questions under discussion and relations among them.

Verified passages:

- Section 1, pages 6:6–8: information can be informative yet not bear on the current question; a dormant question can be reintroduced, after which speakers may return to the previous inquiry or abandon it.
- Section 1.1, pages 6:11–12: a partial answer resolves some alternatives while a complete answer resolves all alternatives in the question's contextual interpretation.
- Section 1.2, pages 6:13–16: answers may comprise multiple assertions. Accepted unresolved questions form an ordered structure. A relevant subquestion can temporarily become the immediate question; completing it exposes the earlier question again.

## Application to Peter's requirement

**Synthesis:** distinguish the contribution of each part of a reply from whether the current question is resolved. One message may answer part of the question, introduce useful future work, and express confusion. Those contributions can coexist; assigning the entire message one exclusive class loses information.

Candidate handling:

1. Preserve what the reply settles about the current question.
2. Identify useful additional topics separately, without treating their detail or length as an answer to the current question.
3. Decide whether an additional topic is a prerequisite for answering now or a topic to revisit later.
4. Tell Peter what was retained or deferred. State the exact unresolved point and ask one question about it.

This procedure is an adaptation of the theory plus Peter's stated preference. **Writing a durable Markdown record is Peter's requirement; Roberts does not prescribe Markdown, agent memory files, or this procedure.** A user may deliberately change priorities; maintaining the current question must not override an explicit change of task.

## Limits and retrieval

The theory idealizes relevance, shared context, and question relations. In section 1.2 it explicitly sets aside the fact that discourse is not always monotonic: later corrections can change earlier accepted information. Do not adopt its ever-growing common ground as a rule that records cannot be corrected. It does not validate a strict stack implementation for every conversation, a fixed reply classifier, or automatic judgments that a user is uncooperative. Validate the proposed behavior with mixed replies and check both preservation and correct return to the unresolved point.

Captures: `.firecrawl/mixed-roberts-page.md` and `.firecrawl/mixed-roberts-fulltext.md`. Paper-index search was attempted first (`mixed-paper-search.md`), but did not retrieve the named older source. The Grosz/Sidner body and Roberts viewer captures were incomplete and are not evidence for these findings. The journal's direct PDF supplied readable full text.
