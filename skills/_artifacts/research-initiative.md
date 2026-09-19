# Research: investigative initiative before asking

Date: 2026-09-11. Supporting discovery research. Live failure: after detecting an inconsistency, the agent asked how to handle conflicts before investigating the specific discrepancy and proposing a resolution.

## Finding

Mixed-initiative research distinguishes contributing to problem solving from asking for the user's intent or evaluation criteria. It supports an agent doing analytical work and exposing a concrete problem for judgment. It does not establish that the agent should silently supply missing intent, or that users should design the investigative procedure.

## Primary sources

### Ferguson, Allen, and Miller (1996), TRAINS-95: Towards a Mixed-Initiative Planning Assistant

Original AIPS-96 conference paper; author-university copy reformatted in 2010:
https://www.cs.rochester.edu/research/cisd/pubs/1996/ferguson-allen-miller-aips96.pdf

Capture: `.firecrawl/initiative-trains95.md`.

Verified passages:

- Lines 445–458 describe a cycle: identify the focused goal, gather constraints/background information, construct a candidate, then criticize/correct/accept it. Criticism loops back to constraints; acceptance permits a new focus.
- Lines 496–509 illustrate the system generating a route and surfacing its five-hour delay. It does not know whether trip time matters to the manager. The manager evaluates that consequence.
- Lines 560–608 distinguish problem-solving actions, including decomposition and conflict resolution, from domain reasoning. The proposed architecture matches open issues to specialist reasoners and interprets their results.

Limits: the implemented domain is deliberately simple and some architecture is proposed. The reported experiment compares input modes, not whether this initiative policy outperforms alternative policies. The system deliberately limits planning ability and sometimes fills gaps from discourse context; neither practice should be copied into this skill as a general rule.

### Horvitz (1999), Principles of Mixed-Initiative User Interfaces

Original CHI-99 paper, author-hosted copy:
https://erichorvitz.com/chi99horvitz.pdf

Capture: `.firecrawl/initiative-horvitz.md`.

Verified passages: lines 105–109 recommend efficient dialogue to resolve key uncertainties about user intentions while avoiding needless interruption. Lines 125–132 recommend matching the precision of a contribution to uncertainty: useful partial progress can avoid costly reversal. Lines 74–82 identify poor guesses about user goals and inadequate opportunities for user guidance as design problems.

Limits: principles and a calendaring prototype, not an evaluation of LLM interview skills. The paper also uses expected utility to choose autonomous action and discusses timing out unsolicited assistance. Those policies conflict with Peter's stricter rules when applied to unresolved owner decisions or unanswered questions; they are not adopted here. PDF extraction loses some adjacent numbered principles, so claims rely only on complete passages above.

## Proposed application

These conditions combine the research with Peter's stated ownership rule; they are proposed skill behavior, not a validated research taxonomy.

1. Name the concrete discrepancy and the dependent action it affects. Separate conflicting facts from unknown intent, alternative goals, or differing terminology.
2. Investigate facts and domain constraints the agent can discover. Check applicable API behavior, code, versions, and authoritative sources before asking for a policy decision.
3. Divide a compound discrepancy into independently explainable parts. Retain settled facts and mark remaining uncertainty; do not settle it through an unsupported assumption.
4. Produce a concrete resolution or a small set of defensible alternatives. Explain the evidence, consequences, and recommendation.
5. Ask only when a remaining choice belongs to the user: their intent, priority, constraint, or acceptable tradeoff. Put that decision's relevant context inside the question. A generic request to choose the investigation method does not substitute for steps 1–4.
6. Apply the answer only to what it settles. Recompute dependent questions and repeat analysis where new gaps appear.

Evaluation example: given an API mismatch, success requires inspecting the relevant contract and showing its impact before asking a remaining product choice. Failure includes both broad procedural deferral and silent replacement of the user's intent.

## Coverage

Firecrawl paper-index search returned modern adjacent work, not the original foundations (`.firecrawl/initiative-index.md`). Primary web search located author-hosted originals. The IEEE Allen essay page returned navigation without article text (`initiative-allen-ieee.md`); no claim relies on its search excerpt. Horvitz's related essay was also inspected (`initiative-mixedin.md`) but is not counted as independent support. No scripts, settings, skill files, or live questions changed.
