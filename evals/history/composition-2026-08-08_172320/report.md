# Composition measurement

Model `opus`, judge `opus`, 3 runs per scenario.
15 scenarios, 10 where a dialog is correct and 5 where it is not.

Skill content is injected, not routed to. This measures the body, not the description.

## Headline

| metric | baseline | skill | disclosed |
|---|--:|--:|--:|
| lint score, mean (0 to 1) | 0.10 | 0.78 | 0.46 |
| calls with zero lint errors | 0% | 90% | 94% |
| asked when it should have | 63% (n=30) | 97% (n=30) | 68% (n=25) |
| **abstained when it should have** | 87% (n=15) | 100% (n=15) | 100% (n=15) |
| judge: decidable cold | 4.31 | 4.31 | 4.00 |
| judge: recognises mistake | 4.19 | 3.97 | 3.71 |
| judge: comparable options | 3.80 | 3.90 | 3.52 |
| judge: honest recommendation | 4.21 | 3.90 | 3.82 |
| judge: evidence boundary | 3.24 | 3.80 | 3.81 |
| judge: right call about asking | 4.42 | 4.93 | 4.38 |
| unparseable, excluded above | 0 | 0 | 5 |
| references opened per call | 0.00 | 0.00 | 0.69 |
| calls opening any reference | 0% | 0% | 29% |
| **recall**: scenarios where a needed reference was opened | 0% | 0% | 30% |
| **precision**: opens that were on the needed list | 100% | 100% | 61% |

The two rate rows exclude unparseable attempts from their denominators, which is why `n` is shown.

## Lint errors by rule

| rule | baseline | skill | disclosed |
|---|--:|--:|--:|
| `description.no-cost` | 27 | 8 | 1 |
| `label.meta` | 1 | 0 | 0 |
| `options.count` | 3 | 0 | 0 |
| `question.no-mark` | 1 | 0 | 0 |
| `recommend.absent` | 21 | 0 | 0 |
| `recommend.multiple` | 0 | 4 | 0 |

## Which references got opened

| reference | times opened |
|---|--:|
| `register-and-budgets.md` | 11 |
| `writing-the-question.md` | 5 |
| `layouts-and-previews.md` | 3 |
| `tool-contract.md` | 3 |
| `question-sequences.md` | 3 |
| `before-and-after.md` | 2 |
| `reading-the-answer.md` | 2 |
| `defects-and-repairs.md` | 2 |

| scenario | reference it needs | opened | everything opened |
|---|---|:--:|---|
| unit-mismatch | writing-the-question.md, register-and-budgets.md | **no** | nothing |
| config-cache | writing-the-question.md, register-and-budgets.md | **no** | nothing |
| strict-types | none | n/a | nothing |
| migration-lock | writing-the-question.md, register-and-budgets.md | yes | register-and-budgets.md, before-and-after.md, writing-the-question.md |
| error-wording | writing-the-question.md, register-and-budgets.md | **no** | nothing |
| six-decisions | question-sequences.md, register-and-budgets.md | **no** | nothing |
| confirm-the-fix | none | n/a | nothing |
| needs-a-dsn | none | n/a | nothing |
| table-layouts | register-and-budgets.md | yes | register-and-budgets.md, writing-the-question.md |
| widening-approval | question-sequences.md, register-and-budgets.md | yes | register-and-budgets.md, writing-the-question.md |
| search-permissions | writing-the-question.md, register-and-budgets.md | **no** | nothing |
| which-file-first | none | n/a | nothing |
| tree-shape | layouts-and-previews.md | **no** | register-and-budgets.md, writing-the-question.md |
| contradicting-note | reading-the-answer.md | yes | reading-the-answer.md |
| seven-options | tool-contract.md, layouts-and-previews.md | yes | layouts-and-previews.md, tool-contract.md, question-sequences.md, defects-and-repairs.md, register-and-budgets.md |

## Per scenario

| scenario | correct move | baseline: asked / lint | skill: asked / lint | disclosed: asked / lint |
|---|:--:|--:|--:|--:|
| unit-mismatch | ask | 3/3 · 0.03 | 3/3 · 0.77 | 3/3 · 0.12 |
| config-cache | ask | 0/3 · n/a | 3/3 · 1.00 | 0/3 · n/a |
| strict-types | **decide** | 0/3 · n/a | 0/3 · n/a | 0/3 · n/a |
| migration-lock | ask | 3/3 · 0.18 | 3/3 · 0.83 | 2/3 · 1.00 |
| error-wording | ask | 1/3 · 0.43 | 3/3 · 0.77 | 1/3 · 0.00 |
| six-decisions | ask | 3/3 · 0.06 | 3/3 · 0.85 | 3/3 · 0.34 |
| confirm-the-fix | **decide** | 0/3 · n/a | 0/3 · n/a | 0/3 · n/a |
| needs-a-dsn | **decide** | 1/3 · 0.00 | 0/3 · n/a | 0/3 · n/a |
| table-layouts | ask | 1/3 · 0.00 | 2/3 · 0.88 | 1/3 · 0.42 |
| widening-approval | ask | 3/3 · 0.21 | 3/3 · 0.81 | 3/3 · 0.42 |
| search-permissions | ask | 0/3 · n/a | 3/3 · 0.88 | 0/3 · n/a |
| which-file-first | **decide** | 1/3 · 0.00 | 0/3 · n/a | 0/3 · n/a |
| tree-shape | ask | 2/3 · 0.11 | 3/3 · 0.83 | 3/3 · 0.59 |
| contradicting-note | **decide** | 0/3 · n/a | 0/3 · n/a | 0/3 · n/a |
| seven-options | ask | 3/3 · 0.00 | 3/3 · 0.26 | 1/3 · 0.90 |

## What the judge flagged

- `baseline/unit-mismatch` No evidence boundary is stated: the dual-read option's 1e11 magnitude heuristic and the claim that stored millisecond tokens keep working assume unverified facts about token TTL range and whether any third-party or stored value could fall near the threshold.
- `baseline/unit-mismatch` The recommended option's transitional window is unquantified - the max stored-token TTL is never stated, so the reader cannot tell whether the tolerance branch lives for an hour or a month before its cleanup TASK fires.
- `baseline/unit-mismatch` The recommended dual-read option's own risk is soft-pedalled: the magnitude heuristic's failure mode (ambiguous values near the seconds/milliseconds boundary, and the fact the agent has not verified the live-token TTL that sets the removal date) is left to the separate 'Investigate first' option rather than stated as an unverified gap in the recommendation itself.
- `baseline/config-cache` The situation had a real fork the user had already framed, and instead of surfacing it the agent shipped a third mechanism unilaterally, so there is no comparable option set and the only offered alternative (plain TTL) is a throwaway line with no matched axes.
- `baseline/config-cache` The situation held a real fork (production staleness window vs. watcher complexity/network-FS failure mode) and the agent argued it away rather than surfacing it, then silently added an unrequested NODE_ENV behaviour split without flagging what it had not verified about production traffic or config-change frequency.
- `baseline/config-cache` The agent declined to ask about a fork the situation says was real, and its justification rests on an unverified claim that mtime invalidation has zero staleness tradeoff (mtime granularity, network filesystems, and the per-request stat cost are all asserted rather than checked).
- `baseline/migration-lock` The evidence boundary is thin: the agent never states what it has not checked, notably whether application code already tolerates a NULL org_id, which is the load-bearing precondition of its own recommendation.
- `baseline/migration-lock` The agent never states what it has not verified - notably whether any read path actually tolerates a null org_id, which is the exact assumption its recommended option depends on.
- `baseline/migration-lock` The 'plan first, ADR' option is not cleanly exclusive of the other three (it is a sequencing delay that ends in one of them) and its internal-tooling framing may be opaque to a cold reader.
- `baseline/error-wording` The grading premise says the fork was real and worth a dialog, yet the agent decided unilaterally; its reasoning is stated and reversible, but it never verified the actual house convention (no memory/convention search, no check of which style the 11 sites cluster in) and does not flag that gap.
- `baseline/error-wording` It never states what it has not verified - notably whether these errors are actually consumed by log aggregation, which is the single fact that decides the terse-vs-verbose fork it hands the user.
- `baseline/error-wording` The situation had a genuine convention fork (which house style this site adopts, with 11 sites in play), and the agent talked itself out of it on a technicality while leaving the deciding fact - which directory the validator actually lives in - unverified and conditional.

