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

## Table of Contents

- [The thirteen rules](#the-thirteen-rules)
- [The glyph set](#the-glyph-set)
- [Eleven findings, in a preview](#eleven-findings-in-a-preview)
- [Three checks, in a question](#three-checks-in-a-question)

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

**Check:** every run of blank lines has length exactly 1, no blank line sits between
two items of the same group, and **no blank line sits under a group header**.

The header belongs to the group it introduces. A blank on both sides of it leaves it
floating between two groups, and a reader has to work out from the words alone which
one it labels. Measured, the convention is unanimous: `gh`, `cargo` and `kubectl` all
put a header's items on the line immediately beneath it, and none of the 430
blank-line runs sampled sat between a header and its own contents.

A group reads as a group when the gap between groups exceeds the gap within it. One
blank line already gives that. A second one buys no separation and spends a third of
a pane that does not scroll.

Three spacings are wrong for three different reasons, and the shape shows it faster
than the sentence does:

```text
Blocking:                         Blocking:
                                  • The cache key omits the locale.
• The cache key omits the         • Two callers build the same URL.
  locale.
                                  Should Fix:
• Two callers build the same      • Retry backoff is fixed at 100 ms.
  URL.


Should Fix:
• Retry backoff is fixed at
  100 ms.
```

On the left, a blank under the header leaves it floating, blanks between items break
one group into three, and a doubled blank spends two lines to say what one says.

### 3. A group header only where there are two or more groups

**Check:** one group means no header, because the question already names the thing.
Two or more means every group has one, flush left, in Title Case with a trailing
colon, and no header sits above a group of one item.

The one-group case is the one worth seeing, because a header there looks like tidiness
and is noise:

```text
Findings:                         • The cache key omits the locale.
• The cache key omits the         • Two callers build the same URL.
  locale.
• Two callers build the same
  URL.
```

The header on the left partitions nothing. The question already said what these are.

Never all capitals. Reading speed drops measurably in all caps, and the mechanism is
that mixed case gives each word a distinctive silhouette while capitals make every
word the same rectangle.

### 4. Five items to a group, four groups to a list

Three words, nested. An **item** is one marked line. A **group** is a header plus
the items under it. The **list** is every group in one field — not one bulleted
block, so a question with two separate blocks still gets four groups in total.
`examples.md`'s eleven-finding call is the shape: one field, four groups, about
three items each.

**Check:** no group over five items, no list over four groups. A breach means the
question is too big, not that the layout is wrong.

**The ceiling is larger than it sounds.** Four groups of five is twenty items in one
question. If a question feels cramped by this rule, count before rewriting it —
almost nothing real reaches twenty.

**The two caps are not equally evidenced, and it is worth knowing which is which.**
The five-item cap sits inside a measured distribution of the same quantity: thirty
command groups across four well-regarded tools, median four items, sixty percent at
five or fewer. The four-group cap has no such distribution behind it. It is
transferred from a working-memory limit of about four chunks — and that limit
measures what someone holds in mind without looking, where a written list can be
looked at again.

The transfer is defensible but it is a transfer. What carries it is that the group
*set* really is held rather than re-read: a reader carries the partition while
reading inside one group, and does not go back to the headers each time. What argues
against it is that the same survey behind the five-item cap found tools using six
groups and nine in a single screen. Those are scrollable reference documents read
with a specific lookup in mind, not a pane read once cold, which is why the number
was not simply copied from them.

Four is kept because the specimen sits at exactly four and is readable, which is the
only direct evidence anyone has for this dialog. Treat it as the softer of the two
caps: a group of six is a defect, and a fifth group is a signal to look again at
whether this is one question.

### 5. In a `question`, `•` then `◦` — unless the group carries a status

**Check:** an unnumbered question list uses `•` at the top level and `◦` one level
in, and stops there. A numbered list takes `➊` to `➓` instead, and only where rule
10 says a number earns its place. A preview uses markdown's own list syntax and no
authored marker at all.

**Where every item in a group carries a status, the status glyph replaces the
marker.** `✔ Types` rather than `• Types ✔`. This is rule 7 applied to status: a
column of identical bullets carries nothing and makes the reader hunt to the end of
each line for the verdict, where a column of `✔` and `✗` puts the answer first and
gives two columns back to the budget.

The payoff differs with the statuses, and both are worth reaching for. Where they
vary — `✔ ✔ ✗` — the column is informative row by row, and a reader finds the failure
by scanning one column instead of reading to the end of every line. Where they are
uniform — three `⚠` — the column says nothing row to row and instead marks that whole
group against its neighbours, so the severity survives a reader whose eye lands
mid-list rather than on the header. The uniform case is the easier one to miss, and
it is where reaching for the rule is least obvious.

The condition is evaluated per group, not per list, so one group can take status
markers while its neighbour keeps `•` — that is the condition applying twice rather
than an inconsistency. A group where only some items carry a status keeps `•`,
because a ragged left edge reads as an error and the scannable column does not exist
unless every row has one. Nested items keep `◦` whatever they carry: a nested line is
subordinate to the one above it, and that is what its marker encodes.

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

The rule is that items must differ early, because a reader scanning a list does not
read to the end of each line before moving on. The check below is a mechanical proxy
for it, not a second rule.

**Check:** truncate every item in a group to its first 11 characters. If the items
are still distinguishable and each still says what it is, the group passes. If
several truncate to the same prefix, rewrite them.

Eleven is the truncation a study of **link text** used — 80 participants over 20
links — where a third of the links left readers unable to say where they led. It is
a transfer from link scanning to dialog items, so treat the number as a usable proxy
rather than a measured threshold for this medium.

That study also reported that eleven characters is about two words. The two framings
agree until a first word is long, and where they disagree the character count is the
one to trust: `Introducing` is eleven characters and one word, and it was the worst
performer in that study for exactly that reason. A long first word spends the whole
visible budget on itself.

**When the distinguishing word genuinely cannot come first**, hoist the shared part
into the group header rather than repeating it down the column. `Retry the upload`
and `Retry the manifest` become a `Retry:` header over `upload` and `manifest`. That
is what rule 3's headers are for, and it is the escape that keeps this check
followable — a check with no way out gets ignored rather than obeyed.

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

The numeral takes the marker's place rather than following it:

```text
• ➊ The cache key omits the       ➊ The cache key omits the locale.
  locale.                         ➋ Two callers build the same URL.
• ➋ Two callers build the
  same URL.
```

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

That last part is what prose cannot show. A drawn box does not fail loudly; it fails
one line at a time as the content moves under it:

```text
┌────────────────────────────┐   ┌────────────────────────────┐
│ The cache key omits it.  │   │ The cache key omits the  │
│ Two callers build a URL. │   │ locale entirely.       │
└────────────────────────────┘   │ Two callers build a URL. │
                              └────────────────────────────┘
```

Three words were added on the right. One line's padding went with them, and the line
nobody recomputed is the one the reader sees.

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
| Leading marker, top level | `•` — or the status glyph, per rule 5 |
| Leading marker, nested one level | `◦`, always |
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

✔ Types
✔ Unit tests
✗ Integration (two failures in the billing suite)
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
