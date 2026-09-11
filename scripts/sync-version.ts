/**
 * Copies the version from `package.json` into every file that carries it.
 *
 * Changesets bumps `package.json` and nothing else. The plugin's version is
 * read from three more places, so they drift the moment a release runs. This
 * runs directly after `changeset version`, inside the same commit.
 *
 * `--check` verifies instead of writing, and exits non-zero on a mismatch.
 * The release workflow runs that before it cuts anything.
 */

const ROOT = new URL("..", import.meta.url);

/** A file carrying the version, and the path to it within that file. */
const TARGETS = [
  { path: ".claude-plugin/plugin.json", at: ["version"] },
  { path: "gemini-extension.json", at: ["version"] },
  { path: "skills/ask-user-question/SKILL.md", at: ["metadata", "version"] },
] as const;

const check = process.argv.includes("--check");

async function readVersion(): Promise<string> {
  const pkg = await Bun.file(new URL("package.json", ROOT)).json();
  const version = pkg.version;
  if (typeof version !== "string" || version.length === 0) {
    throw new Error("package.json carries no version");
  }
  return version;
}

/** Rewrites `"version": "..."` under the given key path, keeping the file's formatting. */
function replaceInJson(text: string, at: readonly string[], version: string): string {
  const key = at[at.length - 1];
  const pattern = new RegExp(`("${key}"\\s*:\\s*")[^"]*(")`);
  if (!pattern.test(text)) {
    throw new Error(`no "${key}" field found`);
  }
  return text.replace(pattern, `$1${version}$2`);
}

/** Rewrites `version: "..."` inside the SKILL.md frontmatter only. */
function replaceInFrontmatter(text: string, version: string): string {
  const end = text.indexOf("\n---", 3);
  if (!text.startsWith("---") || end === -1) {
    throw new Error("no frontmatter found");
  }
  const head = text.slice(0, end);
  const tail = text.slice(end);
  const pattern = /(^\s+version:\s*")[^"]*(")/m;
  if (!pattern.test(head)) {
    throw new Error("no version field in frontmatter");
  }
  return head.replace(pattern, `$1${version}$2`) + tail;
}

const version = await readVersion();
const stale: string[] = [];

for (const target of TARGETS) {
  const file = Bun.file(new URL(target.path, ROOT));
  const before = await file.text();
  const after = target.path.endsWith(".md")
    ? replaceInFrontmatter(before, version)
    : replaceInJson(before, target.at, version);

  if (before === after) continue;

  if (check) {
    stale.push(target.path);
  } else {
    await Bun.write(file, after);
    console.log(`  ${target.path} -> ${version}`);
  }
}

if (check && stale.length > 0) {
  console.error(`version mismatch against package.json (${version}):`);
  for (const path of stale) console.error(`  ${path}`);
  console.error("\nrun: bun run sync-version");
  process.exit(1);
}

console.log(check ? `all files agree on ${version}` : `synced to ${version}`);
