# Reading the reply

Open this when the reply is not exactly one of your labels. Each shape below
authorises something different, and two of them authorise nothing at all.

## Table of Contents

- [The matching mechanic](#the-matching-mechanic)
- [What each shape looks like](#what-each-shape-looks-like)
- [The shapes, and what each one licenses](#the-shapes-and-what-each-one-licenses)
- [The rule that covers all of them](#the-rule-that-covers-all-of-them)

## The matching mechanic

SKILL.md's Gotchas carry the fact that an option's returned value is its whole
label, `(Recommended)` suffix included, because it bites before you ever open this
file. The operational consequence belongs here: keep the bare name separately when
you need it for a later message, rather than deriving it by trimming the reply.
Trimming works until the day the label you trim is the one the reader chose.

## What each shape looks like

Recognition is this file's whole job, so here is every shape as the value that
arrives, before the sections that say what each one licenses. Match against these,
not against the prose.

| Shape | What arrives |
|---|---|
| One label | `Rebuild now (Recommended)` — the whole label, marker included |
| Multi-select | `Types, Unit tests, Integration` — one string, comma-joined |
| Free text | `can we do the third thing instead` — their words, no label |
| Note on a selection | the label, with the note carried alongside it |
| Note with no selection | `(notes only)` — an answer whose option did not send |
| Pasted image | `Looks wrong to me (Image attached)`, or `(Image attached)` alone |
| Chat about this | a denial carrying an instruction to reformulate, with any selection and notes attached |
| Skip, or a timeout with nothing selected | nothing arrives to match |
| Timeout with a partial selection | what was selected, reported alongside the timeout |

Two of those rows are the ones that bite. `(notes only)` matches no label you wrote
and is not free text either — the result reports it as no option selected, with the
note beside it. Read it as an answer that lost its option on the way, not as a
refusal to answer. And `(Image attached)` is a suffix on the answer rather than part
of it, so trimming it off to match a label is right and ignoring the image is not.

## The shapes, and what each one licenses

### One label, on a single-select question

The reader chose. Proceed with that option and do not re-confirm it. A second
dialog asking whether they meant it spends their attention on a decision they
already made. The stated exception is the confirming question Section 5 of
SKILL.md requires when the option they picked is the destructive or one-way one;
that call is the rule being followed, not a re-confirmation of it.

### A comma-separated string, on a multiSelect question

The body's Gotchas carry the fact that these arrive comma-joined rather than as an
array. What belongs here is what to do with it: trim each part before matching,
because the join is `", "` and a leading space fails an exact comparison.

Two edge cases worth handling rather than assuming away. An empty result means the
reader selected nothing, which is a decline rather than a selection of none — treat
it as a skip. A result naming every option is a real answer and not a mis-click, so
do not second-guess it.

### Free text the reader typed

The tool appends a free-text box on the plain-list and `multiSelect` layouts, so on
those you get this without authoring it. **A preview question has no free-text box**,
and there the nearest equivalent is a note attached to a selection, covered below.
Free text means the reader rejected your option set.

It can be longer than a terminal line suggests. `ctrl+g` opens the box in the
reader's own editor, so a considered paragraph is a shape you should expect rather
than treat as unlikely, and it is worth reading in full before you act on it.

Read it as a finding about the call, not as noise to be coerced. The nearest label
is usually not what they meant, and mapping their text onto it silently discards
the one piece of information the call produced. Act on what they wrote where it is
unambiguous; where it is not, ask a corrected question whose options now cover the
space they named.

Free text that names a fifth option means your options missed the space. Free text
that restates one of your options in different words usually means that option's
label was unclear, which is worth fixing before you ask anything else.

### A note attached to a selection

The reader picked an option and qualified it. The note is a constraint on the pick,
not a comment on it, and it usually contains the part they were not willing to
leave implicit.

A note can only have come from a single-select question carrying a preview, which is
the layout with no free-text box. So a note is the whole of what that reader could
say, and it is worth reading as such.

**A note without a selection arrives as the literal string `(notes only)`.** The
result reports no option chosen, so matching it against your labels finds nothing
and reading it as free text mistakes a marker for content.

**It is not a skip.** Read it as a reader who meant to choose AND to qualify the
choice, and whose choice did not send. That is what the dialog invites: notes exist
only in the preview layout, where the digit keys move the highlight without
selecting, so a reader can move to an option, press `n`, type the qualification that
mattered to them, and submit — believing they have done both. They engaged more than
someone who picked a label. Treating that as a refusal throws away the more
considered answer of the two.

What did not arrive is which option. The note is attached to the question, not to a
row, so the selection has to be **recovered rather than assumed**:

- **The note usually names it.** `only for staging, prod needs a change window` is a
  qualified yes on a deploy question. Take it.
- **Where it does not, ask once and cheaply.** Put the options back with the note
  quoted, so the reader confirms rather than retypes. A four-word question here costs
  far less than acting on the wrong row.
- **Never match the note to the nearest label by similarity.** A note is a
  constraint, not a restatement, and the closest-looking option is a guess wearing
  the shape of an inference.

Then honour the note as binding. A pick plus `but only for the staging environment`
is not approval for production, and proceeding as though the bare label was the whole
answer is the failure this shape exists to prevent.

### A skip

The reader declined to choose. This authorises **nothing**.

A skip is not consent, not agreement with your recommendation, and not permission
to take the option you would have picked. Work out why the question was
unanswerable and repair it, for which `failed-question.md` has the failure modes. Where
the decision turns out not to have been a real fork, take the decide-it-yourself
path in SKILL.md instead.

Where the decision is destructive, outward-facing, or hard to reverse, a skip is a
stop. Do not read absence as authorisation for anything you could not undo.

### Chat about this

The reader wants a conversation rather than a pick, which means the question
arrived before they had what they needed to answer it, or the framing was wrong.

This does not abandon the question. It comes back as a denial carrying an
instruction to reformulate, **with whatever they had already selected and any notes
they had typed attached**. So you are not guessing at what they wanted: read the
partial state, and start by asking what they would like to clarify. Answer in
prose, then ask again only if a fork survives the conversation.

An escape, by contrast, denies with no feedback at all — there is nothing to read
and nothing to infer from it.

### Nothing at all

A question can time out, but only where the reader has turned that on. It is a
setting of theirs — 60 seconds, 5 minutes, 10 minutes, or never — and unset means
no timeout at all, so silence is usually a person rather than a clock. Where it
does fire, whatever they had already selected survives and is reported.

A timeout carries the same authority as a skip, which is none. It is weaker evidence
about the question's quality, though, because the reader may simply have been
elsewhere.

One observable tells the two apart. A timeout reports whatever had already been
selected, so a partial selection coming back with it means they saw the dialog and
engaged with it, and it should be read as a skip and diagnosed. Nothing at all
alongside the timeout is consistent with their never having seen it, and re-sending
the same question is reasonable. That is the only evidence available, so where it is
absent, take the reading that authorises less.

### An image the reader pasted

Both non-preview layouts accept a pasted image. The answer arrives with
`(Image attached)` appended, or as that string alone where they pasted without
typing, and the images themselves travel alongside as content.

Read the suffix as a signal to go and look rather than as part of the label. A
reader who pasted a screenshot has usually answered the question in it, and the
text beside it is a caption rather than the reply.

## The rule that covers all of them

Only two shapes authorise action on the option you wanted: an exact label match,
and free text that unambiguously says so. Everything else either narrows what you
may do or authorises nothing.

When you are unsure which shape you have, take the reading that authorises less.
The cost of asking again is one round trip. The cost of reading a skip as a yes is
an action the reader did not agree to.
