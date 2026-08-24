---
title: "ANALYSIS-005: Monospace Decision Dialog Layout Rules"
type: analysis
status: DRAFT
permalink: analysis/analysis-005-monospace-decision-dialog-layout-rules
tags:
- analysis
- readability
- terminal-typography
- dialog-design
- monospace
---

# ANALYSIS-005: Monospace Decision Dialog Layout Rules

> Thirteen rules for laying out a decision dialog when the only formatting available is monospace text with preserved whitespace. Each rule states its check, its evidence, and its confidence class. Six rules rest on measurements taken for this note; four rest on published measurement; three are convention or judgement and say so.

## Context

The AskUserQuestion dialog renders monospace text with newlines, blank lines and indentation preserved, no markdown, no colour, no weight, no size, and emoji degraded to monochrome glyphs. The dialog covers the conversation, so the call carries its own context. The design space is therefore terminal typography: whitespace, indentation, alignment, glyph choice, grouping, ordering and word count.

The question this note answers is narrow: **how should the text inside that dialog be laid out so a cold reader can read it once and decide?** The motivating case carries eleven items in four groups inside a single option description.

Two things make the usual advice inapplicable. First, almost all readability research is on proportional type, and a monospace grid changes the character-per-line arithmetic. Second, most terminal-output advice assumes the program can detect the terminal width and adapt; a dialog author cannot detect anything and must budget blind.

## Executive Summary

The three rules that make the most difference are a hard line budget, a single blank line as the only grouping device, and a marker glyph chosen from the set that is present in every monospace font at an unambiguous width. Everything else is refinement.

The most consequential measured finding is about glyphs. The owner's two candidates fail in opposite ways, and both failures are checkable. The middle dot is present in all seven monospace faces measured but is classified East Asian Ambiguous, so it occupies one cell or two depending on a terminal setting the author cannot see. The circled numerals are the reverse: unambiguous in width but effectively absent from monospace fonts, with `➊` present in one of seven faces and `➀` and `❶` in none. The set that is both universally present and unambiguous is small: `-`, `*`, `>`, `∙`.

The second consequential finding is that decoration is not a taste question but a padding-ownership question. A hand-drawn box requires every line padded to an identical display width, computed by a width function that must agree with the host's and with the terminal's. Box-drawing characters are Ambiguous-width, so the same string is one or two cells wide depending on configuration. Where the host draws the border — the preview pane — a box costs nothing, because the host owns the padding. Where the author draws it, it is a standing debt paid on every future edit.

On the owner's observation that lowercase fragments read worse than complete sentences: no controlled study either way was found. What exists is unanimous convention on consistency and a checkable operational test from Google's style guide — does the item contain a verb — that captures the same intuition without needing the sentence-hood claim to be true.

## Approach

Evidence was gathered in three classes and the note keeps them separate, because a rule labelled "convention, not measured" is more useful than one dressed as fact.

**Measured here.** Glyph coverage was measured by parsing the `cmap` table of seven monospace faces directly: the four Menlo weights, Monaco, Andale Mono, Courier New, SF Mono, Cascadia Code and 3270 Nerd Font Mono. Width class was resolved against the Unicode 17.0 `EastAsianWidth.txt` data file. Structural conventions were measured by capturing the help output of git, ripgrep, cargo, kubectl, npm, gh, bun and jq on this machine with colour disabled, then measuring line lengths, indent columns, group sizes and blank-line runs programmatically.

**Published measurement.** Line length, all-caps reading speed, scannability, first-two-words scanning, working-memory capacity, default effects, warning click-through and warning habituation.

**Convention.** The Microsoft Writing Style Guide, the Google developer documentation style guide, the Command Line Interface Guidelines and Nielsen Norman Group dialog guidance. These are documented and widely followed but are not experimental results, and several say so themselves.

Where a rule rests on a mechanism nobody has observed in this specific dialog, the rule says which observation would settle it. Two such gaps are listed in their own section rather than buried.

## Findings

Rules are ordered by how much difference each makes to whether a cold reader can decide on one pass.

### Rule 1: Budget every line to 60 display columns and hard-wrap it yourself

**Check.** Compute the display width of every physical line in the composed string using a wcwidth implementation, not `String.length`. No line exceeds 60.

**Evidence.** Published measurement puts the readable range at 45 to 75 characters per line, with Bringhurst's 45 to 75 the most-cited frame, Ruder's 50 to 60 the tighter one, and WCAG 1.4.8 setting 80 as a ceiling. Both extremes are held to slow reading: too wide and the eye loses the start of the next line, too narrow and the return sweep interrupts the rhythm.

Measured here: ripgrep hard-caps its help output at 80 columns regardless of the terminal, returning a maximum line length of exactly 80 at `COLUMNS` values of 40, 80, 120 and 200. cargo adapts, producing maxima of 60, 79 and 106 at those widths. gh does not adapt at all, producing a 110-column maximum even at `COLUMNS=60`, which is why gh output visibly overflows in a narrow terminal. Two of the three well-regarded tools clamp; the one that does not is the one that breaks.

The dialog author is in a worse position than any of them, because the pane is narrower than the terminal and its width is not detectable. 60 is chosen as the ripgrep-style conservative clamp minus room for the dialog's own chrome and indentation.

**Confidence.** High that a budget is needed and that it should be conservative. Medium on the specific number 60, which is judgement: the published range supports anything from 45 to 75, and the dialog's actual pane width has not been measured. The cheap experiment that would settle it is in the gaps section.

### Rule 2: One blank line between groups, none inside a group, never two anywhere

**Check.** Count consecutive blank lines. Every run has length exactly 1. No blank line appears between two items of the same group.

**Evidence.** Measured here across four tools' help output: gh (9 blank-line runs), kubectl (12), cargo (8) and ripgrep (401). All 430 runs have length 1. Not one double blank line appears in any of them.

The perceptual reason is grouping by proximity: a group reads as a group when the gap between groups exceeds the gap within. One blank line already gives a two-to-one ratio of vertical gap. A second blank line does not improve the ratio meaningfully and costs a third of the vertical budget in a pane that does not scroll.

**Confidence.** High. The 430-run measurement is unanimous and the tools were chosen for being well regarded rather than for agreeing. The proximity argument is an established perceptual principle rather than something measured here.

### Rule 3: Use a group header only when there are two or more groups, and make it Title Case with a trailing colon, flush left

**Check.** Count groups. If one, there is no header — the question already names the thing. If two or more, every group has a header, headers are flush left at column 0, in Title Case, ending in a colon, and no header labels a group of one item.

**Evidence.** Measured here: cargo and kubectl use Title Case plus colon (`Package Selection:`, `Basic Commands (Beginner):`). gh and ripgrep use ALL CAPS (`CORE COMMANDS`, `INPUT OPTIONS:`). The tie is broken by published measurement: Tinker's 1955 work found reading speed drops 10 to 20 percent in all capitals, with a 13.4 percent difference favouring lower case, and a 2019 replication found lowercase read more than 13 percent faster across all grade levels. The mechanism offered is that mixed case gives each word a distinctive ascender-descender silhouette while all caps makes every word a rectangle.

The one-item-group prohibition is measured too: gh's help contains three single-item groups, and gh pr create's contains two. They cost a header line, a blank line and a group slot to convey one item, and they read as noise in the middle of the groups that carry real content.

**Confidence.** High on avoiding all caps, which is measured and replicated. High on the two-group threshold, which follows from the header's only job being partition. Medium on the trailing colon, which is convention split two ways across the four tools measured.

### Rule 4: Cap a group at five items and the list at four groups

**Check.** No group exceeds five items. No list exceeds four groups. If either cap is breached, the question is wrong, not the layout.

**Evidence.** Measured here across gh, kubectl, cargo and gh pr create: 30 groups, median 4 items, mean 5.7, with 60 percent at five or fewer and 77 percent at seven or fewer. The two large outliers are gh's `ADDITIONAL COMMANDS` at 16 and gh pr create's `FLAGS` at 20 — both of which are the everything-else bucket, the group nobody scans and everybody greps.

Convention agrees and is specific. The Microsoft Writing Style Guide states that "a list should have at least two items but (if possible) no more than seven items" and adds a physical test: "the reader should be able to see at least two, and preferably three, list items at a glance."

Published measurement complicates the number rather than fixing it. Cowan's 2001 reanalysis puts the working-memory limit near four chunks; Miller's seven was, by Miller's own later account, a rhetorical device; Nielsen Norman Group's own chunking guidance says the right number "could be anywhere from three to six" and warns that the seven is widely misapplied. The honest reading is that four to five is defensible and seven is the outer edge, not that any number is established.

**Applied to the motivating case.** Eleven items in four groups averages 2.75 items per group, which is inside every threshold above. The risk in that case is not group size, it is that four groups sits at the top of the chunk budget while the reader must hold the group set in mind while reading the items inside it. Three groups would be safer if the eleven items admit a three-way partition.

**Confidence.** Medium. The direction is well supported by both measurement and convention; the specific caps of five and four are judgement, chosen to sit inside the measured distribution rather than at its edge.

### Rule 5: Choose a marker from the set that is both present in every monospace font and unambiguous in width

**Check.** The leading marker is one of `-`, `*`, `>`, `∙`. No circled numeral appears anywhere. No emoji appears in any position where a following character must align.

**Evidence, coverage.** Measured here by parsing the character maps of seven monospace faces. Present in all seven: `-` `*` `>` `·` `•` `∙` `─` `│` `┌` `→` `»` `›` `—` `…`. The rest:

| Glyph | Codepoint | Faces present (of 7) | Notable absences |
|:--|:--|:--|:--|
| `◦` `●` `○` | U+25E6, U+25CF, U+25CB | 6 | Monaco |
| `✓` | U+2713 | 4 | Monaco, Andale Mono, Courier New |
| `▴` | U+25B4 | 4 | Monaco, Andale Mono, Courier New |
| `▸` | U+25B8 | 3 | Monaco, Andale Mono, Courier New, 3270 |
| `‣` | U+2023 | 3 | Andale Mono, Courier New, Cascadia, 3270 |
| `✗` | U+2717 | 3 | Monaco, Andale Mono, Courier New, Cascadia |
| `✔` | U+2714 | 2 | five of seven |
| `↳` | U+21B3 | 1 | six of seven — Menlo only |
| `⚠` | U+26A0 | 1 | six of seven — Menlo only |
| `①` | U+2460 | 1 | six of seven — SF Mono only |
| `➊` | U+278A | 1 | six of seven — SF Mono only |
| `➀` | U+2780 | 0 | all seven |
| `❶` | U+2776 | 0 | all seven |

`➊` is absent from Menlo, the macOS Terminal default, and from Cascadia Code, the Windows Terminal default. Where a glyph is absent, the renderer falls back to a different font, and the fallback is typically proportional, so the glyph is scaled or clipped into the cell rather than drawn at its intended size. This is the mechanism most consistent with the owner's report of `⚠️` arriving as a plain `▲`: `⚠` is present in one of the seven faces measured.

Coverage is per face, not per family, and this is sharper than expected. Menlo Bold contains no box-drawing characters at all, while Menlo Regular contains all of them. Menlo Italic is missing `✓` and `⚠`, which Menlo Regular has. Only `·`, `•` and `∙` of the tested marks survive all four Menlo weights.

**Evidence, width.** Resolved here against the Unicode 17.0 East Asian Width data. Ambiguous — one cell in a Western default, two under a terminal configured to treat ambiguous characters as wide: `·` `•` `→` `—` `…` `‘` `’` `×` `①` `❶` and the entire box-drawing, block-element and most of the geometric-shapes range. Neutral, therefore always one cell: `∙` `◦` `▸` `▴` `‣` `›` `»` `✓` `✔` `✗` `⚠` `➀` `➊` `↳`. Wide, therefore always two cells: `✅` `❌` `❗` `⭐` `🟢` `🔴`.

This is a known and documented failure mode rather than a theoretical one: tmux's own issue tracker records that its filler middle dot and its box-drawing characters are all ambiguous-width and that rendering becomes a mess when wide-ambiguous is selected.

**The two candidates the owner raised fail in opposite directions.** `·` is safe on coverage, present in all seven faces including every Menlo weight, but is Ambiguous on width. `➊` is safe on width but effectively absent from monospace fonts. The intersection of universally present and unambiguous is `-`, `*`, `>`, `∙`, and of those `∙` (U+2219, bullet operator) is the one that reads as a bullet.

**Where `·` is still fine.** Width only matters when something must align after the glyph on the same line, or when the glyph participates in a padded block. As an inline separator inside running text — `2 files · 40 lines` — an ambiguous glyph costs nothing, because nothing downstream is aligned. Reserve the concern for leading markers in an aligned column and for anything inside a drawn box.

**Confidence.** High. Both the coverage matrix and the width classes are direct measurements against primary sources, reproducible from the font files and the Unicode data file. The claim about how fallback renders is mechanism reasoning and is the weakest link in the chain, though it does not change the recommendation.

### Rule 6: Indent a wrapped line to the text column, and produce the wrap yourself

**Check.** Every continuation line begins at the text column of the item it continues, never at column 0. The wrap is a real newline in the composed string, not a hope about the host.

**Evidence.** Measured here, two distinct well-formed patterns. ripgrep uses a hanging indent of four: the item sits at indent 4 and its body at indent 8, with 1050 of its body lines at indent 8 out of 1622 lines total. cargo aligns the description into a second column and recomputes that column **per group** rather than globally — the six groups in `cargo build --help` align at columns 33, 26, 26, 29, 32 and 30 respectively, keeping each group tight instead of padding every group to the widest name in the screen. kubectl takes the opposite approach with one global 16-column name field across all nine of its groups.

Choose per-group alignment when group name lengths differ a lot, global when they do not. Either is defensible; mixing them within one screen is not.

**Confidence.** High that the continuation must be indented and that the author must produce the wrap. Medium on per-group versus global, which is a measured split between two respected tools rather than a settled question.

### Rule 7: Front-load the word that distinguishes the item

**Check.** Truncate every item in a group to its first 11 characters. If two items are still distinguishable and each still says what it is, the group passes. If several truncate to the same prefix, rewrite.

**Evidence.** Published measurement. Nielsen Norman Group's study of the first 11 characters of list items, run with 80 participants over 20 links, found that users typically see about two words, "a little more if the lead words are short, and only the first word if they're long," and that for 35 percent of the links tested, users who saw only the first 11 characters "hadn't the faintest idea" where the link led. The best performer in that study reached 85 percent prediction accuracy and 100 percent selection accuracy; the worst, a link beginning "Introducing", produced no reasonable predictions and 15 percent correct selection.

The broader scannability result is Morkes and Nielsen 1997: 79 percent of test users always scanned a new page and only 16 percent read word by word; scannable writing scored 47 percent higher on measured usability than the control, concise writing 58 percent higher, and all three improvements combined 124 percent higher.

**Confidence.** High. This is the best-measured rule in the note and the check derived from it is mechanical.

### Rule 8: Every item contains a finite verb, starts with a capital, and ends with a period — or none of them do

**Check.** Read the group. Either every item has a verb and a terminal period, or no item has either. Mixed is a defect. Sentence case throughout; Title Case nowhere.

**Evidence, and an honest gap.** The owner observed that lowercase sentence fragments read worse than complete sentences. **No controlled study supporting or refuting that was found.** What exists is convention, and it is unanimous on consistency:

The Microsoft Writing Style Guide: "Begin each item in a list with a capital letter unless there's a reason not to. If necessary, rewrite the list so that all items begin with capital letters or all items begin with lowercase words." And: "Don't use a period at the end of list items unless they're complete sentences or they complete the introductory sentence." And, specifically for lists inside dialogs: "Unless they're complete sentences, don't use punctuation for the list items." An explicit exception releases items of three or fewer words and bare UI labels from periods entirely.

The Google developer documentation style guide gives the operational test: end each item with a period except when the item is a single word, when the item does not include a verb, when it is entirely in code font, or when it is entirely link text or a document title. Alongside it: "Use the same syntax/structure for all list items in a given list, if possible."

On sentence case versus Title Case for the items themselves, design-system guidance is near-unanimous for sentence case and states that sentence case is easier to scan, but no controlled study behind that specific claim was found — treat it as convention. The all-caps finding in Rule 3 is a different claim and is measured.

**Judgement, flagged as mine.** The plausible mechanism behind the owner's observation is not sentence-hood but verb presence and self-containment. A fragment like `faster` gives the reader nothing to act on; `Rebuilds the index on the next deploy.` does. Google's verb test is therefore the operational form of the intuition, and it is checkable, whereas "write complete sentences" is not — a reader cannot reliably tell a complete sentence from a well-formed fragment at a glance. Adopting the verb test gets the observed benefit without needing the sentence-hood claim to be true.

**Confidence.** High on consistency, which every source agrees on. High on the verb test as a check, because it is mechanical. Low on the underlying claim that complete sentences are inherently more readable than fragments, which is unmeasured in both directions.

### Rule 9: Number items only when the number carries information

**Check.** Remove the numbers. If nothing is lost, they were decoration. Numbers are justified when the reader must refer back to an item by number, when the order is procedural, or when the count itself is the point.

**Evidence.** Convention, stated plainly by the Microsoft Writing Style Guide: use a numbered list "for sequential items (like a procedure) or prioritized items (like a top 10 list)" and a bulleted list "for things that have something in common but don't need to appear in a particular order."

The medium adds a constraint the style guides do not have to consider. Because circled numerals are unavailable per Rule 5, a number costs two or three columns of the item's line budget (`1.` or `1)`), against one for a bullet. In a 60-column budget with a hanging indent, that is a real fraction.

**Confidence.** Medium. The convention is clear and consistent; the column-cost argument is arithmetic on the Rule 1 budget rather than something measured.

### Rule 10: Decoration is worth it exactly when the host owns the padding

**Check.** For any drawn box, ask who computes the padding. If the answer is the author, do not draw it. If the answer is the host, it is free.

**Evidence.** A drawn box requires every line padded to an identical *display* width. That requires three things to agree: the author's width function, the host's layout arithmetic, and the terminal's actual cell rendering. Measured here, box-drawing characters are Ambiguous-width in Unicode 17.0, so the same string is one or two cells per character depending on a terminal setting. tmux's issue tracker documents exactly this breaking its own rendering. Coverage adds a second failure mode: measured here, Menlo Bold contains none of the four box-drawing characters tested while Menlo Regular contains all of them, so the same box drawn under a different face falls back to a different font mid-line.

The cost model is the argument. An N-line box is N padding computations that must all remain correct through every future edit to any line inside it, and a single word added to one line silently breaks the block. Indentation is O(1) per line, needs no cross-line arithmetic, and degrades to slightly ragged rather than visibly broken.

The positive case is already available. The separate preview pane renders as a bordered box and reads well precisely because the host draws the border and owns the padding. Content that wants a box belongs there. Content in a field the host may re-flow gets indentation instead.

**Confidence.** High on the mechanism, which rests on two direct measurements and one documented third-party failure. The cost model is judgement, though it matches the observation in the brief that hand-authored boxes misaligned visibly.

### Rule 11: State the recommendation and the one fact behind it, and give the recommended option its cost

**Check.** The recommended item names why it is recommended in one fact, and states its cost as plainly as the alternatives state theirs.

**Evidence.** Published measurement establishes how much weight a default carries. Johnson and Goldstein's 2003 organ-donation work found consent rising from 42 percent to 82 percent in their experiment between opt-in and opt-out framings with identical people and identical stakes.

Published measurement also establishes that dialog design changes adherence by an order of magnitude on the same class of decision. Akhawe and Felt's 2013 field study observed over 25 million warning impressions and measured click-through of 7.2 percent for Firefox malware warnings, 23.2 percent for Chrome malware, 18.0 percent for Chrome phishing and 70.2 percent for Chrome SSL. Same user population, same threat class, an order of magnitude apart on design.

Nielsen Norman Group's confirmation-dialog guidance converges: replace generic labels with ones that summarise the outcome — "Delete file" and "Keep file" rather than Yes and No — because a generic label "prompts automatic clicking," and be specific about the consequence, because "are you sure" invites the reaction "of course I want to do the thing I just told you to do."

**Applied.** Because a recommendation is this powerful, an item that carries one and omits its cost has engineered agreement rather than enabled a decision. Every sentence can be true and the option still hides its consequence.

**Confidence.** High. Two large measured studies and one widely-followed guideline, all pointing the same way.

### Rule 12: Order is not neutral; recommended first, then a stable order

**Check.** The recommended option is first. The remaining options are in an order with a stated reason — cost, risk, or degree — not an arbitrary one.

**Evidence.** Published measurement on serial-position effects in preference construction finds that primacy dominates for short sequences and for higher-quality options while recency emerges for longer sequences and lower-quality ones, and that variability in quality increases primacy and reduces recency. With two to four options — a hard schema limit in this tool — the dialog sits squarely in the primacy regime.

The tool's own mechanism already requires the recommended option to be first, so the bias and the design point the same way here. The rule matters for the *remaining* options, where an arbitrary order silently promotes whichever happened to be typed second.

**Confidence.** Medium-high. The serial-position literature is measured but was established on preference tasks rather than on terminal dialogs, and the effect direction depends on sequence length and option quality.

### Rule 13: Never rely on anything the host might interpret

**Check.** Search the composed string for backticks, asterisk pairs, underscores, leading `#`, leading `>` on its own, and pipe-delimited tables. Each is either literal, and therefore noise, or interpreted, and therefore unpredictable across hosts.

**Evidence.** Measured in the brief's own renders: backticks render literally and no markdown is applied. The Command Line Interface Guidelines make the general form of the point for terminal output — every emphasis mechanism must have a defined behaviour when the channel cannot carry it, which is why they require colour to be disabled when output is not an interactive terminal, when `NO_COLOR` is set, when `TERM` is `dumb`, or when the user asks. A dialog has no equivalent detection, so the only safe assumption is that no emphasis mechanism exists.

What remains for emphasis is position (first line of a group, first word of an item), indentation depth, and word choice. That is the whole palette.

**Confidence.** High, and the checks are mechanical.

## What Could Not Be Verified

Two mechanisms are load-bearing for the rules above and were not observed in this dialog. Both have a cheap test, and neither should be treated as established until run.

**Whether the pane soft-wraps, and where a wrapped continuation starts.** Rules 1 and 6 assume that an over-long line is soft-wrapped by the host and that the continuation begins at column 0, destroying any hanging indent. That is how terminals and most text renderers behave, but it has not been observed here. **Test:** compose one option description containing a deliberately 100-character line whose continuation would need an eight-space indent, and look at the render. If the continuation is re-indented, Rule 6 relaxes; if it starts at column 0, Rule 1's hard-wrap requirement is confirmed rather than assumed.

**Which width function the host uses.** Rule 5's width classes only matter if the host's layout arithmetic and the terminal's rendering can disagree. If the host measures with `String.length` on UTF-16 code units rather than a wcwidth implementation, then every astral-plane emoji already counts as two units for the wrong reason and every alignment the host computes is wrong independently of the terminal. **Test:** render two lines in one description, one padded to a fixed column using only ASCII and one using the same column count with an ambiguous-width glyph in it, and see whether they line up.

A third item is not a gap but a missing measurement worth taking once: **the pane's actual column width**. Emit a ruler line — `0123456789` repeated — inside a description and read off where it wraps. Rule 1's budget of 60 is judgement until that number exists.

## Recommendations

Ranked by how much difference each makes.

1. Adopt the line budget and hard-wrap in the composer, then measure the pane width and correct the number (Rule 1, then the ruler test).
2. Make one blank line the only grouping device, and forbid a second (Rule 2).
3. Restrict leading markers to `-`, `*`, `>`, `∙`; forbid circled numerals and emoji outright; permit `·` inline but not as an aligned leading marker (Rule 5).
4. Add a lint that rejects a hand-drawn box in any author-composed field, and route boxed content to the preview pane instead (Rule 10).
5. Adopt the 11-character truncation check as a composition test for every option group (Rule 7).
6. Adopt Google's verb test as the punctuation rule, and require consistency across a group rather than requiring complete sentences (Rule 8).
7. Cap groups at five items and lists at four groups, and treat a breach as a signal to re-scope the question (Rule 4).
8. Require a group header only above two or more groups, in Title Case, never all caps (Rule 3).
9. Require the recommended option to state its own cost (Rule 11).
10. Run the two verification tests before treating Rules 1 and 6 as settled.

## Observations

### Measured on this machine

- [fact] `➊` U+278A is present in 1 of 7 monospace faces measured (SF Mono only) and absent from Menlo and Cascadia Code, the macOS Terminal and Windows Terminal defaults; `➀` U+2780 and `❶` U+2776 are present in 0 of 7 #glyphs #fonts
- [fact] `·` U+00B7 is present in all 7 monospace faces measured but is classified East Asian Ambiguous in Unicode 17.0, so it occupies one cell or two depending on terminal configuration #glyphs #width
- [fact] The set of tested marks that is both present in all 7 faces and unambiguous in width is `-`, `*`, `>`, `∙` U+2219 #glyphs #markers
- [fact] Glyph coverage varies by face within one family: Menlo Bold contains none of the four box-drawing characters tested while Menlo Regular contains all of them, and Menlo Italic lacks `✓` and `⚠` which Menlo Regular has #fonts #fallback
- [fact] `⚠` U+26A0 is present in 1 of 7 monospace faces measured, which is consistent with the reported degradation of the warning emoji to a substitute glyph #glyphs #emoji
- [fact] The entire box-drawing block is East Asian Ambiguous, so a hand-drawn box is one or two cells per character depending on a terminal setting the author cannot detect #decoration #width
- [fact] Across gh, kubectl, cargo and ripgrep help output, all 430 blank-line runs have length exactly 1 — no double blank line appears anywhere #whitespace #convention
- [fact] Across 30 measured command groups in gh, kubectl, cargo and gh pr create, group size has median 4 and mean 5.7, with 60 percent at five or fewer items and 77 percent at seven or fewer #chunking #groups
- [fact] ripgrep clamps its help output to a maximum line length of exactly 80 at COLUMNS values of 40, 80, 120 and 200; gh does not adapt and overflows to 110 columns at COLUMNS=60 #line-length #clamping
- [fact] cargo computes its description-alignment column per group, measured at 33, 26, 26, 29, 32 and 30 across six groups in one help screen, while kubectl uses one global 16-column field across all nine of its groups #alignment #indentation
- [fact] ripgrep uses a hanging indent of four, item at indent 4 and body at indent 8, with 1050 of 1622 lines at indent 8 #indentation #hanging-indent
- [fact] None of git, cargo, kubectl, npm, gh, bun or jq uses a non-ASCII marker glyph in its help output; ripgrep is the sole exception and uses only the bullet #markers #convention

### Drawn from published measurement

- [fact] Tinker 1955 measured a 10 to 20 percent reading-speed penalty for all capitals with a 13.4 percent difference favouring lower case, and a 2019 replication found lowercase read more than 13 percent faster across all grade levels #capitalisation #reading-speed
- [fact] Nielsen Norman Group measured that users see about two words of a list item, and that for 35 percent of 20 tested links, 80 participants seeing only the first 11 characters could not predict the destination #scanning #front-loading
- [fact] Morkes and Nielsen 1997 measured 79 percent of users always scanning, with scannable writing scoring 47 percent higher on measured usability and all three improvements combined scoring 124 percent higher #scannability #evidence
- [fact] Cowan 2001 places the working-memory limit near four chunks and Miller later described his seven as a rhetorical device, so the seven-item convention is weaker evidence than it is usually presented as #chunking #working-memory
- [fact] Akhawe and Felt 2013 measured over 25 million warning impressions with click-through ranging from 7.2 percent for Firefox malware warnings to 70.2 percent for Chrome SSL warnings, an order of magnitude attributable to design on the same class of decision #dialogs #adherence
- [fact] Johnson and Goldstein 2003 measured consent rising from 42 percent to 82 percent between opt-in and opt-out framings with identical people and identical stakes #defaults #choice-architecture
- [fact] Anderson and Vance measured warning habituation dropping visual-processing response after only the second exposure, with polymorphic warnings substantially more resistant across a five-day longitudinal study #habituation #repetition

### Conventions and gaps

- [constraint] The Microsoft Writing Style Guide sets two to seven items per list and adds the physical test that a reader should see at least two and preferably three items at a glance #convention #chunking
- [constraint] The Google developer documentation style guide gives the operational punctuation test — no terminal period when the item is one word, has no verb, is entirely code font, or is entirely link text — which is checkable in a way that "write complete sentences" is not #convention #punctuation
- [problem] No controlled study was found either supporting or refuting the claim that lowercase fragments read worse than complete sentences; the sources agree only on consistency within a list, so the sentence-hood claim should be replaced by the verb test rather than asserted #gap #punctuation
- [problem] Two load-bearing mechanisms are unverified in this dialog: whether the pane soft-wraps and where a continuation starts, and whether the host measures width with wcwidth or with UTF-16 code units; each has a cheap render test and neither should be treated as settled #gap #verification
- [insight] Decoration is a padding-ownership question rather than a taste question — a box is free where the host draws it, as in the preview pane, and is a debt paid on every future edit where the author draws it #decoration #cost-model
- [insight] The two marker candidates raised fail in opposite directions, which is why neither intuition was wrong: the middle dot is universally available but ambiguous in width, and the circled numerals are unambiguous in width but effectively absent from monospace fonts #glyphs #synthesis
- [decision] Confidence classes are stated per rule and kept separate — measured here, published measurement, convention, judgement — so that a rule resting on convention cannot be mistaken for one resting on data #epistemics #confidence

## Relations

- part_of [[ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin]]
- depends_on [[ANALYSIS-002: Evidence Rules From Measured Failures]]
- pairs_with [[ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill]]
- pairs_with [[ANALYSIS-004: AskUserQuestion Tool Capability Audit at Build 2.1.241]]
