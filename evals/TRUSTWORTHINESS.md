# Is this number allowed to count?

A gate, not an essay. You are holding a figure from an eval run and deciding whether to
act on it. Work down Section 1 if the run has not started, Section 2 if it has finished,
and Section 3 the moment anything looks too clean or too broken. Section 4 is the register
of faults that have already cost this project an iteration; read it once, then use it as a
lookup.

The premise, and the reason this file exists: **five separate times, a measurement fault
presented as a description defect.** Each one cost a wasted iteration and one nearly caused
a working skill to be restructured. Every fault in Section 4 produced a plausible number.
None of them was detectable by reading the number.

**This is not a counsel of despair, and there is a first data point.** The absence guard built
from these rules fired on its **first** run and caught a live instance: the retired fork's 21KB
`SKILL.md` and its eight reference files, installed under the *current* name, which would have
voided every disclosure run made that day. It has since been removed, verified against a
byte-identical archived copy before deletion. The class of fault catalogued here is detectable,
and a guard assembled from these checks paid for itself immediately.

---

## What the tools now catch, and what is still on you

Read this before Section 1. Several hazards catalogued here are now enforced by the tooling, and
the list that still needs a human is short. As of plugin-kit `1c12d24` on 2026-08-23 that branch
is green and was never red — 1472 pass / 0 fail across 41 files, typecheck exit 0, purity scan 0
errors across 223 files (verified by the team lead at that commit, not re-run here).

**Now enforced — do not spend manual effort on these:**

| Was a manual check | Now caught by | Commit |
|---|---|---|
| A disclosure run against a reachable copy | `measure-disclosure` calls `detectInstallState` and warns before the sweep, with `install_state` and `install_conflict` on its output | `4d5b195` |
| The same, on a run with no `--envelope` | `optimize-disclosure`'s warning fires without an envelope | `89316e8` |
| A grader model requested but not applied | `--grader-model` reaches argv | `1c12d24` |
| A reference file promising an envelope that is never written | `schemas.md` corrected | `65889ab` |
| Helper calls seeing the operator's installed skills | all four sites pass `--setting-sources project --strict-mcp-config` with a per-call empty cwd | `31e91e1` |
| A key typo in an eval or scenario set silently defaulting | schemas name the typo | `35455b0` |
| An empty scenario array told about a key it never had | error message corrected | `ffb68b2` |
| A copy installed under the current name | `make absent-check`, a hard prerequisite of both disclosure targets **and of `composition`** | local, `c6f85ef` |

**Still manual. This list is the one that matters.**

1. **`measure-disclosure` writes no envelope**, so `installState` is not in
   `provenance.installState` where a consumer looks for it. Read `install_state` out of
   `results.json`, or establish absence out of band. (Section 1.1a)
2. **`ANTHROPIC_DEFAULT_*_MODEL` aliases reach every child in every configuration.** Two runs whose
   envelopes both record `model: opus` may not be comparable across machines. No flag closes this.
   (Section 2.1, "The ceiling")
3. **A copy under a *previous* name is invisible to `absent-check`**, which matches the current
   name. `make doctor` covers that, and covers nothing else. Run both. (Section 1.2)
4. ~~**`checks.ts` has zero rules**, so any composition lint figure is vacuous and `make checks`
   gates nothing while appearing to.~~ **CLOSED in `e41b79f`** (2026-08-23): 27 rules are active,
   each carrying its `SKILL.md` line, and the calibration probe that scored 1.00 against an empty
   module now fails at 0.00 as designed. `make checks` gates something. (Section 1.4)

Everything else in this document is a reading skill rather than a gate: what a number means once
you have it, and when to throw it away.

---

**Path key, and the SHA these citations are pinned to.** Bare paths are relative to this
repository root. `PK/` is the plugin-kit repository root, **pinned at `2a7c0d5`**
(`2a7c0d59f8a6b1e0e63ccc1f5f7237b44449d791`). Line numbers below were verified against that
commit and nothing else. This pin is not decoration: one `PK/` line number in this document
drifted by three lines between being cited and being re-read, during the writing of this file.
A line citation without a SHA is a citation to a moving target — Section 0 rule C applied to
this document's own apparatus. Re-verify before relying on any `PK/` line number at a later
commit. Every rule below carries the citation it rests on; if a rule and its
citation disagree, the citation wins and this file is stale. Citations into the `Makefile`
name a target or a variable rather than a line, because that file is under active revision
and its line numbers moved twice while this one was being written.

---

## 0. What counts as evidence

Three rules that govern every check below. They are here rather than buried because each one
has already been violated in this build, and each violation produced a confident wrong answer.

**A. Silence is not a pass.** Absence of a warning is not evidence of validity. Two of the
faults in Section 4 were entirely silent, and one — F3 — was silent *by construction*: an
exact-match comparison that never fires an error, it just scores every win as a miss. Before
trusting a clean run, establish that the check you are relying on actually exists and actually
ran. Some do (`PK/shared/operations/measure-disclosure.ts:117-135` prints its install-state
conflict unconditionally); some did not — `evals/composition/checks.ts` held zero rules and scored
1.00 on anything until `e41b79f` (2026-08-23) landed 27. The example is kept because the *class* of
defect is the point: a scoring surface that reports a clean number while checking nothing.

**B. Absence of a warning is not evidence of validity, and the presence of a flag is not
evidence it took effect.** This is stated as a count rather than a principle, because the count is
the argument. **Six things in this session reported success, or reported their own existence,
while doing nothing:**

| # | What reported success | What it actually did |
|---|---|---|
| 1 | Brain MCP `write_note` accepting a `metadata` parameter | silently dropped it |
| 2 | Brain MCP `create_project` returning success | wrote a config entry that killed the server on next start |
| 3 | A plugin passing every config-level check — enabled flags, manifest validation, filesystem state | a dependent plugin was failing to load; only `claude plugin list` revealed it |
| 4 | `make doctor` reporting no collision | a same-named copy was sitting in front of it, outside the `OLD_NAMES` sweep |
| 5 | `--grader-model` in `measure-outcomes.ts`, parsed, defaulted and threaded through four layers | never appended to argv, so an operator who set it to buy a cheap pinned grader got neither. Since fixed: it is appended at `PK/shared/operations/measure-outcomes.ts:1007` |
| 6 | `schemas.md` documenting `measure-disclosure` rows and an `unsound` verdict via the shared envelope builder | it writes no envelope at all. Since corrected, and the correction is worth reading for its own sake (`PK/shared/references/schemas.md:526`) |

A seventh belongs here as the subtler variant: `--bare` was ruled out as an isolator on the
strength of its help text saying "Skills still resolve via /skill-name", which turned out to mean
a skill can still be reached by *explicit* invocation, not that it stays in the routing inventory.
Measured, `--bare` alone from an empty directory enumerates **zero** skills
(`PK/shared/util/subprocess.ts:265-267`). The help text was accurate; the inference from it was
wrong. That is the harder version of this failure — the document did not lie, it just did not
answer the question being asked of it.

So for a measurement run, **the check must observe the effect**: the recorded `installState`, the
enumerated skill inventory, the model read back off the stream. Never the configuration that was
requested, and never what the configuration is documented to do.

**C. A measurement claim needs its code path, its runtime version, and the scope it
generalises to. A relayed claim is weaker evidence than the source it came from, and a claim
generalised past its original scope is not evidence at all.**

"Verified reproducible" without those three is how a true finding about one file becomes a false
premise about a whole repository. Five premises were corrected during the writing of this file
alone, every one caught by reading source rather than by reasoning about the claim:

| Premise | What was wrong | Shape |
|---|---|---|
| plugin-kit ships no runnable harness | false — ten scripts under `shared/` | wrong outright |
| all subprocess spawning funnels through one module | false | wrong outright |
| Bun writes splice, generally | true of `Bun.file().writer()` and a `BunFile` spawn target; false of `Bun.write`, which is what every operation uses | **true of one file, generalised to a repository** |
| `measure-disclosure` calls no install detector | true until 21:17 on 2026-08-23, false after | true, then stale within the hour |
| `--bare` is not a skill isolator | false — it empties the inventory; it is merely insufficient | inferred from documentation instead of measured |

Two of those started out true and became false — one by being widened from a single file to a
repository, one by going stale inside an hour. **The widening step is where the damage happens,
and it happens in the relaying layer rather than in the tool** — an
orchestrator restating a specific finding in general terms, or a brief presenting a
single-machine observation as settled. This applies to instructions from a coordinating agent
exactly as it applies to a reference file: anything arriving without a code path, a version and
a scope is a hypothesis, whatever its authority. When you record a caveat, record what you
measured it against. When you relay one, relay those three with it or mark it unverified.

---

## 1. Pre-run gate

### 1.1 The opposition: triggering and disclosure need opposite install states

This is the trap that already fired, and it is the first thing to check because it is
silent on both sides.

| Operation | Needs the artifact | Why | Failure if inverted |
|---|---|---|---|
| **triggering** (`make measure-trigger`, `make trigger`) | **reachable** by the router | the router can only choose a skill it can see | every query scores 0; reads as a total description failure |
| **disclosure** (`make measure-disclosure`, `make disclosure`) | **absent** from the machine | content served through the skill system never produces a `Read` | every pull rate floors at 0 and every file gets a `prune` verdict resting on nothing |
| **composition**, `disclosed` arm (`make composition`) | **absent** from the machine | the arm counts `Read` calls against reference paths on disk (`evals/composition/composition-runner.ts:159-162`) | as disclosure |

The rule in the contract: "a triggering sweep needs the artifact installed for the router
to reach it, and a disclosure sweep needs it *not* to be — content served through the skill
system never produces a `Read`, so a disclosure run against an installed copy floors every
pull rate at zero and produces a clean-looking table of `prune` verdicts resting on
nothing. The same value is healthy for one operation and fatal for another"
(`PK/shared/references/schemas.md:479`). A pull is specifically a `Read` tool call and
nothing else (`PK/shared/references/disclosure-optimization.md:114`).

**How this repository satisfies it, and the one place it does not.** Two mechanisms, both in
the Makefile. First, nothing installs the skill: every plugin-kit operation "copies the artifact
under a unique alias into a throwaway project root and spawns with `--setting-sources project
--strict-mcp-config`, so the machine's own skills, settings and MCP servers stay out of the
result" (`Makefile` header comment). Second, both disclosure targets take a **hard pre-flight
gate**, `absent-check`, which refuses the run outright on any sighting (`Makefile`,
`absent-check` target, declared as a prerequisite of the `measure-disclosure` and `disclosure`
targets).

**`make composition` is not covered.** `evals/composition/composition-runner.ts` spawns
`claude -p` with no `--setting-sources` and no `--strict-mcp-config`
(`evals/composition/composition-runner.ts:145-150`), with the working directory set to the
skill directory (`:305`), and tells the model `A skill that applies here is installed at
${skillDir}` (`:276`). The machine's installed skills are therefore in scope for the
`disclosed` arm. If a copy of this skill is visible to the skill system, that arm's
`refsRead` can be empty for the F5 reason — content arriving without a `Read` — and its
reference recall, precision and `refCounts` all floor.

**Gated in `c6f85ef`, then relaxed in `6fb39ab` (2026-08-23).** `absent-check` is a declared
prerequisite of the `composition` target, but all three measurement families now pass
`GUARD_FATAL := 0` and proceed past a sighting rather than refusing it. The reason is measured:
running the harness spawn both ways saw 0 plugin-namespaced entries with `--setting-sources
project --strict-mcp-config` against 97 without, and the `disclosed` arm still read its references
in both cases (`evals/composition/composition-runner.ts`, the `ISOLATION_FLAGS` declaration). So
the guard reports and the run continues; a sighting is only void-making on a path that does not
isolate.

Two details from the investigation worth carrying, because neither is obvious from the arm names.
**The `disclosed` arm does not inject**: it points `cwd` at the skill directory, tells the model a
skill is installed there, and measures disclosure by counting `Read` calls against reference
basenames — the same mechanism the disclosure targets use. **And the `baseline` arm has a separate,
narrower exposure the same gate closes**: it is the no-guidance control, so a copy the loader can
see "puts this skill in front of the very runs that define zero", biasing the control upward and
understating the effect the harness exists to measure (`Makefile`, comment above `absent-check`).

*A deeper fix is in flight and this gate is not the final state:* `--setting-sources project
--strict-mcp-config` on `composition-runner.ts`'s two spawn sites (`:145`, `:182`), which would make
isolation structural and leave the gate as the backup. It had been withheld to protect comparability
with the committed baselines in `evals/history/` — a concern this document's own finding dissolves,
since those figures describe the prior fork and the current artifact was authored from scratch, so
there was never a before-and-after pair to protect. If the `disclosed` arm breaks under those flags,
the gate stands alone.

### 1.1a What guards each operation, and what record it leaves

The answer differs per operation, and one of the three still leaves no artifact to check
afterwards.

| Operation | Detects the conflict? | Records it? | What you check |
|---|---|---|---|
| `optimize-disclosure` | yes — `detectInstallState` + `installConflict`, deliberately outside the envelope block so an un-flagged run still warns (`PK/shared/operations/optimize-disclosure.ts:1630-1651`) | yes, as an envelope `caps` sentence | the envelope's `installState` and `caps` |
| `measure-disclosure` | yes — `warnOnInstallConflict`, called **before** the sweep (`PK/shared/operations/measure-disclosure.ts:117-135`, invoked at `:152-154`) | **no envelope**, but `install_state` and `install_conflict` on `MeasureOutput` (`:80`, `:88`, populated `:210-211`) | those two fields in `results.json`; stderr carries the same warning |
| both, locally | yes — `absent-check` refuses the run before it starts (`Makefile`, `absent-check` target) | the guard's own exit code and report | that the target ran it; it is a declared prerequisite |
| `composition-runner` (local) | yes, since `c6f85ef` — `absent-check` is a declared prerequisite of the `composition` target | the guard's exit code | that the target ran it |

**A note on the age of this table, because it is the point of Section 0 rule C.** Until
2026-08-23 21:17 `measure-disclosure` genuinely had no detector — that is what commit
`4d5b195` in plugin-kit, "say so when a disclosure measurement was void before it started",
added. The local `absent-check` guard landed in the same minute, from the other direction. Any
brief, comment or note asserting that `measure-disclosure` "builds no envelope and calls no
detector" is describing the pre-fix state; the first half is still true and the second is not.
Two source files in this repository currently carry that stale claim, and they are named in the
Blockers list of the report accompanying this file.

The cap text both disclosure operations emit is verbatim: "`optimize-disclosure` needs the
target NOT to be installed, and it is (installed). Content served through the skill system
never produces a `Read`, so pull rates measured under this condition are floored at zero and
the file verdicts below cannot be trusted." (`PK/shared/envelope.ts:803-815`).

`measure-disclosure`'s guard is the loudest of the three by design: it prints rather than
returning a line to the caller, so that "the loudness has one home and one test", and it runs
before the sweep rather than after because "A conflict floors every pull rate at zero, so an
operator told at second zero can stop; **the run that motivated this said nothing and spent
144**" (`PK/shared/operations/measure-disclosure.ts:152-153`). That 144 is this project's void
run. The guard exists *because* of the fault in F5.

**It writes no envelope**, and that is deliberate rather than an oversight — its output shape is
an open decision, so it is "missing from the table on purpose: it takes no `--envelope` flag and
writes no envelope under any flag combination" (`PK/shared/references/schemas.md:557`, `:526`).
Its install state therefore is **not** in `provenance.installState`. It is in `install_state` and
`install_conflict` on `MeasureOutput`, which land in `results.json` and on stdout.

So there are two places to look, and the structured one is better. `make measure-disclosure`
`tee`s the log, which preserves the stderr warning — but its summary `grep` selects `"verdict"`,
`"pull_rate"`, `body_tokens`, `context_tokens` and `pass_rate`, none of which is `WARNING`, so the
warning is captured and never surfaced. **After any `measure-disclosure` run, read
`install_state` out of `results.json`.** Do not rely on having noticed a line of stderr.

### 1.1b Positively verify absence, and record what you checked

For both disclosure operations and for `make composition`, establish absence rather than
assuming it. The sweep that `detectInstallState` performs covers exactly four roots
(`PK/shared/tools/check-overlap.ts:163-172`), and the plugin roots are live sighting sources
for this project rather than hypothetical ones — `.claude-plugin/plugin.json` declares the
plugin name `ask-user-question`, so a marketplace install lands under one of them:

```
~/.claude/skills                       (user)
~/.claude/plugins/marketplaces         (plugin)
~/.claude/plugins/repos                (plugin)
<projectDir>/.claude/skills            (project)
```

Do not hand-roll this. `evals/assert-skill-absent.ts` sweeps exactly those roots, matches on
the name the loader would use (frontmatter `name:`, directory name as fallback), and reports per
root. Its exit codes are the contract:

```bash
make absent-check                              # or: bun evals/assert-skill-absent.ts skills/ask-user-question
claude plugin list                             # a manifest on disk and a loaded plugin are different facts
```

| Exit | Meaning | Is it a pass? |
|---|---|---|
| 0 | `absent` — nothing answers to the name and every root was readable | yes |
| 1 | `installed` — one or more separate copies answer to it | no |
| 2 | `undetermined` — a root exists and would not enumerate | **no** |

**Exit 2 is deliberately not a pass**, and the reasoning is the same as Section 0 rule A:
"'nothing found' and 'nothing found where I could look' are the same output and opposite
claims, and a guard that conflates them reports success on the strength of having failed to
look" (`evals/assert-skill-absent.ts:23-26`).

One blind spot the guard cannot cover: it matches the artifact's **current** name, so a copy
installed under a previous name is invisible to it and fully visible to the router. `OLD_NAMES`
in the Makefile is the only detector for that, and `make purge-old` reports rather than deletes
(`Makefile`, comment above `OLD_NAMES`).

Record the output alongside the results. A run whose install state was never observed is not
distinguishable afterwards from one that was observed clean — and `installState` is required to
be an observation, never a guess: "`unknown` means the sweep did not run or ran blind; never
write it to mean 'probably absent', and never write `absent` on a run where nothing looked"
(`PK/shared/references/schemas.md:479`).

### 1.1c How to tell a real invalidation from the isolation false positive

This one is expensive to get wrong in either direction, so it gets its own rule.

`detectInstallState` sweeps the **machine's** roots, with `projectDir` defaulting to
`process.cwd()` (`PK/shared/envelope.ts:724`) — which is wherever the operator ran `make`, not
the throwaway root the measurement subprocess actually ran in. The harness says this itself, at
the call site: the sweep "installs its own copy under a unique alias into a throwaway project
root and runs with `--setting-sources project`. So what `detectInstallState` reports here is the
MACHINE's state, not the run's" (`PK/shared/operations/measure-triggering.ts:1577-1584`). Meanwhile the plugin-kit
operations spawn with `--setting-sources project --strict-mcp-config` in a per-run empty root
(`Makefile` header comment). An isolation probe run on 2026-08-23 established empirically that
this combination excludes both the plugin layer and loose user-level skills: **11 skills visible
isolated against 118 unisolated**, with a plugin skill winning the routing outright when the
flag was absent. The 11 is the one skill under test plus Claude Code's 10 built-ins — no plugin
skills and no user-level skills, "which is more than its name promises"
(`PK/shared/util/subprocess.ts:240-243`).

So a sighting is a machine observation, not a run observation, and the two can disagree:

| Where the sighting is | Did the run pass `--setting-sources project` in its own root? | Reading |
|---|---|---|
| `~/.claude/skills` or `~/.claude/plugins/**` | yes | **false positive.** The copy exists but could not reach the run. Advisory — do not discard on it alone |
| `~/.claude/skills` or `~/.claude/plugins/**` | no (e.g. `composition-runner`) | **real invalidation.** Every root reached the run |
| the run's own project root | either — `project` is exactly what that flag *includes* | **real invalidation** |

Do not discount the cap casually: the code emitting it says it is an observation of the machine
rather than an assertion about the run (`PK/shared/references/schemas.md:479`), and reading it
as noise is how a genuine floored measurement gets published. Settle it by Section 0 rule B —
observe the effect. If pull rates are uniformly zero **and** no `Read` appears anywhere in the
transcript, the isolation did not hold whatever flags were passed. If pull rates are non-zero,
the isolation held and the cap is the false positive.

Note also that either flag alone is unevidenced, and the source says so: shipping one of the
two "would ship an arrangement no evidence covers"
(`PK/shared/util/subprocess.ts:245-248`).

**The before-and-after, measured through the real production code path rather than a
reconstruction.** With no isolation flags, a helper call from a temporary root enumerated **118**
skills — the operator's whole inventory — and the router reached for a plugin skill and issued an
unrequested `Read`. With the pair applied, the same root saw the one skill under test plus
Claude Code's **10** built-ins and nothing else — 11 visible in total, which is the same
observation as the figure above stated the other way round (`PK/shared/util/subprocess.ts:240-243`,
`:233-238`). The routing query that previously grabbed a plugin skill now makes no skill
invocation at all.

**One honest detail, because this document is about what evidence counts.** The patched routing
query is not zero tool calls — one `Bash` call remains, the model looking around an empty
directory. *Isolated* means the inventory is gone, not that the model sits still. Do not use
"there were no tool calls" as your isolation check; use the enumerated inventory.

### 1.2 Every run, before it starts

- [ ] **`make doctor` passes.** It checks `bun`, `claude`, the plugin-kit probe and older
      installed copies (`Makefile`, `doctor` target). Note it does **not** fail on a missing
      `SKILL.md` — that is informational only (`Makefile`, `doctor` target), so a green `doctor` does
      not mean there is anything to measure.
- [ ] **A `SKILL.md` exists, and you know which artifact your baseline describes.** As of
      2026-08-23 21:39 `skills/ask-user-question/` holds a real `SKILL.md` (283 lines) and three
      references. Every figure under `evals/history/` still describes the *prior fork*, not this
      artifact (`evals/history/README.md:3-6`), so the two are not a before-and-after pair.
- [ ] **No second copy is installed, under this name or a previous one.** Two detectors, and
      each is blind to what the other catches. `make absent-check` finds copies under the
      **current** name (Section 1.1b). `doctor`'s sweep finds copies under the three
      **previous** names in `OLD_NAMES`, which the current-name sweep cannot see: "both look
      for the artifact's CURRENT name, so a copy called `asking-users-questions` is invisible to
      them and fully visible to the router" (`Makefile`, comment above `OLD_NAMES`). Run both.
      Any hit means stop; see fault F4.
- [ ] **The model id is one the CLI accepts.** An invalid id fails every call and the run
      reports a floor, not a defect. See fault F1. `MODEL` defaults to `opus`
      (`Makefile`, `MODEL`).
- [ ] **The output directory is empty or new.** Every target mints its own timestamped
      directory at recipe time (`Makefile`, `stamped`) precisely because of the splice hazard,
      which the Makefile documents in the comment above it. Do not override `OUT`
      (`Makefile`, `OUT`) onto a populated path. See fault F6.
- [ ] **Results are written outside the skill directory.** "The run scans the skill with
      `**/*` and excludes nothing, so results written inside it become bundled files the
      next run measures as part of the artifact — the tool would be measuring its own
      output" (`PK/shared/references/disclosure-optimization.md:27`).
- [ ] **Nothing else is running, and no worker count was raised.** "Rate limiting is the one
      failure that corrupts rather than merely slows a measurement: a rate-limited run is
      recorded as a clean DECLINE rather than as an error, so throttling silently reports
      LOWER trigger rates and a worse-looking skill with nothing red on screen"
      (`Makefile`, comment above `WORKERS`); "Runs that fail on a rate limit are scored as non-triggers, which
      corrupts the measurement rather than speeding it up"
      (`PK/shared/references/running-detached.md:31-34`). The Makefile is serial by design
      (`Makefile` header comment, "Serial by design") and leaves `WORKERS`/`DISC_WORKERS` empty so each script applies its
      own tuned default (`Makefile`, `WORKERS` and `DISC_WORKERS`).
- [ ] **The timeout clears the slowest legitimate call.** "a timed-out call scores as a
      non-trigger, indistinguishable from a genuine decline, so a ceiling inside the
      measured range quietly converts slow calls into failures. Lowering it to go faster
      does not work — it corrupts the result instead"
      (`PK/shared/references/running-detached.md:21-26`). The upstream default is 180s,
      set after calls were measured at up to 124s; 180s for composition
      (`evals/composition/composition-runner.ts:92`).

### 1.3 Triggering runs only

- [ ] **Know which of the two targets you are running.** They answer different questions and
      only one produces a rate. `make measure-trigger` runs
      `PK/shared/operations/measure-triggering.ts` with `--no-early-stop` and `--envelope`, and
      exists to produce per-query rates comparable across runs. `make trigger` runs
      `optimize-description.ts`, an optimizer that ranks iterations on pass **counts**. Run
      `measure-trigger` first (`Makefile`, comment above `B :=`, and the `measure-trigger` and
      `trigger` targets).
- [ ] **`--no-early-stop` is set if you will read a per-query *rate*.** Early stopping never
      changes a pass or a fail, but the reported rate becomes a rate over attempts actually run:
      "a query that fires the first two times reports 2/2 where the full sweep would report
      2/3... Rates from an early-stopped run therefore have no shared denominator and cannot be
      compared across runs" (`Makefile`, comment above `B :=`). See also
      `PK/shared/references/running-detached.md:43-55` and
      `PK/shared/references/description-optimization.md:150-158`.
      **Scope:** the flag exists only on the two scripts built from `SHARED_EVAL_FLAGS`
      (`PK/shared/operations/measure-triggering.ts:1388`), namely `measure-triggering.ts` and
      `optimize-description.ts` (`PK/shared/operations/optimize-description.ts:968`). Neither
      disclosure script has it, so this is a triggering-only concern. `make measure-trigger`
      passes it; `make trigger` deliberately does not, and that is correct for a count-ranked
      optimizer — it just means you must not read a rate off `make trigger`'s output.
- [ ] **You are using the harness that produced the number you will compare against.** The
      local `evals/trigger-runner.ts` probed the machine's own router against real installed
      neighbours; skill-creator's `run-loop.ts` measured a synthetic project-scoped stub in an
      otherwise empty room. "Differencing those two numbers reads as a 10-point extraction
      regression and there is no regression there to find" (`evals/README.md:110-122`). See
      fault F2. **`trigger-runner.ts` was deleted in commit `d16cddd`**, so every figure it
      produced — including the 22/22 baseline — belongs to a harness that no longer exists and
      cannot be reproduced. `evals/README.md` still documents it in four places and is stale.
- [ ] **The negatives are hard negatives.** A first plausible-looking set of nine "returned
      a 0% false-positive rate in every condition tested... It discriminated nothing, and
      would have certified the worst description in the set as flawless"
      (`PK/shared/references/description-writing.md:110-112`). A hard negative must be
      complex, multi-step, squarely inside the declared subject matter, with a deliverable
      that is something else (`:116-120`).
- [ ] **No positive query has an obvious one-step answer.** "Claude only consults a skill
      for work it cannot easily handle alone, so a one-step query like 'read this PDF' may
      not trigger even when the description matches perfectly"
      (`PK/shared/references/description-optimization.md:175-178`). This project's own set
      has six such queries plus four more that lose to `(answered directly)` 3 of 3
      (`evals/README.md:76-83`, `:124-135`). Those cannot fire, so they measure the query
      and not the description.
- [ ] **Queries were not derived from the description under test.** Doing so means "every
      candidate scores well on the cases its own text suggested and the loop certifies the
      description against itself" (`PK/shared/references/description-optimization.md:22-30`).
      `evals/trigger-eval-set.json` is authored input and marked **do not regenerate**
      (`evals/README.md:28`).

### 1.4 Disclosure and composition runs only

- [ ] **Scenarios are self-contained.** The optimizer runs each scenario in a fresh temp
      root containing only the skill. A scenario naming a codebase that is not there
      measures the temp root (`evals/composition/README.md:76-80`).
- [ ] **Expectations are scenario-specific and name the deciding artifact.** "Generic
      expectations are satisfiable from SKILL.md alone, so no reference was ever decisive"
      (`evals/composition/README.md:82-84`). A set with no expectations at all "leaves the
      loop free to strip the skill to nothing and call it an improvement"
      (`PK/shared/references/disclosure-optimization.md:29`).
- [ ] **Every scenario has a statable wrong answer.** "A scenario with no statable wrong
      answer does not belong in this set. Its zero would be honest and would tell you
      nothing" (`evals/composition/README.md:97-99`).
- [ ] **`--permission-mode acceptEdits` is passed** when scenarios write files
      (`PK/shared/references/disclosure-optimization.md:131`). Without it "half the runs had
      a Write denied and fell back to inline text" (`evals/composition/README.md:86-87`).
      `Makefile`, `measure-disclosure` and `disclosure` targets pass it; `make composition` does not need it.
- [ ] **Use `disclosure-evals.json`, not `evals.json`.** `evals.json` is the failed first
      attempt and it measured nothing (`evals/composition/README.md:70-88`).
      `Makefile`, `measure-disclosure` and `disclosure` targets point at the right one.
- [ ] **At least 2 runs per scenario if you will read a rate.** "Two runs per scenario is
      the smallest number that can distinguish 'always' from 'sometimes'"
      (`PK/shared/references/disclosure-optimization.md:117`).
- [ ] **The turn ceiling is not truncating the deepest engagements.** At `--max-turns 10`,
      5 of 15 composition attempts came back unparseable, and those attempts averaged 143
      seconds and 3.0 reference reads against 78 seconds and 1.3 for the rest: "A ceiling
      that drops your best runs from the sample biases every number computed over the
      survivors" (`evals/composition/README.md:254-261`). The default is now 24
      (`evals/composition/composition-runner.ts:105`).
- [ ] **The grader is held constant and is not the arm under test.** A candidate's pass rate
      is judged against a baseline graded by the same model
      (`PK/shared/references/disclosure-optimization.md:46`); the grader deliberately does
      not inherit `--model` (`:42`). Locally `--judge-model` *defaults* to `--model`
      (`evals/composition/composition-runner.ts:89`), so pass it explicitly.
      **This rule does not apply to the description loop.** `optimize-description` runs no
      grader at all and records `graderModel: null` for the stated reason that "Nothing grades
      here. A trigger is read off the tool-call stream"
      (`PK/shared/operations/optimize-description.ts:931-933`). A grader caveat against a
      triggering number is a category error.
- [ ] **Do not rely on `--grader-bare` as the isolation mechanism.** It does empty the
      inventory — measured, `--bare` alone from an empty directory reports zero skills — but it
      is **insufficient** for four verified reasons, and the first is the load-bearing one
      (`PK/shared/util/subprocess.ts:265-273`):
      it is **off by default** (`graderBare = false`,
      `PK/shared/operations/disclosure-measure.ts:441`), so the ordinary path was unisolated;
      it exists at **one of the four helper call sites**, so it could never have covered
      `propose-description`, `synthesize-scenarios` or the `measure-outcomes` grader;
      it authenticates strictly from `ANTHROPIC_API_KEY`, an apiKeyHelper, or a third-party
      provider and **never OAuth or the keychain**, so on a login-authenticated machine it
      **latches off mid-run** and every call after that point is exposed again
      (`PK/shared/operations/disclosure-measure.ts:422-431`); and it switches off hooks, LSP,
      auto-memory and CLAUDE.md discovery, which is far more than isolation asks for.
      The mechanism is `--setting-sources project` plus `--strict-mcp-config` with a fresh empty
      cwd per call (Section 1.1c). The two compound rather than conflict, and flags are appended
      so a caller's own `--bare` survives (`PK/shared/util/subprocess.ts:281`). Both disclosure
      targets still pass `--grader-bare` (`Makefile`, `measure-disclosure` and `disclosure`
      targets), which is fine and is not a substitute for `absent-check`.
- [ ] **If the run predates 2026-08-23 21:14, its helper calls were not isolated.** The four
      helper call sites were routed through `runIsolatedHelper` in plugin-kit commit `31e91e1`,
      "isolate helper claude calls from the operator's installed skills". Before it, a grader
      call spawned from a bare working directory "selected the plugin skill
      `skill-creator:skill-creator` and issued a `Read` nobody asked for"
      (`PK/shared/util/subprocess.ts:233-238`). A grader that goes on side quests is not a
      guardrail, and its verdicts "stop being comparable across machines the moment they depend
      on which plugins the operator happens to have enabled" (`:236-238`).
- [ ] **The lint layer has rules in it.** `evals/composition/checks.ts` currently ships
      **zero** rules; `checkCall` returns an empty array and `scoreFindings` "returns `1.00`
      for every input, including a call with a defect under every rule below"
      (`evals/composition/LINT-RULES-PENDING.md:26-27`) — "**That number means 'nothing was
      checked'**" (`:28-29`). A lint mean of 1.00 today is vacuous, and `checks.test.ts`
      "Asserts nothing while `ACTIVE_RULE_COUNT === 0`" (`:16`), so `make checks`
      (`Makefile`, `checks` target) is not evidence either.

---

## 2. Post-run gate

### 2.1 The envelope

Every measured run must land an envelope beside its own output. "A `results.json` answers
'what did the run find'. An envelope answers the two questions a reader has *before* they
are willing to believe it: under what conditions was this produced, and is it comparable to
the last one" (`PK/shared/references/schemas.md:415`). A `results.json` on its own "records
what a run found and says nothing about the model, the concurrency, the timeout, the eval
set or the installed state it found it under" (`:407`).

Six fields must be present, and **a difference in any one of them invalidates a comparison
between two runs** (`PK/shared/references/schemas.md:530-540`):

| Field | Why a difference disqualifies a comparison |
|---|---|
| `model` | a different router makes a different routing decision |
| `workers` | concurrency changes contention, and contention changes timeouts |
| `timeoutSeconds` | the budget decides how many slow units are scored as failures |
| `runsPer` | a rate over 2 attempts and a rate over 10 are not the same estimate |
| `evalSetHash` | different questions |
| `installState` | a shadowed target answers with somebody else's description |

`artifact`, `target`, `operation`, `graderModel` and `targetSha` are **advisory** differences
— worth showing, not grounds to refuse. `targetSha` heads that list on purpose: the artifact
changing is what a before/after delta is *about* (`:541`).

#### The ceiling: two matching `model` fields do not establish comparability across machines

This one is a limit rather than a checklist item, because **no flag closes it** and no envelope
field records it. It is here, directly under the table, because that table is where a reader
would otherwise conclude that agreeing `model` values make two runs comparable.

Model *aliases* resolve through the operator's own environment. The machine these measurements
were taken on carries, in `~/.claude/settings.json`, four `ANTHROPIC_DEFAULT_*_MODEL` mappings
plus a capabilities key, `CLAUDE_CODE_USE_BEDROCK=1`, and an AWS profile and region. Every one of
those reaches every spawned child in **every** configuration, because `claudeEnv()` drops exactly
one variable — `CLAUDECODE` — and passes the rest of the parent environment through
(`PK/shared/util/subprocess.ts:46-55`). Nothing in plugin-kit isolates them and nothing can: they
are the mechanism by which provider auth works at all.

So `--model opus` on this machine means `us.anthropic.claude-opus-5[1m]` on Bedrock. On another
machine the same flag means something else. **Two envelopes that both record `model: opus` may
describe runs against different models**, and `model` is one of the six keys whose agreement is
supposed to license a comparison.

The harness is already honest about the *unpinned* case. When no `--model` is passed it records
`null` and attaches a cap: "No `--model` was pinned, so the run was answered by the operator's
configured default and the model is not recorded. Runs made this way are not comparable across
machines even though their `run.model` fields match"
(`PK/shared/operations/measure-triggering.ts:1598-1604`). **That sentence is true of the pinned
case too, for a different reason** — the alias resolves locally — and nothing says so. Treat a
pinned alias as recording the *request*, not the model.

*Practical rule:* comparisons within one machine and one settings file are sound. A comparison
across machines needs the resolved model identifier recorded out of band, not the alias. Where
you cannot establish that, say so rather than differencing.

*What `--setting-sources project` does and does not fix.* Measured: it does block the user-level
`model` key in `settings.json` from reaching the child. That is real and good for validity. It
does **not** touch the env aliases, which are a separate channel. And one honest boundary — that
observation was only made under `--bare`; in ordinary non-bare mode the settings `model` key was
not honoured at all across four runs and what overrides it there was never identified. **Nothing
in this document should be read as claiming the non-bare path is understood.**

- [ ] **No key is absent.** "Every field is required and no key may be absent. `null` is
      permitted only where it is a real answer" (`PK/shared/references/schemas.md:461`).
      Absent and null read identically to a consumer while meaning opposite things.
- [ ] **`installState` is one of `absent`, `installed`, `shadowed`, `unknown`, and it was
      observed.** "`unknown` means the sweep did not run or ran blind; never write it to
      mean 'probably absent', and never write `absent` on a run where nothing looked"
      (`:479`).
- [ ] **`caps` is filled in or deliberately empty.** "`caps` is the field whose absence is
      invisible. A silently applied top-N, an early-stopping rule that skipped a third of
      the planned attempts, a held-out split that kept scenarios out of a phase, a check
      that was not performed — each reads as 'we looked at everything' unless the report
      says otherwise" (`:495`).
- [ ] **`timeoutPolicy` is stated.** The repository holds two opposite policies:
      `measure-triggering` and `optimize-description` score a timeout as a definite negative;
      `optimize-disclosure` and `measure-disclosure` drop it from the denominator
      (`:497-507`). A `failed` count means different things under each.
- [ ] **`tokenizer` is honest.** `tiktoken`, `estimated` or `none` (`:485`). "A body measured
      at 4,800 estimated tokens against a 5,000-token budget has not been shown to be inside
      it" (`PK/shared/references/disclosure-optimization.md:48`).
- [ ] **`unit` says what one counted thing is** — `"query attempt"`, `"scenario run"`,
      `"file examined"`. "`\"scored\": 24` is meaningless without it"
      (`PK/shared/references/schemas.md:486`).
- [ ] **No metric is reported as zero when its numerator does not exist.** "a recall of 0
      computed over no positive queries reads as a total failure to trigger, and a pass rate
      of 1 over no assertions reads as a perfect score" — omit it instead (`:513`).
- [ ] **Build the envelope, do not hand-write it.** `writeEnvelope` refuses an invalid
      envelope and lists every problem by field path; "This is the one file on this page
      where 'it produced no error' *is* evidence" (`:559`).

**Which producers actually write one.** `optimize-disclosure` and `validate` write envelopes;
`optimize-description` accepts `--envelope` and exports its builder but does not yet write the
file (`PK/shared/references/schemas.md:549-555`) — so `make trigger` produces none.
**`measure-disclosure` writes none either**, on purpose: it emits `results.json` and
`report.html` and no envelope (`PK/shared/operations/measure-disclosure.ts:348`, `:398`;
`PK/shared/references/schemas.md:526`, `:557`), and reports its install state as two fields on
`MeasureOutput` instead (Section 1.1a).

**Which of this project's targets leave one.** Two of five do.
`make measure-trigger` passes `--envelope` explicitly and `make disclosure` gets one by default
from `--results-dir` (`Makefile`, `measure-trigger` and `disclosure` targets;
`PK/shared/references/schemas.md:549-555`). `make trigger`, `make measure-disclosure` and
`make composition` leave none.

The one harness still in this repository records 2 of the 6 comparison keys:
`evals/composition/composition-runner.ts:509-510` writes `{model, judgeModel, runsPer,
scenarioCount, ...}`, omitting `workers`, `timeoutSeconds`, `evalSetHash` and `installState`. So
**a composition figure cannot be compared against another composition figure under the
contract**, and every such comparison below is stated as a re-run rather than a delta.

### 2.2 Every run

- [ ] **The earlier run was not silently replaced.** `measure-disclosure` writes
      `results.json` straight into `--results-dir` with no timestamped subdirectory
      (`PK/shared/operations/measure-disclosure.ts:348`), where `optimize-description`
      (`PK/shared/operations/optimize-description.ts:1044`) and `optimize-disclosure`
      (`PK/shared/operations/optimize-disclosure.ts:1504`) both mint one. `Bun.write` truncates,
      so two `measure-disclosure` runs into the same directory do not produce a corrupted
      hybrid — **the second replaces the first outright**, with no partial record left to
      notice it happened. Use a fresh results directory per run; `Makefile`'s `stamped` does
      this for you.
- [ ] **The output is not spliced — driver path only.** This hazard is real and **narrow**.
      Measured on Bun 1.3.14: `Bun.write(path, data)` truncates like an ordinary `O_TRUNC`
      open, and shell `tee` truncates; only `Bun.file(path).writer()` (the FileSink) and a
      `BunFile` passed as spawn stdout fail to. A grep across `PK/shared/` for `.writer()`,
      `FileSink`, `createWriteStream` and `appendFile`, excluding tests, returns nothing — every
      write in `shared/` goes through `Bun.write`. So the splice is confined to
      `PK/evals/drivers/run-measurement.ts:98-104`, which passes a `BunFile` as spawn stdout.
      **It does not apply to any `shared/operations/` script, and it does not apply to a
      Makefile that pipes through `tee`.** The generalised form of this claim is in circulation
      and is wrong; someone will arrive carrying it.
- [ ] **The failure tallies read zero.** The Makefile's own guidance: "Watch the `!` and `?`
      tallies on the progress bar; they should read zero" (`Makefile`, comment above
      `WORKERS`). Any non-zero count means some part of the score is a timeout or a rate-limit,
      not a decline. In the envelope this is `provenance.failed`
      (`PK/shared/references/schemas.md:489`).
- [ ] **The status file and the report agree.** "A report is a snapshot; the status file is
      the truth" — a crash leaves the last snapshot describing an iteration that never
      finished, and that file then says so forever
      (`PK/shared/references/running-detached.md:123-132`).
- [ ] **The record is committed.** "A transcript that is not committed cannot be re-read when
      a later change moves a number... The alternative — a scratch directory beside the repo
      — makes every claim unfalsifiable the moment the directory is cleaned up"
      (`PK/shared/references/eval-evidence.md:8-22`). `OUT` defaults outside this repo
      (`Makefile`, `OUT`) and `make clean` deletes all of it (`Makefile`, `clean` target).
- [ ] **Directory names are ones the aggregator recognises.** `with_skill`/`new_skill` are
      read as the primary arm and `without_skill`/`old_skill` as the baseline; "an
      unrecognized configuration name is not an error, it just quietly stops being counted
      as either arm" (`PK/shared/references/eval-evidence.md:79-84`).

### 2.3 Disclosure runs

- [ ] **Read the `signposted` column before reacting to any zero.** `prune` and `signpost`
      "look identical in the data — a file nobody read — and they need opposite fixes"
      (`PK/shared/references/disclosure-optimization.md:56-66`, `:100`).
- [ ] **Check load mode before the pull rate.** "a `scripts/` file has a pull rate of zero
      when everything is working, because its text is never supposed to enter context at
      all" (`:56`, `:115`).
- [ ] **Ask whether the scenario set could have fired the condition.** Three references in
      this project had never been opened once, and "The actual reason is that **no scenario
      in the set fired their conditions**" — all three opened on the first run that contained
      scenarios for them (`evals/composition/README.md:282-296`). The same caveat is recorded
      upstream: those zeros "measure scenario coverage as much as they measure the references"
      (`PK/evals/MEASUREMENTS.md:141-146`). "**Open rate is the wrong metric for a conditional
      reference**" (`evals/composition/README.md:299-302`).
- [ ] **Check the inline verdicts against the body budget.** Six references upstream came
      back above the inline threshold and none could be inlined, because every body already
      sat at 4,808-4,989 tokens against a 5,000 ceiling: "The rule and the budget are in
      direct conflict here and the tool does not model that"
      (`PK/evals/MEASUREMENTS.md:152-165`).

---

## 3. Discard table

Verdicts are `TRUST`, `DISCARD`, or `RE-RUN WITH X`. A `DISCARD` is not a warning; the
number does not get quoted, does not get compared, and does not go on a fix list.

| Symptom | What it actually means | Verdict |
|---|---|---|
| Uniform `pullRate 0` across **all** files | The artifact was reachable through the skill system, so no `Read` ever happened; or no scenario could fire any condition. A real layout defect does not distribute perfectly evenly (`PK/shared/references/schemas.md:479`, `PK/shared/references/disclosure-optimization.md:114`) | **DISCARD.** Re-run with nothing installed, via `make measure-disclosure` |
| A `prune` verdict on **every** file | Same cause. `prune` means unread-and-pointed-at; a whole-artifact sweep of it is the install-state signature, which the contract has its own verdict for: `unsound` (`PK/shared/references/schemas.md:521`) | **DISCARD** |
| No `installState` recorded anywhere | The run cannot say which of two opposite conditions it met, and the one comparison-blocking field that decides a disclosure run's validity is missing (`PK/shared/references/schemas.md:477`, `:539`) | **DISCARD** for any disclosure figure unless `install_state` is present in `results.json` and reads `absent` (row below). For triggering, **RE-RUN WITH** an install-state observation, or keep it as a standalone absolute with the caveat attached |
| `measure-disclosure` output whose `install_state` is not `absent` | It records the sighting in `install_state` and `install_conflict` on `MeasureOutput` rather than in an envelope (`PK/shared/operations/measure-disclosure.ts:80`, `:88`, `:210-211`) — so unlike an envelope-less run, the record exists and you have to read it | **DISCARD** on any value but `absent`. If the field is missing entirely, the run predates the guard: **DISCARD** and re-run |
| An install-state `caps` sentence on a run that used `--setting-sources project` in its own root | The sweep observes the **machine** with `projectDir` defaulting to `process.cwd()` (`PK/shared/envelope.ts:724`), not what the isolated subprocess could load. Probed 2026-08-23: 11 skills visible isolated against 118 unisolated | **TRUST the figure** if pull rates are non-zero — the cap is the known false positive (Section 1.1c). **DISCARD** if pull rates are uniformly zero and no `Read` appears anywhere: then isolation did not hold, whatever flags were passed |
| Timeouts present, scored as non-triggers | Correct for triggering (`PK/shared/references/schemas.md:503`, `:507`) and wrong for disclosure (`:504`). A timed-out call is "indistinguishable from a genuine decline" (`PK/shared/references/running-detached.md:21-26`) | **TRUST** the triggering figure if `failed` is small and reported. **RE-RUN WITH** a higher `--timeout` if the tally is material |
| A rate-limited run recorded as a decline | Contention does not surface as an error: "throttling silently reports LOWER trigger rates and a worse-looking skill with nothing red on screen" (`Makefile`, comment above `WORKERS`; `PK/shared/references/running-detached.md:31-34`) | **DISCARD.** Re-run serially |
| `--max-iterations 1` presented as if a candidate was compared | That flag stops the run after the baseline sweep. Under it "every one of those pairs held the same number twice, which invited a reader to compare them and conclude a restructure had been evaluated" (`PK/evals/MEASUREMENT-CAVEATS.md:73-80`) | **DISCARD** the comparison. **TRUST** the baseline table as a measurement. Prefer `measure-disclosure.ts` for new work (`:62-71`) |
| A **triggering** rate compared across runs without `--no-early-stop` | `trigger_rate` becomes a rate over attempts actually run, so the two rates have different denominators (`PK/shared/references/running-detached.md:43-55`). Triggering only: the flag exists just on the `SHARED_EVAL_FLAGS` scripts (`PK/shared/operations/measure-triggering.ts:1388`), so it cannot apply to a disclosure figure | **DISCARD** the delta. Passes and fails are unaffected, so **TRUST** those |
| Results written into the skill directory | The next run measures the tool's own output as part of the artifact (`PK/shared/references/disclosure-optimization.md:27`) | **DISCARD** every subsequent run until the directory is clean |
| A second `measure-disclosure` run into the same `--results-dir` | It writes `results.json` with no timestamped subdirectory (`PK/shared/operations/measure-disclosure.ts:348`) where the two optimizers mint one, and `Bun.write` truncates — the earlier measurement is **gone**, not corrupted, with no partial record | **DISCARD** the assumption you still have the earlier run. Fresh directory per run |
| Spliced output: a results file whose tail describes a different run | Confined to `PK/evals/drivers/run-measurement.ts:98-104`, which passes a `BunFile` as spawn stdout. `Bun.write` and `tee` both truncate, and nothing in `PK/shared/` uses a FileSink — so this **cannot** be the explanation for a `shared/operations/` output | **DISCARD** the affected driver record. **TRUST** a `shared/operations/` output against this specific concern |
| Precision 100% alongside recall 0% | The vacuous case, and also the signature of F3 and F4. The upstream harness handles it correctly — recall is omitted rather than reported as zero when the numerator is empty (`PK/shared/operations/measure-triggering.ts:1242-1243`), per `PK/shared/references/schemas.md:513`. A harness that reports `1` here is computing over nothing | **DISCARD** both figures. Check the target name and the installed set first |
| Lint mean exactly 1.00 on every arm | `checks.ts` held zero rules until `e41b79f` (2026-08-23), so the score meant "nothing was checked" (`evals/composition/LINT-RULES-PENDING.md:26-29`) | **DISCARD** any figure produced before that commit. After it, 1.00 is a real score over 27 rules and the calibration probe fails at 0.00, so read it as a measurement |
| Judge dimensions all reporting `0` | The judge was off. `judgeModel: null` and every per-result `judge: null`, with the summary block still emitting six zeros — a metric reported as zero where its numerator does not exist (`PK/shared/references/schemas.md:513`) | **DISCARD** the judge block. **TRUST** the lint and abstention columns of the same run |
| A `headline` delta with no comparability check behind it | "A `headline[].delta` is only ever filled in after that check has passed" (`PK/shared/references/schemas.md:543`) | **DISCARD** the delta |
| A whole-set score with no `caps` sentence and a held-out split in play | Rows computed over the train split only, read as if computed over everything (`PK/shared/references/schemas.md:441-442`, `:495`) | **RE-RUN WITH** the split stated, or re-report scoped to the split |
| A token figure against the 5,000 budget from an estimator | "A body measured at 4,800 estimated tokens against a 5,000-token budget has not been shown to be inside it" (`PK/shared/references/disclosure-optimization.md:48`) | **RE-RUN WITH** `tiktoken` present before claiming compliance |
| A description character count near 1,024 | 1,024 is "a real cliff rather than a guideline: a description over it is silently truncated" (`PK/shared/references/description-writing.md:67`). Locally, the plain-scalar branch of the frontmatter parser stops collecting at a blank line (`evals/frontmatter.test.ts:43-47`), so a count taken through it can be short — the exact shape of fault F0 | **RE-RUN WITH** the description on **one physical line**, which is immune to both parser branches rather than dependent on the reader being the fixed one, and the count re-taken. Count the value, not the enclosing quotes |
| A 0% false-positive rate in every condition tested | The negatives are too easy. A set of nine such queries "would have certified the worst description in the set as flawless" (`PK/shared/references/description-writing.md:110-112`) | **DISCARD.** Rewrite the negatives to the standard at `:116-120` |
| A positive query losing to `(answered directly)` | The query never reached skill selection, so it measures the query rather than the description (`PK/shared/references/description-optimization.md:175-178`; `PK/shared/references/description-writing.md:114`) | **DISCARD** that query from the recall denominator; rewrite it |
| Two figures from different harnesses differenced | "measure with the harness that produced the number you are comparing against" (`evals/README.md:122`) | **DISCARD** the delta |
| A delta smaller than the noise floor | Run-to-run noise at 2 runs per query is roughly plus or minus 3 on a 20-query set (`PK/evals/MEASUREMENTS.md:74-82`). In composition, "At n=1 per cell the run-to-run spread is the same size as the effects attributed to the interventions above it" (`evals/composition/README.md:244-251`) | **DISCARD** the delta. State the direction only |
| A comparison against anything in `evals/history/` | "Nothing in this directory is an input to anything... **Do not compare a new run against these.**" (`evals/history/README.md:3-16`) | **DISCARD** |
| A figure whose only record is outside the repository | A scratch directory "makes every claim unfalsifiable the moment the directory is cleaned up" (`PK/shared/references/eval-evidence.md:20-22`), and `make clean` deletes `~/auq-results` outright (`Makefile`, `clean` target) | **RE-RUN WITH** the record committed, or commit the existing record before quoting the figure again |
| A judge dimension delta with no stated noise floor | No noise floor has been measured for the six judge dimensions at any n. Deltas on a 1-to-5 scale are not shown to exceed run-to-run spread (`evals/composition/README.md:244-251`) | **RE-RUN WITH** repeats sufficient to state a floor, or report the direction without the number |

---

## 4. Known-fault register

Each fault is recorded with the signature that makes it recognisable next time. All were
confirmed; F0 and F5 have written records upstream and locally.

**F0 — Block-scalar truncation silently shortened every measured description.**
*Signature:* a description's measured character count is materially below the string that
ships, and the loss lands after the first paragraph break. The frontmatter reader's
block-scalar collection ended at the first line not opening with two spaces or a tab, and a
blank line opens with neither. Losses of 40%, 30%, 23% and 22% across four skills; agent
descriptions lost 78-81%, taking every `<example>` block with them
(`PK/evals/MEASUREMENT-CAVEATS.md:10-45`). "Every number in that run is a real measurement
of a real string. It is not the string the artifact ships." Measurements taken after the fix
are **not comparable** with the pre-fix baseline (`:41-45`). *Local status:* the block-scalar
branch here tolerates blank lines (`evals/frontmatter.test.ts:32-35`); the plain wrapped-scalar
branch does not (`:43-47`).

### F0's real shape: the readers were fixed, the artifact was not

An earlier draft of this section claimed that *every* trigger measurement of plugin-kit's flagship
skill scored a truncated description. **That was wrong, and it is exactly the over-generalisation
this document argues against**, so the correction is kept in place rather than quietly edited out.

What was actually true, verified per consumer at `2a7c0d5`:

| Consumer | Which reader | Affected? |
|---|---|---|
| `PK/shared/operations/measure-triggering.ts:463-478` | `parseFrontmatterBlock`, i.e. real `Bun.YAML.parse` (`PK/shared/parse/lib.ts:72`) | **no**, since `037d59f` |
| the same, for `targetType === "command"` only | hand-rolled reader (`:469`) | dead branch — the repo ships no command artifact, documented at `:456-461` |
| `PK/shared/operations/propose-description.ts:408` | destructures `{ name, content }` only | **no** — never reads the description |
| `PK/shared/operations/disclosure-measure.ts:462` | conformant reader, deliberately | **no** |
| `PK/shared/tools/check-overlap.ts:135` | real `Bun.YAML.parse` | **no** |

So the consumer split was real and **was fixed on the reader side** at `037d59f` — which is what
`PK/evals/MEASUREMENT-CAVEATS.md:41-45` already records. **The 2026-08-08 corpus was affected;
measurements after `037d59f` were not.**

What remained was the trap in **the artifact**: the two readers disagreed about what the shipped
file said, so any future or third-party consumer reaching for the hand-rolled reader would silently
get a description up to 40% shorter. That is a narrower claim than "every measurement is
compromised" and it is the one the evidence supports.

**Now fixed in the artifact too**, at `2a7c0d5`, all five creator skills re-serialised to a single
double-quoted line. Verified here independently by running both readers over each file — they agree
byte-for-byte on all five:

| skill | before: real / hand-rolled | after, both agree | recovered |
|:--|:--|--:|--:|
| `skill-creator` | 949 / 567 | **947** | +380 |
| `command-creator` | 834 / 586 | **832** | +246 |
| `plugin-creator` | 893 / 688 | **891** | +203 |
| `agent-creator` | 944 / 735 | **942** | +207 |
| `mcp-creator` | 944 / 943 | **943** | 0 |

`mcp-creator` carried no blank line, so nothing was ever truncated — its one-character gap was the
block scalar's trailing newline. It was never mis-measured and its change is pure form-hardening.

The residual lesson still stands, in its accurate form: **a repository publishing a standard had a
divergence between two of its own readers, and only one of them was ever going to be right about
what shipped.** Section 0 rule B is what catches that — measure the thing, do not reason about the
format.

**The counter-example, in the same repository, and the fix is better than the one this document
originally recommended.** This plugin's own `SKILL.md`, authored 2026-08-23, carries its
description as a **single physical line**, double-quoted, with a comment sitting directly above it:

```
# description must stay on ONE physical line. A blank line or a wrap inside it
# truncates the value in the measurement tooling, silently and without warning.
```

Measured independently here at **954 characters** — 70 characters of headroom under the 1,024 cap.
(It was 947 when first authored; reviewer findings added the missing capability of whether questions
share one call or run as a sequence. Still one physical line, still free of `"` and `\`, both
re-verified here.) A one-line scalar cannot contain a blank line and
cannot wrap, so it defeats **both** branches of the frontmatter reader at the source, where a `|`
block scalar merely relies on the reader's block branch being the fixed one. If you author a
description, do this rather than what row 19 of the discard table used to say.

*One measurement note that is itself an instance of Section 0 rule C.* First pass here returned
**949**, not 947, and the gap was real rather than rounding: the regex was counting the two
enclosing double quotes. The shipped string is the value, not the literal. A two-character
disagreement is worth chasing to its cause when the cap is a hard cliff 77 characters away.

**The one-line double-quoted form is CONDITIONALLY safe, and the condition is not obvious.** The
hand-rolled reader's `stripQuotes` (`PK/shared/parse/frontmatter.ts:69-71`) strips *repeated*
leading and trailing quote characters and **unescapes nothing**. So the five re-serialised
descriptions round-trip identically only because none of them contains a `"` or a `\`. Verified
here: all five are clean on both counts.

A description that quotes a phrase — or carries a backslash — would round-trip **differently**
through the two parsers and reintroduce the same divergence class. Worse than the original, because
there would be no blank line to make it visible. **This is a pre-ship check, not a pre-run one:**

```bash
# every shipped description must agree under both readers, and must contain no " or \
```

**The durable fix is a test asserting both readers agree on every shipped skill**, which would catch
a quoted phrase *and* a reformat back to a block scalar. Not written as of `2a7c0d5`; assigned. Until
it exists, treat "both readers agree" as a claim someone has to re-establish by hand after any
description edit — and note that the check is cheap: parse the frontmatter twice and compare the
`description` field.

**F1 — An invalid model id, read as a broken description.**
*Signature:* every call fails, the score is a uniform floor, and the failure tally is
non-zero if anyone looks at it. Recorded as prior art for every wave of this build
(`docs/sessions/SESSION-2026-08-23_01-ask-user-question-fresh-build.md`, Event 09).

**F2 — The wrong harness, read as a regression from a 22/22 baseline.**
*Signature:* a plausible drop of several points between two runs that both report "N of 22".
The local `evals/trigger-runner.ts` measured the installed skill against its real
neighbours; skill-creator's `run-loop.ts` installs a project-scoped synthetic stub with
`--setting-sources project`, which excludes every installed plugin — so it asks whether a lone
stub attracts the queries in an empty room. The cross-check scored 12/22 against the same set's
22/22, and is committed with `comparable_to_RESULTS_baseline: false` (`evals/README.md:110-122`).
*The isolation probe of 2026-08-23 quantifies why they disagree: 11 skills visible under
`--setting-sources project` against 118 without it.* `trigger-runner.ts` was deleted in
`d16cddd`; this record survives only in `evals/README.md`, which still describes the file as
present.

**F3 — Exact-match scoring of the router's chosen skill name.**
*Signature:* a run where the skill demonstrably won scores near zero, and the losses are all
"nobody won". One skill can answer under more than one qualified name, and an exact match
scores every one of them as a miss. Measured twice: a run winning 10 of 10 should-trigger
queries scored **4/10**, because the router answered as both `ask-user-question` and
`skills:ask-user-question` in the same run; a second run after deduplicating scored **0/10**
for the same reason with the single surviving name. "That failure mode is silent and reads
exactly like a broken description, which is the expensive part: the obvious response is to
rewrite prose that was never at fault." It was fixed in the local runner by comparing the last
colon-separated segment rather than the whole string; that runner was then deleted in `d16cddd`,
so the fix and its recorded measurements went with it. The fault is a property of any
name-matching scorer, so it is worth re-checking in whatever replaces it.

**F4 — A name collision with a same-named installed copy.**
*Signature:* 200 attempts across 20 queries, every one `rate=0/10`. A duplicate copy competes
for the same queries and wins some, "which reads as a broken description rather than a
duplicate" (`Makefile`, comment above `OLD_NAMES`). `make doctor` refuses when it finds a copy under one of the
three *previous* names (`Makefile`, `OLD_NAMES` and `FIND_OLD`, checked in the `doctor`
target) — it does **not** detect a
second copy under the current name, and the Makefile notes that plugin-kit's own install sweep
has the mirror-image blind spot: "it looks for the artifact's CURRENT name, so a copy called
`asking-users-questions` is invisible to it and visible to the router" (`Makefile`, comment above `OLD_NAMES`).
Neither sweep covers both, so run both: `make absent-check` for the current name and
`make doctor` for the previous ones (Section 1.1b and Section 1.2).

*This is no longer hypothetical.* On 2026-08-23 the retired fork's 21KB `SKILL.md` and its eight
reference files were found installed under the **current** name — enough to void every disclosure
run made that day. At that same moment `make doctor` reported **"ok no older copy installed"**,
because its sweep covers previous names only and the collision was under the current one. A check
that verified the wrong thing and said ok. The copy was removed after being verified by `md5`
against a byte-identical archived copy.

**F5 — A disclosure run against a reachable artifact, and a scenario set that measured
nothing.**
*Signature:* uniform `pullRate 0`, uniform `prune`, and no `installState` on the record.
Content served through the skill system never produces a `Read`, so every pull rate floors at
zero and the report shows a clean-looking table of `prune` verdicts resting on nothing
(`PK/shared/references/schemas.md:479`). This project has a record of exactly the shape:
"**all eight references came back at 0 pulls across 18 runs**" — 8 files times 18 runs, 144
counted runs — against `evals.json`, which `evals/composition/README.md:70-88` diagnoses as
three set-shape defects: it named a codebase the fresh temp root did not have (17 of 30 runs
said so after 4.2 Bash calls each), its expectations were boilerplate pasted across all ten
asking scenarios, and it passed no `--permission-mode`, so half the runs had a Write denied.
The set was replaced by `disclosure-evals.json` and the Makefile points at the replacement
(`Makefile`, `measure-disclosure` and `disclosure` targets). **Either cause floors the same
number, and neither is a defect in the skill.**

*Since fixed, on both sides, on 2026-08-23 at 21:17:* `measure-disclosure` now detects the
install conflict and prints it before the sweep, and its code comment names this exact run as
the motivation — "the run that motivated this said nothing and spent 144"
(`PK/shared/operations/measure-disclosure.ts:152-153`, added in plugin-kit `4d5b195`). Locally,
`absent-check` refuses the run outright (`Makefile`, `absent-check` target). The residual gap is
that `measure-disclosure`'s observation lands in `results.json` rather than an envelope, so a
consumer looking for `provenance.installState` will not find it — and `make composition` has no
gate at all.

**F6 — Losing an earlier run to a reused results directory. Two distinct mechanisms, and only
one of them is a splice.**
*Signature (destructive, and the one that applies to the operations):* an earlier
`measure-disclosure` measurement is simply absent. It writes `results.json` straight into
`--results-dir` with no timestamped subdirectory
(`PK/shared/operations/measure-disclosure.ts:348`), unlike `optimize-description`
(`:1044`) and `optimize-disclosure` (`:1504`), which mint their own. `Bun.write` truncates, so
the second run replaces the first outright and leaves no partial record to notice by.
*Signature (corruptive, driver only):* a results file whose tail describes a different run — an
older run id, a scenario the current set does not contain, a trailing fragment that does not
parse. This needs a `BunFile` passed as spawn stdout, which happens at
`PK/evals/drivers/run-measurement.ts:98-104` and **nowhere in `PK/shared/`**: measured on Bun
1.3.14, `Bun.write` and shell `tee` both truncate, only `Bun.file().writer()` does not, and a
grep of `PK/shared/` for `.writer()`, `FileSink`, `createWriteStream` and `appendFile` excluding
tests returns nothing.
*Two further reasons for the same fresh-directory rule, both verified:* results written inside
the skill directory become bundled files the next disclosure run measures as part of the
artifact; and `optimize-disclosure`'s `--apply` defaults to `<results-dir>/best-layout` and
`rm -rf`s that path before copying (`PK/shared/operations/optimize-disclosure.ts:1509-1511`), so
a results directory inside the skill is actively destructive rather than merely self-polluting.

**F7 — A truncating turn ceiling that drops the deepest engagements.**
*Signature:* unparseable output rises, and the unparseable attempts are systematically longer
and read more references than the ones that survived. At `--max-turns 10`, 5 of 15 attempts
were lost at 143 seconds and 3.0 references each, against 78 seconds and 1.3 for the rest;
"A ceiling that drops your best runs from the sample biases every number computed over the
survivors, and it had been silently doing so since the disclosed arm was written"
(`evals/composition/README.md:254-261`). The default is now 24
(`evals/composition/composition-runner.ts:105`). Carry the corollary into real use: "an agent
following this skill properly takes around 140 seconds and three reference reads. A host on a
tight turn budget will cut it off, and the skill has no way to know that happened"
(`evals/composition/README.md:263-265`).

**F8 — A scored ruler change credited to the artifact.**
*Signature:* a metric moves while the artifact does not. Three measurement bugs moved recall
from 73% to 100% and precision from 50% to 86% with no skill content change: recall
double-counted an abstention as a reference miss, the harness withheld `Bash(bun:*)` that the
skill instructs so the documented fallback scored as waste, and an `allow_refs` reclassification
moved a goalpost — reported as both 86% lenient and 57% strict for that reason
(`evals/composition/README.md:198-222`). Before crediting a delta to the artifact, diff the
harness.

**F9 — A quarantined or absent rule set scoring 1.00.**
*Signature:* a perfect deterministic score with no findings of any kind. `checks.ts` holds zero
rules; `checkCall` returns an empty array and every input scores 1.00, "including a call with a
defect under every rule below" (`evals/composition/LINT-RULES-PENDING.md:26-29`).
`checks.test.ts` "Asserts nothing while `ACTIVE_RULE_COUNT === 0`" (`:16`), so a green
`make checks` (`Makefile`, `checks` target) is not evidence — and `make all` runs `checks` first
(`Makefile`, `all` target), which makes it look like a gate.

**F13 — A wrong recorded decision, which licenses removing a correct guard.**
*Signature:* a guard is absent, and a comment or note in the tree explains *why it is correctly
absent*. The explanation is wrong, but it is durable, committed, and reads as considered — so the
next person to look does not re-derive the question, and anyone who adds the guard later finds a
written justification for taking it out again.

*The instance.* `composition` was excluded from the install-state gate on the recorded grounds that
it "injects skill content rather than routing to it." That is true of the `skill` arm and **false of
the `disclosed` arm**, which the same target also runs: that arm points `cwd` at the skill directory
and counts `Read` calls against reference paths (`evals/composition/composition-runner.ts:159-162`),
spawning with no `--setting-sources` and no `--strict-mcp-config`. So a machine-visible copy floored
`refsRead`, recall, precision and `refCounts` together, and the arm would report that progressive
disclosure does not work when what failed was the measurement. Closed in `c6f85ef` — **and the
comment was corrected in the same commit**, which is the part that matters. The Makefile now records
that `composition` "USED TO BE ON THAT LIST" and why the injection argument never covered that arm
(`Makefile`, comment above `absent-check`).

*Why this is not F11.* A relayed premise is ephemeral and dies with the conversation. A recorded
decision is an artifact: it outlives its author, it is the first thing a maintainer reads, and it
converts a gap into a *policy*. **Fixing the code without fixing the comment leaves the fault
intact** — the next person has a documented reason to undo the fix.

*The check:* when you add a guard where one was deliberately absent, find the note explaining the
absence and correct it in the same commit. If you cannot find one, write it. And when you read a
comment justifying the lack of a check, treat it as a claim to verify rather than a decision already
made — Section 0 rule C applies to your own repository's comments, not only to briefs.

**F12 — A sentinel value passing a validity test too weak to exclude it.**
*Signature:* a guard that reads as correct, over an input domain that contains a value the guard's
own predicate accepts and the downstream call reinterprets. It is a distinct class from everything
else here: F0-F10 are checks that reported clean while the state was wrong, and this is a check
that was *satisfied* by exactly the value it existed to reject.

*The instance, verified in source rather than relayed.*
`PK/shared/report/generate-review.ts` reclaims a port by signalling whatever `lsof -ti :<port>`
returns. `lsof` returning `0` would have reached `process.kill(0, "SIGTERM")` — which signals
**every process in the caller's own process group**, not one process — because `Number.isInteger(0)`
is true and nothing else rejected it. Both defects are now fixed, and the guard carries the
reasoning at the site: "`pid > 0` is load-bearing rather than defensive: `process.kill(0, ...)`
signals every process in the caller's own process group, and `Number.isInteger(0)` is true"
(`PK/shared/report/generate-review.ts:712-713`, filter at `:714`). The companion defect — signalling
any PID whatever the process was — is now a two-condition match requiring both a `/^bunx?[\d.]*$/`
runtime basename and an argv token that is or ends in `/generate-review.ts`
(`:688`, `:676`, `:729-737`), and it "is deliberately unwilling to guess. Anything it cannot
positively identify is reported as foreign and left running... The reverse mistake terminates
somebody's database" (`:722-727`).

*The check, generalised:* for any validity predicate, ask what the *most destructive* value in the
input domain is, then check whether the predicate admits it. `Number.isInteger` admits `0`;
`typeof x === "string"` admits `""`; a non-null check admits `NaN`. A type test is not a range
test, and the damage lives in the range.

**F11 — A relayed premise, generalised past its scope, acted on as settled.**
*Signature:* a confident instruction to change an artifact, resting on a claim whose code path,
runtime version or scope is not stated. It is the only fault here that produces no number at all
— which is why it is the most expensive: the other ten waste an iteration, this one directs the
iteration at the wrong thing. **Five of the five faults above were originally described to the
agent writing this file in terms that were wrong in at least one respect**, and every correction
came from reading source. Two claims were wrong outright, one was true of a single file and
generalised to a repository, one was true and went stale within the hour, and one was inferred
from help text instead of measured. *The check:* before acting on a premise, ask which file it was
measured against, on which version, and what it is claimed to cover. If any of the three is
missing, treat it as a hypothesis and go to the source — including when it arrives from a
coordinating agent with every appearance of authority. See Section 0 rule C.

**F10 — A fix-list item sourced from a quarantined rule.**
*Signature:* a lint error count cited as a defect, for a rule id that no longer exists in the
active rule set. The 32 inherited rules were quarantined because "Left wired up, those rules
would grade a skill they were never derived from, and the score they produced would look like a
measurement" (`evals/composition/LINT-RULES-PENDING.md:8-9`); the decision is recorded at
`docs/sessions/SESSION-2026-08-23_01-ask-user-question-fresh-build.md` Event 06.
`recommend.multiple` now lives only in `evals/composition/checks.quarantined.ts:223`, which
nothing imports (`evals/composition/LINT-RULES-PENDING.md:13`). A count from it is not a finding about the fresh
skill.
