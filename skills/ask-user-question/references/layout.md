# Laying out a call that carries structure

Open this when you are shaping something with parts — a list, groups, more than one
line — rather than writing one sentence. For getting a single sentence down to one
clause, that is `register.md`.

Layout applies to two fields only. A line break in a `label` or a `description`
becomes a replacement character rather than a line, so the only fields that can
hold a shape are `question`, which keeps line breaks and renders no markup, and
`preview`, which keeps line breaks and renders markdown in full. Deciding which of
those two carries the structure is the first decision, and SKILL.md's Gotchas carry
what a preview costs you.

## The twelve rules

Each carries the check that decides whether a string passes. They apply
inside `question` and `preview`, which are the only fields that keep a line break.

The recommendation rules — one marker, first position, the justification and the
cost in the recommended option's own description — are in SKILL.md and are not
repeated here. What belongs to layout is the order of everything *after* the first
option, which is rule 12.

### 1. Budget 60 display columns, and produce the wrap yourself

**Check:** no physical line exceeds 60 display columns, measured in display cells
rather than characters.

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

### 5. In a `question`, one marker: `∙`. In a `preview`, markdown lists

**Check:** every leading marker in a question is `∙`, at one level. A preview uses
markdown's own list syntax and no authored marker at all. No `•`, no circled
numeral, and no emoji anywhere something must line up after it.

The field decides this rather than taste. A question is plain text, so a marker is
the literal character you typed and its width is yours to get right. A preview runs
a markdown renderer, so `-` is drawn as a list and nesting is the renderer's problem
instead of yours.

`∙` rather than `◦` because a filled mark reads as a primary item where a hollow one
reads as subordinate to something, and at a single level there is nothing for it to
be subordinate to. Both survive on width — one display cell whatever the reader's
terminal does with East Asian Ambiguous characters — which is why the choice between
them comes down to how they read. `•`, the one you would reach for first, is
Ambiguous at one cell or two and shifts every column after it on its line. An emoji
carrying a variation selector is always two cells, which is why a warning sign
arrives wider than the space budgeted for it.

Inline, an ambiguous glyph costs nothing — `2 files · 40 lines` has nothing aligned
after it. The rule is about leading markers in a column, and about anything inside a
padded block.

**One level is the whole set, and that is a diagnostic rather than a limitation.**
Wanting a second level of nesting inside a question means the content has outgrown
the field — rule 4 caps a group at five items and a list at four groups, inside a
60-column budget. The answer is to move it to a preview, where the renderer gives
you nesting for nothing. That is the same resolution SKILL.md reaches for when a
decision will not fit in 25 words, and it is the same signal: the question field is
full.

### 6. Indent a continuation to its item's text column

**Check:** every continuation line begins at the text column of the item it
continues, never at column 0, and the wrap is a real newline you wrote rather than a
hope about the host.

Use a hanging indent of four. The alternative is a description column aligned per
group, and it is for the case where every item is a short name followed by an
explanation; it costs you one width calculation per group, which is why it is not
the default. Mixing the two inside one string is a defect either way.

### 7. Front-load the word that distinguishes the item

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

### 9. Parallel items take parallel structure

**Check:** items in one group begin with the same part of speech and compare on the
same axes in the same order.

This is the same rule the option descriptions obey, applied one level down. A reader
scanning a list finds the real difference only when the writing is not itself a
difference.

### 10. Number only when the number carries information

**Check:** remove the numbers. If nothing is lost, they were decoration.

Numbering is justified when the reader must refer back to an item by number, when
the order is procedural, or when the count is the point. It costs two or three
columns against one for a marker, which is a real fraction of a 60-column budget.

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

## A string that resists, worked

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

- Retry backoff is fixed at 100 ms, so a slow dependency stampedes.
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
refers back to an item by number. No drawn box. The longest line is well inside 60
columns.

The question carrying it stays short, because the preview is doing the work:
`Eleven findings, four of them blocking. Fix the blocking two now, or take the
whole list in one pass?`

**The same content in a question field would look different, and worse.** There you
would write it with `∙` at one level, and the four group headings would have to
carry the grouping alone with no nesting available — which is rule 5's diagnostic
firing. Four groups is already at rule 4's cap. That is the signal that the content
belongs in a preview, and it is the same signal, read from the other direction, as
a decision that will not fit in 25 words.
