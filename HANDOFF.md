# Cold-start prompt — ask-user-question, and the disclosure investigation

**This is your brief. Work from it.** You are picking up a long session that started as
"finish a skill" and turned into "the tool measuring the skill was measuring the wrong
thing." Both halves are live.

**Do §0 before you answer.** Do not reply with a plan, a summary of this brief, or a
question about what to do first until you have run the initialisation and read at least
the first two notes it names. A plan written from this brief alone will be wrong in ways
you cannot see from here — several findings are compressed to a sentence and mislead at
that resolution, §8 and §9 especially.

When §0 is done, say briefly what you found in the notes that this brief does not carry,
then propose the next step from §12. If anything in the repos contradicts this brief, the
repos and the notes win — say so rather than reconciling silently.

Work in `/Users/peter.kloss/Dev/ACMElabs/ask-user-question`. Much of the outstanding work
lands in `plugin-kit`.

## 0. First — rehydrate. This brief is not sufficient on its own.

**Do this before any work, including anything that looks like a one-liner.** This brief
is a summary; the notes below are the record. Several findings here are compressed to a
sentence and will mislead you at that resolution — §8 and §9 especially.

**Blocking initialisation**, in this order:

```text
1. Skill(skill="brain:memory")
2. mcp__plugin_brain_brain__bootstrap_context   project: "ask-user-question"
3. git -C /Users/peter.kloss/Dev/ACMElabs/ask-user-question branch --show-current
4. git -C /Users/peter.kloss/Dev/ACMElabs/plugin-kit branch --show-current   # expect restructure-shared-layer
```

**Required reading, by exact Brain identifier.** Both projects are active; pass `project`
explicitly on every call or you will read the wrong graph.

| Order | `mcp__plugin_brain_brain__read_note` identifier | project | Why |
| --- | --- | --- | --- |
| 1 | `sessions/session-2026-08-23-01-ask-user-question-fresh-build` | `ask-user-question` | **80 events**, every decision and correction in order. Events 57-80 are the disclosure investigation. This is the primary record. |
| 2 | `analysis/analysis-004-what-makes-a-bundled-reference-get-read` | `plugin-kit` | The research. Our measurements, published work, and open questions kept separable. Read before touching any authoring guidance. |
| 3 | `analysis/analysis-003-measurement-fault-classes` | `plugin-kit` | Sixteen ways this harness returns a confidently wrong number. ANALYSIS-004 is its sequel. |
| 4 | `sessions/session-2026-08-23-01-plugin-kit-measurement-tooling-hardening` | `plugin-kit` | The same 2026-08-24 work from the tool's side, with every commit sha. |

The session note is ~90KB. `read_note` will persist it to a local file and hand you the
path — that file is ordinary scratch, so `grep` it freely rather than pulling it whole
into context. Reading only its final events is a reasonable start; reading only this
brief is not.

**Then, before writing anything:** the auto-memories under `~/.claude/memory/` are
tier-1 and blocking, `~/KNOWLEDGE-GRAPH-CONVENTIONS.md` is auto-imported, and
`~/KNOWLEDGE-GRAPH-STRUCTURES.md` plus `~/NOTE-TEMPLATES.md` load on demand when
authoring a note of a given type.

**If you read nothing else here, read §8.** Every disclosure number produced before
2026-08-24 was measured through a broken instrument, and the corrected number is a
different *kind* of number. A reader who takes "all six references keep" at face value
will draw the wrong conclusion from it.

## 1. The goal

Two goals now, and they are entangled.

**The artifact.** A Claude Code plugin, `ask-user-question`, whose single skill teaches
an agent to compose an `AskUserQuestion` call — the question text, the options, the
recommendation, the layout, and how to read the reply. The owner's standing requirement
is **no gaps in triggering**: it should fire in every scenario where it should.

**The instrument.** Measuring whether that skill's progressive disclosure works exposed
four defects in plugin-kit's disclosure harness and one in Claude Code. Those are fixed.
What is not finished is the consequence: the number the harness reports is still the
wrong number to look at, and plugin-kit's authoring guidance still contains a rule this
project invented and then measured to underperform.

## 2. Paths, tools, and the binary rule

| Thing | Path |
| --- | --- |
| This plugin | `/Users/peter.kloss/Dev/ACMElabs/ask-user-question` |
| The skill | `skills/ask-user-question/` |
| plugin-kit | `/Users/peter.kloss/Dev/ACMElabs/plugin-kit` |
| Marketplace | `/Users/peter.kloss/Dev/ACMElabs/.claude-plugin/marketplace.json` |
| Results | `~/auq-results/` |

**Binary tool rule.** Files under `docs/**` are Brain notes: use `mcp__plugin_brain_brain__*`
only — never Read/Edit/Write/Grep/Glob. Everything else uses ordinary file tools and never
Brain MCP. Brain projects **`ask-user-question`** and **`plugin-kit`** are both active and
map to their repos.

**Three Brain traps that will bite.** A `[[wikilink]]` in a prose bullet is parsed as a
typed relation and the write is rejected — wikilinks belong only in `## Relations`.
`edit_note` with `append` lands *after* `## Relations`, breaking the invariant that a note
ends `## Observations` then `## Relations`; use `insert_before_section` on `## Observations`.
And **`edit_note` responses report unreliable counts** — observation totals doubling and
halving between calls. Verify by re-reading the note, and set `expected_replacements: 1`
on every `find_replace` so a miss fails loudly.

**Cross-project wikilinks do not resolve.** Name the other project's notes as plain text.

## 3. Use plugin-kit properly

Load its skills formally rather than reading the files: `Skill(skill="plugin-kit:skill-creator")`,
`Skill(skill="plugin-kit:plugin-creator")`. Its agents are dispatchable: `plugin-kit:skill-reviewer`,
`plugin-kit:plugin-reviewer`.

Its references, and which question each answers:

| File | Read it when |
| --- | --- |
| `progressive-disclosure.md` | Placing any bundled file — **and see §9, parts of this are now known wrong** |
| `disclosure-optimization.md` | Reading a disclosure report |
| `description-writing.md` / `description-optimization.md` | Any description work |
| `running-detached.md` | Before any long run |
| `portability.md` / `skill-frontmatter.md` | Any frontmatter decision |
| `plugin-skills.md` / `distribution-targets.md` | Layout, manifest, where it can run |
| `grader.md`, `benchmark-notes.md`, `eval-evidence.md`, `schemas.md` | Running and recording evals |

## 4. Working rules, learned the hard way

**The failure mode is not reasoning, it is citing.** Nine times this session a ruling was
sound as argument and wrong in its stated evidence. **Any sentence of the form "X was
measured as Y" is worth thirty seconds of opening X.** Three of those nine were claims
relayed from a research agent without checking the source — see §9's count-cap story,
where the number was real, the citation was real, and the *definition* was something else
entirely. **A number in authoring advice needs its definition checked, not just its citation.**

**A measurement is not evidence the thing measured exists in the artifact.** Verify agent
reports against the artifact, not the report.

**When you find a stale claim, sweep for its copies.** One false claim had three homes.

**Size an experiment before running it, and never report an underpowered null.** A first
placement A/B at n=8 per arm returned 2/8 against 2/8; the noise was the size of any
effect that design could see. Re-run at n=40 it read 8/40 against 4/40, p≈0.20.

**Bound concurrency on anything that spawns `claude`.** `Promise.all` over 80 tasks spawns
80 processes; 48 concurrent takes CPU idle to 0.6% and slows every run about fivefold.
20 is the measured-good figure on this box.

**Probes should be fast.** Concurrent, on sonnet, one-line prompt, and killed the moment
the answer arrives. That took probe work from ten minutes to 4.8 seconds.

**Multi-edit scripts need a sweep, not an exit code.** A script that asserts partway
through leaves earlier successful edits unwritten. This happened twice.

**Subagents go idle holding finished work.** The cause was identified: they write reports
to plain output instead of `SendMessage`. **Tell every dispatched agent to report via
`SendMessage` to `main`, incrementally.** Verify their claims against the artifact.

**Ask questions using the skill's own standards.** One decision at a time; a recommendation
with the fact behind it; options stating costs; the question self-contained.

## 5. The owner's rulings — settled, do not reopen

- **Glyph set**, one per job: `•` top-level, `◦` nested, `➊`–`➓` numbered, `✔` passed, `✗` failed, `⚠` trap, `❯` under discussion, `➞` leads-to, `·` inline separator. **Font coverage is waived.** Width still matters in aligned columns.
- **Status glyphs replace the marker** where every item in a group carries one; a mixed group keeps `•`.
- **Retire the composition runner** for plugin-kit's `measure-outcomes`, keeping the 27 lint rules.
- **The gate matches plugin-kit's severity** — warn at 5,000 tokens, fail at 5,800, tiktoken cl100k, body only.
- **Include all necessary context in a question**, even when long. The word ceiling governs the decision sentence, not the field.
- **Every filename and heading in plain words.**
- **Fix plugin-kit where it needs fixing.**
- **plugin-kit is Claude-first.** Cross-vendor findings are evidence and technique; where anything conflicts, the Claude standard wins.
- **Do not prune what the model cannot reach — work out how to reach it.** This reframed the whole disclosure objective (§8).
- **The body token limit stays enforced.** It is the point of progressive disclosure.

## 6. What the skill is now

```
skills/ask-user-question/
  SKILL.md              456 lines · 5,795 tiktoken tokens (cl100k, body only)
  examples.md           four specimens
  references/layout.md            thirteen rules + the glyph table
  references/wording.md           ASD-STE100, before/after per rule
  references/failed-question.md   seven repair modes + diagnosis table
  references/reading-answers.md   reply shapes + recognition table
  references/asking-again.md      the multi-call run
```

**Frontmatter is five standard fields.** `allowed-tools` was **removed** (`1f83f92`) — see §8.
`evals/frontmatter.test.ts` fails on any non-spec field.

**The description is frozen** at 1002 characters, one physical line, sha `107a6cea`.
A wrap silently truncates it in the tooling.

**The body is at its ceiling** — 5,795 of 5,800 tokens, 456 of 500 lines. Additions go in
references. Version is `0.1.0`; a bump touches `plugin.json`, the skill's `metadata.version`,
and `marketplace.json` — `evals/frontmatter.test.ts` binds the first two.

## 7. What has been measured

| | |
| --- | --- |
| Trigger | 49 / 52 queries, recall 95.5%, false triggers 6.7%, ±2 queries of noise |
| Gap tests | 15 of 15 rows fired, 45 of 45 attempts |
| Disclosure | see §8 — the headline number changed twice |
| Outcomes | never run. `measure-outcomes` was broken until `34e68c7` |
| Lint | 27 rules, each citing its `SKILL.md` line |

**Four trigger collisions** exist against installed neighbours (`pptx`, `pdf`, `capture`,
`docx`), each flagged for universal-quantifier phrasing in the *neighbour's* description.
Not fixable here.

## 8. The disclosure investigation — read this before trusting any number

### What was broken, and is now fixed

**In Claude Code, not plugin-kit.** The `Skill` tool's permission ladder falls through to
`behavior: "ask"` whose message is the literal string `Execute skill: <name>` — a *permission
prompt label*, not an error. The binary's own SDK schema doc states that in bare `-p` an ask
is terminal. So the skill **never loaded**. Measured 0 of 4 without a grant, 4 of 4 with
`--allowedTools Skill`, and only granted runs carry the real success payload `Launching skill:`.

The trigger was **our own frontmatter**: a skill declaring `allowed-tools` can never take the
auto-allow branch, because the resolved-record allowlist in the binary does not contain that
key. GitHub issue [#77363](https://github.com/anthropics/skills/issues/77363) reports the same
thing, open, no maintainer response. Fixed both ways — the harness grants the tool (`34e68c7`),
and the skill dropped the field (`1f83f92`).

**It looked like a 30% flake and was 100%.** A strong model reads SKILL.md itself after the
refusal; opus fell back 3 of 4, sonnet 0 of 4. So the failure's visibility depended on which
model was under test.

**Four plugin-kit defects, all fixed with regression tests** — see the plugin-kit session note
for detail: symlink path comparison (`4710db8`), load recorded on request not result
(`02248f3`), report written but never advertised (`e70b881`), and pull rates and pass rates
disagreeing about what a valid run is (`e0be400`, narrowed by `792e17c`).

### The finding that matters most

**Raw pull rate is the wrong number.** It cannot separate *rarely needed* from *needed and
missed*. `wording.md` reads as 5.6% raw and is **37.5% recall** — the rest of the denominator
was scenarios correctly not needing it.

With ground truth applied to both sweeps:

| reference | sonnet recall | opus recall |
| --- | --- | --- |
| references/layout.md | 90% | 100% |
| references/asking-again.md | 75% | 100% |
| references/reading-answers.md | 60% | 100% |
| examples.md | 50% | 100% |
| references/wording.md | 37.5% | 75% |
| references/failed-question.md | 33% | 100% |
| **negatives** (should reach nothing) | **0/8 false pulls** | **3/8 false pulls** |

**The models fail in opposite directions.** Opus has near-perfect recall and over-fetches
37.5% of the time. Sonnet never over-fetches and misses a third to two-thirds. **A skill tuned
only on opus cannot be shown to have working disclosure** — opus papers over every routing
defect by reading eagerly. Measure on sonnet; it is also 1.7× cheaper.

### Ground truth is derivable, not a judgement call

A scenario needs reference X if reading X **improves its assertion score**. Measured: runs that
read `wording.md` passed **86.7%** of assertions, runs that did not passed **51.4%**. That
validated the hand annotation and retires it as a bottleneck.

The hand-written mapping is in the session ledger (Event 77 area) and in `evals/` nowhere yet —
**the `expects_references` field exists in the schema (`8d79a13`) and no corpus declares it.**

### What was tried and refuted

- **Pointer placement.** Moving `wording.md`'s pointer from a trailing section into the workflow
  step where its condition fires **halved** its reach: 8/40 → 4/40, p≈0.20. No detectable effect,
  trending against. **Do not write this into guidance.** `layout.md`'s 90% recall remains
  unexplained; mention count and topic centrality are both still live and untested.

## 9. What plugin-kit's guidance now gets wrong

`ANALYSIS-004: What Makes a Bundled Reference Get Read` in the **plugin-kit** Brain project is
the durable home for this. Two things in the shipped guidance are wrong:

**The pointer rule is invented.** "Name the file, the condition that fires it, and the cost of
skipping" has **no published basis anywhere, including at Anthropic**, whose own two canonical
examples do not follow it and contradict each other. Our four textbook pointers built on it are
the ones failing.

**The reference-count cap does not exist.** A claim that skills should carry ≤3 references was
relayed into a guidance draft as measured. The source counts **whole skills attached to a task**,
not reference files; "module" is never defined in the paper. Anthropic explicitly calls bundled
resources **"unlimited"** and ships a 66-reference skill; 13 of their 20 exceed three. Across 398
installed skills, p90 is 10 bundled files.

**What is defensible instead: depth, not count.** Every reference linked directly from SKILL.md.
Anthropic states this as a mechanism — a nested reference gets previewed with `head -100` and
yields incomplete information — and it matches an independent measurement of accuracy collapsing
0.91 → 0.64 with a second level. Fan-out unbounded, depth bounded at one.

**What else has real measurement behind it**: an explicit ordered workflow instruction beat
conditional availability (invocation 44%→95%, pass 53%→79%); tool necessity is decodable from
hidden states at 0.89-0.96 AUROC while models still fail to act, implying pointer *wording*
optimises the wrong stage; and every other vendor — Cursor, Windsurf, Copilot, Continue, Cline,
Gemini CLI — moved deferred context to **harness auto-attachment**. A Claude Code skill reference
is the only case left where the read depends on the model choosing to read. Claude Code already
does deterministic attachment for `CLAUDE.md` `@path` imports; skill references simply are not
wired to it.

## 10. Rejected, with reasons — do not re-propose

- **Adopting the description loop's winner.** Deleted the five named exclusions; a different skill's query then fired 3/3 on held-out.
- **Moving the pre-flight checklist behind a pointer.** Doctrine names the validation loop as one of two things that stay in the body regardless of size.
- **Cutting the Gotchas to reach 5,000 tokens.** They are a quarter of the body because a source audit found fifteen traps.
- **Deleting the references.** Refuted twice — first the evidence was a void measurement, then the corrected sweep put every file at 20-54% raw and 33-100% recall.
- **Decoupling grading from the run pool.** Predicted 15-20%, measured **MINUS 12%**; the limiter doubled peak concurrency into the thrashing zone.
- **`--bare` for scenario runs.** 0 of 3 loaded; it strips the skill system.
- **Sonnet for the disclosure *measurement of record*.** Rejected on argument, then partly rehabilitated: sonnet is right for measuring *recall* (§8), wrong for absolute rates a user of opus would see.
- **A reference-count cap.** §9.

## 11. In flight

Nothing. No background runs, no agents. Both repos clean.

## 12. Queued, in order

1. **The ablation, stage 1.** Remove *all* references, run 27 scenarios twice on sonnet — about 54 runs, ~10 minutes. Every scenario whose score drops needs something; every scenario unchanged needs nothing, which validates the four negatives without anyone's judgement. **Stage 2** ablates individual files only for scenarios that dropped, against only their plausible candidates — about 22 minutes total against 324 for the full grid. This produces the ground-truth map and retires the hand annotation.
2. **Populate `expects_references`** in `evals/composition/disclosure-evals.json` from the ablation, then teach `optimize-disclosure` to report recall alongside pull rate. The schema field exists and nothing reads it.
3. **Update plugin-kit's authoring guidance** per §9 — strike the invented pointer rule, strike the count cap, write the depth principle, and label every remaining rule with what backs it. This is the deliverable the research was for.
4. **`optimize-disclosure`** — only meaningful once recall is the reported number. Note it proposes edits against a body already at its ceiling.
5. **`measure-outcomes`** — never run, and was broken until `34e68c7`. The sharpest open question: does the skill actually help? An accidental control arm suggested ~28 points.
6. **Comment on [#77363](https://github.com/anthropics/skills/issues/77363)** — open, zero comments, our exact trigger. The framing nobody has stated: the documented permission flow terminates in an error naming neither permission nor denial.
7. **Push plugin-kit.** 16 commits on `restructure-shared-layer`, unpushed, **not on `main`**. This has been the standing risk all session.
8. **Uninstall plugin-kit** last — item 3 needs its reviewer agents.

**Also open, unscheduled:** every keep-or-prune verdict plugin-kit has ever issued on a raw pull
rate should be re-derived. The collector fixes corrected *which reads were counted*, never *what
they were divided by*. ANALYSIS-003 Finding 11 records exactly such verdicts.

## 13. Commands

```bash
make checks          # 27 lint rules
make typecheck       # tsc --noEmit over evals/
bun evals/frontmatter.test.ts
bun /Users/peter.kloss/Dev/ACMElabs/plugin-kit/shared/validate/validate.ts \
    --target-type skill "$PWD/skills/ask-user-question" --extended --with-environment

# a disclosure sweep — workers now default to 2x cores, capped at 24
cd /Users/peter.kloss/Dev/ACMElabs/plugin-kit && bun shared/operations/measure-disclosure.ts \
  --skill-path /Users/peter.kloss/Dev/ACMElabs/ask-user-question/skills/ask-user-question \
  --scenarios /Users/peter.kloss/Dev/ACMElabs/ask-user-question/evals/composition/disclosure-evals.json \
  --model sonnet --permission-mode acceptEdits --runs-per-scenario 2 \
  --results-dir ~/auq-results/<name>
```

Commit on `main` by **explicit pathspec** — several agents share this tree and a bare
`git add .` sweeps their work. **Do not push.** No AI attribution in commit messages.

## 14. The full note inventory

§0 lists the four notes that are required reading. These are the rest, worth knowing
exist so you do not re-derive what is already written down. All via Brain MCP with an
explicit `project`.

**In `ask-user-question`:**

| Identifier | What it holds |
| --- | --- |
| `analysis/analysis-001-plugin-kit-authoring-standards-for-the-ask-user-question-plugin` | plugin-kit's authoring standards as they applied here, cited `path:line` |
| `analysis/analysis-002-evidence-rules-from-measured-failures` | Evidence rules, each derived from a specific failure rather than from theory |
| `analysis/analysis-003-coverage-check-against-the-retired-asking-users-questions-skill` | The 11 real gaps found against the retired skill |
| `analysis/analysis-004-askuserquestion-tool-capability-audit-at-build-2-1-241` | **Tool behaviour read from the shipped binary** — per-field rendering, the `(notes only)` sentinel, preview geometry, what `Chat about this` returns. Load before any claim about what the tool does |
| `analysis/analysis-005-monospace-decision-dialog-layout-rules` | Thirteen layout rules with confidence classes |
| `analysis/analysis-006-surface-portability-of-the-ask-user-question-skill-s-claims` | Which of the skill's flat assertions hold on every surface |

Note the collision: **`ANALYSIS-004` exists in both projects and they are different notes.**
In `ask-user-question` it is the tool-capability audit; in `plugin-kit` it is the reference
research. Always pass `project`.

**In `plugin-kit`:** `analysis/analysis-001-python-to-bun-port-fidelity`,
`analysis/analysis-002-inert-parameter-and-flag-survey`, plus the two named in §0.

**Session notes** are the temporal record and the two in §0 are the only live ones. The
ask-user-question ledger is a pointer ledger: inline `[[wikilinks]]`, `file.ts:line`, and
commit shas, not prose summaries. If a fact appears both here and there, **the ledger wins** —
this brief is a summary and summaries drift.

Keep the ledger current — one event per state change, committed in the same turn.
