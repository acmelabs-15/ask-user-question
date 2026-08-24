---
title: "ANALYSIS-007: Reference Ablation Ground Truth"
type: analysis
status: ACCEPTED
permalink: analysis/analysis-007-reference-ablation-ground-truth
tags:
- analysis
- ablation
- progressive-disclosure
- measurement
- ground-truth
---

# ANALYSIS-007: Reference Ablation Ground Truth

> Every attribution below was produced by removing a file and re-running, never by reading a scenario and judging which file it ought to need. Where removal changed nothing, the finding reads undetermined rather than guessing.

## Context

The skill ships six bundled reference files, roughly 900 lines in total. The question that had gone unanswered all session was whether they earn that. Raw pull rate cannot answer it: a file that is never opened is either rarely needed or needed and missed, and from the pull side those two look identical. Hand annotation cannot answer it either, because the annotation is a judgement about which file a scenario ought to need, and that judgement is precisely the thing in doubt.

Ablation answers it by inverting the question. A scenario needs file X if removing X drops its assertion score. Nothing is annotated and nothing is adjudicated; the ground truth falls out of an outcome that was already being measured. The method was designed at Event 79 of the session ledger, where the passive form of the same idea had just retired the annotation as a bottleneck: across the four scenarios annotated as needing the wording reference, runs that read it passed 86.7% of assertions and runs that did not passed 51.4%. The passive form only works where the model happened to be inconsistent. The rigorous form is ablation.

The design fork was settled by the owner at Event 82. Removing the six files leaves six pointers in SKILL.md aimed at nothing, and a model that attempts a read and gets an error is in a different condition from one never offered the content at all. The ruling was to strip the files **and** their pointers, on a copy, with the pointer prose re-worded rather than line-deleted, so the shipped artifact was never touched. Both arms ran concurrently rather than sequentially, so API drift reached both equally — running them one after the other would have let drift land on whichever arm went second, which is the error the placement A/B at Event 79 was designed around.

One confound was cleared before the run rather than after: no expectation in the 27 scenarios names a bundled file, checked across all 262 assertions. Stripping references therefore cannot fail a scenario for the trivial reason that an assertion asked for a file that is no longer there. The arm measures whether the content was needed.

## Executive Summary

Every one of the six bundled files is causally needed by at least one scenario. That is the ablation-grade answer to whether roughly 900 lines across six files earn their existence, and it is the first answer this project holds that does not rest on judgement.

Stage 1 removed all six files and their pointers at once. Assertion pass rate fell from 82.4% on the control arm to 72.5% on the stripped arm, on sonnet. Fifteen scenarios dropped more than five points; six were flat in both arms and stand as validated negatives.

Stage 2 removed one file at a time, against only the candidates stage 1 implicated. Ten scenario-file attributions reproduced, one of them partial with residue still open, and three candidates were refuted outright and are held as undetermined rather than reassigned by guesswork.

Sixteen rows of the disclosure eval set now carry `expects_references` derived from outcome — ten attributions plus six negatives. Eleven rows remain absent, which the schema distinguishes from empty by design.

## Approach

Two stages, both run against copies built from the shipped skill, never against the shipped tree.

**Stage 1** stripped all six reference files and their pointers and ran the full 27-scenario set on sonnet, control and stripped arms concurrent at ten workers each. The control arm carries six samples per scenario and the stripped arm four.

Those sample counts have a history worth recording, because it is the reason they are not two and two. The first control/stripped pair was ruled interrupted on session resume and rerun: the two arms reported different assertion denominators over an identical scenario set, which read as the partial-run signature. Per-run inspection afterwards disproved that. All 54 runs in both quarantined arms carried full grading and summed to 262 assertions each; the apparent mismatch came from a counting rule that excludes runs whose body loaded via file Read rather than the skill system, and the results file had already named the cause in a field that went unread. The rerun stood on the owner's ruling, and the proven-complete pair was then folded in by owner decision at Event 86 as extra samples. A stored earlier sonnet sweep supplies the sixth control sample and is the only source of an estimate of the control arm's own run-to-run variance, which is what decides whether a scenario has genuinely dropped or merely moved within noise.

**Stage 2** built six variants from the shipped skill, each removing exactly one file and its pointers, with the pointer prose re-worded rather than line-deleted per the Event 82 principle. Every edit asserted exactly one match and every variant was swept for residual mentions of the removed filename. Fifteen scenario-variant pairs ran across 30 runs, six arms concurrent at three workers each. The completeness gate passed on all six arms: 30 of 30 runs, every one skill-delivered, zero file-loads, install state absent — the cross-arm check the interrupted-pair episode taught.

Candidate assignment for stage 2 was judgement, and was labelled as such at the time. The `expects_references` field existed in the schema and no eval row declared it, so candidates were re-derived from the scenario prompts against each reference's stated job. Stage 2 exists to replace that judgement with outcome, and it did — including by refuting three of the assignments.

## Findings

### Finding 1: Removing all six references costs about ten points of assertion pass rate

On skill-delivered runs the control arm passed 82.4% of assertions and the stripped arm 72.5%. Fifteen scenarios dropped more than five points against the control mean.

The drop map measures **content need**, not pointer health, and one anomaly makes that distinction concrete: first-call-in-a-new-vocabulary scored twenty points *higher* without references. That is consistent with the Event 79 finding that sonnet never reaches the wording reference on that scenario — a file the model does not open cannot be helping it, so its removal cannot hurt.

Two scenarios that had looked like drops at the smaller sample dissolved once the folded samples arrived, and one high-variance scenario returned to the dropped list. Both movements are the expected behaviour of a two-sample estimate meeting more data, and both are the reason the fold-in was worth taking.

### Finding 2: Six scenarios need nothing, and the negatives are validated by outcome

Six scenarios sat flat with and without references: approval-widened-past-its-words, clean-answer-opened-a-fork, free-text-names-a-fifth-option, just-show-me-a-finished-call, sentry-dsn-not-in-repo, and which-of-the-three-shapes. Validating the negatives by outcome rather than by judgement was stage 1's second purpose, and it delivered it as a by-product.

The caveat is real and is carried rather than buried: all six sit at or near 1.00 in **both** arms. A scenario already at ceiling cannot demonstrate a drop, so what the data supports is that the body alone suffices for these on sonnet — not that a reference could never help them on a harder variant or a different tier. By the outcome definition, a pull on one of these six reads as over-fetch even where the scenario was originally designed around a reference.

### Finding 3: Ten scenario-file attributions reproduce under single-file removal

Removing the candidate file alone lands the score at or near the all-stripped floor in each case below.

| Scenario | File attributed | Control | Single-file removed | Note |
|:--|:--|--:|--:|:--|
| layout-choice-migration-steps | `layout.md` | 0.90 | 0.80 | all-stripped floor 0.75 |
| prepush-checks-in-question | `layout.md` | 0.67 | 0.42 | partial — see Finding 4 |
| description-will-not-shorten | `wording.md` | 0.93 | 0.70 | |
| defend-rewrite-to-its-author | `wording.md` | 0.20 | 0.10 | weak — control itself low |
| reader-says-it-depends | `failed-question.md` | 0.43 | 0.10 | clean two-candidate discrimination |
| multiselect-empty-and-parsing | `reading-answers.md` | 0.97 | 0.80 | |
| notes-only-sentinel | `reading-answers.md` | 1.00 | 0.70 | |
| reask-after-the-options-moved | `asking-again.md` | 0.87 | 0.60 | |
| third-call-of-an-open-run | `asking-again.md` | 0.93 | 0.60 | |
| measure-a-draft-against-a-good-one | `examples.md` | 0.80 | 0.60 | |

The two-candidate design paid off once, and it is the cleanest single result in the set. reader-says-it-depends carried two candidates: it reproduces under the minus-failed-question arm at 0.10 and shows nothing under the minus-reading-answers arm at 0.60. One file is implicated and the other is excluded, from the same scenario, in the same sweep.

One attribution is flagged as weak in the table rather than presented alongside the others. defend-rewrite-to-its-author moves from 0.20 to 0.10, which is a reproduction in direction but on a control that is already close to the floor; there is very little room between the arms for the effect to live in.

**Refined 2026-08-24, later the same day: the examples.md attribution is a bundle, not the file.** A follow-up A/B on the measure-a-draft route found examples.md read on 0 of 20 shipped-form runs and 0 of 20 under an imperative in-workflow pointer — 0 of 42 cumulative across every sonnet sweep. A file that is never read cannot have supplied the content whose removal dropped this scenario. The minus-examples variant removed the file AND the pointer-section prose around it, and that section carries teaching content of its own, so the attribution belongs to the file-plus-prose bundle, with the body prose as the plausible carrier on sonnet. The table row stands as the bundle's attribution; the file-alone reading is withdrawn for this scenario on this tier. The file's demonstrated consumer remains the stronger tier, where its recall is 100%.

### Finding 4: One attribution is partial, and its residue stays open

prepush-checks-in-question does not resolve to a single file. Its minus-layout arm lands at 0.42, between a control of 0.67 and an all-stripped floor of 0.25, while its other candidate was refuted — the minus-examples arm scored 0.83, above control. The layout reference is causally implicated and is declared; the residue is not explained by it.

The arithmetic is the point. This was the largest stage-1 drop at −42 points, and one file's removal accounts for roughly half of it. A drop that size is more than one file's worth, and the remainder is recorded as open rather than assigned to the nearest plausible candidate.

### Finding 5: Three candidates are refuted, and are held as undetermined

Three assigned candidates did not reproduce, and none of them was reassigned:

- **three-words-one-concept** under minus-wording scored 0.40, exactly its control. This is the expected result rather than a surprising one: Event 79 established that sonnet never reads the wording reference on this scenario, and removing what is never read changes nothing. The scenario dropped 20 points in stage 1, so it needs *something*; the wording reference is not shown to be it.
- **reader-says-options-are-the-same** under minus-failed-question scored 0.80, above its control.
- **timeout-with-partial-selection** under minus-reading-answers scored 1.00 — perfect without the file.

Two further scenarios were held out of stage 2 entirely because no plausible candidate existed: off-by-one-already-fixed and no-tool-in-this-context, whose subject matter is body content rather than any bundled file. They escalate to a wider ablation only if the open residue elsewhere warrants it.

### Finding 6: Every one of the six files is load-bearing for at least one scenario

| Reference | Scenarios that need it, by outcome |
|:--|:--|
| `layout.md` | layout-choice-migration-steps; prepush-checks-in-question (partial) |
| `wording.md` | description-will-not-shorten; defend-rewrite-to-its-author |
| `failed-question.md` | reader-says-it-depends |
| `reading-answers.md` | multiselect-empty-and-parsing; notes-only-sentinel |
| `asking-again.md` | reask-after-the-options-moved; third-call-of-an-open-run |
| `examples.md` | measure-a-draft-against-a-good-one |

No file is unattributed. The set earns its existence, and so does each member of it.

### Finding 7: The corpus now carries derived ground truth

Sixteen rows of `evals/composition/disclosure-evals.json` now declare `expects_references`: ten derived attributions and six negatives. Eleven rows are left absent, and the schema distinguishes absent from empty by design — absent declares nothing about the row, empty declares that the row should reach no reference at all. Collapsing the two would have converted eleven unanswered questions into eleven false negatives. The annotated set validated through the scenario-set schema in the plugin-kit toolkit with zero findings, and landed at commit `fce4f2a`.

### Finding 8: What the numbers do not support

Stage 2 runs at two samples per cell. No individual cell is powered, and none of the ten attributions would survive being quoted alone as a measured effect.

What makes the set believable is agreement rather than power: nine of the ten reproductions point the same direction as the folded stage-1 drop for the same scenario, and stage 1 carries six and four samples per scenario rather than two. The stage-2 cells are corroboration of a direction already measured at a larger n, not independent evidence of it.

The other limits worth carrying forward: the six negatives sit at ceiling in both arms and so cannot demonstrate need under any design that measures need as a drop; the defend-rewrite-to-its-author attribution rests on a control near the floor; prepush-checks-in-question is explained only in part; and every figure in this note is sonnet, which the session established is the detection tier because the two model tiers fail in opposite directions.

## Recommendations

1. Treat the six-file bundle as justified and stop re-litigating its size. The question "do roughly 900 lines across six files earn their existence" is answered by outcome, and the answer is yes for every file (Finding 6).
2. Quote stage-2 cells as a corroborated set, never individually. A single cell at n=2 is not evidence of an effect, and citing one alone would repeat the selective-quotation failure this project already documented (Finding 8).
3. Leave the three refutations and the two held-out scenarios as undetermined in the corpus. They are open questions with a known cost to close, not gaps to be filled by the nearest plausible candidate (Finding 5).
4. Close the prepush-checks-in-question residue before treating the attribution map as complete. Roughly half of the largest measured drop is still unaccounted for, and it is the one place where a second file is likely in play (Finding 4).
5. Re-derive any negative on a harder variant or a stronger tier before relying on it. A ceiling-bound flat result is consistent with "the body suffices here" and with "this design cannot see the effect", and the six negatives do not distinguish those (Finding 2).
6. Prefer ablation over annotation for any future ground-truth question of this shape. It costs a sweep and returns an answer that needs no adjudication, and stage 2 refuting three of its own assigned candidates is the evidence that the judgement it replaces was worth replacing (Context, Approach).

## Erratum (2026-08-24)

Dated correction, recorded beside the record. The pre-registered content-boundary experiment (session Events 112-116) ran the split the Finding 3 refinement called for, on the 0.1.3 base at n=10 per arm: A shipped 0.700, B teaching-prose-removed 0.740, C file-and-pointers-removed 0.720, completeness gates clean on all three arms.

- **The measure-a-draft examples attribution is withdrawn on the current base.** Neither the teaching prose nor the file carries the scenario: all three arms lie within 4 points, against the registered 15-point threshold. The stage-2 cell (0.80 to 0.60 at n=2, pre-ToC base) is outweighed at five times the sample; whether it was noise or the base drift (ToC blocks, trims) dissolved the need cannot be separated from this data. Finding 8's warning that no stage-2 cell stands alone is vindicated on its own note.
- **The corpus row is now an outcome-derived negative by owner ruling** (2026-08-24, "Needs no file"): `expects_references: []` on measure-a-draft-against-a-good-one, validated through the scenario-set schema. The live map is nine attributions and seven negatives; Finding 6's examples row and Finding 7's ten-plus-six counts read as of stage 2.
- **The tier caveat stands and is the guard**: the file's demonstrated consumer remains the stronger tier, where its recall is 100%. A sonnet-only sweep reading examples.md as unread-and-undeclared must not license deletion.
- The dead route also extends: 0 reads on this scenario in 20 further runs across the arms carrying the file.

## Observations

- [technique] Ablation derives reference need from outcome rather than judgement: a scenario needs file X if removing X drops its assertion score, which sidesteps both the pull-rate ambiguity and the annotation bottleneck #ablation #method
- [problem] Raw pull rate cannot separate rarely-needed from needed-and-missed — a file that is never opened looks identical in both cases from the pull side #pull-rate #ambiguity
- [decision] The owner settled the stage-1 design fork by stripping the files AND their pointers on a copy, because a model that attempts a read and gets an error is in a different condition from one never offered the content #ablation-design #confound
- [decision] Both arms ran concurrently rather than sequentially so API drift reached both equally; sequential arms would have let drift land on whichever arm ran second #experiment-design #drift
- [fact] Stage 1: removing all six bundled files and their pointers moved assertion pass rate from 82.4% control to 72.5% stripped on sonnet, at n=6 control and n=4 stripped samples per scenario #stage-1 #headline
- [fact] Fifteen scenarios dropped more than five points in stage 1 and six were flat in both arms, validating the negatives by outcome with no judgement involved #stage-1 #negatives
- [constraint] The six flat scenarios sit at or near 1.00 in both arms, so a ceiling-bound design cannot demonstrate need there — the data supports "the body suffices on sonnet", not "a reference could never help" #negatives #ceiling
- [outcome] Stage 2 produced ten causal attributions under single-file removal, covering all six bundled files, so every file is load-bearing for at least one scenario #stage-2 #headline
- [insight] The two-candidate design paid off on reader-says-it-depends: it reproduces under minus-failed-question at 0.10 and shows nothing under minus-reading-answers at 0.60, implicating one file and excluding the other in the same sweep #stage-2 #discrimination
- [problem] prepush-checks-in-question resolves only in part — minus-layout lands 0.42 between control 0.67 and floor 0.25 while minus-examples is refuted at 0.83, so roughly half of the largest stage-1 drop is still unexplained #residue #open
- [fact] Three assigned candidates were refuted and held as undetermined: three-words-one-concept under minus-wording at 0.40 exactly its control, reader-says-options-are-the-same under minus-failed-question at 0.80, timeout-with-partial-selection under minus-reading-answers at 1.00 #refutation #undetermined
- [insight] The three-words-one-concept refutation was predicted rather than surprising: sonnet never reads the wording reference on that scenario, and removing what is never read changes nothing #refutation #never-read
- [outcome] Sixteen rows of the disclosure eval set now carry `expects_references` — ten derived attributions plus six negatives — with eleven left absent; the schema distinguishes absent from empty so eleven open questions did not become eleven false negatives #corpus #schema
- [risk] Stage 2 runs at n=2 per cell and no cell is powered; the reproductions are believed because nine of ten agree with the folded stage-1 direction measured at larger n, not because any single cell stands alone #power #limits
- [insight] The first stage-1 pair was ruled interrupted and rerun, then proven complete by per-run inspection and folded in by owner decision — the apparent denominator mismatch was a counting rule excluding file-loaded runs, already named in a results field that went unread #forensics #false-signal

## Relations

- caused_by [[SESSION-2026-08-23_01: Ask User Question Fresh Build]]
- pairs_with [[ANALYSIS-002: Evidence Rules From Measured Failures]]
- relates_to [[ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill]]
- relates_to [[ANALYSIS-006: Surface Portability of the Ask User Question Skill's Claims]]
