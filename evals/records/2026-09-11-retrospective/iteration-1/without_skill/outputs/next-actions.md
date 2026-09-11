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

- A weekly email digest is a possible later addition.

### Proposed request_user_input_async call

Members need to read all workspace notes. Guests have no workspace access, and the weekly email digest can wait until later. Should members also edit notes, or should only administrators edit them?

- Members and administrators can edit
- Only administrators can edit

## investigate-not-delegate

Action: update_guide_and_verify

The guide describes API v1. API v2 requires an array of strings, and the client already sends that format and passes its v2 contract test. I’ll update the guide for API v2 and verify its examples against the schema.

### Settled

- The guide must be updated to API v2.
- API v2 requires columns to be an array of strings.
- The current client matches that requirement and its v2 contract test passes.

## wait-for-answer

Action: wait_for_user_reply

### Settled

- The draft is checked.
- The publishing permission question was emitted.

### Pending

- The user's permission to publish.

### Deferred

- Publishing remains on hold until the user approves.

## qualified-approval

Action: implement_locally_and_verify

I’ll add arrow-key navigation and visible focus to the local prototype, then verify both. The prototype will stay local.

### Settled

- The user approved adding arrow-key navigation and visible focus.
- The prototype must remain local and must not be published.

## reversible-choice

Action: apply_inline_label_change_and_verify

I’ll format the label inline because it is used at one call site, then run the focused behavior check.

### Settled

- The user authorized the local label change.
- Both implementations provide the same behavior.
- Use inline formatting for this single call site.

## repair-the-scope

Action: ask_one_separate_question

### Settled

- Saving and sharing are separate decisions and must be asked separately.

### Pending

- Whether notes save automatically or only after an explicit save action.
- Whether saved notes are private or team-visible.

### Deferred

- Ask about sharing after the saving decision is answered.

### Proposed request_user_input_async call

I combined two separate decisions. Let’s decide saving first; sharing is still undecided. Should a note save automatically as you edit, or only when you choose Save?

- Save automatically
- Save only when I choose Save
