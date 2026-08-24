#!/usr/bin/env bun
/**
 * Deterministic checks on a composed AskUserQuestion call.
 *
 * Every rule here is one SKILL.md states in a form a machine can settle: a count, a position,
 * a membership test, a literal token. Each carries the line of the skill it comes from in the
 * comment above it, because a rule with no source in the artifact is an opinion rather than
 * the skill's doctrine.
 *
 * HOW THIS SET WAS DERIVED, which matters for trusting it. The rules were read out of the
 * frozen SKILL.md and its three references FIRST, without opening `checks.quarantined.ts`.
 * The previous fork's 32 rules were then read as a coverage check only. That ordering is the
 * whole point: the quarantined set encodes the retired skill's doctrine, and grading a new
 * skill against the rubric of the one it replaces is circular. Where the two disagree, this
 * file follows the current artifact — the old set required a recommendation on every question,
 * where SKILL.md:222-224 permits none when the options are equivalent; the old set called a
 * label of two words too short, where SKILL.md:157 asks for one to five.
 *
 * The diff did earn its keep twice. It caught a missing rule (an empty question string), and
 * it caught a threshold of mine that would have fired on the skill's own worked example. See
 * `register/sentence-length`.
 *
 * WHAT THIS LAYER DELIBERATELY DOES NOT CHECK. Roughly half of SKILL.md's own pre-flight loop
 * needs a reader, and a proxy for any of it would be worse than its absence:
 *
 *   pre-flight 7   whether the first option is destructive or one-way (:204-209). Needs to
 *                  know which option is destructive. A keyword list of `delete`, `drop`,
 *                  `force` is an invented heuristic, not the skill's rule.
 *   pre-flight 6   whether a justification cites a fact rather than a virtue (:211-216).
 *                  "Cites a fact" is the judgement itself.
 *   pre-flight 9   comparability beyond byte-identical descriptions (:173-176). Only the
 *                  identical case is mechanical; `parallelismDiagnostic` below lines the
 *                  first sentences up for a reader instead, which is the honest split.
 *   pre-flight 10  whether anything needed to decide sits outside the call (:327). A `Call`
 *                  does not carry the message around it.
 *   pre-flight 12  one word per concept (:264-265). `check` versus `validation` needs a
 *                  synonym model.
 *   section 2      one call or a sequence (:121-133). A call cannot show whether a fifth
 *                  question was correctly deferred.
 *   :178-181       covering the space, including the do-nothing path and the honest bad
 *                  choice.
 *   :149-150       whether a multiSelect question is phrased as a plural selection.
 *   :69-72         whether the host opted into a preview format. That is environment.
 *
 * The judge rubric asks these directly. A green column here means the mechanical floor held,
 * not that the call is good.
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

/**
 * The marker, with its leading space, exactly as SKILL.md:188 and :321 write it.
 *
 * Detection is case-insensitive and spelling is reported separately. Matching only the exact
 * string would make a lowercase `(recommended)` read as no marker at all, so a spelling slip
 * would be reported as a missing recommendation and the author would be sent to fix the wrong
 * thing.
 */
const MARKER = " (Recommended)";
const MARKER_ANY_CASE = /\(\s*recommended\s*\)\s*$/i;

/** Named at SKILL.md:320. Deliberately these three and no others — see the note below. */
const RESERVED_LABELS = new Set(["other", "none", "skip"]);

const words = (s: string): number => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Split on terminal punctuation, allowing a closing quote or bracket after it.
 *
 * Carried over from the quarantined module unchanged, and its reason with it: the naive
 * `/(?<=[.?!])\s+/` misses a sentence ending in a quoted string, which is not a corner case
 * when descriptions quote error messages. Merging two sentences into one would make the
 * length check measure something that does not exist.
 */
const sentences = (s: string): string[] =>
  s.trim().split(/(?<=[.?!]["'’”)\]]?)\s+/).map((x) => x.trim()).filter(Boolean);

/** Label reduced for comparison: marker off, case folded, trailing punctuation dropped. */
const normaliseLabel = (s: string): string =>
  s.replace(MARKER_ANY_CASE, "").trim().toLowerCase().replace(/[.!?,;:]+$/, "").replace(/\s+/g, " ");

const text = (v: unknown): string => (typeof v === "string" ? v : "");

/**
 * Pointing outside the call. Anchored to a reference verb rather than bare `above`.
 *
 * SKILL.md:30-34 is the source: while the dialog is open the reader cannot scroll back, so a
 * string that refers to earlier text refers to something unreachable. Unanchored patterns on
 * `above` fire on `above 900px`, which is a comparison and not a cross-reference.
 */
const CROSS_REFERENCE: readonly RegExp[] = [
  /\bas (discussed|mentioned|noted|described|said)\b/i,
  /\b(discussed|mentioned|noted|described|listed|shown|said)\s+(above|earlier|previously)\b/i,
  /\bthe (above|earlier|previous)\s+(option|one|file|approach|question|point)\b/i,
];

/** Compound and future tenses, banned at SKILL.md:262-263 by name. Literal, not a parser. */
const COMPOUND_TENSE = /\bwill be\b|\bwill have\b|\bwould have\b/i;

/**
 * Two words, quoted from SKILL.md:213-214, which names `cleaner and more maintainable` as the
 * example of a justification that is not one. Two words rather than a vocabulary of virtues,
 * because the skill supplies these two and inventing the rest is how a linter starts grading
 * taste.
 */
const VIRTUE = /\b(cleaner|more maintainable)\b/i;

/** An explicit statement that the options tie, which SKILL.md:222-224 requires with no marker. */
const EQUIVALENCE = /\bequivalent\b|\binterchangeable\b|\bno (strong )?preference\b|\beither (one|option|works|is fine)\b|\bboth work\b|\bno recommendation\b/i;

/**
 * Rules implemented here, for the runner's report and the calibration test.
 *
 * Annotated `number` rather than left to infer the literal `27`. The calibration test
 * guards against an emptied rule set with `ACTIVE_RULE_COUNT === 0`, and against a
 * literal type that comparison is provably false, so `tsc` rejects it and the guard is
 * dead. Widening keeps the guard live. The state it protects against is not
 * hypothetical: this module held 0 active rules earlier in its life and its probe
 * reported a clean 1.00 while checking nothing.
 */
export const ACTIVE_RULE_COUNT: number = 27;

export function checkCall(call: Call): Finding[] {
  const out: Finding[] = [];
  const add = (id: string, severity: Finding["severity"], at: string, message: string): void => {
    out.push({ id, severity, at, message });
  };

  const qs = call.questions ?? [];

  // :82-83, :316 -- hard schema limits, so a violation is refused by the tool.
  if (qs.length < 1 || qs.length > 4) {
    add("schema/question-count", "error", "call", `${qs.length} question(s); the schema takes 1 to 4`);
  }

  const seenQuestions = new Set<string>();

  qs.forEach((q, qi) => {
    const where = `q${qi + 1}`;
    // Every field is read defensively: this also runs standalone over drafts that have not
    // been near the tool's schema, so a missing field must become a finding rather than a
    // TypeError thrown from inside the checker.
    const question = text(q.question);
    const header = text(q.header);
    const opts = q.options ?? [];
    const multiSelect = q.multiSelect === true;

    // :137 -- the question states the decision, which presupposes there is one.
    if (!question.trim()) add("schema/missing-question", "error", where, "question text is required");

    // :39-40, :317-318 -- a duplicate rejects the whole call.
    if (question && seenQuestions.has(question)) {
      add("schema/duplicate-question", "error", where, "duplicate question text; the schema rejects the call");
    }
    seenQuestions.add(question);

    // :137 -- one sentence, ending in a question mark.
    if (question.trim() && !question.trim().endsWith("?")) {
      add("question/no-question-mark", "error", where, "question does not end in a question mark");
    }
    // :137-138 and register.md:70-73 -- "around 25 words is the working ceiling".
    if (words(question) > 25) {
      add("question/word-count", "warn", where, `question is ${words(question)} words; the working ceiling is 25`);
    }
    // :137 asks for one sentence; :146-147 and :289 both carry a premise clause plus the
    // question, which is two. So two is endorsed by the skill's own examples and three is not.
    if (sentences(question).length > 2) {
      add("question/multi-sentence", "warn", where,
        `question is ${sentences(question).length} sentences; the premise plus the question is two`);
    }

    // :84, :319 -- header belongs to the question, not the option.
    if (!header.trim()) add("schema/missing-header", "error", where, "header is required on the question");
    // :86-87 -- "a chip of about 12 characters, and nothing enforces it", so a warning.
    else if (header.length > 12) {
      add("header/over-chip", "warn", where, `header is ${header.length} chars; the chip is about 12`);
    }

    // :82-83, :316 -- the other hard schema limit.
    if (opts.length < 2 || opts.length > 4) {
      add("schema/option-count", "error", where, `${opts.length} option(s); the schema takes 2 to 4`);
    }

    // :39-42, :157-159, :317-318. Compared NORMALISED, so this also catches the pair that
    // differs only by the marker: `Keep it` beside `Keep it (Recommended)` is two strings the
    // schema accepts and one option as far as the reader is concerned.
    const bare = opts.map((o) => normaliseLabel(text(o.label)));
    bare.forEach((b, i) => {
      if (b && bare.indexOf(b) !== i) {
        add("schema/duplicate-label", "error", `${where}.o${i + 1}`,
          `label "${b}" duplicates a sibling once the marker and case are set aside`);
      }
    });

    // --- the recommendation, SKILL.md section 5 ------------------------------------------
    const marked = opts.map((o) => MARKER_ANY_CASE.test(text(o.label)));
    const markCount = marked.filter(Boolean).length;
    const firstMark = marked.indexOf(true);

    // :183, :224, :321 -- "Two markers is the one shape that is always wrong."
    if (markCount > 1) {
      add("rec/multiple-markers", "error", where, `${markCount} options marked; exactly one or none`);
    }
    // :187, :197-202, :321-322 -- position is half of what makes a default read as one.
    if (firstMark > 0) {
      add("rec/marker-not-first", "error", `${where}.o${firstMark + 1}`, "marked option is not first in the array");
    }
    // :222-224, :321-322 -- no marker is a complete answer, but only when the question says so.
    if (markCount === 0 && opts.length > 0 && !EQUIVALENCE.test(question)) {
      add("rec/none-without-equivalence-note", "warn", where,
        "no option is marked and the question text does not say the options are equivalent");
    }

    // --- previews, SKILL.md section 7 and the Gotchas ------------------------------------
    const withPreview = opts.filter((o) => text(o.preview).length > 0).length;
    // :66-68, :328 -- the combination is discarded without a word.
    if (withPreview > 0 && multiSelect) {
      add("layout/preview-on-multiselect", "error", where, "previews on a multiSelect question are discarded silently");
    }
    // :246-251 -- the layout exists for comparing rendered things, and a partial set compares
    // one thing against nothing.
    if (withPreview > 0 && withPreview < opts.length) {
      add("layout/preview-partial", "warn", where, `${withPreview} of ${opts.length} options carry a preview`);
    }

    // :173-176, :326, and re-pitch.md mode 2 -- two options described identically cannot be
    // compared. Byte-identical is the only part of comparability that is mechanical.
    const descriptions = opts.map((o) => text(o.description).trim());
    descriptions.forEach((d, i) => {
      if (d && descriptions.indexOf(d) !== i) {
        add("option/identical-descriptions", "error", `${where}.o${i + 1}`,
          "description is identical to a sibling's, so the two options do not compare");
      }
    });

    opts.forEach((o, oi) => {
      const at = `${where}.o${oi + 1}`;
      const label = text(o.label);
      const desc = text(o.description);
      const preview = text(o.preview);
      const bareLabel = normaliseLabel(label);

      // :84-85, :319 -- both required on every option.
      if (!label.trim()) add("schema/missing-label", "error", at, "label is required");
      if (!desc.trim()) add("schema/missing-description", "error", at, "description is required");

      // :191-195 -- the platform writes `(Recommended)`, and a skill teaching a second
      // spelling puts two conventions in front of one reader.
      if (MARKER_ANY_CASE.test(label) && !label.endsWith(MARKER)) {
        add("rec/marker-spelling", "error", at,
          `marker is "${label.slice(label.toLowerCase().lastIndexOf("(recommended"))}"; the platform's spelling is "${MARKER.trim()}" after a space`);
      }

      // :62-65, :320 -- yours competes with the escape the layout appends, and spends a slot.
      if (RESERVED_LABELS.has(bareLabel)) {
        add("option/reserved-name", "error", at, `"${label}" duplicates an escape the tool appends itself`);
      }

      // :157 -- "one to five words". Counted with the marker off, so marking an option does
      // not cost it a word of its budget.
      if (bareLabel && words(bareLabel) > 5) {
        add("option/label-word-count", "warn", at, `label is ${words(bareLabel)} words; one to five`);
      }

      // :161-171, :325, :363-365 -- the description's second half is the step most often
      // dropped, and the one that lets a reader recognise a mistake they already made.
      //
      // A PROXY, and a warning for that reason. One sentence can carry both halves:
      // "Deploys immediately, but search returns nothing until someone rebuilds" is correct
      // and would fail an error-level version of this. The quarantined set took the other
      // route -- an error when a description held neither a figure nor a word from a list of
      // consequences -- which passes both of this skill's worked examples but fires on a real
      // cost stated in words the list does not carry. Prefer a check that is always right.
      if (desc.trim() && sentences(desc).length < 2) {
        add("option/description-single-sentence", "warn", at,
          "description is one sentence; the cost half is what usually went missing");
      }

      // register.md:41-43 and :261 -- about 20 words for a procedural sentence, and a
      // description is closer to procedural.
      //
      // Fires past 25, not past 20. The skill's own worked example at :294 carries a 24-word
      // sentence, and a threshold that fails the artifact's exemplar is the threshold's
      // problem rather than the exemplar's. This correction came from reading the quarantined
      // module's note about the same mistake made against the old corpus.
      sentences(desc).forEach((s, si) => {
        if (words(s) > 25) {
          add("register/sentence-length", "warn", at, `sentence ${si + 1} is ${words(s)} words; around 25 is the bound`);
        }
      });

      // :262-263 -- "Simple tenses. Prefer `this removes` over `this will have removed`."
      if (COMPOUND_TENSE.test(desc)) {
        add("register/compound-tense", "warn", at, "compound or future tense; the skill asks for simple tenses");
      }

      // :30-34 -- the dialog covers the conversation, so a reference to earlier text points
      // at something the reader cannot reach.
      for (const re of CROSS_REFERENCE) {
        const m = re.exec(desc) ?? re.exec(label);
        if (m) {
          add("register/cross-reference", "warn", at, `"${m[0]}" points outside the call, which the reader cannot reach`);
          break;
        }
      }

      // :211-216 -- the skill names this exact phrase as the justification that is not one.
      if (marked[oi] === true && VIRTUE.test(desc)) {
        add("rec/virtue-justification", "warn", at,
          "the recommendation's reason reads as a virtue; :211-216 asks for a fact from the situation");
      }

      // :73-75 -- under `html` the validator turns these away, so they are never valid.
      if (preview && /<script|<style|<!doctype|<html[\s>]/i.test(preview)) {
        add("schema/preview-unsafe", "error", at, "preview carries a script, a style block, or a whole document");
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
   * 1.0 when nothing fired, floored at 0. An error costs 1/optionCount, a warning 0.35 of that.
   *
   * READ THIS BEFORE COMPARING TWO SCORES. The denominator is the call's option count, which
   * compresses in two ways worth knowing:
   *
   *   - Question-level findings are normalised by option count anyway. A duplicate question
   *     text or a missing header is a defect of the question, divided by however many options
   *     its siblings happen to carry, so a 2-option call is penalised eight times harder than
   *     a 4-by-4 one for the same defect. Measured: one error scores 0.50 on 1 question with
   *     2 options, 0.75 on 1 by 4, and 0.94 on 4 by 4.
   *   - It floors from the second error on a minimum call, so two defects and twelve are
   *     indistinguishable at 0.00.
   *
   * The arithmetic is left as it was on purpose: changing the denominator now would make these
   * figures incomparable with any later baseline for a cosmetic gain. What makes that safe is
   * that the pass/fail signal does not ride on it -- `cleanCallRate` and `errorsByRule` in
   * `composition-runner.ts` are computed from the findings directly, so the gate is the error
   * count and this number is a summary beside it.
   */
  readonly value: number;
}

export function scoreFindings(findings: readonly Finding[], call: Call): Score {
  const errors = findings.filter((f) => f.severity === "error").length;
  const warnings = findings.filter((f) => f.severity === "warn").length;
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
    console.log(`${tag} ${f.at.padEnd(8)} ${f.id.padEnd(34)} ${f.message}`);
  }
  if (!findings.length) console.log(`no findings -- ${ACTIVE_RULE_COUNT} rules active`);

  console.log("\nFirst sentence of each description, for the parallelism read:");
  for (const line of parallelismDiagnostic(call)) console.log(`  ${line}`);

  console.log(`\n${score.errors} error(s), ${score.warnings} warning(s), score ${score.value.toFixed(2)}`);
  console.log(`${ACTIVE_RULE_COUNT} rules checked. Half of the skill's pre-flight loop needs a reader;`);
  console.log("see the module header for what this layer does not check.");
  process.exit(score.errors > 0 ? 1 : 0);
}
