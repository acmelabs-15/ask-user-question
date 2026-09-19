import { mkdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const stamp = new Date().toISOString().replaceAll(":", "-");
const run = new URL(`work/trigger-${stamp}/`, root);
const plugin = new URL("plugin/", run);
const skill = new URL("skills/ask-user-question-probe/", plugin);
await mkdir(new URL(".claude-plugin/", plugin), { recursive: true });
await mkdir(new URL("references/", skill), { recursive: true });
await Bun.write(new URL(".claude-plugin/plugin.json", plugin), JSON.stringify({ name: "auq-probe", version: "0.0.0", description: "Isolated skill selection probe" }));
const source = new URL("skills/ask-user-question/", root);
for (const path of new Bun.Glob("**/*.md").scanSync({ cwd: source.pathname })) {
  let text = await Bun.file(new URL(path, source)).text();
  if (path === "SKILL.md") text = text.replace("name: ask-user-question\n", "name: ask-user-question-probe\n");
  await Bun.write(new URL(path, skill), text);
}
const cases = [
  { id: "mixed-reply", expected: true, prompt: "We are designing workspace access. The agreed scope excludes guests. I asked whether members should edit pages or only admins should. The user replied: 'Members must read all pages. Also a partner digest would be useful next quarter. I do not understand why guests would edit anything.' Prepare the next assistant response for this coding discussion. Identify what this settles and what is still missing, preserve the useful future topic, and ask only the decision we still need. Do not implement anything or ask a live user; produce the proposed response." },
  { id: "communication-guide", expected: false, prompt: "Write a short internal engineering-wiki section about how clear clarification questions help a development team. Explain scope, context, and good option descriptions, with two examples. The deliverable is documentation about communication, not a question to me. Do not ask me for input." },
];
for (const test of cases) {
  const cwd = new URL(`${test.id}/`, run);
  await mkdir(cwd, { recursive: true });
  await Bun.write(new URL("prompt.txt", cwd), test.prompt);
  const args = ["claude", "--print", "--restricted", "--setting-sources", "project", "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}', "--tools", "Skill,Read", "--allowedTools", "Skill,Read", "--permission-prompts", "none", "--no-session-persistence", "--output-format", "stream-json", "--verbose", "--plugin-dir", plugin.pathname, test.prompt];
  const start = Date.now();
  const child = Bun.spawn(args, { cwd: cwd.pathname, stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exitCode] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  await Bun.write(new URL("events.jsonl", cwd), stdout);
  await Bun.write(new URL("stderr.txt", cwd), stderr);
  const events = stdout.split("\n").filter(Boolean).flatMap(line => { try { return [JSON.parse(line)]; } catch { return []; } });
  const init = events.find(event => event.type === "system" && event.subtype === "init");
  const calls = events.flatMap(event => event.message?.content ?? []).filter((part: {type?:string;name?:string}) => part.type === "tool_use" && part.name === "Skill");
  const targetCalls = calls.filter((part: {input?:{skill?:string}}) => part.input?.skill?.includes("ask-user-question-probe"));
  const result = events.findLast(event => event.type === "result");
  const summary = { id: test.id, expected_selection: test.expected, selected: targetCalls.length > 0, skill_calls: calls.map((call: {input:unknown}) => call.input), inventory: init?.skills ?? null, plugins: init?.plugins ?? null, model: init?.model ?? null, exit_code: exitCode, result_subtype: result?.subtype ?? null, duration_ms: Date.now() - start };
  await Bun.write(new URL("summary.json", cwd), JSON.stringify(summary, null, 2) + "\n");
  console.log(JSON.stringify(summary));
  if (exitCode !== 0 || result?.is_error) throw new Error(`Probe ${test.id} failed; inspect ${cwd.pathname}`);
}
console.log(`Results: ${run.pathname}`);
