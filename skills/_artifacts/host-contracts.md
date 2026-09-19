# Question tools — shared behavior and host differences

Research completed 2026-09-11. The selected hosts are Claude Code, Codex, and Gemini. The communication cycle stays one skill; its tool instructions must match the tool actually offered in the session.

## The main differences

| Host and source scope | Tool | Shape that matters | Waiting behavior |
| --- | --- | --- | --- |
| Claude Code; installed 2.1.268 and current official docs | AskUserQuestion | Question, header, label/description options, multiSelect, optional preview; answers keyed by question text. | Default is no expiry. User/managed auto-continue settings or an environment override can close it. No documented per-call timeout. |
| Codex; installed CLI 0.154.0 and matching source | request_user_input | Stable question ID, header, question, label/description options; reply values are arrays keyed by ID. | Plan-mode handler requests are blocking. The inspected terminal auto-resolves non-blocking requests after its fixed grace/countdown. No agent-call timeout override. |
| Codex; same source and this session's declared tool | request_user_input_async | A title containing the question; optional answer strings. No per-option description object. | Returns accepted immediately; the answer arrives later as a user message. Its handler sets no response timer. Client-level display lifetime remains to be tested. |
| Gemini CLI; pinned main and stable 0.59.0 comparisons | ask_user | Explicit choice/text/yesno type, header, optional choice options and multiSelect; string answers keyed by question position. | The reviewed path awaits a response or upstream cancellation and installs no answer deadline. It is excluded in headless and ACP modes. |

The detailed reports separate documented guidance, enforced schema, inspected source, and untested UI behavior: [Claude Code](host-claude-code.md), [Codex](host-codex.md), [Gemini CLI](host-gemini.md).

## Waiting rule

Peter's requirement applies before and after the tool call:

1. Ask one question through an available supported surface.
2. Wait for the user's actual answer. Do not create a response deadline, infer idle status, close the question on elapsed time, or select a default.
3. Keep dependent work pending. An accepted/delivered notification is not an answer.
4. If a host independently expires or cancels the request, preserve the unresolved question and explain the actual limitation. Keep a supported way to answer; do not disguise closure as consent or repeatedly cycle the prompt.

A skill cannot override a host policy through a field the tool does not expose. Prefer a supported untimed path. Do not guess that timeout zero disables expiry: Claude Code documents the opposite for its AFK environment override. Configuration changes are separate from this research and have not been made. [Anthropic environment reference](https://code.claude.com/docs/en/env-vars).

The installed Codex source exposes a specific host-controlled countdown for non-blocking native terminal requests: 60 seconds of grace followed by a 60-second countdown. This is not proof of what caused Peter's reported encounter. The client, version, and mode of that encounter remain unknown. [Pinned Codex terminal source](https://github.com/openai/codex/blob/6b9826e3aa83b1a5947db50f4332cb9c65f1b340/codex-rs/tui/src/bottom_pane/request_user_input/mod.rs#L288).

## Consequences for authoring and evaluation

- Keep the evidence, language, layout, and repair principles in the shared skill.
- Load only the host reference matching the active tool. Codex has two distinct call forms; a product name is not enough to choose fields.
- Keep required context and option consequences in fields the selected layout actually displays.
- Preserve actual reply types and notes. Do not copy Claude's answer-key convention into Codex or Gemini, or treat a list of strings as proof of multi-select.
- Verify delayed reply, cancellation, free text, notes, and rendered choices on each intended interface. These are required future checks, not completed tests.
- Do not claim universal support for every app named Codex or Gemini from CLI source alone. Unsupported surfaces must remain explicit.

No live question, settings change, skill rewrite, or host patch was performed during this research. The source findings are sufficient to plan conditional host references; final rendered and delayed-response behavior remains unverified.
