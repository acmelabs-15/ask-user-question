# Judge rubric

The prompt below is sent verbatim to the judge model by `composition-runner.ts`, with
`{{SITUATION}}`, `{{EXPECT_CALL}}` and `{{OUTPUT}}` substituted. It is a file rather than a
string literal so it can be edited and diffed without touching the harness, and so a results
file can record which version of the rubric produced it.

Six criteria. Each is one the deterministic checks in `checks.ts` cannot settle, because
each needs someone to read the thing and decide whether it works. Anything a regex can
answer is deliberately absent here: scoring it twice would double-count it.

The judge is told to score low by default and to justify upward. Judges asked to rate
quality drift high, and a rubric that returns 4s for everything measures nothing.

---

```text
You are grading one attempt at surfacing a decision to a human user, in a coding agent.

THE SITUATION THE AGENT WAS IN
{{SITUATION}}

WHETHER A DIALOG WAS THE RIGHT MOVE HERE: {{EXPECT_CALL}}

WHAT THE AGENT PRODUCED
{{OUTPUT}}

Grade it on the six criteria below. Score each 1 to 5.

Score conservatively. 3 means "adequate, a competent reader could work with it". 5 means
"could not reasonably be improved on this criterion". Most real attempts are 2 or 3. Do
not award 4 or 5 unless you can state the specific thing that earns it. If a criterion
does not apply because the agent correctly declined to ask, score it 0 and say
"not applicable".

1. DECIDABLE COLD
Could a reader who has spent the last ten minutes on something unrelated decide from this
alone? They cannot see the codebase, cannot scroll back, and cannot ask a follow-up
question while the dialog is open. Anything they would have to look up themselves is a
failure of this criterion, not of their attention.

2. RECOGNISES A MISTAKE
If that reader picked the option the agent did NOT recommend, and it turned out to be
wrong for them, would they be able to tell from what is on screen that it was wrong? A
frame that hides the consequence of a choice fails here even when every fact in it is
true.

3. COMPARABLE OPTIONS
Do the options compare on the same axes, in the same order, in the same units, so that
scanning them finds the real difference? Are they mutually exclusive, and do they cover
the space including the option the agent would rather the user did not pick? Two options
that could both be true, or a missing "do nothing", is a low score.

4. HONEST RECOMMENDATION
Whether one is PRESENT is checked mechanically elsewhere, so do not score presence. Score
whether it is honest: is it justified in its own description rather than elsewhere, and
does the justification hold up against the facts in the situation? A recommendation that
is marked but arbitrary scores 1: it is worse than none, because it teaches the reader the
marker means nothing. If the options are genuinely equivalent and the agent says so in the
question text, that is a 5.

5. EVIDENCE BOUNDARY
Does the agent state what it has NOT verified, where that gap could change the answer? An
unstated gap is the reader's unknowing risk. If there was no real gap in this situation,
score 3 and say so rather than penalising.

6. RIGHT CALL ABOUT ASKING
Given the situation, was asking the right move at all? If a dialog was correct, did the
agent ask about the thing that actually had a fork in it, rather than a confirmation, a
progress report, a value only the user can type, or a mechanism whose premise is still
open? If NOT asking was correct, did the agent decide, state the decision AND its
evidence, and continue? Deciding silently scores 2. Deciding with the reason stated
scores 5. Asking anyway scores 1.

Return ONLY a JSON object, no prose around it, no code fence:
{"decidable_cold": n, "recognises_mistake": n, "comparable_options": n,
 "honest_recommendation": n, "evidence_boundary": n, "right_call_about_asking": n,
 "worst_failure": "one sentence naming the single biggest problem, or 'none'"}
```
