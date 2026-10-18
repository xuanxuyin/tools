/**
 * Mad-minute drill generator (#14): pure, seeded, shared by the SSR sheet
 * (fixed default set, fully printable with JavaScript off) and the live
 * island on the multiplication chart page (operation / number range /
 * problem count → new sheet + answer key, then window.print()).
 *
 * Conventions follow the classic mad-minute drill:
 *  - 30 problems (3 columns) or 60 problems (4 columns), one letter page;
 *  - subtraction never goes negative (operands swap so a ≥ b);
 *  - multiplication operands stay ≥ 1 (×0 and ×1 rows are not facts);
 *  - the answer key prints on its own page after the drill (.sheet-break).
 */

export type MadOp = 'addition' | 'subtraction' | 'multiplication' | 'mixed';

export interface MadMinuteOptions {
  op: MadOp;
  min: number;
  max: number;
  count: number;
  seed: number;
}

export interface MadProblem {
  a: number;
  b: number;
  symbol: '+' | '−' | '×';
  answer: number;
}

/** mulberry32 — same seeded RNG as wordSearch.ts (kept private there). */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const OP_SYMBOLS = { addition: '+', subtraction: '−', multiplication: '×' } as const;
const ALL_SYMBOLS = ['+', '−', '×'] as const;

export function generateMadMinute(opts: MadMinuteOptions): MadProblem[] {
  const rand = rng(opts.seed);
  const int = (lo: number, hi: number) => lo + Math.floor(rand() * (hi - lo + 1));

  const problems: MadProblem[] = [];
  for (let i = 0; i < opts.count; i++) {
    const symbol =
      opts.op === 'mixed'
        ? ALL_SYMBOLS[Math.floor(rand() * ALL_SYMBOLS.length)]!
        : OP_SYMBOLS[opts.op];

    let a = int(opts.min, opts.max);
    let b = int(opts.min, opts.max);
    if (symbol === '×') {
      a = Math.max(1, a);
      b = Math.max(1, b);
    }
    if (symbol === '−' && b > a) {
      const t = a;
      a = b;
      b = t;
    }
    const answer = symbol === '+' ? a + b : symbol === '−' ? a - b : a * b;
    problems.push({ a, b, symbol, answer });
  }
  return problems;
}

/** Number-range presets per operation (UI + island rebuild them together). */
export const MAD_RANGES: Record<MadOp, [number, number][]> = {
  addition: [
    [0, 10],
    [0, 12],
    [0, 20],
  ],
  subtraction: [
    [0, 10],
    [0, 12],
    [0, 20],
  ],
  multiplication: [
    [1, 10],
    [1, 12],
  ],
  mixed: [
    [1, 10],
    [1, 12],
  ],
};

/** The SSR default: what a no-JS visitor (and Google) sees — a complete sheet. */
export const MAD_DEFAULTS: MadMinuteOptions = {
  op: 'multiplication',
  min: 1,
  max: 12,
  count: 30,
  seed: 20261025,
};

function sheetTitle(op: MadOp, max: number): string {
  const names: Record<MadOp, string> = {
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    mixed: 'Mixed Practice',
  };
  const range = op === 'multiplication' ? `facts to ${max}` : `numbers to ${max}`;
  return `Mad Minute — ${names[op]} (${range})`;
}

/**
 * Full drill HTML (problems grid + paginated answer key). One string so the
 * Astro component (set:html) and the island (innerHTML) render identically.
 */
export function renderMadMinuteHtml(opts: MadMinuteOptions): string {
  const problems = generateMadMinute(opts);
  const cols = opts.count > 30 ? 4 : 3;
  const gridStyle = `grid-template-columns:repeat(${cols},1fr)`;

  const items = problems
    .map((p, i) => {
      const n = `<span class="mm-n">${i + 1}.</span>`;
      return `<div class="mm-item">${n}<span class="mm-q">${p.a} ${p.symbol} ${p.b} = ____</span></div>`;
    })
    .join('');

  const answers = problems
    .map((p, i) => {
      const n = `<span class="mm-n">${i + 1}.</span>`;
      return `<div class="mm-item">${n}<span class="mm-q">${p.a} ${p.symbol} ${p.b} = <strong>${p.answer}</strong></span></div>`;
    })
    .join('');

  return (
    `<section class="mm-sheet" aria-label="${sheetTitle(opts.op, opts.max)}">` +
    `<h2 class="sheet-title">${sheetTitle(opts.op, opts.max)}</h2>` +
    `<p class="mm-sub">${opts.count} problems · how many can you finish in one minute?</p>` +
    `<p class="mm-name">Name: ______________________ &nbsp;&nbsp; Date: ____________ &nbsp;&nbsp; Score: ____ / ${opts.count}</p>` +
    `<div class="mm-grid" style="${gridStyle}">${items}</div>` +
    `</section>` +
    `<section class="mm-answers sheet-break" aria-label="Answer key">` +
    `<h2 class="sheet-title">Answer Key — ${sheetTitle(opts.op, opts.max)}</h2>` +
    `<div class="mm-grid" style="${gridStyle}">${answers}</div>` +
    `</section>`
  );
}
