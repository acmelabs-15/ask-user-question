# Frozen measurement records from the prior fork

Nothing in this directory is an input to anything. These are results files from eval runs
against a skill that is not in this repo — the fork these evals were ported from had an
authored `SKILL.md` and a set of `references/*.md`, and every number here was measured
against that content. This repo starts with the measurement infrastructure and no skill.

They are kept because the lessons are not reproducible for free. A trigger run is roughly 35
minutes of model calls and a composition run roughly 45; re-earning "extraction moved the
pull rate this way" costs that again. The runs are also the only record of which harness
changes moved a number and which did not.

**Do not compare a new run against these.** The skill differs, the rule set differs (see
`../composition/LINT-RULES-PENDING.md`), and the disclosure optimizer's train/holdout split
is seeded from content that has changed. A delta against these files would be a delta
between two different experiments.

## What is here

| Path | What it recorded |
|:--|:--|
| `RESULTS-baseline.json` | Trigger-eval baseline, before the description rewrite. |
| `RESULTS-2026-08-08-renamed.json` | The same eval set after the skill was renamed, to separate a naming effect from a description effect. |
| `RESULTS-postextraction.json` | After content moved from `SKILL.md` into `references/`, testing whether extraction cost triggering accuracy. |
| `RESULTS-run-loop-crosscheck.json` | A crosscheck run through skill-creator's `run-loop.ts`, confirming the local runner and the imported one agreed. |
| `trigger-results-dedup/` | Per-query trigger output from the deduplicated eval set. |
| `trigger-results-postextraction/` | Per-query trigger output for the post-extraction run. |
| `disclosure-comparison.html` | Rendered side-by-side of which references got read per scenario, and what each run cost. |
| `composition-results-first-run/` | The first composition run: three arms scored by the deterministic linter and the LLM judge, plus its disclosure results. Lived at `evals/composition/results-first-run/` in the fork. |

The Makefile writes new results to `$(OUT)` — outside the repo by default — so a fresh run
cannot land here and quietly join the record.
