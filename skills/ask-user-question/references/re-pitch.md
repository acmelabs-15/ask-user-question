# Repairing a question nobody could answer

Open this when a question has already failed — the reader said they could not
answer, asked what you were talking about, picked something and then said it was
not what they meant, or went quiet on a question they should have found easy. Also
open it when you are rewriting someone else's question.

The repair depends on which way the question failed, and the six modes below want
opposite fixes. That is the reason to diagnose before rewriting: adding context
repairs mode 1 and makes mode 5 worse.

Do not re-send the same question with an explanation around it. The reader cannot
see your explanation while the dialog is open, so the second attempt fails for
exactly the reason the first one did.

## Diagnosing which mode you hit

The reader's own words usually name the mode.

| What the reader said | Look first at |
|---|---|
| `I do not understand`, `what is this about`, `where are you` | Mode 1 |
| `both of these seem the same`, `what is the difference` | Mode 2 |
| `what happens if I pick the other one`, `is this reversible` | Mode 3 |
| `why do you recommend that`, `does it matter which` | Mode 4 |
| `it depends`, `yes to the first part`, `which one are you asking` | Mode 5 |
| `just do it`, `why are you asking me` | Mode 6 |

Silence is ambiguous and usually means mode 1 or mode 5. When you cannot tell,
treat it as mode 1, because the repair for mode 1 is additive and safe.

## Mode 1: the premise is buried

The question assumes a fact the reader does not have, and the fact is in the
message above the dialog where they cannot reach it.

**Repair:** move the fact into the question text. One clause, naming the thing that
makes the decision necessary.

- Before: `Should we rebuild it now or later?`
- After: `The migration drops the legacy search index. Rebuild it now, or ship
  without it?`

This is the most common failure and the cheapest to fix. It is also the one that
looks fine to the author, who can see the context.

## Mode 2: the options are not comparable

The options are distinguishable to you and not to the reader, because they compare
on different axes, in different orders, or in different units.

**Repair:** pick the axes that actually differ, then apply the comparability rule
from SKILL.md to every description. Where two options really do the same thing,
delete one.

- Before: option one described by its speed, option two by its safety.
- After: both described by speed and then by safety, so the reader sees the trade
  rather than two unrelated claims.

Do not repair this by adding words. It is a structural mismatch, and more prose on
each side makes the mismatch longer.

## Mode 3: the consequences are missing

Every description states a benefit and no cost, so the reader cannot see what they
would be giving up, and cannot tell afterwards that they chose wrongly.

**Repair:** add the second half to each description — what it costs, forecloses or
risks. Include the cost of the option you recommend. A recommendation whose cost is
hidden reads as advocacy.

- Before: `Pins the dependency to the version you tested.`
- After: `Pins the dependency to the version you tested. Security patches stop
  arriving until someone raises the pin, and nothing warns when one is released.`

## Mode 4: the recommendation is arbitrary, or missing

Either a label carries the marker and its description gives no checkable reason, or
one option is clearly better and nothing says so.

**Repair, arbitrary case:** either put a fact from the situation into the
recommended option's own description, or remove the marker. SKILL.md gives the
reason removing it is a real option and a bare marker is not.

**Repair, missing case:** mark the option you would pick and move it first, with
the reason in its own description.

**Repair, genuine tie:** take the no-marker path in SKILL.md rather than inventing
a preference. Marking two is always wrong.

## Mode 5: the question is compound

Two decisions in one question, so no single option is a correct answer. The reader
answers half and qualifies the rest, or cannot start.

**Repair:** split it into a sequence. Ask the decision that gates the other one
first, then ask the second with options that depend on the first answer. Adding
context here makes it worse, because the problem is that one answer cannot carry
two decisions.

- Before: `Should we migrate now with the legacy index rebuilt, or later without
  it?`
- After: first `Migrate now, or after the release?`, then, once you know,
  `Rebuild the legacy index as part of it?`

## Mode 6: it was never a fork

The reader is irritated rather than confused, because you asked for a
confirmation, reported progress, requested a value only they can type, or asked how
before anyone settled whether.

**Repair:** withdraw the question and decide it yourself, then continue, saying the
three things SKILL.md asks for on that path.

This mode is the only one whose repair is not another question. Re-pitching here
means not pitching.

## After the rewrite

Read the new version once as the reader: cold, without the conversation, without
the codebase, and without the ability to ask you anything. If a fact you need is
not on the screen, you are still in mode 1.

Then check the rewrite has not introduced a different mode. Adding the premise
lengthens the question, which is where compound questions come from, and adding
costs to descriptions is where parallel structure gets lost.
