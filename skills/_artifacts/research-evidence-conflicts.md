# Research: unresolved answers and conflicting evidence

Date: 2026-09-11. Supporting evidence for domain discovery; no skill change or approved design decision.

Peter identifies two failures: the agent silently fills an unresolved gap, or silently replaces the user's claim with its own belief. The sources support making uncertainty and correction visible. They do not establish that every inference requires a question.

## Primary sources

### Amershi et al., Guidelines for Human-AI Interaction (CHI 2019)

Official record: https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/

Full paper, university-hosted copy: https://www.advancedleadership.harvard.edu/s/Glassman_Reading-1_Guidelines-for-Human-AI-Interaction-camera-ready.pdf

Captures: `.firecrawl/conflict-amershi-publication.md` and `.firecrawl/conflict-amershi-paper.md`.

Verified paper body, Table 1 (capture lines 187–189): G9 makes correction and refinement easy; G10 calls for disambiguation or reduced service when the system is uncertain about the user's goals; G11 makes explanations of system behavior available. Discussion (lines 736–738) describes relevance across product categories and the potential need for specialized guidance.

Evidence type and limits: peer-reviewed guideline synthesis, iterated through evaluations including 49 HCI practitioners examining 20 products. It establishes applicability and relevance through heuristic evaluation, not the causal effectiveness of an LLM conversation policy. G11 concerns explaining behavior; presenting conflicting evidence before dependent action is our application to Peter's stated requirement.

### Lemmer and Corso, Evaluating and Improving Interactions with Hazy Oracles (2022 version)

URL: https://arxiv.org/html/2110.10206v3

Capture: `.firecrawl/conflict-hazy-oracles-passages.md`. ArXiv v3 dated 2022-11-30; venue status beyond that version was not checked.

Verified body, Problem Statement and Motivation: the agent can defer a decision to obtain additional human information. The paper distinguishes ambiguity in the input from input that is clear but exceeds the model's understanding. Its example contrasts an expression matching several objects with an unambiguous expression that the model nevertheless misinterprets. It evaluates the tradeoff between errors and added human effort.

Evidence type and limits: technical method and evaluation on video object tracking and referring-expression comprehension. It does not study disagreement in programming conversations. Its numerical thresholds and error reductions should not become skill defaults. The useful distinction is that the agent's uncertainty does not prove the user is wrong.

## Proposed applications to evaluate

These rules combine the research with Peter's stated requirements; they are not a validated taxonomy from either paper.

1. Compare each answer with what the question needed to resolve. Retain the answered part and identify any remaining gap. A new gap can expand the next investigation without supplying its own answer.
2. Keep evidence states distinct: user statement, inspected evidence, agent interpretation, and unresolved claim. Do not promote an interpretation into a settled fact, intention, or decision without support.
3. If the missing information is discoverable, inspect the relevant source. If it depends on Peter's intent, ask a focused follow-up. Dependent work stays pending; independent work can continue.
4. Treat a perceived contradiction as a claim to investigate. Verify the agent's contrary belief and check whether terms, version, scope, or context differ. Confusion and factual disagreement require different responses.
5. When a material conflict remains, state the user's claim, the conflicting evidence, and what consequence depends on resolving it. Explain a supported correction openly. Ask when the unresolved issue concerns intent or missing context; do not ask Peter to decide which factual evidence exists.
6. Preserve both the correction and its reason in the project record. Understanding a statement, believing it true, and receiving permission are separate conditions.

Suggested evaluation cases: incomplete answer; answer that exposes a wider gap; ambiguous user statement; clear statement the agent misreads; outdated user fact contradicted by current evidence; outdated agent belief corrected by local evidence. Check that no unsupported premise enters the next dependent action, and that any correction remains visible and attributable.

## Coverage

Firecrawl paper-index search first (`.firecrawl/conflict-search-papers.md`), then primary web search for the older guideline paper (`.firecrawl/conflict-search-amershi.json`); in-body reading verified both sources. This bounded extension does not claim exhaustive research coverage or eliminate the need to evaluate the proposed behavior.
