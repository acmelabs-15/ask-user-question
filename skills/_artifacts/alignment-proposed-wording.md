# First Brain alignment decision — confirming a plan

Status: Choice A accepted; implementation wording retained for the file plan. No source skill has been edited.

Peter replied “okay, sounds good to me?” to the recommendation to avoid repeating clear approval, then asked about scaffold progress. His subsequent “sounds good” accepts continuing that flow. This records agreement with Choice A, not approval of unspecified implementation or publication.

## What disagrees

The supplied interview-me reference requires an explicit yes. It rejects “Sounds good” and may treat “Sure, let's go” as a polite exit. Source: references/intent-mode.md:55-57 in the archive identified in discovery-notes.md.

Peter's requirement is to interpret his actual meaning, preserve conditions, and avoid inventing motives or missing decisions. That already rules out assuming that an affirmative phrase means he gave up. It does not by itself decide whether every interview should end with a dedicated confirmation step.

The choice was **whether clear approval already given is sufficient, or whether the workflow always requests a separate final confirmation**. Choice A is selected. The alternative remains below as a record of the trade-off, not an open question.

## Shared replacement

Both choices use this text:

> Before implementation, state the agreed outcome, scope, important decisions, and any unresolved conditions. Read the user's reply against that specific work. Preserve qualifications and changes. If the reply or its scope is unclear, identify the exact uncertainty and ask one focused follow-up. A confidence score, silence, or an assumed motive is not approval. Keep work that depends on an unanswered question pending.

This retains a concrete understanding check and the user's control. It removes unsupported guesses about politeness or fatigue.

## Selected — clear approval in context

Selected addition:

> Clear approval of that concrete work is sufficient, whether the user selects an answer or writes it. Do not request the same approval again merely because the wording differs from an expected label. Ask again only when meaning, scope, or a newly introduced condition remains unresolved.

Result: “Sounds good” can approve the concrete plan it directly answers. “Sounds good, but do not implement yet” does not authorize implementation. The agent must inspect context and qualifications rather than match one magic phrase.

Reason for the recommendation: Peter requires meaning-based reply handling and one purposeful question at a time. This avoids asking again when the relevant decision is already clear.

Cost: the agent must correctly identify the particular work being approved. Later evaluation must include ambiguous context and qualified replies; this text has not been tested.

## Alternative considered — a separate final confirmation

Alternative addition:

> End the interview with a dedicated confirmation of the concrete work before implementation. Even if the user expressed agreement during the discussion, obtain this final confirmation. Accept a clear selection or written answer to that confirmation; do not infer a motive from its phrasing.

Result: the workflow adds an explicit transition from discussion to implementation. Earlier agreement does not remove this final step.

Cost: the user may repeat approval they already gave. The additional step must still explain what work is being authorized and preserve any conditions.

## How the chosen rule is implemented

Replace the approval paragraph in interview-me/references/intent-mode.md with the shared replacement and selected addition. Align its checklist and the corresponding Common Rationalizations, Red Flags, and Verification entries in interview-me/SKILL.md. Remove phrases that assign an unsupported motive to the user's answer.

The shared ask-user-question instructions continue to interpret replies and report their scope. The larger interview workflow determines whether a dedicated final confirmation is required. The chosen step must not be disguised as re-confirming an unclear answer.

Test at least: clear written approval; clear selection; approval with a limiting condition; agreement without permission to implement; explicit request to wait; and ambiguity about which plan is being approved. For Choice B, also check that the final step occurs once and does not become a repeated confirmation loop.

These are proposed edits against the supplied archive. The live Brain source location and publication process are not established by this proposal. No archive, installed skill, or public repository has changed.
