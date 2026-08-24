---
title: "ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin"
type: analysis
status: DRAFT
permalink: analysis/analysis-001-plugin-kit-authoring-standards-for-the-ask-user-question-plugin
tags:
- authoring-standards
- progressive-disclosure
- description-writing
- dispatch-brief
---

# ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin

> Citations are `path:line` relative to the plugin-kit repository root. Every rule is quoted or paraphrased from that repository; analyst judgement is labelled where it appears.

## Verdict

Complete enough to author the new plugin against, without further extraction. Description writing, progressive disclosure, load-mode placement, frontmatter, and the skill-versus-command-versus-agent boundary each carry a stated decision rule plus rationale, and two of them additionally ship measurement loops and a static reviewer that grade the result. Nine items the standards do not decide are under Gaps; none blocks authoring.

## Part 1 Description Standards

1. **The description is the whole trigger surface.** "Claude sees every installed skill's name and description, and decides from that alone whether to consult one. Everything else in the skill is invisible until after that decision." — `shared/references/description-writing.md:3`
2. **The governing rule.** "A description must be matchable on the artifact it produces, not the topic it is about. State the deliverable, and exclude at least one same-domain, different-deliverable case." — `shared/references/description-writing.md:7`
3. **Criterion 1, deliverable clause.** A sentence names a concrete output artifact the skill produces or modifies — "Use when X is the deliverable", "produces/edits/creates X". Topics and verbs alone fail. — `shared/references/description-writing.md:53`; graded **Critical** at `agents/skill-reviewer.md:77`
4. **Criterion 2, at least one negative clause.** A "Do not use when…" or "Not for…" segment must exist. — `shared/references/description-writing.md:55`; **Major** at `agents/skill-reviewer.md:79`
5. **Criterion 3, negatives share vocabulary with positives.** "Excluding something obviously irrelevant is worthless… The exclusions that do work are the ones that were genuinely tempting." Reviewer method: "pick the domain nouns from the positive clauses and confirm the negatives reuse them." — `shared/references/description-writing.md:57`; `agents/skill-reviewer.md:79`
6. **Criterion 4, no universal-quantifier pushiness.** Checked case-insensitively for `even if they (don't|do not|didn't|did not)`, `whenever the user mentions`, `always use this skill`, `any time`, `in all cases`, `no matter what`. — `shared/references/description-writing.md:59`; `agents/skill-reviewer.md:85-88`
7. **Clause order.** Capability claim first, then deliverable, then negatives. Capability-first is mandatory over `This skill should be used when…`, which "burns the highest-signal tokens in the file on a constant string". — `skills/skill-creator/references/authoring-checklist.md:20`; not-to-be-flagged at `agents/skill-reviewer.md:152`
8. **How to write the negatives.** Same-domain, different-deliverable cases, preferably naming the competing artifact. The measured example excludes auditing someone else's skill, debugging why an installed skill errors, and writing documentation about skills, and adds a follow-the-document clause: "Do NOT use when the user asks you to follow a plan, brief, or spec that happens to mention skills or plugins among its inputs — follow that document instead." — `shared/references/description-writing.md:25`
9. **Length is a budget, not a limit.** Hard cap 1,024 characters: over it "the tail stops participating in triggering at all and nothing warns you." — `shared/references/description-writing.md:67`; enforced in code at `shared/validate/validate-skill.ts:68` (`DESCRIPTION_MAX = 1024`)
10. **Roughly 500 characters is a question, not a threshold**, reported **Minor** on that reading — `shared/references/description-writing.md:69`; `agents/skill-reviewer.md:92`. The measured winner is **905 characters** and "won because of the exclusions that make it long — trimming it to 500 would delete the clauses the measured improvement is attributed to" — `:71`
11. **What to cut / never cut.** Cut a clause describing runtime mechanics, a second exclusion aimed at the same near-miss, and restatement. Never cut an exclusion naming a competing skill, or the deliverable clause. — `shared/references/description-writing.md:73-79`. `<example>` blocks are exempt — `:81`
12. **Separate listing budget.** `description` plus `when_to_use` truncate at 1,536 characters in the skill listing; the listing scales at 1% of the model's context window, and on overflow Claude Code "drops descriptions starting with the least-invoked skills" — so put the key use case first. — `skills/command-creator/references/command-frontmatter.md:56`
13. **The router limitation, verbatim:** "The reason is in how triggering works: Claude only consults a skill for work it cannot easily handle on its own. Every one of those nine queries has an obvious first action — read a file, run a command, answer directly — so none of them ever reach the point where skill selection happens." — `shared/references/description-writing.md:114`. Restated at `shared/references/description-optimization.md:175` and, for delegation, `skills/agent-creator/SKILL.md:200`.
14. **Consequence for the eval set.** "A hard negative earns its place only if it is complex, multi-step, and squarely inside the skill's declared subject matter, with a deliverable that is something else." A plausible set of nine easy near-misses "returned a 0% false-positive rate in every condition tested" and "would have certified the worst description in the set as flawless." — `:116`, `:112`
15. **Good citizenship, not self-defence.** The rule "stops your skill from stealing other people's queries; it barely stops other people's skills from stealing yours" — `:87-98`. And "Co-installation does not manufacture false positives… If a skill is over-firing, the cause is its own description, not the company it keeps" — `:104`. Expect a residual, and it moves between models — `:128-130`.

## Part 2 Disclosure Standards

1. **Three load levels:** metadata always in context, body on trigger, bundled files on demand, with `scripts/` able to execute without entering context at all. — `shared/references/progressive-disclosure.md:3-8`
2. **Body budget: under 500 lines AND under 5,000 tokens.** "Both, not either… a 480-line file with long paragraphs can be 7,000 tokens and blow the budget while passing the line check. Measure both." — `:13`; `skills/skill-creator/references/authoring-checklist.md:29`; `agents/skill-reviewer.md:96`
3. **A reference is justified when the body is at its limit, not before.** "When you approach the limit, the answer is another layer of hierarchy with clear pointers about where to go next, not tighter prose. Move detail into `references/` and leave a sentence in SKILL.md saying what is in there and when to read it." — `:15`. Over budget, "the fix is to move content out by load mode… not to delete it" — `agents/skill-reviewer.md:100`
4. **Information lives in one place.** Duplicated content drifts and gets read twice; keep SKILL.md to "procedure, workflow and pointers". — `:21`; `authoring-checklist.md:56`
5. **Pointers carry conditions, not just paths.** A pointer that names a file and stops "tells the model the file exists, which is not the same as telling it to open the file at the right moment and only then. That gap is the single most common reason a well-written reference is never read, and it looks identical in the data to a reference nobody needs." Three parts earn a place: the file, the condition, and what goes wrong if skipped. — `:27-31`; **Minor**, or **Critical** with no pointer at all — `agents/skill-reviewer.md:126`
6. **Every bundled file must be named somewhere in SKILL.md.** "An unreferenced file is invisible and its zero pull rate says nothing about its value." — `authoring-checklist.md:44`; **Critical** at `agents/skill-reviewer.md:120`
7. **Measured verdict table.** `inline` at a pull rate of **80% or more**; `prune` at zero when the body points straight at it; `signpost` at zero when nothing in the body names it; `misfiled` when an execute- or copy-mode file was read; `keep` otherwise. — `shared/references/disclosure-optimization.md:58-64`. The judgement form of the same four symptoms is at `progressive-disclosure.md:33-41`.
8. **Extraction floor: 250 tokens** (`--min-extract-tokens`), because "deferring content costs a round trip, so moving a small section out makes the skill slower and barely cheaper." — `disclosure-optimization.md:74`
9. **One level deep** — `references/x.md`, never `references/sub/x.md`, since "deeply nested reference chains make the model traverse to find out whether traversal was worth it" — `:17`. References may be large, and for very large ones tell SKILL.md what to grep for — `:19`. Two files always needed together are one file — `:44`. One term per concept across the boundary — `:46`.
10. **Two things stay in the body regardless of size:** gotchas ("a gotcha behind a pointer is a gotcha that arrives after the mistake") and the validation loop ("Mentioning a validator once produces one run; describing the loop produces the loop"). — `:48-52`
11. **Diagrams cost tokens on every invocation.** "The question is never 'would a diagram look good here' but 'is the branching structure itself the content'." Under roughly fifteen nodes, and preferably in `references/` behind a condition. — `:54-60`
12. **Placement by load mode, first match wins:** `scripts/` (run, output only) then `assets/` (copied into the artifact) then `examples/` (whole specimen, imitated) then `references/` (read for rules and schemas, the default) then skill root, flat. — `:64-95`
13. **Two guardrails.** "A `scripts/` file is never read; an `examples/` file is never run." And "Do not create a directory for one file… Plenty of good skills have no subdirectories at all." — `:99-100`. `examples/` must never be flagged as non-conformant nor required — `:120`.
14. **Measurement caveats.** A pull is a `Read` tool call, so a file consumed through a shell pipeline reads as never pulled; scripts count by whether they were read rather than run; "pull rates are only as stable as the run count." — `disclosure-optimization.md:114-117`. Near a ceiling, measure rather than estimate: "A body measured at 4,800 estimated tokens against a 5,000-token budget has not been shown to be inside it" — `:48`.

### Why The Prior Fork Failed These

Reported measurement on the fork being replaced: 8 references, every one at pull rate 0, a 4,657-token body, optimizer verdict `prune` on all 8.

- **The all-`prune` verdict is itself the diagnosis.** `prune` is returned only when a file went unread *and the body points straight at it*; `signpost` is the verdict when nothing names it (`disclosure-optimization.md:61-62`). So the fork's pointers existed and fired for nobody. The defect is not missing signposts — the deferred content was never conditional.
- **A 4,657-token body sits inside the 5,000-token budget, so nothing licensed the split.** The trigger for a reference is a body at its ceiling (`progressive-disclosure.md:15`), and the floor for extracting a section is 250 tokens (`disclosure-optimization.md:74`). Eight references drawn off an under-budget body inverts both rules.
- **4,657 is only a defensible figure if it was counted rather than estimated** (`disclosure-optimization.md:48`). If it came from characters-over-four, the fork was never shown to be inside the budget at all.
- **Pointer conditions are the second-order suspect.** A `prune` verdict proves a pointer existed, not that it carried a condition — the usual reason a good reference goes unread (`progressive-disclosure.md:27`). The reader's test at `:42` separates "nobody needed this" from "nobody knew when to reach for it".
- **Check the caveats before treating eight zeros as absolute:** `Read`-only detection, and two runs per scenario as the minimum that distinguishes always from sometimes (`disclosure-optimization.md:114`, `:117`).
- **Net instruction for the rewrite:** start with one file. Body inside 500 lines and 5,000 measured tokens; add a reference only when the body is at that ceiling, the section exceeds roughly 250 tokens, and the pointer can state the condition that fires it. Zero subdirectories is explicitly blessed at `progressive-disclosure.md:100`.

## Part 3 Body And Frontmatter

### Fields

| Field | Status | Constraint and citation |
|---|---|---|
| `name` | **Required** | 1-64 chars, lowercase alphanumerics and hyphens, no leading or trailing hyphen, no double hyphen, matches the parent directory — `shared/references/portability.md:15`. In a plugin it sets the last invocation segment, so a mismatch changes the command — `skills/skill-creator/references/skill-frontmatter.md:45-47` |
| `description` | **Required** | 1-1024 chars, non-empty — `portability.md:16`. See Part 1 |
| `license` | Permitted (standard) | A license name or a bundled license file — `portability.md:17` |
| `compatibility` | Permitted (standard) | Up to 500 chars of environment requirements — `portability.md:18` |
| `metadata` | Permitted (standard) | String map; "the sanctioned escape hatch" — `portability.md:19` |
| `allowed-tools` | Permitted (standard, Experimental) | Space-separated form for portability — `portability.md:20`, `:82` |
| `argument-hint`, `model`, `when_to_use`, `effort`, `context`/`agent`/`background`, `shell`, `hooks`, `arguments` | Permitted extensions, **fail-safe** | "Ignored, the skill still works, just less well… Add these freely." — `portability.md:36-38` |
| `disable-model-invocation`, `disallowed-tools`, `paths` | Permitted but **fail-open** | "Ignored, the guardrail silently vanishes"; safety "belong[s] in its body and in runtime permission settings, never solely in frontmatter" — `portability.md:42-48` |
| `paths` | Advised against here | Limits activation rather than adding a trigger, suppressing most legitimate triggers on a skill invoked with nothing relevant open — `skill-frontmatter.md:36`; **Major** at `agents/skill-reviewer.md:134` |
| `context: fork` | Advised against here | "A forked context loses the conversation above" — fatal when the transcript is the input — `skill-frontmatter.md:37` |
| `effort` | Advised against here | "It overrides an effort level the user set deliberately" — `skill-frontmatter.md:39` |
| bare top-level `version` | **Non-conformant** | "`metadata.version` is fine; bare `version:` is noise", same for `created_by` and `improved_by` — `portability.md:86` |
| any extension in a `.skill` bundle | **Forbidden** | claude.ai upload and the Skills API "accept the six fields and nothing else" — `portability.md:70`; outside Claude Code an unpermitted key "is a hard error, not an ignored field" — `skills/skill-creator/SKILL.md:31` |

House default set (`skill-frontmatter.md:20-30`): `name`, `description`, `argument-hint`, `allowed-tools: Read, Grep, Glob`, `license: MIT`, `compatibility`, `metadata.component-type`, `model`. `allowed-tools` is deliberately read-only, because granting `Write`, `Edit` or `Bash` "pre-approves them for the rest of the turn on the user's behalf" (`:32`). Skill frontmatter is kebab-case with `when_to_use` the lone snake_case outlier; agent frontmatter is camelCase and the two are not interchangeable (`portability.md:80`). Write `true` and `false`, not `yes` and `no` (`:84`).

### Body conventions

- **Explain why rather than issuing MUSTs.** "Given the reasoning, a model generalizes past the letter of an instruction to cases you did not anticipate; given only a rule, it follows the rule exactly as far as it goes and no further." — `skills/skill-creator/SKILL.md:65`; `authoring-checklist.md:28`. Second person is correct and must not be flagged — `agents/skill-reviewer.md:151`
- **Prescriptiveness tracks fragility, per section.** A fragile or order-dependent operation described loosely is **Major**; a judgement call written as a rigid rule is **Minor**. — `SKILL.md:67`; `agents/skill-reviewer.md:132`
- **A default with an escape hatch, never a menu of equals.** "A menu of three equals hands back a decision you already made." — `SKILL.md:67`; `agents/skill-reviewer.md:130`
- **Gotchas section in the body, near the top** — `SKILL.md:26-36` is the house specimen; deferring one is **Major** at `agents/skill-reviewer.md:128`; `authoring-checklist.md:33`
- **Two patterns beat prose:** an output format as a literal template, and a behaviour as an `Input:` / `Output:` pair. Both are house patterns and must not be flagged. — `SKILL.md:71`; `agents/skill-reviewer.md:157`
- **Teach a procedure, not one instance's answer**, and keep the skill general rather than welded to its examples — `SKILL.md:69`
- **Close with a "Bundled files, and when each one fires" section** — `skills/command-creator/SKILL.md:245-253`, `skills/agent-creator/SKILL.md:246-252`. Both siblings also close on a one-sentence reminder of the step most often dropped.
- **Length is not a quality signal in either direction** — `agents/skill-reviewer.md:159`; nor is a YAML comment explaining a field — `:158`
- **Ordering is not specified for skills.** The observed house shape is frontmatter, H1, a short framing paragraph, Gotchas, numbered decision or step sections, pre-flight, bundled-files, closing line. The only stated ordering rule covers command files: "frontmatter, then the injected context, then the task" — `skills/command-creator/SKILL.md:156`

## Part 4 Skill Vs Command Vs Agent

**Command versus skill is settled for new work.** "For a new plugin, a user-invoked slash command should be a skill in `skills/<name>/SKILL.md`, not a file in `commands/`. Both load identically; the only difference is file layout. `commands/` remains an acceptable legacy alternative, so keep using it in a plugin that already does — but do not start there." — `shared/references/plugin-skills.md:58-63`. Reasoning: both layouts produce `/deploy` with the same frontmatter, substitution and injection, so "the choice is not correctness. It is what the entry point will need later", and one file of instructions with nothing bundled goes to the skill layout "by default, since it forecloses nothing" — `skills/command-creator/SKILL.md:28-39`. Two triggers to hand off to a skill: the moment any `scripts/`, `references/`, `assets/` or `examples/` directory is wanted, and when "model invocation is the point" — `:43-50`.

**What `disable-model-invocation: true` means for the choice.** Two independent axes rather than one setting (`skills/command-creator/SKILL.md:81-92`; matrix repeated at `command-frontmatter.md:117-124`): the default leaves both paths open; `disable-model-invocation: true` keeps the typed slash, removes model invocation, **and removes the description from context**; `user-invocable: false` is the inverse; both set leaves nothing able to reach the file. The missed consequence: it "costs nothing in the skill listing, cannot be truncated when that listing overflows, and cannot steal a sibling's triggers — but the description is now purely documentation for whoever reads `/help`. No amount of description tuning changes when it fires" (`:88`). Reach for it "when the timing of the effects should be the user's decision rather than an inference" (`command-frontmatter.md:101`); it is "fine for a destructive `/deploy`, wrong for anything you want Claude to reach for on its own, and fail-open elsewhere" (`skill-frontmatter.md:38`). Knock-ons: nothing statistical is left to measure, and that is "a complete answer rather than a missing step" (`command-creator/SKILL.md:212`; `description-optimization.md:187`); and such a skill cannot be preloaded into a subagent via `skills:` (`agent-creator/SKILL.md:224`).

**Agent versus skill.** An agent buys a separate context window and a tool grant the caller cannot widen; it costs a round trip and the conversation. "Delegate when the intermediate context is large and the answer is small, or when the restriction has to be enforced rather than requested. Do not delegate work whose substance is the conversation." And "a skill changes how *this* Claude works; an agent is a different Claude with a different job. If the work needs knowledge — 'here is how we do X' — that is a skill." — `agent-creator/SKILL.md:36-44`. Composing a question to the person in the conversation is conversation-substance work, so that rule closes the agent branch.

**`command-creator` does document a command format**, in three layers: a literal skeleton with a stated section order — frontmatter, a Context section holding injected output, then the task — at `command-creator/SKILL.md:154-172`; two annotated specimens, `examples/minimal-command.md` for no arguments and no injection (four frontmatter lines: `name`, `description`, `disable-model-invocation: true`, `allowed-tools`; see `examples/minimal-command.md:11-19`) and `examples/review-pr.md` for arguments, injection or a tool grant (`:174-177`); and field-by-field reference material in `references/command-frontmatter.md`, `references/arguments.md` and `references/load-time-injection.md`, which exist because the body is itself rendered and cannot show the live spellings (`:22`).

## Part 5 wait-what Placement

Source: a 17-line user-invoked skill — frontmatter `name`, `description` ("Stop. That last message did not land — re-pitch it."), `disable-model-invocation: true`, and a body of one instruction plus an appended note.

| Half | Recommended home | Justifying standard | Mechanically checkable |
|---|---|---|---|
| (a) Repair trigger — user-invoked "that last message did not land, re-pitch it" | **A second skill** in the plugin, `skills/<name>/SKILL.md`, keeping `disable-model-invocation: true`. Not `commands/`, not folded into the main skill | New user-invoked entry points are skills — `plugin-skills.md:60`; one file of instructions with nothing bundled defaults to the skill layout because it forecloses nothing — `command-creator/SKILL.md:34`; the flag is right when timing is the user's call, and only a human can judge that a message did not land — `command-frontmatter.md:101`; and because the flag drops the description from context, this sibling cannot compete with the main skill's triggers — `command-creator/SKILL.md:88` | Frontmatter and layout **yes**; the instruction text **no** |
| (b) Register demand — ASD-STE100 Simplified Technical English plus the ubiquitous language from `CONTEXT.md` | **The main skill's body**, as a stated default with an escape hatch; controlled-language detail to `references/` only once the body reaches its ceiling | A rule applying to every composition is body content, since a file pulled on 80% or more of runs is "body content paying an extra tool call to arrive late" — `disclosure-optimization.md:60`; non-procedure detail moves to `references/` — `authoring-checklist.md:30` — but only at the body's limit — `progressive-disclosure.md:15` — and above the 250-token floor — `disclosure-optimization.md:74`; default-with-escape-hatch rather than a menu — `skill-creator/SKILL.md:67`; keep the `CONTEXT.md` dependency conditional, since a skill teaches a procedure and stays general — `skill-creator/SKILL.md:69` | **Partly** — see the note below |
| (b-note) AskUserQuestion content must be self-contained, concise and well formatted, because the dialog hides everything written before it | **The main skill's body, in Gotchas** | The standards' own definition of a gotcha, and the one place the disclosure rule inverts: "the model cannot decide to open a file about a trap it does not know exists" — `progressive-disclosure.md:50`; deferring one is **Major** — `agents/skill-reviewer.md:128`; house specimen at `skill-creator/SKILL.md:26-36` | No |

**Not a lint rule.** plugin-kit offers no author-extensible lint mechanism: `shared/validate/rules/` holds one module per component type inside plugin-kit itself, and the shipped skill validator's coverage is "SKILL.md frontmatter, body size, dangling references, purity, collisions" (`shared/validate/rules/skill.ts:41`). The only sanctioned mechanical home for a new check in a new plugin is a `scripts/` file the body tells Claude to run in a loop (`progressive-disclosure.md:84`, `:52`; `authoring-checklist.md:55`), written in pure Bun with no runtime npm dependency (`skill-creator/SKILL.md:61`; `shared/references/pure-bun.md:95`). Whether to build one is the author's decision; the standards neither require nor forbid it.

**On ASD-STE100 (analyst's domain knowledge, not a plugin-kit standard).** It is a real controlled-language specification maintained by the AeroSpace and Defence Industries Association of Europe, combining roughly sixty writing rules with a dictionary of approved words and approved meanings. Mechanically checkable: sentence-length ceilings, banned constructions, approved-word conformance — whatever reduces to counting or table lookup. Not mechanisable: whether a word is a legitimate Technical Name or Technical Verb for the domain, and whether a rewrite preserves meaning. A checker can warn but cannot return a verdict, which mirrors plugin-kit's own split between the validator and the reviewer agent.

### Attribution Obligation

The source repository is MIT licensed with a named copyright holder, Matt Pocock, 2026 (its `LICENSE:1-3`; `"license": "MIT"` at its `package.json:10`). MIT attaches one condition: the copyright and permission notices must be included in all copies or substantial portions. The new plugin also being MIT does not discharge that — matching licences still require the upstream notice to travel with upstream material.

- **Reusing the idea** — a one-keystroke repair trigger, and a controlled register for the re-pitch — carries no obligation.
- **Carrying the prose across verbatim or near-verbatim** does. Then ship the notice (a `NOTICE` or `LICENSES/` file at the plugin root; plugin-kit's taxonomy puts a `LICENSE` at the root, flat — `progressive-disclosure.md:95`) and record provenance under `metadata:`, the standard's sanctioned home — `portability.md:19`, `:86`; `command-frontmatter.md:238`.
- **Recommendation: paraphrase.** Four lines is cheaper to rewrite than to track, and the register demand has to be reframed anyway as a default with an escape hatch rather than a first-person aside.
- **Separate flag on ASD-STE100 itself:** the specification and its dictionary are published under the owning association's terms rather than an open licence. Do not bundle the approved-word list into `references/` or `assets/` without checking those terms; cite the specification by name and rule number instead.

plugin-kit is silent on third-party attribution — a grep for attribution, third-party, copyright and derivative across `skills/`, `shared/`, `agents/` and `docs/` returns nothing on the subject. The obligation comes from the upstream licence, not from these standards.

## Gaps

1. **No stated section order or required headings for a skill body.** Inferable from the four creator skills, specified nowhere; only command files get an ordering rule (`command-creator/SKILL.md:156`).
2. **Internal contradiction on `version`.** `agents/skill-reviewer.md:69` lists it as valid and not-to-be-flagged; `portability.md:86` calls a bare top-level `version:` non-conformant noise. Recommendation: use `metadata.version`.
3. **The 500-character guidance still produces a Minor on a well-formed long description.** `description-writing.md:71` defends 905 characters; `agents/skill-reviewer.md:92` reports over-500 as Minor. Resolved in prose, not in the rubric — be ready to defend the length rather than trim to satisfy the reviewer.
4. **Nothing says whether a distributed skill may assume a project file exists.** The `CONTEXT.md` dependency has no covering rule; `skill-creator/SKILL.md:69` argues for generality without settling it. Decide whether the register instruction degrades gracefully when there is no `CONTEXT.md`.
5. **No standard on third-party attribution, and none on shipping a prose-register checker.** The mechanisms exist; the obligation and the build decision do not come from plugin-kit.
6. **No pre-measurement guidance on how many bundled files a first draft should have.** The verdict table is post-measurement; the only forward-looking constraints are the body-at-ceiling test, the 250-token floor, and "do not create a directory for one file".
7. **No rule on two skills in one plugin deliberately sharing domain vocabulary.** The standards ship a detector keyed on shared vocabulary plus pushy phrasing (`description-writing.md:100`) and explicitly decline to offer a defence (`:98`). Moot for a `disable-model-invocation: true` sibling whose description is not in context; live if that sibling ever becomes model-invocable.
8. **Nothing addresses tool-specific content constraints such as AskUserQuestion's dialog behaviour.** The standards say where such a fact goes; the fact itself is the author's to supply.
9. **Which claims rest on documentation versus running code.** There is no `skills/skill-creator/scripts/` directory and no `run-loop.ts` anywhere in plugin-kit, but the skill is not documentation-only: its executables live under `shared/`, which `agents/skill-reviewer.md:114` documents as grouped by function rather than by load mode precisely because none of it is read into context. All ten scripts cited in this brief were verified present on disk: `shared/operations/{optimize-disclosure,measure-disclosure,measure-triggering,optimize-description,aggregate-results,synthesize-scenarios}.ts`, `shared/validate/{validate,validate-skill}.ts`, `shared/validate/rules/skill.ts`, `shared/report/generate-review.ts`, `shared/tools/package-skill.ts`. Two claims rest on documentation rather than on source this analysis read: the 80% inline threshold and the 250-token extraction floor, which are stated in `disclosure-optimization.md:60` and `:74` and implemented inside `optimize-disclosure.ts`, whose source was not opened. Two claims were verified in source: `DESCRIPTION_MAX = 1024` at `shared/validate/validate-skill.ts:68`, and the validator's coverage summary at `shared/validate/rules/skill.ts:41`. The measured figures in `description-writing.md` are historical: that file states at `:140-144` that they were taken under a detection rule the loop no longer uses and "are not comparable to a run made today", so treat them as a record rather than as targets.

## Blockers

- `write_note`'s `metadata` parameter is silently dropped, so `status` never reaches the frontmatter. Workaround applied to this note: `write_note`, then `edit_note` with `find_replace` inserting `status: DRAFT` between the `type:` and `permalink:` lines, then a filter-only `search` on `status: "DRAFT"` with `note_types: ["analysis"]` to prove it landed. `DRAFT` was chosen because this project had no existing analysis notes to establish another convention #brain-mcp #workaround
- The two-relation minimum is now met at 2 of 2. The project graph was empty when this note was first written; once the session ledger landed in the project, a real bidirectional edge was added — `relates_to` outbound from here, the reciprocal on the session note, both confirmed by a references sweep reporting direction `both` and zero dangling outbound edges. The evidence-rules analysis then landed as a third note and a second bidirectional edge was added, `pairs_with` in both directions, which closed the shortfall #relations #shortfall
- One edge is deliberately not written: to plugin-kit's ADR-001 on skill-creator merge-conflict resolutions. It is a `decision`-type note, and creating the edge would count as editing an ADR and trip a blocking review gate. Named in prose here instead #relations #deferred
- An earlier copy of this brief was written into the `plugin-kit` project as ANALYSIS-002 under a superseded instruction, then deleted after this note verified, on the team lead's ruling that two copies are two sources of truth and the plugin-kit one was the defective copy — it carried the forbidden ADR edge and no `status`. Deletion removed that one-way edge without editing ADR-001 #cleanup #resolved
- Brain MCP returned `Connection closed` on six consecutive calls during this task. Root cause, diagnosed by the team lead: `create_project` wrote this project into `~/.basic-memory/config.json` as a bare path string instead of an object carrying `path`, `mode`, `workspace_id`, `local_sync_path`, `bisync_initialized` and `last_sync`, so basic-memory failed reading `.path` off a string. Repaired to the sibling shape. Note titles were verified by reading files on disk while the server was down #brain-mcp #root-cause

## Observations

### Description standards

- [fact] The description rule is stated verbatim as "matchable on the artifact it produces, not the topic it is about" at `shared/references/description-writing.md:7`, with four checkable criteria at `:53-59` #description #standards
- [constraint] A description over 1,024 characters is silently truncated and its tail stops triggering; the cap is enforced in code at `shared/validate/validate-skill.ts:68` #description #hard-limit
- [fact] The documented router limitation is that Claude only consults a skill for work it cannot easily handle on its own, which is why easy near-miss queries certify every description as flawless — `shared/references/description-writing.md:114` #triggering #evals

### Disclosure and body budget

- [constraint] A SKILL.md body must be under 500 lines AND under 5,000 tokens, measured rather than estimated near the ceiling — `shared/references/progressive-disclosure.md:13`, `shared/references/disclosure-optimization.md:48` #disclosure #budget
- [decision] References are justified only when the body approaches its ceiling, the extracted section exceeds roughly 250 tokens, and the pointer states the condition that fires it — `shared/references/progressive-disclosure.md:15`, `shared/references/disclosure-optimization.md:74` #disclosure #authoring
- [insight] A pull rate of zero splits two ways needing opposite fixes: `prune` when the body points at the file, `signpost` when nothing names it — so the prior fork's all-`prune` verdict means its pointers worked and its deferred content was never conditional — `shared/references/disclosure-optimization.md:61-62` #disclosure #diagnosis
- [problem] The prior fork deferred eight references off a body still inside the token budget, inverting both the body-at-ceiling justification and the extraction floor #disclosure #antipattern

### Layout and frontmatter

- [decision] A new user-invoked entry point ships as a skill directory rather than a `commands/` file, because both load identically and only the skill layout forecloses nothing — `shared/references/plugin-skills.md:60`, `skills/command-creator/SKILL.md:34` #commands #layout
- [fact] `disable-model-invocation: true` removes the description from context entirely, so such a skill cannot be triggered, cannot be truncated in the listing, and cannot steal a sibling's triggers — `skills/command-creator/SKILL.md:88` #frontmatter #invocation
- [constraint] Fail-open frontmatter fields lose their guardrail in any runtime that ignores them, so safety must also live in the body and in permission settings — `shared/references/portability.md:42-48` #frontmatter #portability
- [requirement] Environment-specific gotchas stay in the body rather than behind a pointer, the single place the disclosure rule inverts — `shared/references/progressive-disclosure.md:50` #disclosure #gotchas

### Licensing and controlled language

- [risk] The upstream `wait-what` artifact is MIT with a named copyright holder, so carrying its prose across verbatim attaches a notice obligation that a matching MIT licence does not discharge; paraphrasing avoids it #licensing #attribution
- [risk] ASD-STE100's approved-word dictionary is published under the specification owner's terms, so bundling the word list into a reference or asset directory is a licensing question rather than an authoring one #licensing #controlled-language

### Graph state and checkability

- [risk] The inverse edge to plugin-kit's ADR-001 on skill-creator merge-conflict resolutions is deferred rather than written, because creating it would count as editing a `decision`-type note and trip a blocking review gate; the relationship is recorded in prose only, so nothing in the graph expresses it #relations #deferred
- [insight] ASD-STE100 is only partly mechanically checkable — sentence length and approved-word lookup are scriptable, Technical Name and Technical Verb determination is domain judgement — mirroring plugin-kit's own validator-versus-reviewer split #controlled-language #tooling

### Standards gaps, tooling and conventions

- [problem] The standards contradict themselves on a bare top-level `version:` field: valid and not-to-be-flagged at `agents/skill-reviewer.md:69`, non-conformant noise at `shared/references/portability.md:86` #frontmatter #gap
- [fact] plugin-kit has no `skills/skill-creator/scripts/` directory and no `run-loop.ts`, but is not documentation-only: its executables live under `shared/`, grouped by function rather than load mode because none of it enters context — `agents/skill-reviewer.md:114` #tooling #provenance
- [constraint] A category prefix sets an observation's category rather than its observation-hood: a bullet parses as an observation wherever it sits, defaulting to category `note` when no prefix is present. The convention still holds — the prefix belongs only where an observation belongs, and a Blockers bullet is a status report about the work rather than an observation of the note's subject — but stripping a prefix recategorises rather than removes, and does not reduce the parsed count that governs the sub-grouping threshold #conventions #observation-parsing
- [problem] The discriminator deciding which bullets count as observations is unidentified, and two hypotheses are eliminated by measurement rather than by argument: stripping the category prefix recategorises to `note` without moving the total, and bolding the lead phrase does not decategorise either. Two candidates remain untested — a trailing `#tags` run, which every counted bullet in this note carries and no uncounted one does, and section position, since every uncounted bullet sits above `## Gaps` while every counted one sits in the last two content sections. Left open deliberately rather than for want of effort: the answer would change no action, because the prefix convention rests on the category-error argument and not on parser behaviour #conventions #open-question

## Relations
- relates_to [[SESSION-2026-08-23_01: Ask User Question Fresh Build]]
- pairs_with [[ANALYSIS-002: Evidence Rules From Measured Failures]]

<!-- The two-relation minimum is met as of the evidence-rules analysis landing in this project. A further edge, to plugin-kit's ADR-001 on skill-creator merge-conflict resolutions, is deferred by instruction because that note's type is decision. See Blockers. -->
- pairs_with [[ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill]]
- contains [[ANALYSIS-005: Monospace Decision Dialog Layout Rules]]
- contains [[ANALYSIS-004: AskUserQuestion Tool Capability Audit at Build 2.1.241]]
- contains [[ANALYSIS-006: Surface Portability of the Ask User Question Skill's Claims]]
