# Replacement generation and verification

Status: generated, checked, and ready for human review. No publication or commit is claimed. Date: 2026-09-11.

## What changed

The current skill directory is a complete new implementation: SKILL.md and three
host references. The former five general references and examples.md are deleted.
Their number, organization, and content did not constrain the new design.

The body carries the complete shared workflow and all fifteen failure cases. Host
references exist because Claude Code, Codex, and Gemini CLI expose different tool
contracts. There is no extra examples file or general reference retained to match
the retired layout.

The old evaluation tree, including old skill snapshots and linter doctrine, is
removed. A new scenario packet, assertion set, validation script, and optional
Claude Code selection probe replace it. The Makefile and README now describe those
checks. The package adds Intent and YAML as development dependencies; the obsolete
tiktoken dependency is removed. A minor Changeset records the replacement.

## Checks

`bun run check` passes:

- Portable frontmatter and metadata shape.
- Bundled reference links and fifteen mapped failure examples.
- JSON examples checked against the selected host's exposed input fields.
- TypeScript checks for the maintenance scripts.
- Version consistency with the current unreleased package state, 0.1.6.
- Intent validation: one skill, no warnings.

The shared body remains under the prescribed 500-line generation limit. This limit
is an authoring constraint, not evidence of readability. No runtime script or Python
file is shipped inside the skill; it consists only of Markdown.

## Simulated behavior

The same six cases were given to a with-skill agent and a no-skill baseline. They
returned proposed next actions and tool-call arguments; no live question or
implementation action was performed.

Iteration 1 passed eight assertions in both arms. Independent review identified
imprecise evidence claims in the with-skill output. The body was sharpened to keep
claims within their source, and to organize multi-part questions visibly.

Iteration 2 includes ten assertions. Final grades:

- With skill: 10/10.
- Without skill: 9/10 after conservative root adjudication. The initial independent
  grade was 8/10; the alleged API-v1 overstatement was too ambiguous to establish a
  failure, so the original grade is preserved and the final grade credits it.

The confirmed difference is question organization. The with-skill titles contain
actual paragraph breaks after JSON decoding; the baseline titles are single
paragraphs. No user-comprehension gain is inferred from that formatting difference.
One sample per arm does not establish statistical significance, broad reliability,
or a stable improvement. Timing and token metrics were not captured and are not
invented.

Raw outputs, execution notes, grades, and comparison are in work/iteration-1 and
work/iteration-2. The official skill-creator viewer is generated at work/review.html.
Its Python generator is environment tooling, not a shipped project dependency.

## Automatic selection probe

Two separate Claude Code runs used only the new test plugin plus the CLI's built-in
skills. The copied test skill has a unique name so an installed older skill cannot
satisfy the check. Neither prompt names the skill.

- Mixed-reply coding task: the trace records Skill selecting the new test skill.
- General communication guide: no Skill call selects it.

The recorded model is claude-opus-5[1m]. Plugin and skill inventory are captured
with the raw event streams at work/trigger-2026-09-11T19-29-28.982Z. Built-in CLI
skills remain in the inventory; this is not a claim that the target was the only
skill visible. It is two successful probes, not an automatic-selection reliability
estimate or proof for Codex and Gemini.

## Remaining work

Human review of the new artifact and outputs comes next. Live host rendering,
delayed responses, cancellation, and cross-host selection still need separate
verification. The evidence-based waiting policy does not override a host timer
that the agent's tool cannot control.

The Brain skills' alignment wording is prepared, but their original archives and
installed sources were not changed by this replacement. Public release, remote
labels, and distribution operations have not been performed. The private manifest
is not a publishable npm library, so the scaffold's per-publishable-package mutation
does not apply here.
