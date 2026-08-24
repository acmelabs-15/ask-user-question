---
name: ask-user-question
license: MIT
compatibility: "Claude Code, and any runtime that provides the AskUserQuestion tool. No scripts, no network access, no system packages. The register step reads a project vocabulary file where one exists and degrades to the vocabulary already in the conversation where none does."
allowed-tools: Read Grep Glob
metadata:
  version: "0.0.1"
  component-type: "skill"
  acknowledgement: "The re-pitch trigger and the controlled-register idea come from the wait-what skill by Matt Pocock, MIT licensed. No text was carried across."
# description must stay on ONE physical line. A blank line or a wrap inside it
# truncates the value in the measurement tooling, silently and without warning.
description: "Composes the AskUserQuestion call itself: question text, batching decisions into one call or a sequence, a label against its description, options that compare and show their costs, the one recommendation and the fact behind it, the layout: single-select, multiSelect or preview, what you have not checked, and reading a reply of free text, a note, a skip or silence. Use when the call is the deliverable, including whether to ask at all, a rejected call or one that hangs, and rewriting or tightening wording a cold reader could not act on. Do not use for prose about asking rather than a question: a guide, house conventions, training material, a decision log or a risk register. Do not use when a wider job merely pauses to ask, since implementing a spec, adjudicating a decision, interviewing for requirements, reviewing a diff and closing a session carry their own prompts. Do not use to render the dialog, fix a broken host or SDK integration, build a survey or a form, or page through many items."
---

# Composing an AskUserQuestion call

The deliverable is a call a human can answer on sight. Not a call that is
technically valid, and not a call that is fair to every option. One that a reader
who has been thinking about something else for ten minutes can read once, decide,
and move on from.

That reader is in a closed room. The rest of this file is how to write for them.

## Gotchas

These defy a reasonable guess about how the tool behaves. They are here rather
than behind a pointer, because you cannot decide to open a file about a trap you
do not know exists.

- **The dialog covers the conversation.** While it is open, the reader cannot see
  what you wrote above it, cannot scroll back, cannot open the file you are
  asking about, and cannot ask you a follow-up question. Context you put in the
  message before the call is invisible at the moment the reader needs it.
  Everything required to decide goes inside the call.
- **No option is pre-selected, and there is no `recommended` field.** The tool's
  own prompt says to make the recommended option first and to end its label with
  `(Recommended)`. That is the whole mechanism, so a recommendation you state in
  the prose around the call never reaches the reader.
- **Duplicate question text or duplicate labels reject the whole call.** Question
  texts must differ across the call, and labels must differ inside one question.
  The schema enforces this, so the reader never sees the dialog. Two options that
  both read `Keep it` are the usual way this happens.
- **An option's returned value is its whole label, `(Recommended)` suffix
  included.** Match the full string. If you trim the suffix before comparing, a
  correct answer looks unrecognised, and this bites on the ordinary path where the
  reader picked exactly the option you marked.
- **Each layout takes something away, and it takes it silently.** The tool appends
  its own escapes, but not everywhere:

  | Layout | Free-text `Other` | Conversational escape |
  |---|---|---|
  | plain list | yes | yes, `Chat about this` |
  | `multiSelect` | yes | **none** |
  | `preview` | **none** | a footer row that abandons the question |

  So a preview question has no `Other` at all. The reader's only way to say
  something is a note on an option they may not want to pick. Check this before you
  reach for a preview, because the tool's own prompt promises the model that
  `Other` is always there and a preview question breaks that promise without
  saying so. Option lists also never scroll, which is why four is a structural cap
  rather than a stylistic one.
- **Never author an `Other`, `None` or `Skip` option** on the two layouts that
  append their own. On those, yours competes with the real one and spends a slot.
  On a preview question, authoring one does not give you back what the layout
  removed — reconsider the layout instead.
- **A `multiSelect` question throws your previews away without a word.** Nothing
  validates the combination, so you get a plain checkbox list and lose whatever you
  spent composing them.
- **Previews do not exist unless the host opted in.** They resolve from
  `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` or the SDK's
  `toolConfig.askUserQuestion.previewFormat`, as `markdown` or `html`. Where
  neither resolves, leave the field alone — the host may not render it. Under
  `html` a preview must contain at least one tag, so plain text is a hard error
  rather than a passthrough, and the validator also turns away `<script>`,
  `<style>` and whole documents. A short terminal hides the overflow behind a
  `lines hidden` count, which argues for previews that compare rather than
  previews that document.
- **Multi-select answers come back as one comma-separated string**, not an array.
  Split on the comma before you match a label.
- **A skip is not consent.** It records that the reader declined to choose. It does
  not authorise the option you would have preferred.
- **`1` to `4` questions per call and `2` to `4` options per question are hard
  schema limits.** The tool refuses anything past them, even when the reader asks
  for more. `header` belongs to the question; `label` and `description` are
  required on every option.
- **`header` is a chip of about 12 characters, and nothing enforces it.** The tool
  accepts a long header and then overflows its chip in the interface.
- **You may not be able to ask at all.** The tool is absent in subagents, headless
  runs, scheduled runs and chat-channel sessions, a host can omit it from the
  toolset, and `dontAsk` permission mode denies the call. None of these degrade
  gracefully. Section 1 says what to do instead.

## 1. Decide whether to ask at all

Asking is not the safe default. A dialog costs the reader a context switch, so it
has to buy a decision that is genuinely yours to lose.

First check that you can ask. Where the tool is missing, per the Gotchas above,
do not wait on a call that will hang or resolve empty: write the question and its
options into your own reply and hand it to whoever dispatched you, so a caller who
does have the tool can put it to a person.

Ask when the fork is real: two or more paths are defensible, the choice changes
what you build next, and you cannot settle it from evidence available to you.

Four things look like decisions and are not. Do not spend a call on them:

- **A confirmation.** You already know the answer and you want cover for it.
- **A progress report.** Nothing forks. Say it in prose and continue.
- **A value only the reader can supply**, such as a name, a key or a path.
  Inventing four candidate values wastes the option slots. Ask in prose.
- **A mechanism whose premise is still open.** You are asking how before anyone
  has agreed whether.

When the fork is not real, decide it yourself, then say three things in prose and
keep going: what you decided, the evidence that decided it, and what would change
your mind. Deciding in silence is the failure here, not deciding. A decision with
its reason on the page lets the reader overrule you cheaply, which is the whole
benefit of asking, without the interruption.

## 2. One call, or a sequence

Every question in one call is answered in one pass. So the reader cannot use the
first answer to reach the second, and you cannot branch.

Put questions in one call when they are independent: any combination of answers
makes sense. Split them into a sequence when one answer changes the options of
another, or removes the second question entirely. A sequence costs a round trip
and buys correct options, and wrong options are the more expensive mistake.

With more than four independent questions, ask the four that block your next step
and leave the rest. Do not compress two decisions into one question to fit the
cap, because a reader cannot answer half of a compound question.

## 3. Write the question text

State the decision, in one sentence, ending in a question mark. Around 25 words
is the working ceiling.

The question carries what all the options share, so the options do not repeat it.
Name the thing being decided and the consequence that makes it matter. If the
reader needs a fact to choose, that fact belongs here, not in the message above.

- Weak: `How should we handle this?`
- Weak: `Which approach do you prefer for the migration?`
- Better: `The migration drops the legacy search index. Rebuild it now, or ship without
  it and rebuild on the next deploy?`

For a `multiSelect` question, phrase it as a plural selection, such as
`Which checks should run before the push?`.

## 4. Write the options

The label and the description do different jobs. The label is what the reader
scans; the description is what the reader decides on.

**Label:** one to five words. The distinguishing difference, not a restatement of
the question. Labels are read side by side, so they have to differ in the word
that matters.

**Description: two parts, in this order, both required.**

1. What happens if the reader picks this.
2. What it costs, forecloses, or risks.

The second part is the one that gets dropped, and it is the part that does the
work. A reader who picks an option has to be able to tell from the screen that it
went wrong for them, and only the cost tells them that. An option described by
its benefit alone hides the consequence while every sentence in it stays true,
which is the failure that survives proofreading. Write the cost of the option you
are recommending as plainly as the cost of the others.

Options also have to be comparable. Compare them on the same axes, in the same
order, in the same units, so a reader scanning down finds the real difference
rather than a difference in how you wrote them. Parallel structure is not a
stylistic preference here; it is what makes a scan work.

Cover the space. Options are mutually exclusive unless `multiSelect` is set, and
the set should include the do-nothing path where one exists, and the option you
would rather the reader did not take. A set of options that omits the honest bad
choice reads as a decision already made.

## 5. Mark exactly one recommendation

A recommendation is three things on **one** option, and all three are required:

1. It is **first** in the options array.
2. Its label ends with ` (Recommended)`.
3. Its own description carries the justification.

Use the platform's own spelling, capital R, because the tool's prompt instructs
every model to write `(Recommended)` and a skill that teaches a second spelling
puts two conventions in front of the same reader. Case almost certainly does not
matter to the tool, which reads the label as an opaque string; it matters to the
person, who sees one convention or two.

Position is part of the rule because it is the only positional affordance the tool
gives you: ordering is half of what makes a default read as one, so a marker on the
third option fights the reading order. It also makes a second marker visibly
inconsistent rather than merely discouraged, since only one option can be first.
Nothing stops you writing two, so this is a rule you check rather than a limit the
tool enforces.

**First position is also the cheapest to choose by accident.** A call with one
single-select question skips the review screen and submits on the keystroke that
picks an option, with no confirmation. So never put a destructive or one-way option
first, even when you would otherwise recommend it. Where the option you recommend
is the irreversible one, add a second question that confirms it, or leave the
recommendation unmarked and say in the question text why you are not steering.

The justification has to cite a fact from the situation, not a virtue. `Your
lockfile already pins version 3, so this needs no dependency change` is a
justification. `This is cleaner and more maintainable` is not; it would be true
of any option and tells the reader nothing. A marked recommendation the reader
cannot check is worse than no marker, because it teaches them the marker means
nothing.

The justification lives in the recommended option's own description. The reader
cannot see your prose while the dialog is open, so a reason stated outside the
call has not been stated.

**When the options are genuinely equivalent, mark none of them, and say in the
question text that they are equivalent.** That is a complete answer, not a
missing step. Two markers is the one shape that is always wrong.

## 6. State what you have not checked

Where a gap in your own evidence could change which option is right, name it in
the question text or in the description it bears on. `I have not run the test
suite against the second option` costs one clause and moves a risk from hidden to
shared.

Where there is no real gap, write nothing. A manufactured caveat trains the
reader to skim caveats.

## 7. Choose the layout

Single-select is the default. Reach past it deliberately, and read the layout table
in the Gotchas first, because each alternative removes an escape the reader may
need:

- **`multiSelect: true`** when the choices genuinely combine, such as which of
  four checks to run. The 2-to-4 option cap still applies, so group or split when
  you have more. This layout has no conversational escape, so a reader who wants to
  say something has only the free-text box.
- **`preview`** when the reader is comparing rendered things, such as two variants
  of a message or two diffs, and only where the host has opted into a preview
  format. This is the layout with no free-text box at all, so do not choose it for a
  question the reader might need to push back on. Keep previews short enough to
  survive a small terminal, and make them differ visibly — a preview that documents
  rather than compares wastes the one thing the layout buys.

## Register

Every string in the call is read once, cold, under time pressure. Write them in
ASD-STE100 Simplified Technical English, the controlled-language specification
from the AeroSpace and Defence Industries Association of Europe, reduced to the
rules that carry here:

- One instruction or one statement per sentence.
- Around 25 words per sentence, and fewer in an option description.
- Active voice. `This drops the index`, not `the index will be dropped`.
- Simple tenses. Prefer `this removes` over `this will have removed`.
- One meaning per word, and one word per concept, across the whole call. If the
  question says `check`, no option says `validation`.
- No noun cluster longer than three nouns.
- Keep articles. Terse interface copy drops `a` and `the` by instinct, and the
  dropped article is what makes a label ambiguous.
- No idiom, and no jargon outside the vocabulary the project already uses.
- Parallel items get parallel structure.

Then use the project's own words. Where the repository carries a vocabulary or
domain-language document, take the reader's nouns from it, so the question uses
the name they use. Where it carries none, take them from the conversation you are
in. Do not import a synonym from your own vocabulary for a thing the project has
already named.

Read `references/register.md` when a string will not come down to one clause, or
when you have to justify a rewrite to whoever wrote the original. It carries the
rule numbers and worked rewrites. Skipping it costs you a question that reads
fluently and still cannot be answered cold.

## The shape of a finished call

```json
{
  "questions": [
    {
      "question": "The migration drops the legacy search index. Rebuild it now, or ship without it?",
      "header": "Index",
      "options": [
        {
          "label": "Rebuild now (Recommended)",
          "description": "Runs the rebuild inside this migration. Your index is 40 MB, so this adds about two minutes of downtime, and the deploy window you booked is thirty."
        },
        {
          "label": "Ship without it",
          "description": "Deploys immediately with no downtime. Search returns no results until someone rebuilds by hand, and nothing in the deploy reminds them."
        }
      ]
    }
  ]
}
```

Note what the second description does. It states the benefit, then the failure
mode, in the same order as the first, in the same units. A reader who picks it
and then finds search empty can tell from that text that they chose it.

## Pre-flight, run as a loop

Check the call against this list, fix what fails, then check the fixed version
again. One clean pass on a first draft says nothing about the third, because a
rewrite for one item routinely breaks another. Stop when a pass finds nothing.

1. Question count is 1 to 4. Option count is 2 to 4 per question.
2. Every question text differs from the others, and every label differs from its
   siblings. A duplicate on either rejects the call.
3. Every option has a `label` and a `description`; every question has a `header`.
4. No option is named `Other`, `None`, or `Skip`.
5. Exactly one label ends with ` (Recommended)`, and it is the first option. Or no
   label does, and the question text says the options are equivalent.
6. The recommendation's justification is in its own description and cites a fact.
7. The first option is not destructive or one-way.
8. Every description names a cost, a risk, or something foreclosed.
9. Descriptions compare on the same axes, in the same order, in the same units.
10. Nothing needed to decide sits outside the call.
11. No `preview` on a `multiSelect` question, and no `preview` on a question the
    reader may need to answer in their own words.
12. Sentences are short, active, and use the project's own words.

## Re-pitching a question nobody could answer

When someone tells you they cannot answer, or asks what you are talking about,
the question failed. The fix is a rewrite of the call, not more prose around it.

Read `references/re-pitch.md` when a question has already failed, or when you are
rewriting someone else's. It carries six failure modes, a table that maps what the
reader said onto which mode you hit, and the rewrite for each. Open it before
rewriting rather than after: the modes want opposite fixes, so the repair that
cures a buried premise makes a compound question worse.

## Reading the reply

A reply is often not one of your labels. It arrives as a bare label, a
comma-separated list on a multi-select, free text the reader typed, a note
attached to a selection, a skip, or nothing at all.

Read `references/reading-answers.md` when the reply is not exactly one of your
labels. It maps each shape to what it licenses you to do next. Skipping it is how
a skip gets read as agreement, which costs a wrong action rather than a wrong
sentence.

## Bundled files, and when each one fires

- `references/register.md` — ASD-STE100 by rule number, with worked rewrites.
  Open it when a string resists shortening, or when a rewrite needs defending.
- `references/re-pitch.md` — the six ways a question fails a reader, and the
  repair for each. Open it after a question has failed.
- `references/reading-answers.md` — every reply shape and what it authorises.
  Open it when the reply is not one of your labels.

The step most often dropped is the second half of an option description: the
cost. A call whose options list only their benefits looks finished and leaves the
reader unable to recognise a mistake they have already made.
