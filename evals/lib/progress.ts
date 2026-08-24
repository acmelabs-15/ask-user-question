/**
 * One line of progress for runs measured in tens of minutes.
 *
 * Renders to **stderr, never stdout**. Both runners write their report to stdout and
 * the Makefile redirects it into a file; a bar drawn there would land in the middle
 * of the markdown.
 *
 * TTY and non-TTY are deliberately different renderings of the same state. A
 * carriage-return redraw is unreadable once stderr is a file -- every frame
 * concatenates onto one line -- so when stderr is not a terminal the bar degrades to
 * a plain line at each 10% boundary. That is also what CI sees.
 *
 * The mark characters are the callers' own, and they carry meaning: the trigger
 * runner sends `+` for a probe the target skill won, `.` for one it lost, `!` for a
 * subprocess failure. Tallying them is why a bar beats a spinner here -- you can see
 * a run going wrong at 20% instead of reading it in the report at 100%.
 */

export interface Progress {
  /** One unit finished. `mark` is a single character tallied and shown alongside the bar. */
  tick(mark?: string): void;
  /** Final frame plus a newline. Safe to call twice. */
  done(): void;
}

const FILL = "█";
const EMPTY = "░";

function human(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}m`;
}

export function progress(total: number, label = ""): Progress {
  const started = Date.now();
  const marks = new Map<string, number>();
  const tty = Boolean(process.stderr.isTTY);
  let count = 0;
  let lastDecile = -1;
  let finished = false;

  function frame(): string {
    const pct = total === 0 ? 100 : Math.floor((100 * count) / total);
    const elapsed = Date.now() - started;

    // An ETA projected from one completed call out of eighty is noise wearing a
    // number's clothes. Three samples is the fewest that is worth showing.
    const eta =
      count >= 3 && count < total
        ? ` ~${human((elapsed / count) * (total - count))} left`
        : "";

    const tally = [...marks].map(([m, n]) => `${m}${n}`).join(" ");
    // `||` rather than `??` on purpose: a pty with no size reports 0, not undefined,
    // and 0 would budget the bar down to its minimum width on every frame.
    const cols = process.stderr.columns || 80;

    if (!tty) {
      return `  ${label}${String(pct).padStart(3)}%  ${count}/${total}  ${human(elapsed)} elapsed${eta}`;
    }

    // Budget the bar out of whatever the terminal actually has, so a narrow window
    // loses bar width rather than wrapping every frame onto a new line.
    const fixed = `  ${label}100%  ${count}/${total}  ${human(elapsed)} elapsed${eta}  ${tally}`.length;
    const width = Math.max(6, Math.min(24, cols - fixed - 4));
    const filled = Math.round((width * (total === 0 ? 1 : count / total)));
    const bar = FILL.repeat(filled) + EMPTY.repeat(width - filled);

    return `  ${label}\x1b[36m${bar}\x1b[0m ${String(pct).padStart(3)}%  ${count}/${total}  \x1b[2m${human(elapsed)} elapsed${eta}\x1b[0m  \x1b[2m${tally}\x1b[0m`;
  }

  function paint() {
    if (tty) {
      // \x1b[K clears to end of line: a shorter frame must not leave the tail of a
      // longer one behind, which is how "12/78" becomes "9/788".
      process.stderr.write(`\r${frame()}\x1b[K`);
      return;
    }
    const decile = total === 0 ? 10 : Math.floor((10 * count) / total);
    if (decile > lastDecile) {
      lastDecile = decile;
      process.stderr.write(`${frame()}\n`);
    }
  }

  paint();

  return {
    tick(mark = "·") {
      count += 1;
      marks.set(mark, (marks.get(mark) ?? 0) + 1);
      paint();
    },
    done() {
      if (finished) return;
      finished = true;
      if (tty) process.stderr.write(`\r${frame()}\x1b[K\n\n`);
      else process.stderr.write(`${frame()}\n\n`);
    },
  };
}
