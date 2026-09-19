# Archived consumer: idea-refine

Read on 2026-09-11 as reference material. Source archive: `/Users/peterkloss/Downloads/brain-main/skills/idea-refine.zip`. Extracted root: `/private/tmp/ask-user-question-context.w6SbT3/idea-refine/`. All file:line pointers below are relative to that root. No workflow or script was run.

## Explicit composition

`SKILL.md:6` explicitly calls the Skill tool for `brain:ask-user-question` before the first question and delegates every question's composition and delivery to it, one question at a time. `SKILL.md:70-81` repeats the call for sharpening questions, requires a recommended best guess, waits after each answer, and preserves confirmed intent from an `interview-me` handoff.

This is direct consumer composition, not evidence of automatic discovery or routing. The file requires the caller to invoke the named skill. The handoff at `SKILL.md:43-45` directs incoming confirmed intent from `interview-me` and outgoing chosen direction toward `writing-specs`; it does not establish that either transition happens automatically at runtime.

## Caller ownership

`idea-refine` owns the ideation goal, subject matter, sequencing, and final artifact: understand and expand, evaluate and converge, then produce a one-pager (`SKILL.md:12-16`, `SKILL.md:60-122`). It owns which questions matter: audience, success, constraints, prior attempts, and timing (`SKILL.md:70-81`). It scans a codebase when present (`SKILL.md:94`). Its framework and rubric references select thinking methods and evaluation criteria (`SKILL.md:96`, `SKILL.md:104-118`).

`frameworks.md:3` makes those methods selective. The available methods include reframing a problem, first-principles analysis, jobs to be done, imposed constraints, and pre-mortems (`frameworks.md:19-86`). The caller evaluates value, feasibility, and differentiation, distinguishes assumption severity, chooses directions, and scopes the MVP (`refinement-criteria.md:12-120`). These are domain decisions, not responsibilities assigned to question composition.

## Iteration, critique, and completion

The caller adapts to replies (`SKILL.md:62`), waits for the user's reaction before convergence (`SKILL.md:100`), and challenges weak ideas and hidden assumptions (`SKILL.md:111-118`). The first gate requires understanding the user and success criteria (`SKILL.md:79-81`). Final verification requires explored alternatives, validation strategies, explicit exclusions, an artifact, and user-confirmed direction before implementation (`SKILL.md:180-190`). The one-pager can still contain open questions (`SKILL.md:146-147`): completion is not equivalent to resolving every possible question.

## Persistence and extra topics

The caller owns the one-pager and asks before saving it (`SKILL.md:34-39`, `SKILL.md:152`). It also invokes `domain-modeling` immediately when a term is resolved or decision recorded, updating the glossary rather than waiting for the end (`SKILL.md:192-194`). This is a distinct persistence instruction, not work assigned to `ask-user-question`.

The final artifact records exclusions and open questions (`SKILL.md:133-150`), but the archive does **not** specify preserving useful tangents from a mixed reply and returning to the exact unanswered question. That new requirement should not be described as already implemented here. The optional script only ensures `docs/ideas` exists and emits status; it does not save decisions or conversation state (`scripts/idea-refine.ts:1-13`).

## Example inconsistency

The examples show several questions in one assistant response (`examples.md:30-36`, `examples.md:153-159`, `examples.md:199-205`) and plain-text questions without visible Skill calls (`examples.md:58`, `examples.md:225`). That conflicts with the explicit one-question composition rule if copied literally. These are illustrative examples, not execution traces; they do not prove actual tool use or successful automatic delegation. Their documented purpose is to teach rhythm and structure (`examples.md:3`), so the mismatch can influence a consuming agent.

## Full-reading coverage

Read every line of all five content files. Hidden-file inventory returned the same five files; no macOS metadata was included.

- `SKILL.md:1-194`
- `frameworks.md:1-99`
- `refinement-criteria.md:1-120`
- `examples.md:1-251`
- `scripts/idea-refine.ts:1-13`

Total: 677 lines. These are archived source facts, not verification of an installed skill or runtime behavior.
