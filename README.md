# ask-user-question

A Claude Code plugin that ships one skill, `ask-user-question`, for composing
`AskUserQuestion` calls.

`skills/ask-user-question/` carries a `SKILL.md` and three files under `references/`. The
measurement infrastructure in `evals/` was ported ahead of the skill, so the skill can be
measured from its first draft rather than graded after the fact. `make checks` passes.

One thing still bites if you skip it:

- The composition linter has **zero active rules**. The prior fork's 32 rules are
  quarantined in `evals/composition/checks.quarantined.ts` because they encode the old
  skill's doctrine, and a score from the empty rule set is `1.00` for every input including
  a broken one. Read `evals/composition/LINT-RULES-PENDING.md` before treating any
  composition score as a measurement. `make checks` says so on every run.

## Running the evals

`make` alone prints the target list. `make doctor` checks the environment first — it wants
`bun` and `claude` on `PATH`, a `SKILL.md`, a plugin-kit checkout for the model-calling
targets, and no copy of this skill installed where the loader can see it.

**Measure before optimising.** The `measure-*` targets report what the artifact does as
authored and propose nothing; the optimizers cost several times as much and rank candidates.
Run `measure-trigger` before `trigger`, and `measure-disclosure` before `disclosure`.

| Target | What it measures | Cost |
|:--|:--|:--|
| `make checks` | Frontmatter against the Agent Skills spec, plus the linter's calibration. No model calls. | seconds |
| `make doctor` | Environment, and whether a stale copy of the skill is installed. | seconds |
| `make measure-trigger` | Per-query trigger rates for the description as authored, at full N. | ~10 min |
| `make trigger` | Optimizes the description against the eval set. Installs nothing. | ~35 min |
| `make measure-disclosure` | Which `references/*.md` a run opens, and what the skill costs as authored. | ~5 min |
| `make disclosure` | Measures, then proposes a cheaper layout and re-measures. | ~15 min |
| `make composition` | Three arms — baseline, skill injected, skill disclosed — scored by the linter and an LLM judge. | ~45 min |
| `make all` | Everything, in the required order. | ~90 min |
| `make purge-old` | Reports copies installed under previous names. Deletes nothing. | seconds |
| `make clean` | Deletes every results directory. | seconds |

Every target except `checks`, `composition` and `clean` needs plugin-kit, which carries the
measurement operations. Results land in `$(OUT)`, defaulting to `~/auq-results/<timestamp>` —
outside the repo, so a run cannot overwrite the frozen records in `evals/history/`.

Point at a plugin-kit checkout with an absolute path:

```sh
make trigger PLUGIN_KIT=/Users/you/Dev/ACMElabs/plugin-kit
```

## Layout

```
.claude-plugin/plugin.json   manifest
skills/ask-user-question/    SKILL.md plus references/
evals/
  frontmatter.test.ts        SKILL.md frontmatter against the spec
  assert-skill-absent.ts     refuses a run while a copy is installed
  trigger-eval-set.json      the seeded queries; authored input, do not regenerate
  composition/               three-arm harness, linter, judge rubric
  history/                   frozen results from the prior fork; not inputs
  lib/progress.ts            progress bar for the long runs
  rename-skill.sh            rename the skill and plugin together
  TRUSTWORTHINESS.md         what voids a measurement, and how to tell
```
