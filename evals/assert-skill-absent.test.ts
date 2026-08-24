#!/usr/bin/env bun
/**
 * Tests the disclosure pre-flight guard against trees built in a temp directory.
 *
 * The guard's whole value is that it fails when it should, so the cases that matter are the
 * ones where a weaker check would pass: a copy whose frontmatter name differs from its
 * directory name, a copy under a plugin root rather than the user skills root, and a root
 * that exists but will not enumerate. A guard that only handles ~/.claude/skills/<name>/
 * would report a clean absence in all three.
 *
 *   bun assert-skill-absent.test.ts
 */

import { rmSync } from "node:fs";
import { searchRoots, skillName, sweep } from "./assert-skill-absent.ts";

let failures = 0;
const check = (ok: boolean, label: string, detail = ""): void => {
  if (!ok) failures++;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}${detail === "" ? "" : `  (${detail})`}`);
};

const scratch = `${Bun.env.TMPDIR?.replace(/\/+$/, "") ?? "/tmp"}/auq-guard-${Bun.randomUUIDv7().slice(0, 8)}`;

/** Write a SKILL.md at `dir`, with frontmatter naming `name` when one is given. */
async function plant(dir: string, name?: string): Promise<void> {
  const frontmatter =
    name === undefined ? "---\ndescription: x\n---\n" : `---\nname: ${name}\ndescription: x\n---\n`;
  await Bun.write(`${scratch}/${dir}/SKILL.md`, `${frontmatter}\nbody\n`);
}

const home = `${scratch}/home`;
const project = `${scratch}/project`;
const source = `${scratch}/repo/skills/ask-user-question`;

await plant("repo/skills/ask-user-question", "ask-user-question");

// --- the source alone is not an installation -----------------------------------------
const clean = await sweep({ name: "ask-user-question", sourceDir: source, home, projectDir: project });
check(clean.state === "absent", "source's own SKILL.md is excluded from the sweep", clean.state);
check(clean.sightings.length === 0, "no sightings against an empty machine");

// --- a copy under the user skills root ------------------------------------------------
await plant("home/.claude/skills/ask-user-question", "ask-user-question");
const installed = await sweep({ name: "ask-user-question", sourceDir: source, home, projectDir: project });
check(installed.state === "installed", "a copy under ~/.claude/skills is found", installed.state);

// --- frontmatter name wins over directory name ----------------------------------------
// The case a directory-name-only check misses: the folder says one thing, the loader reads
// another, and the router answers to what the loader read.
await plant("home/.claude/skills/some-other-folder", "ask-user-question");
const renamed = await sweep({ name: "ask-user-question", sourceDir: source, home, projectDir: project });
check(
  renamed.sightings.some((p) => p.includes("some-other-folder")),
  "a copy whose DIRECTORY name differs but whose frontmatter matches is found",
  `${renamed.sightings.length} sighting(s)`,
);

// --- directory name is the fallback when frontmatter names nothing ---------------------
check(
  (await skillName(`${scratch}/nope/SKILL.md`, "fallback-name")) === "fallback-name",
  "an unreadable SKILL.md falls back to the directory name",
);
await plant("home/.claude/skills/nameless-dir");
check(
  (await skillName(`${scratch}/home/.claude/skills/nameless-dir/SKILL.md`, "nameless-dir")) ===
    "nameless-dir",
  "frontmatter without a name falls back to the directory name",
);

// --- a copy under a plugin root -------------------------------------------------------
rmSync(`${scratch}/home/.claude/skills`, { recursive: true, force: true });
await plant("home/.claude/plugins/repos/someone/pkg/skills/ask-user-question", "ask-user-question");
const viaPlugin = await sweep({ name: "ask-user-question", sourceDir: source, home, projectDir: project });
check(viaPlugin.state === "installed", "a copy under the plugin repos root is found", viaPlugin.state);

// --- skipped directories ---------------------------------------------------------------
rmSync(`${scratch}/home/.claude/plugins`, { recursive: true, force: true });
await plant("home/.claude/skills/node_modules/vendored/ask-user-question", "ask-user-question");
await plant("home/.claude/skills/templates/ask-user-question", "ask-user-question");
const skipped = await sweep({ name: "ask-user-question", sourceDir: source, home, projectDir: project });
check(
  skipped.state === "absent",
  "copies under node_modules/ and templates/ are not installations",
  skipped.state,
);

// --- a root that exists and will not enumerate ----------------------------------------
// Not a pass: an unreadable root and an empty one look identical and mean the opposite.
rmSync(`${scratch}/home/.claude/skills`, { recursive: true, force: true });
await Bun.write(`${scratch}/home/.claude/skills`, "this is a file, not a directory\n");
const blind = await sweep({ name: "ask-user-question", sourceDir: source, home, projectDir: project });
check(blind.state === "undetermined", "a root that cannot be enumerated is undetermined, not absent", blind.state);
check(blind.blindRoots.length === 1, "the blind root is named", blind.blindRoots.join(", "));

// --- root order ------------------------------------------------------------------------
const roots = searchRoots("/h", "/p").map((r) => r.path);
check(roots.length === 4, "four search roots", String(roots.length));
check(roots[0] === "/h/.claude/skills", "user skills root first", roots[0]);
check(roots[3] === "/p/.claude/skills", "project root last", roots[3]);
check(searchRoots("", "/p").length === 1, "an unset HOME leaves only the project root");

rmSync(scratch, { recursive: true, force: true });
console.log(failures === 0 ? "\nPASS" : `\n${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
