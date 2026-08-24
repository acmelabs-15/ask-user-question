# Composition evals

The trigger evals next door measure whether the router reaches for this skill. These
measure whether the calls get better once it does. **The two numbers are not comparable and
must never be differenced**, which is the same rule `evals/README.md` states for the two
trigger harnesses, applied one level up.

| Harness | Question |
|---|---|
| `../history/trigger-runner.ts` | does the **router** pick this skill over its neighbours? Retired; `make measure-trigger` does this now. |
| `composition-runner.ts` | do the **calls** improve once the skill is read? |

A skill can pass one and fail the other, and the repairs are different. A routing failure is
a description problem. A composition failure is a body problem. One number for both is how a
skill ends up with a well-tuned description in front of advice nobody measured.

## Files

| File | What it is |
|---|---|
| `scenario-set.json` | 15 situations. 10 where a dialog is the right move, 5 where deciding is. |
| `checks.ts` | deterministic linter. Also runs standalone on a single call. |
| `judge-rubric.md` | the six criteria a regex cannot settle, sent verbatim to the judge |
| `composition-runner.ts` | the harness. Three arms, three scoring layers, reported separately. |
| `../history/composition-results-first-run/` | the 2026-08-08 runs. n=1 per cell, kept as a signal, not a baseline. |

## Two layers, never averaged

**`checks.ts` is deterministic**, free, and gives the same answer every run, so it is the
layer to gate on. It implements rules this skill states as a count, a position or a
membership test: description word counts, recommendation present and first, meta-label
blocklist, banned constructions, cost-in-every-description, option and question caps. One
check, `description.echoes-label`, is a content-word overlap ratio rather than any of those
three; it is the only fuzzy one.

**The judge** covers the six things that need a reader: decidable cold, recognises a
mistake, comparable options, honest recommendation, evidence boundary, and whether asking
was right at all. It costs tokens and varies between runs.

They are reported side by side and never combined, because a 0.98 lint with a 2.1 judge and
a 0.5 lint with a 4.5 judge are completely different situations and a mean hides which one
you have. The run below is the first of those in miniature.

### The linter is calibrated against this skill's own corpus

`references/before-and-after.md` contains six broken calls and their repairs. Run against all
eleven parseable calls in that file, the linter separates them with no overlap:

| | lint score | errors |
|---|--:|--:|
| the six **broken** calls | 0.00 every one | 2 to 12 |
| the five **repaired** calls | 1.00 every one | 0 |

That is the calibration standard: **a check that fails the exemplars is the check's
problem.** Three thresholds were loosened during development for exactly that reason, and
each is commented at its site in `checks.ts`. The description sentence limit fires at 35
words rather than STE's 25, because three of the five repairs run 30 to 35. The
unquantified-plural check is suppressed when the description already carries a figure. The
`multiSelect` portability warning fires once per call rather than once per question.

The parallelism rule from `references/register-and-budgets.md` is deliberately **not** a
pass/fail check. Every lexical proxy tried for it produced false failures on the repairs.
The first sentence of each description is emitted as a diagnostic instead, and the judge is
asked the question directly.

## Two scenario sets, and they are not interchangeable

| file | used by | shape |
|---|---|---|
| `scenario-set.json` | `composition-runner.ts` | long narratives with `expect_call` and `expect_refs` labels; measures recall, precision and abstention |
| `disclosure-evals.json` | skill-creator's `optimize-disclosure.ts` | short self-contained tasks with per-scenario `expectations`; measures pull rate and cost |

`evals.json` (now archived at `../history/evals.json`) was a first attempt at the second and it measured nothing: **all eight
references came back at 0 pulls across 18 runs.** It was `scenario-set.json` converted
mechanically, and it inherited three properties that made it useless in that harness.

**It named a codebase the run did not have.** The optimizer runs each scenario in a fresh
temp root containing only the skill. Seventeen of thirty runs said some version of *"there is
no repo, no `20260802_add_org_id.sql`, and no reachable database"*, after spending 4.2 Bash
calls each finding that out.

**Its expectations were boilerplate.** The same five assertions were pasted across all ten
asking scenarios. Generic expectations are satisfiable from SKILL.md alone, so no reference
was ever decisive.

**It had no `--permission-mode`,** so half the runs had a Write denied and fell back to
inline text.

`disclosure-evals.json` is written to the shape skill-creator uses on itself: one or two
sentences, self-contained, and **expectations specific to that scenario naming the exact
correct artifact.** Every scenario carries two extra fields the parser ignores and a reader
should not:

- `_targets` — the reference whose content decides the answer
- `_wrong_without_it` — what the agent produces if it never opens that file

**A scenario with no statable wrong answer does not belong in this set.** Its zero would be
honest and would tell you nothing, which is the trap the first attempt fell into. Three
scenarios target no reference at all and are there to keep the denominator from being rigged
toward reading.

Run it with the permission mode:

```bash
bun <skill-creator>/scripts/optimize-disclosure.ts \
  --skill-path skills/ask-user-question \
  --scenarios evals/composition/disclosure-evals.json \
  --model opus --max-iterations 1 --num-workers 8 \
  --permission-mode acceptEdits --results-dir ~/disc-opt
```

### What a zero means after this

Not all zeros are defects, and the fix differs by kind.

**Conditional, never fired.** The trigger is right, the condition did not arise. Costs
nothing: an unread reference is not in the body and no invocation pays for it. Do nothing.

**Body-is-redundant.** SKILL.md summarises the file well enough that the agent never needs
it. You cannot keep both: either shrink the summary so the file gets pulled, or delete the
file and accept the summary is the content. Measured evidence that this works is in the run
history below, where section 7 dropping its restatement doubled that file's opens.

**Wrong audience.** Content for the person maintaining the skill rather than the agent
composing a call. `tool-contract.md` is the candidate here at 6,054 tokens of schema
archaeology. That belongs in the repository, not in `references/`.

The one-question test: **is there a fact in this file that changes the answer, and does
SKILL.md already contain it?**

## Running it

```bash
bun composition-runner.ts --runs 3 --out ./results
bun composition-runner.ts --runs 1 --no-judge                 # deterministic layer only, fast
bun composition-runner.ts --arm disclosed --runs 3            # does disclosure actually happen?
bun composition-runner.ts --arm baseline,skill,disclosed      # all three, comma-separated
bun checks.ts my-draft-call.json                              # lint one call, no model calls
```

`--no-judge` halves the model calls and produces the only numbers that are stable enough to
gate CI on. That last line is the reason `checks.ts` is a module rather than harness-internal:
the rules that score the eval are the same code that lints a draft before you send it, so the
two cannot drift apart.

## Three arms, and the third is the one that tells you about disclosure

| Arm | The skill reaches the model by | Measures |
|---|---|---|
| `baseline` | not at all | what the model does unaided |
| `skill` | SKILL.md and `register-and-budgets.md` prepended to the prompt | the skill's **ceiling**, with routing and disclosure both removed |
| `disclosed` | told the skill exists on disk, `Read` allowed, 10 turns | what actually happens, including which references get opened |

`disclosed` exists because progressive disclosure only works if an agent **decides** a
reference is worth a tool call, and that decision is observable: the runner reads the
streaming form and records every `Read` whose path is a reference. Naming SKILL.md but not
the reference files is deliberate. The router surfaces the skill; whether a reference earns
a tool call is the skill's own job, and that gap is exactly what this arm measures.

Scenarios carry an `expect_refs` list: the references that situation makes **unconditional**.
`layouts-and-previews.md` is deliberately not expected anywhere, because it applies only if
the agent uses a preview and deciding against one is often correct. Labelling it as expected
measured the label, not the skill.

### Measured: four runs of the disclosed arm

All `--arm disclosed --runs 1 --no-judge`. **n=1 per cell throughout**, which is the single
most important caveat on this table: a difference of one or two calls moves every number in
it.

| run | what changed | refs/call | any ref | needed ref | unparseable |
|---|---|--:|--:|--:|--:|
| 1 | 12 scenarios, SKILL.md summarising its own references | 0.75 | 33% | 38% | 2 |
| 2 | s7 stopped restating the register pass | 1.17 | 50% | 63% | 0 |
| 3 | s6 and s8 got the same treatment | 1.00 | 42% | 50% | 0 |
| 4 | +3 scenarios firing the conditional references | 1.53 | 60% | 70% | 0 |
| 5 | the biggest reference split by the moment it serves | 1.53 | 60% | 80% | 0 |
| 6 | gotchas, validation loop, template; SKILL.md cut to 4.8k | 1.87 | 73% | 90% | **5** |
| 7 | same code, repeat run | 1.73 | 73% | 90% | 4 |
| 8 | `--max-turns` raised from 10 to 24 | 1.67 | 67% | 80% | **1** |

### Only two of these four metrics are targets

The other two are arithmetic. **If recall and precision both reach 100%, refs-per-call lands
on 1.27 and any-reference on 73% by construction** — they cannot be optimised independently,
and "reduce over-reading" is precision stated a second way. Chasing four numbers here means
chasing two.

Computed from the labels, over 15 scenarios where 4 correctly need no reference at all:

| metric | ceiling | latest | is it a target? |
|---|--:|--:|---|
| **recall**: needed reference opened | 100% | **100%** | yes, and it is there |
| **precision**: opens on the needed list | 100% | **86%** lenient / 57% strict | yes, the remaining gap |
| calls opening any reference | 73% | 60% | no, derived |
| references opened per call | 1.27 | 1.40 | no, derived |

### Two of those gains were the ruler, not the skill

The skill content did not change between the run scoring recall 73% / precision 50% and the
run above. Three measurement bugs did, and honesty requires separating them from progress.

**Recall was double-counting one failure as two.** It scored a reference miss on attempts
where the agent *declined to ask*. Two of the three "misses" were scenarios the agent decided
rather than asked: it did not need the wording references, because it was not writing a
question. Failing to ask is already counted under "asked when it should have"; counting it
again as a disclosure failure penalised one decision twice. Recall is now conditional on the
agent having taken the path that needs the file.

**The harness withheld a tool the skill instructs.** SKILL.md step 7 says to run
`bun checks.ts` and to fall back to the self-check in `defects-and-repairs.md` only when bun
is unavailable. The disclosed arm allowed `Read,Glob,Grep` and no Bash, so the agent correctly
took the documented fallback — and the label scored that as waste. `defects-and-repairs.md`
was 5 of 11 precision losses, which is to say half the over-reading was the harness testing
something other than the skill. `Bash(bun:*)` and `Write` are now permitted.

**The judgment call, flagged as one.** `allow_refs` marks files that are instructed but not
required: `defects-and-repairs.md`, whose send gate SKILL.md tells you to run before every
call, and `before-and-after.md`, offered for unfamiliar situations the agent judges for
itself. Counting those as precision hits is defensible and it is also the change closest to
moving a goalpost, so **both numbers are reported: 86% lenient, 57% strict.** Use strict if
you want the harsher reading.

The genuinely remaining losses are three opens across two scenarios: `tree-shape` and
`seven-options` each opened `register-and-budgets.md` for a decision that was about layout,
and `seven-options` also opened `question-sequences.md` for what is one multi-select question
rather than several.

### The abstention fix, and what caused the defect

For eight runs the skill made the agent ask *more* than the baseline: should-abstain sat at
75-80% against the baseline's 100%, and `which-file-first` was asked on every run.

The cause was an asymmetry introduced by following best practice halfway. SKILL.md carried a
concrete JSON template for a finished **call** and nothing at all for a finished **decision**,
so the only structure available to pattern-match was the one that asks. Adding *"The shape of
a decision you did not ask about"*, with the same worked-example treatment, took abstention to
**100% (n=5)** and flipped `which-file-first` for the first time. All four pure-abstain
scenarios also read zero references, which removed the waste at the same time.

The lesson generalises past this skill: **if you give an agent a template for one branch and
prose for the other, it will take the branch with the template.**

### The most important thing in that table is the variance

Runs 6, 7 and 8 are the same skill. They gave needed-reference rates of 90%, 90% and 80%, and
refs-per-call of 1.87, 1.73 and 1.67. **At n=1 per cell the run-to-run spread is the same size
as the effects attributed to the interventions above it.** The 70-to-80 jump credited to run 5
sits inside that spread.

Read the table as direction and mechanism, not as measurement. The move from 0.75 to ~1.7
across eight runs is larger than the noise and is probably real; no single row is.

### Run 6 found a harness bug that biased against the skill

Unparseable output jumped to 5 of 15. The failed attempts averaged **143 seconds and 3.0
references** against 78 seconds and 1.3 for the rest: they were the *deepest* engagements,
truncated by the runner's hard `--max-turns 10` before they emitted anything. A ceiling that
drops your best runs from the sample biases every number computed over the survivors, and it
had been silently doing so since the disclosed arm was written. `--max-turns` is now a flag
defaulting to 24, and unparseable fell to 1.

Worth carrying into real use rather than just the harness: **an agent following this skill
properly takes around 140 seconds and three reference reads.** A host on a tight turn budget
will cut it off, and the skill has no way to know that happened.

**Run 2 is the finding worth keeping.** SKILL.md section 7 had been summarising the two
checks that catch most defects, so an agent read the summary, felt equipped, and never opened
the file. Rewriting it to state the instruction and the cost of skipping it doubled opens of
that file, 3 of 12 to 6 of 12.

The general rule, which applies to any skill: **a reference that SKILL.md summarises well is
a reference that never gets read.** The summary is not a convenience, it is the thing
suppressing the load.

**Run 3 did not replicate it.** The same treatment applied to sections 6 and 8 moved
disclosure *down*, 1.17 to 1.00. That is well inside n=1 noise and it is recorded rather
than dropped, because a technique that worked once and failed once is not an established
technique. Anyone re-running this should treat run 2's mechanism as a hypothesis with one
supporting observation, not as a result.

### Run 4: three references were never opened, and it was not a disclosure failure

Through run 3, `layouts-and-previews.md`, `reading-the-answer.md` and `tool-contract.md` had
never been opened once. The obvious reading is that their triggers do not work. The actual
reason is that **no scenario in the set fired their conditions**: nothing needed a preview,
nothing handed the model a response to interpret, and nothing pushed against a schema limit.

Three scenarios were added to fire exactly those conditions, and all three references were
opened on the first run that contained them:

| scenario | condition it fires | reference opened |
|---|---|---|
| `tree-shape` | two directory structures where the shape *is* the decision | `layouts-and-previews.md` |
| `contradicting-note` | a response whose note contradicts the selection | `reading-the-answer.md` |
| `seven-options` | seven genuinely independent choices against a 4-option cap | `tool-contract.md`, `layouts-and-previews.md` |

That reframes what this arm should be measuring. **Open rate is the wrong metric for a
conditional reference.** `tool-contract.md` *should* sit unopened through a run of ordinary
composition, and a skill that got it opened every time would be wasting tool calls. The
metric that means something is the last column of the per-scenario table: when the condition
fires, does the file get opened?

### Run 5: splitting a reference by moment, not by topic

`wording-and-formatting.md` was the most-opened reference and also the largest at 6,800
tokens, because it bundled two different moments: what the *question* must name (step 3) and
how every *string* should read (steps 4 and 7). An agent at step 3 was paying 6,800 tokens for
1,500 tokens of relevant material, and an agent that had already read it once had no reason to
return at step 7.

Split into `writing-the-question.md` (1,500 tokens) and `register-and-budgets.md` (5,400), the
needed-reference hit rate went **70% to 80%** with opens-per-call unchanged. The smaller file
was opened 7 times in 15 scenarios on its first run.

The generalisable version: **split a reference by the moment it is needed, not by the topic it
covers.** Topic-shaped files are what a writer produces; moment-shaped files are what a reader
opens. A file serving two moments will be opened for the first and skipped for the second.

### What still misses

`config-cache`, `error-wording` and `widening-approval` compose without opening anything.
`widening-approval` is the clearest one: it is a scope-widening situation that
`question-sequences.md` covers directly, and it has missed on every run. If you want one
thing to work on next, it is why that trigger does not fire.

## Skill content is injected, not routed to

The skill arm prepends `SKILL.md` and `references/register-and-budgets.md` to the prompt rather
than relying on the router to load them. That removes routing from the measurement on
purpose, because routing is measured next door and leaving it in makes every composition
number the product of two effects.

The cost is that this measures the skill's **ceiling**: what it does when it is definitely
read. A real session also has to be routed to, and the gap between the two is the trigger
evals' business.

## First measurement, 2026-08-08

Model `opus`, **1 run per cell**, judge off, 12 scenarios, both arms, no parse failures.
Recorded because a first number is worth having, and marked clearly because **n=1 per cell is
a signal, not a baseline**. Do not gate anything on this. Re-run at `--runs 3` or more, with
the judge on, to produce one.

| metric | baseline | skill |
|---|--:|--:|
| lint score, mean | 0.13 | **1.00** |
| calls with zero lint errors | 0% | **100%** |
| asked when it should have | 63% (n=8) | 88% (n=8) |
| abstained when it should have | 100% (n=4) | 75% (n=4) |

Lint errors: `recommend.absent` 5, `description.no-cost` 3, `label.meta` 1. All three went to
zero. Nine other error classes the linter can raise never fired in either arm, so this says
nothing about them.

**Composition improves, and it is not close.** Every call the baseline arm produced carried at
least one hard error; every call the skill arm produced carried none, at 12 calls per arm.
Missing recommendations are the largest bucket, which matches the skill treating that rule as
unconditional where the shipped prompt makes it conditional.

**The skill also makes the agent ask more, in both directions.** Should-ask went from 63% to
88%, which is the intended effect. Should-abstain went from 100% to 75%, which is not. Those
are the same behavioural shift measured on two populations: injecting several thousand words
about how to compose a question appears to raise the prior that a question is called for.

The clearest instance is `which-file-first`, where nine files with duplicated logic should be
narrowed by the agent rather than put to the user as a picker. **The skill arm asked, and
composed that unnecessary question perfectly, scoring 1.00.** It did so on both runs made
during development, while the baseline arm never asked on it. A question that scores full
marks on every composition rule and should not have been sent is exactly the failure section 1
of SKILL.md exists to prevent, and it is the single most useful thing this eval has produced:
it is invisible to the lint layer by construction, and it points at the part of the skill that
is not working.

Do not over-read the size of that effect from four abstention scenarios and one run. Do read
the direction, because it replicated and because it is the opposite of what more guidance is
assumed to do.

### A caveat on the set itself

`config-cache` and `search-permissions` are classified `expect_call: true` and the baseline
declined on both. Either the classification is wrong, or the "do nothing / add the index"
branch reads as dominant enough that deciding is defensible, which is the same flaw
`unit-mismatch` was caught with below. Look at these two before trusting the asked-when-it-
should number; they are 2 of the 8 positives, and the skill arm asked on one of them.

## Scenario set design

Twelve situations, each ending in a **neutral task instruction** ("Ship one of them",
"Run the migration") rather than "decide what to do", which was the first draft and biased
every arm toward abstaining. That single wording change moved the measurement more than any
other edit made here, and it is the reason a scenario set is authored input to be reviewed
rather than generated filler.

Every `expect_call: true` scenario is checked for a genuine fork with no dominant option.
`unit-mismatch` failed that check on the first run: as originally written, one branch was one
line with no data change and the other logged out 2000 users, so both arms correctly declined
to ask. It now carries a published SDK contract on the other side, which makes it a real
two-sided choice. **A scenario where one option dominates measures nothing**, because the
correct behaviour there is the one the eval is trying to detect as a failure.

The four `expect_call: false` scenarios each fail for a different reason from
`references/defects-and-repairs.md`: answerable by reading, a confirmation, a value only the user
can produce, and an enumeration. They exist because an arm that composes twelve beautiful
calls is worse than one that composes eight and declines four, and a harness that only grades
calls cannot see the difference.
