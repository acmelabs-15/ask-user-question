# Cold-start prompt — ask-user-question build

Paste this whole file into a fresh conversation. Written to be read cold, by someone with no history here.

---

## 1. The goal

Build a Claude Code plugin, `ask-user-question`, at `/Users/peter.kloss/Dev/ACMElabs/ask-user-question`. Its single skill teaches an agent to compose an `AskUserQuestion` call — the question text, the options, the recommendation, the layout, and how to read the reply.

It **replaces** `/Users/peter.kloss/Dev/ACMElabs/asking-users-questions`, which is retired and awaiting deletion. **Nothing was ported.** The old plugin was used once as a coverage reference and is not a content source. Do not copy from it.

The owner's standing requirement: **no gaps in triggering.** The skill should fire in every scenario where it should fire.

## 2. Paths, tools, and the binary rule

| Thing | Path |
|---|---|
| This plugin | `/Users/peter.kloss/Dev/ACMElabs/ask-user-question` |
| The skill | `skills/ask-user-question/` |
| plugin-kit (authoring toolkit) | `/Users/peter.kloss/Dev/ACMElabs/plugin-kit` |
| Retired plugin | `/Users/peter.kloss/Dev/ACMElabs/asking-users-questions` |
| Marketplace | `/Users/peter.kloss/Dev/ACMElabs/.claude-plugin/marketplace.json` |
| Results | `~/auq-results/` |

**Binary tool rule.** Files under `docs/**` are Brain notes: use `mcp__plugin_brain_brain__*` only — never Read/Edit/Write/Grep/Glob. Everything else uses ordinary file tools and never Brain MCP. Brain project **`ask-user-question`** is active and maps to this repo.

**Two Brain traps that will bite.** A `[[wikilink]]` in a prose bullet is parsed as a typed relation and the write is rejected — wikilinks belong only in `## Relations` with a valid verb. And `edit_note` with `append` lands *after* `## Relations`, breaking the invariant that a note ends `## Observations` then `## Relations`; use `insert_before_section` on `## Observations` instead.

**Session working directory.** `~/Downloads/ask-user-question` is a symlink to the repo (created mid-session to fix a genuine divergence). The pre-symlink copy is preserved at `~/Downloads/ask-user-question.pre-repo-backup-20260823` and holds the previous generation of the skill. Never read it.

## 3. Use plugin-kit properly

Load its skills formally rather than reading the files: `Skill(skill="plugin-kit:skill-creator")`, `Skill(skill="plugin-kit:plugin-creator")`. Its agents are dispatchable: `plugin-kit:skill-reviewer`, `plugin-kit:plugin-reviewer`.

Its references, and which question each answers:

| File | Read it when |
|---|---|
| `progressive-disclosure.md` | Placing any bundled file, or the body nears its size limits |
| `disclosure-optimization.md` | Reading a disclosure report — `prune` vs `signpost` need opposite fixes |
| `description-writing.md` | Before writing or defending any description |
| `description-optimization.md` | Before generating trigger queries |
| `running-detached.md` | Before launching any long run |
| `portability.md` / `skill-frontmatter.md` | Any frontmatter decision |
| `plugin-skills.md` | Plugin layout and manifest |
| `distribution-targets.md` | Where the artifact can actually run |
| `grader.md`, `benchmark-notes.md`, `eval-evidence.md`, `schemas.md` | Running and recording evals |

**Two doctrine points that decided real arguments here.** Gotchas and the validation loop belong in the body *regardless of size* — a trap behind a pointer arrives after the mistake. And a pointer must carry a firing condition and the cost of skipping, not just a path; a bare path is the documented cause of an unread reference.

## 4. Working rules, learned the hard way

**The failure mode is not reasoning, it is citing.** Six times in one session a ruling was sound as an argument and wrong in its stated evidence — a token divisor, a Unicode width class, which file held some isolation flags, a header convention, a permission theory, a payload size. An argument gets tested by argument. A citation only gets tested when someone opens the thing. **Any sentence of the form "X was measured as Y" is worth thirty seconds of opening X.**

**A measurement is not evidence the thing measured exists in the artifact.** An agent measured two edits, reported the figures confidently, and never staged them.

**Verify agent reports against the artifact, not the report.** Several were wrong in ways only a direct check caught.

**When you find a stale claim, sweep for its copies.** One false claim had three homes, all drifted independently. The durable fix is to state a number in no prose at all and point at whatever computes it.

**Subagents idle constantly** — going idle without starting work, and without reporting finished work. Nudge with a compact restatement; check git and the filesystem rather than trusting silence; ask them to confirm they have started. **Never make a release conditional on something they cannot observe.** Also: the owner sometimes interrupts an agent so it picks up a pending message, which is expected rather than a fault.

**Ask questions using the skill's own standards.** The owner has corrected this repeatedly. One decision at a time; a recommendation with the fact behind it; options that state costs rather than only upside; the question self-contained, because the dialog covers the conversation and anything outside it is invisible. Keep the question inside its length budget and put structure in `preview` — the only field that renders markdown.

## 5. The owner's rulings — settled, do not reopen

- **Glyph set**, one per job: `•` top-level marker, `◦` nested, `➊`–`➓` numbered items, `✔` passed, `✗` failed, `⚠` trap, `❯` item under discussion, `➞` leads-to, `·` inline separator only. **Font coverage is explicitly waived** — do not caveat on it. Width still matters, because mixing width classes in an aligned column breaks it.
- **Status glyphs replace the marker** where every item in a group carries one, evaluated per group; a mixed group keeps `•`; nested keeps `◦`.
- **Retire the composition runner** in favour of plugin-kit's `measure-outcomes`, keeping the 27 lint rules as a standalone check.
- **The gate matches plugin-kit's severity** — warn at 5,000 tokens, fail at 5,800, measured with tiktoken.
- **Include all necessary context in a question**, even when long. Brevity is what you spend the remaining room on. The word ceiling governs the decision sentence, not the field.
- **Every filename and heading in plain words.** `register.md` became `wording.md`, `across-a-run.md` became `asking-again.md`, because a filename is a pointer's first word.
- **Fix plugin-kit** where it needs fixing — authorised late in the session, after earlier caution.

## 6. What the skill is now

```
skills/ask-user-question/
  SKILL.md              456 lines · 5,795 tiktoken tokens
  examples.md           four specimens
  references/layout.md            thirteen rules + the glyph table
  references/wording.md           ASD-STE100, with before/after per rule
  references/failed-question.md   seven repair modes + diagnosis table
  references/reading-answers.md   reply shapes + recognition table
  references/asking-again.md      the multi-call run
```

**Frontmatter is exactly the six standard fields** — `name`, `description`, `license`, `compatibility`, `allowed-tools`, `metadata`. `evals/frontmatter.test.ts` fails on any extension. `allowed-tools` is space-separated for portability, which is correct per plugin-kit's own reference.

**The description is frozen** at 1002 of 1024 characters, one physical line (a wrap silently truncates it in the tooling), sha `107a6cea…`. Do not edit without re-measuring.

**The body is at its ceiling** — 5,795 of 5,800 tokens, 456 of 500 lines. Further additions go in references. If something genuinely belongs in the body, the honest options are a restructure or a considered raise with an argument, not a squeeze.

The four specimens: a simple call; a preview call; a long-context call; and a before-and-after repair of a call that genuinely failed in front of the owner. The last one is the most instructive — its diagnosis is that eleven findings were put in the option slots when they were context, and the live decision was never asked.

## 7. What has been measured

| | |
|---|---|
| Trigger | **49 / 52** queries, recall 95.5%, false triggers 6.7%, ±2 queries of run-to-run noise |
| Gap tests | 15 of 15 rows fired, 45 of 45 attempts, six groups |
| Disclosure | **void** — see §8 |
| Outcomes | never run |
| Lint | 27 rules, each citing its `SKILL.md` line, probe fails at 0.00 as designed |

The ±2 noise figure is real and was measured by scoring identical bytes twice — 45/52 and 47/52. Quote attempt-level recall rather than pass counts when comparing.

**Four trigger collisions** exist against installed neighbours (`pptx`, `pdf`, `capture`, `docx`), each flagged for universal-quantifier phrasing in the *neighbour's* description. plugin-kit's own measurement says rewriting ours does not recover them. Not fixable here.

## 8. The instrument bug — read before trusting any disclosure number

**plugin-kit's disclosure collector cannot see reads on macOS.**

`shared/operations/disclosure.ts`, `createRunCollector`, line 1287 and 1297-1302. The skill directory comes from `os.tmpdir()` and is normalised with `resolve()`, which does not canonicalise symlinks. `/var` is a symlink to `private/var`, so the collector holds `/var/…` while the model uses `/private/var/…`, and every genuine in-skill read is classified outside.

**Consequence: every bundled file reports zero pulls and a verdict of `prune`, and `optimize-disclosure`'s entire candidate set becomes deletion proposals. The pass-rate guardrail does not catch it, because the content still reaches the model.**

**A second defect compounds it.** `skillLoaded` (lines 1310-1314) is set on seeing the *request* and never checks the result. One probe called the skill twice, both errored, the model improvised the entire answer with nothing from the body or references in its reply — and that run would record as loaded.

**Workaround:** `TMPDIR=$HOME/auq-tmp`. Not `/tmp`, which is itself symlinked.

Finding this took five dead hypotheses — prune the references, broken instrument, unresolvable pointers, denied reads, pointer-form difference. What forced the reopening was transcripts reproducing text present only in a reference and absent from the body, across all six files and 28 of 54 runs, including a phrase committed minutes before the sweep.

**A fix is authorised**: branch, plugin-kit's own tests before and after, minimal and legible, then re-measure with `TMPDIR` back to default and confirm the patch and the workaround agree. An upstream write-up is drafted in the ledger — both defects with file, line, reproduction, blast radius, workaround, and the sentence that makes it matter: *a measurement that cannot detect the thing it measures returns a confident answer, and its guardrail confirms it.*

## 9. Rejected, with reasons — do not re-propose

- **Adopting the description loop's winner.** It scored better on paper and deleted the five named exclusions, so a "grill me on requirements" query fired 3/3 on held-out — a different skill's query. Three of its phrasings were harvested by hand instead.
- **Moving the pre-flight checklist behind a pointer.** The doctrine names the validation loop as one of two things that stay in the body regardless of size.
- **Cutting the Gotchas to reach 5,000 tokens.** They are roughly a quarter of the body because a source audit found fifteen traps a composer cannot discover otherwise.
- **Deleting the references.** The evidence for it was the void measurement.
- **Editing plugin-kit mid-investigation** — superseded, the owner has now authorised a proper fix.

## 10. In flight

`DL1-disclosure` is running `measure-disclosure`, pid 67886, against SHA `50a6690`, `TMPDIR=$HOME/auq-tmp`, `--permission-mode acceptEdits`, twelve workers, results to `~/auq-results/measure2`. Temp root verified canonical on a live worker root.

It deliberately omits `--grader-bare` (which the Makefile target passes) to hold the grader's auth path identical to the first sweep, so the pull-rate comparison is a comparison.

**That table is what everything waits on:** whether six references with rewritten pointers, plain names and one trigger each actually get opened.

## 11. Queued, in order

1. **The plugin-kit collector fix**, then a third measurement confirming it agrees with the workaround.
2. **Plugin fixes.** The one that bites: **the install cache holds no skill** — `~/.claude/plugins/cache/ACMElabs/ask-user-question/0.0.1/skills/ask-user-question/` contains a zero-byte `.gitkeep` and nothing else, because `version` never moved off `0.0.1` and the cache is version-keyed. Bump the version and delete the stale cache. Also remove the retired `asking-users-questions` entry from the marketplace, and resolve `homepage`/`repository` naming a GitHub repo that does not exist.
3. **`optimize-disclosure`** — only once the collector is trustworthy.
4. **`measure-outcomes`** — never wired. Does the skill actually help? One probe showed a run where the skill never loaded and the improvised answer was creditable, which makes this the sharpest open question.
5. **Extended optimization** on description and disclosure, per the owner's plan: read plugin-kit in full with no sampling, then its reviewer agents, then iterate.
6. **Retire the old plugin**, then uninstall plugin-kit.

## 12. Commands

```bash
make checks          # 27 lint rules
make typecheck       # tsc --noEmit over evals/
bun evals/frontmatter.test.ts
bun /Users/peter.kloss/Dev/ACMElabs/plugin-kit/shared/validate/validate.ts \
    --target-type skill "$PWD/skills/ask-user-question" --extended --with-environment
```

Commit on `main` by **explicit pathspec** — several agents share this tree and a bare `git add .` sweeps their work. Do not push. No AI attribution in commit messages.

## 13. Reading order

`docs/sessions/SESSION-2026-08-23_01-*` — the ledger, sixty events, every decision and correction in order. Then `ANALYSIS-003` (coverage against the retired skill, eleven real gaps), `ANALYSIS-004` (tool capabilities read from the shipped binary), `ANALYSIS-005` (monospace layout rules with confidence classes), `ANALYSIS-006` (surface portability). All via Brain MCP.

Keep the ledger current — one event per state change, committed in the same turn.
