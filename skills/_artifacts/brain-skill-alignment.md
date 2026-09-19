# Aligning the Brain skills

Status: confirmation rule accepted; remaining wording derived from established requirements and ready for final discovery review.

Peter wants the Brain skills and ask-user-question to use consistent guidance. We will examine each conflict, agree on the rule, record the decision, and identify the affected instructions and examples. This is part of the current design review, not work silently deferred to another project.

The relevant Brain skills are idea-refine, interview-me, and domain-modeling. wait-what supplies a smaller repair step. In user-facing discussion, name those skills or say “Brain skills”; do not use “callers” as shorthand.

## Rules already settled

**One question at a time.** idea-refine/SKILL.md requires this, while examples.md:30-36, 153-159, and 199-205 show several questions together. Peter has already chosen one question at a time. The examples must follow that rule; no new preference decision is needed.

**Honest recommendations.** interview-me/references/intent-mode.md:26 suggests sometimes making a guess expected to provoke pushback. That cannot be presented as the agent's recommendation unless it is the agent's actual best-supported judgment. A hypothesis or stress-test scenario may be useful, but it must be labeled as such and cannot become an assumed user answer. Peter's evidence requirement already settles that boundary.

**Expose disagreement.** A discrepancy between a user statement, glossary, and code must be shown and examined. Keep current behavior separate from desired behavior. domain-modeling supplies relevant scenarios; ask-user-question supports communicating the discrepancy and interpreting the response.

**Keep the responsibilities clear.** The larger workflow chooses the current subject and manages its own completion. ask-user-question guides how the exchange is expressed and what the response settles. Repair is inside that exchange. These boundaries are already confirmed.

## Aligned rules

**Confirmation after an interview.** Accept clear approval of a concrete plan, whether selected or written; ask again only when its meaning or scope remains unclear. Peter accepts this recommendation. Preserve conditions and do not infer motives from affirmative phrases. The selected wording is in alignment-proposed-wording.md.

**Readiness without unsupported confidence numbers.** Replace uncalibrated percentages and predictions of future replies with established facts, settled decisions, and explicit remaining dependencies. This follows Peter's evidence requirement. Readiness concerns the agreed scope, and it remains separate from permission to implement.

**Recording consistently.** Keep continuous Markdown working records during collaborative project work, as Peter requires. Record terms through domain-modeling when resolved; CONTEXT.md stays a glossary. Keep unresolved information and deferred topics in the project's working record. Preserve the existing confirmation rules for final artifacts and the criteria for accepted ADRs.

**One home for shared guidance.** Recommended structure: ask-user-question owns shared communication rules, and the Brain skills point to it while retaining their domain procedures. Avoid copying the same rule into several files with competing wording. The exact edits belong to the agreed file plan after these decisions are settled.

## Source and execution boundary

The source evidence is the four user-supplied archives, identified by path and hash in discovery-notes.md. Context reports contain full-reading coverage and exact source pointers. The original archives and extracted source files remain unchanged.

The agreed work now is to align the guidance through review and decisions. The public skill rewrite and any edits to the Brain skills follow the resulting plan; this note does not claim they have been performed.

## How this review advances

Peter corrects the generic “how should we handle the conflicts?” question. The agent must prepare the alignment work itself:

1. Identify the exact conflicting instructions and the behavior each would produce.
2. Check their sources, terminology, API or host version, and the user's existing decisions.
3. Separate factual corrections from remaining preferences. Resolve what the evidence and settled requirements already decide.
4. Draft concrete replacement wording and show its consequence.
5. Ask one focused question only where a genuine user-owned choice remains. Preserve the answer and continue.

Specialist research is complete at source-review level. research-initiative.md and research-decision-preparation.md record its findings and limits. The main agent verified the supporting passages.

The [confirmation wording](alignment-proposed-wording.md) records the selected rule and the alternative considered. [Concrete alignment wording](brain-alignment-wording.md) supplies the readiness, recording, recommendation, and example changes with their affected files and checks.

These remaining details follow the established requirements rather than asking Peter to design the alignment process. The complete domain artifacts are ready for their final review before tree generation. Source edits have not been applied to the archives or installed skills.
