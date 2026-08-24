# Three finished calls

One complete AskUserQuestion call for each of the three shapes Section 3 names, as
the artifacts to imitate. Read them when you want the finished thing rather than the
rules that produce it; SKILL.md carries the rules and the pre-flight loop that checks
them.

They run in order of how much the decision carries: one that fits in a sentence, one
that needs rendering, and one that needs context but not rendering. The last table
chooses between them.

## Table of Contents

- [One decision that fits in a question](#one-decision-that-fits-in-a-question)
- [One decision that does not](#one-decision-that-does-not)
- [What the reader actually sees](#what-the-reader-actually-sees)
- [One decision that fits, but only just](#one-decision-that-fits-but-only-just)
- [Choosing between the three](#choosing-between-the-three)
- [One that failed, five times](#one-that-failed-five-times)

## One decision that fits in a question

```json
{
  "questions": [
    {
      "question": "The migration drops the legacy search index. Rebuild it now, or ship without it?",
      "header": "Index",
      "options": [
        {
          "label": "Rebuild now (Recommended)",
          "description": "Runs the rebuild inside this migration. Your index is 40 MB, so this adds about two minutes of downtime. The deploy window you booked is thirty."
        },
        {
          "label": "Ship without it",
          "description": "Deploys immediately with no downtime. Search returns no results until someone rebuilds the index by hand. Nothing in the deploy reminds them."
        }
      ]
    }
  ]
}
```

Read the second description again. It states the benefit, then the failure mode, in
the same order as the first and in the same units. A reader who picks it and then
finds search empty can tell from that text that they chose it — which is the whole
job of the cost half, and the half that gets dropped.

The question carries the fact that makes the decision necessary, so nothing the
reader needs sits in the message above the dialog. The recommendation is first, its
label ends with the marker, and its justification is a number from this situation
rather than a virtue any option could claim.

## One decision that does not

The contradiction the skill exists to resolve: everything needed to decide goes
inside the call, and the question runs to about 25 words. Four breaking changes,
each with its own cost, will not fit in 25 words. The way out is not to break
either rule — the question carries the decision and the `preview` carries the
structure, because it is the only field that renders markdown.

Each option carries its own preview, so the reader arrowing between them sees the
same four items change verdict. That is the comparison the layout is for.

```json
{
  "questions": [
    {
      "question": "The auth library's v4 has four breaking changes that reach us, and the release ships Friday. How much of v4 do we take now?",
      "header": "Auth v4",
      "options": [
        {
          "label": "None until the release (Recommended)",
          "description": "Defers all four changes to the next cycle.",
          "preview": "**Four changes reach us. This defers all of them.**\n\n- `Session.get()` ➞ `Session.load()`: 12 call sites\n- Cookie default flips to SameSite=Strict: 1 config\n- `refresh()` drops its callback argument: 3 call sites\n- Node 18 support dropped: we are on 20 ✔\n\nNothing changes this week. The work moves to the next cycle."
        },
        {
          "label": "The two cheap ones",
          "description": "Takes two changes now and shims the other two.",
          "preview": "**Four changes reach us. This absorbs two and shims two.**\n\n- `Session.get()` ➞ `Session.load()`: shimmed, one adapter\n- Cookie flips to SameSite=Strict: pinned to Lax in config\n- `refresh()` drops its callback argument: 3 call sites\n- Node 18 support dropped: we are on 20 ✔\n\nThe shim is code we own until someone removes it."
        },
        {
          "label": "All of it",
          "description": "Takes all four changes before the release.",
          "preview": "**Four changes reach us. This does all of them now.**\n\n- `Session.get()` ➞ `Session.load()`: 12 call sites ⚠\n- Cookie flips to SameSite=Strict: logs out everyone ⚠\n- `refresh()` drops its callback argument: 3 call sites\n- Node 18 support dropped: we are on 20 ✔\n\nTwo of the four need testing against the staging tenant."
        }
      ]
    }
  ]
}
```

The question is 24 words. It states the decision and the deadline that makes it
matter, and it does not enumerate the options — the labels do that. Everything a
reader weighs is in the previews, where it renders as a list rather than arriving as
one long sentence. The three options run in order of degree, which is rule 12: none,
some, all.

**Now look at the descriptions, because this is the trap.** The preview layout draws
a pointer, an index and a label for each option, and displays no description at all.
Every one of those three sentences is written on the assumption that nobody will
read it: each restates its label and carries nothing a reader needs. That is the
only safe way to write a description on a preview question.

A composer who copies this shape and then writes the costs into the descriptions —
which is the natural instinct, and what every non-preview question asks for — has
moved the reasoning into the one field this layout discards, and the dialog still
looks finished. Decide the layout before you write the descriptions, not after.

The glyphs are the set in `references/layout.md`: `➞` for what a name becomes, `⚠`
on the two items that need work beyond a rename, `✔` on the one that costs nothing.
The lists are markdown rather than authored markers, because a preview renders
markdown and the renderer owns the layout.

## What the reader actually sees

The JSON above is the author's side, and the escaped string hides the shape. This is
the recommended option's preview as it arrives in the pane:

```text
Four changes reach us. This defers all of them.

  • Session.get() ➞ Session.load(): 12 call sites
  • Cookie default flips to SameSite=Strict: 1 config
  • refresh() drops its callback argument: 3 call sites
  • Node 18 support dropped: we are on 20 ✔

Nothing changes this week. The work moves to the next cycle.
```

Three things the escaped string does not show. The `**` is gone and the first line
arrives with weight on it. The four `-` items are drawn as a list, indented, with a
marker the renderer picks — the bullet above stands in for it, and the exact glyph is
not yours to choose, which is why rule 5 sends you to markdown here instead of the
glyph set. And the backticks around `Session.get()` become code styling rather than
literal characters.

The fourth thing is the point of the layout, and it only becomes obvious rendered:
the four rows line up. A reader arrowing between the three options sees the same four
items in the same order with their verdicts changing, which is the comparison the
preview exists for. In JSON that is a claim; on screen it is just true.

Only the recommended option is rendered here. The other two have the same shape with
different verdicts, and showing them would repeat the mechanism rather than add to it.

**Check the geometry before you commit to this layout.** The pane is the terminal's
width less 34 columns, and the box inside it takes four more, so the text has
`columns − 38` to work with. The widest line above is 60 display cells, which renders
unwrapped from about 98 columns and wraps below that. The pane is also the terminal's
height less 26 rows, so on a short terminal the preview truncates and the rest goes
behind a `lines hidden` rule. That is what `references/layout.md` means by calling
previews a large-terminal feature, and it is worth knowing before the descriptions
are gone rather than after.


## One decision that fits, but only just

The commonest real case, and the one the 25-word ceiling gets misread on. Several
things a reader must weigh, none of which needs *rendering* — so the structure stays
in the question field, where it costs nothing, rather than going to a preview and
taking every option description down with it.

```json
{
  "questions": [
    {
      "question": "Checkout has been failing for 6% of sessions since 14:20.\n\nWhat We Know:\n• All failures are card payments through the EU gateway.\n• The gateway's own status page reports no incident.\n• Our error rate tracks their p99 latency exactly.\n\nAlready Tried:\n• Retrying the failed calls: same failure, same rate.\n• Failing over to the US gateway: blocked by PCI routing.\n\nRoll back the 14:15 deploy, or hold it and rate-limit?",
      "header": "Checkout",
      "options": [
        {
          "label": "Roll back the deploy (Recommended)",
          "description": "Reverts to the 13:40 build, which ran clean for four hours. The pricing fix that shipped at 14:15 goes with it, and that fix has its own open ticket."
        },
        {
          "label": "Hold and rate-limit",
          "description": "Keeps the pricing fix and caps checkout at 40 per minute. The failing 6% keep failing, and the cap slows down everyone who was fine."
        }
      ]
    }
  ]
}
```

The decision sentence is 10 words and sits at the end, where it reads as the
question the context has been building to. The field around it is 12 lines. Both of
those are correct at once, which is the thing Section 3 exists to say.

**Why each line is there, which is the only justification that counts.** The rate
and the timestamp, because 6% since 14:20 is a different decision from 90% since
last week. The EU gateway and the status page, because they are what rules out our
own code and rules out waiting for the vendor. The p99 correlation, because it is
the whole reason to believe the diagnosis. And the two things already tried, because
without them the reader's first instinct — retry it, fail over — is a suggestion
that has already failed, and they would have to spend a round trip to find that out.

Nothing else about the incident is in there. Anything that could not be justified in
that form came out, and being able to say why each line survived is what separates a
long question from a padded one.

**Where the line is.** One more group and this needs rule 4's cap taken seriously:
four groups is the ceiling, and past it the reader is holding the group set in mind
while reading inside it. Anything needing a diff, a table, or styled text is not this
shape at all — that is the preview above, and it is a different trade. And if the
context here were genuinely twice this long, the honest read is that it is not one
question: split it, or decide the parts you can and ask about the one you cannot.

## Choosing between the three

| The decision | Where it goes | What it costs |
|---|---|---|
| Fits in a sentence | The question, one sentence | Nothing |
| Needs things weighed, no rendering | The question, laid out | Nothing but the layout rules |
| Needs rendering | A `preview` per option | Every option description |
| Exceeds all three | Not one question | A round trip, or your own judgement |

The middle row is the one composers skip, and skipping it is expensive in both
directions: reach for a preview and the costs you wrote get discarded, or cut the
context to keep the question short and the reader cannot decide at all.

Note what the descriptions do in this third call, against what they do in the second
one. Here they are displayed, so they carry the costs and do the work Section 4 asks
of them. There they are discarded, so they carry nothing. Same field, opposite
instructions, and the layout is what decides which you are writing.

## One that failed, five times

Not invented. This call went to a reader five times during the session that produced
this skill, and was rejected five times. It is here because the reason is not the one
a careful composer would look for.

```json
{
  "questions": [
    {
      "question": "Eleven real gaps were found between the retired skill and the new one. Which should I close?\n\nDECIDE WHETHER TO ASK\n`reversibility` tiebreaker is missing, so Section 1 gives the opposite verdict on a one-way call\n`ask on arrival` is absent — Section 1 never says when to raise a fork\n`retry ladder` is not among the four non-decisions\n\nLABELS AND OPTIONS\nthe `meta-label` ban is absent, so `Yes` and `No` pass every rule\noptions are drawn from habit rather than from what the project has\n\nBATCHING AND SEQUENCE\nthe independence test licenses a decision plus a sequencing question\n`series position` and `run budget` return zero hits\n`re-ask hygiene` is missing from the rewrite reference\n\nSCOPE AND HOSTS\napproval scope is stated for notes only\n`plan mode` invisibility returns zero hits\nmulti-question host fragility is unverifiable at this build",
      "header": "Coverage",
      "options": [
        {
          "label": "Items 1 to 8 (Recommended)",
          "description": "Closes the seven body-shaped gaps and the reference-shaped one. Leaves the three ranked lowest on confidence for a later pass.",
          "preview": "**Eight of eleven**\n\nThe seven body-shaped gaps cost about 320 tokens\nagainst roughly 600 spare, so they fit together."
        },
        {
          "label": "Items 1 to 4",
          "description": "Closes only the four strongest. Cheapest to review, and leaves seven known gaps open in a skill about not leaving gaps."
        },
        {
          "label": "All eleven",
          "description": "Closes everything found. Two of the eleven rest on claims that could not be verified against the current build."
        }
      ]
    }
  ]
}
```

The content is accurate, the grouping is sensible, and the descriptions state real
costs. It passes a proofread. It is still unanswerable, and the reader's eventual
reply was that all eleven looked problematic and could there be a better way to
integrate them — which is an answer to a question that was never asked.

### The diagnosis, worst first

**The eleven were findings, not options.** They are what the reader needs in order to
decide. Putting them in the option slots turned context into choices, and there is
nothing to choose between a finding and another finding.

**The three options are cut points, not approaches.** `Items 1 to 8` and `Items 1 to
4` differ by where somebody stopped counting. Nobody holds a view about that. They
compare perfectly — same axis, same units, same order — which is why the comparability
repair in `failed-question.md` would have produced a tidier version of the same dead
end. Mode 7 in that file is this failure, and it exists because of this call.

**The real decision was never asked.** It was *how* to integrate eleven findings, and
that has three genuine answers: fold each into the section that owns its topic, append
one new section listing them, or close the wrong-guidance ones now and defer the rest.

Only then the layout, and it is the least of it: four ALL-CAPS headers costing reading
speed against Title Case, six of twenty lines past the 60-column budget, and ten
backticked identifiers that render as literal backtick characters because a question
renders no markdown.

**And the descriptions were never displayed.** One option carried a preview, so the
whole question took the preview layout and every description was discarded — including
the costs, which were the one part doing real work. The reader never saw them, and
from the author's side the question simply would not land, with no signal saying why.
That is this file's own warning, caught happening to the person it was written for.

### The repair

```json
{
  "questions": [
    {
      "question": "Eleven gaps between the retired skill and this one.\n\nWrong Guidance, Not Silence:\n⚠ The ask-or-decide test lost its reversibility tiebreak.\n⚠ The label rule lets Yes and No through unchallenged.\n⚠ Batching permits a decision plus a sequencing question.\n\nMissing From Section 1:\n• Nothing says to ask on arrival, not three steps early.\n• A retry ladder is a plan, and is offered as a choice.\n\nMissing From Options And Replies:\n• Options are not checked against what the project has.\n• Approval scope is stated for notes only ➞ it widens.\n• Re-asking has no hygiene rule ➞ it reads as a duplicate.\n\nMissing From The Gotchas:\n• Series position and run budget appear nowhere.\n• Plan mode hides the plan a question refers to.\n• Multi-question host fragility is unverified here.\n\nHow should I integrate them?",
      "header": "Coverage",
      "options": [
        {
          "label": "Fold into owning sections (Recommended)",
          "description": "Each gap goes in the section that already covers its topic. Costs a careful pass over six sections, and the three wrong-guidance ones need their existing rule rewritten rather than extended."
        },
        {
          "label": "One new section",
          "description": "Adds the eleven as a list of new rules in one place. Fastest to write and to review, and it leaves each rule far from the section it contradicts."
        },
        {
          "label": "Close the three, defer the rest",
          "description": "Fixes only the guidance that currently points the wrong way. Leaves eight known silences in the file, and a second pass has to reopen all of this."
        }
      ]
    }
  ]
}
```

**What changed, and what did not.** All eleven are still there, because the reader
cannot judge how to integrate findings without knowing what they are. What changed is
that they are context rather than options, and that they are grouped by where each one
lands — which is the thing the integration decision actually turns on.

**This is the case that tests whether the standard survives contact.** Eleven items is
a lot, and the temptation is to shrink the problem: summarise by class, cite a count,
promise detail later. Each of those throws away what the reader needs to answer. The
layout is what makes them readable instead — four groups, none over three items, one
marker column, every line inside 60 display cells.

**It is at rule 4's ceiling, and you should see that.** Four groups is the cap. A fifth
would not be a layout problem to solve with tighter wording; it would be the signal
that this is not one question, and the answer then is to split it or decide part of it
yourself. The standard is being used at its limit here, deliberately.

The first group takes `⚠` as its marker rather than `•`, because every item in it
carries the same status — rule 5's per-group condition, with the other three groups
keeping `•` in the same field.

The options are approaches now, so each one is a position somebody could hold and
argue against, and the descriptions carry their costs and are displayed, because
nothing here needs rendering and no preview is in the way.

Measured: 22 lines, widest 58 display cells, four groups at rule 4's ceiling, and a
five-word decision sentence at the end where rule 13 puts it.
