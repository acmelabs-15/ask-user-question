---
title: "ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill"
type: analysis
status: DRAFT
permalink: analysis/analysis-003-coverage-check-against-the-retired-asking-users-questions-skill
tags:
- analysis
- coverage
- skill-authoring
- gap-analysis
- ask-user-question
---

# ANALYSIS-003: Coverage Check Against the Retired Asking Users Questions Skill

> A coverage check, not a port. The question is whether the new skill is *silent* on
> something real — not whether text was carried across. No text was, deliberately.

## Context

The retired `asking-users-questions` skill is 1,538 lines across a body and four
references. The replacement `ask-user-question` skill is 729 lines across a body and
three references. Most of that gap is consolidation. This note establishes which part of
it, if any, is loss.

A prior pass ran plugin-kit's `synthesize-scenarios --inventory-only` against both
skills, which derives what an artifact does from its structure without reading its
description. At section granularity 15 of the old skill's 16 capabilities map onto the
new one, with `The question that is not the first question` the sole unmapped section.
Section granularity is too coarse to settle the question: a section can map by title
while having dropped several of its rules. This note is the rule-by-rule pass, read
directly from both skills rather than relayed, per the source-over-relay rule in
[[ANALYSIS-002: Evidence Rules From Measured Failures]].

## Executive Summary

**Eleven real gaps, of which seven are strong.** That is fewer than a section-level read
suggests and more than the single unmapped section implies, because the losses are
distributed across sections that map cleanly by title.

The strongest gap is not one anyone had named: the new skill's Section 1 decides whether
to ask on a purely *epistemic* test — can you settle it from available evidence — and
drops the old skill's *consequence* test, where reversibility breaks the tie and a
one-way door earns a question even when you are confident. On a confident-but-irreversible
call the two skills give opposite verdicts.

Two candidates from the prior shallow read do not survive, and one is weaker than
claimed. Against that, two gaps nobody had named do survive. Seven of the eleven are
body-shaped and would cost roughly 300 to 340 tokens in total, which fits the reported
headroom; the remaining four are reference-shaped and land in files that a disclosure
measurement found were opened zero times across 24 runs.

## Approach

Both skills were read in full — 9 files, 2,267 lines — and every rule in the old skill
was extracted and checked against the new body and its three references. Each claimed
absence was then verified by grep across the new skill rather than from recall, because
a rule can be present under different words in a section that does not announce it.

Every finding is sorted into exactly one of three buckets: a real gap, a deliberate
exclusion named by the new skill's `description` frontmatter, or the same need covered
differently. The bucket-1 list is deliberately not padded — a padded gap list smuggles
the retired content back under a false label, which inverts the intent of the rebuild.

## Findings

### The three buckets

| Bucket | Count | What it means |
|---|---|---|
| Real gap | 11 (7 strong, 4 weaker) | Old covers it; new addresses it nowhere; a user with that need has no guidance |
| Deliberate exclusion | 6 groups | The new skill's `description` excludes it by name |
| Covered differently | ~40 rules | Same need, different words or structure, or in a reference rather than the body |

### Bucket 1: real gaps, ranked

**1. Reversibility as the ask-or-decide tiebreaker.** The old body weighs the cost of
asking against the cost of a wrong assumption and lets reversibility break the tie: a
change you could revert in a few lines is yours to make, and a one-way door earns a
question even when you are sure. The new Section 1 tests only whether the fork is real
and whether you can settle it from available evidence. On a change that is confidently
decidable *and* irreversible, the old skill says ask and the new skill says decide it
yourself. The new skill does use "destructive or one-way" twice — in the first-position
rule and in how to read a skip — but never as an input to whether to ask at all. This is
the highest-value gap because it changes Section 1's verdict, which is Section 1's whole
job. Body-shaped.

**2. A label must name the outcome.** The old skill bans meta labels explicitly by name
(`Yes`, `No`, `OK`, `Cancel`, `Proceed`, `Approve`, `Skip`, `Defer`) and bare labels
(`Option A`, `Approach 1`) separately, converging three independent sources on the rule.
The new label rule is entirely about the distinguishing difference and length: "one to
five words. The distinguishing difference, not a restatement of the question." Nothing
states that a label names what happens. A composer following the new rule literally can
write `Yes (Recommended)` and `No` — both short, both distinguishing, neither a
restatement — and pass every pre-flight item. The prior read called this "a weaker
meta-label ban"; it is not weaker, it is absent. Body-shaped, one clause.

**3. Never pair a decision with a sequencing question.** The new skill's batching test is
independence: put questions in one call when any combination of answers makes sense. A
decision and a "what happens next" question *are* independent by that test, so the new
skill positively licenses the pairing the old skill singles out as its worst-performing
shape. This is not silence — it is a rule pointing the other way, which makes it more
consequential than a plain omission. The old skill's supporting measurement (27 calls,
half the clean-selection rate, 4 of 5 hard rejections) is evidence rather than the rule;
the rule ports without the number, and per the selective-quotation rule the number should
not be restated without its comparison set. Body-shaped.

**4. An approval covers what the option said and nothing more.** The old skill carries
this twice: quote the chosen option rather than paraphrasing, because paraphrase is where
a narrow approval quietly becomes a broad one; and adjacent work that obviously follows
was not approved. The new `reading-answers.md` covers this **only for notes** — a
selection plus "but only for the staging environment" is not approval for production. For
a clean label match it says the opposite-facing thing: "Proceed with that option and do
not re-confirm it." Nothing governs scope drift after a valid answer. This is the
safety-shaped gap in the set. Body- or reference-shaped.

**5. Series position and run budget.** Absent entirely — `series`, `how many` and
`budget` return zero hits across the new skill. The old skill has a reader on dialog four
of eleven unable to tell whether to invest thought here or save it, fixed by one clause
("finding 3 of 11, two fixed so far"), plus the separate habit of announcing the run's
shape once, early, so an unbounded series becomes a known one. The new Section 2 discusses
sequences purely as a schema and dependency matter and never as something the reader
experiences. Body-shaped for the clause; the full treatment is reference-shaped.

**6. Draw the option set from what the project actually has.** The new skill covers
project *vocabulary* well — the Register section and `register.md`'s mismatch diagnosis
both take the reader's nouns from the repository. It does not cover the option set's
*content*. The old rule is to list the mechanisms actually available here before
finalising, because a set assembled from habit routinely names something this project does
not have and omits the thing it uses. A composer can write four perfectly-worded options
where one names a tool that is not installed. Distinct from vocabulary: the defect is what
the option offers, not how it is spelled. Body-shaped.

**7. A retry ladder is a plan, not a choice.** Absent. It is not reducible to any of the
new skill's four non-decisions: not a confirmation (you do not know the answer), not a
progress report, not a value only the reader can supply, not an open premise. It is the
distinct case where the options are sequential attempts, and offering them as a question
gets you an ordering back, because an ordering is what you handed over. Body-shaped.

**8. Re-ask hygiene.** `re-pitch.md` handles the single-call rewrite thoroughly and is
silent on the fact that the reader has already seen the earlier version. Three rules go
missing: say that a re-ask *is* a re-ask and what changed, or the reader cannot tell it
from a duplicate; say when an option set changed underneath you and why; and stop when the
set has changed twice for the same decision, because the churn is upstream of the question
and no wording fixes it. Reference-shaped, and it lands in a file measured as never
opened.

**9. Ask on arrival, not pre-emptively.** The new Section 1 governs *whether* the fork is
real but never *when* to raise it. A fork three steps ahead is real and defensible — it
passes the new test — but the work may never reach it, and an answer given in the abstract
is given without the information that would have mattered. Body-shaped, one clause. Not
previously named.

**10. Plan-mode invisibility.** Absent entirely (`plan mode`, `plan-mode`,
`EnterPlanMode` all zero hits). The tool's own prompt forbids referencing "the plan" in
plan mode because the reader cannot see it until you exit, which makes such a question
unanswerable by construction. Ranked low because it partially overlaps the first Gotcha —
the dialog covers the conversation — though the mechanism differs: the plan is invisible
from mode state rather than dialog occlusion, and stays invisible after the dialog closes.
Gotcha-shaped.

**11. Host handling of multi-question calls is thin.** The old skill records that hosts
have shipped bugs surfacing only the first question and silently dropping the rest, making
two calls of one question more reliable than one call of two. The new Section 2 gives only
the dependency reason to split, so a composer with four genuinely independent questions is
told to batch them. Ranked last on confidence rather than importance: this is a claim about
host behaviour I could not verify still holds, and dropping an unverifiable claim is a
defensible authoring choice rather than an oversight. Gotcha-shaped.

### Where the prior shallow read was wrong

Two of the ten candidates do not survive, and one is weaker than claimed.

**Same-turn prose being dropped is not a gap.** The old skill needs this host bug because
it has a three-layer model that puts background in prose before the call. The new skill
has no prose layer at all: the first Gotcha states that context before the call is
invisible, and pre-flight item 10 requires that nothing needed to decide sits outside the
call. Under that rule the bug cannot bite, so carrying it would add a caveat about a
failure the design already forecloses. Covered differently, and arguably better.

**"Fix / Defer / Skip is not a decision" is covered.** The old skill lists it separately
from confirmations, but its own repair is the confirmation repair — if the work is worth
doing the question is *how*, and if it is not, do not raise it. The new skill's first
non-decision ("A confirmation. You already know the answer and you want cover for it.")
reaches the same verdict on the same cases. Only the *how*-reframe is missing, which is a
sharpening rather than a capability.

**"Name the file, symbol, line" is the closest call, and I would not bucket it as a
gap.** The old skill's operational test — an unquantified plural like "found 2 issues"
never says which, and nobody can consent to a repair they cannot see — is genuinely absent
as a stated rule. But the new skill's general form catches the same calls: Section 3 puts
any fact the reader needs into the question, and pre-flight item 10 fails a call whose
subject is unnamed. This is an operationalization of a rule that is present, not a silence.
Listing it as a gap would be the kind of inflation that reintroduces the old text under a
false label.

### Bucket 2: deliberate exclusions

Each of these is named by the new skill's `description` and is correctly absent.

The whole schema and contract layer of `tool-contract.md` — field-by-field tables,
enforced-versus-prose constraints, the verbatim tool prompt and its conditional
assembly, the single-option rejection message, the verified build range, and the
doc-versus-binary disagreement table — falls under "fix a broken host or SDK integration"
and "prose about asking". The behavioural consequences that matter were lifted into the
new Gotchas. The `response` field's routing and the `PreToolUse` hook answering on the
user's behalf are host and SDK paths by definition. "A list is not a decision", the
enumeration-as-picker case, maps to "page through many items". The old `Trigger phrases`
section is superseded by the description itself. The research provenance throughout —
survey methodology, the 2018 and 2008 dialog-design sources, the eighteen-years-apart
convergence framing — is training material about asking rather than guidance for
composing one call.

### Bucket 3: covered differently, worth knowing

Roughly forty rules map across with different words, and two of the mappings are
substantive reversals rather than restatements.

The old skill allocates the decision to the **label** ("a user should be able to choose
from the label alone and read the description only to confirm"). The new skill allocates
it to the **description** ("the label is what the reader scans; the description is what
the reader decides on"). Nothing is lost, but a reader who knows the old skill will find
the new one saying the opposite thing, and it is a deliberate position rather than drift.

The old three-question self-check becomes a twelve-item pre-flight run as a loop until a
pass finds nothing, which is a strict strengthening. The old "coin-flip recommendation"
rule survives nearly intact in substance. The old two-route account of how user text
reaches you collapses into shape-based reading, which is the right level for a composer.

## Closure cost and shape

Stated as measurement, not as a recommendation.

| Gap | Shape | Rough cost |
|---|---|---|
| 1. Reversibility tiebreaker | body | ~35 tokens |
| 2. Label names the outcome | body | ~26 tokens |
| 3. No decision-plus-sequencing pair | body | ~40 tokens |
| 4. Scope of an approval | body or `reading-answers.md` | ~26 tokens |
| 5. Series position and run budget | body clause; full treatment reference | ~25 tokens |
| 6. Options from what the project has | body | ~40 tokens |
| 7. Retry ladder is a plan | body | ~27 tokens |
| 8. Re-ask hygiene | `re-pitch.md` | ~60-90 tokens |
| 9. Ask on arrival | body | ~34 tokens |
| 10. Plan-mode invisibility | Gotchas | ~28 tokens |
| 11. Multi-question host fragility | Gotchas | ~23 tokens |

The seven body-shaped gaps total roughly 300 to 340 tokens. Two constraints bound what
can actually be closed: the body reportedly sits at about 88% of its 5,200-token gate,
leaving around 600 tokens; and a disclosure measurement found all three references opened
zero times across 24 runs while the model made 40 `Read` calls on other things, so content
moved to a reference may never be read. Gap 8 is the only one that is genuinely
reference-shaped, and it is therefore the one least likely to reach a reader wherever it
is placed.

## Erratum (2026-08-24)

Dated corrections, recorded beside the note rather than edited into it. The findings above describe the skill as it stood on 2026-08-23; the authoring revisions that followed absorbed most of the gap list, and several premises moved.

- Ten of the eleven Bucket-1 gaps are closed in the current tree, verified at file and line on 2026-08-24: gaps 1, 2, 3, 6, 7 and 9 in the body (Sections 1, 2 and 4), gap 10 in the first Gotcha, and gaps 4, 5 and 8 in the asking-again reference. The fold that D-8 locked was therefore already done in substance when it was decided.
- Gap 11 landed hedged in the schema-limits Gotcha at skill version 0.1.3 by owner ruling, stated as host history with no known instance at build 2.1.241 and a steer against splitting for fear of the host.
- The closure-cost premise is stale: the body sits at roughly 5,794 tokens against a 5,800 gate, not near 88% of a 5,200-token gate with about 600 spare.
- "Three references" is stale: the skill ships five reference files plus a top-level examples file.
- The "all three references opened zero times across 24 runs" measurement predates the run-collector symlink fix and is not reliable; post-fix recall measured 33-100% per file, so the argument against reference placement no longer holds.
- Mentions of the re-pitch reference refer to the file now named asking-again, renamed in the plain-words pass.

## Observations

### On the gap set

- [fact] Eleven real gaps were found between the retired and current skills, of which seven are strong; the retired skill is 1,538 lines and the current one 729, and most of that difference is consolidation rather than loss #coverage #gap-analysis
- [insight] The highest-value gap was not previously named: the current Section 1 decides whether to ask on a purely epistemic test (can you settle it from available evidence) and drops the consequence test where reversibility breaks the tie, so on a confident-but-irreversible call the two skills give opposite verdicts #decide-whether-to-ask #reversibility
- [problem] The current label rule governs only distinguishing difference and length, so `Yes (Recommended)` and `No` pass every stated rule and every pre-flight item; the meta-label ban is absent rather than weakened #labels #meta-label
- [problem] The current batching test is independence, and a decision plus a "what happens next" question is independent by that test, so the skill positively licenses the pairing the retired skill singles out as its worst shape — a rule pointing the wrong way rather than a silence #batching #sequencing
- [problem] Scope-of-approval protection exists in `reading-answers.md` only for notes attached to a selection; for a clean label match the file says to proceed and not re-confirm, and nothing governs scope drift after a valid answer #reading-answers #approval-scope
- [fact] Series position, run budget and plan-mode invisibility are absent by grep, not merely reworded — `series`, `how many`, `budget`, `plan mode`, `plan-mode` and `EnterPlanMode` all return zero hits across the body and three references #verification #absence
- [insight] Project vocabulary is covered well and project-available mechanisms are not; the defect the retired skill guards against is what an option offers, not how it is spelled, and the two are distinct failures #options #project-fit
- [insight] Ask-on-arrival is missing because the current Section 1 governs whether a fork is real but never when to raise it, and a fork three steps ahead passes the reality test while the work may never reach it #decide-whether-to-ask #timing

### On the prior read, corrected

- [decision] Same-turn prose being dropped is not a gap: the retired skill needs that host bug because it keeps background in a prose layer, and the current skill has no prose layer, so the first Gotcha plus pre-flight item 10 forecloses the failure by design #premise-correction #covered-differently
- [decision] "Fix / Defer / Skip is not a decision" is covered by the current skill's confirmation non-decision, which reaches the same verdict on the same cases; only the how-reframe is missing, and that is a sharpening rather than a capability #premise-correction #non-decisions
- [decision] "Name the file, symbol, line" is the closest call and was not bucketed as a gap: Section 3 and pre-flight item 10 catch the same calls, so it is an operationalization of a present rule rather than a silence, and listing it would be the inflation that reintroduces retired text under a false label #premise-correction #specificity
- [insight] Section-level inventory mapping missed ten of the eleven gaps because they sit inside sections that map cleanly by title; only the run-of-questions section failed to map, which is why fine-grained reading was necessary #methodology #granularity

### On shape, cost and structure

- [fact] Seven of the eleven gaps are body-shaped and total roughly 300 to 340 tokens; the body reportedly sits near 88% of a 5,200-token gate, leaving about 600 tokens #closure-cost #token-budget
- [risk] Re-ask hygiene is the only genuinely reference-shaped gap, and a disclosure measurement found all three references opened zero times across 24 runs, so it is the gap least likely to reach a reader wherever it is placed #references #disclosure
- [insight] Two mappings are substantive reversals rather than restatements: the retired skill puts the decision on the label and the current one puts it on the description, which is a deliberate position a reader of the old skill will notice #covered-differently #labels
- [constraint] Six groups of retired content are excluded by the current skill's own `description` — the schema and contract layer, host and SDK paths, enumeration-as-picker, the trigger-phrase section, and the research provenance — and are correctly absent rather than lost #deliberate-exclusion #scope
- [outcome] The multi-question host-fragility gap is ranked last on confidence rather than importance, because it asserts host behaviour that could not be verified as still current, and dropping an unverifiable claim is a defensible authoring choice #evidence #confidence

## Relations

- pairs_with [[ANALYSIS-002: Evidence Rules From Measured Failures]]
- pairs_with [[ANALYSIS-001: Plugin Kit Authoring Standards for the Ask User Question Plugin]]
- pairs_with [[ANALYSIS-005: Monospace Decision Dialog Layout Rules]]
- relates_to [[ANALYSIS-004: AskUserQuestion Tool Capability Audit at Build 2.1.241]]
- pairs_with [[ANALYSIS-006: Surface Portability of the Ask User Question Skill's Claims]]
- relates_to [[ANALYSIS-007: Reference Ablation Ground Truth]]