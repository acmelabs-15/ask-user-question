import YAML from "yaml";

const ROOT = new URL("../", import.meta.url);
const allowed = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);

function checkKeys(value: Record<string, unknown>, names: string[], path: string, errors: string[]) {
  for (const key of Object.keys(value)) if (!names.includes(key)) errors.push(`${path}: unsupported field ${key}`);
}

export async function validateSkill(root: URL = ROOT): Promise<string[]> {
  const folder = new URL("skills/ask-user-question/", root);
  const errors: string[] = [];
  const text = await Bun.file(new URL("SKILL.md", folder)).text();
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match?.[1]) return ["SKILL.md: missing frontmatter"];
  const doc = YAML.parseDocument(match[1], { uniqueKeys: true });
  if (doc.errors.length) return doc.errors.map(error => error.message);
  const front = doc.toJS() as Record<string, unknown>;
  for (const key of Object.keys(front)) if (!allowed.has(key)) errors.push(`Unsupported frontmatter: ${key}`);
  if (front.name !== "ask-user-question") errors.push("Name differs from directory");
  if (typeof front.description !== "string" || !front.description.trim() || front.description.length > 1024) errors.push("Description must have 1–1024 characters");
  if (typeof front.compatibility === "string" && front.compatibility.length > 500) errors.push("Compatibility exceeds 500 characters");
  const metadata = front.metadata as Record<string, unknown> | undefined;
  if (!metadata || Object.values(metadata).some(value => typeof value !== "string")) errors.push("Metadata must be a string map");
  if (metadata?.type !== "core") errors.push("Expected standalone core skill");
  const pkg = await Bun.file(new URL("package.json", root)).json();
  if (metadata?.version !== pkg.version) errors.push("Release version differs from package.json");
  if (text.trimEnd().split("\n").length >= 500) errors.push("Skill exceeds its line budget");
  const positions = ["## Setup", "## Core Patterns", "## Common Mistakes", "## References"].map(heading => text.indexOf(heading));
  if (positions.some((position, i) => position < 0 || (i > 0 && position <= positions[i - 1]!))) errors.push("Incomplete generation section order");
  const map = YAML.parse(await Bun.file(new URL("skills/_artifacts/domain_map.yaml", root)).text());
  const expected = map.skills[0].failure_modes.length;
  const actual = [...text.matchAll(/^### (?:CRITICAL|HIGH|MEDIUM) — /gm)].length;
  if (actual !== expected) errors.push(`${actual} examples for ${expected} mapped failures`);
  for (const path of new Bun.Glob("**/*.md").scanSync({ cwd: folder.pathname })) {
    const file = new URL(path, folder);
    const body = await Bun.file(file).text();
    for (const link of body.matchAll(/\]\(([^)]+)\)/g)) {
      const target = link[1]!;
      if (/^(https?:|#)/.test(target)) continue;
      const resolved = new URL(target.split("#")[0]!, file);
      if (!resolved.href.startsWith(folder.href) || !(await Bun.file(resolved).exists())) errors.push(`${path}: missing local link ${target}`);
    }
    for (const block of body.matchAll(/```json\n([\s\S]*?)\n```/g)) {
      let data: Record<string, unknown>;
      try { data = JSON.parse(block[1]!); } catch { errors.push(`${path}: invalid JSON example`); continue; }
      if (!Array.isArray(data.questions)) continue;
      checkKeys(data, ["questions"], path, errors);
      if (data.questions.length !== 1) errors.push(`${path}: example must ask one question`);
      for (const q of data.questions as Record<string, unknown>[]) {
        const codex = path.endsWith("codex.md");
        const gemini = path.endsWith("gemini-cli.md");
        const async = codex && "title" in q;
        const fields = async ? ["title", "options"] : codex ? ["id", "header", "question", "options"] : gemini
          ? ["question", "header", "type", "options", "multiSelect", "placeholder"] : ["question", "header", "options", "multiSelect"];
        checkKeys(q, fields, path, errors);
        if (typeof (async ? q.title : q.question) !== "string") errors.push(`${path}: missing question text`);
        if (!async && typeof q.header !== "string") errors.push(`${path}: missing header`);
        if (codex && !async && typeof q.id !== "string") errors.push(`${path}: missing question ID`);
        if (gemini && !["choice", "text", "yesno"].includes(String(q.type))) errors.push(`${path}: missing explicit Gemini type`);
        if (!Array.isArray(q.options)) { if (!async && q.type !== "text" && q.type !== "yesno") errors.push(`${path}: missing options`); continue; }
        if (async) {
          if (!q.options.length || q.options.some(value => typeof value !== "string" || !value.trim())) errors.push(`${path}: invalid async options`);
        } else {
          if (q.options.length < 2 || q.options.length > (codex ? 3 : 4)) errors.push(`${path}: option count outside documented range`);
          for (const option of q.options as Record<string, unknown>[]) {
            checkKeys(option, ["label", "description"], path, errors);
            if (typeof option.label !== "string" || typeof option.description !== "string") errors.push(`${path}: invalid option`);
          }
        }
      }
    }
  }
  return errors;
}

if (import.meta.main) {
  const errors = await validateSkill();
  for (const error of errors) console.error(error);
  if (errors.length) process.exit(1);
  console.log("Skill structure, links, coverage, and host JSON examples pass.");
}
