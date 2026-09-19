---
name: ask-user-question
description: "Prepares a user decision, composes one clear question, interprets the reply, and repairs the exchange. Use before asking a question during coding, planning, investigation, or another workflow, and when a reply is incomplete, confusing, corrective, qualified, or off the current topic. Applies to AskUserQuestion, request_user_input, request_user_input_async, and ask_user. Use for a wait-what request or when the user cannot digest a question. Investigate discoverable facts first; ask about the user's remaining intent or trade-off. The larger workflow keeps its own scope and completion rules. Not for building a questionnaire UI or writing general documentation about communication."
compatibility: "Interactive Claude Code, Codex, or Gemini CLI with a permitted user-question tool. Follow the active tool schema and session instructions. The surrounding task supplies its evidence and project records; the host references distinguish verified contracts from untested rendering."
metadata:
  type: core
  library: ask-user-question
  library_version: "0.1.6"
  version: "0.1.6"
---

# Ask user question

## Setup

Use this cycle to turn a missing decision into a supported next action:

```text
Identify what is missing → investigate what you can establish → prepare the choice.
Ask one question → read every part of the reply → update what is settled.
Continue, investigate, or repair; keep unresolved dependent work pending.
```

Before the first question through a tool, read its reference. Tool names identify
different contracts, not interchangeable spellings.

| Available tool | Read before composing the call |
| --- | --- |
| `AskUserQuestion` | [Claude Code](references/claude-code.md) |
| `request_user_input` or `request_user_input_async` | [Codex](references/codex.md) |
| `ask_user` | [Gemini CLI](references/gemini-cli.md) |

Check the tool actually offered in this session. Follow its availability and
schema. If no permitted question tool exists, state that limitation and use an
allowed plain-text question when possible. Keep dependent work unresolved.

**Wait for the person.** Keep an unanswered question pending. Add no response
deadline, idle inference, cancellation timer, or automatic answer. A delivery
receipt or the end of a polling interval is not a reply. If the host expires a
request, explain that limitation and preserve an answerable, unresolved question.
An explicit user cancellation is different from expiry or silence.

## Core Patterns

### 1. Prepare the decision

Name the current question and the next action it affects. Separate:

- Information the user has not supplied.
- Facts the code, documentation, or research can establish.
- Something you do not yet understand.

Investigate the latter two. When sources conflict, check their version, scope,
definitions, and observed behavior. Expose a material discrepancy; distinguish
current implementation from desired behavior.

Keep each claim within its evidence. A guide showing one form does not establish
that its API requires that form. A tool acknowledging emission does not establish
that a dialog appeared or that the user saw it.

Construct viable alternatives before asking the user to choose. For each, know
what changes, what it costs, and which user priority would favor it. Resolve
what existing evidence and decisions already settle. Do not hand the user an
unexamined inconsistency and ask them to design your investigation.

Ask when the remaining difference belongs to the user. For an open discovery
question, know which missing user knowledge it seeks and how that knowledge
changes the next step. Open wording is appropriate for discovery; transferring
your preparation work to the user is not.

Make small, reversible implementation choices yourself when the alternatives
satisfy the agreed behavior and stay within authorization. State the choice and
reason. A one-line product change can still require a user decision. Reversibility
does not supply a missing fact, requirement, or permission.

```text
User: The editor already saves automatically.
Evidence: The inspected save handler runs only after Save is clicked.
Prepared question: The current handler saves on Save. Are you describing the
automatic saving you want us to add?
```

### 2. Make one question answerable

Put everything needed to decide inside the question surface. Start with what this
is about. Supply the relevant facts and consequence, then ask the bounded question.
The reader should not need the conversation, a hidden plan, or a file they cannot
open while answering.

Use the project's words and familiar domain terms. Follow its glossary where one
exists. Explain a necessary unfamiliar term before relying on it. Name actors and
objects; avoid compressed jargon or pronouns with competing meanings.

Write one main point per sentence and one subject per paragraph. Use short
paragraphs, lists, or headings when they reveal real groups. Keep a qualification
that changes the decision. Shorter is not better when it removes the premise.

When a question carries several context points, separate them visibly using the
host's supported line breaks or lists. Put the final decision after that context.
Keep shared facts in the question and individual trade-offs beside their options;
do not repeat the same explanation in both places or pack the whole exchange into
one dense paragraph.

For a choice, give outcomes the reader can distinguish. Compare the same relevant
dimensions in each option. State costs as plainly as benefits. Give your actual
best-supported recommendation and its reason; label a hypothesis as a hypothesis.
If evidence does not favor an option, say so rather than inventing a reason.

Choose the layout before assigning content to fields. Required consequences must
remain visible in that layout. Read the host reference instead of assuming that
descriptions, Markdown, previews, or free text behave alike everywhere.

Ask one question, wait, and use the answer to determine the next question. A list
of findings is context; it is not automatically a set of choices.

```text
Draft storage needs one decision. Cross-device recovery is a confirmed requirement.
Browser storage needs no sign-in, but drafts stay on one device.
Server storage needs sign-in and supports recovery on another device.
I recommend server storage because of the recovery requirement.
Should we require sign-in for drafts, or reconsider cross-device recovery?
```

Before sending, check: can the reader identify the subject, the real choice, its
consequences, and your reason without guessing? Can you explain how the possible
answers change the next action? Repair the call until both checks pass.

### 3. Read the whole reply

Interpret meaning against the question and its evidence, not from the reply's
format or a phrase alone. A single message can contain an answer, a condition,
a correction, a new gap, and a useful later topic.

| What the reply establishes | Next action |
| --- | --- |
| Enough information for the next step | Preserve its conditions and continue within authorization. |
| The user does not understand the question | Repair the missing context, term, option, or combined scope. |
| The user understands but an input is missing | Preserve the answered part; investigate or ask about the specific remaining gap. |
| Information conflicts with evidence | Show the discrepancy and source; resolve facts and clarify intended behavior. |
| A correction, refusal, delegation, or changed direction | Follow its actual scope; revise or retire the previous question when appropriate. |
| Useful material outside the current question | Check whether it affects a current dependency. Otherwise record and defer it visibly, then return to the unresolved point. |
| Silence, expiry, or no submitted answer | Keep the decision unanswered; choose nothing from elapsed time or a default. |

Read conditions before acting. “Use the existing button, but keep Delete as the
label” supplies both a choice and a constraint. “Sounds good, but do not implement
yet” is not implementation approval. A clear written approval can be sufficient;
it need not match a special phrase. Ask again only for a real ambiguity or new
condition, not to repeat an already clear decision.

```text
Question: Which roles may edit reports?
Reply: Every member may view reports. We should add email reports later.
Settled: Viewing is available to every member.
Open: Editing permission is still unspecified.
Later: Email reports, recorded as a suggestion; no work on them is authorized.
Next: Ask about editing permission; preserve the other information.
```

### 4. Advance from evidence

Before dependent work continues, trace its required inputs to the user's words,
inspected project evidence, or verified sources. An unsupported interpretation
stays open. If the answer exposes a larger gap, update the scope of that gap and
choose the investigation needed to resolve it.

For a repair, target the actual trouble. Supply missing context, explain the
unclear term, make an option concrete, or divide independent decisions. Preserve
what was already understood. A request such as wait-what does not answer the
pending question or authorize a different task.

Update the larger workflow's Markdown record as the exchange progresses. Record
what settled and its source, conditions, unresolved facts, conflicts, useful later
topics, and the next supported action. Mark proposals as proposals. State what
you deferred and why. If the revisit condition is unknown, leave it open.

Use the project's existing destinations. A glossary receives resolved definitions;
general working notes do not become glossary entries or accepted decisions.

The larger workflow keeps its completion and publication rules. Resolving one
question does not approve its whole plan. Shared readiness rests on supported
requirements and resolved dependencies, not an invented confidence percentage
or an ability to predict the user's next answers.

```text
Reply: We should offer email reminders in a later version.
Response: I recorded email reminders as a future suggestion. The current in-app
behavior is still open: should users be able to dismiss this reminder?
```

Balance the four recurring tensions: preserve necessary context while being brief;
make progress while leaving unsupported inputs open; preserve useful additions
while maintaining the current focus; support the larger workflow without taking
over its decisions or completion.

## Common Mistakes

These short exchanges are illustrative. Use their distinctions, not their answers.

### HIGH — Asking for a discoverable fact
Wrong:
```text
What upload timeout is configured? I will wait before inspecting the configuration.
```
Correct:
```text
Inspect the applicable configuration. Ask only if a separate user choice remains.
```
The agent's missing knowledge is not automatically a missing user answer.
Source: Maintainer requirement, 2026-09-11; [question purpose](https://design-system.service.gov.uk/patterns/question-pages/).

### HIGH — Interrupting for a reversible implementation detail
Wrong:
```text
Both forms produce the agreed label. Must I use a local formatter or inline text?
```
Correct:
```text
The formatting is used once. I will keep it inline; the agreed behavior is unchanged.
```
Choose within the authorized implementation instead of requesting an unnecessary decision.
Source: Maintainer's standing reversibility rule and review, 2026-09-11.

### HIGH — Combining dependent decisions
Wrong:
```text
Migrate Friday and retire the old index? “Friday works.” Then both are settled.
```
Correct:
```text
Friday is settled. Explain the index consequences and ask about the index separately.
```
An answer to one part does not settle the other.
Source: [Question design](https://www.gov.uk/service-manual/design/designing-good-questions); maintainer requirement.

### HIGH — Hiding the premise in jargon
Wrong:
```text
Which rehydration reconciliation policy should win?
```
Correct:
```text
Refresh can replace the unsaved draft. Keep that draft or load the saved version?
```
Use the reader's objects and expose what changes.
Source: [Clear terminology](https://developers.google.com/tech-writing/one/words).

### HIGH — Hiding costs behind a recommendation
Wrong:
```text
Browser storage is fast and simple (Recommended). Server storage is reliable.
```
Correct:
```text
Browser drafts stay on one device. Server drafts require sign-in and work across devices.
Recommend from the user's established requirements and state the recommended cost.
```
An attractive label is not a comparison the user can decide from.
Source: [Choice consequences](https://www.w3.org/TR/coga-usable/#clearly-state-the-results-and-disadvantages-of-actions-options-and-selections-pattern).

### CRITICAL — Treating reply format as intent
Wrong:
```text
“Use the existing button; keep Delete as the label” is free text, so it rejects the choices.
```
Correct:
```text
The existing button is selected. Delete is a binding label requirement.
```
Read the words and conditions rather than infer rejection from the input form.
Source: Maintainer requirement; [conversational grounding](https://arxiv.org/html/2311.09144v2).

### CRITICAL — Completing an answer with assumptions
Wrong:
```text
I asked who may edit. The user said everyone may view, so everyone may edit too.
```
Correct:
```text
Viewing is settled. Editing remains open; pause that change and ask about editing.
```
A plausible completion is not evidence of the user's decision.
Source: Maintainer requirement; [partial answers](https://semprag.org/article/view/sp.5.6).

### CRITICAL — Reading silence as consent
Wrong:
```text
The publishing question received no answer. Publish the recommended choice.
```
Correct:
```text
Publishing remains unapproved. Preserve the unanswered question and wait.
```
Neither a default nor elapsed time supplies permission.
Source: Maintainer waiting and authorization requirements, 2026-09-11.

### CRITICAL — Silently replacing the user's claim
Wrong:
```text
The user says autosave exists; code requires Save. Silently reinterpret their statement.
```
Correct:
```text
Show the inspected Save behavior. Clarify whether autosave describes the intended change.
```
Investigate and expose a discrepancy without assuming either its cause or the user's intent.
Source: Maintainer requirement; [human-AI correction](https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/).

### HIGH — Losing information in a mixed reply
Wrong:
```text
A future email-reminder idea answers whether the current reminder can be dismissed.
```
Correct:
```text
Record the future idea. Say dismissal is still open and ask about that specific behavior.
```
Useful information and an answer to the current question are different contributions.
Source: Maintainer requirement; [questions under discussion](https://semprag.org/article/view/sp.5.6).

### HIGH — Shortening instead of repairing
Wrong:
```text
“Should drafts autosave and be shared?” was confusing. Retry: “Autosave and share?”
```
Correct:
```text
Separate saving from sharing. Ask first when drafts should save, then address sharing.
```
Repair the combined scope rather than make the same defect shorter.
Source: [Specific repair](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0136100).

### CRITICAL — Closing the whole workflow too early
Wrong:
```text
The user approved weekly reports, so the full plan is approved for implementation.
```
Correct:
```text
Return the weekly-report decision to the larger workflow and retain its remaining questions.
```
One resolved exchange does not satisfy another workflow's completion conditions.
Source: Reviewed Brain workflow scenarios and maintainer hierarchy, 2026-09-11.

### HIGH — Assuming every host shows the same fields
Wrong:
```text
This layout hides descriptions. Put the ten-minute outage only in a description.
```
Correct:
```text
Put the outage in a supported visible field. Check the active tool and layout.
```
A valid field can still fail to deliver the information needed to decide.
Source: The host references below.

### CRITICAL — Closing a question on a timer
Wrong:
```text
Start a thirty-second timer. If no reply arrives, declare the user idle and close the question.
```
Correct:
```text
Wait without an agent deadline. If the host expires the request, preserve the unanswered decision.
```
The user's response time is not a signal authorizing cancellation or progress.
Source: Maintainer requirement and verified host waiting contracts, 2026-09-11.

### HIGH — Handing over the investigation
Wrong:
```text
These instructions disagree. How would you like the conflicts handled?
```
Correct:
```text
Inspect the relevant contracts. Prepare a supported resolution and ask only about a remaining user trade-off.
```
Detecting a discrepancy starts your preparation work; it does not transfer that work to the user.
Source: Observed maintainer correction; [decision preparation](https://arxiv.org/abs/2502.04485).

## References

Read the matching host reference before composing a call or interpreting an
unfamiliar returned structure. Its facts are versioned evidence; the active
schema and current session constraints decide what is permitted.

- [Claude Code](references/claude-code.md): native questions, SDK replies, and host auto-continue settings.
- [Codex](references/codex.md): synchronous versus asynchronous questions, response shapes, and waiting limits.
- [Gemini CLI](references/gemini-cli.md): explicit question types, positional replies, and cancellation.
