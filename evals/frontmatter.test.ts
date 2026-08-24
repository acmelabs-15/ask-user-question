#!/usr/bin/env bun
/**
 * Validates SKILL.md frontmatter against the Agent Skills specification.
 *
 * Two of these checks exist because the failure they catch is silent. Frontmatter is not
 * executed, so a wrong value produces no error at load time and no error at run time: it just
 * quietly means something other than what was intended. Both bugs this file was written after
 * were of that shape.
 *
 * The `metadata.version` check is the important one. Version lives in two places, here and in
 * .claude-plugin/plugin.json, because a skill uploaded to claude.ai on its own has no
 * plugin.json to carry it. Two copies of a number that nothing compares is a drift waiting to
 * happen, so this compares them.
 *
 *   bun frontmatter.test.ts
 */

/**
 * A frontmatter-shaped YAML subset, parsed locally rather than pulled from a package.
 * Every other test in this repo runs on a bare `bun <file>`, and a dependency here would
 * make the one test that checks portability the one test that needs an install.
 */
function parseYaml(src: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (!line.trim() || line.startsWith("#")) continue;
    const m = /^([A-Za-z][\w-]*):\s?(.*)$/.exec(line);
    if (!m) continue;
    const [, key, rest] = m;
    if (rest === "|" || rest === ">") {                    // block scalar
      const buf: string[] = [];
      while (i + 1 < lines.length && (lines[i + 1]!.startsWith("  ") || !lines[i + 1]!.trim())) buf.push(lines[++i]!.trim());
      out[key!] = buf.join(" ").trim();
    } else if (rest === "") {                              // nested map
      const map: Record<string, string> = {};
      while (i + 1 < lines.length && /^\s{2,}\S/.test(lines[i + 1]!)) {
        const mm = /^\s+([A-Za-z][\w-]*):\s*(.*)$/.exec(lines[++i]!);
        if (mm) map[mm[1]!] = mm[2]!.replace(/^"(.*)"$/, "$1");
      }
      out[key!] = map;
    } else {                                               // scalar, possibly wrapped
      const buf = [rest!];
      while (i + 1 < lines.length && /^\s{2,}\S/.test(lines[i + 1]!) && !/^\s+[A-Za-z][\w-]*:/.test(lines[i + 1]!)) buf.push(lines[++i]!.trim());
      out[key!] = buf.join(" ").replace(/^"(.*)"$/, "$1");
    }
  }
  return out;
}

const ROOT = new URL("..", import.meta.url).pathname;
const SKILL = `${ROOT}skills/ask-user-question/SKILL.md`;
const PLUGIN = `${ROOT}.claude-plugin/plugin.json`;

/** The six fields the spec allows. Anything else is a hard error on claude.ai upload. */
const SPEC_FIELDS = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);

let failures = 0;
const check = (ok: boolean, label: string, detail = "") => {
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`);
  if (!ok) failures++;
};

const raw = await Bun.file(SKILL).text();
const fm = /^---\n([\s\S]*?)\n---\n/.exec(raw);
if (!fm) { console.error("no frontmatter block in SKILL.md"); process.exit(1); }
const y = parseYaml(fm[1]!) as Record<string, unknown>;

console.log("frontmatter\n");

// Spec conformance. An unexpected key fails packaging and upload outright rather than being
// ignored, so this is the check that keeps the skill portable off Claude Code.
const unexpected = Object.keys(y).filter((k) => !SPEC_FIELDS.has(k));
check(unexpected.length === 0, "only spec fields present", unexpected.join(", ") || "6 allowed");

const name = String(y.name ?? "");
check(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) && name.length <= 64, "name is valid", name);
check(name === "ask-user-question", "name matches parent directory", name);

const desc = String(y.description ?? "").split(/\s+/).join(" ").trim();
check(desc.length > 0 && desc.length <= 1024, "description within 1024 chars", `${desc.length}`);

if (y.compatibility !== undefined) {
  const c = String(y.compatibility).split(/\s+/).join(" ").trim();
  check(c.length <= 500, "compatibility within 500 chars", `${c.length}`);
}

if (y.metadata !== undefined) {
  const m = y.metadata as Record<string, unknown>;
  check(typeof m === "object" && m !== null && !Array.isArray(m), "metadata is a map");
  check(Object.values(m).every((v) => typeof v === "string"), "metadata values are all strings");

  const plugin = JSON.parse(await Bun.file(PLUGIN).text());
  check(m.version === plugin.version, "metadata.version matches plugin.json", `${m.version} vs ${plugin.version}`);
}

// allowed-tools is ADDITIVE: it pre-approves tools for the invoking turn and removes nothing.
// disallowed-tools is the field that removes a tool, and listing AskUserQuestion there would
// disable the one thing this skill exists to do.
if (y["allowed-tools"] !== undefined) {
  const t = String(y["allowed-tools"]);
  check(t.trim().length > 0, "allowed-tools is non-empty", t);
  check(!/AskUserQuestion/.test(t), "allowed-tools does not pre-approve AskUserQuestion",
    "the tool the user is being asked with should stay user-gated");
}
check(y["disallowed-tools"] === undefined, "disallowed-tools is not set",
  "listing AskUserQuestion there would disable this skill's whole purpose");

// Progressive disclosure budget, from the spec: under 5000 tokens and 500 lines.
const body = raw.slice(fm[0].length);
const approxTokens = Math.round(raw.length / 4.35);
check(raw.split("\n").length < 500, "SKILL.md under 500 lines", `${raw.split("\n").length}`);
check(approxTokens < 5200, "SKILL.md near or under the 5000-token recommendation", `~${approxTokens}`);

// Every reference the body points at must exist.
const refs = [...new Set([...body.matchAll(/`(references\/[\w.-]+\.md)`/g)].map((m) => m[1]!))];
const missing: string[] = [];
for (const r of refs) {
  if (!(await Bun.file(`${ROOT}skills/ask-user-question/${r}`).exists())) missing.push(r);
}
check(missing.length === 0, `all ${refs.length} referenced files exist`, missing.join(", "));

// Every reference on disk must be pointed at, or it can never be progressively disclosed.
const onDisk = [...new Bun.Glob("*.md").scanSync(`${ROOT}skills/ask-user-question/references`)];
const orphans = onDisk.filter((f) => !refs.includes(`references/${f}`));
check(orphans.length === 0, `all ${onDisk.length} references are reachable from SKILL.md`, orphans.join(", "));

console.log(failures === 0 ? "\nPASS" : `\n${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
