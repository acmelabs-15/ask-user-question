---
title: "ANALYSIS-002: Evidence Rules From Measured Failures"
type: analysis
status: ACCEPTED
permalink: analysis/analysis-002-evidence-rules-from-measured-failures
tags:
- analysis
- evidence
- epistemics
- premise-correction
- measurement
---

# ANALYSIS-002: Evidence Rules From Measured Failures

> Every rule below is derived from a failure that occurred during the 2026-08-23 session, not from theory. Each names a specific way a confident claim was produced without evidence, and each cost real work to discover.

## Context

Four separate premises were corrected during a single session. That rate is the reason this note exists: the failures were not careless, they were plausible inferences drawn from real evidence that did not support them. A rule derived from a mistake someone actually made is worth more than a rule derived from principle, because it names the shape the mistake takes when it looks reasonable.

These rules govern what counts as evidence in this project. They are deliberately narrow — each one closes a specific hole that was walked into.

## Executive Summary

Four rules. The first three came from failures in the measurement work; the fourth came from a reporting failure in the session's own coordination.

A flag reporting success is not evidence it took effect, and reading its documentation is not observing the effect. A relayed claim is weaker than its source, and a claim generalised past its original scope is not evidence at all. A differential test must run in the configuration where the variable is actually in play. And a selectively quoted measurement is a false claim, even when every quoted number is accurate.

The common structure is that in each case something *was* observed — help text, a true finding, four clean runs, two real numbers — and the error was in what was inferred from it rather than in the observation. That is why none of these are caught by being more careful about data collection.

## Approach

Each rule is stated with the incident that produced it, because the incident is what makes the rule legible. A rule like "verify your assumptions" is unactionable; "the help text was accurate and the inference from it was wrong" tells you what to look for.

## Findings

### Rule 1: A flag reporting success is not evidence it took effect, and reading its documentation is not observing the effect

The sharp case is `--bare`. Its help text states that "Skills still resolve via `/skill-name`". That sentence is accurate. The inference drawn from it — that the flag therefore leaves the skill inventory intact — was wrong.

What it actually means is that skills remain *resolvable by explicit name*, which is a different property from being *present in the router's inventory*. A skill can be reachable when typed and absent from the set the model selects among. Only a measurement settled which of those `--bare` produced.

The general failure: documentation describes a mechanism, and a mechanism supports more than one behavioural conclusion. Reading it carefully is not a substitute for observing the effect, and a flag that exits zero has told you nothing about whether it changed the thing you cared about.

### Rule 2: A relayed claim is weaker evidence than its source, and a claim generalised past its original scope is not evidence at all

Four premises were corrected in one session. Three of them began life as a *true* finding about one file, and became false when generalised to a repository.

That is the dangerous shape, because the origin is sound. Nobody invented the finding; someone observed it correctly at one scope and it was then restated at a wider one, at which point it was no longer supported by the observation behind it. Each relay hop also strips the qualifications that made the original true.

The consequence worth recording: one such generalised claim reached the knowledge graph as recorded history before anything checked it. Once a claim is written into a durable note it stops looking like a claim and starts looking like history, and the cost of correcting it rises sharply.

### Rule 3: A differential test must run in the configuration where the variable is actually in play

Four runs in ordinary mode showed a flag having no effect on model selection. The conclusion drawn — that the flag does nothing — was the opposite of the truth.

The flag overrides a setting that is not honoured in ordinary mode at all. With the setting inert, the flag had nothing to override, so four clean runs correctly measured no difference and supported a false conclusion. The differential appeared only under `--bare`.

Four consistent runs are not evidence of no effect if the mechanism under test is disabled in the configuration being tested. Establish that the variable is live before concluding from its absence, and prefer testing the configuration where it matters first rather than the convenient one.

### Rule 4: A selectively quoted measurement is a false claim

Two lost judge dimensions were cited as a regression. Both numbers were accurate. The claim was still false, because the same record showed the skill winning four of six dimensions, and neither of the two losses has an established noise floor.

Quoting the two losses without the four wins, and without the absence of a noise floor, produced a narrative the record does not support. No number was fabricated and nothing was misread — the falsehood was constructed entirely from true figures by choosing which to mention.

This is the rule most likely to be broken while feeling rigorous, because citing specific measured values feels like the opposite of hand-waving. A measurement quoted without its comparison set and its uncertainty is an assertion wearing a number's clothing.

## Recommendations

1. Treat a flag as unverified until its effect is observed, not until its documentation is read and it exits zero (Rule 1).
2. Carry the scope with the claim. When restating a finding, state the scope it was established at, and treat any widening as a new claim needing its own evidence (Rule 2).
3. Before writing a claim into a durable note, check whether it has been verified or only relayed (Rule 2). A note converts a claim into apparent history.
4. Establish that the variable is live in the tested configuration before concluding from a null result (Rule 3).
5. Quote a measurement with its comparison set and its uncertainty, or do not quote it as evidence (Rule 4).

## Observations

- [constraint] A flag reporting success is not evidence it took effect, and reading its documentation is not observing the effect #evidence #flags
- [insight] The sharp case: `--bare`'s help text says "Skills still resolve via /skill-name", which is accurate, while the inference drawn from it was wrong — it means resolvable by explicit name, not present in the router's inventory, and only a measurement settled it #evidence #bare
- [constraint] A relayed claim is weaker evidence than its source, and a claim generalised past its original scope is not evidence at all #evidence #relay
- [fact] Four premises were corrected in one session, three of which began as a true finding about one file and became false when generalised to a repository #premise-correction #scope
- [problem] One such generalised claim reached the knowledge graph as recorded history before anything checked it, and a durable note converts a claim into apparent history #graph-integrity #unverified
- [constraint] A differential test must run in the configuration where the variable is actually in play #evidence #differential
- [insight] Four runs in ordinary mode showed a flag having no effect on model selection because the setting it overrides is not honoured there at all; the differential appeared only under `--bare`, so testing the ordinary path first gave the opposite conclusion #differential #null-result
- [constraint] A selectively quoted measurement is a false claim, even when every quoted number is accurate #evidence #selective-quotation
- [problem] Two lost judge dimensions were cited as a regression without mentioning the skill won four of six in the same record, and that neither loss has an established noise floor #selective-quotation #regression-claim
- [insight] In all four rules something genuine was observed — help text, a true finding, four clean runs, two real numbers — and the error lay in the inference rather than the observation, which is why none of them are caught by more careful data collection #evidence #inference

## Relations

- caused_by [[SESSION-2026-08-23_01: Ask User Question Fresh Build]]
- pairs_with [[ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin]]
