# Evaluating the replacement

The evaluation inputs are authored from the reviewed requirements. No retired
skill, reference, linter doctrine, or historical score is a baseline.

`evals.json` defines one multi-case next-action evaluation. `scenarios.json` gives
the same transcripts, evidence, and available tool contract to both arms:

- With skill: read the new skill and its relevant Codex reference.
- Baseline: use no skill guidance.

The outputs are simulated next actions and call arguments, not live questions.
Grade the assertion set against the complete output and record evidence for each
verdict. A single comparison is a diagnostic, not a measured effect size.

The static checks validate frontmatter, local links, core coverage, and the JSON
examples against each documented host's exposed fields. Run `bun run check`.

Automatic selection and live UI behavior are separate tests. This evaluation
does not prove that the skill loads automatically or that a host never expires a
question. Those claims require real tool-activity and delayed-response evidence.

Evaluation outputs belong under `work/`, outside the shipped skill. Preserve the
actual prompt, configuration, result, grading, and limitations for each run.
