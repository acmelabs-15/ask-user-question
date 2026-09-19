# Claude Code question contract

Verified 2026-09-11 from official Anthropic documentation and the official release API. Read-only research: no settings changes, installs, live question tests, or external feedback.

## Version and evidence scope

- Installed CLI: `claude --version` returns `2.1.268 (Claude Code)`.
- Official latest release API: `v2.1.268`, published `2026-09-10T20:30:54Z`; https://github.com/anthropics/claude-code/releases/tag/v2.1.268 . Capture: `.firecrawl/host-claude-version.json`.
- The documentation below is current rolling documentation, not a source snapshot pinned to that release. Specific minimum versions are recorded where the docs state them.
- No claim below relies on the repository's historical 2.1.241 audit or third-party prompt leaks.

## Native question behavior

Official reference: https://code.claude.com/docs/en/tools-reference#askuserquestion-tool-behavior

Capture: `.firecrawl/host-claude-tools-reference.md:102–108`.

Claude Code asks multiple-choice questions; users can select an option, type through Other, or use notes. The docs explicitly say typed replies are relayed neutrally so requests to wait or explain can be followed. Questions stay open by default.

If auto-continue is enabled, idle expiry closes the dialog, submits already-selected options, and tells the agent the user may be away and it can continue. The last 20 seconds show a countdown. Keyboard input restarts it; terminal focus can restart it where supported. Permission prompts and plan approval do not use this idle auto-resolution behavior.

This is host behavior. It does not establish that a delayed user is away, or that an auto-submitted selection expresses a completed decision.

## Inputs, replies, and caps

Official schema: https://code.claude.com/docs/en/agent-sdk/typescript#askuserquestion

Capture: `.firecrawl/host-claude-sdk-typescript.md:2456–2474,3218–3240`.

Documented `AskUserQuestionInput`:

- `questions[]`: `question`, `header`, `options[]`, `multiSelect`.
- Each option: `label`, `description`, optional `preview`.
- Optional top-level fields: `answers`, `annotations` (preview/notes), `metadata.source`.
- **No per-call timeout field is documented.** `afkTimeoutMs` appears in the output type, not the input type.

Output contains questions and answers; optional `response`, `annotations`, and `afkTimeoutMs` distinguish further reply information. A general freeform response replaces the per-question answer list in the rendered response to Claude. Preserve annotations and response meaning rather than classifying intent solely by option labels.

Caps and SDK handling: https://code.claude.com/docs/en/agent-sdk/user-input#question-format

Capture: `.firecrawl/host-claude-user-input.md:499–638,804–807`.

- 1–4 questions per call; 2–4 options per question; header at most 12 characters. Peter's one-question rule remains stricter than the host maximum.
- Answers are keyed by full question text, with selected labels as values. The guide accepts multi-select arrays or comma-separated labels; the published TypeScript type uses string values. Prefer the installed tool's actual schema when authoring integrations.
- Other text belongs in the question's answer value; top-level `response` represents a general reply instead of structured answers.
- TypeScript SDK preview generation is opt-in via session `toolConfig.askUserQuestion.previewFormat`: markdown or HTML. Default unset means no previews. HTML fragments reject script/style/doctype. These are SDK host features, not proof of terminal layout.

Current official pages do not fully specify terminal focus defaults, label truncation, all keyboard behavior, or side-by-side preview restrictions. Those require current terminal verification before being presented as universal rules.

## Timeout configuration and ownership

Official setting: https://code.claude.com/docs/en/settings-reference#askuserquestiontimeout

Capture: `.firecrawl/host-claude-settings-reference.md:2425–2442`.

`askUserQuestionTimeout` supports `"60s"`, `"5m"`, `"10m"`, and `"never"`; default is `"never"`, from Claude Code v2.1.200. Its scope is user or managed settings. `/config` exposes Question auto-continue timeout and writes user settings; that row is hidden when managed settings or `--settings` set it. A project skill cannot disable the timer through the question input.

Official environment reference: https://code.claude.com/docs/en/env-vars

Capture: `.firecrawl/host-claude-env-vars.md:175–176,366`.

`CLAUDE_AFK_TIMEOUT_MS` overrides the setting and **enables** auto-continue even if the setting is unset or `never`. Zero closes immediately; it does not disable the timer. Versions 2.1.198 and 2.1.199 had a 60-second default. `CLAUDE_AFK_COUNTDOWN_MS` changes only the countdown display (default 20 seconds). `CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS` does not govern AskUserQuestion or permission prompts.

For indefinite native questions, configuration must have `askUserQuestionTimeout` unset/never and no AFK timeout environment override. This report has not inspected or changed Peter's effective configuration. The historical 60-second bug is not evidence of a current default 30-second limit.

## SDK and noninteractive availability

SDK lifecycle: https://code.claude.com/docs/en/agent-sdk/user-input

Capture: `.firecrawl/host-claude-user-input.md:9,395,804–807`.

`canUseTool` pauses execution while awaiting input. Official docs explicitly allow indefinite pending callbacks; cancellation occurs when the query itself is cancelled. A host may instead persist a deferred tool call for later resumption. Questions must be included if an app restricts its tools. The docs say AskUserQuestion is unavailable in Agent-tool subagents.

Headless reference: https://code.claude.com/docs/en/headless#turn-off-permission-prompts-in-unattended-runs

Capture: `.firecrawl/host-claude-headless.md:231,240–250`.

`--permission-prompts none` removes person-input tools including AskUserQuestion (requires v2.1.259). `dontAsk` denies it even if an allow rule matches. An SDK/headless host can collect input through its callback; plain unattended execution must not be described as automatically having an interactive question surface.

## Proposed host instructions for the skill

These combine the verified contract with Peter's explicit requirement:

1. Ask one question and await the user's reply. Add no response deadline, elapsed-time inference, cancellation timer, or default selection.
2. Treat a timeout/AFK result as an unanswered question, including any selection the host auto-submitted. Do not promote it to settled intent or authorization.
3. If the host closes a pending question, preserve the unresolved decision and wait for user input through an available supported surface. Do not repeatedly cancel/reopen or advance dependent work.
4. Preserve genuine cancellation, freeform responses, and notes as user communication. A request to explain calls for explanation; it is not a rejected option by default.
5. Keep configuration guidance separate from question composition. A skill cannot guarantee indefinite display against an environment override, query cancellation, or app-specific timer. State a verified host limitation precisely and preserve the unanswered state.

## Remaining verification

- Test native no-expiry behavior beyond the reported 30-second interval and the historical 60-second interval, with effective AFK override absent.
- Test delayed selection, typed notes, freeform reply, cancellation, and multi-select. Verify the actual returned payload, not just visible dismissal.
- Verify terminal preview/layout restrictions before retaining old terminal gotchas.
- For custom SDK apps, verify no wrapper timer cancels the query or resolves the callback without the user; then verify reply → next intended prompt.
- User configuration inspection or changes need their own authorized setup task; none were done here.
