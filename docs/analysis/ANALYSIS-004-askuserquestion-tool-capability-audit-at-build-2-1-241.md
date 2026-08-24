---
title: "ANALYSIS-004: AskUserQuestion Tool Capability Audit at Build 2.1.241"
type: analysis
status: DRAFT
permalink: analysis/analysis-004-askuserquestion-tool-capability-audit-at-build-2-1-241
tags:
- analysis
- ask-user-question
- tool-contract
- rendering
- claude-code
---

# ANALYSIS-004: AskUserQuestion Tool Capability Audit at Build 2.1.241

> What the AskUserQuestion tool actually does in Claude Code 2.1.241, read out of the shipped renderer rather than inferred from screenshots or documentation. Answers the per-field rendering question that a design decision is blocked on, corrects four claims the current skill makes, audits the prior tool contract claim by claim, and lists the capabilities nothing in the project is using.

## Context

Three documents describe this tool and none of them was written against the current build. The skill at `skills/ask-user-question/SKILL.md` carries a Gotchas section written from observed behaviour. The retired contract at `asking-users-questions/skills/asking-users-questions/references/tool-contract.md` was verified across builds 2.1.218 to 2.1.221 and is now twenty releases stale. The published Anthropic guide describes a host-integration contract and says almost nothing about rendering.

A design decision is blocked on one question in particular: what can be put in each field and survive to the screen. Screenshots established that newlines are preserved, that markdown does not render, that indentation holds, and that emoji degrade. Those observations are correct but they do not say why, they do not say where the limits are, and they cannot distinguish a field that preserves newlines from a field that silently replaces them.

This note answers those from the code that runs.

## Executive Summary

The single most consequential finding is that **previews are on by default in a terminal Claude Code session**. The current skill says the field should be left alone unless a host opted in; the opposite is true. `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` defaults to `markdown` for the `cli`, `github-action` and `claude-vscode` client types, and it defaults to unset only for the SDK entrypoints, `claude-desktop`, `local-agent` and `remote`. Worse for the current guidance, **nothing in the renderer consults that setting at all**: the preview layout is chosen whenever a single-select question carries a preview, whatever the format resolves to. The setting gates only two things — whether preview guidance is appended to the tool prompt, and whether HTML shape validation runs.

The second finding answers the rendering question directly. The four author-facing fields go through three different pipelines. `preview` is the only one that renders markdown, and it renders it fully — bold, headings, lists, blockquotes, links, and fenced code blocks with syntax highlighting. `question` is plain text with newlines preserved. `label` and `description` are plain text with **newlines destroyed**, replaced by U+FFFD, which is why a multi-line description arrives as a line with a replacement character in it rather than as two lines.

The third finding closes both of the gaps ANALYSIS-005 left open. The host measures width with `Bun.stringWidth(s, { ambiguousIsNarrow: true })`, not `String.length`, so East Asian Ambiguous characters count as one cell in every calculation Claude Code performs. The pane widths are fixed and now known: the option column is exactly 30 columns, the preview pane is terminal columns minus 34, and the preview box holds terminal rows minus 26 lines before it truncates.

Four claims in the current skill are wrong at this build, and three of them would cause a bad call rather than merely a missed opportunity. Six capabilities are documented nowhere and are unused.

## Approach

Primary source was the shipped binary at ``<claude versions dir>/2.1.241``, a Bun standalone executable whose bundled JavaScript is stored as readable text. Locations were found by byte offset with `grep -a -b -o` and read back with random-access seeks; every claim below traces to a byte offset in that file. The identifiers are minified and are renamed every release, so they are given here as landmarks for a re-read of this build, not as stable names.

Width classes were measured on this machine by calling `Bun.stringWidth` directly with both ambiguity settings, which is the same function the renderer calls, so the numbers are the host's own arithmetic rather than an independent implementation of it.

The published guide at `code.claude.com/docs/en/agent-sdk/user-input` was retrieved 2026-08-24 and has changed since the prior contract was written against it. The TypeScript SDK reference could not be read: the AskUserQuestion input and output types are past the point where the fetched page truncates.

Findings are separated into read-from-source, measured-here, and undetermined. Nothing below is inferred from a screenshot.

## Findings

### Finding 1: Four fields, three pipelines, and only one of them renders markdown

Every string in the call passes through a sanitiser before it reaches a component. The sanitisers differ per field and the differences are the whole answer to the rendering question.

| Field | Pipeline | Newlines | Tabs | Markdown | Truncation |
|:--|:--|:--|:--|:--|:--|
| `question` | truncate, tabs to spaces, control-char scrub | **preserved** | collapsed to one space | **no** | 2000 chars, then `…` appended |
| `header` | truncate, collapse all whitespace, width-truncate | collapsed | collapsed | no | 256 chars, then 48 display columns with `…` |
| `label` | as `question`, then newlines to U+FFFD, whitespace collapsed | **destroyed** | collapsed | no | 2000 chars |
| `description` | as `question`, then newlines to U+FFFD at render time | **destroyed** | collapsed | no | 2000 chars |
| `preview` | control-char scrub only, then a full markdown renderer | **preserved** | preserved | **yes, fully** | over 2000 chars the preview is withheld entirely |

The question and description share one transform, at offset 293901028, which truncates at 2000 characters, replaces tabs with a single space, and scrubs control and default-ignorable codepoints. It does not touch newlines. That is why a hand-drawn layout survives in the question field.

Labels and descriptions then pass through a second function at 293904034 that replaces `\n`, `\r`, U+2028 and U+2029 with U+FFFD. For the label this happens during the display-model build; for the description it happens as the option is handed to the select component. So a newline in either field renders as a replacement glyph, not as a line break. **This is the trap most likely to bite a composer who has learned that the question field preserves newlines.**

The preview is different in kind. It is scrubbed for control characters only, then handed to a markdown renderer at 304037926 that runs a `marked` lexer and emits ANSI. Headings, bold, italic, strikethrough, blockquotes, ordered and unordered lists, horizontal rules, links, tables and fenced code blocks are all handled, and code fences are syntax-highlighted unless the user has disabled highlighting. Raw HTML inside markdown is passed through verbatim as literal text, which means an HTML preview shows its own tags in a terminal even when `previewFormat` is set to `html`.

The question renders through a plain bold Text node at 304661474 with no markdown parsing, confirming the screenshot evidence from source. A question that contains a newline, or whose display width exceeds 80 columns, additionally gets a dim left border and one column of padding — a gutter — from a wrapper at 306457055. That gutter costs two columns on every line of the question, which matters for anything aligned inside it.

### Finding 2: The host measures width with Bun.stringWidth and treats Ambiguous as narrow

The width function, at offset 287658390, is one line:

```js
function or(e){ return Bun.stringWidth(e, { ambiguousIsNarrow: true }) }
```

Every truncation, every pad, every wrap and every fit calculation in the dialog uses it. Truncation is grapheme-aware: the truncator at 287659544 segments with `Intl.Segmenter` and accumulates display width, so it never splits a grapheme cluster.

This settles the second open gap in ANALYSIS-005. The host does not use `String.length`, so its arithmetic is correct on its own terms; the only way alignment breaks is if the terminal disagrees with `ambiguousIsNarrow: true`. Measured on this machine with the same function:

| Character set | Codepoints | Width as the host counts it | Width if the terminal treats Ambiguous as wide |
|:--|:--|:--|:--|
| `➊➋➌➍➎➏➐➑➒➓` | U+278A to U+2793 | 1 | **1** |
| `①②③④⑤⑥⑦⑧⑨` | U+2460 to U+2468 | 1 | 2 |
| `⑪⑫` | U+246A, U+246B | 1 | 2 |
| box drawing, light and heavy | U+2500 block | 1 | 2 |
| `·` middle dot | U+00B7 | 1 | **1** |
| `•` bullet | U+2022 | 1 | 2 |
| `←↑→` | U+2190 to U+2192 | 1 | 2 |
| `▲` | U+25B2 | 1 | 2 |
| `✓✗✂` | U+2713, U+2717, U+2702 | 1 | **1** |
| `⚠` | U+26A0 | 1 | **1** |
| `⚠️` with VS16 | U+26A0 U+FE0F | 2 (1 + 0) | 2 |
| `…` and `—` | U+2026, U+2014 | 1 | 2 |
| `🚀` | U+1F680 | 2 | 2 |

The dingbat circled numerals the brief asked about are **East Asian Neutral, not Ambiguous**: they measure one cell under both settings, so no terminal configuration can make them two. The circled forms starting at U+2460, including `⑪` and `⑫`, are Ambiguous and therefore unsafe. The middle dot is safe on width in both directions here, which is narrower than the general Ambiguous concern would suggest — Bun classifies U+00B7 as narrow regardless of the flag.

This is the width half of the question only. ANALYSIS-005 measured the font-coverage half and found `➊` present in one of seven monospace faces and absent from both Menlo and Cascadia Code. **The two halves point opposite ways for that glyph**: width-safe everywhere, font-unsafe almost everywhere. Nothing in this note changes that recommendation.

The platform's own chrome uses Ambiguous characters freely — `←` and `→` in the tab strip, the full box-drawing set for the preview border, `…` for every truncation — so a terminal configured for wide ambiguity already misrenders Claude Code itself, and an authored layout is not the first casualty.

### Finding 3: Length limits, and what overflow actually does

Nothing rejects an over-long field. Every limit is a truncation or a withholding, and each is silent.

- **`questions`: 1 to 4, `options`: 2 to 4.** Schema-enforced, at 296493788 and 296491330. A call outside these bounds is rejected and the person never sees it.
- **`question` and `description`: 2000 characters.** Truncated with `…` appended. The constant is `$Xn = 2000` at 293904865.
- **`header`: 12 characters is advisory only.** The number is interpolated into the field's own schema description from a constant `etp = 12` at 288223248 and no validator reads it. The real limits are a 256-character cut, then a truncation to **48 display columns** with an ellipsis, then a further truncation by the tab strip to fit the terminal. An over-long header does not break the call; it eats its neighbours' tab space.
- **`preview`: 2000 characters, and over that the preview is discarded, not trimmed.** At 307088455 a preview longer than 2000 characters becomes `{kind: "withheld"}` and the pane shows `(preview cannot be shown in full — compare the option labels and descriptions instead)`. A preview whose content is empty after whitespace collapse is dropped as if absent, which means the option silently loses the preview layout it was counting on.
- **Duplicate question texts, or duplicate labels inside one question, reject the call.** The refinement is at 296492871. There is a second, display-level guard: two labels that normalise to the same visible string get ` (#2)` appended, which catches labels differing only in invisible characters.

### Finding 4: Previews are the terminal default, and the preview layout is not gated on the format

Two separate facts, and both contradict the current skill.

The format resolves at 310711598:

```js
let i = process.env.CLAUDE_CODE_QUESTION_PREVIEW_FORMAT;
if (i === "markdown" || i === "html") set(i);
else if (!clientType.startsWith("sdk-") && clientType !== "claude-desktop"
      && clientType !== "local-agent" && clientType !== "remote") set("markdown");
```

So the default is `markdown` for `cli`, `github-action` and `claude-vscode`, and unset for `sdk-typescript`, `sdk-python`, `sdk-cli`, `claude-desktop`, `local-agent` and `remote`. The SDK option `toolConfig.askUserQuestion.previewFormat` is not a second mechanism: it sets that same environment variable on the spawned CLI, at 301717519.

The renderer never reads it. There are exactly two call sites for the resolver in the whole binary: the tool's `prompt()`, where it selects which preview paragraph to append, and `validateInput`, where it runs the HTML shape check only when the value is `html`. **The display-model builder attaches the preview unconditionally, and the layout selector at 307079625 branches on nothing but "single-select and at least one option has a preview".** A preview sent to a host with the format unset still switches the layout and still renders.

The practical consequences are three. In an ordinary terminal session a preview will render and the skill's advice to leave the field alone is costing the layout for no reason. Under `previewFormat: "html"` in a terminal, the markdown renderer passes raw HTML through as literal text, so the tags appear on screen — `html` is only meaningful to a host that draws the dialog itself. And a plain-text preview is a hard error under `html` and a perfectly good passthrough under `markdown`, which is the one place the setting genuinely changes whether a call succeeds.

### Finding 5: The preview layout drops the descriptions entirely

The preview-layout component at 307071976 renders, per option, a focus pointer, an index number, and the label. It does not render the description at all.

That is a far bigger loss than the missing free-text box the current skill warns about. The description is where the cost of an option lives; in the preview layout the reader never sees it. Everything that distinguishes the options has to be in the label, the question, or visible in the preview itself.

The geometry is fixed and worth knowing before composing a preview:

- The option column is **exactly 30 columns wide**, with a four-column gap.
- The preview pane is **terminal columns minus 34**.
- The box inside it sizes to its content, capped at the pane width; its inner text width is the box width minus four, and content wider than that is hard-wrapped, then each line is truncated to the inner width and padded. Padding is computed with the same width function, so alignment inside the box is correct as long as the terminal agrees on ambiguity.
- The box holds **terminal rows minus 26** lines. Past that it truncates and draws a warning rule reading `── ✂ ── N lines hidden ──`. On an 80x24 terminal that is **fewer than one line of preview**, so previews are effectively a large-terminal feature.
- Leading blank lines in a preview are stripped before rendering.

The layout also carries keys the other layouts do not: `n` opens a notes field, digits 1 to 9 move focus without selecting, and arrowing down past the last option lands on a `Chat about this` footer row.

### Finding 6: Where the tool exists, and where it does not

Read from source rather than from the documentation, which reaches the same conclusion about subagents by a different route.

**Subagents.** `ALL_AGENT_DISALLOWED_TOOLS`, built at 290217696, contains AskUserQuestion by name. It is removed from every subagent tool pool unconditionally. The prior contract reported that the binary contains no subagent check; at 2.1.241 it does, and the documentation and the binary now agree.

**Non-interactive sessions.** The enable gate at 296489796 is two clauses. If any extension channel is configured and the session is non-interactive, the tool is off — that is the chat-channel case. Otherwise, in a non-interactive session the tool is enabled **only if a permission-prompt tool is configured**. Non-interactive means `-p`, `--print`, `--init-only`, an `--sdk-url` argument, or no TTY on stdout. So headless is not a flat prohibition: an SDK host that wires up `canUseTool`, which is exactly what the published guide instructs, does get the tool.

**Surfaces.** Only the CLI and IDE-extension row of the distribution matrix is confirmed from source. What can be said about the rest:

| Surface | AskUserQuestion | Preview default | Confidence |
|:--|:--|:--|:--|
| Claude Code CLI, interactive | yes | `markdown` | read from source |
| Claude Code IDE extension | yes, client type `claude-vscode` | `markdown` | read from source |
| GitHub Action | subject to the non-interactive gate | `markdown` | read from source |
| Desktop Code tab | yes, client type `claude-desktop` | **unset** | entrypoint read from source; the renderer it uses was not established |
| Cowork | runs Claude Code, client type most likely `remote` | **unset** | not established |
| Desktop Chat tab | not a Claude Code surface, so the tool does not exist there | not applicable | inference from the distribution matrix, not from source |
| claude.ai web, mobile | same | not applicable | same |
| Agent SDK, any host | yes, when `canUseTool` is provided or the tool is listed in `tools` | unset unless `toolConfig` sets it | source plus published guide |

The Desktop Code tab is the row worth being careful about. Its entrypoint demonstrably changes the preview default to unset, which means the preview *guidance* is absent from the model's prompt there. Whether the tab renders the Ink terminal UI or its own is not established, so **whether the escapes and the layouts behave as described above on that surface is undetermined**, and it should not be inferred from the CLI.

### Finding 7: The escapes table in the skill is wrong, and the shape depends on screen-reader mode

The current skill's Gotchas table says a `multiSelect` question has no conversational escape. It does have one, in the ordinary case.

The gate that decides the shape is `isScreenReaderEnabled`, read from an accessibility context at 292322198. It flips two things at once:

| Screen reader | `Chat about this` | Preview layout |
|:--|:--|:--|
| **off** — the ordinary case | a numbered **footer row** below the list, on single-select **and** on `multiSelect` | available |
| **on** | an appended **option** in the list, single-select only; absent on `multiSelect` | **disabled entirely** — previews never render |

So the accurate statement is that `multiSelect` loses the conversational escape **only under a screen reader**, and that previews are unavailable to screen-reader users altogether. The prior contract had the same table inverted for a different reason: it read the gate as a runtime flag without identifying it.

The `Other` free-text option is appended on both non-preview layouts including `multiSelect`, and is absent from the preview layout. That part of both documents is right.

### Finding 8: What "Chat about this" actually returns

Undocumented anywhere, and materially different from what either document implies. Choosing it does not answer the question and does not merely abandon it. At 307098653 it returns a **denial with structured feedback**:

```text
The user wants to clarify these questions.
    This means they may have additional information, context or questions for you.
    Take their response into account and then reformulate the questions if appropriate.
    Start by asking them what they would like to clarify.

    Questions asked:
- "<question text>"
  Answer: <answer>            (or "  (No answer provided)")
  User notes: <notes>
```

Partial answers and notes are carried into that feedback. So the escape is a re-pitch instruction with the reader's partial state attached, and the composer's correct response is to ask what they want to clarify, not to guess and proceed.

Escape, by contrast, denies with no feedback at all.

### Finding 9: Audit of the prior contract

Read in full against 2.1.241. Most of it has held.

**Still true.** The strict-object root, and unknown top-level keys being rejected. The 1-to-4 and 2-to-4 caps. Both uniqueness refinements and their message. The array-to-string coercion for `answers`, joined with `", "`. `header` having no validator. `multiSelect` combined with `preview` not being rejected. The five HTML rejection patterns plus the requirement for at least one tag. The full output schema including `response`, `annotations` and `afkTimeoutMs`. `metadata` being input-only. **`response` still has no TUI path that writes it** — the submit builder at 307098077 emits `answers`, `annotations` and `afkTimeoutMs` and nothing else. The four result wrappers and their strict precedence. The base tool prompt, the conditional paragraph, the gated schema-description strings, the one-line tool description, and the single-option rejection message, all verbatim. The preview layout having no `Other` and no image paste. `multiSelect` discarding previews silently. The auto-submit on a single single-select question. The review screen on a multi-question call. `dontAsk` denying the call. Terminal size driving preview truncation. A `PreToolUse` hook being able to answer on the user's behalf.

**Now false, or was never quite right.**

1. *"Option lists never scroll."* They do. The visible count is `min(optionCount, max(1, floor((rows - 8) / 2)))` at 302061514, with up and down arrow indicators. Six entries need about twenty rows; below that the list scrolls. The four-option cap is still structural, but not for this reason.
2. *"The binary contains no subagent check."* It now contains one, and AskUserQuestion is in `ALL_AGENT_DISALLOWED_TOOLS`.
3. *The `Chat about this` table.* Inverted, per Finding 7. `multiSelect` does have an escape unless a screen reader is active.
4. *"When it resolves to neither, the preview guidance is not in your prompt and the field should be left alone."* The first half is right and the second does not follow: the field still renders. And in a terminal it never resolves to neither.
5. *The branch-3 off-menu wording* has been reworded with em-dashes: "Read the answers carefully — they may request clarification, changes, or that you not proceed — and follow what they actually say."

**Unverifiable here.** Whether the conditional prompt paragraph and the gated schema strings are currently on for a given model, since both are remote-flag driven; both strings are present in the binary. Whether the AFK auto-continue default changed, since the setting is read from user configuration.

**What the contract does not cover at all.** Nine things, and the first four are the ones that change how a call should be composed.

1. **Per-field rendering.** The contract is a schema and result document; it says nothing about what happens to a newline, a tab, a markdown character or a wide glyph in any field. That is Findings 1 to 3 here.
2. **The preview layout drops descriptions.** Recorded as losing `Other` and image paste; the loss of every description is not mentioned.
3. **What `Chat about this` returns.** Described as "abandons the question"; it is a denial carrying a reformulation instruction and the reader's partial state.
4. **The `(notes only)` sentinel.** When a reader types notes without selecting an option, the submitted answer is the literal string `(notes only)`, defined at 296490626. The result builder treats it as *no answer*, emitting `"question"=(no option selected) notes: …`. A caller matching the answer against labels sees an unrecognised value; a caller reading it as free text misreads a sentinel as content.
5. **Image attachments.** Both non-preview layouts accept pasted images. The answer string becomes `<text> (Image attached)` or `(Image attached)`, and the images ride along as content blocks on the permission result.
6. **The external editor.** `ctrl+g` opens the free-text or notes field in the user's editor, so an answer can be arbitrarily long.
7. **The AFK timeout is a user setting with named values.** `askUserQuestionTimeout` takes `60s`, `5m`, `10m` or `never`, mapping to 60000, 300000 and 600000 milliseconds; unset and `never` both mean no timeout for this tool specifically. `CLAUDE_AFK_TIMEOUT_MS` also enables it. AFK is disabled outright under a screen reader. On timeout, partial answers are preserved and reported.
8. **The dialog geometry.** The 30-column option list, the pane width, the row budget, the tab strip, and the multi-line question gutter.
9. **Telemetry.** Five distinct events separate accept, reject, skip, respond-to-Claude and AFK advance, so the platform already distinguishes the reply shapes the skill's reading-answers guidance cares about.

## Recommendations

Ordered by how much a wrong belief costs.

1. **Reverse the skill's preview advice.** Previews are the terminal default and the layout is not gated on the setting. Replace the "leave the field alone" rule with the real constraint: previews cost the descriptions, the free-text box and, on a short terminal, most of their own content.
2. **Add the newline rule for `label` and `description`.** A newline in either becomes U+FFFD on screen. Only `question` and `preview` preserve line structure. This is the highest-frequency composition trap in the set and it is in none of the three documents.
3. **Correct the escapes table** for `multiSelect` and state the screen-reader gate, including that previews do not render for screen-reader users at all.
4. **Record what `Chat about this` returns** and what it obliges the composer to do next, and add `(notes only)` to the reply shapes in the reading-answers reference.
5. **Replace "header is a chip of about 12 characters"** with the actual behaviour: advisory 12, hard truncation at 48 display columns, rendered as a tab that competes with its siblings for terminal width.
6. **Drop the "option lists never scroll" claim** and keep the four-option cap on its real grounds.
7. **Feed the width answer back into ANALYSIS-005.** Its second open gap is closed: the host uses `Bun.stringWidth` with Ambiguous treated as narrow. Its Rule 5 width classes are confirmed as the host's own view, which narrows the risk to terminal-side disagreement rather than host-side error. Its ruler-line experiment is unnecessary for the preview pane, whose width is `columns - 34`.
8. **Decide deliberately about the unused capabilities.** Previews, notes, image paste and the external editor are all live and none is used.

## What Could Not Be Determined

Stated rather than guessed, because a gap is worth more than a plausible answer.

- **Whether the Desktop Code tab renders the terminal UI.** Its entrypoint is confirmed and its preview default is confirmed to be unset. Everything else about how the dialog looks and behaves there is unestablished, and the CLI is not evidence for it.
- **Whether Cowork exposes the tool.** Cowork runs Claude Code and a Cowork environment variable exists in the binary, but which client type a Cowork session reports, and therefore whether the non-interactive gate closes on it, was not traced.
- **Whether the two remote-flagged prompt strings are currently on.** Both are present in the binary and both are gated on remote configuration that cannot be read from the binary.
- **The AskUserQuestion input and output types in the published TypeScript reference.** The documentation page truncates before reaching them, so whether `annotations` and `afkTimeoutMs` are still undocumented could not be confirmed from the current page. They remain absent from the `user-input` guide, which was read in full.
- **How a specific terminal renders each Ambiguous character.** Measured here is what the host computes. What a given terminal paints depends on its own ambiguous-width setting, which the author cannot detect.

## Observations

### Rendering, read from source

- [fact] The host measures display width with `Bun.stringWidth(s, {ambiguousIsNarrow: true})` at binary offset 287658390, so East Asian Ambiguous characters count as one cell in every truncation, pad, wrap and fit the dialog computes #width #rendering
- [fact] `question` and `description` are truncated at 2000 characters with `…` appended, have tabs collapsed to a single space, and are scrubbed of control codepoints; newlines are untouched by that transform #limits #sanitisation
- [fact] `label` and `description` have `\n`, `\r`, U+2028 and U+2029 replaced with U+FFFD before rendering, so a newline in either field arrives as a replacement glyph rather than a line break #rendering #trap
- [fact] `preview` is the only field passed to a markdown renderer, at 304037926; it handles headings, bold, italic, strikethrough, lists, blockquotes, rules, links, tables and syntax-highlighted code fences #preview #markdown
- [fact] Raw HTML inside a preview is emitted verbatim as literal text by the markdown renderer, so an `html`-format preview shows its own tags in a terminal #preview #html
- [fact] A question containing a newline, or wider than 80 display columns, is wrapped in a dim left border with one column of padding, costing two columns on every line #rendering #gutter
- [fact] The dingbat circled numerals U+278A to U+2793 measure one cell under both ambiguity settings, making them the only circled-numeral family that no terminal configuration can widen #glyphs #width
- [fact] The circled forms from U+2460, including U+246A and U+246B, and the entire box-drawing block, are Ambiguous: one cell as the host counts them, two under a wide-ambiguous terminal #glyphs #width
- [fact] `header` is advisory at 12 characters with no validator, hard-truncated to 48 display columns, and then truncated again by the tab strip to fit the terminal #limits #header
- [fact] A `preview` longer than 2000 characters is withheld entirely and replaced by `(preview cannot be shown in full — compare the option labels and descriptions instead)`, rather than being trimmed #preview #limits

### Layout and availability

- [fact] The preview-layout component at 307071976 renders only a pointer, an index and the label per option; option descriptions are not displayed at all in that layout #preview #layout
- [fact] The preview pane is terminal columns minus 34, the option column is fixed at 30, and the preview box holds terminal rows minus 26 lines before truncating with a `N lines hidden` rule #geometry #preview
- [fact] The option list scrolls when `floor((rows - 8) / 2)` is smaller than the entry count, contradicting the claim that option lists never scroll #layout #scrolling
- [fact] `isScreenReaderEnabled` simultaneously moves `Chat about this` from a footer row into the option list and disables the preview layout entirely, so previews never render for screen-reader users #accessibility #layout
- [fact] The `Chat about this` footer row is present on `multiSelect` questions whenever a screen reader is not active, so `multiSelect` is not without a conversational escape #layout #escapes
- [fact] AskUserQuestion is named in `ALL_AGENT_DISALLOWED_TOOLS` at 290217696 and is removed from every subagent tool pool unconditionally #availability #subagents
- [fact] In a non-interactive session the tool is enabled only when a permission-prompt tool is configured, and is disabled outright when any extension channel is configured #availability #headless
- [fact] `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` defaults to `markdown` for the `cli`, `github-action` and `claude-vscode` client types and to unset for the SDK entrypoints, `claude-desktop`, `local-agent` and `remote` #preview #configuration
- [fact] The preview format has exactly two call sites in the binary — the tool prompt and the HTML validator — so the renderer never consults it and a preview renders whatever the format resolves to #preview #configuration

### Reply shapes and unused capability

- [fact] Choosing `Chat about this` returns a denial carrying a reformulation instruction and the reader's partial answers and notes, rather than simply abandoning the question #escapes #replies
- [fact] Notes typed without a selection submit the literal sentinel `(notes only)`, which the result builder reports as no option selected #replies #trap
- [fact] Annotations are populated only for single-select questions that carry a preview and only when a screen reader is not active, so notes cannot arrive from any other layout #replies #annotations
- [fact] Both non-preview layouts accept pasted images; the answer string becomes `<text> (Image attached)` and the images travel as content blocks on the permission result #capability #images
- [fact] `ctrl+g` opens the free-text or notes field in the user's external editor, so an answer is not bounded by what fits a terminal input line #capability #input
- [fact] The AFK timeout is the user setting `askUserQuestionTimeout` with values `60s`, `5m`, `10m` and `never`; unset and `never` both disable it, partial answers survive it, and it is disabled under a screen reader #capability #afk
- [insight] Five distinct telemetry events separate accept, reject, skip, respond-to-Claude and AFK advance, which means the platform already treats those replies as different acts rather than as one answer channel #replies #telemetry
- [risk] Previews, notes, image paste and the external editor are all live in an ordinary terminal session and none of them is used by the current skill, which advises against the one that unlocks the other three #capability #gap
- [problem] Whether the Desktop Code tab renders this dialog the same way is undetermined; only its entrypoint and its preview default were established, and the CLI is not evidence for the rest #gap #surfaces

## Relations

- part_of [[ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin]]
- pairs_with [[ANALYSIS-005: Monospace Decision Dialog Layout Rules]]
- depends_on [[ANALYSIS-002: Evidence Rules From Measured Failures]]
- relates_to [[ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill]]
- required_by [[ANALYSIS-006: Surface Portability of the Ask User Question Skill's Claims]]
