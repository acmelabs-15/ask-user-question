# Two finished calls

Two complete AskUserQuestion calls, as the shapes to imitate. Read them when you
want the finished artifact rather than the rules that produce it; SKILL.md carries
the rules and the pre-flight loop that checks them.

The first is the ordinary case: the whole decision fits in a question. The second is
the one composers get wrong, where it does not.

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

