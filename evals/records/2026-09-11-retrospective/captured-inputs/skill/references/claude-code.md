# Claude Code: AskUserQuestion

Read this before the first `AskUserQuestion` call in a session, or when its reply
contains notes, a general response, or timeout metadata. Checked against official
documentation on 2026-09-11; installed CLI at that check: 2.1.268. The documentation
is rolling. Terminal rendering has not been tested by this skill.

## Compose the call

The documented input has `questions`; each question has `question`, `header`,
`options`, and `multiSelect`. Options contain `label`, `description`, and optional
`preview`. Other documented top-level fields are `answers`, `annotations`, and
`metadata`. There is no documented per-call timeout parameter.

Ask one question. The host documents up to four questions and two to four options;
those maxima are not a reason to batch. Keep the header within its documented
twelve-character guidance. Select `multiSelect` only when the choices can combine.

Complete illustrative input:

```json
{
  "questions": [
    {
      "header": "Drafts",
      "question": "Cross-device draft recovery is required. Server storage provides it but requires sign-in. Should drafts require sign-in, or should we revise the recovery requirement?",
      "multiSelect": false,
      "options": [
        {
          "label": "Require sign-in (Recommended)",
          "description": "Meets the cross-device requirement. Users must sign in before saving a draft."
        },
        {
          "label": "Revise recovery requirement",
          "description": "Keeps browser-only drafts without sign-in. Drafts remain on the current device."
        }
      ]
    }
  ]
}
```

The host supplies a custom-answer path. Do not add a duplicate Other option.
Keep required context in the call, not in surrounding prose.

## Read the result

The documented output includes `questions` and `answers`, with optional `response`,
`annotations`, and `afkTimeoutMs`.

- `answers` is keyed by the full question text. The TypeScript output type uses
  string values. Read them against the question and its actual options.
- `response` can carry a general typed reply instead of per-question answers.
- `annotations` can contain notes and preview information. Preserve qualifications.
- A multi-select answer may be represented as comma-separated labels. Match known
  labels and preserve other text; do not split a person's prose blindly on commas.
- `afkTimeoutMs` signals host timeout handling. It is not an input field or proof
  that the user completed a decision.

Treat a request to explain, wait, change direction, or limit scope as that request.
The input mechanism does not establish the user's motive.

## Layout and availability

The SDK supports optional preview configuration through
`toolConfig.askUserQuestion.previewFormat`. That does not establish how a native
terminal, IDE, or custom SDK UI displays every field.

Use a preview only after checking that the actual layout preserves the required
context, costs, and reply paths. Do not carry assumptions about hidden descriptions,
Markdown, focus, or truncation from an older host audit into a different client.

Official documentation excludes this tool from Agent-tool subagents.
`--permission-prompts none` removes user-input tools in unattended runs; `dontAsk`
denies this interaction. An SDK host can collect input through `canUseTool`.
Follow the tools actually offered in the active session.

## Waiting

Native questions wait indefinitely by default. The user/managed setting
`askUserQuestionTimeout` can enable auto-continue with `60s`, `5m`, or `10m`;
the default is `never`.

`CLAUDE_AFK_TIMEOUT_MS` overrides that setting and enables expiry even when it is
unset or `never`. **Zero expires immediately; it does not disable expiry.**
`CLAUDE_AFK_COUNTDOWN_MS` changes the countdown display, not the answer deadline.

These are host configuration controls, not call fields. Add no agent-created
timer. Do not silently modify settings. If host expiry occurs, keep the decision
unanswered, including where the host submits a highlighted selection. Explain
the limitation and preserve a supported way to answer.

The SDK documentation allows an input callback to remain pending indefinitely;
cancelling its query cancels the callback. Do not cancel a query merely because
the user has not answered quickly.

## Evidence

- [Tool behavior and auto-continue](https://code.claude.com/docs/en/tools-reference#askuserquestion-tool-behavior).
- [TypeScript input and output](https://code.claude.com/docs/en/agent-sdk/typescript#askuserquestion).
- [SDK interaction lifecycle](https://code.claude.com/docs/en/agent-sdk/user-input).
- [Timeout setting](https://code.claude.com/docs/en/settings-reference#askuserquestiontimeout).
- [Environment overrides](https://code.claude.com/docs/en/env-vars).

Source inspection is not a live UI test. Verify the actual delayed-response and
rendering behavior before claiming an interface satisfies the waiting requirement.
