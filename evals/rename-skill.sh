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
grep -rl "$OLD" --include='*.md' --include='*.ts' --include='*.json' . \
  | xargs sed -i '' "s/$OLD/$NEW/g"

echo "renamed $OLD -> $NEW"
echo "still yours to do: the GitHub repo name, and re-run 'make measure-trigger'"
echo "the old name also needs adding to OLD_NAMES in the Makefile, so 'make doctor'"
echo "can spot a stale copy still answering to it"
