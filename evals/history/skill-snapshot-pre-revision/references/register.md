# ASD-STE100, reduced to the rules that carry in a dialog

Open this when a string will not come down to one clause, or when a rewrite needs
defending to whoever wrote the original.

ASD-STE100 Simplified Technical English is a controlled-language specification
from the AeroSpace and Defence Industries Association of Europe. It has two
halves: a set of writing rules, and a Dictionary of approved words with approved
meanings. This file uses the first half and deliberately declines the second.

A note on rule numbers before you cite one. The rules are grouped into parts —
words, noun phrases, verbs, sentences, procedural writing, descriptive writing,
safety instructions, punctuation, and writing practices — and the numbering has
shifted between issues of the specification. The numbers below are the ones
commonly cited, and the constraint matters more than the number. Cite the rule by
what it requires, and name the issue if precision matters.

## The rules that apply, and what each one buys a cold reader

**Words: use one word for one concept (Part 1).** The specification's own form is
stricter, since it fixes a single approved word for each meaning and a single part
of speech for each word. The portable core is consistency inside one call. A
reader who meets `check` in the question and `validation` in an option cannot tell
whether those are the same thing, and while the dialog is open they cannot find
out. This is the same discipline as keeping one term per concept across a body and
its references.

**Noun phrases: no cluster longer than three nouns (Part 2).** `option
description consequence text` forces the reader to work out which noun governs
which. Break it with a preposition: `the consequence stated in an option
description`.

**Verbs: active voice, and simple tenses (Part 3).** The passive hides the actor,
and in a dialog the actor is usually the thing the reader is deciding about.
`The index is dropped` leaves open who drops it and when. `This drops the index`
does not. The specification also restricts the `-ing` form, and the reason
survives here: a participle can attach to more than one noun, and a reader with no
time resolves it wrongly.

**Sentences: one statement each, and short (Part 4).** The specification sets
about 20 words for procedural sentences and about 25 for descriptive ones. An
option description is closer to procedural, because the reader is deciding what to
do, so keep it near the lower bound.

**Sentences: do not delete words to shorten them (Part 4).** This is the rule most
often broken by interface copy, and the one most worth keeping. Dropping an article
is how `Rebuild index` becomes ambiguous between an instruction and a name. Cut a
clause instead of cutting a word.

**Descriptive writing: one topic per paragraph (Part 6).** An option description
holds one option. When it starts explaining a second option by contrast, that
material belongs in the other option's own description, where the reader looking
at that option will find it.

## What this file does not adopt, and why

**The Dictionary of approved words.** Two independent reasons. It is published
under the association's own terms rather than an open licence, so reproducing the
word list here would be a licensing question rather than an authoring one. And it
is calibrated for aircraft maintenance procedures, so it has no approved word for
`commit`, `schema` or `index`. Conformance would fight the project's own
vocabulary, and using the reader's own words is the stronger requirement. Take the
rule — one meaning per word — and leave the list.

**Safety-notice formatting (Part 7).** The specification prescribes the shape of
warnings and cautions for maintenance manuals. There is no analogue in a dialog,
and the risk content is already carried by the cost half of each option
description.

**The 20-word ceiling on question text.** A question has to hold the decision and
the consequence that makes it matter, and that does not always fit in 20 words.
Around 25 is the working bound for a question. Labels and descriptions keep the
tighter one.

## Worked rewrites

Each pair below fails one rule and then passes it. The failing version is the one
that gets written first.

**A buried actor and a passive verb.**

- Before: `The configuration will be regenerated and the cache is invalidated.`
- After: `This regenerates the configuration and clears the cache.`

The rewrite names one actor, uses one tense, and drops from 11 words to 8 without
deleting a word that carried meaning.

**A noun cluster.**

- Before: `Enable request retry backoff policy defaults`
- After: `Use the default backoff for request retries`

**A deleted article, which changed the meaning.**

- Before: `Skip migration step`
- After: `Skip the migration step` — an instruction about one step.
- Or: `Skip migration steps` — an instruction about all of them.

The first version is both, and a reader has to guess. This is why the rule against
deleting words outranks the rule about length.

**Two topics in one description.**

- Before: `Rebuilds the index now, which is slower than shipping without it but
  avoids the manual step that the other option needs.`
- After: `Rebuilds the index inside this migration. This adds about two minutes of
  downtime.`

The comparison moved out. The other option's description states its own cost, so
the reader meets it while looking at the option it applies to.

**Inconsistent vocabulary across one call.**

- Before: question says `checks`, option one says `validations`, option two says
  `linters`.
- After: all three say `checks`, and the options differ on which checks.

The before version reads as three concepts. The reader cannot confirm they are one
concept without leaving a dialog they cannot leave.

## Diagnosing a vocabulary mismatch

SKILL.md carries the rule about taking the reader's nouns from the project. What it
cannot give you is the test for whether you have, so here is the one to apply.

Read the question aloud as the reader. Every noun they would have to translate is a
defect, and the translation is invisible to you because you already know both
words. A question about `the sync worker` reads instantly to someone whose codebase
calls it that; `the background job` makes the same person stop and map it, and they
cannot ask you which you meant.

Two failures look alike and are not. A word the project never uses is a mismatch,
and the repair is to swap it. A word the project uses for something *else* is worse,
because the reader will not notice the collision, and the repair is to rename your
concept rather than reuse theirs.

Where nothing in the repository names the thing, take the noun from the conversation
you are in. Never introduce a term inside a question: a dialog is the one place a
reader cannot ask what a word means.
