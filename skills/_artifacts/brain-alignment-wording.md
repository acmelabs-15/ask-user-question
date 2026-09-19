# Brain skill alignment — concrete wording

Status: prepared from the agreed requirements for final domain-discovery review. No source skill or archive has been edited.

The shared communication rules belong in ask-user-question. The Brain skills retain their subject matter, project-level sequence, output formats, and completion conditions. They point to the shared rules rather than restating competing versions.

## Readiness based on evidence

Affected sources: interview-me/references/intent-mode.md, its opening hypothesis/confidence instructions, its readiness section, and matching workflow/checklist text in interview-me/SKILL.md.

Replace percentage and predicted-answer criteria with:

> Track what is established, its source, and what remains unresolved. Describe a proposed interpretation as a hypothesis until the user's answer or other relevant evidence supports it. Do not use an invented confidence percentage or a prediction of the user's future answers as proof of understanding.
>
> The current agreed scope is ready when its required user decisions are settled, its required facts have supporting evidence, and its dependencies are accounted for. Record unrelated future questions separately. If new information changes a dependency, reopen the affected question and explain why.
>
> Before implementation, present the concrete work and any remaining conditions. Apply the shared confirmation rule. Readiness and authorization are separate: neither a complete analysis nor an affirmative reply supplies a missing requirement. Keep dependent work pending until both conditions are met.

This follows Peter's evidence requirement and preserves the larger workflow's completion boundary. If the agreed scope is the whole plan, settling one question does not complete it. The replacement does not authorize partial implementation merely because one branch is understood.

Retain the existing restatement fields where relevant: Outcome, User, Why now, Success, Constraints, and Out of scope. Expose missing information instead of filling a field from a guess. Use the fields to reveal actual gaps, not as proof that an interview succeeded because every heading contains text.

## Continuous records in the right files

Affected sources: interview-me/SKILL.md's conditional recording step, output section, and final domain-modeling instruction; idea-refine/SKILL.md's domain-modeling instruction. domain-modeling's glossary and ADR formats remain the destination rules.

Use one recording instruction:

> During collaborative project work, update the project's Markdown working record as findings, answers, decisions, and open questions emerge. Keep the source and status clear: observed fact, user decision, proposed interpretation, unresolved conflict, or deferred topic. A new agent must be able to identify the current question and the next supported action from that record.
>
> Record a resolved domain term through domain-modeling in the relevant CONTEXT.md. Keep CONTEXT.md a glossary. Put general working notes, unresolved questions, and deferred topics in the project's working record instead.
>
> Record architectural decisions in the project's decision files only when they meet its decision-record criteria. Keep proposals distinct from accepted decisions. Preserve existing confirmation requirements for final intent documents and one-pagers; a working note is not approval of the final artifact or authority to publish it.

This removes the optional-versus-unconditional recording conflict without turning every answer into a glossary entry or an accepted ADR. The project controls the actual filenames and publication rules. This skill does not create a separate memory service or change global agent memory.

## Examples and recommendations

Affected sources: idea-refine/examples.md's three batched-question passages, and interview-me/references/intent-mode.md's recommendation paragraph.

Replace batched examples with a sequence that shows an answer between each question. The next question must use what the answer settles. The existing examples cannot remain a contradictory demonstration of the rule.

Use this recommendation instruction:

> Give your actual best-supported recommendation and the reason for it. State a hypothesis as a hypothesis and an invented test scenario as a scenario. Do not label an answer as recommended merely to provoke disagreement. If an unknown user priority determines the recommendation, first investigate what evidence can settle, then ask about that priority.

This preserves brainstorming and stress-testing while preventing a deliberately weak guess from impersonating the agent's recommendation.

## Confirmation and shared references

Use the selected confirmation wording in [alignment-proposed-wording.md](alignment-proposed-wording.md): clear approval of a concrete plan is sufficient, whether selected or written. Preserve limits and unresolved conditions; do not infer motives from phrases such as “Sounds good.”

The Brain skills should identify the current question, provide its evidence and context, and use ask-user-question for composition and reply handling. Host details belong in the conditional host references selected by the tool actually available. A Brain skill's own sequence or output requirements must not silently override the shared evidence, waiting, and answer-interpretation rules.

## Implementation checks

- Update the governing instructions and their examples, checklists, and summary tables together. A corrected paragraph with an old checklist still gives competing directions.
- Preserve the Brain skills' domain responsibilities and final-artifact confirmation requirements.
- Test an incomplete answer, a reopened dependency, a proposed interpretation, clear approval, qualified approval, a deferred topic, and a long-delayed reply.
- Check that the working record distinguishes established information from proposals and that the glossary stays a glossary.
- Keep automatic skill selection separate from performance after loading. The new behavior must be evaluated; these wording changes are not evidence of success by themselves.

The supplied archives establish where the conflicts are. Their live source repository and publication state have not been identified. Actual source edits follow the approved file plan; the archives are retained as reference evidence.
