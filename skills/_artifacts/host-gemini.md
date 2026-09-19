# Host contract: Gemini CLI

Verified by official documentation and source on 2026-09-11. This is a research artifact; no packages, settings, or live questions were changed or tested.

## Scope and version

This contract is for **Gemini CLI**, not every product named Gemini, an arbitrary Gemini API application, or Antigravity. The official [ask-user documentation](https://geminicli.com/docs/tools/ask-user/) currently carries a notice that unpaid-tier and Google One users transitioned to Antigravity CLI on 18 June 2026. Do not assume those hosts share this contract.

- Official repository: `google-gemini/gemini-cli`.
- Main source inspected: [`ed2ac40df67a319bf348bd7e3d10494696b31b38`](https://github.com/google-gemini/gemini-cli/commit/ed2ac40df67a319bf348bd7e3d10494696b31b38). Its root package version is `0.61.0-nightly.20260908.gc647533d6`.
- Latest stable release returned by GitHub: [`v0.59.0`](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0), published 8 September 2026, commit `fb0d535af931b27c51e87e5e6ade72905b1e8390`.
- The stable `ask-user.ts` and scheduler `confirmation.ts` were byte-identical to the inspected main versions. The stable default tool schema has the same question fields and limits described below. UI and configuration findings below are pinned to main; they were not separately compared against stable.

## Native call

Tool name: **`ask_user`**. Display name: **Ask User**.

Input is an object with `questions`, an array with 1–4 entries. Peter's one-question rule should narrow this to one entry per call.

Each question has:

- `question`: required string; complete question text.
- `header`: required string; short dialog label. Documentation says at most 16 characters. The inspected JSON schema has no `maxLength`; distinguish the documented writing limit from an enforced schema limit.
- `type`: **required by the current schema**, with `choice`, `text`, or `yesno`. The schema also declares a default of `choice`. Documentation calls this field optional, so send it explicitly rather than depending on the inconsistent default claim.
- `options`: required in practice for `choice`, with 2–4 objects. Each has required `label` and `description` strings. A label must be nonempty after trimming; descriptions may be empty strings in implementation. The schema's writing guidance says labels use 1–5 words; no word-count validator appears in the inspected implementation.
- `multiSelect`: optional boolean; applies to `choice`.
- `placeholder`: optional input hint. For `text`, it belongs to the main input; for `choice` and `yesno`, to the custom answer input.

There is no model-supplied question ID, recommendation field, default-answer field, or response-timeout parameter in this schema. The internal `Question` TypeScript interface includes `unconstrainedHeight`, but it is not exposed by the inspected public tool schema; do not use it as a portable call field.

Primary evidence: [stable schema, lines 635–710](https://github.com/google-gemini/gemini-cli/blob/fb0d535af931b27c51e87e5e6ade72905b1e8390/packages/core/src/tools/definitions/model-family-sets/default-legacy.ts#L635), [validation, lines 45–88](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/tools/ask-user.ts#L45), [internal types, lines 174–213](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/confirmation-bus/types.ts#L174). The Gemini 3 schema also requires `type` and exposes these fields.

## Choices, free text, and rendering

`choice` and `yesno` receive a host-provided custom answer input. Do not add a duplicate Other option. `yesno` is converted by the UI to Yes and No with `multiSelect: false`. For a `choice` with `multiSelect: true`, the host adds All of the above when there is more than one standard option, plus a Done control. The agent supplies only the actual domain options.

Question text uses the host's Markdown renderer. Option descriptions use its inline Markdown renderer. Rendering is constrained by available terminal width and height, so source support for Markdown is not a guarantee that a long dialog remains readable or fully visible. No rendered UI check was performed.

Primary evidence: [dialog option construction, lines 730–779](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/AskUserDialog.tsx#L730), [yes/no conversion, lines 1184–1196](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/AskUserDialog.tsx#L1184), [text rendering, lines 373–406](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/AskUserDialog.tsx#L373).

## Reply shape and cancellation

Successful execution gives the model `llmContent` as a JSON string, for example:

```json
{"answers":{"0":"Selected label or typed answer"}}
```

Keys are zero-based question positions, not labels or headers. Values are strings. For multiple selections, the UI joins selected labels and custom text with comma-space. It does **not** return an array or separately identify the custom answer. Preserve and interpret that text against the options; blindly splitting commas can corrupt labels or a user's prose.

Blank answers are omitted by the UI reducer. A submitted empty answer map produces `{"answers":{}}` and an `empty_submission` metric. This is explicit submission without an answer, not elapsed-time silence and not authorization to use a default.

Cancellation has more than one observable path. `ask-user.ts` contains a dismissal result with the text `User dismissed ask_user dialog without answering.` However, the native confirmation UI sends `ToolConfirmationOutcome.Cancel`; the scheduler marks the call cancelled, cancels queued calls, and skips execution. Do not promise that every dismissal reaches the model as the tool's dismissal text or JSON. Honor the actual host cancellation/result state.

Primary evidence: [tool result handling, lines 187–233](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/tools/ask-user.ts#L187), [answer serialization, lines 627–648](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/AskUserDialog.tsx#L627), [blank-answer reducer, lines 126–156](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/AskUserDialog.tsx#L126), [UI submit/cancel callbacks, lines 547–555](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/messages/ToolConfirmationMessage.tsx#L547), [scheduler cancellation, lines 712–723](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/scheduler/scheduler.ts#L712).

## Availability and enablement

The main tool registry registers `AskUserTool` through the general core-tool path, outside the subsequent plan-mode gate. It is not a plan-only tool. If `tools.core` is set, that setting acts as the built-in-tool allowlist; otherwise tools are enabled by default in this registration helper. Runtime policy can still deny execution.

The CLI explicitly excludes `ask_user` in **non-interactive mode and ACP mode**. Its source explains that ACP IDE permission interception breaks conversational flows. A non-interactive policy also denies it. Do not tell a Gemini CLI ACP/IDE or headless user that the native dialog is available merely because the model is Gemini. Inspect the session's available tools; do not silently modify settings to expose it.

Primary evidence: [core registration helper, lines 3935–3965](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/config/config.ts#L3935), [registration outside plan gate, lines 4041–4055](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/config/config.ts#L4041), [CLI exclusions, lines 793–806](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/config/config.ts#L793), [settings mapping, line 979](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/config/config.ts#L979), [non-interactive policy](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/policy/policies/non-interactive.toml).

## Waiting and ownership of cancellation

Official docs say execution pauses until an answer or dismissal. In the reviewed implementation, the confirmation listener waits for a response with the matching correlation ID, or the supplied `AbortSignal` aborts. The listener itself does not install a response deadline. A source comment recommends that an embedding caller manage lifecycle, possibly with a timeout; that comment is advice to runtime authors, not an agent instruction or an actual timeout installed by this function. The reviewed scheduler and React scheduler hook pass their caller's signal through.

The dialog handles explicit Escape cancellation. Ctrl-C can also reach cancellation and application exit. No timer or idle-default logic was found in the dialog. This supports waiting for the user without an agent deadline. It does not prove that every embedding host, terminal process, or upstream caller waits forever: those can terminate or abort the operation.

**Proposed skill guidance from Peter's requirement:** submit one native question and wait. Do not set an agent response deadline, infer cancellation from elapsed time, or choose an answer because the user is idle. If the host actually cancels, errors, or closes, distinguish that event from an answer and leave the decision unresolved. Never disguise a host interruption as a user decision. Host timeout settings or lifecycle changes remain outside this skill's question-composition scope.

Primary evidence: [confirmation listener, lines 51–103](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/scheduler/confirmation.ts#L51), [scheduler passes signal, lines 681–692](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/core/src/scheduler/scheduler.ts#L681), [hook passes signal, lines 211–217](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/hooks/useToolScheduler.ts#L211), [dialog cancellation, lines 1070–1086](https://github.com/google-gemini/gemini-cli/blob/ed2ac40df67a319bf348bd7e3d10494696b31b38/packages/cli/src/ui/components/AskUserDialog.tsx#L1070).

## Boundaries and captures

Verified: documented and source-level contracts, current upstream main, and the noted stable-source comparisons. Unverified: Peter's installed Gemini CLI version, session tool visibility, live dialog rendering, end-to-end cancellation output, and upstream lifecycle signals in every embedding. No live question was sent.

Captures use `.firecrawl/host-gemini-*`: developer-index results, docs, repository inventory, source files, and stable comparisons. The retrieval used the developer index first, followed by official documentation and pinned GitHub source. No third-party description was used to establish behavior.
