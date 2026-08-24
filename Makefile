# ask-user-question — measurement targets.
#
# Every model-calling target runs an operation out of plugin-kit. Those operations isolate
# their own measurement: each run copies the artifact under a unique alias into a throwaway
# project root and spawns with `--setting-sources project --strict-mcp-config`, so the
# machine's own skills, settings and MCP servers stay out of the result.
#
# Nothing here installs the skill, and nothing here writes into the Claude config
# directory. That is a correctness requirement, not hygiene: a machine-visible copy of this
# skill is served to the model through the skill system, which never produces a `Read`, so
# every bundled file scores a pull rate of zero. The disclosure report then reads as a
# clean table of `prune` verdicts on files that are in fact load-bearing.
#
# Serial by design: two of these at once saturates the connection and every call fails.
#
#   make                     list targets
#   make doctor              check the environment before spending 35 minutes
#   make checks              free, seconds
#   make measure-disclosure  what the skill costs as authored, nothing changed
#   make trigger             routing, ~35 min
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
# and logs inside it. Two independent reasons, and the second is the one that bites:
#
#  - Bun opens an output file without O_TRUNC, so re-running into a populated directory
#    leaves the tail of the previous, longer record spliced onto the new, shorter one. It
#    is far more dangerous in a `.log` than in a `.json`, because nothing parses a log and
#    a stale warning reads as a current one.
#  - Results written inside the skill directory become bundled files, which the next
#    disclosure run then measures as part of the artifact. `--apply` compounds it: its
#    default target is `<results-dir>/best-layout` and it is `rm -rf`ed before the layout
#    is copied in, so a results directory inside the skill would delete the skill.
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

# --no-early-stop is not passed by any target below, and that is a finding rather than an
# omission. The flag exists only on the two scripts built from SHARED_EVAL_FLAGS
# (measure-triggering.ts, optimize-description.ts).
#
#  - `trigger` runs optimize-description.ts, which is an OPTIMIZER: it ranks iterations on
#    pass COUNTS, which early stopping cannot change. Omitted deliberately.
#  - `disclosure` runs optimize-disclosure.ts, also an optimizer, and the flag does not
#    exist there at all.
#  - `measure-disclosure` is the one target whose headline output is a RATE. Its script has
#    no early-stop mechanism to disable: every scenario runs --runs-per-scenario times, so
#    its rates are full-N by construction.
#
# A future `measure-trigger` target reading per-query trigger rates off
# measure-triggering.ts directly is where this flag would belong.

B := \033[1m
D := \033[2m
G := \033[32m
R := \033[31m
Y := \033[33m
C := \033[36m
X := \033[0m

# Names this skill has shipped under. A copy under any of them competes for the same
# queries and wins some, which reads as a broken description rather than a duplicate.
# plugin-kit's own install sweep cannot catch these: it looks for the artifact's CURRENT
# name, so a copy called `asking-users-questions` is invisible to it and visible to the
# router.
OLD_NAMES   := asking-users-questions surface-decisions user-choices
FIND_OLD     = find $(CLAUDE_DIR)/skills $(CLAUDE_DIR)/plugins -maxdepth 3 \
                 $(foreach n,$(OLD_NAMES),-name '$(n)' -o) -false \
                 2>/dev/null

.PHONY: help doctor require-kit checks measure-disclosure disclosure composition trigger all purge-old clean

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
	    printf '       $(D)run$(X) $(C)make purge-old$(X) $(D)then try again$(X)\n'; exit 1; \
	  else printf '  $(G)ok$(X)   no older copy installed\n'; fi
	@printf '  $(G)ok$(X)   results -> $(D)$(OUT)$(X)\n\n'

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

purge-old: ## remove copies installed under this skill's previous names
	@old=$$($(FIND_OLD)); \
	  if [ -z "$$old" ]; then printf '  $(G)ok$(X)   nothing to remove\n'; exit 0; fi; \
	  for p in $$old; do \
	    case "$$p" in \
	      $(CLAUDE_DIR)/plugins/*) \
	        printf '  $(Y)!$(X)    $(D)%s$(X)\n' "$$p"; \
	        printf '       $(D)left alone: deleting a plugin directory can take unrelated$(X)\n'; \
	        printf '       $(D)skills with it. Remove that plugin through your plugin manager.$(X)\n' ;; \
	      *) rm -rf "$$p" && printf '  $(G)ok$(X)   removed $(D)%s$(X)\n' "$$p" ;; \
	    esac; \
	  done

measure-disclosure: doctor require-kit ## what the skill costs as authored, nothing restructured
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

disclosure: doctor require-kit ## measure, then propose a cheaper layout and re-measure
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

composition: doctor ## three arms, judge on (~45 min)
	@printf '\n  $(B)composition$(X) $(D)3 arms · judge on · ~45 min$(X)\n'
	@run="$(call stamped,composition)"; mkdir -p "$$run"; \
	  bun "$(EVALS)/composition/composition-runner.ts" \
	    --arm baseline,skill,disclosed --runs $(RUNS) --workers $(COMP_WORKERS) \
	    --out "$$run" > "$$run/report.md"; \
	  sed -n '/^## Headline/,/^$$/p' "$$run/report.md" | head -22; \
	  printf '  $(D)%s$(X)\n' "$$run"

trigger: doctor require-kit ## does the router reach for the skill (~35 min)
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

all: checks measure-disclosure disclosure composition trigger ## everything, in the required order
	@printf '\n  $(B)done$(X)  $(OUT)\n'
	@find "$(OUT)" -maxdepth 3 -type f \( -name '*.md' -o -name '*.json' -o -name '*.txt' \) \
	  | sed 's|$(OUT)/|    |' | sort
	@printf '\n  $(D)read in order: checks must pass; then trigger (precision first, then\n'
	@printf '  which queries lost and to what); then composition; then disclosure.$(X)\n\n'

clean: ## delete every results directory
	@rm -rf "$(HOME)/auq-results" && printf '  $(G)ok$(X)   cleaned\n'
