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
 * `make composition` gates on this too, for its `disclosed` arm. That arm counts the same
 * Read calls to decide whether progressive disclosure works, so a visible copy floors its
 * reference recall and precision by the same mechanism -- the injection its `skill` arm
 * relies on does not cover it. Its `baseline` arm is the no-guidance control, which a
 * visible copy contaminates in the opposite direction.
 *
 * plugin-kit's `optimize-disclosure.ts` detects this and writes it into its envelope as an
 * install conflict. `measure-disclosure.ts` builds no envelope and calls no detector, so it
 * reports nothing at all. This script is the missing pre-flight for that path, and it runs
 * before either operation so the refusal costs seconds rather than 45 minutes.
 *
 *   bun assert-skill-absent.ts <skill-dir>
 *
 * exit 0  absent        nothing answers to this name and every route was readable
 * exit 1  installed     this skill is reachable through the skill system
 * exit 2  undetermined  a route would not answer, so absence is unproven
 *
 * Exit 2 is deliberately not a pass. "Nothing found" and "nothing found where I could
 * look" are the same output and opposite claims, and a guard that conflates them reports
 * success on the strength of having failed to look.
 *
 * TWO ROUTES, BECAUSE A CONTENT SWEEP ALONE RETURNED A FALSE PASS.
 *
 * The original guard swept four filesystem roots for a SKILL.md whose frontmatter name
 * matched. That misses a skill registered by CONFIG. Measured on this machine:
 * `ask-user-question@ACMElabs` was installed and ENABLED, its cache at
 * `~/.claude/plugins/cache/ACMElabs/ask-user-question/0.0.1/skills/ask-user-question/` held
 * a single 0-byte `.gitkeep`, and the loader served the real skill from the marketplace's
 * source directory instead. The content sweep found nothing and reported `ok`, while all
 * three gated targets would have produced the void signature.
 *
 * So the config route reads the enabled set from the loader's own view and resolves where
 * each plugin's skills actually live. A stub cache is not unusual: 8 of 19 enabled plugins
 * on the machine this was written against had one, across github, directory and file
 * marketplace sources alike, so this is not one marketplace's quirk.
 *
 * THE TWO ROUTES ASK DIFFERENT QUESTIONS, AND ONLY ONE EXCLUDES THE SOURCE.
 *
 * The content sweep asks "is there a COMPETING copy elsewhere", so it excludes the
 * directory under test -- otherwise every run would trip over itself. The config route asks
 * "is this skill REACHABLE through the skill system", and for that the source directory is
 * not exempt. It cannot be: the live fault is a marketplace whose plugin source resolves TO
 * the directory being measured, so the skill the loader serves is the very artifact under
 * test. That is the worst version of the fault rather than an exempt one -- the model gets
 * the full body free, and every pull rate floors at zero.
 *
 * Which means `absent` no longer means "no duplicate". It means "not reachable".
 *
 * WHAT REACHABILITY IS WORTH, which is narrower than an earlier version of this comment
 * claimed. That version concluded "this project's own plugin must be disabled before
 * disclosure or composition is measured". It was written for an arrangement that no longer
 * holds, and the measurement refutes it, so it is corrected here rather than left to be
 * discovered: reachability from the OPERATOR's loader is only void-making on a measurement
 * path that does not isolate, and every path this repo gates no longer qualifies.
 *
 * `composition-runner.ts`, in the comment on its `ISOLATION_FLAGS` declaration, records that
 * file's own spawn run both ways against a throwaway skill directory: with the flags 0
 * plugin-namespaced entries, without them 97. Critically, in both cases the `disclosed` arm
 * still read SKILL.md and the reference it points to, so isolating does not cost the metric --
 * a flag that silenced `Read` would only have traded one void number for another. The two
 * disclosure entry points reach one spawn, `runScenario` in plugin-kit's
 * `shared/operations/disclosure-measure.ts`, which passes the same pair and runs with `cwd` on
 * a throwaway root.
 *
 * So this guard REPORTS reachability; it does not by itself establish that a run is void. The
 * Makefile passes `GUARD_FATAL=0` on the three isolated targets for that reason, and the
 * fatal path remains for a caller that wants it. Disabling a plugin is NOT the remedy for
 * those targets, and nothing here asks an operator to mutate their configuration.
 *
 * WHEN IT WOULD BE: a measurement path that spawns without both flags, or one that runs in the
 * operator's own tree instead of a throwaway root. Confirm that per entry point rather than
 * inferring it from a sibling script.
 *
 * The fault history above this paragraph is untouched and still explains why the config route
 * exists at all. The stub-cache discovery and the figure it produced are real; what changed is
 * only what a sighting licenses you to conclude.
 */

import { resolve } from "node:path";

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

// ---------------------------------------------------------------------------
// The config route: what the loader has actually enabled, and where it lives
// ---------------------------------------------------------------------------

/** One plugin the loader reports as enabled. */
export interface EnabledPlugin {
  readonly id: string;
  readonly installPath: string;
}

/**
 * The enabled set, from `claude plugin list --json`.
 *
 * The CLI rather than `settings.json` plus `installed_plugins.json`, on this project's own
 * rule that a check must observe the EFFECT and never the configuration that was supposed to
 * produce it. `enabled` is the loader's own verdict, resolved across user, project and local
 * scope; re-deriving it from config files would re-implement loader logic that is free to
 * drift. `--json` is what makes the authoritative source deterministic too -- the human
 * listing states status as a unicode tick, which is not something to parse.
 *
 * Returns undefined rather than an empty list when the CLI cannot be read, because "no
 * plugins are enabled" and "I could not ask" are opposite claims. The caller turns undefined
 * into `undetermined`.
 */
export async function enabledPlugins(timeoutMs = 30_000): Promise<readonly EnabledPlugin[] | undefined> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const proc = Bun.spawn(["claude", "plugin", "list", "--json"], {
      stdin: "ignore",
      stdout: "pipe",
      stderr: "ignore",
      signal: controller.signal,
    });
    const text = await new Response(proc.stdout).text();
    if ((await proc.exited) !== 0) return undefined;
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed)) return undefined;
    const enabled: EnabledPlugin[] = [];
    for (const entry of parsed) {
      if (typeof entry !== "object" || entry === null) continue;
      const row = entry as Record<string, unknown>;
      if (row["enabled"] !== true) continue;
      const id = typeof row["id"] === "string" ? row["id"] : "";
      const installPath = typeof row["installPath"] === "string" ? row["installPath"] : "";
      if (id !== "") enabled.push({ id, installPath });
    }
    return enabled;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Every directory an enabled plugin's skills may live in.
 *
 * `installPath` first, because a populated cache is the normal case. Then the marketplace
 * source, because a stub cache is not: the loader falls back to the source tree and the
 * cache keeps only a placeholder. Both are returned rather than the first that exists, so a
 * partially populated cache cannot hide a skill sitting in the source.
 *
 * An empty list means the plugin could not be located at all, which is a blind spot rather
 * than an absence -- a plugin's name says nothing about the names of the skills inside it,
 * so an unlocatable plugin could be carrying the one being looked for.
 */
export async function pluginSkillRoots(
  plugin: EnabledPlugin,
  marketplaces: Readonly<Record<string, unknown>>,
): Promise<readonly string[]> {
  const roots: string[] = [];
  if (plugin.installPath !== "") roots.push(plugin.installPath);

  const [name, market] = [plugin.id.split("@")[0] ?? "", plugin.id.split("@")[1] ?? ""];
  const entry = marketplaces[market];
  const location =
    typeof entry === "object" && entry !== null
      ? (entry as Record<string, unknown>)["installLocation"]
      : undefined;
  if (typeof location !== "string" || location === "") return roots;

  let manifest: unknown;
  try {
    manifest = await Bun.file(`${location}/.claude-plugin/marketplace.json`).json();
  } catch {
    return roots;
  }
  const declared =
    typeof manifest === "object" && manifest !== null
      ? (manifest as Record<string, unknown>)["plugins"]
      : undefined;
  const entries = Array.isArray(declared) ? declared : Object.values(declared ?? {});
  for (const candidate of entries) {
    if (typeof candidate !== "object" || candidate === null) continue;
    const row = candidate as Record<string, unknown>;
    if (row["name"] !== name) continue;
    // A source is either a bare relative path or an object carrying one.
    const raw = row["source"];
    const source =
      typeof raw === "string"
        ? raw
        : typeof raw === "object" && raw !== null && typeof (raw as Record<string, unknown>)["path"] === "string"
          ? ((raw as Record<string, unknown>)["path"] as string)
          : undefined;
    if (source === undefined) continue;
    roots.push(source.startsWith("/") ? source : resolve(location, source));
  }
  return roots;
}

/**
 * Sweep the enabled plugins for a skill answering to `name`.
 *
 * The source directory is NOT excluded here. See the header: a marketplace whose plugin
 * source resolves to the directory under test is the live fault this route exists for.
 */
export async function sweepEnabledPlugins(params: {
  readonly name: string;
  readonly home: string;
}): Promise<Sighting> {
  const plugins = await enabledPlugins();
  if (plugins === undefined) {
    return { state: "undetermined", sightings: [], blindRoots: ["claude plugin list --json"] };
  }

  let marketplaces: Record<string, unknown> = {};
  try {
    marketplaces = (await Bun.file(
      `${params.home}/.claude/plugins/known_marketplaces.json`,
    ).json()) as Record<string, unknown>;
  } catch {
    // Not fatal on its own: a populated cache needs no marketplace lookup. An enabled
    // plugin that then fails to locate is reported as the blind spot it is, below.
  }

  const glob = new Bun.Glob("**/SKILL.md");
  const sightings: string[] = [];
  const blindRoots: string[] = [];
  const seen = new Set<string>();

  for (const plugin of plugins) {
    const roots = await pluginSkillRoots(plugin, marketplaces);
    let located = false;
    for (const root of roots) {
      let paths: string[];
      try {
        paths = await Array.fromAsync(glob.scan({ cwd: root, onlyFiles: true, followSymlinks: false }));
      } catch {
        continue;
      }
      located = true;
      for (const relative of paths) {
        if (relative.split("/").some((segment) => SKIP_SEGMENTS.includes(segment))) continue;
        const absolute = `${root.replace(/\/+$/, "")}/${relative}`;
        if (seen.has(absolute)) continue;
        seen.add(absolute);
        const found = await skillName(absolute, parentSegment(relative));
        if (found === params.name) sightings.push(`${absolute}  (enabled plugin ${plugin.id})`);
      }
    }
    if (!located) blindRoots.push(`enabled plugin ${plugin.id} (no readable directory)`);
  }

  if (sightings.length > 0) return { state: "installed", sightings, blindRoots };
  if (blindRoots.length > 0) return { state: "undetermined", sightings, blindRoots };
  return { state: "absent", sightings, blindRoots };
}

/**
 * Both routes, merged.
 *
 * A sighting on either route is a sighting. Otherwise a blind spot on either route is
 * `undetermined`, so neither route can vouch for the other's gap. Only two clean sweeps are
 * `absent`.
 */
export function mergeSightings(content: Sighting, config: Sighting): Sighting {
  const sightings = [...content.sightings, ...config.sightings];
  const blindRoots = [...content.blindRoots, ...config.blindRoots];
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

  // ABSOLUTE, because the content sweep excludes the source by comparing it against
  // absolute sighting paths. Given a relative argument the two never matched and the source
  // was reported as its own duplicate -- latent rather than live, since the Makefile passes
  // an absolute path, but a guard whose answer depends on how the path was spelled is not one.
  const trimmed = resolve(sourceDir.replace(/\/+$/, ""));
  const name = await skillName(`${trimmed}/SKILL.md`, parentSegment(`${trimmed}/SKILL.md`));
  const home = Bun.env.HOME ?? "";
  const result = mergeSightings(
    await sweep({ name, sourceDir: trimmed, home, projectDir: process.cwd() }),
    await sweepEnabledPlugins({ name, home }),
  );

  if (result.state === "absent") {
    console.error(`  ok   \`${name}\` is not reachable through the skill system`);
    process.exit(0);
  }

  if (result.state === "installed") {
    const count = result.sightings.length;
    console.error(
      `\n  REACHABLE COPY FOUND: ${count} ` +
        `${count === 1 ? "copy answers" : "copies answer"} to \`${name}\`:`,
    );
    for (const path of result.sightings) console.error(`       ${path}`);
    console.error(
      "\n  This is REPORTED, and for the repo's own measurement targets it is not a defect.\n" +
        "  `make measure-disclosure`, `make disclosure` and `make composition` all spawn with\n" +
        "  `--setting-sources project --strict-mcp-config` on a throwaway root, so a copy your\n" +
        "  loader can see is not visible to the subprocess doing the measuring. Those targets\n" +
        "  pass GUARD_FATAL=0 and proceed. You do NOT need to disable anything for them, and\n" +
        "  nothing here asks you to change your configuration.\n\n" +
        "  Measured, so this is not an assumption: running the composition harness's own spawn\n" +
        "  both ways saw 0 plugin-namespaced entries with those flags and 97 without, and the\n" +
        "  `disclosed` arm still read SKILL.md and its reference either way -- so the isolation\n" +
        "  does not cost the metric it protects.\n\n" +
        "  WHEN THIS DOES VOID A RUN: any measurement that spawns `claude` WITHOUT both of\n" +
        "  those flags, or that runs in this tree rather than a throwaway root. Content served\n" +
        "  through the skill system produces no Read, so such a run scores every bundled file\n" +
        "  at a pull rate of zero and reports `prune` on all of them -- a clean-looking table\n" +
        "  resting on nothing. Check the spawn before trusting the numbers.\n\n" +
        "  If you are on such a path: `make purge-old` reports copies under previous names,\n" +
        "  and a copy annotated `(enabled plugin ...)` is reachable by CONFIG, so deleting\n" +
        "  files will not clear it. That includes a plugin whose source resolves to this very\n" +
        "  directory, where the loader would serve the artifact under test itself.",
    );
    process.exit(EXIT.installed);
  }

  console.error(
    `\n  CANNOT CONFIRM ABSENCE: ${result.blindRoots.length} route(s) would not answer, so a\n` +
      "  copy reachable through one of them would not appear here:",
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
