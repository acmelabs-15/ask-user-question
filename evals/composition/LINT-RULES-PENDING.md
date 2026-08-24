# Inherited lint rules, and why they stayed quarantined

**Status: the re-derivation happened.** `checks.ts` now carries its own rules, derived from
this skill rather than inherited, and `make checks` verifies each fires on a broken call and
stays quiet on a correct one. What follows is why the inherited 32 were never wired up.

The composition eval's deterministic linter shipped 32 rules in the fork this repo was
ported from. Every one of them encoded a claim the old `SKILL.md` made, calibrated against
11 worked examples in that skill's `references/before-and-after.md`. Neither the skill nor
the corpus is in this repo: both are a later wave's deliverable.

Left wired up, those rules would grade a skill they were never derived from, and the score
they produced would look like a measurement. So they are inert:

| File | Status |
|:--|:--|
| `checks.quarantined.ts` | The 32 rules, byte-identical to the fork. Nothing imports it. |
| `checks.quarantined.test.ts` | Their corpus calibration, byte-identical. Nothing imports it. |
| `checks.ts` | The active rule set, re-derived from this skill. Same exported API. |
| `checks.test.ts` | Calibrates the active rules against a broken call and a correct one. |

Byte-identical matters for one practical reason: the `file:line` references below resolve
against `checks.quarantined.ts` exactly as they did against the original `checks.ts`.

`bun checks.quarantined.ts call.json` still works if you want to watch a rule fire. That is
the point of keeping them — they are the input to re-derivation, not dead weight.

## What the runner does with no rules

`checkCall` returns an empty array, so `scoreFindings` returns `1.00` for every input,
including a call with a defect under every rule below. The composition runner executes
normally and its deterministic arm scores a flat 1.00 across the board. **That number means
"nothing was checked".** Both `checks.ts` and `checks.test.ts` say so in their output.

## How to re-derive

Work from the new skill's own claims, not from this table. A rule belongs here only when the
skill states something a machine can settle — a count, a position, a membership test — and
when a corpus of worked examples exists to calibrate the threshold against. The two design
constraints the fork learned the hard way are worth carrying over even if no rule is:

1. **A check that fails the exemplars is the check's problem.** Several thresholds below sit
   deliberately looser than the skill's stated target (`description.long-sentence` fires at
   35 words against a stated target of 25) because the skill's own repaired examples ran to
   35 and they are the reference standard.
2. **Prefer under-flagging.** The register table was implemented as a documented subset, not
   a transcription, because the patterns that would catch the remainder also catch correct
   usage, and a linter people learn to ignore is worse than a missing check.

## The 32 rules

All line numbers are in `checks.quarantined.ts`.

### Call shape

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `call.question-count` | 165 | A call carries 1 to 4 questions, the schema cap. |
| `call.multi-question` | 167 | Warn on more than one question per call: legal, but host handling is thin and dependent questions cannot share a call. |
| `call.multiselect-implicit` | 173 | `multiSelect` is set explicitly, since it is required in at least one host and optional in others. |

### The question string

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `question.missing` | 185 | Question text is present. |
| `question.duplicate` | 187 | No two questions share text, since it is the answer-map key and a duplicate is rejected. |
| `question.no-mark` | 192 | The question ends in a question mark. |
| `question.multi-sentence` | 194 | At most 2 sentences; background belongs in the prose before the call. |
| `question.too-long` | 197 | At most 25 words. |
| `question.plan-reference` | 199 | No reference to "the plan" or "my plan", which the user cannot see in plan mode. |

### The header

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `header.missing` | 202 | A header is present. |
| `header.too-long` | 204 | At most 12 characters, because it renders as a tab chip. |

### Options and labels

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `options.count` | 208 | 2 to 4 options, the schema cap. |
| `options.duplicate-label` | 213 | No two labels match after normalising away the marker and trailing punctuation. |
| `label.missing` | 242 | A label is present; it is the only text guaranteed to be read. |
| `label.meta` | 245 | The label names the consequence, not the dialog's mechanics. Matched against a 30-entry set (`yes`, `no`, `cancel`, `proceed`, `option a`, …) on the *whole* normalised label, never as a substring — substring matching flagged `Skip the migration and backfill later`, a good outcome label starting with a banned word. Set at lines 64-70. |
| `label.too-short` | 247 | At least 3 words; 3 to 7 names an outcome. |
| `label.too-long` | 248 | At most 7 words, past which it stops being scannable. |
| `label.too-wide` | 250 | At most 45 characters including any marker. |

### The recommendation

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `recommend.absent` | 221 | Exactly one option carries the literal `(Recommended)`; if the options are genuinely equivalent, the question text says so. |
| `recommend.multiple` | 223 | Not more than one option is marked. |
| `recommend.not-first` | 224 | The marked option is in first position. |

### Previews

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `preview.on-multiselect` | 229 | No previews on a `multiSelect` question, where they are silently discarded. |
| `preview.partial` | 231 | Previews are all-or-nothing across a question's options. |

### Descriptions

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `description.empty` | 253 | A description is present. |
| `description.restates` | 255 | Over 4 words. In the fork's corpus no working call had a description under 18. |
| `description.thin` | 258 | At least 18 words; 5 to 17 usually meant the question should not be asked at all. |
| `description.bloated` | 261 | At most 45 words, past which it is background belonging in the prose. |
| `description.too-many-sentences` | 264 | At most 4 sentences. |
| `description.long-sentence` | 272 | No sentence past 35 words, against a stated target of 25. The gap is deliberate: three of five repaired exemplars ran 30 to 35. |
| `description.no-cost` | 277 | Every description carries either a figure (`HAS_NUMBER`, line 133) or a named consequence (`HAS_CONSEQUENCE`, lines 134-135: breaks, blocks, fails, loses, deletes, downtime, rollback, cannot, …), so it states a cost. `no` and `none` were excluded from the number set on purpose — with them in, `No caching` passed while its sibling `Add caching` failed, which is backwards. |
| `description.echoes-label` | 287 | For descriptions under 18 words, under 60% of the label's content words reappear — otherwise the description is the label again with padding. |

### Register

| Rule id | Line | What it asserted |
|:--|:--|:--|
| `register.banned` | 302 | Neither the label nor the description matches any of 23 word-boundary patterns (table at lines 93-123): `simply`, `obviously`, `of course`, `should be fine`, `hopefully`, `handle`/`deal with`/`address`/`manage`, `properly`/`correctly`/`appropriately`, `robust`/`cleaner`/`more maintainable`/`better`, unquantified plurals, `etc.`, `and so on`, `leverage`/`utilize`, `as discussed`/`mentioned`/`noted`, `discussed above`/`earlier`, `the above option`/`one`/`file`, `i think`/`i believe`/`in my opinion`/`it seems`, `note that`/`it's worth noting`, `might be able to`/`might potentially`, `performant`. Label and description are scanned independently — folding them together made a banned construction in the label invisible whenever the description happened to contain any other one. |

### Not a rule, and kept live

| Name | Line | Why it is not quarantined |
|:--|:--|:--|
| `parallelismDiagnostic` | 312 | Emits the first sentence of each description for a human to compare. It was deliberately never a pass/fail: every lexical proxy for "do these compare on the same axis" produced false failures on the fork's own worked examples. It asserts nothing, so it carries no doctrine, and it is live in `checks.ts`. |

### Scoring

`scoreFindings` (line 332) is ported live because it is arithmetic, not doctrine. An error
costs `1/optionCount` and a warning `0.35/optionCount` — normalised, so a 4-option call is
not scored worse than a 2-option one for the same defect rate, and one error per option is
always 0.00 whatever the call's size. The weights are worth revisiting alongside the rules.
