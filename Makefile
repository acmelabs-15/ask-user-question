# ask-user-question — measurement targets.
#
# Every model-calling target runs an operation out of plugin-kit. Those operations isolate
# their own measurement: each run copies the artifact under a unique alias into a throwaway
# project root and spawns with `--setting-sources project --strict-mcp-config`, so the
# machine's own skills, settings and MCP servers stay out of the result.
#
# Nothing here creates or deletes anything under the Claude config directory. It is read
# only ever, by `find` and by the pre-flight sweep. That is a correctness requirement, not
# hygiene: a machine-visible copy of this skill is served to the model through the skill
# system, which never produces a `Read`, so every bundled file scores a pull rate of zero and
# the disclosure report reads as a clean table of `prune` verdicts on files that are in fact
# load-bearing. `absent-check` refuses a disclosure run while such a copy exists.
#
# Measure before optimising. The measure targets report what the artifact does as authored
# and propose nothing; the optimizers cost several times as much and rank candidates. A
# table usually says what to change without a loop guessing at it, so the pairs run in this
# order: measure-trigger before trigger, measure-disclosure before disclosure.
#
# Serial by design: two of these at once saturates the connection and every call fails.
#
#   make                     list targets
#   make doctor              check the environment before spending 35 minutes
#   make checks              free, seconds
#   make measure-trigger     per-query trigger rates, comparable across runs
#   make measure-disclosure  what the skill costs as authored, nothing changed
#   make trigger             optimize the description, ~35 min
#
# Override anything:  make composition RUNS=1 OUT=/tmp/x

SHELL       := /bin/bash
.DEFAULT_GOAL := help

ROOT        := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))
SKILL       := $(ROOT)/skills/ask-user-question
EVALS       := $(ROOT)/evals
CLAUDE_DIR  := $(HOME)/.claude
STAMP       := $(shell date +%Y-%m-%d_%H%M%S)
OUT         ?= $(HOME)/auq-results/$(STAMP)

# zsh -- the macOS default -- does not tilde-expand after `=` in a command argument,
# where bash does. So `make trigger PLUGIN_KIT=~/Dev/ACMElabs/plugin-kit`, which is the
# line this Makefile prints as the fix, arrives with a literal ~ and every test against
# the path fails on a directory the user can see with ls. Expanding it here is the only
# place that can tell the two shells apart.
tilde        = $(patsubst ~/%,$(HOME)/%,$(patsubst ~,$(HOME),$(1)))

# plugin-kit carries the measurement operations. There is no unified entry point and no
# `bin`: each operation is a script invoked directly, so the targets below name the script
# they run rather than a subcommand.
PLUGIN_KIT  ?= $(HOME)/Dev/ACMElabs/plugin-kit

# `override` is required, not decoration: a variable set on the command line beats an
# ordinary assignment in the makefile, so without it the expansion above would be
# discarded for exactly the case it exists to fix.
override PLUGIN_KIT := $(call tilde,$(PLUGIN_KIT))
override OUT := $(call tilde,$(OUT))

KIT_PROBE   := shared/operations/measure-triggering.ts
OPS         := $(PLUGIN_KIT)/shared/operations

MODEL       ?= opus
RUNS        ?= 3

# Every measurement target mints its own directory at recipe time and writes both results
# and logs inside it. Three reasons, none of them tidiness:
#
#  - measure-disclosure.ts writes `results.json` straight into --results-dir with no
#    timestamped subdirectory of its own, unlike the two optimizers. A second run into the
#    same directory therefore replaces the first run's results outright.
#  - Results written inside the skill directory become bundled files, which the next
#    disclosure run then measures as part of the artifact.
#  - optimize-disclosure.ts's --apply defaults to `<results-dir>/best-layout` and `rm -rf`s
#    that path before copying the layout in, so a results directory placed inside the skill
#    would delete the skill.
#
# What is NOT a reason, having been measured rather than assumed: the O_TRUNC splice, where
# re-writing a path leaves the tail of the previous longer record attached to the new
# shorter one. That is real, but it is specific to `Bun.file(path).writer()`, and every
# write in plugin-kit's shared/ goes through `Bun.write`, which truncates. Verified on Bun
# 1.3.14: two `Bun.write` calls leave only the second string; the FileSink writer leaves
# `"BBB\n"` followed by the tail of the first. `tee` truncates too.
stamped      = $(OUT)/$(1)-$$(date +%H%M%S)
stamped      = $(OUT)/$(1)-$$(date +%H%M%S)

# Worker counts. DELIBERATELY NOT RAISED above each script's own default -- 10 for the
# description loop, 12 for both disclosure operations, 4 for the local composition runner.
#
# Rate limiting is the one failure that corrupts rather than merely slows a measurement: a
# rate-limited run is recorded as a clean DECLINE rather than as an error, so throttling
# silently reports LOWER trigger rates and a worse-looking skill with nothing red on
# screen. Watch the `!` and `?` tallies on the progress bar; they should read zero.
#
# WORKERS and DISC_WORKERS are empty on purpose so each script applies its own default,
# which was arrived at from measurements this repo did not make. Pinning a number here,
# even the right one today, makes this Makefile override a tuned decision after they
# retune it.
WORKERS      ?=
DISC_WORKERS ?=
COMP_WORKERS ?= 4

# --no-early-stop goes on `measure-trigger` and DELIBERATELY NOT on `trigger`. The flag
# exists only on the two scripts built from SHARED_EVAL_FLAGS, so those are the only two
# targets where the question arises at all.
#
# By default a query stops as soon as its remaining attempts cannot change its verdict. That
# cannot move a pass/fail, but it does move the reported RATE: a query that fires the first
# two times reports 2/2 where the full sweep would report 2/3, and one that settles sooner
# reports 1/1. Rates from an early-stopped run therefore have no shared denominator and
# cannot be compared across runs or lined up in a table.
#
#  - `measure-trigger` exists to produce those rates. It gets the flag.
#  - `trigger` runs optimize-description.ts, an OPTIMIZER that ranks its iterations on pass
#    COUNTS. Early stopping cannot change a count, so the default is both correct and
#    cheaper -- at the defaults, a query scoring 0/3 or 3/3 costs two calls instead of three.
#  - `disclosure` runs an optimizer too, and the flag does not exist on that script.
#  - `measure-disclosure` reports a rate but has no early-stop mechanism to disable: every
#    scenario runs --runs-per-scenario times, so its rates are full-N by construction.

B := \033[1m
D := \033[2m
G := \033[32m
R := \033[31m
Y := \033[33m
C := \033[36m
X := \033[0m

# Names this skill has shipped under. A copy under any of them competes for the same
# queries and wins some, which reads as a broken description rather than a duplicate.
# Neither plugin-kit's install sweep nor evals/assert-skill-absent.ts catches these: both
# look for the artifact's CURRENT name, so a copy called `asking-users-questions` is
# invisible to them and fully visible to the router. This list is the only detector for it.
#
# READ-ONLY. `find` only, and `purge-old` prints the removal command rather than running it.
# Nothing in this file creates or deletes anything under $(CLAUDE_DIR).
OLD_NAMES   := asking-users-questions surface-decisions user-choices
FIND_OLD     = find $(CLAUDE_DIR)/skills $(CLAUDE_DIR)/plugins -maxdepth 3 \
                 $(foreach n,$(OLD_NAMES),-name '$(n)' -o) -false \
                 2>/dev/null

# Pre-flight for the disclosure targets AND `composition`. Sweeps the same four roots the
# loader reads from and refuses the run if anything answers to this skill's name. See the
# comment on `measure-disclosure` for why this is a hard gate rather than advice, and the
# comment on `absent-check` for why composition needs it too.
ABSENT_GUARD := $(EVALS)/assert-skill-absent.ts

.PHONY: help doctor require-kit absent-check checks measure-disclosure disclosure composition trigger measure-trigger all purge-old clean

help: ## show this
	@printf '\n  $(B)ask-user-question$(X)  $(D)measurement targets$(X)\n\n'
	@grep -hE '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) \
	  | awk 'BEGIN{FS=":.*?## "}{printf "  $(C)%-18s$(X) %s\n", $$1, $$2}'
	@printf '\n  $(B)vars$(X)  OUT=$(D)%s$(X)\n' '$(OUT)'
	@printf '        MODEL=$(D)$(MODEL)$(X)  RUNS=$(D)$(RUNS)$(X)\n'
	@printf '        WORKERS=$(D)$(if $(WORKERS),$(WORKERS),unset — optimize-description.ts decides)$(X)\n'
	@printf '        DISC_WORKERS=$(D)$(if $(DISC_WORKERS),$(DISC_WORKERS),unset — the disclosure scripts decide)$(X)\n'
	@printf '        COMP_WORKERS=$(D)$(COMP_WORKERS)$(X) $(D)(composition)$(X)\n'
	@printf '        PLUGIN_KIT=$(D)$(PLUGIN_KIT)$(X)\n\n'
	@printf '  $(D)Nothing here installs the skill: every plugin-kit operation copies it into$(X)\n'
	@printf '  $(D)a throwaway project root of its own. The long runs draw a percentage on$(X)\n'
	@printf '  $(D)stderr, so the report on stdout stays clean and you can watch either.$(X)\n\n'

doctor: ## check the environment before spending 35 minutes
	@printf '\n  $(B)doctor$(X)\n'
	@command -v bun    >/dev/null && printf '  $(G)ok$(X)   bun\n'    || { printf '  $(R)no$(X)   bun not on PATH\n'; exit 1; }
	@command -v claude >/dev/null && printf '  $(G)ok$(X)   claude\n' || { printf '  $(R)no$(X)   claude not on PATH\n'; exit 1; }
	@$(MAKE) --no-print-directory require-kit KIT_FATAL=0
	@if test -f "$(SKILL)/SKILL.md"; then printf '  $(G)ok$(X)   skill $(D)$(SKILL)$(X)\n'; \
	 else printf '  $(D)--   no SKILL.md at $(SKILL) yet$(X)\n'; \
	      printf '       $(D)informational: the measurement targets need one, doctor does not.$(X)\n'; fi
	@old=$$($(FIND_OLD)); \
	  if [ -n "$$old" ]; then \
	    printf '  $(R)no$(X)   an older copy is installed and will win some queries:\n'; \
	    for p in $$old; do printf '       $(D)%s$(X)\n' "$$p"; done; \
	    printf '       $(D)run$(X) $(C)make purge-old$(X) $(D)to see the removal commands$(X)\n'; exit 1; \
	  else printf '  $(G)ok$(X)   no older copy installed\n'; fi
	@$(MAKE) --no-print-directory --silent absent-check GUARD_FATAL=0
	@printf '  $(G)ok$(X)   results -> $(D)$(OUT)$(X)\n\n'

# The current-name install check, as a target so `doctor`, the two disclosure recipes and
# `composition` share one implementation. GUARD_FATAL=0 makes it advisory, which is what
# `doctor` wants: `checks` and the two triggering targets are genuinely unaffected by an
# installed copy and must not be blocked by one.
#
# `composition` USED TO BE ON THAT LIST, on the grounds that it injects skill content rather
# than routing to it. That is true of the `skill` arm and false of the `disclosed` arm, which
# is the one `make composition` also runs. That arm measures disclosure the same way the
# disclosure targets do -- by counting `Read` tool calls against reference paths
# (`composition-runner.ts:159-162`) -- and it spawns `claude` with no `--setting-sources` and
# no `--strict-mcp-config`, so the machine's installed skills are in scope. Content that
# arrives through the skill system produces no `Read`, so a visible copy floors `refsRead`,
# reference recall, precision and `refCounts` together, and the arm reports that disclosure
# does not work when what failed was the measurement. Same void signature as disclosure,
# reached by the same mechanism; the injection argument never covered this arm.
#
# The `baseline` arm has a separate and narrower exposure that this gate also closes: it is
# the no-guidance control, and a copy the loader can see puts this skill in front of the very
# runs that define zero.
#
# Exit codes from the script: 0 absent, 1 installed, 2 absence could not be confirmed.
GUARD_FATAL ?= 1
absent-check:
	@bun "$(ABSENT_GUARD)" "$(SKILL)"; status=$$?; \
	  if [ "$$status" = 0 ]; then exit 0; fi; \
	  if [ "$(GUARD_FATAL)" = 1 ]; then \
	    printf '\n  $(R)no$(X)   refusing to start a measurement that would be void under this condition.\n\n'; \
	    exit $$status; \
	  fi; \
	  printf '\n       $(D)advisory here. the disclosure targets and $(X)$(C)composition$(X)$(D) refuse$(X)\n'; \
	  printf '       $(D)on this; the triggering targets are unaffected by it.$(X)\n\n'; \
	  exit 0

# Hard gate for every target that runs a plugin-kit operation, and -- with KIT_FATAL=0 --
# the line `doctor` prints. One recipe rather than two, so the warning and the refusal
# cannot drift apart the way the old pair did, where doctor tested for one file and the
# runner imported another.
#
# `checks` and `composition` are self-contained and must still run without plugin-kit,
# which is why doctor warns instead of failing. But starting a 35-minute run against a
# script that is not there is worse than not starting.
KIT_FATAL   ?= 1
require-kit:
	@if test -f "$(PLUGIN_KIT)/$(KIT_PROBE)"; then \
	   [ "$(KIT_FATAL)" = 1 ] || printf '  $(G)ok$(X)   plugin-kit $(D)$(PLUGIN_KIT)$(X)\n'; \
	   exit 0; \
	 fi; \
	 if [ "$(KIT_FATAL)" = 1 ]; then printf '\n  $(R)no$(X)   '; else printf '  $(Y)!$(X)    '; fi; \
	 printf 'plugin-kit: cannot find $(D)$(KIT_PROBE)$(X)\n'; \
	 printf '       $(D)looked for$(X) $(D)%s$(X)\n' '$(PLUGIN_KIT)/$(KIT_PROBE)'; \
	 if ! test -d "$(PLUGIN_KIT)"; then \
	   printf '       $(D)that directory does not exist$(X)\n'; \
	 else \
	   printf '       $(D)the directory exists but does not carry that file, only:$(X)\n'; \
	   ls "$(PLUGIN_KIT)" 2>/dev/null | head -8 | tr '\n' ' ' | sed 's/^/         /'; printf '\n'; \
	 fi; \
	 case '$(PLUGIN_KIT)' in /*) ;; *) \
	   printf '       $(Y)that is not an absolute path.$(X) $(D)make expands $$ in a command-line$(X)\n'; \
	   printf '       $(D)value, so a quoted $$HOME becomes OME. Paste the path itself.$(X)\n' ;; \
	 esac; \
	 printf '       $(D)override with$(X) $(C)PLUGIN_KIT$(X)$(D), pointing at the checkout root:$(X)\n'; \
	 printf '       $(C)make trigger PLUGIN_KIT=$(HOME)/Dev/ACMElabs/plugin-kit$(X)\n'; \
	 if [ "$(KIT_FATAL)" = 1 ]; then printf '\n'; exit 1; fi

checks: ## frontmatter + linter, no model calls, seconds
	@printf '\n  $(B)checks$(X) $(D)no model calls$(X)\n'
	@run="$(call stamped,checks)"; mkdir -p "$$run"; \
	  bun "$(EVALS)/frontmatter.test.ts"        | tee "$$run/frontmatter.txt" | tail -2; \
	  bun "$(EVALS)/composition/checks.test.ts" | tee "$$run/checks.txt"      | tail -1; \
	  printf '  $(D)%s$(X)\n\n' "$$run"

# REPORT-ONLY, and deliberately so. This target deletes nothing; it prints what it found and
# the command that would remove it.
#
# It is the only place in this file that could touch anything under $(CLAUDE_DIR), and an
# unattended recursive delete over `find` results in a home directory is the wrong shape of
# risk to carry for thirty seconds of copy-and-paste. The failure it avoids is not
# hypothetical: a precautionary config change on this machine silently broke an unrelated
# plugin, and went unnoticed because every check verified config state rather than observed
# effect. A make target that removes directories in $HOME is that accident with a wider
# blast radius, and the operator reading the path before deleting it is the check that
# actually observes.
purge-old: ## report copies installed under this skill's previous names
	@old=$$($(FIND_OLD)); \
	  if [ -z "$$old" ]; then printf '  $(G)ok$(X)   nothing installed under a previous name\n'; exit 0; fi; \
	  printf '\n  $(B)copies under previous names$(X) $(D)nothing has been removed$(X)\n'; \
	  for p in $$old; do \
	    case "$$p" in \
	      $(CLAUDE_DIR)/plugins/*) \
	        printf '  $(Y)!$(X)    $(D)%s$(X)\n' "$$p"; \
	        printf '       $(D)a plugin directory. Remove that plugin through your plugin$(X)\n'; \
	        printf '       $(D)manager -- deleting it by hand can take unrelated skills with it.$(X)\n' ;; \
	      *) \
	        printf '  $(Y)!$(X)    $(D)%s$(X)\n' "$$p"; \
	        printf '       $(C)rm -rf %s$(X)\n' "$$p" ;; \
	    esac; \
	  done; \
	  printf '\n  $(D)review each path before running anything above.$(X)\n\n'

# WARNING, and the reason `absent-check` is a hard prerequisite here rather than advice:
# measure-disclosure.ts builds NO envelope and never calls plugin-kit's install detector, so
# it is the one operation that will report a clean, plausible `prune` table against an
# installed copy and say nothing. Its sibling optimize-disclosure.ts at least records an
# install conflict and prints a stderr warning; this script has no such path.
#
# That is the exact fault that voided this project's previous disclosure numbers: content
# served through the skill system produces no `Read`, every bundled file scores a pull rate
# of zero, and the report reads as "delete all of these". It is silent, it looks like a
# result, and acting on it deletes load-bearing files.
#
# The operator cannot be asked to remember this, because the tool will not remind them. So
# `absent-check` sweeps the four roots the loader reads from -- ~/.claude/skills, both plugin
# roots, and the project's .claude/skills -- matching on the name the loader would use
# (frontmatter `name:`, directory name as fallback) and refusing the run on any sighting. It
# also refuses when a root exists and will not enumerate, because "nothing found" and
# "nothing found where I could look" are the same output and opposite claims.
#
# --skill-path, not --target-path: only the two SHARED_EVAL_FLAGS scripts accept the alias.
# Both disclosure scripts declare their own flag spec with --skill-path alone, so the
# asymmetry with `trigger` below is required, not an oversight. Do not "fix" it.
measure-disclosure: doctor require-kit absent-check ## what the skill costs as authored, nothing restructured
	@printf '\n  $(B)measure-disclosure$(X) $(D)measure only · run this first$(X)\n'
	@run="$(call stamped,measure-disclosure)"; mkdir -p "$$run"; \
	  bun "$(OPS)/measure-disclosure.ts" \
	    --skill-path "$(SKILL)" \
	    --scenarios "$(EVALS)/composition/disclosure-evals.json" \
	    --model $(MODEL) --grader-bare \
	    $(if $(DISC_WORKERS),--num-workers $(DISC_WORKERS),) \
	    --permission-mode acceptEdits \
	    --results-dir "$$run" 2>&1 | tee "$$run/measure-disclosure.log" \
	    | awk '{ if (length($$0) < 200) { print; fflush() } }'; \
	  printf '\n  $(B)summary$(X)\n'; \
	  grep -aE '"verdict"|"pull_rate"|body_tokens|context_tokens|pass_rate' "$$run/measure-disclosure.log" || true; \
	  printf '  $(D)%s$(X)\n' "$$run"; \
	  exit 0

# Runs at the script's own defaults: --max-iterations 3, --holdout 0.4, --max-candidates 3.
# The pinned `--max-iterations 1 --holdout 0` this target carried from the retired harness is
# gone, and not only because it made this a costlier duplicate of `measure-disclosure`.
# --holdout 0 makes the OUTPUT untrustworthy by construction: candidates are then selected on
# the same scenarios that proposed them. Every one of plugin-kit's committed disclosure logs
# opens with that warning -- no held-out scenarios, so add scenarios or raise --holdout before
# trusting the result -- and pinning 0 opts into it permanently.
#
# THE TRAP, now that the holdout is real: selection is only as good as the split, and
# plugin-kit prescribes no minimum scenario count. On a small set, 40 percent held out leaves
# too few scenarios to select on and the winner is noise. The fix is to ADD SCENARIOS to
# disclosure-evals.json, never to lower --holdout, which converts a visible weakness into an
# invisible one.
#
# --skill-path, not --target-path: see the note on `measure-disclosure`.
disclosure: doctor require-kit absent-check ## measure, then propose a cheaper layout and re-measure
	@printf '\n  $(B)disclosure$(X) $(D)measure + propose · several sweeps$(X)\n'
	@run="$(call stamped,disclosure)"; mkdir -p "$$run"; \
	  bun "$(OPS)/optimize-disclosure.ts" \
	    --skill-path "$(SKILL)" \
	    --scenarios "$(EVALS)/composition/disclosure-evals.json" \
	    --model $(MODEL) --grader-bare \
	    $(if $(DISC_WORKERS),--num-workers $(DISC_WORKERS),) \
	    --permission-mode acceptEdits \
	    --results-dir "$$run" 2>&1 | tee "$$run/disclosure.log" \
	    | awk '{ if (length($$0) < 200) { print; fflush() } }'; \
	  printf '\n  $(B)summary$(X)\n'; \
	  grep -aE '"verdict"|"pull_rate"|body_tokens|context_tokens|Report:' "$$run/disclosure.log" || true; \
	  printf '  $(D)%s$(X)\n' "$$run"; \
	  exit 0

# `absent-check` is a hard prerequisite for the `disclosed` arm's sake, not the `skill` arm's.
# See the comment on `absent-check` for which arm breaks and how. No `require-kit`: this target
# runs its own runner and calls no plugin-kit operation.
composition: doctor absent-check ## three arms, judge on (~45 min)
	@printf '\n  $(B)composition$(X) $(D)3 arms · judge on · ~45 min$(X)\n'
	@run="$(call stamped,composition)"; mkdir -p "$$run"; \
	  bun "$(EVALS)/composition/composition-runner.ts" \
	    --arm baseline,skill,disclosed --runs $(RUNS) --workers $(COMP_WORKERS) \
	    --out "$$run" > "$$run/report.md"; \
	  sed -n '/^## Headline/,/^$$/p' "$$run/report.md" | head -22; \
	  printf '  $(D)%s$(X)\n' "$$run"

# Measure before optimising. This reports per-query trigger rates for the description as
# authored and proposes nothing, which is usually the number you actually wanted: a table of
# which queries miss tells you what to change without a loop guessing at it.
#
# --no-early-stop is what makes the rates comparable across runs -- see the note at the top.
# Without it a query that settles early reports 1/1 or 2/2 and the denominators stop matching.
#
# measure-triggering.ts writes its results JSON to STDOUT and its progress to stderr, so the
# recipe captures stdout to a file and tees stderr, keeping the progress bar live.
#
# It has NO --results-dir flag -- checked, it is not in SHARED_EVAL_FLAGS and not added by its
# main(). So the stamped directory is filled by this recipe rather than by the script:
# results.json from stdout, the log from stderr, and the envelope via --envelope, which is the
# one output path the script does expose. --verbose is required, not decoration: the per-query
# PASS/FAIL lines the summary greps for are printed only under it.
#
# --target-path, not --skill-path: both work here, and --target-path is the canonical
# spelling. It wins when both are passed, it is what the script's own usage line prints, and
# it reads honestly now that --target-type accepts agent and command too. The disclosure
# targets above must use --skill-path; that asymmetry is real.
measure-trigger: doctor require-kit ## per-query trigger rates for the description as authored
	@printf '\n  $(B)measure-trigger$(X) $(D)measure only · full-N rates$(X)\n'
	@run="$(call stamped,measure-trigger)"; mkdir -p "$$run"; \
	  bun "$(OPS)/measure-triggering.ts" \
	    --eval-set "$(EVALS)/trigger-eval-set.json" \
	    --target-path "$(SKILL)" --target-type skill \
	    --model $(MODEL) --runs-per-query $(RUNS) \
	    --no-early-stop --verbose \
	    $(if $(WORKERS),--num-workers $(WORKERS),) \
	    --envelope "$$run/envelope.json" \
	    2>&1 1>"$$run/results.json" | tee "$$run/measure-trigger.log"; \
	  printf '\n  $(B)summary$(X)\n'; \
	  grep -aE '\[PASS\]|\[FAIL\]' "$$run/measure-trigger.log" | head -20 || true; \
	  printf '  $(D)%s$(X)\n' "$$run"

# The OPTIMIZER. Ranks iterations on pass COUNTS, so it deliberately does NOT get
# --no-early-stop; see the note at the top of this file. Run `measure-trigger` first.
#
# No --grader-bare here, and none is possible: optimize-description.ts runs no grader at all.
# A trigger is decided by reading the tool-call stream rather than by asking a model, which
# is why its envelope records `graderModel: null`. The flag does not exist on this script.
trigger: doctor require-kit ## optimize the description against the eval set (~35 min)
	@printf '\n  $(B)trigger$(X) $(D)nothing installed · ~35 min$(X)\n'
	@run="$(call stamped,trigger)"; mkdir -p "$$run"; \
	  bun "$(OPS)/optimize-description.ts" \
	    --eval-set "$(EVALS)/trigger-eval-set.json" \
	    --target-path "$(SKILL)" --target-type skill \
	    --model $(MODEL) --runs-per-query $(RUNS) \
	    $(if $(WORKERS),--num-workers $(WORKERS),) \
	    --results-dir "$$run" \
	    2>&1 1>"$$run/stdout.json" | tee "$$run/trigger.log"; \
	  printf '\n  $(B)summary$(X)\n'; \
	  tail -3 "$$run/trigger.log" 2>/dev/null || true; \
	  printf '  $(D)%s$(X)\n' "$$run"

all: checks measure-trigger measure-disclosure disclosure composition trigger ## everything, in the required order
	@printf '\n  $(B)done$(X)  $(OUT)\n'
	@find "$(OUT)" -maxdepth 3 -type f \( -name '*.md' -o -name '*.json' -o -name '*.txt' \) \
	  | sed 's|$(OUT)/|    |' | sort
	@printf '\n  $(D)read in order: checks must pass; then trigger (precision first, then\n'
	@printf '  which queries lost and to what); then composition; then disclosure.$(X)\n\n'

clean: ## delete every results directory
	@rm -rf "$(HOME)/auq-results" && printf '  $(G)ok$(X)   cleaned\n'
