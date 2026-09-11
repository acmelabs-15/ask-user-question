# Codex: two question tools

Read this before the first Codex question call in a session. Match the tool's
actual schema and permitted mode. Source checked for CLI 0.154.0 at commit
`6b9826e3aa83b1a5947db50f4332cb9c65f1b340` on 2026-09-11. This is not proof that
every desktop, web, or third-party client has the same behavior.

## request_user_input

This synchronous form asks for a reply. The agent-facing input contains
`questions`; each has `id`, `header`, `question`, and `options`. Each option has
`label` and `description`.

The specification asks for one to three questions and two to three exclusive
options. This skill asks one. The normalizer requires nonempty options and adds
the host's free-text choice. The recommendation convention is first position
with `(Recommended)` in its label.

```json
{
  "questions": [
    {
      "id": "draft_storage",
      "header": "Drafts",
      "question": "Cross-device recovery requires server storage and sign-in. Keep that requirement, or use browser-only drafts?",
      "options": [
        {
          "label": "Require sign-in (Recommended)",
          "description": "Meets the confirmed recovery requirement, but users must sign in to save drafts."
        },
        {
          "label": "Use browser-only drafts",
          "description": "Avoids sign-in, but revises the requirement because drafts stay on one device."
        }
      ]
    }
  ]
}
```

The model-facing schema has no `multiSelect`, `preview`, timeout, or `isBlocking`
parameter. Broader app-server protocol fields are not permission to add them.

The handler rejects non-root agents and checks its configured available modes.
Do not assume that appearing in documentation means the tool is permitted now.

Replies map the stable question ID to an `answers` array. In the inspected
terminal, a selected label and a note can be separate entries:

```json
{
  "answers": {
    "draft_storage": {
      "answers": ["Require sign-in (Recommended)", "user_note: Keep existing browser drafts readable."]
    }
  }
}
```

That array does not imply a multi-select control. Preserve notes and interpret
what they qualify. An empty or missing answer remains unresolved.

## request_user_input_async

This form emits a question message and returns immediately. Its input contains
`questions`, with a `title` and optional `options` as strings. Omit options for a
free-text-only question. The handler requires a nonempty title and, if supplied,
nonempty option strings.

```json
{
  "questions": [
    {
      "title": "Draft recovery needs one decision.\n\nCross-device recovery is a confirmed requirement. Server storage provides it but requires sign-in.\n\nShould we require sign-in or revise the recovery requirement?",
      "options": [
        "Require sign-in (Recommended): meets cross-device recovery; users must sign in to save drafts.",
        "Use browser-only drafts: avoids sign-in; drafts remain on the current device."
      ]
    }
  ]
}
```

There is no separate header, ID, option-description object, preview, multi-select,
or timeout field. Put necessary context and trade-offs in the supported strings.
The first suggestion is preselected but not submitted automatically.

The immediate result `{"accepted":true}` acknowledges emission, not the user's
answer, successful display, or receipt by the user. A later user message supplies
the reply. Keep dependent work pending and
track which question that message answers. Do not ask the same question again
merely because the reply arrived in chat rather than a structured result.

## Waiting and host expiry

The inspected synchronous handler sets `isBlocking` from whether its allowed
session is in Plan mode. It sets the deprecated `autoResolutionMs` to none.
The native terminal uses `isBlocking`, not that deprecated field:

- Blocking requests have no automatic-resolution timer in this path.
- Non-blocking requests receive sixty seconds of grace followed by a sixty-second
  countdown. Interaction can stop that timer for the request.
- Expiry returns an empty answer map. It supplies no user choice.

The agent cannot override this policy through a field absent from its schema.
Prefer an available, permitted untimed path. Do not silently change the user's
mode or settings. The async handler installs no response timer, but every client's
display lifetime has not been verified.

Add no timer of your own. A polling interval ending does not end the user's turn
to answer. If the host closes the prompt, explain the limitation, preserve the
unanswered decision, and maintain a supported way to reply. Do not fabricate a
timeout parameter or repeatedly cycle the question.

## Evidence

- [Synchronous specification](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/core/src/tools/handlers/request_user_input_spec.rs).
- [Synchronous handler](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/core/src/tools/handlers/request_user_input.rs).
- [Async specification and handler](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/core/src/tools/handlers/request_user_input_async.rs).
- [Terminal waiting and replies](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/tui/src/bottom_pane/request_user_input/mod.rs).
- [App-server documentation](https://learn.chatgpt.com/docs/app-server).

Verify rendering, delayed replies, and cancellation in the intended client.
Source-level behavior is not an end-to-end UI result.
