# Simulated next actions

These are model proposals, not executed actions or live questions.

## partial-and-later

Action: ask_question

### Settled

- Members can read all workspace notes.
- Guests have no workspace access.

### Pending

- Whether members can edit workspace notes.

### Deferred

- Weekly email digest, requested for later.

### Proposed request_user_input_async call

Members can read all workspace notes, and guests have no workspace access. I have set the weekly digest aside for later. Should members also edit notes? I recommend administrator-only editing until you want members to change shared content.

- Only administrators can edit
- Administrators and members can edit

## investigate-not-delegate

Action: update_guide_and_verify

The guide shows the API v1 format. API v2 requires an array of strings, and the client already sends that format and passes its v2 contract test. I will update the guide for API v2 and check its examples against the schema.

### Settled

- The guide must describe API v2.
- The columns value must be an array of strings.
- The current client matches the v2 contract.

## wait-for-answer

Action: wait_for_existing_question_reply

### Settled

- The draft is checked.
- The publishing permission question has been emitted.

### Pending

- The user's permission to publish.

## qualified-approval

Action: implement_locally_and_verify

I will add arrow-key navigation and visible focus, then verify both in the local prototype. I will keep the prototype local.

### Settled

- The user approved the keyboard navigation and visible focus plan.
- The prototype must remain local and must not be published.

## reversible-choice

Action: apply_inline_label_change_and_verify

I will format the label inline because it has one call site, then run the focused behavior check.

### Settled

- The local display-label change is authorized.
- Inline formatting is sufficient for this single call site and is easy to reverse.

## repair-the-scope

Action: ask_one_separate_question

### Pending

- Whether local notes save automatically or through an explicit save action.
- Whether saved notes are private or team-visible.

### Proposed request_user_input_async call

You are right. I combined two separate decisions. First, how should a local note be saved? I recommend automatic saving so you do not need an extra action to keep your changes. Sharing is still undecided; I will ask about that separately.

- Save automatically
- Save only when I choose Save
