# ask-user-question — measurement targets.
#
# Order matters and the targets encode it. `trigger` measures the INSTALLED skill against
# its real neighbours, so it installs first. `disclosure` and `composition` ask whether an
# agent CHOOSES to read files from a path; an installed copy arrives through the skill
# system instead, so no Read ever happens and every file scores a meaningless zero. Those
# two park the installed copy and restore it.
#
# Serial by design: two of these at once saturates the connection and every call fails.
#
#   make            list targets
#   make doctor     check the environment before spending 35 minutes
#   make checks     free, seconds
#   make trigger    routing, ~35 min
#
# Override anything:  make composition RUNS=1 OUT=/tmp/x

SHELL       := /bin/bash
.DEFAULT_GOAL := help

ROOT        := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))
SKILL       := $(ROOT)/skills/ask-user-question
EVALS       := $(ROOT)/evals
INSTALLED   := $(HOME)/.claude/skills/ask-user-question
STAMP       := $(shell date +%Y-%m-%d_%H%M%S)
OUT         ?= $(HOME)/auq-results/$(STAMP)

# zsh -- the macOS default -- does not tilde-expand after `=` in a command argument,
# where bash does. So `make trigger SKILL_CREATOR_DIR=~/Downloads/skill-creator`,
# which is the line this Makefile prints as the fix, arrives with a literal ~ and
# every test against the path fails on a directory the user can see with ls.
# Expanding it here is the only place that can tell the two shells apart.
tilde        = $(patsubst ~/%,$(HOME)/%,$(patsubst ~,$(HOME),$(1)))

# skill-creator is imported rather than vendored. `trigger` reuses its seeded
# train/holdout split -- reimplementing that locally would silently change which
# queries land in the holdout and make every number in RESULTS-baseline.json
# incomparable without anything reporting it. `disclosure` runs its optimizer.
#
# A downloaded zip unpacks under whatever name the zip carried (skillcreator2,
# skill-creator_1, ...), so the folder is probed rather than assumed: the usual
# spots first, then one and two levels down in Downloads, looking for the file
# the trigger runner actually imports. Override to skip the probe entirely.
SC_PROBE    := skills/skill-creator/scripts/run-loop.ts
SC_LOOK     := $(HOME)/Downloads/skill-creator $(HOME)/Dev/ACMElabs/skill-creator \
               $(wildcard $(HOME)/Downloads/*/) $(wildcard $(HOME)/Downloads/*/*/)
SKILL_CREATOR_DIR ?= $(patsubst %/,%,$(firstword \
                       $(foreach d,$(SC_LOOK),$(if $(wildcard $(d)/$(SC_PROBE)),$(d))) \
                       $(HOME)/Downloads/skill-creator))

# `override` is required, not decoration: a variable set on the command line beats an
# ordinary assignment in the makefile, so without it the expansion above would be
# discarded for exactly the case it exists to fix.
override SKILL_CREATOR_DIR := $(call tilde,$(SKILL_CREATOR_DIR))
override OUT := $(call tilde,$(OUT))

OPT         := $(SKILL_CREATOR_DIR)/skills/skill-creator/scripts/optimize-disclosure.ts
export SKILL_CREATOR_DIR

MODEL       ?= opus
RUNS        ?= 3

# Three worker counts, because the three kinds of call are not the same size, and one of
# them is not ours to choose.
#
# The shared hazard, in skill-creator's words: rate limiting is "the one failure that
# corrupts rather than merely slows a measurement, since a rate-limited run is recorded
# as a failed run." Contention does not surface as an error. It surfaces as a worse
# skill -- recall down, precision up, nothing red on screen. Watch the `!` and `?`
# tallies on the progress bar; at these counts they should read zero.
#
# WORKERS      trigger. One turn, dies at the first tool call. skill-creator's
#              equivalent sweep (run-eval.ts) uses 10; these probes are shorter, so 8 is
#              conservative rather than tuned. Raising it toward 12 is defensible.
# COMP_WORKERS composition. Each attempt is a full engagement plus a judge call, so 4 is
#              already about 8 concurrent streams. It is also what every figure in
#              composition/results-first-run was measured at.
# DISC_WORKERS disclosure. EMPTY ON PURPOSE -- see below.
WORKERS      ?= 12
COMP_WORKERS ?= 8

# Left unset so `optimize-disclosure.ts` uses its own default, currently 12, arrived at
# from measurements this repo did not make: that a worker there is blocked on the API for
# nearly its whole slot, so the limit is account concurrency rather than cores. This
# Makefile used to pass 8, which quietly overrode a tuned decision with an arbitrary
# number and made the run slower than designed. Pinning 12 here would be the same mistake
# with a better number -- it would stick at 12 after they retune.
#
# The skill itself settles it. skills/skill-creator/SKILL.md prescribes exactly one
# invocation and it carries no worker flag at all:
#
#     bun scripts/optimize-disclosure.ts --skill-path <skill-dir> --scenarios evals/evals.json
#
# SKILL.md does not mention workers or concurrency anywhere. Omitting the flag IS the
# documented invocation, so passing 8 was not a tuning choice, it was a contradiction.
#
# The 5 and 6 elsewhere in that repo are from evals/drivers/run-measurement.ts, which is
# outside skills/skill-creator/ and does not ship with the skill: it is how the repo
# measures ITSELF across every skill back to back, where a shared denominator beats wall
# clock. Precedent if failures cluster, not instruction.
DISC_WORKERS ?=

B := \033[1m
D := \033[2m
G := \033[32m
R := \033[31m
Y := \033[33m
C := \033[36m
X := \033[0m

# Names this skill has shipped under. A copy under any of them competes for the same
# queries and wins some, which reads as a broken description rather than a duplicate.
OLD_NAMES   := asking-users-questions surface-decisions user-choices
FIND_OLD     = find $(HOME)/.claude/skills $(HOME)/.claude/plugins -maxdepth 3 \
                 $(foreach n,$(OLD_NAMES),-name '$(n)' -o) -false \
                 2>/dev/null | grep -v '^$(INSTALLED)$$'

.PHONY: help doctor require-sc checks disclosure composition trigger all install uninstall purge-old park unpark clean

help: ## show this
	@printf '\n  $(B)ask-user-question$(X)  $(D)measurement targets$(X)\n\n'
	@grep -hE '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) \
	  | awk 'BEGIN{FS=":.*?## "}{printf "  $(C)%-13s$(X) %s\n", $$1, $$2}'
	@printf '\n  $(B)vars$(X)  OUT=$(D)%s$(X)\n' '$(OUT)'
	@printf '        MODEL=$(D)$(MODEL)$(X)  RUNS=$(D)$(RUNS)$(X)\n'
	@printf '        WORKERS=$(D)$(WORKERS)$(X) $(D)(trigger)$(X)  COMP_WORKERS=$(D)$(COMP_WORKERS)$(X) $(D)(composition)$(X)\n'
	@printf '        DISC_WORKERS=$(D)$(if $(DISC_WORKERS),$(DISC_WORKERS),unset — optimize-disclosure.ts decides)$(X)\n'
	@printf '        SKILL_CREATOR_DIR=$(D)$(SKILL_CREATOR_DIR)$(X)\n\n'
	@printf '  $(D)trigger needs the skill installed; disclosure and composition need it$(X)\n'
	@printf '  $(D)absent. Both are handled for you. The long runs draw a percentage on$(X)\n'
	@printf '  $(D)stderr, so the report on stdout stays clean and you can watch either.$(X)\n\n'

doctor: ## check the environment before spending 35 minutes
	@printf '\n  $(B)doctor$(X)\n'
	@command -v bun    >/dev/null && printf '  $(G)ok$(X)   bun\n'    || { printf '  $(R)no$(X)   bun not on PATH\n'; exit 1; }
	@command -v claude >/dev/null && printf '  $(G)ok$(X)   claude\n' || { printf '  $(R)no$(X)   claude not on PATH\n'; exit 1; }
	@test -f "$(SKILL)/SKILL.md" && printf '  $(G)ok$(X)   skill\n'   || { printf '  $(R)no$(X)   no SKILL.md at $(SKILL)\n'; exit 1; }
	@$(MAKE) --no-print-directory require-sc SC_FATAL=0
	@old=$$($(FIND_OLD)); \
	  if [ -n "$$old" ]; then \
	    printf '  $(R)no$(X)   an older copy is installed and will win some queries:\n'; \
	    for p in $$old; do printf '       $(D)%s$(X)\n' "$$p"; done; \
	    printf '       $(D)run$(X) $(C)make purge-old$(X) $(D)then try again$(X)\n'; exit 1; \
	  else printf '  $(G)ok$(X)   no older copy installed\n'; fi
	@printf '  $(G)ok$(X)   results -> $(D)$(OUT)$(X)\n\n'

# Hard gate for the two targets that import skill-creator, and -- with SC_FATAL=0 --
# the line `doctor` prints. One recipe rather than two, so the warning and the refusal
# cannot drift apart the way the old pair did, where doctor tested for
# optimize-disclosure.ts while trigger actually imports run-loop.ts.
#
# `checks` and `composition` are self-contained and must still run without it, which is
# why doctor warns instead of failing. But starting a 35-minute trigger run that cannot
# import its split is worse than not starting.
SC_FATAL    ?= 1
require-sc:
	@if test -f "$(SKILL_CREATOR_DIR)/$(SC_PROBE)"; then \
	   [ "$(SC_FATAL)" = 1 ] || printf '  $(G)ok$(X)   skill-creator $(D)$(SKILL_CREATOR_DIR)$(X)\n'; \
	   exit 0; \
	 fi; \
	 if [ "$(SC_FATAL)" = 1 ]; then printf '\n  $(R)no$(X)   '; else printf '  $(Y)!$(X)    '; fi; \
	 if ! test -d "$(SKILL_CREATOR_DIR)"; then \
	   printf 'skill-creator: no such directory\n'; \
	   printf '       $(D)%s$(X)\n' '$(SKILL_CREATOR_DIR)'; \
	 else \
	   printf 'skill-creator is there, but its scripts are not\n'; \
	   printf '       $(D)%s$(X)\n' '$(SKILL_CREATOR_DIR)'; \
	   printf '       $(D)contains no$(X) $(D)$(SC_PROBE)$(X)$(D), only:$(X)\n'; \
	   ls "$(SKILL_CREATOR_DIR)" 2>/dev/null | head -8 | tr '\n' ' ' | sed 's/^/         /'; printf '\n'; \
	 fi; \
	 case '$(SKILL_CREATOR_DIR)' in /*) ;; *) \
	   printf '       $(Y)that is not an absolute path.$(X) $(D)make expands $$ in a command-line$(X)\n'; \
	   printf '       $(D)value, so a quoted $$HOME becomes OME. Paste the path itself.$(X)\n' ;; \
	 esac; \
	 printf '       $(D)point at the folder that contains$(X) skills/$(D):$(X)\n'; \
	 printf '       $(C)make trigger SKILL_CREATOR_DIR=$(HOME)/Downloads/skill-creator$(X)\n'; \
	 if [ "$(SC_FATAL)" = 1 ]; then printf '\n'; exit 1; fi

checks: ## frontmatter + linter, no model calls, seconds
	@printf '\n  $(B)checks$(X) $(D)no model calls$(X)\n'
	@mkdir -p "$(OUT)"
	@bun "$(EVALS)/frontmatter.test.ts"        | tee "$(OUT)/frontmatter.txt" | tail -2
	@bun "$(EVALS)/composition/checks.test.ts" | tee "$(OUT)/checks.txt"      | tail -1
	@printf '\n'

park:
	@test -d "$(INSTALLED)" && mv "$(INSTALLED)" "$(INSTALLED).parked" \
	  && printf '  $(D)installed copy parked$(X)\n' || true

unpark:
	@test -d "$(INSTALLED).parked" && mv "$(INSTALLED).parked" "$(INSTALLED)" || true

install: ## copy the skill into ~/.claude/skills
	@rm -rf "$(INSTALLED)" && cp -r "$(SKILL)" "$(HOME)/.claude/skills/" \
	  && printf '  $(G)ok$(X)   installed $(D)$(INSTALLED)$(X)\n'

purge-old: ## remove copies installed under this skill's previous names
	@old=$$($(FIND_OLD)); \
	  if [ -z "$$old" ]; then printf '  $(G)ok$(X)   nothing to remove\n'; exit 0; fi; \
	  for p in $$old; do \
	    case "$$p" in \
	      $(HOME)/.claude/plugins/*) \
	        printf '  $(Y)!$(X)    $(D)%s$(X)\n' "$$p"; \
	        printf '       $(D)left alone: deleting a plugin directory can take unrelated$(X)\n'; \
	        printf '       $(D)skills with it. Remove that plugin through your plugin manager.$(X)\n' ;; \
	      *) rm -rf "$$p" && printf '  $(G)ok$(X)   removed $(D)%s$(X)\n' "$$p" ;; \
	    esac; \
	  done

uninstall: ## remove it again
	@rm -rf "$(INSTALLED)" "$(INSTALLED).parked" && printf '  $(G)ok$(X)   removed\n'

disclosure: doctor require-sc ## which references get read, and what a run costs (~5 min)
	@printf '\n  $(B)disclosure$(X) $(D)skill parked · ~5 min$(X)\n'
	@mkdir -p "$(OUT)"
	@$(MAKE) --no-print-directory park
	@bun "$(OPT)" \
	    --skill-path "$(SKILL)" \
	    --scenarios "$(EVALS)/composition/disclosure-evals.json" \
	    --model $(MODEL) --max-iterations 1 --holdout 0 \
	    $(if $(DISC_WORKERS),--num-workers $(DISC_WORKERS),) \
	    --permission-mode acceptEdits \
	    --results-dir "$(OUT)/disclosure" 2>&1 | tee "$(OUT)/disclosure.txt" \
	    | awk '{ if (length($$0) < 200) { print; fflush() } }'; \
	  $(MAKE) --no-print-directory unpark; \
	  printf '\n  $(B)summary$(X)\n'; \
	  grep -E '"verdict"|"pullRate"|body_tokens|context_tokens|Report:' "$(OUT)/disclosure.txt" || true; \
	  exit 0

composition: doctor ## three arms, judge on (~45 min)
	@printf '\n  $(B)composition$(X) $(D)3 arms · judge on · ~45 min$(X)\n'
	@mkdir -p "$(OUT)/composition"
	@$(MAKE) --no-print-directory park
	@bun "$(EVALS)/composition/composition-runner.ts" \
	    --arm baseline,skill,disclosed --runs $(RUNS) --workers $(COMP_WORKERS) \
	    --out "$(OUT)/composition" > "$(OUT)/composition/report.md"; \
	  $(MAKE) --no-print-directory unpark; \
	  sed -n '/^## Headline/,/^$$/p' "$(OUT)/composition/report.md" | head -22

trigger: doctor require-sc install ## does the router reach for the skill (~35 min)
	@printf '\n  $(B)trigger$(X) $(D)skill installed · ~35 min$(X)\n'
	@mkdir -p "$(OUT)/trigger"
	@bun "$(EVALS)/trigger-runner.ts" \
	    --eval-set "$(EVALS)/trigger-eval-set.json" \
	    --target ask-user-question --runs $(RUNS) --workers $(WORKERS) \
	    --out "$(OUT)/trigger" > "$(OUT)/trigger/report.md" || true
	@sed -n '/^## All queries/,/^|:/p' "$(OUT)/trigger/report.md" | head -6

all: checks disclosure composition trigger ## everything, in the required order (~90 min)
	@printf '\n  $(B)done$(X)  $(OUT)\n'
	@find "$(OUT)" -maxdepth 2 -type f \( -name '*.md' -o -name '*.json' -o -name '*.txt' \) \
	  | sed 's|$(OUT)/|    |' | sort
	@printf '\n  $(D)read in order: checks must pass; then trigger (precision first, then\n'
	@printf '  which queries lost and to what); then composition; then disclosure.$(X)\n\n'

clean: ## delete every results directory
	@rm -rf "$(HOME)/auq-results" && printf '  $(G)ok$(X)   cleaned\n'
