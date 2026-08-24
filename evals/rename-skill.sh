#!/usr/bin/env bash
# Rename the skill and plugin. One argument: the new name, lowercase-hyphenated.
set -euo pipefail
NEW="${1:?usage: rename.sh <new-name>}"
OLD="ask-user-question"
[ "$NEW" = "$OLD" ] && { echo "no change"; exit 0; }
git mv "skills/$OLD" "skills/$NEW" 2>/dev/null || mv "skills/$OLD" "skills/$NEW"
grep -rl "$OLD" --include='*.md' --include='*.ts' --include='*.json' . \
  | xargs sed -i "s/$OLD/$NEW/g"
sed -i "s/name === \"$NEW\"/name === \"$NEW\"/" evals/frontmatter.test.ts
echo "renamed $OLD -> $NEW"
echo "still yours to do: the GitHub repo name, and re-run evals/trigger-runner.ts"
