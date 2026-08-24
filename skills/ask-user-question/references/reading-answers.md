# Reading the reply

Open this when the reply is not exactly one of your labels. Each shape below
authorises something different, and two of them authorise nothing at all.

## The matching mechanic

SKILL.md's Gotchas carry the fact that an option's returned value is its whole
label, `(Recommended)` suffix included, because it bites before you ever open this
file. The operational consequence belongs here: keep the bare name separately when
you need it for a later message, rather than deriving it by trimming the reply.
Trimming works until the day the label you trim is the one the reader chose.

## The shapes, and what each one licenses

### One label, on a single-select question

The reader chose. Proceed with that option and do not re-confirm it. A second
dialog asking whether they meant it spends their attention on a decision they
already made.

### A comma-separated string, on a multiSelect question

Multi-select answers arrive as **one string with the selections joined by commas**,
not as an array. Split on the comma and trim before matching each part.

Two edge cases worth handling rather than assuming away. An empty result means the
reader selected nothing, which is a decline rather than a selection of none — treat
it as a skip. A result naming every option is a real answer and not a mis-click, so
do not second-guess it.

### Free text the reader typed

The tool appends a free-text box on the plain-list and `multiSelect` layouts, so on
those you get this without authoring it. **A preview question has no free-text box**,
and there the nearest equivalent is a note attached to a selection, covered below.
Free text means the reader rejected your option set.

Read it as a finding about the call, not as noise to be coerced. The nearest label
is usually not what they meant, and mapping their text onto it silently discards
the one piece of information the call produced. Two responses are defensible: act
on what they wrote if it is unambiguous, or ask a corrected question whose options
now cover the space they named.

Free text that names a fifth option means your options missed the space. Free text
that restates one of your options in different words usually means that option's
label was unclear, which is worth fixing before you ask anything else.

### A note attached to a selection

The reader picked an option and qualified it. The note is a constraint on the pick,
not a comment on it, and it usually contains the part they were not willing to
leave implicit.

Honour the note. A selection plus `but only for the staging environment` is not
approval for production, and proceeding as though the bare label was the whole
answer is the failure this shape exists to prevent.

### A skip

The reader declined to choose. This authorises **nothing**.

A skip is not consent, not agreement with your recommendation, and not permission
to take the option you would have picked. Two paths are open: take the
decide-it-yourself path in SKILL.md, or work out why the question was unanswerable
and repair it, for which `re-pitch.md` has the failure modes.

Where the decision is destructive, outward-facing, or hard to reverse, a skip is a
stop. Do not read absence as authorisation for anything you could not undo.

### Chat about this

This control appears on single-select questions only. The reader wants a
conversation rather than a pick, which means the question arrived before they had
what they needed to answer it, or the framing was wrong.

Do not re-ask. Answer them in prose, then ask again only if a fork survives the
conversation.

### Nothing at all

A question can time out. The available windows are 60 seconds, 5 minutes, 10
minutes, or never.

A timeout carries the same authority as a skip, which is none. It is weaker
evidence about the question's quality, though, because the reader may simply have
been elsewhere. Where you have reason to think they never saw it, asking the same
question again is reasonable; where they saw it and let it lapse, treat it as a
skip and diagnose.

## The rule that covers all of them

Only two shapes authorise action on the option you wanted: an exact label match,
and free text that unambiguously says so. Everything else either narrows what you
may do or authorises nothing.

When you are unsure which shape you have, take the reading that authorises less.
The cost of asking again is one round trip. The cost of reading a skip as a yes is
an action the reader did not agree to.
