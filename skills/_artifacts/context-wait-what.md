# Archived repair trigger: wait-what

Read on 2026-09-11. Source: /Users/peterkloss/Downloads/brain-main/skills/wait-what.zip.

SHA-256: f06c8080fd14f4ed52de0bf9f56d7189ce63037a7b805792ef151dfc7e50c1dd.

Both content files were read fully: SKILL.md:1-7 and agents/openai.yaml:1-5. macOS resource-fork metadata was excluded. Nothing was installed or invoked.

## What it does

The skill is an explicit user-triggered request to repair the last message. Its frontmatter disables model invocation, and the agent metadata also disables implicit invocation.

Its one instruction requests three changes:

- Supply the context the user lacks.
- Use ASD-STE100 Simplified Technical English.
- Use the project's vocabulary, following CONTEXT-MAP.md to the relevant CONTEXT.md when needed.

It refers to the last message generally, not only to a question. It does not name ask-user-question in either content file.

## What this establishes for the proposal

Peter reports that he uses this skill frequently when a question is hard to digest. It sometimes helps substantially and sometimes does not. That report establishes the experience; no conversation traces or evaluation results are supplied in this archive.

The text provides a broad repair signal and language directions. It contains no explicit diagnostic procedure for combined subjects, missing consequences, mistaken premises, an incomplete answer, or useful material outside the current question. This is an observed limit of the instructions, not proof that a model following them cannot perform those repairs.

A hypothesis to test: the broad rewrite helps when missing context or vocabulary causes the trouble; other failures need a targeted change to scope, evidence, options, or sequencing. Research on specific repair supports testing that distinction but does not establish why Peter's particular invocations succeed or fail.

## Integration boundary

- The user controls the explicit repair trigger.
- The question skill interprets a repair request as evidence that the current exchange needs repair, not as an answer or approval.
- It preserves the current question and previously settled parts, identifies what failed, and changes the relevant part of the question.
- The question skill also responds to ordinary expressions of confusion; correct repair should not depend on Peter remembering a command name.
- Whether to modify or consolidate wait-what itself is not decided or authorized by this archive review. Its general last-message scope is wider than question-only repair.

Proposed evaluation: supply the same wait-what request after a question with missing context, one with jargon, one with two decisions, and one with unclear option consequences. Check that the repair addresses each actual defect instead of merely shortening every question.
