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
| `trigger-2026-08-08_172001/` | Trigger run of 2026-08-08, report plus per-query results, from the retired local harness. |
| `composition-2026-08-08_172320/` | Composition run of 2026-08-08, report plus three-arm results, scored against the fork's rule set. |
| `disclosure-comparison.html` | Rendered side-by-side of which references got read per scenario, and what each run cost. |
| `composition-results-first-run/` | The first composition run: three arms scored by the deterministic linter and the LLM judge, plus its disclosure results. Lived at `evals/composition/results-first-run/` in the fork. |
| `trigger-runner.ts` | The retired 0.2.0-generation trigger harness. **Nothing invokes it.** |
| `evals.json` | The failed first disclosure scenario set. **Nothing reads it**; `composition/disclosure-evals.json` replaced it and is what the Makefile points at. Kept as the only specimen of the set-shape fault described below. |

## `trigger-runner.ts`

Retired when the Makefile was retargeted at plugin-kit, whose
`shared/operations/measure-triggering.ts` and `optimize-description.ts` do this job and
isolate their own measurement. It is kept rather than deleted because two things in it are
cited as evidence and are not recoverable from anywhere else.

**The last-path-segment scorer fix.** The scorer compares the router's chosen skill on the
last `:`-delimited segment rather than on the whole qualified name, because one skill can
answer under more than one qualified name and an exact match scores every one of them as a
miss.

**The collision incident it documents.** A run where the skill won 10 of 10 should-trigger
queries scored 4/10 on exact match, because the router answered as both `ask-user-question`
and `skills:ask-user-question` within the same run while two copies were installed. A second
run, after a partial deduplication, scored 0/10 for the same reason against the single
surviving name. That failure mode is silent and reads exactly like a broken description,
which is the expensive part: the obvious response is to rewrite prose that was never at
fault. The reasoning is in the comment above `tail()`.

Two notes for anyone reading it. Its `progress` import was repointed from `./lib/progress.ts`
to `../lib/progress.ts` when it moved, so it still loads and still fails the way it was
designed to; `evals/lib/progress.ts` itself stays where it is, because the live
`composition/composition-runner.ts` imports it. And it carries a hardcoded absolute path to a
`skill-creator` checkout, overridable with `SKILL_CREATOR_DIR` — deliberately, per its own
comment, so that a missing split fails loudly instead of being reimplemented into silent
incomparability.

## `evals.json`

Archived from `evals/composition/` on 2026-08-23. It was the first attempt at a disclosure
scenario set and it **measured nothing**: all eight references came back at 0 pulls across 18
runs. Three properties caused that, and it is kept because each one is easier to recognise
against a specimen than a description. It named a codebase the fresh temp root did not have,
so 17 of 30 runs spent about four Bash calls each discovering there was no repo. Its
expectations were boilerplate, the same five assertions pasted across all ten asking
scenarios, and generic expectations are satisfiable from `SKILL.md` alone, so no reference was
ever decisive. And it passed no `--permission-mode`, so half the runs had a Write denied and
fell back to inline text.

`composition/disclosure-evals.json` replaced it and is what both disclosure targets read. The
full diagnosis is in `../composition/README.md`, and the fault class it belongs to is F5 in
`../TRUSTWORTHINESS.md`. **Do not point a disclosure run at this file.**

The Makefile writes new results to `$(OUT)` — outside the repo by default — so a fresh run
cannot land here and quietly join the record.
