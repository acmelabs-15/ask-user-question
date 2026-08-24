---
name: ask-user-question
compatibility: "Claude Code. The composition guidance applies wherever the tool is offered; the Gotchas marked [terminal] describe the Claude Code terminal dialog, and a host that draws its own dialog owes none of them. No scripts, no network access, no system packages. The wording step reads a project vocabulary file where one exists and degrades to the vocabulary already in the conversation where none does."
metadata:
  version: "0.1.5"
  component-type: "skill"
  acknowledgement: "The re-pitch trigger and the controlled-register idea come from the wait-what skill by Matt Pocock, MIT licensed. No text was carried across."
# description must stay on ONE physical line. A blank line or a wrap inside it
# truncates the value in the measurement tooling, silently and without warning.
description: "Composes the AskUserQuestion call itself: question text, one call or a sequence, a label against its description, options that compare and show their costs, the one recommendation and the fact behind it, the layout: single-select, multiSelect or preview, what you have not checked, and how to read a reply of free text, a note, a skip or silence. Use when the call is the deliverable, including whether to ask at all, a rejected call or one that hangs, and rewriting or tightening the plain wording of a question nobody could answer. Do not use when the artifact wanted is prose about asking rather than a question: a guide, house conventions, training material. Do not use when a wider job merely pauses to ask along the way, since implementing a spec, adjudicating a decision, interviewing for requirements, reviewing a diff and closing a session carry their own prompts. Do not use to render the dialog, fix a broken host or SDK integration, build a survey or a form, or page through many items."
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

The four marked **[terminal]** describe the Claude Code terminal dialog, which is
one implementation among the hosts that may draw this question. Everything
unmarked is a property of the tool itself and holds wherever the tool exists. The
marker appears nowhere else in this block, so its absence here means something.

- **The dialog covers the conversation.** While it is open, the reader cannot see
  what you wrote above it, cannot scroll back, cannot open the file you are
  asking about, and cannot ask you a follow-up question. Context you put in the
  message before the call is invisible at the moment the reader needs it.
  Everything required to decide goes inside the call. In plan mode the blindness
  has a second source: the reader cannot see the plan until you leave that mode, so
  a question referring to it is unanswerable by construction. Name the thing rather
  than pointing at where it is written.
- **No option is pre-selected, and there is no `recommended` field.** The tool's
  own prompt says to make the recommended option first and to end its label with
  `(Recommended)`. That is the whole mechanism, so a recommendation you state in
  the prose around the call never reaches the reader.
- **A call with one single-select question has no review screen.** **[terminal]**
  It submits on the keystroke that picks an option, so the reader cannot look again
  before it lands. Section 5 says what that costs the first option.
- **Duplicate question text or duplicate labels reject the whole call.** Question
  texts must differ across the call, and labels must differ inside one question.
  The schema enforces this, so the reader never sees the dialog. Two options that
  both read `Keep it` are the usual way this happens.
- **An option's returned value is its whole label, `(Recommended)` suffix
  included.** Match the full string. If you trim the suffix before comparing, a
  correct answer looks unrecognised, and this bites on the ordinary path where the
  reader picked exactly the option you marked.
- **Only `preview` renders markdown, and only two fields keep a line break.** Four
  author-facing fields, three different pipelines:

  | Field | A newline in it | Markdown in it |
  |---|---|---|
  | `question` | kept | not rendered — backticks and asterisks print as themselves |
  | `preview` | kept | rendered in full: headings, lists, tables, code fences |
  | `label`, `description` | **becomes a replacement character** | not rendered |

  So a line break in a label or a description does not break the line. It prints a
  `�` glyph in the middle of the sentence. Any string that carries structure —
  a list, a group, anything past one line — can only live in the question or in a
  preview, and `references/layout.md` is how you shape it once it is there.
- **One preview switches the whole question, and the switch drops every
  description.** Adding a `preview` to a single option on a single-select question
  puts the whole question into the preview layout, which draws a pointer, an index
  and the label for each option and nothing else. The descriptions are not
  shortened and not scrolled. They are not displayed. Everything you wrote about
  what an option costs is gone, the dialog still looks finished, and the free-text
  box goes with them. Decide the layout before you write the descriptions.
- **Each layout takes something away, and it takes it silently.** **[terminal]**
  The tool appends its own escapes, but not everywhere:

  | Layout | Free-text `Other` | Conversational escape |
  |---|---|---|
  | plain list | yes | yes, `Chat about this` |
  | `multiSelect` | yes | yes, `Chat about this` |
  | `preview` | **none** | a footer row |

  A preview question has no `Other` at all, so the reader's only way to say
  something is a note on an option they may not want to pick. The tool's own prompt
  promises the model that `Other` is always there, and a preview question breaks
  that promise without saying so. A screen reader moves both columns: `Chat about
  this` becomes an option in the list, disappears from `multiSelect`, and the
  preview layout is disabled outright, so a preview reader gets a plain list.
- **A `multiSelect` question throws your previews away without a word.** Nothing
  validates the combination, so you get a plain checkbox list and lose whatever you
  spent composing them.
- **Previews are on by default, and the format setting does not gate them.**
  **[terminal]** `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` resolves to `markdown` in
  an ordinary terminal session, and the renderer never reads it: a single-select
  question carrying a preview gets the preview layout whatever the setting says. It
  decides two other things — whether preview guidance reaches your own prompt, and
  whether HTML shape validation runs. Under `html` a preview must contain at least
  one tag, so plain text is a hard error there rather than a passthrough, and a
  terminal prints the tags literally in any case. A short terminal hides the
  overflow behind a `lines hidden` count, which argues for previews that compare
  rather than previews that document.
- **Multi-select answers come back as one comma-separated string**, not an array.
  Split on the comma before you match a label.
- **A skip is not consent.** It records that the reader declined to choose. It does
  not authorise the option you would have preferred.
- **`1` to `4` questions per call and `2` to `4` options per question are hard
  schema limits.** The tool refuses anything past them, even when the reader asks
  for more. `header` belongs to the question; `label` and `description` are
  required on every option. The cap belongs to the schema and not to the screen —
  a long list does scroll on a short terminal, and what that costs the reader is
  the side-by-side comparison the options were written for. Hosts have shipped bugs
  that draw the first question and drop the rest. None is known at this build, so
  split for dependency, per Section 2, not for fear of the host.
- **`header` is cut at 48 display columns, not at the 12 it asks for.**
  **[terminal]** The 12 is advisory and no validator reads it. The real sequence is
  a cut at 48 columns and then a second cut by the tab strip, where an over-long
  header eats the space its neighbours needed.
- **You may not be able to ask at all.** The tool is absent in subagents and in
  chat-channel sessions, a host can omit it from the toolset, and `dontAsk`
  permission mode denies the call. In a non-interactive run — `-p`, `--print`, no
  TTY, and a scheduled run for the same reason — it exists only where the host
  configures a permission-prompt tool. None of these degrade gracefully. Section 1
  says what to do instead.

## 1. Decide whether to ask at all

Asking is not the safe default. A dialog costs the reader a context switch, so it
has to buy a decision that is genuinely yours to lose.

First check that you can ask. Where the tool is missing, per the Gotchas above,
do not wait on a call that will hang or resolve empty: write the question and its
options into your own reply and hand it to whoever dispatched you, so a caller who
does have the tool can put it to a person.

Ask when the fork is real: two or more paths are defensible, the choice changes
what you build next, and you cannot settle it from evidence available to you.

Then let reversibility break the tie that test leaves. A change you could revert in
a few lines is yours to make even where the fork is real, because being wrong costs
one revert. A one-way door earns a question even where you are confident, because
confident and right are not the same thing and only one of them is recoverable.

Ask on arrival, not in advance. A fork three steps ahead can be perfectly real and
still not worth raising: the work may never reach it, and an answer given in the
abstract is given without the facts that would have decided it.

Five things look like decisions and are not. Do not spend a call on them:

- **A confirmation.** You already know the answer and you want cover for it.
- **A progress report.** Nothing forks. Say it in prose and continue.
- **A value only the reader can supply**, such as a name, a key or a path.
  Inventing four candidate values wastes the option slots. Ask in prose.
- **A mechanism whose premise is still open.** You are asking how before anyone
  has agreed whether.
- **A retry ladder.** The options are attempts in sequence — the cache, then the
  API, then the manual path. Offered as a question it returns an ordering, because
  an ordering is what you handed over. Run the ladder and report where it stopped.

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

One pairing passes the independence test on paper and fails a reader: a decision
together with a question about what happens next. Any combination of the two
answers makes sense, so the test permits it, and the reader still meets one dialog
asking them to choose and to plan a sequence at the same time. Ask the decision.
The sequencing usually follows from the answer, and where it does not it is a call
of its own, later.

## 3. Write the question text

State the decision in one sentence, ending in a question mark. Around 25 words is
the working ceiling **for that sentence**, not for the field around it, which may
carry context lines too — `references/layout.md` exists because a question can be
long and structured.

Where brevity and completeness pull against each other, **completeness wins.**
Everything needed to decide goes inside the call; brevity is what you spend the
room that is left on. A short question that leaves the reader unable to choose has
failed, and a long one that is long because the decision carries that much has not.
Cutting context to hit a length is how a call comes back as `what are you asking
me?` — a round trip against the few words the fact would have cost.

The question carries what all the options share, so the options do not repeat it.
Name the thing being decided, the consequence that makes it matter, and what the
reader is being asked to do about it. If they need a fact to choose, that fact
belongs here, not in the message above. A call doing a second job at the same time
— checking a layout, reporting progress — leaves the reader unable to tell which
of the two they are answering.

**Three shapes, and the decision picks which.** It fits in a sentence, so it is a
sentence. Or it needs several things weighed but nothing that has to be *rendered*,
so those stay in the question field and `references/layout.md` says how to lay them
out — headers, markers, one blank line between groups, 60 columns. Or it needs
rendering, a diff or a table or styled text, so it goes in `preview`, the only field
that renders markdown; price that first, per the Gotchas, because it costs you every
option description.

Past all three it is not one question. Split it, or decide the parts you can and ask
about the one you cannot. `examples.md` has a finished call of each shape.

**In the middle shape, orient first and decide last**: an opening line saying what
this is about, the context under it, and the decision sentence at the end against
the options. `references/layout.md` rule 13 carries why, and the case where the rule
says nothing.

- Weak: `How should we handle this?`
- Weak: `Which approach do you prefer for the migration?`
- Better: `The migration drops the legacy search index. Rebuild it now, or ship without
  it and rebuild on the next deploy?`

For a `multiSelect` question, phrase it as a plural selection, such as
`Which checks should run before the push?`.

## 4. Write the options

The label and the description do different jobs. The label is what the reader
scans; the description is what the reader decides on.

**Label:** one to five words naming the outcome. The distinguishing difference, not
a restatement of the question. Labels are read side by side, so they have to differ
in the word that matters. `Yes`, `No`, `OK`, `Cancel`, `Proceed`, `Approve`, `Skip`
and `Defer` all fail on the same point, and so do `Option A` and `Approach 1`: they
are short, they distinguish, and they say nothing about what happens. `Rebuild now`
against `Ship without it` costs the same characters and carries the decision.

**Description: two parts, in this order, both required.**

1. What happens if the reader picks this.
2. What it costs, forecloses, or risks.

The second part is the one that gets dropped, and it is the part that does the
work. A reader has to be able to tell from the screen that an option went wrong
for them, and only the cost tells them that. An option described by its benefit
alone hides the consequence while every sentence in it stays true, which is the
failure that survives proofreading. Write the cost of the option you are
recommending as plainly as the cost of the others.

Options also have to be comparable. Compare them on the same axes, in the same
order, in the same units, so a reader scanning down finds the real difference
rather than a difference in how you wrote them. Parallel structure is what makes
the scan work, not a stylistic preference.

Cover the space. Options are mutually exclusive unless `multiSelect` is set, and
the set should include the do-nothing path where one exists, and the option you
would rather the reader did not take. A set of options that omits the honest bad
choice reads as a decision already made.

Draw the set from what this project actually has: check that each option names a
mechanism that exists here before you finalise it. A set assembled from habit
offers something this project does not have and omits the thing it uses, and every
word of it can still be well written.

Never author an `Other`, `None` or `Skip`
option: on the two layouts that append their own, yours competes with the real one
and spends a slot, and on a preview question it does not give back what the layout
took — reconsider the layout instead.

## 5. Mark exactly one recommendation

A recommendation is three things on **one** option, and all three are required:

1. It is **first** in the options array.
2. Its label ends with ` (Recommended)`.
3. Its own description carries the justification.

Use the platform's own spelling, capital R, because the tool's prompt instructs
every model to write `(Recommended)` and a second spelling puts two conventions in
front of one reader. The tool reads the label as an opaque string, so case matters
to the person rather than to the parser.

Position is part of the rule because it is the only positional affordance the tool
gives you: ordering is half of what makes a default read as one, so a marker on the
third option fights the reading order. Only one option can be first, which makes a
second marker visibly inconsistent. Nothing stops you writing two, so this is a rule
you check rather than a limit the tool enforces.

**First position is also the cheapest to choose by accident.** The first option is
the default, and a default is taken more often than the same option placed
anywhere else. That holds wherever the dialog is drawn, and the terminal sharpens
it, because a single-question call submits on one keystroke. So never put a
destructive or one-way option first, even when you would otherwise recommend it.
Where the option you recommend is the irreversible one, add a second question that
confirms it. Where a second round trip costs more than the steer is worth,
leave the recommendation unmarked instead and say in the question text why you are
not steering.

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

Where a gap in your own evidence could change which option is right, name it in the
description it bears on. Put it in the question text where it bears on every option
equally, since that is what the question is for. `I have not run the test suite
against the second option` costs one clause and moves a risk from hidden to shared.

Where there is no real gap, write nothing. A manufactured caveat trains the
reader to skim caveats.

## 7. Choose the layout

Single-select is the default. Reach past it deliberately, and read the layout table
in the Gotchas first, because the preview layout removes escapes the reader may
need:

- **`multiSelect: true`** when the choices genuinely combine, such as which of
  four checks to run. The 2-to-4 option cap still applies, so group or split when
  you have more. It keeps both escapes, so a reader who wants to say something can.
- **`preview`** when the reader is comparing rendered things — two variants of a
  message, two diffs — or when the decision carries more structure than a question
  can hold, per Section 3. Pay the price the Gotchas name: with the descriptions
  gone, whatever distinguishes the options has to be in the labels, in the
  question, or visible in the preview itself. The only thing a reader can still say
  is a note on an option, opened with `n`, so say in the question text that the key
  exists — someone who cannot find a way to qualify their answer picks nothing. It is
  a large-terminal feature: the pane is the terminal's width less 34 columns and its
  height less 26 rows. Make the previews differ visibly: one that documents rather
  than compares wastes the one thing the layout buys.

## Wording and layout

Every string in the call is read once, cold, under time pressure. Write them in
ASD-STE100 Simplified Technical English, the controlled-language specification from
the AeroSpace and Defence Industries Association of Europe — one statement per
sentence, active voice, simple tenses, one word per concept, no idiom — reduced to
the rules that carry in a dialog.

Then use the project's own words. Where the repository carries a vocabulary or
domain-language document, take the reader's nouns from it, so the question uses
the name they use. Where it carries none, take them from the conversation you are
in. Do not import a synonym from your own vocabulary for a thing the project has
already named.

Read `references/wording.md` when a string will not come down to one clause, when
you have to justify a rewrite to whoever wrote the original, and — however short
your strings already are — before the first call in a codebase whose vocabulary you
have not used before. It carries each of those rules by its number in the
specification, with worked rewrites, and the read-aloud test for whether the nouns
you picked are the reader's. Skipping it costs you a question that reads fluently
and still cannot be answered cold.

Read `references/layout.md` **before** you compose anything with parts — a list,
groups, anything past a single line. It carries thirteen rules with the check that
decides each one: the line budget, the blank-line rhythm, the group caps, the
marker set, and who owns the padding on a drawn box. Skipping it is how a call
arrives with a list that will not align and a marker one cell wide on your terminal
and two on the reader's.

## Pre-flight, run as a loop

Check the call against this list, fix what fails, then check the fixed version
again. One clean pass on a first draft says nothing about the third, because a
rewrite for one item routinely breaks another. Stop when a pass finds nothing.

1. Question count is 1 to 4. Option count is 2 to 4 per question.
2. Every question text differs from the others, and every label differs from its
   siblings. A duplicate on either rejects the call.
3. Every option has a `label` and a `description`; every question has a `header`.
4. No option is named `Other`, `None`, or `Skip`, and every label names an outcome
   rather than an act of answering.
5. Every option names something this project has.
6. Exactly one label ends with ` (Recommended)`, and it is the first option. Or no
   label does, and the question text says the options are equivalent.
7. The recommendation's justification is in its own description and cites a fact.
8. The first option is not destructive or one-way.
9. Every description names a cost, a risk, or something foreclosed.
10. Descriptions compare on the same axes, in the same order, in the same units.
11. Nothing needed to decide sits outside the call, and the call is doing one job.
12. No `preview` on a `multiSelect` question, and no `preview` on a question the
    reader may need to answer in their own words. Where there is a preview, no
    description is carrying anything the reader needs.
13. No line break in any `label` or `description`.
14. Sentences are short, active, and use the project's own words. Anything with
    parts passes the checks in `references/layout.md`.

## When a question fails

When someone tells you they cannot answer, or asks what you are talking about,
the question failed. The fix is a rewrite of the call, not more prose around it.

Read `references/failed-question.md` when a question has already failed, or when
you are rewriting someone else's. It carries seven failure modes, a table mapping what
the reader said onto which one you hit, and the rewrite for each. Open it before
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

## Asking a second time

Two calls in one piece of work make a run, which has properties one call does not:
how long the reader thinks this goes on, and what their earlier answer still
authorises.

Read `references/asking-again.md` when you are about to ask again. It branches on
what happened to the last call, because the repairs point opposite ways — a skipped
call must not be re-sent, while a clean answer that opened a new fork should be
followed up rather than left. Skipping it is how an approval quietly widens past
the words the reader agreed to.

## The shape of a finished call

`examples.md` holds one finished call of each shape in Section 3: a decision that
fits in a sentence, one that needs rendering and goes to a preview, and one that
needs context but not rendering and keeps it in the question, plus one that failed
five times with its diagnosis and repair. It ends with the table that chooses. Open it when you want the finished artifact rather than
the rules, or to measure a draft against calls that pass all of them.

The step most often dropped is the second half of an option description: the
cost. A call whose options list only their benefits looks finished and leaves the
reader unable to recognise a mistake they have already made.
