# Cold-start prompt — ask-user-question build

Paste everything below into a fresh conversation. It is written to be read cold.

---

## What this is

Build a Claude Code plugin, `ask-user-question`, at `/Users/peter.kloss/Dev/ACMElabs/ask-user-question`, whose single skill teaches an agent to compose an `AskUserQuestion` call. It replaces `/Users/peter.kloss/Dev/ACMElabs/asking-users-questions`, which is being retired. **Nothing is ported** from the old plugin — it was fresh-authored deliberately; the old one is a coverage reference only.

`/Users/peter.kloss/Dev/ACMElabs/plugin-kit` is the authoring toolkit: standards, measurement operations, and reviewer agents. Use it rather than improvising. Load its skills formally — `Skill(skill="plugin-kit:skill-creator")`, `Skill(skill="plugin-kit:plugin-creator")` — and read `plugin-kit/shared/references/*.md` before making a placement or description decision.

**Brain project `ask-user-question` is active**, mapped to the repo. Notes under `docs/**` are Brain notes: use `mcp__plugin_brain_brain__*` tools only, never Read/Edit/Write. Everything else uses ordinary file tools.

## Working rules that were learned the hard way

**The failure mode is not reasoning, it is citing.** Six times in one session a ruling was sound as an argument and wrong in its stated evidence — a token divisor, a Unicode width class, which file held some flags, a header convention, a permission theory, a payload size. An argument gets tested by argument. A citation only gets tested when someone opens the thing. **Any sentence of the form "X was measured as Y" is worth thirty seconds of opening X.**

**A measurement is not evidence the thing measured exists in the artifact.** An agent measured two edits, reported the numbers confidently, and never staged them.

**Verify agent reports against the artifact, not the report.** Several were wrong in ways only a direct check caught.

**When you find a stale claim, sweep for its copies.** One false claim had three homes, all drifted independently. The durable fix is to state a number in no prose at all and point at whatever computes it.

**Subagents idle constantly.** They go idle without starting work and without reporting finished work. Nudge with a compact restatement; verify state from git and the filesystem rather than from their silence. Ask them to confirm they have started. Never make a release conditional on something they cannot observe.

**Ask questions using the skill's own standards.** The user has corrected this repeatedly. One decision at a time, a recommendation with the fact behind it, options that state costs, and the question self-contained — the dialog covers the conversation, so context outside it is invisible. Keep the question inside its length budget and put structure in `preview`, which is the only field that renders markdown.

## Current state

Skill: `skills/ask-user-question/` — `SKILL.md` (~456 lines), `examples.md` (four specimens), and five references: `layout.md`, `wording.md`, `failed-question.md`, `reading-answers.md`, `asking-again.md`.

Description is **frozen at 1002 of 1024 characters**, measured at 49/52 trigger queries, recall 95.5%, false triggers 6.7%. Do not edit without re-measuring.

Body is at its ceiling — **5,795 tokens against a 5,800 hard gate, 456 lines against 500.** The gate warns at 5,000 (matching plugin-kit's severity) and fails at 5,800, measured with tiktoken. Further additions go in references. If something genuinely belongs in the body, the options are a real restructure or a considered raise with an argument — not a squeeze.

Gates: `make checks` (27 lint rules), `make typecheck`, `bun evals/frontmatter.test.ts`, and `bun plugin-kit/shared/validate/validate.ts --target-type skill <dir> --extended`. All green, one expected 5,000-target warning.

Four trigger collisions exist against installed neighbours (`pptx`, `pdf`, `capture`, `docx`). plugin-kit's own measurement says rewriting our description does not recover them. Not fixable here.

## The measurement bug that dominates everything

**plugin-kit's disclosure collector cannot see reads on macOS.** `shared/operations/disclosure.ts`, `createRunCollector`, line 1287 and 1297-1302: the skill directory comes from `os.tmpdir()` and is normalised with `resolve()`, which does not canonicalise symlinks. `/var` is a symlink to `private/var`, so the collector holds `/var/...` while the model uses `/private/var/...`, and every genuine in-skill read is classified outside.

**Consequence: every bundled file reports zero pulls and a verdict of `prune`, and `optimize-disclosure`'s entire candidate set becomes deletion proposals.** The pass-rate guardrail does not catch it, because the content still reaches the model.

A second defect compounds it: `skillLoaded` (lines 1310-1314) is set on seeing the *request* and never checks the result. A run where the skill errored twice and the model improvised the whole answer records as loaded.

**Workaround:** `TMPDIR=$HOME/auq-tmp` — not `/tmp`, which is itself symlinked. Verified.

The owner has authorised fixing plugin-kit. Do it on a branch, run its own tests before and after, keep the change minimal, then re-measure with `TMPDIR` back to default and confirm the patched collector agrees with the workaround. An upstream write-up is drafted in the session ledger.

## In flight

`DL1-disclosure` is running `measure-disclosure` against SHA `50a6690` with `TMPDIR=$HOME/auq-tmp` and `--permission-mode acceptEdits`, results to `~/auq-results/measure2`. **That table is the thing everything waits on** — whether six references with rewritten pointers, plain-language names and one trigger each actually get opened. Every earlier disclosure number is void.

## Queued

- **Plugin fixes**, from two independent reviews. The important one: **the install cache holds no skill** — `~/.claude/plugins/cache/ACMElabs/ask-user-question/0.0.1/skills/ask-user-question/` contains a zero-byte `.gitkeep` and nothing else, because `version` has never moved off `0.0.1` and the cache is version-keyed. Bump the version and delete the stale cache. Also: remove the retired `asking-users-questions` entry from `/Users/peter.kloss/Dev/ACMElabs/.claude-plugin/marketplace.json`, and resolve `homepage`/`repository` pointing at a GitHub repo that does not exist.
- **`optimize-disclosure`** — only after the collector is trustworthy.
- **`measure-outcomes`** — never wired. Does the skill actually help? One probe showed a run where the skill never loaded and the improvised answer was creditable, which makes this the open question.
- **Extended description and disclosure optimization**, per the owner's plan: read plugin-kit in full with no sampling, then its reviewer agents, then iterate.
- **Retire the old plugin** and uninstall plugin-kit at the end.

## Reading order

`docs/sessions/SESSION-2026-08-23_01-*` is the ledger — 60 events, decisions and corrections in order. Then `ANALYSIS-003` (coverage against the retired skill), `ANALYSIS-004` (tool capabilities read from the binary), `ANALYSIS-005` (monospace layout rules), `ANALYSIS-006` (surface portability). Read via Brain MCP.

Keep the ledger current, one event per state change, committed in the same turn.
