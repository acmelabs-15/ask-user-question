# ask-user-question

A skill for preparing one useful question, interpreting its reply from evidence,
and repairing the exchange when understanding is incomplete.

The agent investigates what it can establish, presents the remaining user choice,
and preserves conditions, disagreements, and useful future topics. It waits for
the user without imposing a response deadline. The larger workflow keeps its own
scope, records, and completion rules.

## Skill files

- [Shared workflow](skills/ask-user-question/SKILL.md): preparation, language,
  visual organization, reply handling, and fifteen worked failure cases.
- [Claude Code](skills/ask-user-question/references/claude-code.md):
  `AskUserQuestion` and host auto-continue settings.
- [Codex](skills/ask-user-question/references/codex.md): synchronous and
  asynchronous question contracts.
- [Gemini CLI](skills/ask-user-question/references/gemini-cli.md):
  `ask_user` types, replies, availability, and cancellation.

This is a complete replacement. The former references, examples, and evaluation
scaffolding are removed. The new file layout follows the shared workflow and the
three distinct host contracts.

## Development and verification

```sh
bun install
bun run check
```

The check validates frontmatter, bundled links, failure-mode coverage, host JSON
examples, TypeScript, release-version consistency, and Intent's skill rules.

[Evaluation inputs](evals/README.md) cover next-action behavior without sending
live questions. Results compare the new guidance with a no-skill baseline.
`bun run scripts/probe-trigger.ts` runs two isolated Claude Code selection probes;
it uses the installed CLI and its configured model and writes evidence to `work/`.

Simulation, automatic skill selection, and live dialog behavior are different
checks. Passing one does not establish the others. Host references identify the
versions inspected and the live behavior that remains unverified.

## Design record

[Working state](skills/_artifacts/discovery-notes.md) records requirements,
decisions, research, and the Intent scaffold stages. The domain map, specification,
and file tree live beside it. These are development artifacts, not additional
runtime skills.

The package manifest is private and carries development dependencies and release
versioning. A visible skill change receives a Changeset; the release workflow
applies versions and publishes only after the normal repository review.

If you use an AI agent, run `npx @tanstack/intent@latest install`.
