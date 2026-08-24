---
title: "ANALYSIS-006: Surface Portability of the Ask User Question Skill's Claims"
type: analysis
status: DRAFT
permalink: analysis/analysis-006-surface-portability-of-the-ask-user-question-skill-s-claims
tags:
- analysis
- ask-user-question
- portability
- surfaces
- compatibility
---

# ANALYSIS-006: Surface Portability of the Ask User Question Skill's Claims

> Which of the skill's flatly-stated facts hold on every surface and which hold only in Claude Code, established from the one place the tool is implemented. Seven claims audited, a recommendation on how the skill should carry the difference, and the two surfaces where the answer could not be settled.

## Context

The skill states several things as universal facts. Its `compatibility` field claims it works in "Claude Code, and any runtime that provides the AskUserQuestion tool", and its Gotchas assert without qualification a layout table, a preview-configuration mechanism, a one-keystroke submit, a comma-separated multi-select reply, a twelve-character header chip, and a list of contexts where the tool is absent.

A claim that is true on one surface and silently false on another is worse than a missing claim, because a reader acts on it. This note establishes, per claim, which kind it is.

The surfaces that could load this skill are enumerated in plugin-kit's `shared/references/distribution-targets.md`: the Claude Code CLI and IDE extensions, the Desktop Code tab, the Desktop Cowork tab, the Desktop Chat tab, claude.ai on the web, and mobile.

## Executive Summary

The framing that makes every claim decidable is that **there is exactly one implementation of AskUserQuestion and it lives inside the Claude Code binary**. The schema, the caps, the array-to-string coercion, the tool prompt, the result-string assembly, the subagent removal and the enable gate are all in that one file, so they are byte-identical on every surface that runs it. What varies is only two things: whether that binary runs at all, and **who draws the dialog**.

Dialog ownership is decided at a single line in the permission flow. The binary always mounts its own dialog for this tool. A **bridge** — an IDE extension, the desktop app, or an SDK client — may race it and resolve the request first with a UI of its own. A **chat channel** may not: the tool declares `requiresUserInteraction`, which excludes channel callbacks from racing, and a separate gate turns the tool off entirely in a non-interactive session that has a channel configured.

Against that axis the seven claims split cleanly. **Three are universal** wherever the tool exists at all: the comma-separated multi-select reply, the 1-to-4 and 2-to-4 caps behind the twelve-character claim, and the subagent absence. **Three describe the terminal dialog only**: the layout table with its `Other` and `Chat about this` escapes, the one-keystroke submit, and the header rendering as a chip. **One is Claude-Code-specific plumbing that the reader cannot act on elsewhere**: the preview format mechanism.

The `compatibility` field is the one claim that is not merely unqualified but actively unsafe, and it is unsafe in a way the other six are not. Reimplementations of Claude Code do circulate a tool named AskUserQuestion carrying an older, looser tool description — so a runtime "providing the AskUserQuestion tool" demonstrably provides a *different* contract, and the field promises the reader guidance that will be wrong there in exactly the places it is most specific.

The reframing that decides the recommendation is this: **the set of surfaces that can load this skill is almost exactly the set of surfaces where its claims hold.** Plugins load in Claude Code, the Desktop Code tab and Cowork; they do not load in the Chat tab, on the web or on mobile. So the exposure is not six surfaces wide. It reduces to three narrow cases: Cowork, the Desktop Code tab if its bridge draws its own dialog, and a reader who carries the guidance to an SDK host because the compatibility field invited them to.

The recommendation is therefore a hybrid that also narrows the compatibility field — the team lead's option 3 combined with the honest half of option 2. Six universal rules stay unmarked, four terminal-dialog facts get a single consistent marker, and the compatibility field stops promising a runtime nobody has verified.

## Approach

The claim-by-claim verdicts were derived from the shipped binary at ``<claude versions dir>/2.1.241``, read by byte offset, using the same method as ANALYSIS-004; that note carries the per-claim source evidence and this one carries the portability question only. Dialog ownership was established from the permission-flow dispatcher at offset 296873230 and the tool's own `requiresUserInteraction` declaration.

Surface capability came from plugin-kit's distribution-targets reference, read in full. The skill's frontmatter was measured directly.

The published guide at `code.claude.com/docs/en/agent-sdk/user-input` was read for its own statements about host responsibility. A web search was run to check whether the tool exists on any non-Claude-Code surface; every account found describes it as a Claude Code tool, and one third-party report independently corroborates the SDK-subprocess failure mode.

Where a surface could not be settled it is listed rather than inferred from a neighbouring one.

## Findings

### Finding 1: One implementation, and one axis that matters

Everything the skill could say about this tool sits in one of two layers.

**The tool layer** is the Claude Code binary. It holds the input and output schemas, the 1-to-4 and 2-to-4 caps, the uniqueness refinements, the coercion of an array of answers into a comma-joined string, the tool prompt the model reads, the assembly of the result string the model receives, the removal of the tool from every subagent pool, and the gate that decides whether the tool is offered at all. A surface either runs this binary or it does not have the tool.

**The dialog layer** is whatever actually asks the person. It holds the layouts, the appended `Other` option, the `Chat about this` escape, the notes field, image paste, the external editor, the AFK timeout, the one-keystroke submit, the review screen, and every width and truncation figure in ANALYSIS-004.

A claim about the tool layer travels everywhere the tool travels. A claim about the dialog layer travels only as far as the terminal dialog does. Every one of the skill's seven claims falls on one side of that line, and none straddles it.

### Finding 2: Who draws the dialog, from source

The permission dispatcher looks the tool up in a registry that maps a tool to its dialog component, and then does this:

```js
let hasExternalRacer = !!(bridgeCallbacks || (channelCallbacks && !tool.requiresUserInteraction?.()));
mount(m.dialog, { ..., hasExternalRacer });
```

Three consequences, and they are the mechanism behind every surface difference.

**The terminal dialog is always mounted.** There is no branch that suppresses it in favour of a host. Whenever the tool is enabled and a request arrives, the binary renders its own dialog.

**A bridge can race it.** `bridgeCallbacks` covers the IDE extension, the desktop app and an SDK client. Either party can resolve the request first. This is why a host that draws its own question card is not lying about the tool and is not overriding it — it is winning a race the binary set up.

**A chat channel cannot race it.** AskUserQuestion declares `requiresUserInteraction()` as true, which is exactly the predicate that excludes `channelCallbacks` from the racer set. Combined with the enable gate — off when a channel is configured and the session is non-interactive — the chat-channel surface is the one place the tool is deliberately withheld rather than merely unreachable.

The binary contains no second dialog implementation for this tool and no renderer switch that selects one. `rendererMode`, the only field with a promising name, is a telemetry value derived from a terminal probe.

### Finding 3: Claim by claim

| Claim as the skill states it | Layer | Verdict |
|:--|:--|:--|
| Layout table: plain list has `Other` and `Chat about this`; `multiSelect` has `Other` only; `preview` has neither | dialog | **Claude Code terminal only.** It is also wrong for the terminal, per ANALYSIS-004: `multiSelect` does have a `Chat about this` footer unless a screen reader is active. A bridge-drawn dialog owes none of it |
| Previews resolve from `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` or `toolConfig.askUserQuestion.previewFormat` | tool plumbing | **Claude Code only, and not actionable by the reader.** Both names are Claude Code's; the SDK option merely sets the environment variable on the spawned CLI. The renderer never consults either, so the real statement is about the prompt and the HTML validator, not about whether a preview appears |
| A single single-select question submits on one keystroke with no review screen | dialog | **Claude Code terminal only.** The auto-submit condition is in the terminal dialog's own state machine. It is the load-bearing half of the rule against putting a destructive option first, so the rule needs a reason that survives the surface change |
| Multi-select answers come back as one comma-separated string, not an array | **tool** | **Universal wherever the tool exists.** The input schema preprocesses an array of answers into a `", "`-joined string before the tool ever sees it, so a host may send either shape and the model always reads the joined form. This is the one claim that is safe exactly as written |
| `header` is a chip of about 12 characters and nothing enforces it | **both** | **Split.** The number and its non-enforcement are in the schema description and travel everywhere. The chip, and the real hard truncation at 48 display columns, are the terminal dialog's |
| The tool is absent in subagents | **tool** | **Universal.** Named in the disallowed-tool set the binary builds for every subagent pool |
| The tool is absent in headless, scheduled and chat-channel runs | **tool**, but stated too flatly | **Mechanism is universal, the wording is wrong.** Headless is conditional, not absolute: in a non-interactive session the tool is enabled when a permission-prompt tool is configured, which is exactly what the published guide tells SDK hosts to do. Chat-channel is a genuine prohibition. Scheduled runs are not a separate rule — a routine's session is remote and non-interactive, so it lands on the headless clause |
| `compatibility`: "Claude Code, and any runtime that provides the AskUserQuestion tool" | — | **Unverified and unsafe.** See Finding 4 |

### Finding 4: The compatibility field is the one claim that is actively unsafe

The other six claims are at worst over-broad about surfaces that all run the same binary. The compatibility field is different in kind, because it invites the reader onto a runtime where **nothing above is guaranteed**, including the three universal claims.

Every universal claim in Finding 3 is universal only because there is one implementation. A third-party runtime that offers a tool called AskUserQuestion has its own implementation, and the evidence is that these diverge: reimplementations circulate an older, four-use-case tool description in place of the current stricter prompt. A runtime free to ship a different prompt is free to ship different caps, a different coercion rule, and a different result string.

So the field promises portability precisely where the skill's specificity becomes a liability. The skill's value is that it is exact about a real dialog; that exactness is what breaks first somewhere else.

It is worth saying that the field costs nothing to narrow. The frontmatter already uses only the six portable keys, so the file is structurally portable; the claim is the only thing that is not.

### Finding 5: Surface by surface

| Surface | Can it load this skill? | Does the tool exist? | Does the dialog behave as the skill describes? |
|:--|:--|:--|:--|
| Claude Code CLI | yes, as a plugin | yes | yes, subject to ANALYSIS-004's corrections |
| Claude Code IDE extension | yes, as a plugin | yes, client type `claude-vscode` | the binary mounts its dialog; the extension bridge may race it. Which wins in practice is not established |
| Desktop Code tab | yes, as a plugin | yes, client type `claude-desktop` | same race, same gap. The preview default is unset here, so the model is not told previews exist |
| Desktop Cowork tab | yes, if enabled on the claude.ai account | not established | not established |
| Desktop Chat tab | **no** — loads MCPB bundles and connectors, not plugins | no. The tool is defined in the Claude Code binary, which the Chat tab does not run | not applicable |
| claude.ai web | not as a plugin; only as a standalone upload, which this skill cannot pass today | no, for the same reason | not applicable |
| Mobile | same as web | no | not applicable |
| Any SDK host | not automatically; a person can carry the guidance there | yes, when `canUseTool` is supplied or the tool is listed in `tools` | **no.** The host draws the dialog, so every dialog-layer claim is the host's to honour or ignore |

Two rows deserve emphasis.

**The Chat tab.** The distribution reference marks the Chat tab's *skill* behaviour as explicitly unverified, and that gap is real and is not papered over here. But it does not leave the tool question open: the Chat tab cannot load a plugin, and AskUserQuestion is not a skill, a connector or an MCPB tool — it is compiled into a binary the Chat tab does not run. The skill-loading question and the tool-existence question have different answers, and only the first is unverified.

**claude.ai and mobile.** These are reachable only by uploading the skill standalone, and the distribution reference puts the claude.ai `description` cap at 200 characters. This skill's description is **1002 characters**, five times over. Its `compatibility` field is a further 262. So the surfaces where the skill's claims would be least reliable are also the surfaces it cannot reach without rewriting its highest-leverage field — which is a constraint, not a reprieve, but it does bound the exposure.

### Finding 6: The exposure is three cases, not six surfaces

Putting Findings 3 and 5 together produces the result that decides the recommendation.

The skill ships as a plugin. Plugins load in Claude Code, the Desktop Code tab and Cowork — and two of those three run the same binary with the same dialog. The Chat tab, web and mobile cannot load it at all, so an over-broad claim cannot mislead anyone there.

What is left is three cases:

1. **Cowork**, where neither the tool's presence nor the dialog is established.
2. **The Desktop Code tab and the IDE extension**, where a bridge may draw its own dialog and the four dialog-layer claims would then be wrong.
3. **A reader who carries the guidance to an SDK host**, which the compatibility field currently encourages and which is the case where the dialog-layer claims are *certainly* wrong, because the host draws the dialog by construction.

All three are addressed by the same two edits: mark the dialog-layer facts as such, and stop the compatibility field inviting case 3 blindly.

## Recommendations

**Adopt the hybrid, and narrow the compatibility field with it.** That is the team lead's option 3 plus the honest half of option 2, and it is the right trade for an asymmetric cost: a marked claim costs a reader one clause, an unmarked wrong claim costs them a bad call.

Option 1 is rejected because per-surface qualification inline would put a caveat on nearly every Gotcha to serve surfaces that cannot load the file. Option 2 alone is rejected because scoping the whole skill to Claude Code would withdraw six genuinely universal rules from an SDK host that needs them — the caps, the uniqueness rules, the comma-joined reply, the subagent absence, the recommendation convention and every composition rule in the body, none of which depend on who draws the dialog.

Concretely:

1. **Rewrite the compatibility field** to claim Claude Code and to describe, rather than promise, what happens elsewhere. Something of the shape: composition guidance applies wherever the tool is offered, and the dialog behaviour described applies to the Claude Code terminal dialog; a host that draws its own dialog owes none of it. Drop "any runtime that provides the AskUserQuestion tool" — the runtimes that do so diverge from it.
2. **Mark exactly four Gotchas as terminal-dialog facts**: the layout and escapes table, the one-keystroke submit, the header chip, and the preview-format mechanism. One consistent marker, used nowhere else, so its absence is meaningful.
3. **Leave the rest unmarked**, including the comma-joined multi-select reply, the caps, the uniqueness rules and the subagent absence. They are properties of the tool and hold wherever it exists.
4. **Restate the headless clause as conditional.** "Absent in headless runs" is wrong; the tool is available to a non-interactive session that configures a permission-prompt tool, which is the documented SDK path. Fold scheduled runs into that clause rather than listing them separately, and keep chat-channel sessions as the genuine prohibition.
5. **Give the destructive-first rule a surface-independent reason.** It currently rests on the one-keystroke submit, which is a terminal fact. The durable reason is that the first option is the default and a default carries decision weight whatever draws it.
6. **Do not attempt a claude.ai upload as a portability fix.** At 1002 characters the description is five times the 200-character cap, and the description is the field the skill can least afford to compress. If web reach is wanted later, it is a separate trimmed artifact, not a weakening of this one.

## What Could Not Be Determined

- **Whether Cowork exposes the tool.** Cowork is identified in the binary by its own environment variable rather than by a client type, and which client type a Cowork session reports — and therefore whether the non-interactive gate closes on it — was not traced. Its dialog behaviour follows from that and is equally open.
- **Whether a bridge-drawn dialog actually wins the race in the Desktop Code tab or the IDE extension.** The racing mechanism is established from source; whether either host implements a question dialog at all was not established, and the binary cannot answer it.
- **Whether the Desktop Chat tab loads account-enabled skills.** Still unverified, as the distribution reference states. It does not affect the tool question, which is settled by the Chat tab not running the Claude Code binary.
- **What a third-party runtime offering a tool of this name actually implements.** The divergence is evidenced by a stale tool description in circulation; no such runtime was inspected.

## Observations

### The portability axis

- [insight] There is exactly one implementation of AskUserQuestion and it is compiled into the Claude Code binary, so every schema, cap, coercion and result string is byte-identical on every surface that runs it and absent from every surface that does not #portability #architecture
- [fact] The permission dispatcher always mounts the terminal dialog for this tool and passes it a flag saying whether a bridge may also resolve the request, so a host-drawn dialog wins a race rather than replacing the terminal one #dialogs #bridge
- [fact] AskUserQuestion declares `requiresUserInteraction`, which is the predicate excluding chat-channel callbacks from the racer set, so a channel can never answer on the reader's behalf #channels #gating
- [fact] The binary contains no second dialog implementation for this tool and no renderer switch selecting one; `rendererMode` is a telemetry value derived from a terminal probe, not a UI mode #dialogs #renderer
- [insight] Every claim about this tool sits either in the tool layer, which travels wherever the binary runs, or in the dialog layer, which travels only as far as the terminal dialog; none of the skill's seven claims straddles the line #portability #taxonomy

### Verdicts on the stated claims

- [fact] The comma-joined multi-select reply is a property of the tool's own input schema, which coerces an array of answers into a `", "`-joined string, so the claim is safe exactly as the skill states it #claims #universal
- [fact] The subagent absence is enforced by the binary's disallowed-tool set and therefore holds on every surface that runs the binary #claims #universal
- [fact] The twelve-character header claim is split: the number and its non-enforcement live in the schema description and travel everywhere, while the chip rendering and the real 48-column truncation are the terminal dialog's #claims #split
- [problem] The layout and escapes table, the one-keystroke submit and the header chip describe the terminal dialog only, and a host that draws its own dialog owes none of them #claims #dialog-only
- [problem] The preview-format claim names two Claude Code mechanisms and describes plumbing the reader cannot act on elsewhere; the SDK option only sets the environment variable on the spawned CLI #claims #dialog-only
- [problem] "Absent in headless runs" is wrong as stated: a non-interactive session that configures a permission-prompt tool does get the tool, which is the documented SDK path; scheduled runs are the same clause rather than a separate rule #claims #correction
- [risk] The compatibility claim of "any runtime that provides the AskUserQuestion tool" is unsafe rather than merely unverified, because a third-party runtime supplies its own implementation and the reimplementations in circulation demonstrably carry an older tool prompt #compatibility #risk

### Surfaces and exposure

- [fact] Plugins load in Claude Code, the Desktop Code tab and Cowork and do not load in the Desktop Chat tab, on the web or on mobile, so three of the six surfaces cannot be misled by an over-broad claim in this file at all #surfaces #exposure
- [fact] The Desktop Chat tab cannot run the Claude Code binary, so the tool does not exist there; this is settled independently of whether that tab loads account-enabled skills, which remains unverified #surfaces #chat-tab
- [fact] The skill's description is 1002 characters against the 200-character claude.ai cap, and its compatibility field a further 262, so it cannot be uploaded to the web or mobile surfaces without rewriting the field it can least afford to compress #surfaces #limits
- [fact] The skill's frontmatter uses only the six portable keys, so the file is structurally portable and the compatibility claim is the only thing about it that is not #frontmatter #portability
- [insight] Exposure reduces to three cases rather than six surfaces — Cowork, a bridge-drawn dialog in the Desktop Code tab or IDE extension, and a reader carrying the guidance to an SDK host — and all three are addressed by marking the dialog-layer facts and narrowing the compatibility field #exposure #synthesis
- [decision] The recommended shape is the hybrid with a narrowed compatibility field: six universal rules stay unmarked, four dialog-layer facts take one consistent marker, and the compatibility field stops inviting an unverified runtime #recommendation #shape
- [insight] The destructive-first rule currently rests on the one-keystroke submit, a terminal fact, and needs a surface-independent reason — that the first option is the default and a default carries decision weight whatever draws it #claims #repair
- [problem] Whether Cowork exposes the tool is undetermined: Cowork is identified by its own environment variable rather than by a client type, and which client type it reports was not traced #gap #cowork
- [problem] Whether an IDE or desktop bridge actually draws its own question dialog and wins the race is undetermined; the racing mechanism is established but the hosts were not inspected #gap #bridge

## Relations

- part_of [[ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin]]
- depends_on [[ANALYSIS-004: AskUserQuestion Tool Capability Audit at Build 2.1.241]]
- pairs_with [[ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill]]
- relates_to [[ANALYSIS-007: Reference Ablation Ground Truth]]