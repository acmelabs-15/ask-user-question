/**
 * Prints the CHANGELOG.md section for one version.
 *
 * Changesets writes the release notes into CHANGELOG.md under a `## <version>`
 * heading. The GitHub release should carry that same text rather than a second,
 * auto-generated list of merged pull requests.
 *
 * Usage: bun run scripts/release-notes.ts 0.2.0
 */

const version = process.argv[2];
if (!version) {
  console.error("usage: release-notes.ts <version>");
  process.exit(1);
}

const path = new URL("../CHANGELOG.md", import.meta.url);
const file = Bun.file(path);

if (!(await file.exists())) {
  console.log(`Release ${version}.`);
  process.exit(0);
}

const lines = (await file.text()).split("\n");

// Changesets writes `## 0.2.0`. Find that heading, then stop at the next one.
const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const heading = new RegExp(`^##\\s+v?${escaped}\\s*$`);

const start = lines.findIndex((line) => heading.test(line));
if (start === -1) {
  console.log(`Release ${version}.`);
  process.exit(0);
}

const rest = lines.slice(start + 1);
const end = rest.findIndex((line) => /^##\s/.test(line));
const body = (end === -1 ? rest : rest.slice(0, end)).join("\n").trim();

console.log(body.length > 0 ? body : `Release ${version}.`);
