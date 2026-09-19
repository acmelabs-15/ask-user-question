# Codex question contracts

Verified 2026-09-11. Research only: no settings changed and no live question test run.

## Evidence and scope

The installed CLI reports **codex-cli 0.154.0**. Its package points to OpenAI's Codex repository. The release tag resolves to source commit **6b9826e3aa83b1a5947db50f4332cb9c65f1b340**. The generated app-server TypeScript schema comes from that installed binary.

This session exposes both request_user_input and request_user_input_async, with different availability and contracts. Its declared synchronous tool is Plan-only. The async schema matches the pinned source below. Neither finding proves the behavior of every desktop, web, or third-party client.

Official app-server documentation describes the requestUserInput event and an optional autoResolutionMs field. The installed version's schema marks that field deprecated in favor of isBlocking. Current source therefore qualifies the rolling documentation for this version. [Official app-server documentation](https://learn.chatgpt.com/docs/app-server#toolrequestuserinput).

Local captures are under .firecrawl/host-codex-*. Source paths below are pinned to the verified release commit.

## Synchronous tool: request_user_input

[Model-facing specification](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/core/src/tools/handlers/request_user_input_spec.rs).

- Input: questions array; each question has id, header, question, and options.
- Each option has label and description. The advertised guidance requests 1–3 questions and 2–3 mutually exclusive options. Peter's rule remains one question.
- The specification recommends the first option with a Recommended suffix and says the client supplies a free-text choice. The normalizer requires nonempty options and enables that additional choice.
- No multiSelect, preview, or timeout parameter is offered to the model in this specification.
- Broader protocol types include isOther, isSecret, optional options, isBlocking, and autoResolutionMs. They are not interchangeable with the narrower agent-call schema. Do not copy protocol-only fields into a model call.

[Handler](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/core/src/tools/handlers/request_user_input.rs) rejects non-root agents and checks the configured available modes. For an allowed call, it sets isBlocking from whether the mode is Plan, sets auto_resolution_ms to None, and awaits the response. Cancellation is reported distinctly.

[Protocol response](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/protocol/src/request_user_input.rs): answers maps a stable question ID to an object containing an array of strings. In the inspected terminal, a committed selection contributes its label and a note is appended as an additional string prefixed user_note:. That array is not evidence of a multi-select control. Empty and omitted answers must remain unresolved.

## Asynchronous tool: request_user_input_async

[Specification and handler](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/core/src/tools/handlers/request_user_input_async.rs).

- Input: a nonempty questions array. Each item has a nonempty title containing the whole question and optional options as nonempty strings.
- There is no header, question ID, per-option description object, preview, multiSelect, or timeout field in this schema.
- Omit options for a free-text-only question. The advertised UI always permits free text.
- The first suggested option is preselected, but it is not automatically submitted.
- The handler emits an async question message and returns accepted: true immediately. That result acknowledges delivery, not a user answer. A later reply arrives as a new user message.

For this form, preserve context and trade-offs in the supported title and option strings. Do not invent Claude-style fields. Keep dependent work pending while waiting for the actual reply. The inspected handler installs no response timer; the behavior of every client that displays these messages has not been audited.

## Installed terminal timeout behavior

This is a material difference from merely omitting a timeout field.

The [terminal implementation](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/tui/src/bottom_pane/request_user_input/mod.rs) uses a fixed policy for non-blocking synchronous requests:

- 60 seconds of hidden grace, then a 60-second visible countdown.
- isBlocking true disables automatic resolution. Interaction can also stop the countdown for that request.
- The deprecated autoResolutionMs value does not control this policy.
- On expiry, the terminal sends an empty answer map and closes or advances the request. It does not establish a user choice.

Verified source: constants near lines 69–70; auto_resolution_timing_at near 288–307; submit_empty_auto_resolution near 936–954. The handler sets Plan-mode calls blocking. The model-facing schema provides no direct isBlocking or timeout override.

This mechanism is consistent with the class of incident Peter reports, but it does not identify the cause of his specific encounter. His client, version, mode, and trace were not supplied. Do not claim the reported approximate 30 seconds matches this two-minute policy.

## Guidance to carry into the skill

1. Select the tool actually available and permitted in the session. Identify its fields from the active schema, not from the Codex name alone.
2. Prefer a supported path that preserves the unanswered question without expiry. A blocking request and an async question message are different mechanisms; use their actual semantics. Do not silently change the user's mode or settings.
3. Add no agent-created deadline or polling limit for the user. A wait call ending means only that the wait call ended.
4. Never treat accepted: true, a default option, an empty result, or expiry as an answer. Keep the unresolved decision recorded and dependent work pending.
5. If the only offered surface is known to expire and the agent cannot prevent that, state the limitation and keep a durable, answerable question available through a supported channel. Do not fabricate timeout: 0 or isBlocking fields, repeatedly cycle the dialog, or silently proceed.

This is conditional authoring guidance, not proof that all clients satisfy the waiting requirement. It requires actual delayed-response tests on each intended surface.

## Remaining verification

- Live blocking question: delayed reply still arrives and leads to the intended next step.
- Async question: verify delivery, delayed free-text/selection response, and cleanup after the question is answered in chat.
- Terminal non-blocking path: confirm the inspected countdown behavior and preserve no-answer semantics; do not expose a user to a surprise timer as an evaluation.
- Rendered multiline context, option trade-offs, notes, and cancellation in each target client.
- Whether the user's exact incident came from this native path, a different version, an app wrapper, or agent-written waiting logic.

Source captures: host-codex-handler-request_user_input.rs; host-codex-request_user_input_spec.rs; host-codex-request_user_input_async.rs; host-codex-protocol-request_user_input.rs; host-codex-tui-request-user-input.rs; generated ToolRequestUserInput types under host-codex-schema/v2. All are ignored research captures, not shipped code.
