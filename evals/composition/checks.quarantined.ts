#!/usr/bin/env bun
/**
 * Deterministic checks on a composed AskUserQuestion call.
 *
 * Every rule here is one this skill states in a form a machine can settle: a count,
 * a position, a membership test. Nothing here judges whether the question was worth
 * asking or whether the recommendation is right; those need a reader, and they live
 * in the LLM judge instead.
 *
 * Two reasons this layer exists at all rather than handing everything to a judge:
 *
 *   1. It is free and it is stable. A judge run costs tokens and varies between runs,
 *      so a 2-point move in a judged score means nothing without repeats. These
 *      checks give the same answer every time, which makes them the part of a
 *      composition eval you can actually gate on.
 *   2. It is usable outside the eval. `bun checks.ts call.json` lints one call, so
 *      the same rules that score the eval can be run against a draft before sending
 *      it. The eval and the pre-send check cannot drift apart, because they are the
 *      same code.
 *
 * The parallelism rule from references/register-and-budgets.md is deliberately NOT
 * implemented as a pass/fail. Deciding whether two descriptions compare on the same
 * axis needs to read them. Every lexical proxy tried here produced false failures on
 * the skill's own worked examples, and a check that fails good calls is worse than no
 * check. The first sentence of each description is emitted as a diagnostic instead,
 * lined up for whoever is reading, and the judge rubric asks the question directly.
 */

export interface Option {
  readonly label: string;
  readonly description: string;
  readonly preview?: string;
}

export interface Question {
  readonly question: string;
  readonly header: string;
  readonly options: readonly Option[];
  readonly multiSelect?: boolean;
}

export interface Call {
  readonly questions: readonly Question[];
}

export interface Finding {
  /** Stable id, so a results file can be differenced across runs. */
  readonly id: string;
  readonly severity: "error" | "warn";
  /** Which question and option it landed on, for pointing at the right string. */
  readonly at: string;
  readonly message: string;
}

const RECOMMENDED = "(Recommended)";

/**
 * Labels that name the dialog's mechanics instead of the consequence.
 *
 * Matched on the whole label with the recommendation marker and punctuation stripped,
 * NOT as a substring. Substring matching flags `Skip the migration and backfill later`,
 * which is a perfectly good outcome label that happens to start with a banned word.
 */
const META_LABELS = new Set([
  "yes", "no", "ok", "okay", "cancel", "confirm", "approve", "reject", "proceed",
  "continue", "skip", "defer", "abort", "retry", "accept", "decline", "stop", "go",
  "yes please", "no thanks", "do it", "don't", "do not", "leave it", "fix it",
  "option a", "option b", "option c", "option d", "approach 1", "approach 2",
  "the first one", "the second one", "other", "none of the above", "something else",
]);

/**
 * Constructions from references/register-and-budgets.md, as word-boundary patterns.
 *
 * This is a SUBSET of that file's table, not a transcription of it, so register-pass
 * step 3 is only partly automated and the table is still worth reading. Deliberately
 * omitted, all for the same reason: the pattern that would catch them also catches
 * ordinary correct usage, and a linter people learn to ignore is worse than a missing
 * check. Prefer under-flagging.
 *
 *   just, clearly              real words in "just the reader", "clearly labelled"
 *   clean, better              too common as ordinary adjectives
 *   take care of, as expected  low frequency, high false-positive rate
 *   facilitate, surface        "surface" is a noun and a legitimate verb here
 *   non-trivial, orthogonal,   rare enough in practice not to be worth the pattern
 *     idiomatic
 *   bare may / might /         a lone modal is REQUIRED by this register; only the
 *     possibly                 stacked form is banned, and that is matched below
 *   the aforementioned /       needs to know whether the referent is in this call
 *     said file / this           or an earlier message, which a regex cannot
 *   Keep in mind               matched only via "note that" / "it's worth noting"
 */
const BANNED: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bsimply\b/i, "presupposes context the reader does not have"],
  [/\bobviously\b/i, "presupposes context the reader does not have"],
  [/\bof course\b/i, "presupposes context the reader does not have"],
  [/\bshould be fine\b/i, "hedge that transfers no information"],
  [/\bshouldn'?t be a problem\b/i, "hedge that transfers no information"],
  [/\bhopefully\b/i, "hedge that transfers no information"],
  [/\b(handle|deal with|address|manage)s?\b/i, "names no action; name the actual change"],
  [/\b(properly|correctly|appropriately)\b/i, "meaningless without the standard it refers to"],
  [/\b(robust|cleaner|more maintainable|better)\b/i, "evaluative with no measure"],
  // Scoped in applyBanned(): only fires when the description carries no figure at
  // all. "rows some users may not read" in a description that already says 55% and
  // 60s is an indefinite used correctly, and flagging it taught nothing.
  [/\b(some|several|a few|a couple of|various)\s+\w+s\b/i, "unquantified plural; give the number"],
  [/\betc\.?\b/i, "unbounded set inside a bounded option"],
  [/\band so on\b/i, "unbounded set inside a bounded option"],
  [/\b(leverage|utilize)\b/i, "longer word for a shorter one; use 'use'"],
  // Anchored to a reference verb rather than matching bare "above" / "earlier".
  // Unanchored, this fired on "above 900px" in a description that was comparing
  // viewport widths, which is a comparative and not a cross-reference at all. It was
  // the single reason a clean call scored 0.88 instead of 1.00.
  [/\bas (discussed|mentioned|noted|described|said)\b/i, "cross-reference; the dialog does not scroll"],
  [/\b(discussed|mentioned|noted|described|listed|shown|said)\s+(above|earlier|previously)\b/i,
    "cross-reference; the dialog does not scroll"],
  [/\bthe (above|earlier|previous)\s+(option|one|file|approach|question|point)\b/i,
    "cross-reference; the dialog does not scroll"],
  [/\b(i think|i believe|in my opinion|it seems)\b/i, "every sentence here is already yours"],
  [/\b(note that|it'?s worth noting)\b/i, "words spent announcing content"],
  [/\bmight (be able to|potentially)\b/i, "two hedges in one sentence cancel to zero"],
  [/\bperformant\b/i, "jargon where a plain word exists"],
];

/**
 * A number, a unit, or a named thing that breaks. Either satisfies "state a cost".
 *
 * "no" and "none" are NOT in the number list, though they read like quantities. With
 * them in, the two-word description "No caching" satisfied the cost check while its
 * sibling "Add caching" failed it, which is backwards: neither states a cost. Any
 * description long enough to carry a real "no X" claim carries a figure somewhere too.
 */
const HAS_NUMBER = /\d|\b(one|two|three|four|five|six|seven|eight|nine|ten|zero)\b/i;
const HAS_CONSEQUENCE =
  /\b(break|breaks|broke|block|blocks|fail|fails|stop|stops|lose|loses|lost|delete|deletes|drop|drops|log(?:ged)? out|disclos|regress|corrupt|overwrit|downtime|outage|rollback|cannot|can'?t|no longer)\w*/i;

const words = (s: string): number => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Split on terminal punctuation, allowing a closing quote or bracket after it.
 *
 * The naive /(?<=[.?!])\s+/ misses a sentence ending in a quoted string, which is not a
 * corner case here: descriptions quote error messages. On worked example 4's repair it
 * merged two sentences into one 31-word pseudo-sentence, so the length check measured
 * something that does not exist and the parallelism diagnostic printed the whole
 * description where it promises the first sentence.
 */
const sentences = (s: string): string[] =>
  s.trim().split(/(?<=[.?!]["'’”)\]]?)\s+/).map((x) => x.trim()).filter(Boolean);
const normaliseLabel = (s: string): string =>
  s.replace(RECOMMENDED, "").trim().toLowerCase().replace(/[.!?,;:]+$/, "");

/** Content-word overlap, used only to catch a description restating its own label. */
const STOP = new Set(["the", "a", "an", "it", "its", "to", "of", "and", "or", "in", "on", "for", "is", "are", "be", "this", "that", "with", "as", "at", "by"]);
const contentTokens = (s: string): Set<string> =>
  new Set(s.toLowerCase().match(/[a-z][a-z'-]+/g)?.filter((w) => !STOP.has(w)) ?? []);

export function checkCall(call: Call): Finding[] {
  const out: Finding[] = [];
  const add = (id: string, severity: Finding["severity"], at: string, message: string) =>
    out.push({ id, severity, at, message });

  const qs = call.questions ?? [];
  if (qs.length < 1 || qs.length > 4)
    add("call.question-count", "error", "call", `${qs.length} questions; the schema cap is 1 to 4`);
  if (qs.length > 1)
    add("call.multi-question", "warn", "call",
      `${qs.length} questions in one call. Legal, but host handling is thin and dependent questions cannot share a call`);
  // Once per call, not once per question. The point is portability across hosts,
  // and repeating it per question buried a real finding under four copies of a
  // stylistic one.
  if (qs.some((q) => q.multiSelect === undefined))
    add("call.multiselect-implicit", "warn", "call",
      "multiSelect left unset; it is required in at least one host and optional in others, so set it explicitly");

  const seenQuestions = new Set<string>();

  qs.forEach((q, qi) => {
    const where = `q${qi + 1}`;
    // Every field is read defensively. This runs as a standalone linter over drafts
    // that have not been through the tool's own schema, so a missing required field
    // has to become a finding rather than a TypeError from inside the checker.
    const question = typeof q.question === "string" ? q.question : "";

    if (!question) add("question.missing", "error", where, "question text is required");
    if (question && seenQuestions.has(question))
      add("question.duplicate", "error", where, "duplicate question text; it is the answer-map key and the call is rejected");
    seenQuestions.add(question);

    // --- the question string -------------------------------------------------
    if (question && !question.trim().endsWith("?"))
      add("question.no-mark", "error", where, "question does not end in a question mark");
    if (sentences(question).length > 2)
      add("question.multi-sentence", "warn", where,
        `question is ${sentences(question).length} sentences; background belongs in the prose before the call`);
    if (words(question) > 25)
      add("question.too-long", "warn", where, `question is ${words(question)} words; budget is 25`);
    if (/\b(the plan|my plan)\b/i.test(question))
      add("question.plan-reference", "error", where, "references 'the plan', which the user cannot see in plan mode");

    // --- the header ----------------------------------------------------------
    if (!q.header) add("header.missing", "error", where, "header is required");
    else if (q.header.length > 12)
      add("header.too-long", "warn", where, `header is ${q.header.length} chars; renders as a tab chip, budget is 12`);

    const opts = q.options ?? [];
    if (opts.length < 2 || opts.length > 4)
      add("options.count", "error", where, `${opts.length} options; the schema cap is 2 to 4`);

    const labels = opts.map((o) => normaliseLabel(typeof o.label === "string" ? o.label : ""));
    labels.forEach((l, i) => {
      if (l && labels.indexOf(l) !== i)
        add("options.duplicate-label", "error", `${where}.o${i + 1}`, `duplicate label "${l}"`);
    });

    // --- the recommendation --------------------------------------------------
    const marked = opts.map((o) => (typeof o.label === "string" ? o.label : "").includes(RECOMMENDED));
    const recAt = marked.indexOf(true);
    const recCount = marked.filter(Boolean).length;
    if (recCount === 0)
      add("recommend.absent", "error", where,
        "no option marked (Recommended); if they are genuinely equivalent, say so in the question text");
    if (recCount > 1) add("recommend.multiple", "error", where, `${recCount} options marked (Recommended)`);
    if (recAt > 0) add("recommend.not-first", "error", `${where}.o${recAt + 1}`, "recommended option is not in first position");

    // --- previews ------------------------------------------------------------
    const withPreview = opts.filter((o) => o.preview !== undefined).length;
    if (withPreview > 0 && q.multiSelect === true)
      add("preview.on-multiselect", "error", where, "previews on a multiSelect question are silently discarded");
    if (withPreview > 0 && withPreview < opts.length)
      add("preview.partial", "warn", where, `${withPreview} of ${opts.length} options carry a preview`);

    // --- each option ---------------------------------------------------------
    opts.forEach((o, oi) => {
      const at = `${where}.o${oi + 1}`;
      const label = typeof o.label === "string" ? o.label : "";
      const desc = typeof o.description === "string" ? o.description : "";
      const bare = normaliseLabel(label);

      // The label is the only text guaranteed to be read, so its absence is an error
      // in its own right rather than something the length checks report obliquely.
      if (!label) add("label.missing", "error", at, "label is required; it is the only text guaranteed to be read");

      if (META_LABELS.has(bare))
        add("label.meta", "error", at, `"${label}" names the dialog's mechanics, not the consequence`);
      const lw = words(bare);
      if (label && lw < 3) add("label.too-short", "warn", at, `label is ${lw} word(s); 3 to 7 names an outcome`);
      if (lw > 7) add("label.too-long", "warn", at, `label is ${lw} words; it stops being scannable`);
      if (label.length > 45)
        add("label.too-wide", "warn", at, `label is ${label.length} chars including any marker; budget is 45`);

      const dw = words(desc);
      if (dw === 0) add("description.empty", "error", at, "description is required");
      else if (dw <= 4)
        add("description.restates", "error", at,
          `description is ${dw} words. In this skill's corpus no working call has one under 18`);
      else if (dw < 18)
        add("description.thin", "warn", at,
          `description is ${dw} words; 5 to 17 usually means the question should not be asked at all`);
      else if (dw > 45)
        add("description.bloated", "warn", at, `description is ${dw} words; over 45 is background belonging in the prose`);

      const ds = sentences(desc);
      if (ds.length > 4) add("description.too-many-sentences", "warn", at, `${ds.length} sentences; budget is 4`);
      // STE's descriptive limit is 25 words and that is the target in
      // references/register-and-budgets.md. The check fires at 35 instead, because
      // three of this skill's five repaired examples run 30 to 35 and they are the
      // reference standard: a threshold that fails the exemplars is the threshold's
      // problem. 25 to 35 is "long, and deliberate"; past 35 is reliably too long.
      ds.forEach((s, si) => {
        if (words(s) > 35)
          add("description.long-sentence", "warn", at,
            `sentence ${si + 1} is ${words(s)} words; target is 25, this check fires past 35`);
      });

      if (dw > 0 && !HAS_NUMBER.test(desc) && !HAS_CONSEQUENCE.test(desc))
        add("description.no-cost", "error", at,
          "description carries neither a number nor a named consequence, so it states no cost");

      // Restatement: most of the label's content words reappearing in a short
      // description means the description is the label again with padding.
      const lt = contentTokens(bare);
      const dt = contentTokens(desc);
      if (lt.size > 0 && dw > 0 && dw < 18) {
        const shared = [...lt].filter((t) => dt.has(t)).length;
        if (shared / lt.size >= 0.6)
          add("description.echoes-label", "warn", at, "description mostly repeats the label's own words");
      }

      // Label and description are scanned independently. `exec(desc) ?? exec(label)`
      // made a banned construction in the label invisible whenever the description
      // happened to contain any other one, which is exactly when you least want to
      // miss it. Each field also carries its own figure test, for the same reason.
      for (const field of [desc, label]) {
        const hasFigure = /\d/.test(field);
        for (const [re, why] of BANNED) {
          // The unquantified-plural pattern only means something in text that
          // quantifies nothing else. Scoped here rather than in the table so the
          // table stays readable as the list it is.
          if (why.startsWith("unquantified") && hasFigure) continue;
          const m = re.exec(field);
          if (m) add("register.banned", "warn", at, `"${m[0]}": ${why}`);
        }
      }
    });
  });

  return out;
}

/** First sentence of each description, lined up. The judge decides if they are parallel. */
export function parallelismDiagnostic(call: Call): string[] {
  return (call.questions ?? []).flatMap((q, qi) =>
    (q.options ?? []).map((o, oi) => `q${qi + 1}.o${oi + 1}  ${sentences(o.description ?? "")[0] ?? ""}`),
  );
}

export interface Score {
  readonly errors: number;
  readonly warnings: number;
  /**
   * 1.0 when nothing fired, floored at 0.
   *
   * An error costs 1/optionCount and a warning 0.35/optionCount, NOT 1 and 0.35 flat:
   * findings are mostly per-option, so an unnormalised penalty would score a 4-option
   * call worse than a 2-option one for the same defect rate. One error per option is
   * therefore always 0.00, whatever the call's size.
   */
  readonly value: number;
}

export function scoreFindings(findings: readonly Finding[], call: Call): Score {
  const errors = findings.filter((f) => f.severity === "error").length;
  const warnings = findings.filter((f) => f.severity === "warn").length;
  // Normalised by option count so a 4-option call is not penalised for having
  // more surface than a 2-option one.
  const optionCount = Math.max(1, (call.questions ?? []).reduce((a, q) => a + (q.options?.length ?? 0), 0));
  const penalty = (errors + 0.35 * warnings) / optionCount;
  return { errors, warnings, value: Math.max(0, 1 - penalty) };
}

// --- standalone use: bun checks.ts <call.json> ------------------------------
if (import.meta.main) {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: bun checks.ts <call.json>");
    console.error("  where call.json is the AskUserQuestion input, i.e. { \"questions\": [...] }");
    process.exit(2);
  }
  const call: Call = JSON.parse(await Bun.file(path).text());
  const findings = checkCall(call);
  const score = scoreFindings(findings, call);

  for (const f of findings) {
    const tag = f.severity === "error" ? "ERROR" : "warn ";
    console.log(`${tag} ${f.at.padEnd(8)} ${f.id.padEnd(32)} ${f.message}`);
  }
  if (!findings.length) console.log("no findings");

  console.log("\nFirst sentence of each description, for the parallelism read:");
  for (const line of parallelismDiagnostic(call)) console.log(`  ${line}`);

  console.log(`\n${score.errors} error(s), ${score.warnings} warning(s), score ${score.value.toFixed(2)}`);
  process.exit(score.errors > 0 ? 1 : 0);
}
