# Trigger measurement — ask-user-question

Model `opus`, 3 runs/query, trigger threshold 0.5, seed 42.
Measures the installed skill against its real neighbours; no stubs, no config changes.

## Train

8/17 correct — accuracy 47.1%, precision 100%, recall 0%, F1 0.00
TP 0  FN 9  TN 8  FP 0

| ok | expect | rate | mean | query | won by (when not ours) |
|:--:|:--:|:--:|--:|---|---|
| ✗ | fire | 0/3 | 29s | i'm about to ask the user whether we go with per-user cach… | asking-users-questions:asking-users-questions ×3 |
| ✗ | fire | 0/3 | 27s | Here's a question I put to my PM this morning and she coul… | asking-users-questions:asking-users-questions ×2, asking-users-questions ×1 |
| ✗ | fire | 0/3 | 31s | I found a swallowed error in src/queue.ts:11 — the catch i… | asking-users-questions ×1, asking-users-questions:asking-users-questions ×1, (Read, no skill) ×1 |
| ✗ | fire | 0/3 | 30s | the user answered my question with free text saying 'wait,… | asking-users-questions:asking-users-questions ×2, asking-users-questions ×1 |
| ✗ | fire | 0/3 | 23s | im adding a config flag and honestly not sure if this is e… | asking-users-questions:asking-users-questions ×1, asking-users-questions ×2 |
| ✗ | fire | 0/3 | 24s | I've got two candidate table layouts for the dashboard and… | asking-users-questions ×2, asking-users-questions:asking-users-questions ×1 |
| ✗ | fire | 0/3 | 26s | the user picked an option but also typed a note qualifying… | asking-users-questions:asking-users-questions ×1, asking-users-questions ×2 |
| ✗ | fire | 0/3 | 30s | here are the four things i still need from the user before… | asking-users-questions ×2, asking-users-questions:asking-users-questions ×1 |
| ✗ | fire | 0/3 | 34s | this run has eleven findings and i'm going to need the use… | (answered directly) ×1, asking-users-questions ×1, asking-users-questions:asking-users-questions ×1 |
| ✓ | quiet | 0/3 | 25s | grill me on the requirements for the new billing exporter … | grill-me ×3 |
| ✓ | quiet | 0/3 | 20s | we're at the decisions phase on PLAN-014 and there are ele… | skills:decisions ×3 |
| ✓ | quiet | 0/3 | 35s | I'm building a TUI host that renders Claude Code's AskUser… | claude-api ×2, (Agent, no skill) ×1 |
| ✓ | quiet | 0/3 | 33s | our AskUserQuestion calls have started failing with a sche… | (Agent, no skill) ×1, (Bash, no skill) ×2 |
| ✓ | quiet | 0/3 | 24s | review the diff on my current branch — i want the full adv… | (Bash, no skill) ×2, brain:---memory ×1 |
| ✓ | quiet | 0/3 | 14s | wrap up the session — commit what's here, run the review g… | skills:end ×1, (Bash, no skill) ×2 |
| ✓ | quiet | 0/3 | 28s | i need a survey form built for our internal users — multip… | (ToolSearch, no skill) ×2, (Bash, no skill) ×1 |
| ✓ | quiet | 0/3 | 25s | spec out the work for the notification service from the ac… | brain:🧠-memory ×1, brain:---memory ×1, brain:memory ×1 |

## Held-out

4/9 correct — accuracy 44.4%, precision 100%, recall 0%, F1 0.00
TP 0  FN 5  TN 4  FP 0

| ok | expect | rate | mean | query | won by (when not ours) |
|:--:|:--:|:--:|--:|---|---|
| ✗ | fire | 1/3 | 28s | need to ask about 6 different things before i can start on… | asking-users-questions ×1, asking-users-questions:asking-users-questions ×1 |
| ✗ | fire | 0/3 | 31s | my dialog labels are Yes / No / Skip and someone on my tea… | asking-users-questions ×3 |
| ✗ | fire | 0/3 | 22s | about to surface a one-way-door decision to the user — dro… | asking-users-questions ×3 |
| ✗ | fire | 0/3 | 24s | the user picked 'cache per user' but typed a note saying '… | asking-users-questions ×3 |
| ✗ | fire | 0/3 | 25s | i've got two questions and i can't tell if they're indepen… | asking-users-questions ×3 |
| ✓ | quiet | 0/3 | 31s | Write me a training doc for the team on how to write good … | (ToolSearch, no skill) ×2, (Bash, no skill) ×1 |
| ✓ | quiet | 0/3 | 34s | Grade these five AskUserQuestion calls from our skill libr… | (ToolSearch, no skill) ×1, (Bash, no skill) ×2 |
| ✓ | quiet | 0/3 | 19s | audit every note under docs/ against the structural thresh… | skills:defrag ×3 |
| ✓ | quiet | 0/3 | 40s | Our platform team wants a one-page cheat sheet of the hous… | (Bash, no skill) ×1, (ToolSearch, no skill) ×2 |

## All queries

12/26 correct — accuracy 46.2%, precision 100%, recall 0%, F1 0.00
TP 0  FN 14  TN 12  FP 0

| ok | expect | rate | mean | query | won by (when not ours) |
|:--:|:--:|:--:|--:|---|---|
| ✗ | fire | 0/3 | 29s | i'm about to ask the user whether we go with per-user cach… | asking-users-questions:asking-users-questions ×3 |
| ✗ | fire | 0/3 | 27s | Here's a question I put to my PM this morning and she coul… | asking-users-questions:asking-users-questions ×2, asking-users-questions ×1 |
| ✗ | fire | 0/3 | 31s | I found a swallowed error in src/queue.ts:11 — the catch i… | asking-users-questions ×1, asking-users-questions:asking-users-questions ×1, (Read, no skill) ×1 |
| ✗ | fire | 0/3 | 30s | the user answered my question with free text saying 'wait,… | asking-users-questions:asking-users-questions ×2, asking-users-questions ×1 |
| ✗ | fire | 0/3 | 23s | im adding a config flag and honestly not sure if this is e… | asking-users-questions:asking-users-questions ×1, asking-users-questions ×2 |
| ✗ | fire | 0/3 | 24s | I've got two candidate table layouts for the dashboard and… | asking-users-questions ×2, asking-users-questions:asking-users-questions ×1 |
| ✗ | fire | 1/3 | 28s | need to ask about 6 different things before i can start on… | asking-users-questions ×1, asking-users-questions:asking-users-questions ×1 |
| ✗ | fire | 0/3 | 31s | my dialog labels are Yes / No / Skip and someone on my tea… | asking-users-questions ×3 |
| ✗ | fire | 0/3 | 22s | about to surface a one-way-door decision to the user — dro… | asking-users-questions ×3 |
| ✗ | fire | 0/3 | 26s | the user picked an option but also typed a note qualifying… | asking-users-questions:asking-users-questions ×1, asking-users-questions ×2 |
| ✗ | fire | 0/3 | 30s | here are the four things i still need from the user before… | asking-users-questions ×2, asking-users-questions:asking-users-questions ×1 |
| ✗ | fire | 0/3 | 34s | this run has eleven findings and i'm going to need the use… | (answered directly) ×1, asking-users-questions ×1, asking-users-questions:asking-users-questions ×1 |
| ✗ | fire | 0/3 | 24s | the user picked 'cache per user' but typed a note saying '… | asking-users-questions ×3 |
| ✗ | fire | 0/3 | 25s | i've got two questions and i can't tell if they're indepen… | asking-users-questions ×3 |
| ✓ | quiet | 0/3 | 25s | grill me on the requirements for the new billing exporter … | grill-me ×3 |
| ✓ | quiet | 0/3 | 20s | we're at the decisions phase on PLAN-014 and there are ele… | skills:decisions ×3 |
| ✓ | quiet | 0/3 | 31s | Write me a training doc for the team on how to write good … | (ToolSearch, no skill) ×2, (Bash, no skill) ×1 |
| ✓ | quiet | 0/3 | 35s | I'm building a TUI host that renders Claude Code's AskUser… | claude-api ×2, (Agent, no skill) ×1 |
| ✓ | quiet | 0/3 | 33s | our AskUserQuestion calls have started failing with a sche… | (Agent, no skill) ×1, (Bash, no skill) ×2 |
| ✓ | quiet | 0/3 | 34s | Grade these five AskUserQuestion calls from our skill libr… | (ToolSearch, no skill) ×1, (Bash, no skill) ×2 |
| ✓ | quiet | 0/3 | 24s | review the diff on my current branch — i want the full adv… | (Bash, no skill) ×2, brain:---memory ×1 |
| ✓ | quiet | 0/3 | 19s | audit every note under docs/ against the structural thresh… | skills:defrag ×3 |
| ✓ | quiet | 0/3 | 14s | wrap up the session — commit what's here, run the review g… | skills:end ×1, (Bash, no skill) ×2 |
| ✓ | quiet | 0/3 | 40s | Our platform team wants a one-page cheat sheet of the hous… | (Bash, no skill) ×1, (ToolSearch, no skill) ×2 |
| ✓ | quiet | 0/3 | 28s | i need a survey form built for our internal users — multip… | (ToolSearch, no skill) ×2, (Bash, no skill) ×1 |
| ✓ | quiet | 0/3 | 25s | spec out the work for the notification service from the ac… | brain:🧠-memory ×1, brain:---memory ×1, brain:memory ×1 |

78 calls, 2138s of subprocess time, mean 27.4s/call.
