# Evals

Two independent measurements, in two directories, answering two questions. **Do not
difference them**, and do not report them as one number.

| Directory | Question | Surface under test |
|---|---|---|
| here | does the **router** pick this skill over its real neighbours? | the description |
| `composition/` | do the **calls** get better once the skill is read? | the body |

A skill can pass one and fail the other, and the repairs have nothing to do with each other:
a routing failure is a description problem, a composition failure is a body problem. The
rest of this file is the trigger side; `composition/README.md` is the other.

---

# Trigger evals

The description is the entire trigger surface. These 26 queries are the set it is measured
against, and they are authored input rather than derived output, which is why they are
committed rather than gitignored. Twenty-two of them carry the baseline below; four were
added when the description was widened and have never been run.

## Files

| File | What it is |
|---|---|
| `trigger-eval-set.json` | 26 queries, each `{query, should_trigger}`. **Do not regenerate.** Authored input. |
| `RESULTS-baseline.json` | the 22/22 run, against the description as it was before sequencing was claimed |
| `history/trigger-runner.ts` | probes one query per `claude -p` and reports which skill the router reached for. **Retired** — `make measure-trigger` does this now. |

## Baseline

| Setting | Value |
|---|---|
| Model | opus |
| Runs per query | 3 |
| Trigger threshold | 0.5 |
| Seed | 42 |
| Holdout | 0.4 |
| Result | 22/22, on the **previous** description |

The precision history worth knowing: an earlier wording measured 86 percent, and the
clause excluding guides, cheat sheets, house conventions, checklists and training was added
specifically to close three measured false positives (a cheat sheet, a training doc, a
grading rubric). Post-edit re-measurement dropped all three to 0/3 or 1/3. So cutting that
clause has a known cost rather than a hypothetical one.

The description is now **1022 of the 1024 hard character limit**, so any added clause has to
displace an existing one, and there is room for two characters.

## Measured after the rename: 2026-08-08

Run with the skill actually installed, `--runs 3`, opus, threshold 0.5, seed 42, 26 queries.
Recorded in `RESULTS-2026-08-08-renamed.json`.

| | overall | train | held-out |
|---|--:|--:|--:|
| correct | **21/26** | 15/17 | 6/9 |
| accuracy | 80.8% | 88.2% | 66.7% |
| **precision** | **100%** | 100% | 100% |
| recall | 64% | 78% | 40% |
| TP / FN / TN / FP | 9 / 5 / 12 / **0** |

**The predicted false-positive risk did not materialise, at all.** All five should-not-trigger
queries containing the literal string `AskUserQuestion` fired **0 of 3 times**, and so did
every other negative: **zero false positives across 12 negatives and 36 probes.** The
prediction that naming the skill `ask-user-question` would pull in the training-doc, host-
building, schema-debugging, rubric and cheat-sheet queries was wrong. The exclusion clauses
hold against a name that argues the other way.

**The real problem is recall, and it is almost entirely one thing.**

| | result |
|---|---|
| the original 22 queries | **21/22**, down one from the 22/22 baseline |
| the 4 sequencing queries added with the widened description | **0/4** |

All four new queries lost the same way: **`(answered directly)`**, 3 of 3 each. Not to a
neighbour, not to `grill-me`. The model answered them conversationally without reaching for
any skill.

That is the defect this file already documented for six of the original queries: *"A skill is
only consulted for work the model cannot easily do alone, so a query with an obvious one-step
answer never reaches skill selection."* The four sequencing queries were authored with the same
flaw. *"Can these four go in one call or do I have to split them?"* has a one-paragraph answer,
so the router never gets asked.

**So the description widening is unfalsified rather than validated.** The clauses claiming
sequencing may work perfectly; these queries cannot tell, because they never reach the router.
Rewriting them so they need the skill's actual content, an option set to produce or a run to
structure rather than a rule to recite, is the fix, and it belongs in the eval set rather than
in the description.

The single original-query regression is the `Yes / No / Skip` labels query, which lost twice to
`design:ux-copy` and once to a direct answer. This file already lists it among the six one-step
queries, so it is the same failure mode.

## Two harnesses, two questions. Do not difference them.

This bit cost a wrong conclusion, so it is written down.

`history/trigger-runner.ts`, retired, and `run-loop.ts` in skill-creator both report "N of 22"
and they are not comparable:

| Harness | Question it answers |
|---|---|
| `history/trigger-runner.ts` (retired) | does the **installed** skill beat its **real neighbours**? |
| skill-creator `run-loop.ts` | does a **synthetic stub** attract these queries in an otherwise empty room? |

`run-loop.ts` installs a stub at project scope with `--setting-sources project`, which
excludes every installed plugin. Isolating the stub is the point of that design, and it is the
right tool for tuning wording in a controlled way. But for a plugin-bundled skill it answers
the wrong question: territory capture happens against neighbours, and the neighbours are
exactly what that harness removes.

`RESULTS-baseline.json` (22/22) came from **this** runner. A `run-loop.ts` cross-check scored
12/22 and is recorded in `RESULTS-run-loop-crosscheck.json` with
`comparable_to_RESULTS_baseline: false`. Differencing those two numbers reads as a 10-point
extraction regression and there is no regression there to find.

**The rule: measure with the harness that produced the number you are comparing against.**

### What the cross-check did surface

Two things worth fixing in the eval set rather than the description:

**Six should-trigger queries are one-step tasks.** Probed directly, "my dialog labels are Yes /
No / Skip, rewrite them" produced a complete correct answer with **zero tool calls**. A skill is
only consulted for work the model cannot easily do alone, so a query with an obvious one-step
answer never reaches skill selection. Those six are wasted budget in either direction.

**Two should-not-trigger queries are self-referential.** Asking for a cheat sheet or a training
doc *about this skill* makes reading the skill correct research, and both harnesses score a
`Read` of the skill's own path as a trigger. The query cannot distinguish routing from
research.

## Running it

```bash
make measure-trigger    # per-query rates, full-N, comparable across runs
make trigger            # optimize the description against the same set (~35 min)
```

Both read `trigger-eval-set.json` and run plugin-kit operations, which isolate their own
measurement. Run `measure-trigger` first: it reports what the description does as authored
and proposes nothing, which is usually the number you wanted.

The retired `history/trigger-runner.ts` took a `--target` instead — the plugin-qualified
skill name to count as a hit, defaulting to the name this plugin ships under. The lesson in
that flag outlived the runner: a stale value does not error. Every comparison misses and the
run reports 0 percent, which reads as a broken description rather than a broken constant.

## The known risk, which no wording can fix

Five queries in this set resolve away from this skill toward siblings that used to live in
the same plugin: `grill-me`, `skills:decisions`, `skills:review`, `skills:defrag` and
`skills:end`. Those are now **cross-plugin** neighbours, which changes the resolution
dynamics.

So re-run this set after any move and treat the result as the acceptance gate on the move
itself. A regression there is an ecosystem territory-capture problem rather than a wording
problem: measured elsewhere, a well-formed description lost every one of its own true
positives to a pushy co-installed neighbour, and recovered only 4 of 21 after a rewrite.
Editing your own description does not defend against that.
