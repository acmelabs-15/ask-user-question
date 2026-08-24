# ask-user-question

A Claude Code plugin that will ship one skill, `ask-user-question`, for composing
`AskUserQuestion` calls.

**The skill is not written yet.** `skills/ask-user-question/` is an empty placeholder and
`.claude-plugin/plugin.json` carries a `PENDING` description. What is here is the
measurement infrastructure, ported ahead of the skill so the skill can be measured from its
first draft rather than graded after the fact.

Two things follow from that, and both bite if you skip them:

- `make checks` fails, because `evals/frontmatter.test.ts` reads a `SKILL.md` that does not
  exist. That failure is the correct output today.
- The composition linter has **zero active rules**. The prior fork's 32 rules are
  quarantined in `evals/composition/checks.quarantined.ts` because they encode the old
  skill's doctrine, and a score from the empty rule set is `1.00` for every input including
  a broken one. Read `evals/composition/LINT-RULES-PENDING.md` before treating any
  composition score as a measurement.

## Running the evals

`make` alone prints the target list. `make doctor` checks the environment first — it wants
`bun` and `claude` on `PATH`, a `SKILL.md`, and, for two of the targets, a local
skill-creator checkout to import the trigger runner's train/holdout split from.

| Target | What it measures | Cost |
|:--|:--|:--|
| `make checks` | Frontmatter against the Agent Skills spec, plus the linter's calibration. No model calls. | seconds |
| `make disclosure` | Which `references/*.md` a run actually opens, and what the run costs. Needs skill-creator. | ~5 min |
| `make composition` | Three arms — baseline, skill injected, skill disclosed — scored by the linter and an LLM judge. | ~45 min |
| `make trigger` | Whether the router reaches for the skill unprompted, across a seeded eval set. Needs skill-creator, and installs the skill to do it. | ~35 min |

Results land in `$(OUT)`, which defaults to `~/auq-results/<timestamp>` — outside the repo,
so a run cannot overwrite the frozen records in `evals/history/`.

Point at a skill-creator checkout with an absolute path:

```sh
make trigger SKILL_CREATOR_DIR=/Users/you/Dev/ACMElabs/skill-creator
```

## Layout

```
.claude-plugin/plugin.json   manifest; description is a placeholder
skills/ask-user-question/    empty; the skill goes here
evals/
  frontmatter.test.ts        SKILL.md frontmatter against the spec
  trigger-runner.ts          does the router reach for the skill
  trigger-eval-set.json      the seeded queries it runs
  composition/               three-arm harness, linter, judge rubric
  history/                   frozen results from the prior fork; not inputs
  rename-skill.sh            rename the skill and plugin together
```
