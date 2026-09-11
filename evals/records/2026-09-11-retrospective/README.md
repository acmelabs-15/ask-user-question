# Retrospective capture of completed evaluations

These evaluations ran before their results and implementation changes were committed.
That was a process failure. This commit preserves the available evidence now; it does
not claim the required test → results commit → change commit sequence occurred.

## Available evidence

- Iteration 1: both raw outputs, execution notes, eight-assertion input, grading,
  comparison, and review metadata.
- Iteration 2: both raw outputs, ten-assertion input, initial and adjudicated grades,
  comparison, benchmark data, and review metadata.
- Claude Code selection probes: exact prompts, raw event streams, model/inventory
  summaries, and the plugin/skill snapshot actually used.
- The generated review page.
- Current scenario inputs, scripts, dependency manifest/lockfile, and skill files,
  explicitly captured retrospectively.
- SHA-256 and byte count for every captured file in manifest.json.

## What the results establish

Iteration 1 passed 8/8 assertions in both arms. The independent review found evidence
wording worth tightening. The replacement then received an evidence-scope clarification
and more explicit paragraph organization guidance before the second round.

Iteration 2's final scores are 10/10 with the skill and 9/10 without it. The initial
baseline grade was 8/10. Root review conservatively changed one ambiguous evidence-scope
failure to pass; both versions are preserved. The confirmed difference is question
organization, not demonstrated user comprehension or reliable superiority.

The two separate Claude Code probes selected the new test skill for the positive case
and did not select it for the negative case. The captured plugin is the only explicit
plugin in those runs; built-in CLI skills remain visible. The recorded model is
claude-opus-5[1m]. This is not cross-host selection evidence.

## Gaps that cannot be repaired retrospectively

- No immutable source snapshot was captured before behavior iteration 1.
- Behavior agents' exact model IDs, full execution traces, token use, and timing were
  not recorded. Do not fill them with guesses or zeros.
- The current skill is byte-identical to the captured selection-probe skill after
  reversing its one-line test-name change. That establishes those bytes, not a missing
  chronological commit boundary.
- No live question rendering, user delay, cancellation, or host configuration test ran.

The human-facing next-actions.md files and viewer were generated after the model runs
from their raw JSON. They are presentation material, not the original model output.

This directory is immutable evidence after capture. Corrections belong in an additional
dated note or a new round. The next implementation commit records the current changes
and rationale; later rounds must reference committed inputs before they begin.
