**This is your brief. Work from it.** You are resuming a project whose measurement day is
DONE: the skill is proven, the toolkit is published, and the day's queue was completed or
explicitly ruled out. Your job is the NEXT round of work, not re-running the last one.

**Do §0 before you answer.** Do not reply with a plan or a summary of this brief until the
initialisation has run and the first two notes are read. The last brief compressed findings
that misled at that resolution and dropped a whole conversation thread the owner then made
the next session recover by reading raw transcripts. This brief is built so that never
happens again: **every thread now lives in a note, and §14 maps them all.** Nothing load-
bearing lives only in a transcript. If a fact here disagrees with a note or the repos, the
note and the repos win — say so rather than reconciling silently.

Work in `/Users/peter.kloss/Dev/ACMElabs/ask-user-question`. plugin-kit work happens in
`/Users/peter.kloss/Dev/ACMElabs/plugin-kit`, on `main` — there are no branches anywhere.

## 0. Rehydrate. Blocking, in order.

```text
1. Skill(skill="brain:---memory")           # note: brain:---memory, not brain:memory
2. mcp__plugin_brain_brain__bootstrap_context   project: "ask-user-question"
3. git -C /Users/peter.kloss/Dev/ACMElabs/ask-user-question branch --show-current   # main
4. git -C /Users/peter.kloss/Dev/ACMElabs/plugin-kit branch --show-current          # main
5. date '+%Y-%m-%d %H:%M %Z'   # stamp ledger events from THIS, never from the previous event
```

**Required reading, by exact Brain identifier. Both projects are active — pass `project`
explicitly on every call or you will read the wrong graph.**

| Order | identifier | project | Why |
|---|---|---|---|
| 1 | `sessions/session-2026-08-23-01-ask-user-question-fresh-build` | `ask-user-question` | **103 events.** The primary record. Events 83-103 are the resumed session: ablation, outcomes, the three-layer rewrite, the ToC standard, the genre thread, the reflect protocol. Large — read_note persists it to a scratch file; grep that. |
| 2 | `skills/skill-001-orchestrator-process-learnings` | `ask-user-question` | **The reflect sidecar. Ten findings, three HIGH constraints.** Read WHOLE and FIRST among the small notes — it is the distilled process law of this project and it is short. |
| 3 | `analysis/analysis-004-what-makes-a-bundled-reference-get-read` | `plugin-kit` | The reference-disclosure research, 18 findings incl. the ablation method and its four design caveats. |
| 4 | `analysis/analysis-005-structural-genres-of-skill-content` | `plugin-kit` | The genre taxonomy, its Lineage section (the proposed-standard history the last brief dropped), corrected twice, both dated. |
| 5 | `analysis/analysis-007-reference-ablation-ground-truth` | `ask-user-question` | This skill's need-map: what each reference is causally for, the negatives, the refutations, the bundle refinement. |
| 6 | `sessions/session-2026-08-23-01-plugin-kit-measurement-tooling-hardening` | `plugin-kit` | The toolkit's own record with every commit sha and the open improvement candidates. |

**Identifier collisions, both live:** `ANALYSIS-004` and `ANALYSIS-005` each exist in BOTH
projects as different notes (in ask-user-question: the tool-capability audit and the
monospace layout rules; in plugin-kit: the reference research and the genre taxonomy).
Always pass `project`. Cross-project wikilinks do not resolve — name the other project's
notes as plain text.

## 1. What is true now — the settled results

**The skill works, measured by design.** `measure-outcomes`, treatment vs control, sonnet:
**+16.1 assertion points** (69.5% with the skill, 53.4% without), 54/54 cells scored.
Version **0.1.1** shipped. Trigger: 49/52 queries, recall 95.5%, false triggers 6.7%.

**Every reference earns its place, by ablation.** Removing all six + their pointers costs
10 points (82.4→72.5). Per-file need is causal (ANALYSIS-007's table). Six scenarios are
outcome-validated negatives. Ground truth lives in the corpus as `expects_references`
(16 rows annotated, 11 deliberately absent — absent ≠ empty, by schema design).

**Recall replaced raw pull rate.** Reached-over-should-have-reached; raw rate cannot
separate rarely-needed from needed-and-missed. Post-ToC recall on sonnet: reading-answers
4/4, failed-question 2/2, layout 4/4, asking-again 3/4, wording 3/4, **examples 0/2**.
The ToC re-measure moved 13/20→16/20 — **directionally up, NOT established (p≈0.3), and it
does not enter guidance.** The models fail in opposite directions: opus ~100% recall with
37.5% over-fetch, sonnet the reverse — **sonnet is the detection instrument**, hardcoded.

**The examples.md route is dead on sonnet and the reason is now understood.** 0/42 reads
across every sweep; an imperative in-workflow pointer (the only externally-measured form)
also scored 0/20 — the pre-registered null. Therefore the ablation's examples attribution
is a **file-plus-prose bundle**: the teaching prose around its pointer, not the 332-line
file, is the plausible carrier on sonnet. The file's real consumer is opus (100% recall).
Remedy lever remaining: content boundary, never the pointer. Prose fixes aim at the wrong
stage (know-vs-do).

**plugin-kit is published and doctrinally coherent.** Everything on `main`, pushed:
collector fixes, the Skill grant, recall reporting, recall-aware verdicts (`signpost` =
needed-and-missed, repair never delete; `prune` = evidence-only; `unmeasured` = the new
honest verdict for zero-with-pointer on unannotated sets), the rewritten doctrine and
operator references (every rule labeled: published / measured here / house rule /
unmeasured), the ToC standard, the genre catalog (`shared/references/body-structure.md`),
and the validator: ToC presence+position at warn tier, three genre reporters informational-
only. Suite 1,612/0.

**The ToC standard (LOCKED):** `## Table of Contents` as the **first H2**, flat bulleted
GitHub-style anchor links, H2 entries only, no nesting, no tables, after the H1 and
orientation prose. Whole-specimen files exempt (no H1, content is the artifact — includes
whole example projects). Spec in `progressive-disclosure.md`; enforced by `validate`.

## 2. The owner's rulings — settled, do not reopen

- **No auto-memories.** Never write `~/.claude/memory/`. All learnings go through the
  reflect protocol (`~/REFLECT-PROTOCOL.md`): sidecar note + session-Event pointer via a
  background memory agent → retrospective → skillbook is the only writer of feedback files.
  Every dispatched agent is told this in its brief.
- **Nothing posts to external public repositories** — Anthropic's GitHub included. Prior
  approval expires; drafts stay local. (A finished draft comment for claude-code #77363
  sits at `~/auq-results/77363-draft.md`, deliberately unposted.)
- **plugin-kit work lands on `main`,** never branches. Already true; keep it true.
- **No habit flags.** `measure-disclosure` has NO `--model` (sonnet hardcoded) and NO
  `--permission-mode` (acceptEdits hardcoded, announced). `--tier-study <model>` is the
  purpose-named escape for over-fetch/tier studies — it stamps the results as not-of-record.
  Do not pass `--num-workers` for single runs (tool derives it); concurrent A/B pairs use
  the sanctioned 10+10 pattern because the default is instance-blind (open candidate).
- **The body token limit stays enforced** — 5,000 is the sourced compaction-retention
  boundary (Anthropic docs, verbatim, cited in `progressive-disclosure.md`). The AUQ body
  sits at 5,795/5,800 = inside the post-compaction truncation zone knowingly; skill-creator
  sits at 4,999 deliberately and MUST NOT grow.
- **Recall toward 100% on the should-reach set is the disclosure objective**, budget as
  constraint; remedies are three levers in order: reachability, reference composition,
  scenario quality (corpus is itself an object of evaluation).
- **Measure on sonnet.** If it works on sonnet it works on opus; opus hides every defect.
- **Ledger stamps are measured clock** (`date`), never derived from the previous event —
  the old convention compounded six hours of drift (corrected at Event 101).
- Include all context in a question; one decision at a time; recommended option first with
  the fact behind it. Glyph set per the ledger (Event ~40s). Plain-word filenames.

## 3. Do not re-propose — refuted or rejected, with receipts

- **In-step pointer placement** — controlled run, n=40/arm: reach HALVED, p≈0.20.
- **The pointer rule** (file + firing condition + cost of skipping) — no published basis
  anywhere; the skill's textbook pointers measured 33-75% recall; struck from doctrine.
- **Any reference-count cap** — category error (the source counts whole skills); Anthropic
  says "unlimited" and ships 66. Depth is the constraint (one level, ToC past 100 lines).
- **The imperative-pointer bundle on the dead route** — 0/20 vs 0/20, the registered null.
- **"ToCs raise recall" as a rule** — direction up, p≈0.3, not licensed.
- **Deleting references** — refuted three separate times, finally by causal ablation.
- **Warnings as misuse prevention** — measured ineffective on this session's own operator;
  the remedy is removing the knob and purpose-naming the escape hatch.
- **Decoupled grading** (−12%), **`--bare` scenario runs** (kills the skill system),
  **48 workers** (5× slower, load 143).
- **Posting to Anthropic's GitHub** — owner ruling, above.

## 4. Working rules that earned their keep (the sidecar has the full ten)

- **The citing rule:** any "X was measured as Y" is worth thirty seconds of opening X — and
  the DEFINITION gets checked, not just the citation. It fired ~a dozen times, including on
  the orchestrator's own claims.
- **Verify agent reports against the artifact.** Reports are not artifacts. Three agents
  went idle holding finished reports; the artifacts spoke. **A teammate's report is only
  real through SendMessage — the automatic final return is not a substitute** (tell every
  agent this, flat form; two of three misses were explicit wrong inferences, not forgetting).
- **Brain writes are never trusted without a read-back.** `write_note` silently dropped
  `status` 3-for-3 today (once emitting a duplicate frontmatter block) while leaving notes
  indexed. edit_note response counts are noise (phantom categories, doubled totals).
  `expected_replacements: 1` on every find_replace. `append` ONLY for Relations lines;
  events go via `insert_before_section` on `## Observations`. `[[` inside a regex in a note
  body parses as a phantom relation — the unresolved count is the only detector.
- **A reported error is a sample, not the population** — sweep the class (one count fix
  became three). **A stated count and its examples come from the same command.**
- **Pre-register experiments**: hypothesis, arms, n, decision rule, confounds — before the
  result. A null recorded first reads as what it is. Size before running; never report an
  underpowered null as a finding.
- **Run A/B arms concurrently** so drift lands on both; gate completeness on per-run
  grading compared across arms, never on `assertions_total` (it shrinks by design when runs
  load via file — misreading that cost a wrong diagnosis, corrected same day).
- **Eval workers can leak out of the sandbox**: one messaged this session mid-run urging
  action on its scenario's fictional dilemma. Never reply to a run's worker (contaminates
  the measurement); fixture leakage is recorded as an isolation candidate.
- **`claude plugin update` needs the qualified name** (`ask-user-question@ACMElabs`).

## 5. What the skill is (v0.1.1)

```
skills/ask-user-question/
  SKILL.md        456 lines · 5,795 cl100k tokens (body) — AT CEILING, additions go to references
  examples.md                     four specimens        + ToC
  references/layout.md            thirteen rules        + ToC   (469 lines)
  references/wording.md           ASD-STE100            + ToC
  references/failed-question.md   seven repair modes    + ToC
  references/reading-answers.md   reply shapes          + ToC
  references/asking-again.md      the multi-call run    + ToC
```
Description frozen: 1,002 chars, ONE physical line, sha `107a6cea`. Frontmatter: five
standard fields, NO `allowed-tools` (that field made the Skill tool fail headless — the
whole saga is in the ledger, Events 71-72). A version bump touches `plugin.json`, skill
`metadata.version`, `marketplace.json`; `evals/frontmatter.test.ts` binds the first two.
The ToC blocks were PURE additions — the recall baseline stays comparable.

## 6. Open items, in the order I would take them

1. **D-8 (oldest open decision): which of the 11 coverage gaps to close.** Three are wrong
   guidance, not silence (ask-or-decide lost its reversibility tiebreaker; no meta-label
   ban; independence test licenses pairing). CAUTION: its token budget is stale — it
   assumed ~600 spare body tokens; the body now has 5. Closing body-shaped gaps means
   reference placement or funded trims. Grouped AskUserQuestion, not eleven singles.
2. **The examples.md content-boundary experiment** — is the teaching prose the carrier?
   Split arms: prose-reduced vs file-removed vs shipped (ANALYSIS-004 Finding 18's fourth
   caveat specifies the design). Also closes the prepush-checks residue if run together.
3. **T-13:** plugin-kit install detection should distinguish "no competing copy" from
   "not reachable".
4. **plugin-kit improvement candidates** (its session-note State lists all): instance-aware
   worker default; fail-fast on a broken grant; eval-child cross-session isolation;
   counted-vs-all runs stamped in results; the two creator skills (plugin-, skill-) that
   use exclusively the refuted in-step pointer form — decide deliberate or drift.
5. **Genre experiments now cheap to run**: the anti-rationalization ablation (22 donor
   skills exist, zero effect evidence, the ecosystem's largest unvalidated claim); the
   diagram-vs-prose swap. `body-structure.md`'s measurement-route table maps genre→harness.
6. **Sonnet trigger sweep** as coverage companion (outcomes already ran on sonnet).
7. **The uninstall-plugin-kit queue item is obsolete on its face** (the ecosystem now
   depends on plugin-kit) — owner was asked, has not ruled; do not execute it without a
   fresh ruling.
8. **write_note status-drop ticket** against the brain tooling — owner was asked, has not
   ruled; the defect is 3-for-3 reproducible.
9. At session end: **retrospective over the ledger + sidecar** (ten reflect captures are
   waiting for synthesis — that is the protocol's next stage).

## 7. Commands

```bash
# AUQ gates
make checks && make typecheck && bun evals/frontmatter.test.ts

# validate any skill (plugin-kit toolkit; includes ToC + genre reporters)
bun /Users/peter.kloss/Dev/ACMElabs/plugin-kit/shared/validate/validate.ts \
    --target-type skill <skill-dir> --extended --with-environment

# disclosure sweep — NO model flag, NO permission flag, NO worker flag
cd /Users/peter.kloss/Dev/ACMElabs/plugin-kit && bun shared/operations/measure-disclosure.ts \
  --skill-path <skill> --scenarios <evals.json> --runs-per-scenario 2 --results-dir ~/auq-results/<name>
# tier study (opus over-fetch etc.): add --tier-study opus — stamps results as not-of-record

# outcomes (treatment vs control):
bun shared/operations/measure-outcomes.ts --target-path <skill> --artifact skill \
  --evals <evals.json> --model sonnet --permission-mode acceptEdits --out ~/auq-results/<name>
```
Dashboard: `bun shared/report/generate-dashboard.ts` → http://localhost:3118.
Commit by explicit pathspec, both repos. plugin-kit pushes to origin main; AUQ does not
push. No AI attribution in commits. Ledger events committed same turn, stamped from `date`.

## 8. The note inventory (everything; nothing lives only in transcripts)

**ask-user-question**: ANALYSIS-001 (authoring standards) · 002 (evidence rules) ·
003 (coverage gaps → D-8) · 004 (tool-capability audit at build 2.1.241 — load before any
claim about what AskUserQuestion does) · 005 (monospace layout rules) · 006 (surface
portability) · 007 (ablation ground truth) · SKILL-001 (reflect sidecar) · the session
ledger. **plugin-kit**: ANALYSIS-001 (port fidelity) · 002 (inert parameters) ·
003 (measurement fault classes — sixteen ways this harness lies) · 004 (reference
research) · 005 (genre taxonomy) · both session notes. plugin-kit references worth loading
by task: `progressive-disclosure.md` (doctrine + ToC spec), `disclosure-optimization.md`
(operator guide + verdict table + remedy ladder + ablation workflow), `body-structure.md`
(genre catalog), `schemas.md` (`expects_references` semantics), `running-detached.md`.

**The ledger wins over this brief. The sidecar's three HIGH constraints win over habit.
Keep the ledger current — one event per state change, measured-clock stamp, committed in
the same turn.**
