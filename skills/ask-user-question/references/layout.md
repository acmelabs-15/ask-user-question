# Laying out a call that carries structure

Open this when you are shaping something with parts — a list, groups, more than one
line — rather than writing one sentence. For getting a single sentence down to one
clause, that is `wording.md`.

Layout applies to two fields only. A line break in a `label` or a `description`
becomes a replacement character rather than a line, so the only fields that can
hold a shape are `question`, which keeps line breaks and renders no markup, and
`preview`, which keeps line breaks and renders markdown in full. Deciding which of
those two carries the structure is the first decision, and SKILL.md's Gotchas carry
what a preview costs you.

## The thirteen rules

Each carries the check that decides whether a string passes. They apply
inside `question` and `preview`, which are the only fields that keep a line break.

The recommendation rules — one marker, first position, the justification and the
cost in the recommended option's own description — are in SKILL.md and are not
repeated here. What belongs to layout is the order of everything *after* the first
option, which is rule 12.

### 1. Budget 60 display columns in a `question`, and wrap it yourself

**Check:** no line *you write* into a question exceeds 60 display columns, measured
in display cells rather than characters.

The budget is about authored line structure, so three cases fall outside it. A
one-paragraph question with no newlines in it is wrapped by the host and is not a
breach however long it runs. A preview is wrapped by its renderer. And `label` and
`description` cannot hold a line break at all — a newline there becomes a
replacement character — so the host wraps those too and the budget never reaches
them.

You cannot detect the terminal width and the pane is narrower than the terminal, so
budget blind and clamp low. Well-behaved command-line tools clamp their help output
to a fixed width for the same reason; the one widely-used tool that adapts instead
is the one that visibly overflows a narrow terminal.

### 2. One blank line between groups, none inside a group, never two anywhere

**Check:** every run of blank lines has length exactly 1, and no blank line sits
between two items of the same group.

A group reads as a group when the gap between groups exceeds the gap within it. One
blank line already gives that. A second one buys no separation and spends a third of
a pane that does not scroll.

### 3. A group header only where there are two or more groups

**Check:** one group means no header, because the question already names the thing.
Two or more means every group has one, flush left, in Title Case with a trailing
colon, and no header sits above a group of one item.

Never all capitals. Reading speed drops measurably in all caps, and the mechanism is
that mixed case gives each word a distinctive silhouette while capitals make every
word the same rectangle.

### 4. Five items to a group, four groups to a list

**Check:** no group over five items, no list over four groups. A breach means the
question is too big, not that the layout is wrong.

The upper bound anyone can hold at a glance is small, and the four-group cap is the
tighter constraint of the two: the reader has to keep the group set in mind while
reading the items inside it.

### 5. In a `question`, `•` then `◦`. In a `preview`, markdown lists

**Check:** an unnumbered question list uses `•` at the top level and `◦` one level
in, and stops there. A numbered list takes `➊` to `➓` instead, and only where rule
10 says a number earns its place. A preview uses markdown's own list syntax and no
authored marker at all.

The field decides this rather than taste. A question is plain text, so a marker is
the literal character you typed and its width is yours to get right. A preview runs
a markdown renderer, so `-` is drawn as a list and nesting is the renderer's problem
instead of yours.

Filled then hollow, which is the convention a reader already knows and does not have
to be told. Both are full size, so the pair differs in fill rather than in scale: `•`
reads as a primary item and `◦` as subordinate to the one above it, and the two levels
distinguish themselves without a header doing the work. A small mark over a large one
would say the opposite of the hierarchy it marks.

**Two levels, and a third is a diagnostic rather than a limitation.** Wanting a third
means the content has outgrown the field — rule 4 caps a group at five items and a
list at four groups, inside a 60-column budget, and three levels of nesting inside
those caps is a shape nothing real fits. The answer is to move it to a preview, where
the renderer gives you nesting for nothing. That is the same resolution SKILL.md
reaches for when a decision will not fit in 25 words, and it is the same signal: the
question field is full.

### 6. Indent a continuation to its item's text column (`question` only)

**Check:** every continuation line begins at the text column of the item it
continues, never at column 0, and the wrap is a real newline you wrote rather than a
hope about the host. A preview is exempt, because its renderer wraps and indents
lists itself — writing your own indent there fights it.

**Two columns per level.** A top-level `•` sits at column 0 with its text at column
2, so a continuation of that item aligns at column 2. A nested `◦` sits at column 2
with its text at column 4. Keep it the same the whole way down. The alternative is a
description column aligned per group, for the case where every item is a short name
followed by an explanation; it costs a width calculation per group, which is why it
is not the default, and mixing the two inside one string is a defect either way.

Compute the indent for the marker you actually used. This is the reason the glyph
set matters to layout at all: a continuation aligned under a one-cell marker sits
wrong under a two-cell one.

### 7. Put the word that tells items apart first

**Check:** truncate every item in a group to its first 11 characters. If the items
are still distinguishable and each still says what it is, the group passes. If
several truncate to the same prefix, rewrite them.

A reader scanning a list sees about two words of each item. An item beginning
`Introducing`, or `Update the`, has spent its whole visible budget before it says
anything.

### 8. Every item is a sentence: a verb, a capital and a full stop

**Check:** read the group. Every item contains a finite verb and ends in a period.
Sentence case throughout. The one exception is a group whose items are all bare
names — a filename, a flag, a command — where none of them takes a verb or a period.
Mixed is the defect in either direction.

The verb is what makes the check mechanical. `Faster` gives the reader nothing to
act on; `Rebuilds the index on the next deploy.` does. The rule defaults to the
sentence because most groups have something to say about each item, and a group
that genuinely does not is the narrow case the exception covers.

### 9. Write every item in a group the same way

**Check:** items in one group begin with the same part of speech and compare on the
same axes in the same order.

This is the same rule the option descriptions obey, applied one level down. A reader
scanning a list finds the real difference only when the writing is not itself a
difference.

### 10. Number only when the number carries information

**Check:** remove the numbers. If nothing is lost, they were decoration.

Numbering is justified when the reader refers back to an item by number, when the
order is procedural, or when the count itself is the point. A number carrying none
of those is noise regardless of what it costs.

Where it is justified, number with `➊` to `➓`. They are one display cell each, the
same as a marker, so numbering is not the width trade it looks like: `1.` and `10.`
spend two and three columns of a 60-column budget and these spend one.

The set runs to ten, and running out is a signal rather than an inconvenience. Rule
4 caps a group at five items and a list at four groups, so a list reaching for an
eleventh number has already outgrown a question field. The answer is the one rule 5
gives: move it to a preview, where markdown numbers the list for you and the cap
stops applying.

### 11. Draw a box only where the host owns the padding

**Check:** for any drawn box, ask who computes the padding. The host, in the preview
pane: free, and it reads well. You: do not draw it.

A box you draw needs every line padded to an identical display width, and three
parties have to agree on what that width is — your arithmetic, the host's, and the
terminal's. The box-drawing characters are themselves Ambiguous, so the same string
is one or two cells per character depending on a setting you cannot see, and a
single face can carry the box characters in one weight and none in another. The cost
model settles it even where the rendering holds: an N-line box is N padding
computations that must stay correct through every future edit, and one added word
breaks the block silently. Indentation costs nothing per line and degrades to
slightly ragged rather than visibly broken.

### 12. Order the options after the first one, for a reason you could state

**Check:** the options after the recommended one are in an order you could state
the reason for: by cost where they differ mainly in what they spend, by risk where
they differ in what they endanger, and by degree where they are one action at
different strengths. Not the order you happened to type them in.

With two to four options the dialog sits squarely in the range where the first
things read carry the most weight. The tool already puts the recommendation first,
so what is left to decide is everything below it, and an arbitrary order quietly
promotes whichever option was typed second.

### 13. Orient first, decide last

**Check:** the first line of a multi-line question says what the question is about.
The decision sentence is the last line, with the context between them. Where the
question has no context at all, the sentence is the whole field and this rule says
nothing.

Both ends earn their position. A reader meeting four lines of background with no
idea why is reading blind, and cannot tell which details matter until they reach the
end. A decision sentence stranded at the top is separated from the options by
everything between it and them, so the reader has to hold it in mind while reading
or scroll back up to it — and the options are rendered directly under the field,
which makes the last line the one adjacent to where they act.

**This is rule 7 rather than an exception to it.** Front-loading says put the
distinguishing thing first, and at the level of a whole field the distinguishing
thing is the subject — what this is about — not the question mark. The decision
sentence is a different element with a different job: it is the handoff to the
options. The two rules only look like they disagree if you read rule 7 as being
about sentences rather than about whatever the reader scans first.

## The glyph set

One glyph per job, so that two composers making the same call produce the same
string. The table governs the `question` field only. A preview renders markdown, so
its lists, its numbering and its emphasis are the renderer's and none of the width
arithmetic below is yours — reaching for this table while composing a preview means
you are working harder than the field requires.

| Job | Glyph |
|---|---|
| Leading marker, top level | `•` |
| Leading marker, nested one level | `◦` |
| Numbered item | `➊` … `➓` |
| Passed, satisfied, present | `✔` |
| Failed, rejected, absent | `✗` |
| Trap or warning | `⚠` |
| The item under discussion | `❯` |
| Leads to, becomes, produces | `➞` |
| Inline separator | `·` |

Use them where they help a reader digest something. A column of `✔` and `✗` against
a list of checks is read at a glance where the words `passed` and `failed` are read
one at a time, and `➞` carries a sequence in one cell. A glyph that decorates rather
than distinguishes is noise, and rule 10's test applies to all of them: take it out,
and if nothing is lost it was decoration.

### The one width rule

**Do not mix width classes inside a single aligned column, and compute a hanging
indent for the marker you actually used.**

That is the whole of it. Two glyphs in the table are East Asian Ambiguous and render
at one cell or two depending on a terminal setting you cannot see: the top-level
marker `•` and the inline separator `·`. Everything else is Neutral and is one cell
everywhere.

Ambiguity matters less than it sounds, which is why it does not disqualify either of
them. A marker used consistently down a list lines up with itself at either width,
and the separator has nothing aligned after it — `2 files · 40 lines` cannot cost you
anything. The failure needs a mix: two width classes in one aligned column, or an
indent computed for a width the glyph does not render at. So do not start one item
with `•` and its neighbour with `➊`, and do not hand-count columns from a marker
whose width is not yours to know.

### Two things that stay prohibited

Neither is about fonts or taste.

**`⚠️` with the variation selector.** The bare `⚠` is one cell and `⚠️` is the same
character plus a selector and is always two. They are indistinguishable in your
editor, they align differently on the reader's screen, and the emoji form has been
observed degrading to a substitute glyph. Use the bare one.

**Box-drawing for a drawn box.** Not for its width: a box needs a closing right edge
whose padding you compute and then keep correct through every future edit to every
line inside it, and one added word breaks the block silently. Rule 11 has the cost
model. Content that wants a box goes in a preview, where the host draws the border
and owns the padding.

## Eleven findings, in a preview

The hardest real case is a decision carrying many items — the shape that makes the
self-containment rule and the 25-word question fight each other. The resolution is
the `preview` field: the question states the decision in one sentence, and the
structure goes in the preview, which is the one field that can hold it.

Eleven findings across four groups. Because this is a preview, the list is markdown
and the renderer draws it (rule 5):

```markdown
**Blocking**

- Auth token logged in plain text at api/session.ts:88.
- The migration drops rows where tenant_id is null.

**Should Fix**

- Retry backoff is fixed at 100 ms, so slow calls stampede.
- Two callers construct the same URL by hand.
- The cache key omits the locale.

**Worth Knowing**

- Four tests assert on log text rather than on behaviour.
- The fixture loader reads from disk on every case.

**Cosmetic**

- Three files mix tabs and spaces.
```

Every rule is visible in that block. One blank line between groups and none inside.
Title Case headers, because there are four groups. No group over five items. Every
item is a sentence with a verb and a full stop, and they are parallel — each names
the thing and then what is wrong with it. Nothing is numbered, because nothing
refers back to an item by number. No drawn box.

The question carrying it stays short, because the preview is doing the work:
`Eleven findings, four of them blocking. Fix the blocking two now, or take the
whole list in one pass?`

## Three checks, in a question

Not everything needs a preview. Three checks and their outcomes fit in a question,
and this is what the glyph set is for:

```text
Pre-push checks:

• Types ✔
• Unit tests ✔
• Integration ✗ (two failures in the billing suite)
  ◦ Both call the payment sandbox ➞ its key expired.
  ◦ ⚠ Neither test failed on the last green build.

Push anyway, or fix the key first?
```

Every glyph is doing work a word would do more slowly. The `✔` and `✗` column is
read at a glance where `passed` and `failed` are read one at a time. `➞` carries the
inference in one cell. `⚠` marks the fact that changes what the failure means. `◦`
puts the detail under the check it belongs to without a header, which is the second
level earning its place. Nothing is numbered, because nothing refers back by number.

Rule 8 lands differently at each level, and correctly. The three top-level items are
bare names carrying a status, so none of them takes a verb or a full stop; the two
nested items are statements, so both do. Each level is consistent with itself, which
is what the rule asks for.

That is two levels and it stops there. A third would mean the content had outgrown
the field, and the answer would be the preview above — the same signal, read from
the other direction, as a decision that will not fit in 25 words.
