#!/usr/bin/env bash
# Rename the skill and plugin. One argument: the new name, lowercase-hyphenated.
set -euo pipefail
NEW="${1:?usage: rename.sh <new-name>}"
OLD="ask-user-question"
[ "$NEW" = "$OLD" ] && { echo "no change"; exit 0; }
git mv "skills/$OLD" "skills/$NEW" 2>/dev/null || mv "skills/$OLD" "skills/$NEW"

# `sed -i` takes a mandatory backup-suffix argument on BSD sed, which is the macOS default,
# and an optional one on GNU sed. Written GNU-style this does not edit anything: BSD reads
# the s/// script as the suffix and then has no script left, so the run fails outright.
# `-i ''` is the one spelling both accept.
# Four directories are excluded, and only one of them for tidiness. `node_modules` is
# volume. `.git` is the object store, where a blind sed corrupts history. `history` and
# `results` under evals/ are frozen measurement records -- rewriting a record so it matches
# a later name destroys the provenance the record exists to carry. `docs` is excluded
# because those are Brain knowledge-graph notes: they carry relations and permalinks that a
# text substitution cannot keep consistent, and they are edited through Brain MCP rather
# than through sed. Rename them deliberately, afterwards.
grep -rl "$OLD" --include='*.md' --include='*.ts' --include='*.json' \
  --exclude-dir=node_modules --exclude-dir=.git \
  --exclude-dir=history --exclude-dir=results --exclude-dir=docs . \
  | xargs sed -i '' "s/$OLD/$NEW/g"

echo "renamed $OLD -> $NEW"
echo "still yours to do: the GitHub repo name, and re-run 'make measure-trigger'"
echo "docs/ was skipped on purpose -- rename those notes through Brain MCP"
echo "the old name also needs adding to OLD_NAMES in the Makefile, so 'make doctor'"
echo "can spot a stale copy still answering to it"
