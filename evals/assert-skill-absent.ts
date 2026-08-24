#!/usr/bin/env bun
/**
 * Refuses a disclosure measurement while a competing copy of the skill is installed.
 *
 * A disclosure sweep measures which bundled files an agent chooses to READ. Content served
 * to the model through the skill system never produces a Read, so a run against an
 * installed copy scores every bundled file at a pull rate of zero. The output is a
 * clean-looking table of `prune` verdicts on files that are load-bearing, and nothing in it
 * says the measurement was void. That fault voided this project's previous disclosure
 * numbers once already.
 *
 * plugin-kit's `optimize-disclosure.ts` detects this and writes it into its envelope as an
 * install conflict. `measure-disclosure.ts` builds no envelope and calls no detector, so it
 * reports nothing at all. This script is the missing pre-flight for that path, and it runs
 * before either operation so the refusal costs seconds rather than 45 minutes.
 *
 *   bun assert-skill-absent.ts <skill-dir>
 *
 * exit 0  absent        nothing answers to this name and every search root was readable
 * exit 1  installed     one or more separate copies answer to it
 * exit 2  undetermined  a root exists and would not enumerate, so absence is unproven
 *
 * Exit 2 is deliberately not a pass. "Nothing found" and "nothing found where I could
 * look" are the same output and opposite claims, and a guard that conflates them reports
 * success on the strength of having failed to look.
 */

/** The four roots the loader reads from, in the order a report should present them. */
export function searchRoots(home: string, projectDir: string): ReadonlyArray<Root> {
  const roots: Root[] = [];
  if (home !== "") {
    roots.push({ path: `${home}/.claude/skills`, origin: "user" });
    roots.push({ path: `${home}/.claude/plugins/marketplaces`, origin: "plugin" });
    roots.push({ path: `${home}/.claude/plugins/repos`, origin: "plugin" });
  }
  roots.push({ path: `${projectDir}/.claude/skills`, origin: "project" });
  return roots;
}

export interface Root {
  readonly path: string;
  readonly origin: string;
}

/** Directories holding copies, caches or scaffolds rather than live skills. */
const SKIP_SEGMENTS = ["node_modules", ".git", "cache", "template", "templates", "__tests__"];

export type State = "absent" | "installed" | "undetermined";

export interface Sighting {
  readonly state: State;
  /** Absolute paths of every SKILL.md answering to the name, excluding the source. */
  readonly sightings: readonly string[];
  /** Roots that exist and refused to enumerate, so the sweep is blind to them. */
  readonly blindRoots: readonly string[];
}

/**
 * The name the loader would use for the skill at `dir`.
 *
 * Frontmatter `name:` when present, the directory name otherwise, matching the loader's own
 * fallback. A skill whose frontmatter names something other than its directory is the case
 * that makes reading the file necessary rather than optional.
 */
export async function skillName(skillMdPath: string, fallback: string): Promise<string> {
  let text: string;
  try {
    text = await Bun.file(skillMdPath).text();
  } catch {
    return fallback;
  }
  const fence = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (fence === null) return fallback;
  for (const line of fence[1]!.split("\n")) {
    const match = /^name:\s*(.+?)\s*$/.exec(line);
    if (match !== null) {
      const value = match[1]!.replace(/^["'](.*)["']$/, "$1").trim();
      if (value !== "") return value;
    }
  }
  return fallback;
}

function parentSegment(relativePath: string): string {
  const segments = relativePath.split("/");
  // `||` not `??`: an empty segment must fall through to the whole path, as the loader does.
  return segments.at(-2) || relativePath;
}

/** Sweep the four roots for any SKILL.md answering to `name`, excluding the source itself. */
export async function sweep(params: {
  readonly name: string;
  readonly sourceDir: string;
  readonly home: string;
  readonly projectDir: string;
}): Promise<Sighting> {
  const glob = new Bun.Glob("**/SKILL.md");
  const exclude = `${params.sourceDir.replace(/\/+$/, "")}/SKILL.md`;
  const seen = new Set<string>([exclude]);
  const sightings: string[] = [];
  const blindRoots: string[] = [];

  for (const root of searchRoots(params.home, params.projectDir)) {
    let paths: string[];
    try {
      paths = await Array.fromAsync(
        glob.scan({ cwd: root.path, onlyFiles: true, followSymlinks: false }),
      );
    } catch {
      // `scan` throws identically for "no such directory", "may not read it" and "that is
      // a file", so a stat separates the observation from the blind spot.
      let exists = true;
      try {
        await Bun.file(root.path).stat();
      } catch {
        exists = false;
      }
      if (exists) blindRoots.push(root.path);
      continue;
    }

    for (const relative of paths) {
      if (relative.split("/").some((segment) => SKIP_SEGMENTS.includes(segment))) continue;
      const absolute = `${root.path.replace(/\/+$/, "")}/${relative}`;
      if (seen.has(absolute)) continue;
      seen.add(absolute);
      const found = await skillName(absolute, parentSegment(relative));
      if (found === params.name) sightings.push(absolute);
    }
  }

  if (sightings.length > 0) return { state: "installed", sightings, blindRoots };
  if (blindRoots.length > 0) return { state: "undetermined", sightings, blindRoots };
  return { state: "absent", sightings, blindRoots };
}

const EXIT: Record<State, number> = { absent: 0, installed: 1, undetermined: 2 };

async function main(): Promise<void> {
  const sourceDir = Bun.argv[2];
  if (sourceDir === undefined || sourceDir === "") {
    console.error("Usage: bun assert-skill-absent.ts <skill-dir>");
    process.exit(2);
  }

  const trimmed = sourceDir.replace(/\/+$/, "");
  const name = await skillName(`${trimmed}/SKILL.md`, parentSegment(`${trimmed}/SKILL.md`));
  const result = await sweep({
    name,
    sourceDir: trimmed,
    home: Bun.env.HOME ?? "",
    projectDir: process.cwd(),
  });

  if (result.state === "absent") {
    console.error(`  ok   no installed copy answers to \`${name}\``);
    process.exit(0);
  }

  if (result.state === "installed") {
    const count = result.sightings.length;
    console.error(
      `\n  INSTALLED COPY FOUND: ${count} ` +
        `${count === 1 ? "copy answers" : "copies answer"} to \`${name}\`:`,
    );
    for (const path of result.sightings) console.error(`       ${path}`);
    console.error(
      "\n  A disclosure run measures which bundled files get READ. Content served through\n" +
        "  the skill system produces no Read, so such a run scores every file at a pull rate\n" +
        "  of zero and reports `prune` on all of them. Remove or rename the copies above\n" +
        "  before measuring disclosure. `make purge-old` reports copies under this skill's\n" +
        "  previous names.",
    );
    process.exit(EXIT.installed);
  }

  console.error(
    `\n  CANNOT CONFIRM ABSENCE: ${result.blindRoots.length} search root(s) exist and would\n` +
      "  not enumerate, so a copy installed under one of them would not appear here:",
  );
  for (const path of result.blindRoots) console.error(`       ${path}`);
  console.error(
    "\n  Reported rather than passed over: an unreadable root and an empty one look identical\n" +
      "  from here and mean opposite things. Fix the permissions, or accept the risk\n" +
      "  deliberately by reading the caveat into whatever the run produces.",
  );
  process.exit(EXIT.undetermined);
}

if (import.meta.main) await main();
