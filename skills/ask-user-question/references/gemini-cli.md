# Gemini CLI: ask_user

Read this before the first `ask_user` call or when interpreting its result.
Checked on 2026-09-11 against main commit
`ed2ac40df67a319bf348bd7e3d10494696b31b38`, with tool/schema comparisons to stable
0.59.0. This contract is for Gemini CLI, not every product using a Gemini model.

## Compose the call

The schema requires `questions`, with one to four entries. Ask one.
Each question requires `question`, `header`, and an explicit `type`:

- `choice`: supply two to four `options`, each with `label` and `description`.
  Set `multiSelect` only when the actual choices can combine.
- `text`: request a free-form answer; an optional `placeholder` can guide it.
- `yesno`: the host supplies Yes, No, and a custom-answer path.

Some documentation describes `type` as optional. The inspected schema requires
it, so send it explicitly. Header length guidance and label word counts are
writing guidance; do not mistake them for validators not present in the schema.

```json
{
  "questions": [
    {
      "header": "Draft storage",
      "type": "choice",
      "question": "Cross-device recovery is required. Server storage meets it but requires sign-in. Should we require sign-in or revise that requirement?",
      "multiSelect": false,
      "options": [
        {
          "label": "Require sign-in (Recommended)",
          "description": "Meets cross-device recovery. Users must sign in before saving a draft."
        },
        {
          "label": "Use browser drafts",
          "description": "Avoids sign-in. Drafts stay on the current device, so the recovery requirement changes."
        }
      ]
    }
  ]
}
```

The host provides a custom-answer path for choice and yes/no questions. It adds
All of the above and a Done control to applicable multi-select questions. Supply
the domain choices, not copies of those controls.

No response timeout, recommendation flag, or agent-supplied question ID appears in
this schema. An internal TypeScript field is not automatically a public parameter.

## Read the result

Successful execution returns JSON content with string answers keyed by the
question's zero-based position:

```json
{"answers":{"0":"Require sign-in (Recommended)"}}
```

For multiple selections, the inspected UI joins labels and custom text with
comma-space. The value remains a string. Match known labels carefully and preserve
the rest as user text; commas inside labels or prose make blind splitting unsafe.

Blank submitted answers may be omitted. An empty map does not choose a default.
Native cancellation can stop the scheduled tool instead of returning its own
literal dismissal message. Interpret the actual result or cancellation event;
do not assume that every dismissal has one JSON shape.

## Availability and rendering

The inspected CLI excludes `ask_user` in headless and ACP/IDE mode. General
interactive registration is not limited to Plan mode, but policy or an allowlist
can still remove it. Check the active tool inventory and instructions.

The inspected dialog renders question text as Markdown and descriptions as inline
Markdown. This does not establish that every long question fits its available
space. Put necessary information in supported visible fields and verify the
rendered result on the intended surface.

## Waiting

The reviewed confirmation listener waits for a matching response or an upstream
abort signal. It installs no user-response deadline, and the inspected dialog has
no idle-answer timer. That does not prove an embedding host cannot abort it.

Ask and wait. Add no agent deadline, idle inference, or assumed default. If the host
actually cancels or errors, preserve the unresolved decision and explain what
happened. A source comment recommending lifecycle management for runtime authors
is not permission for the agent to time out the user.

## Evidence

- [Official tool documentation](https://geminicli.com/docs/tools/ask-user/).
- [Stable schema](https://github.com/google-gemini/gemini-cli/blob/fb0d535af931b27c51e87e5e6ade72905b1e8390/packages/core/src/tools/definitions/model-family-sets/default-legacy.ts#L635).
- [Validation and returned content](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/tools/ask-user.ts).
- [Native dialog](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/AskUserDialog.tsx).
- [Availability](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/config/config.ts#L793).
- [Confirmation wait](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/scheduler/confirmation.ts#L51).

Live delayed-response, cancellation, and rendering checks remain required before
claiming end-to-end support for a particular installed client.
