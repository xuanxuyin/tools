/**
 * Level-mode math practice (#36): the leveled quiz island on the
 * multiplication chart page. Pure, seeded generators — no bank of stored
 * questions, every attempt draws a fresh set (the "bank" is generative).
 *
 * Design contracts:
 *  - 10 tracks (K–5, 6–8, Algebra 1), 10 levels each, difficulty ascending
 *    within a track; tracks are independent (a 3rd grader never grinds K–2).
 *  - Every question carries `steps`: a worked solution the island reveals
 *    on demand ("Show me how") and auto-opens after a wrong answer.
 *  - Answers are not always plain numbers: visual questions carry an SVG
 *    `figure`, and answer modes include fractions (3/4) and clock times
 *    (3:30) alongside integers and decimals.
 *  - Subtraction never goes negative except in the integer tracks (6th+),
 *    where negatives are the point.
 *  - Same mulberry32 seeding convention as wordSearch.ts / madMinute.ts.
 */

export type InputMode = 'int' | 'dec' | 'frac' | 'time';

export interface QuizQuestion {
  kind: string;
  /** Prompt text; symbolic questions carry `___` where the answer goes,
   *  figure questions ("How many dots?") ask in words instead. */
  display: string;
  answer: number;
  mode: InputMode;
  /** Canonical answer display for frac/time ("3/4", "3:30"). */
  answerLabel?: string;
  /** Inline SVG figure for visual questions (clocks, grids, bars…). */
  figure?: string;
  /** Worked solution lines, revealed by "Show me how". */
  steps: string[];
  /** Operands (kind-specific order) so tests can re-derive the answer. */
  ops: number[];
}

export type LevelKind =
  | { t: 'add'; min: number; max: number; sumMax?: number }
  | { t: 'sub'; min: number; max: number }
  | { t: 'mixedAS'; min: number; max: number; sumMax?: number }
  | { t: 'doubles'; min: number; max: number }
  | { t: 'nearDoubles'; min: number; max: number }
  | { t: 'missingAddend'; sumMin: number; sumMax: number; total?: number }
  | { t: 'tenPlus' }
  | { t: 'threeAdd'; min: number; max: number; sumMax?: number }
  | { t: 'tenMoreLess'; min: number; max: number }
  | { t: 'addAcross10' }
  | { t: 'subAcross10' }
  | { t: 'subAcrossTen' }
  | { t: 'addTens' }
  | { t: 'skipCount' }
  | { t: 'countDots'; min: number; max: number }
  | { t: 'shapeSides' }
  | { t: 'clock' }
  | { t: 'numberLine' }
  | { t: 'barGraph' }
  | { t: 'timesTable'; tables: number[] }
  | { t: 'divFacts'; divisors: number[]; qMin?: number; qMax?: number }
  | { t: 'mixedMD' }
  | { t: 'twoByOne'; aMin: number; aMax: number; bMin: number; bMax: number }
  | { t: 'multTens' }
  | { t: 'divTens' }
  | { t: 'missingFactor'; min: number; max: number }
  | { t: 'shadedFraction' }
  | { t: 'areaRect' }
  | { t: 'perimRect' }
  | { t: 'coordPoint' }
  | { t: 'decAdd' }
  | { t: 'decSub' }
  | { t: 'decMul' }
  | { t: 'decMul2' }
  | { t: 'decDiv' }
  | { t: 'fracOf'; fracs: [number, number][] }
  | { t: 'orderOps'; terms?: 3 | 4 }
  | { t: 'square'; max: number }
  | { t: 'twoByTwo'; min: number; max: number }
  | { t: 'percentOf'; pcts?: number[] }
  | { t: 'percentInverse' }
  | { t: 'discount'; pcts?: number[] }
  | { t: 'percentChange' }
  | { t: 'intAS'; range: number }
  | { t: 'intMD' }
  | { t: 'exp' }
  | { t: 'gcflcm' }
  | { t: 'solveTwoStep'; negatives?: boolean }
  | { t: 'proportion' }
  | { t: 'evalExpr' }
  | { t: 'unitRate' }
  | { t: 'sqrt'; max: number }
  | { t: 'cbrt' }
  | { t: 'expLaw' }
  | { t: 'sciNot' }
  | { t: 'slope' }
  | { t: 'linEval' }
  | { t: 'pythag' }
  | { t: 'circleCirc' }
  | { t: 'circleArea' }
  | { t: 'triangleArea' }
  | { t: 'triAngles' }
  | { t: 'systems' }
  | { t: 'distSolve' }
  | { t: 'bothSides' }
  | { t: 'quadRoots' }
  | { t: 'xsq' }
  | { t: 'absVal' }
  | { t: 'funcEval' };

export interface LevelSpec {
  title: string;
  focus: string;
  kinds: LevelKind[];
  /** CCSS anchor (e.g. '7.G.B.4') — injected from CCSS_CODES at module init */
  ccss?: string;
}

export interface TrackSpec {
  id: string;
  label: string;
  ages: string;
  group: 'Elementary' | 'Middle school' | 'Algebra 1';
  blurb: string;
  levels: LevelSpec[];
}

export const QUESTIONS_PER_LEVEL = 10;
export const PASS_SCORE = 8;

/* ------------------------------------------------------------------ */
/* Formatting helpers (US conventions, true minus sign like madMinute) */
/* ------------------------------------------------------------------ */

const SUP: Record<number, string> = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n: number): string => SUP[n] ?? `^${n}`;

function n(x: number): string {
  return x < 0 ? `−${Math.abs(x)}` : String(x);
}
function signedTerm(x: number, unit: string): string {
  return x < 0 ? ` − ${Math.abs(x)}${unit}` : ` + ${x}${unit}`;
}
function fmt1(x: number): string {
  return (Math.round(x * 10) / 10).toFixed(1);
}
function fmt2(x: number): string {
  return (Math.round(x * 100) / 100).toFixed(2);
}
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

const FRAC_GLYPH: Record<string, string> = {
  '1/2': '½', '1/3': '⅓', '2/3': '⅔', '1/4': '¼', '3/4': '¾',
  '1/5': '⅕', '2/5': '⅖', '3/5': '⅗', '4/5': '⅘', '1/6': '⅙', '5/6': '⅚',
  '1/8': '⅛', '3/8': '⅜', '5/8': '⅝', '7/8': '⅞',
};
const fracGlyph = (f: [number, number]): string => FRAC_GLYPH[`${f[0]}/${f[1]}`] ?? `${f[0]}/${f[1]}`;
const GLYPH_VALUE: Record<string, number> = Object.fromEntries(
  Object.entries(FRAC_GLYPH).map(([k, g]) => [g, Number(k.split('/')[0]) / Number(k.split('/')[1])]),
);

/* ------------------------------------------------------------------ */
/* Seeded RNG (mulberry32, same convention as the other engines)       */
/* ------------------------------------------------------------------ */

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

type Rand = () => number;
const int = (r: Rand, lo: number, hi: number): number => lo + Math.floor(r() * (hi - lo + 1));
const pick = <T,>(r: Rand, arr: readonly T[]): T => arr[Math.floor(r() * arr.length)]!;
const coin = (r: Rand): boolean => r() < 0.5;

/* ------------------------------------------------------------------ */
/* SVG figure builders (line art, currentColor + site green tokens)    */
/* ------------------------------------------------------------------ */

const S = (w: number, h: number, inner: string): string =>
  `<svg viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true" focusable="false">${inner}</svg>`;
const LN = 'stroke="currentColor" stroke-width="2" fill="none"';
const FILL = 'var(--green)';

function dotsFigure(count: number): string {
  const parts: string[] = [];
  let placed = 0;
  for (let row = 0; placed < count; row++) {
    const inRow = Math.min(5, count - placed);
    for (let i = 0; i < inRow; i++) {
      parts.push(`<circle cx="${30 + i * 34}" cy="${40 + row * 40}" r="10" fill="${FILL}"/>`);
    }
    placed += inRow;
  }
  return S(196, 120, parts.join(''));
}

function clockFigure(h: number, m: number): string {
  const cx = 100;
  const cy = 100;
  const r = 82;
  const ticks: string[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    const x1 = cx + (r - 10) * Math.sin(a);
    const y1 = cy - (r - 10) * Math.cos(a);
    const x2 = cx + (r - 3) * Math.sin(a);
    const y2 = cy - (r - 3) * Math.cos(a);
    ticks.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="currentColor" stroke-width="2"/>`);
  }
  const hand = (deg: number, len: number, w: number): string => {
    const a = (deg * Math.PI) / 180;
    return `<line x1="${cx}" y1="${cy}" x2="${(cx + len * Math.sin(a)).toFixed(1)}" y2="${(cy - len * Math.cos(a)).toFixed(1)}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  const hourDeg = ((h % 12) + m / 60) * 30;
  const minDeg = m * 6;
  return S(
    200,
    200,
    `<circle cx="${cx}" cy="${cy}" r="${r}" ${LN}/>` +
      ticks.join('') +
      hand(hourDeg, 46, 5) +
      hand(minDeg, 66, 3) +
      `<circle cx="${cx}" cy="${cy}" r="4" fill="currentColor"/>`,
  );
}

function shapeFigure(sides: number): string {
  const cx = 100;
  const cy = 100;
  const r = 70;
  const pts = Array.from({ length: sides }, (_, i) => {
    const a = ((-90 + (i * 360) / sides) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return S(200, 200, `<polygon points="${pts.join(' ')}" ${LN}/>`);
}

function numberLineFigure(step: number, target: number): string {
  const y = 40;
  const x0 = 14;
  const span = 212;
  const n0 = 9; // 10 ticks: 0..9 steps
  const dx = span / n0;
  const parts: string[] = [`<line x1="${x0}" y1="${y}" x2="${x0 + span}" y2="${y}" stroke="currentColor" stroke-width="2"/>`];
  for (let i = 0; i <= n0; i++) {
    const x = x0 + i * dx;
    parts.push(`<line x1="${x.toFixed(1)}" y1="${y - 7}" x2="${x.toFixed(1)}" y2="${y + 7}" stroke="currentColor" stroke-width="2"/>`);
    if (i === 0 || i === 5 || i === n0) {
      parts.push(
        `<text x="${x.toFixed(1)}" y="${y + 26}" text-anchor="middle" font-size="12" fill="currentColor">${i * step}</text>`,
      );
    }
  }
  const tx = x0 + (target / step) * dx;
  parts.push(`<circle cx="${tx.toFixed(1)}" cy="${y}" r="6" fill="${FILL}"/>`);
  return S(240, 76, parts.join(''));
}

function barGraphFigure(cats: string[], vals: number[]): string {
  const baseY = 108;
  const maxV = Math.max(...vals);
  const unit = 82 / maxV;
  const parts: string[] = [`<line x1="16" y1="${baseY}" x2="224" y2="${baseY}" stroke="currentColor" stroke-width="2"/>`];
  const w = 38;
  const gap = (208 - w * vals.length) / (vals.length + 1);
  vals.forEach((v, i) => {
    const x = 16 + gap + i * (w + gap);
    const h = v * unit;
    parts.push(
      `<rect x="${x.toFixed(1)}" y="${(baseY - h).toFixed(1)}" width="${w}" height="${h.toFixed(1)}" fill="${i === 0 ? FILL : 'none'}" stroke="currentColor" stroke-width="2"/>`,
    );
    parts.push(
      `<text x="${(x + w / 2).toFixed(1)}" y="${baseY + 15}" text-anchor="middle" font-size="11" fill="currentColor">${cats[i]}</text>`,
    );
  });
  return S(240, 128, parts.join(''));
}

function fractionBarFigure(k: number, d: number): string {
  const x0 = 20;
  const y0 = 34;
  const w = 200;
  const h = 44;
  const cw = w / d;
  const parts: string[] = [];
  for (let i = 0; i < d; i++) {
    const x = x0 + i * cw;
    parts.push(
      `<rect x="${x.toFixed(1)}" y="${y0}" width="${cw.toFixed(1)}" height="${h}" fill="${i < k ? FILL : 'none'}" stroke="currentColor" stroke-width="2"/>`,
    );
  }
  return S(240, 112, parts.join(''));
}

function rectFigure(l: number, w: number): string {
  const boxW = 200;
  const boxH = 110;
  const scale = Math.min(boxW / l, boxH / w);
  const rw = l * scale;
  const rh = w * scale;
  const x0 = (240 - rw) / 2;
  const y0 = (140 - rh) / 2;
  return S(
    240,
    140,
    `<rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" ${LN}/>` +
      `<text x="${(x0 + rw / 2).toFixed(1)}" y="${(y0 - 8).toFixed(1)}" text-anchor="middle" font-size="13" fill="currentColor">${l}</text>` +
      `<text x="${(x0 + rw + 12).toFixed(1)}" y="${(y0 + rh / 2 + 4).toFixed(1)}" font-size="13" fill="currentColor">${w}</text>`,
  );
}

function gridFigure(xMin: number, xMax: number, yMin: number, yMax: number, pts: [number, number][]): string {
  const w = 232;
  const h = 188;
  const pad = { l: 16, r: 16, t: 12, b: 18 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const px = (x: number): number => pad.l + ((x - xMin) / (xMax - xMin)) * iw;
  const py = (y: number): number => pad.t + (1 - (y - yMin) / (yMax - yMin)) * ih;
  const parts: string[] = [];
  for (let x = xMin; x <= xMax; x++) {
    parts.push(`<line x1="${px(x).toFixed(1)}" y1="${pad.t}" x2="${px(x).toFixed(1)}" y2="${h - pad.b}" stroke="currentColor" stroke-width="${x === 0 ? 1.6 : 0.5}" opacity="${x === 0 ? 1 : 0.45}"/>`);
  }
  for (let y = yMin; y <= yMax; y++) {
    parts.push(`<line x1="${pad.l}" y1="${py(y).toFixed(1)}" x2="${w - pad.r}" y2="${py(y).toFixed(1)}" stroke="currentColor" stroke-width="${y === 0 ? 1.6 : 0.5}" opacity="${y === 0 ? 1 : 0.45}"/>`);
  }
  const lab = (x: number, y: number, s: string, anchor = 'middle'): string =>
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-size="9" fill="currentColor">${s}</text>`;
  for (let x = xMin; x <= xMax; x += 2) {
    if (x !== 0) parts.push(lab(px(x), h - pad.b + 11, String(x)));
  }
  for (let y = yMin; y <= yMax; y += 2) {
    if (y !== 0) parts.push(lab(pad.l - 5, py(y) + 3, String(y), 'end'));
  }
  for (const [x, y] of pts) {
    parts.push(`<circle cx="${px(x).toFixed(1)}" cy="${py(y).toFixed(1)}" r="5" fill="${FILL}" stroke="currentColor" stroke-width="1.5"/>`);
  }
  return S(w, h, parts.join(''));
}

function coordFigure(x: number, y: number): string {
  return gridFigure(-5, 5, -5, 5, [[x, y]]);
}

function slopeFigure(x1: number, y1: number, x2: number, y2: number): string {
  return gridFigure(-8, 9, -9, 9, [
    [x1, y1],
    [x2, y2],
  ]);
}

function triangleFigure(a: number, b: number, c: number, hypMode: boolean): string {
  const x0 = 30;
  const y0 = 120;
  const scale = Math.min(180 / a, 90 / b);
  const aw = a * scale;
  const bh = b * scale;
  const mark = 12;
  return S(
    240,
    150,
    `<polygon points="${x0},${y0} ${x0 + aw},${y0} ${x0},${y0 - bh}" ${LN}/>` +
      `<polyline points="${x0},${y0 - mark} ${x0 + mark},${y0 - mark} ${x0 + mark},${y0}" stroke="currentColor" stroke-width="1.5" fill="none"/>` +
      `<text x="${x0 + aw / 2}" y="${y0 + 18}" text-anchor="middle" font-size="13" fill="currentColor">${a}</text>` +
      `<text x="${x0 - 12}" y="${y0 - bh / 2}" text-anchor="middle" font-size="13" fill="currentColor">${hypMode ? b : '?'}</text>` +
      `<text x="${x0 + aw / 2 + 16}" y="${y0 - bh / 2 - 4}" font-size="13" fill="currentColor">${hypMode ? '?' : c}</text>`,
  );
}

function circleFigure(rad: number, labelD: boolean): string {
  const cx = 120;
  const cy = 78;
  const R = 56;
  const seg = labelD
    ? `<line x1="${cx - R}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="currentColor" stroke-width="1.5"/>`
    : `<line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="currentColor" stroke-width="1.5"/>`;
  const label = labelD ? `d = ${rad * 2}` : `r = ${rad}`;
  return S(
    240,
    150,
    `<circle cx="${cx}" cy="${cy}" r="${R}" ${LN}/>` +
      `<circle cx="${cx}" cy="${cy}" r="2.5" fill="currentColor"/>` +
      seg +
      `<text x="${cx}" y="${cy - 10}" text-anchor="middle" font-size="13" fill="currentColor">${label}</text>`,
  );
}

function triangleAreaFigure(b: number, h: number): string {
  const x0 = 25;
  const y0 = 120;
  const scale = Math.min(190 / b, 85 / h);
  const bw = b * scale;
  const hh = h * scale;
  const ax = x0 + bw * 0.62;
  return S(
    240,
    150,
    `<polygon points="${x0},${y0} ${x0 + bw},${y0} ${ax},${y0 - hh}" ${LN}/>` +
      `<line x1="${ax}" y1="${y0}" x2="${ax}" y2="${y0 - hh}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>` +
      `<polyline points="${ax},${y0 - 8} ${ax + 8},${y0 - 8} ${ax + 8},${y0}" stroke="currentColor" stroke-width="1.5" fill="none"/>` +
      `<text x="${x0 + bw / 2}" y="${y0 + 18}" text-anchor="middle" font-size="13" fill="currentColor">${b}</text>` +
      `<text x="${ax + 7}" y="${(2 * y0 - hh) / 2 + 4}" font-size="13" fill="currentColor">${h}</text>`,
  );
}

function triAnglesFigure(a: number, b: number): string {
  const x0 = 25;
  const bw = 190;
  const y0 = 122;
  const hh = 88;
  const ax = x0 + bw * (b / (a + b));
  const ay = y0 - hh;
  const arc = (vx: number, vy: number, towardX: number, towardY: number, sweep: number): string => {
    const L = Math.hypot(towardX - vx, towardY - vy) || 1;
    const ux = (towardX - vx) / L;
    const uy = (towardY - vy) / L;
    const R = 15;
    const endX = (vx + R * ux).toFixed(1);
    const endY = (vy + R * uy).toFixed(1);
    return `<path d="M ${(vx + R * (towardX === vx ? 0 : Math.sign(towardX - vx))).toFixed(1)} ${vy} A ${R} ${R} 0 0 ${sweep} ${endX} ${endY}" stroke="currentColor" stroke-width="1.5" fill="none"/>`;
  };
  return S(
    240,
    150,
    `<polygon points="${x0},${y0} ${x0 + bw},${y0} ${ax},${ay}" ${LN}/>` +
      arc(x0, y0, ax, ay, 0) +
      arc(x0 + bw, y0, ax, ay, 1) +
      `<text x="${x0 + 32}" y="${y0 - 10}" font-size="13" fill="currentColor">${a}°</text>` +
      `<text x="${x0 + bw - 32}" y="${y0 - 10}" text-anchor="end" font-size="13" fill="currentColor">${b}°</text>` +
      `<text x="${ax}" y="${ay - 12}" text-anchor="middle" font-size="15" fill="currentColor">?</text>`,
  );
}

/* ------------------------------------------------------------------ */
/* Generators                                                          */
/* ------------------------------------------------------------------ */

/** tier = difficulty dial inside a level: 1 gentle, 2 the level's core
 *  workload, 3 the level's ceiling. Generators that ignore it keep their
 *  fixed ranges (facts are facts); arithmetic scales its operands. */
type Gen = (r: Rand, tier: 1 | 2 | 3) => Omit<QuizQuestion, 'kind'>;

function addSteps(a: number, b: number, ans: number): string[] {
  if (a <= 9 && b <= 9 && a + b > 10) {
    const toTen = 10 - Math.max(a, b);
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    return [
      `Make ten first: ${big} + ${toTen} = 10.`,
      `That used ${toTen} of the ${small}, so ${small - toTen} is left.`,
      `10 + ${small - toTen} = ${ans}.`,
    ];
  }
  if (a >= 10 && b >= 10) {
    const ta = Math.floor(a / 10) * 10;
    const tb = Math.floor(b / 10) * 10;
    return [
      `Tens first: ${ta} + ${tb} = ${ta + tb}.`,
      `Then the ones: ${a - ta} + ${b - tb} = ${a - ta + b - tb}.`,
      `${ta + tb} + ${a - ta + b - tb} = ${ans}.`,
    ];
  }
  return [`Start at the bigger number, ${Math.max(a, b)}, and count on ${Math.min(a, b)} more.`, `…${Math.max(a, b) + 1}, ${Math.max(a, b) + 2}, up to ${ans}.`];
}

function subSteps(a: number, b: number, ans: number): string[] {
  const decA = Math.floor(a / 10) * 10;
  if (b <= a && a <= 20 && b < a && a % 10 < b % 10 && b < 10) {
    const up = a - decA;
    return [
      `Back through ten: first take ${up} to reach 10 (${a} − ${up} = 10).`,
      `You still owe ${b - up}: 10 − ${b - up} = ${10 - (b - up)}.`,
      `So ${a} − ${b} = ${ans}.`,
    ];
  }
  if (a > 20 && b < 10) {
    const ones = a % 10;
    return [`${a} − ${ones} = ${a - ones} (drop to the ten first).`, `Then ${a - ones} − ${b - ones} = ${ans}.`];
  }
  return [`Count up from ${b} to ${a} — that distance is the answer.`, `${b} → ${ans} → ${a}: the gap is ${ans - b} and then ${a - ans}.`, `Total gap: ${(ans - b) + (a - ans)} = ${a - b}.`];
}

function genAdd(min: number, max: number, sumMax?: number): Gen {
  return (r) => {
    let a = int(r, min, max);
    let b = int(r, min, max);
    if (sumMax !== undefined) {
      for (let i = 0; i < 60 && a + b > sumMax; i++) b = int(r, min, Math.min(max, sumMax - a));
      b = Math.max(min, Math.min(b, sumMax - a));
    }
    return { display: `${a} + ${b} = ___`, answer: a + b, mode: 'int', ops: [a, b], steps: addSteps(a, b, a + b) };
  };
}
function genSub(min: number, max: number): Gen {
  return (r) => {
    let a = int(r, min, max);
    let b = int(r, min, max);
    if (b > a) [a, b] = [b, a];
    return { display: `${a} − ${b} = ___`, answer: a - b, mode: 'int', ops: [a, b], steps: subSteps(a, b, a - b) };
  };
}
function genMixedAS(min: number, max: number, sumMax?: number): Gen {
  const add = genAdd(min, max, sumMax);
  const sub = genSub(min, max);
  return (r) => (coin(r) ? add(r) : sub(r));
}
function genDoubles(min: number, max: number): Gen {
  return (r) => {
    const a = int(r, min, max);
    return {
      display: `${a} + ${a} = ___`,
      answer: a + a,
      mode: 'int',
      ops: [a, a],
      steps: [`A double adds the number to itself.`, `${a} + ${a} = ${a + a}.`],
    };
  };
}
function genNearDoubles(min: number, max: number): Gen {
  return (r) => {
    const a = int(r, min, max);
    return {
      display: `${a} + ${a + 1} = ___`,
      answer: a + a + 1,
      mode: 'int',
      ops: [a, a + 1],
      steps: [`Use the double you know: ${a} + ${a} = ${a + a}.`, `One extra: ${a + a} + 1 = ${a + a + 1}.`],
    };
  };
}
function genMissingAddend(sumMin: number, sumMax: number, total?: number): Gen {
  return (r) => {
    const c = total ?? int(r, sumMin, sumMax);
    const a = int(r, 0, c - 1);
    return {
      display: `${a} + ___ = ${c}`,
      answer: c - a,
      mode: 'int',
      ops: [a, c],
      steps: [`Ask: how far is ${a} from ${c}?`, `Count up (or subtract): ${c} − ${a} = ${c - a}.`],
    };
  };
}
const genTenPlus: Gen = (r) => {
  const b = int(r, 1, 9);
  return {
    display: `10 + ${b} = ___`,
    answer: 10 + b,
    mode: 'int',
    ops: [10, b],
    steps: [`One ten and ${b} ones make a teen number.`, `10 + ${b} = 1${b === 9 ? '9' : b}… that is ${10 + b}.`],
  };
};
function genThreeAdd(min: number, max: number, sumMax?: number): Gen {
  return (r) => {
    let a = int(r, min, max);
    let b = int(r, min, max);
    let c = int(r, min, max);
    if (sumMax !== undefined) {
      for (let i = 0; i < 60 && a + b + c > sumMax; i++) c = int(r, min, Math.min(max, sumMax - a - b));
      c = Math.max(min, Math.min(c, sumMax - a - b));
    }
    const ab = a + b;
    return {
      display: `${a} + ${b} + ${c} = ___`,
      answer: a + b + c,
      mode: 'int',
      ops: [a, b, c],
      steps: [`Add two first: ${a} + ${b} = ${ab}.`, `Then ${ab} + ${c} = ${ab + c}.`],
    };
  };
}
function genTenMoreLess(min: number, max: number): Gen {
  return (r) => {
    const plus = coin(r);
    const a = int(r, plus ? min : min + 10, max);
    return {
      display: `${a} ${plus ? '+' : '−'} 10 = ___`,
      answer: plus ? a + 10 : a - 10,
      mode: 'int',
      ops: [a, 10],
      steps: [
        plus ? 'Ten more = one more group of ten; the ones digit never changes.' : 'Ten less = one fewer group of ten; the ones digit never changes.',
        `The ones stay ${a % 10}: ${a} → ${plus ? a + 10 : a - 10}.`,
      ],
    };
  };
}
const genAddAcross10: Gen = (r) => {
  let a = int(r, 2, 9);
  let b = int(r, 2, 9);
  for (let i = 0; i < 60 && a + b <= 10; i++) {
    a = int(r, 2, 9);
    b = int(r, 2, 9);
  }
  return { display: `${a} + ${b} = ___`, answer: a + b, mode: 'int', ops: [a, b], steps: addSteps(a, b, a + b) };
};
const genSubAcross10: Gen = (r) => {
  const a = int(r, 11, 18);
  const b = int(r, a - 9, 9);
  return { display: `${a} − ${b} = ___`, answer: a - b, mode: 'int', ops: [a, b], steps: subSteps(a, b, a - b) };
};
const genSubAcrossTen: Gen = (r) => {
  const b = int(r, 2, 9);
  let a = int(r, 21, 99);
  for (let i = 0; i < 60 && a % 10 >= b; i++) a = int(r, 21, 99);
  const ones = a % 10;
  return {
    display: `${a} − ${b} = ___`,
    answer: a - b,
    mode: 'int',
    ops: [a, b],
    steps: [`Split the ${b}: take ${ones} first — ${a} − ${ones} = ${a - ones}.`, `Then ${a - ones} − ${b - ones} = ${a - b}.`],
  };
};
const genAddTens: Gen = (r) => {
  const t1 = int(r, 1, 9);
  const t2 = int(r, 1, Math.min(9, 10 - t1));
  return {
    display: `${t1 * 10} + ${t2 * 10} = ___`,
    answer: (t1 + t2) * 10,
    mode: 'int',
    ops: [t1, t2],
    steps: [`Tens add just like ones: ${t1} tens + ${t2} tens = ${t1 + t2} tens.`, `${t1 + t2} tens = ${(t1 + t2) * 10}.`],
  };
};
const genSkipCount: Gen = (r) => {
  const step = pick(r, [2, 5, 10]);
  const start = step * int(r, 1, Math.max(1, Math.floor((100 - 4 * step) / step)));
  const terms = [0, 1, 2, 3].map((i) => start + i * step);
  return {
    display: `${terms.join(', ')}, ___`,
    answer: start + 4 * step,
    mode: 'int',
    ops: [start, step],
    steps: [`Each number is ${step} more than the one before.`, `${terms[3]!} + ${step} = ${start + 4 * step}.`],
  };
};

/* --- visual generators (figures) ----------------------------------- */

function genCountDots(min: number, max: number): Gen {
  return (r) => {
    const count = int(r, min, max);
    return {
      display: `How many dots?`,
      answer: count,
      mode: 'int',
      ops: [count],
      figure: dotsFigure(count),
      steps: [`Touch each dot as you count out loud.`, count > 5 ? `A full row is 5, then keep going: 5, 6, 7… there are ${count}.` : `You counted ${count} dots.`],
    };
  };
}

const SHAPES: [string, number][] = [
  ['triangle', 3],
  ['square', 4],
  ['pentagon', 5],
  ['hexagon', 6],
];
const genShapeSides: Gen = (r) => {
  const [name, sides] = pick(r, SHAPES);
  return {
    display: `How many sides does this shape have?`,
    answer: sides,
    mode: 'int',
    ops: [sides],
    figure: shapeFigure(sides),
    steps: [`A side is a straight edge. Count them by touching each one.`, `This shape is a ${name}, and a ${name} has ${sides} sides.`],
  };
};

const genClock: Gen = (r) => {
  const h = int(r, 1, 12);
  const m = coin(r) ? 0 : 30;
  const label = `${h}:${m === 0 ? '00' : '30'}`;
  return {
    display: `What time does the clock show?`,
    answer: h * 60 + m,
    answerLabel: label,
    mode: 'time',
    ops: [h, m],
    figure: clockFigure(h, m),
    steps: [
      `The short hand is the hour hand: it is just past ${h}.`,
      m === 0 ? `The long hand points straight up at 12 — zero minutes past.` : `The long hand points down at 6 — halfway around, 30 minutes.`,
      `The time is ${label}.`,
    ],
  };
};

const genNumberLine: Gen = (r) => {
  const step = pick(r, [1, 2, 5, 10]);
  const jumps = int(r, 4, 8);
  const target = jumps * step;
  return {
    display: `What number is the dot on?`,
    answer: target,
    mode: 'int',
    ops: [step, target],
    figure: numberLineFigure(step, target),
    steps: [`The marks count by ${step}.`, `Count the jumps from 0 to the dot: ${jumps} jumps.`, `${jumps} × ${step} = ${target}.`],
  };
};

const BAR_CATS = ['cats', 'dogs', 'birds'];
const genBarGraph: Gen = (r) => {
  const diff = coin(r);
  const cats = diff ? int(r, 2, 7) : int(r, 2, 9);
  const dogs = diff ? int(r, cats + 1, 9) : int(r, 2, 9);
  let birds = int(r, 2, 9);
  for (let i = 0; i < 60 && (birds === cats || birds === dogs); i++) birds = int(r, 2, 9);
  const vals = [cats, dogs, birds];
  return {
    display: diff ? `How many more dogs than cats?` : `How many cats and birds in all?`,
    answer: diff ? dogs - cats : cats + birds,
    mode: 'int',
    ops: vals,
    figure: barGraphFigure(BAR_CATS, vals),
    steps: [
      diff ? `Read each bar's height: cats = ${cats}, dogs = ${dogs}.` : `Read each bar's height: cats = ${cats}, birds = ${birds}.`,
      diff ? `Compare: ${dogs} − ${cats} = ${dogs - cats}.` : `Add: ${cats} + ${birds} = ${cats + birds}.`,
    ],
  };
};

function genTimesTable(tables: number[]): Gen {
  return (r) => {
    const t = pick(r, tables);
    const b = int(r, 1, 12);
    const ans = t * b;
    return coin(r)
      ? { display: `${t} × ${b} = ___`, answer: ans, mode: 'int', ops: [t, b], steps: tableSteps(t, b, ans) }
      : { display: `${b} × ${t} = ___`, answer: ans, mode: 'int', ops: [b, t], steps: tableSteps(t, b, ans) };
  };
}
function tableSteps(t: number, b: number, ans: number): string[] {
  const tip = (() => {
    switch (t) {
      case 1: return `Anything × 1 stays the same.`;
      case 2: return `Double ${b}: ${b} + ${b} = ${ans}.`;
      case 3: return `Skip-count by 3, ${b} hops: 3, 6, 9… lands on ${ans}.`;
      case 4: return `Double twice: ${b} + ${b} = ${2 * b}, then ${2 * b} + ${2 * b} = ${ans}.`;
      case 5: return `Half of the ×10 fact: ${b} × 10 = ${b * 10}, half of that is ${ans}.`;
      case 6: return `Triple it, then double: ${b} × 3 = ${3 * b}, ${3 * b} + ${3 * b} = ${ans}.`;
      case 7: return `Build from 5s and 2s: ${b} × 5 = ${5 * b} and ${b} × 2 = ${2 * b}; ${5 * b} + ${2 * b} = ${ans}.`;
      case 8: return `Double the 4s: ${b} × 4 = ${4 * b}, double again = ${ans}.`;
      case 9: return `×10, then subtract one group: ${b} × 10 = ${b * 10}, ${b * 10} − ${b} = ${ans}.`;
      case 10: return `Shift one place value: attach a zero — ${ans}.`;
      case 11: return b <= 9 ? `Repeat the digit: ${ans}.` : `Split it: ${b} × 10 + ${b} × 1 = ${b * 10} + ${b} = ${ans}.`;
      case 12: return `${b} × 10 + ${b} × 2 = ${b * 10} + ${2 * b} = ${ans}.`;
      default: return `${t} groups of ${b}.`;
    }
  })();
  return [`${t} × ${b} — use the ${t}s trick:`, tip];
}

function genDivFacts(divisors: number[], qMin = 2, qMax = 12): Gen {
  return (r) => {
    const b = pick(r, divisors);
    const q = int(r, qMin, qMax);
    return {
      display: `${b * q} ÷ ${b} = ___`,
      answer: q,
      mode: 'int',
      ops: [b * q, b],
      steps: [`Division and multiplication are opposites.`, `Related fact: ${b} × ${q} = ${b * q}, so ${b * q} ÷ ${b} = ${q}.`],
    };
  };
}
const genMixedMD: Gen = (r) => {
  if (coin(r)) {
    const t = int(r, 2, 12);
    const b = int(r, 2, 12);
    return { display: `${t} × ${b} = ___`, answer: t * b, mode: 'int', ops: [t, b], steps: tableSteps(t, b, t * b) };
  }
  const b = int(r, 2, 12);
  const q = int(r, 2, 12);
  return {
    display: `${b * q} ÷ ${b} = ___`,
    answer: q,
    mode: 'int',
    ops: [b * q, b],
    steps: [`Related fact: ${b} × ${q} = ${b * q}.`, `So ${b * q} ÷ ${b} = ${q}.`],
  };
};
function genTwoByOne(aMin: number, aMax: number, bMin: number, bMax: number): Gen {
  return (r) => {
    const a = int(r, aMin, aMax);
    const b = int(r, bMin, bMax);
    const tens = Math.floor(a / 10) * 10;
    const ones = a - tens;
    const steps =
      ones === 0
        ? [`${a} is ${a / 10} tens: ${a / 10} tens × ${b} = ${(a / 10) * b} tens = ${a * b}.`]
        : [
            `Break apart ${a}: ${tens} + ${ones}.`,
            `${tens} × ${b} = ${tens * b} and ${ones} × ${b} = ${ones * b}.`,
            `Add the parts: ${tens * b} + ${ones * b} = ${a * b}.`,
          ];
    return { display: `${a} × ${b} = ___`, answer: a * b, mode: 'int', ops: [a, b], steps };
  };
}
const genMultTens: Gen = (r) => {
  const b = int(r, 2, 9);
  const t = int(r, 2, 9) * 10;
  return coin(r)
    ? { display: `${b} × ${t} = ___`, answer: b * t, mode: 'int', ops: [b, t], steps: multTensSteps(b, t, b * t) }
    : { display: `${t} × ${b} = ___`, answer: b * t, mode: 'int', ops: [t, b], steps: multTensSteps(b, t, b * t) };
};
function multTensSteps(b: number, t: number, ans: number): string[] {
  return [`${t} is ${t / 10} tens, so this is ${b} × ${t / 10} tens.`, `${b} × ${t / 10} = ${ans / 10}, and that many tens is ${ans}.`];
}
const genDivTens: Gen = (r) => {
  const b = int(r, 2, 9);
  const t = int(r, 2, 9) * 10;
  return coin(r)
    ? {
        display: `${b * t} ÷ ${b} = ___`,
        answer: t,
        mode: 'int',
        ops: [b * t, b],
        steps: [`Related fact: ${b} × ${t} = ${b * t}.`, `So ${b * t} ÷ ${b} = ${t}.`],
      }
    : {
        display: `${b * t} ÷ ${t} = ___`,
        answer: b,
        mode: 'int',
        ops: [b * t, t],
        steps: [`Ask: how many ${t}s make ${b * t}?`, `${b} × ${t} = ${b * t}, so the answer is ${b}.`],
      };
};
function genMissingFactor(min: number, max: number): Gen {
  return (r) => {
    const b = int(r, min, max);
    const q = int(r, min, max);
    return {
      display: `___ × ${b} = ${b * q}`,
      answer: q,
      mode: 'int',
      ops: [b, q],
      steps: [`Ask: ${b} times what makes ${b * q}?`, `That is exactly ${b * q} ÷ ${b} = ${q}.`],
    };
  };
}

const genShadedFraction: Gen = (r) => {
  const d = pick(r, [2, 3, 4, 6, 8]);
  const k = int(r, 1, d - 1);
  return {
    display: `What fraction of the bar is shaded?`,
    answer: k / d,
    answerLabel: `${k}/${d}`,
    mode: 'frac',
    ops: [k, d],
    figure: fractionBarFigure(k, d),
    steps: [
      `Count all the equal parts: the bar is cut into ${d}.`,
      `Count the shaded parts: ${k}.`,
      `Shaded parts on top, total on the bottom: ${k}/${d}. (Type it as ${k}/${d}.)`,
    ],
  };
};

const genAreaRect: Gen = (r) => {
  const l = int(r, 3, 12);
  const w = int(r, 2, 9);
  return {
    display: `What is the area of this rectangle?`,
    answer: l * w,
    mode: 'int',
    ops: [l, w],
    figure: rectFigure(l, w),
    steps: [`Area of a rectangle = length × width.`, `${l} × ${w} = ${l * w} square units.`],
  };
};
const genPerimRect: Gen = (r) => {
  const l = int(r, 3, 12);
  const w = int(r, 2, 9);
  return {
    display: `What is the perimeter of this rectangle?`,
    answer: 2 * (l + w),
    mode: 'int',
    ops: [l, w],
    figure: rectFigure(l, w),
    steps: [`Perimeter = the distance all the way around.`, `${l} + ${w} + ${l} + ${w} = ${2 * (l + w)} units.`],
  };
};

const genCoordPoint: Gen = (r) => {
  let x = 0;
  let y = 0;
  while (x === 0 && y === 0) {
    x = int(r, -4, 4);
    y = int(r, -4, 4);
  }
  const askX = coin(r);
  const asked = askX ? x : y;
  return {
    display: `What is the ${askX ? 'x' : 'y'}-coordinate of the marked point?`,
    answer: asked,
    mode: 'int',
    ops: [x, y],
    figure: coordFigure(x, y),
    steps: [
      `Start at the origin, (0, 0).`,
      askX
        ? `x comes first: move ${Math.abs(x)} ${x >= 0 ? 'right' : 'left'} — the x-coordinate is ${x}.`
        : `Then y: move ${Math.abs(y)} ${y >= 0 ? 'up' : 'down'} — the y-coordinate is ${y}.`,
    ],
  };
};

const genDecAdd: Gen = (r) => {
  const k = int(r, 1, 49);
  const m = int(r, 1, Math.min(49, 99 - k));
  return {
    display: `${fmt1(k / 10)} + ${fmt1(m / 10)} = ___`,
    answer: (k + m) / 10,
    mode: 'dec',
    ops: [k, m],
    steps: [`Think in tenths: ${k} tenths + ${m} tenths = ${k + m} tenths.`, `${k + m} tenths = ${fmt1((k + m) / 10)}.`],
  };
};
const genDecSub: Gen = (r) => {
  let k = int(r, 1, 99);
  let m = int(r, 1, 99);
  if (m > k) [k, m] = [m, k];
  if (m === k) m = k - 1;
  return {
    display: `${fmt1(k / 10)} − ${fmt1(m / 10)} = ___`,
    answer: (k - m) / 10,
    mode: 'dec',
    ops: [k, m],
    steps: [`Think in tenths: ${k} tenths − ${m} tenths = ${k - m} tenths.`, `${k - m} tenths = ${fmt1((k - m) / 10)}.`],
  };
};
const genDecMul: Gen = (r) => {
  const a = int(r, 1, 9);
  const b = int(r, 2, 9);
  const steps = [`Multiply the whole numbers: ${a} × ${b} = ${a * b}.`, `One factor was tenths, so the product is tenths: ${fmt1((a * b) / 10)}.`];
  return coin(r)
    ? { display: `${fmt1(a / 10)} × ${b} = ___`, answer: (a * b) / 10, mode: 'dec', ops: [a, b], steps }
    : { display: `${b} × ${fmt1(a / 10)} = ___`, answer: (a * b) / 10, mode: 'dec', ops: [b, a], steps };
};
const genDecMul2: Gen = (r) => {
  const a = int(r, 2, 9);
  const b = int(r, 2, 9);
  return {
    display: `${fmt1(a / 10)} × ${fmt1(b / 10)} = ___`,
    answer: (a * b) / 100,
    mode: 'dec',
    ops: [a, b],
    steps: [`Tenths × tenths gives hundredths: ${a} × ${b} = ${a * b}.`, `${a * b} hundredths = ${fmt2((a * b) / 100)}.`],
  };
};
const genDecDiv: Gen = (r) => {
  const b = int(r, 2, 9);
  const m = int(r, 1, Math.floor(99 / b));
  return {
    display: `${fmt1((b * m) / 10)} ÷ ${b} = ___`,
    answer: m / 10,
    mode: 'dec',
    ops: [b, m],
    steps: [`Tenths cut into ${b} equal shares.`, `${b} × ${fmt1(m / 10)} = ${fmt1((b * m) / 10)}, so the answer is ${fmt1(m / 10)}.`],
  };
};
function genFracOf(fracs: [number, number][]): Gen {
  return (r) => {
    const f = pick(r, fracs);
    const t = f[1] * int(r, 2, 12);
    return {
      display: `${fracGlyph(f)} of ${t} = ___`,
      answer: (f[0] * t) / f[1],
      mode: 'int',
      ops: [f[0], f[1], t],
      steps: [`Divide by the bottom: ${t} ÷ ${f[1]} = ${t / f[1]} (one part).`, `Multiply by the top: ${t / f[1]} × ${f[0]} = ${(f[0] * t) / f[1]}.`],
    };
  };
}
function genOrderOps(terms: 3 | 4 = 3): Gen {
  return (r) => {
    const a = int(r, 1, 20);
    const b = int(r, 2, 9);
    const c = int(r, 2, 9);
    if (terms === 3) {
      return {
        display: `${a} + ${b} × ${c} = ___`,
        answer: a + b * c,
        mode: 'int',
        ops: [a, b, c],
        steps: [`Multiply first: ${b} × ${c} = ${b * c}.`, `Then add: ${a} + ${b * c} = ${a + b * c}.`],
      };
    }
    const d = int(r, 1, 20);
    return {
      display: `${a} + ${b} × ${c} − ${d} = ___`,
      answer: a + b * c - d,
      mode: 'int',
      ops: [a, b, c, d],
      steps: [`Multiply first: ${b} × ${c} = ${b * c}.`, `Then left to right: ${a} + ${b * c} = ${a + b * c}.`, `${a + b * c} − ${d} = ${a + b * c - d}.`],
    };
  };
}
function genSquare(max: number): Gen {
  return (r) => {
    const k = int(r, 2, max);
    return {
      display: `${k}² = ___`,
      answer: k * k,
      mode: 'int',
      ops: [k],
      steps: [`${k}² means ${k} × ${k}.`, `${k} × ${k} = ${k * k}.`],
    };
  };
}
function genTwoByTwo(min: number, max: number): Gen {
  return (r) => {
    const a = int(r, min, max);
    const b = int(r, min, max);
    const tb = Math.floor(b / 10) * 10;
    const ob = b - tb;
    return {
      display: `${a} × ${b} = ___`,
      answer: a * b,
      mode: 'int',
      ops: [a, b],
      steps: [
        `Break apart ${b}: ${tb} + ${ob}.`,
        `${a} × ${tb} = ${a * tb} and ${a} × ${ob} = ${a * ob}.`,
        `Add the partial products: ${a * tb} + ${a * ob} = ${a * b}.`,
      ],
    };
  };
}
function percentSteps(p: number, base: number, ans: number): string[] {
  switch (p) {
    case 50: return [`50% is half.`, `Half of ${base} = ${ans}.`];
    case 25: return [`25% is half of a half.`, `Half of ${base} = ${base / 2}; half again = ${ans}.`];
    case 10: return [`10% = move the decimal one place left.`, `10% of ${base} = ${ans}.`];
    case 20: return [`Find 10% first: ${base / 10}.`, `20% is double that: ${ans}.`];
    case 5: return [`10% of ${base} = ${base / 10}.`, `5% is half of that: ${ans}.`];
    case 75: return [`50% = ${base / 2} and 25% = ${base / 4}.`, `${base / 2} + ${base / 4} = ${ans}.`];
    case 40: return [`10% of ${base} = ${base / 10}.`, `40% is four of those: ${ans}.`];
    default: return [`${p}% of ${base} = ${p}/100 × ${base}.`, `= ${ans}.`];
  }
}
function genPercentOf(pcts: number[]): Gen {
  return (r, tier) => {
    const p = pick(r, pcts);
    const step = 100 / gcd(p, 100);
    const cap = tier === 1 ? 80 : tier === 2 ? 200 : 600;
    const base = step * int(r, 1, Math.floor(cap / step));
    return { display: `${p}% of ${base} = ___`, answer: (p * base) / 100, mode: 'int', ops: [p, base], steps: percentSteps(p, base, (p * base) / 100) };
  };
}
const genPercentInverse: Gen = (r, tier) => {
  const p = pick(r, [10, 20, 25, 50, 75]);
  const step = 100 / gcd(p, 100);
  const base = step * int(r, 2, Math.floor((tier === 1 ? 40 : tier === 2 ? 100 : 200) / step));
  const part = (p * base) / 100;
  const frac = p / 100; // 0.1, 0.2, 0.25, 0.5, 0.75 — all clean decimals
  return {
    display: `${part} is ___% of ${base}`,
    answer: p,
    mode: 'int',
    ops: [part, base],
    steps: [`Turn it into a division: ${part} ÷ ${base}.`, `${part} ÷ ${base} = ${frac} → ${frac} × 100 = ${p}%.`],
  };
};
function genDiscount(pcts: number[]): Gen {
  return (r, tier) => {
    const p = pick(r, pcts);
    const keep = 100 - p;
    const step = 100 / gcd(keep, 100);
    const cap = tier === 1 ? 120 : tier === 2 ? 300 : 600;
    const price = step * int(r, 2, Math.floor(cap / step));
    const off = (price * p) / 100;
    return {
      display: `${p}% off $${price} — you pay $___`,
      answer: price - off,
      mode: 'int',
      ops: [p, price],
      steps: [`The discount: ${p}% of ${price} = ${off}.`, `Pay the rest: ${price} − ${off} = ${price - off}.`],
    };
  };
}
const genPercentChange: Gen = (r, tier) => {
  const p = pick(r, [10, 20, 25, 50]);
  const up = coin(r);
  const step = 100 / gcd(up ? p : 100, up ? 100 : p);
  const old = step * int(r, 2, Math.floor((tier === 1 ? 100 : tier === 2 ? 200 : 500) / step));
  const nw = up ? old + (old * p) / 100 : old - (old * p) / 100;
  const diff = Math.abs(nw - old);
  return {
    display: `${old} → ${nw}: ___% ${up ? 'increase' : 'decrease'}`,
    answer: p,
    mode: 'int',
    ops: [old, nw],
    steps: [
      `Change = ${diff} (${up ? 'up' : 'down'}).`,
      // the division itself yields the decimal (78 ÷ 390 = 0.2, not "20") —
      // show both hops so a calculator check matches the text
      `Percent = change ÷ original: ${diff} ÷ ${old} = ${Math.round((diff / old) * 100) / 100} → ${Math.round((diff / old) * 100) / 100} × 100 = ${p}%.`,
    ],
  };
};
function intASSteps(a: number, b: number, minus: boolean): string[] {
  const bb = minus ? -b : b;
  const lines: string[] = [];
  if (minus) lines.push(`Subtracting is adding the opposite: ${n(a)} ${minus ? '−' : '+'} ${n(b)} = ${n(a)} + ${n(bb)}.`);
  if (a >= 0 && bb >= 0) lines.push(`Both positive: just add, ${a} + ${bb} = ${a + bb}.`);
  else if (a < 0 && bb < 0) lines.push(`Both negative: add the distances and keep the minus: ${Math.abs(a)} + ${Math.abs(bb)} = ${Math.abs(a + bb)}, so ${n(a + bb)}.`);
  else {
    const big = Math.max(Math.abs(a), Math.abs(bb));
    const small = Math.min(Math.abs(a), Math.abs(bb));
    const winner = Math.abs(a) >= Math.abs(bb) ? a : bb;
    lines.push(`Different signs: subtract the smaller distance from the bigger: ${big} − ${small} = ${big - small}.`, `Keep the winner's sign (${n(winner)} is farther from 0): ${n(a + bb)}.`);
  }
  return lines;
}
function genIntAS(range: number): Gen {
  return (r, tier) => {
    const rr = Math.max(6, Math.round(range * (tier === 1 ? 0.5 : tier === 2 ? 1 : 1.5)));
    const a = int(r, -rr, rr);
    const b = int(r, -rr, rr);
    const minus = coin(r);
    return minus
      ? { display: `${n(a)} − ${n(b)} = ___`, answer: a - b, mode: 'int', ops: [a, b], steps: intASSteps(a, b, true) }
      : { display: `${n(a)} + ${n(b)} = ___`, answer: a + b, mode: 'int', ops: [a, b], steps: intASSteps(a, b, false) };
  };
}
const genIntMD: Gen = (r, tier) => {
  const hi = tier === 1 ? 9 : tier === 2 ? 12 : 16;
  const a = int(r, 2, hi);
  const b = int(r, 2, hi);
  const sa = coin(r) ? 1 : -1;
  const sb = coin(r) ? 1 : -1;
  const negatives = (sa < 0 ? 1 : 0) + (sb < 0 ? 1 : 0);
  const sign = negatives % 2 === 0 ? '' : '−';
  if (coin(r)) {
    return {
      display: `${n(sa * a)} × ${n(sb * b)} = ___`,
      answer: sa * a * sb * b,
      mode: 'int',
      ops: [sa * a, sb * b],
      steps: [
        `Sign first: ${negatives} negative factor${negatives === 1 ? '' : 's'} → ${negatives % 2 === 0 ? 'positive' : 'negative'}.`,
        `Distances: ${a} × ${b} = ${a * b}, so the answer is ${sign}${a * b}.`,
      ],
    };
  }
  const q = sa * int(r, 2, 12);
  const div = sb * b;
  return {
    display: `${n(q * div)} ÷ ${n(div)} = ___`,
    answer: q,
    mode: 'int',
    ops: [q * div, div],
    steps: [
      `Related fact: ${n(div)} × ${n(q)} = ${n(q * div)}.`,
      `Same sign rule as multiplication, so ${n(q * div)} ÷ ${n(div)} = ${n(q)}.`,
    ],
  };
};
const genExp: Gen = (r) => {
  const which = int(r, 0, 2);
  if (which === 0) {
    const k = int(r, 4, 15);
    return { display: `${k}² = ___`, answer: k * k, mode: 'int', ops: [k, 2], steps: [`${k}² = ${k} × ${k}.`, `${k} × ${k} = ${k * k}.`] };
  }
  if (which === 1) {
    const k = int(r, 2, 6);
    return { display: `${k}³ = ___`, answer: k ** 3, mode: 'int', ops: [k, 3], steps: [`${k}³ = ${k} × ${k} × ${k}.`, `= ${k * k} × ${k} = ${k ** 3}.`] };
  }
  const k = int(r, 2, 6);
  return {
    display: `10${sup(k)} = ___`,
    answer: 10 ** k,
    mode: 'int',
    ops: [10, k],
    steps: [`A power of ten is a 1 followed by zeros — one zero per exponent.`, `10${sup(k)} = 1 followed by ${k} zeros = ${10 ** k}.`],
  };
};
const genGcfLcm: Gen = (r) => {
  if (coin(r)) {
    const g = int(r, 2, 9);
    let m = int(r, 2, 9);
    let nn = int(r, 2, 9);
    for (let i = 0; i < 60 && (m === nn || gcd(m, nn) !== 1); i++) {
      m = int(r, 2, 9);
      nn = int(r, 2, 9);
    }
    return {
      display: `GCF(${g * m}, ${g * nn}) = ___`,
      answer: g,
      mode: 'int',
      ops: [g * m, g * nn],
      steps: [`GCF = the biggest number dividing both.`, `Both are ${g} × something, and the somethings (${m}, ${nn}) share nothing, so the GCF is ${g}.`],
    };
  }
  const a = int(r, 3, 12);
  let b = int(r, 3, 12);
  for (let i = 0; i < 60 && b === a; i++) b = int(r, 3, 12);
  return {
    display: `LCM(${a}, ${b}) = ___`,
    answer: lcm(a, b),
    mode: 'int',
    ops: [a, b],
    steps: [`List multiples of the bigger until one divides by the other too.`, `Multiples of ${Math.max(a, b)}: ${[1, 2, 3, 4, 5, 6].map((k) => Math.max(a, b) * k).join(', ')}… first one divisible by ${Math.min(a, b)} is ${lcm(a, b)}.`],
  };
};
function genSolveTwoStep(negatives = false): Gen {
  return (r, tier) => {
    const a = int(r, 2, tier === 1 ? 5 : tier === 2 ? 9 : 12);
    const x = negatives ? (coin(r) ? -1 : 1) * int(r, 2, tier === 3 ? 20 : 12) : int(r, 2, tier === 3 ? 20 : 12);
    const b = int(r, 1, tier === 3 ? 30 : 15);
    const minus = coin(r);
    const c = minus ? a * x - b : a * x + b;
    const after = minus ? c + b : c - b;
    return {
      display: `${a}x ${minus ? '−' : '+'} ${b} = ${n(c)}, x = ___`,
      answer: x,
      mode: 'int',
      ops: [a, b, c],
      steps: [
        `Undo the ${minus ? 'subtraction' : 'addition'} first: ${minus ? 'add' : 'subtract'} ${b} on both sides → ${a}x = ${n(after)}.`,
        `Undo the multiply: divide by ${a} → x = ${n(after)} ÷ ${a} = ${n(x)}.`,
      ],
    };
  };
}
const genProportion: Gen = (r) => {
  const k = int(r, 2, 9);
  const b = int(r, 2, 9);
  const x = int(r, 2, 12);
  const d = b * k;
  const a = x * k;
  // a/d and x/b are the SAME ratio (a = x·k, d = b·k), so the missing
  // numerator solves cleanly: blank = a × b ÷ d = x. Pairing a/b with
  // x/d instead would make the printed proportion false (a/b = xk/b ≠ x/d).
  return {
    display: `${a}/${d} = ___/${b}`,
    answer: x,
    mode: 'int',
    ops: [a, d, b],
    steps: [`Cross-multiply: ${a} × ${b} = ${d} × blank.`, `${a * b} = ${d} × blank → blank = ${a * b} ÷ ${d} = ${x}.`],
  };
};
const genEvalExpr: Gen = (r, tier) => {
  const a = int(r, 2, tier === 1 ? 6 : tier === 2 ? 9 : 12);
  const x = (coin(r) ? -1 : 1) * int(r, 1, tier === 3 ? 12 : 9);
  const b = int(r, 1, tier === 3 ? 30 : 15);
  const minus = coin(r);
  const prod = a * x;
  return {
    display: `x = ${n(x)}: ${a}x ${minus ? '−' : '+'} ${b} = ___`,
    answer: minus ? a * x - b : a * x + b,
    mode: 'int',
    ops: [a, x, b],
    steps: [`Substitute: ${a} × (${n(x)}) = ${n(prod)}.`, `${n(prod)} ${minus ? '−' : '+'} ${b} = ${n(minus ? prod - b : prod + b)}.`],
  };
};
const genUnitRate: Gen = (r) => {
  const rate = int(r, 3, 15);
  const cnt = int(r, 3, 9);
  const total = rate * cnt;
  const tmpl = pick(r, [
    [`${total} miles in ${cnt} hours = ___ miles per hour`, 'mph'],
    [`$${total} for ${cnt} tickets = ___ dollars per ticket`, 'ppt'],
    [`${total} pages in ${cnt} days = ___ pages per day`, 'ppd'],
  ] as const);
  return {
    display: tmpl[0],
    answer: rate,
    mode: 'int',
    ops: [total, cnt],
    steps: [`"Per" means divide: total ÷ units.`, `${total} ÷ ${cnt} = ${rate}.`],
  };
};
function genSqrt(max: number): Gen {
  return (r, tier) => {
    const k = int(r, 2, Math.max(4, Math.round(max * (tier === 1 ? 0.6 : tier === 2 ? 0.85 : 1))));
    return {
      display: `√${k * k} = ___`,
      answer: k,
      mode: 'int',
      ops: [k * k],
      steps: [`Ask: what times itself is ${k * k}?`, `${k} × ${k} = ${k * k}, so √${k * k} = ${k}.`],
    };
  };
}
const genCbrt: Gen = (r, tier) => {
  // tiers ladder upward (not nest) so the 10 questions can all differ:
  // tier1 {2..4}, tier2 {2..8}, tier3 {2..11} — 10 distinct cubes total
  const k = int(r, 2, tier === 1 ? 4 : tier === 2 ? 8 : 11);
  return {
    display: `∛${k ** 3} = ___`,
    answer: k,
    mode: 'int',
    ops: [k ** 3],
    steps: [`Ask: what times itself, times itself, is ${k ** 3}?`, `${k} × ${k} × ${k} = ${k ** 3}, so ∛${k ** 3} = ${k}.`],
  };
};
const genExpLaw: Gen = (r) => {
  const base = pick(r, [2, 3, 10]);
  let a = int(r, 2, base === 2 ? 6 : base === 3 ? 3 : 4);
  let b = int(r, 2, base === 2 ? 6 : base === 3 ? 3 : 4);
  const capExp = base === 2 ? 10 : base === 3 ? 5 : 8;
  for (let i = 0; i < 60 && a + b > capExp; i++) b = int(r, 2, base === 2 ? 6 : base === 3 ? 3 : 4);
  return {
    display: `${base}${sup(a)} × ${base}${sup(b)} = ___`,
    answer: base ** (a + b),
    mode: 'int',
    ops: [base, a, b],
    steps: [`Same base → keep the base, add the exponents: ${a} + ${b} = ${a + b}.`, `${base}${sup(a + b)} = ${base ** (a + b)}.`],
  };
};
const genSciNot: Gen = (r) => {
  const a = int(r, 2, 9);
  const c = int(r, 2, 9);
  const b = int(r, 1, 3);
  const d = int(r, 1, Math.min(3, 5 - b));
  return {
    display: `(${a} × 10${sup(b)}) × (${c} × 10${sup(d)}) = ___`,
    answer: a * c * 10 ** (b + d),
    mode: 'int',
    ops: [a, b, c, d],
    steps: [
      `Front numbers: ${a} × ${c} = ${a * c}.`,
      `Powers of ten: 10${sup(b)} × 10${sup(d)} = 10${sup(b + d)} (${b + d} zeros).`,
      `Write it out: ${a * c} × ${10 ** (b + d)} = ${a * c * 10 ** (b + d)}.`,
    ],
  };
};
const genSlope: Gen = (r) => {
  const m = (coin(r) ? -1 : 1) * int(r, 1, 4);
  const dx = int(r, 1, Math.min(5, Math.floor(8 / Math.abs(m))));
  const lo = m * dx < 0 ? -9 - m * dx : -9;
  const hi = m * dx > 0 ? 9 - m * dx : 9;
  const x1 = int(r, -6, 4);
  const y1 = int(r, lo, hi);
  const x2 = x1 + dx;
  const y2 = y1 + m * dx;
  return {
    display: `The line through (${n(x1)}, ${n(y1)}) and (${n(x2)}, ${n(y2)}) — slope = ___`,
    answer: m,
    mode: 'int',
    ops: [x1, y1, x2, y2],
    figure: slopeFigure(x1, y1, x2, y2),
    steps: [
      `Slope = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁).`,
      `Rise: ${y2} − ${y1} = ${y2 - y1}. Run: ${x2} − ${x1} = ${dx}.`,
      `${y2 - y1} ÷ ${dx} = ${m}.`,
    ],
  };
};
const genLinEval: Gen = (r) => {
  const m = (coin(r) ? -1 : 1) * int(r, 2, 9);
  const b = int(r, -15, 15);
  const x = int(r, -6, 6);
  const prod = m * x;
  return {
    display: `y = ${m === 1 ? '' : m === -1 ? '−' : n(m)}x${signedTerm(b, '')}, x = ${n(x)}: y = ___`,
    answer: m * x + b,
    mode: 'int',
    ops: [m, b, x],
    steps: [`Substitute: ${m === 1 ? '' : m === -1 ? '−' : n(m)} × ${n(x)} = ${n(prod)}.`, `Then ${n(prod)} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${n(prod + b)}.`],
  };
};
const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [9, 12, 15],
  [7, 24, 25],
  [20, 21, 29],
];
const genPythag: Gen = (r, tier) => {
  const [a, b, c] = pick(r, tier === 1 ? TRIPLES.slice(0, 3) : TRIPLES);
  return coin(r)
    ? {
        display: `Right triangle, legs ${a} and ${b}: hypotenuse = ___`,
        answer: c,
        mode: 'int',
        ops: [a, b],
        figure: triangleFigure(a, b, c, true),
        steps: [`a² + b² = c²: ${a}² + ${b}² = ${c * c}.`, `${a * a} + ${b * b} = ${c * c}, and √${c * c} = ${c}.`],
      }
    : {
        display: `Right triangle, leg ${a}, hypotenuse ${c}: other leg = ___`,
        answer: b,
        mode: 'int',
        ops: [a, c],
        figure: triangleFigure(a, b, c, false),
        steps: [`a² + b² = c² → b² = c² − a².`, `${c * c} − ${a * a} = ${b * b}, and √${b * b} = ${b}.`],
      };
};
/** π is exactly 3.14 in every circle prompt ("Use 3.14 for π"),
 *  answers rounded to 2 decimals so feedback never shows float noise. */
const PI = 3.14;
const r2 = (x: number): number => Math.round(x * 100) / 100;
const genCircleCirc: Gen = (r) => {
  if (coin(r)) {
    const d = int(r, 4, 12);
    const c = r2(PI * d);
    return {
      display: `Find the circumference of this circle. Use 3.14 for π.`,
      answer: c,
      mode: 'dec',
      ops: [d],
      figure: circleFigure(d / 2, true),
      steps: [`Circumference of a circle: C = π × d.`, `C = 3.14 × ${d} = ${c}.`],
    };
  }
  const rad = int(r, 2, 9);
  const c = r2(2 * PI * rad);
  return {
    display: `Find the circumference of this circle. Use 3.14 for π.`,
    answer: c,
    mode: 'dec',
    ops: [rad],
    figure: circleFigure(rad, false),
    steps: [`Circumference of a circle: C = 2 × π × r.`, `C = 2 × 3.14 × ${rad} = ${c}.`],
  };
};
const genCircleArea: Gen = (r) => {
  const withD = coin(r);
  const rad = int(r, 2, 9);
  const area = r2(PI * rad * rad);
  return {
    display: `Find the area of this circle. Use 3.14 for π.`,
    answer: area,
    mode: 'dec',
    ops: withD ? [rad * 2] : [rad],
    figure: circleFigure(rad, withD),
    steps: withD
      ? [`Area of a circle: A = π × r², and r is half of d: ${rad * 2} ÷ 2 = ${rad}.`, `A = 3.14 × ${rad}² = 3.14 × ${rad * rad} = ${area}.`]
      : [`Area of a circle: A = π × r².`, `A = 3.14 × ${rad}² = 3.14 × ${rad * rad} = ${area}.`],
  };
};
const genTriangleArea: Gen = (r) => {
  const b = int(r, 3, 7) * 2; // even base → whole-number areas
  const h = int(r, 3, 10);
  return {
    display: `What is the area of this triangle?`,
    answer: (b * h) / 2,
    mode: 'int',
    ops: [b, h],
    figure: triangleAreaFigure(b, h),
    steps: [`Area of a triangle = (base × height) ÷ 2.`, `A = (${b} × ${h}) ÷ 2 = ${b * h} ÷ 2 = ${(b * h) / 2}.`],
  };
};
const genTriAngles: Gen = (r) => {
  const a = int(r, 25, 80);
  const b = int(r, 25, 80);
  const third = 180 - a - b;
  return {
    display: `Two angles of this triangle are marked. Find the missing angle.`,
    answer: third,
    mode: 'int',
    ops: [a, b],
    figure: triAnglesFigure(a, b),
    steps: [`The three angles inside any triangle add up to 180°.`, `180 − ${a} − ${b} = ${third}, so the missing angle is ${third}°.`],
  };
};
const genSystems: Gen = (r, tier) => {
  const hi = tier === 1 ? 8 : tier === 2 ? 12 : 20;
  const x = int(r, 2, hi);
  const y = int(r, 2, hi);
  const askX = coin(r);
  return {
    display: `x + y = ${x + y} and x − y = ${x - y}: ${askX ? 'x' : 'y'} = ___`,
    answer: askX ? x : y,
    mode: 'int',
    ops: [x, y],
    steps: [
      `Add the two equations: y cancels — 2x = ${2 * x}.`,
      `x = ${2 * x} ÷ 2 = ${x}. Then y = ${x + y} − ${x} = ${y}.`,
    ],
  };
};
const genDistSolve: Gen = (r, tier) => {
  const a = int(r, 2, tier === 1 ? 3 : 5);
  const b = int(r, 2, tier === 3 ? 9 : 6);
  const x = int(r, 2, tier === 3 ? 14 : 9);
  const c = int(r, 1, tier === 3 ? 15 : 9);
  const d = a * (b * x - c);
  const afterDist = b * x - c;
  const afterAdd = b * x;
  return {
    display: `${a}(${b}x − ${c}) = ${n(d)}: x = ___`,
    answer: x,
    mode: 'int',
    ops: [a, b, c, d],
    steps: [
      `Distribute: ${a} × ${b}x = ${a * b}x and ${a} × ${c} = ${a * c}.`,
      `${a * b}x − ${a * c} = ${n(d)} → ${a * b}x = ${n(d + a * c)}.`,
      `x = ${n(d + a * c)} ÷ ${a * b} = ${x}.`,
    ],
  };
};
const genBothSides: Gen = (r) => {
  let a = int(r, 2, 9);
  let c = int(r, 2, 9);
  for (let i = 0; i < 60 && a === c; i++) c = int(r, 2, 9);
  const x = int(r, 2, 9);
  const b = int(r, 1, 12);
  const d = (a - c) * x + b;
  const moved = d - b;
  return {
    display: `${a}x + ${b} = ${c}x + ${n(d)}: x = ___`,
    answer: x,
    mode: 'int',
    ops: [a, b, c, d],
    steps: [
      `Move the x's to one side: ${a}x − ${c}x = ${n(d)} − ${b}.`,
      `${a - c}x = ${n(moved)}.`,
      `x = ${n(moved)} ÷ ${a - c} = ${x}.`,
    ],
  };
};
function genQuadRoots(): Gen {
  return (r) => {
    const bothPos = coin(r);
    const r1 = bothPos ? int(r, 1, 7) : int(r, -9, -1);
    const r2 = bothPos ? int(r, r1 + 1, 9) : int(r, 1, 9);
    const b = -(r1 + r2);
    const c = r1 * r2;
    const bTerm = b === 0 ? '' : ` ${b > 0 ? '+' : '−'} ${Math.abs(b)}x`;
    const cTerm = ` ${c > 0 ? '+' : '−'} ${Math.abs(c)}`;
    return {
      display: `x²${bTerm}${cTerm} = 0: larger root = ___`,
      answer: r2,
      mode: 'int',
      ops: [r1, r2],
      steps: [
        `Find two numbers that multiply to ${c} and add to ${n(b)}.`,
        `They are ${n(r1)} and ${n(r2)} — those are the roots.`,
        `The larger one is ${r2}.`,
      ],
    };
  };
}
const genXsq: Gen = (r) => {
  const k = int(r, 2, 15);
  return {
    display: `x² = ${k * k}: positive solution = ___`,
    answer: k,
    mode: 'int',
    ops: [k * k],
    steps: [`Undo the square with a square root.`, `√${k * k} = ${k}.`],
  };
};
const genAbsVal: Gen = (r) => {
  const a = int(r, 0, 12);
  const b = int(r, 1, 12);
  return {
    display: `|x − ${a}| = ${b}: larger solution = ___`,
    answer: a + b,
    mode: 'int',
    ops: [a, b],
    steps: [`Absolute value splits into two cases: x − ${a} = ${b} or x − ${a} = −${b}.`, `x = ${a + b} or x = ${a - b}.`, `The larger one is ${a + b}.`],
  };
};
const genFuncEval: Gen = (r) => {
  const a = int(r, 1, 3);
  const b = int(r, -9, 9);
  const c = int(r, -15, 15);
  const x = int(r, -5, 5);
  const sq = a * x * x;
  const lin = b * x;
  const bTerm = b === 0 ? '' : ` ${b > 0 ? '+' : '−'} ${Math.abs(b)}x`;
  const cTerm = c === 0 ? '' : ` ${c > 0 ? '+' : '−'} ${Math.abs(c)}`;
  // the step's sign must follow the PRODUCT b×x, not the coefficient b:
  // with b < 0 and x < 0 the product is positive ("16 + 16", not "16 − 16")
  const linStr = lin === 0 ? '' : `Then ${n(sq)} ${lin < 0 ? '−' : '+'} ${Math.abs(lin)} = ${n(sq + lin)}.`;
  return {
    display: `f(x) = ${a === 1 ? '' : a}x²${bTerm}${cTerm}, f(${n(x)}) = ___`,
    answer: a * x * x + b * x + c,
    mode: 'int',
    ops: [a, b, c, x],
    steps: [
      `Square first: (${n(x)})² = ${x * x}, times ${a} = ${n(sq)}.`,
      linStr,
      `Then ${n(sq + lin)} ${c < 0 ? '−' : '+'} ${Math.abs(c)} = ${n(sq + lin + c)}.`,
    ].filter(Boolean),
  };
};

function generatorFor(kind: LevelKind): Gen {
  switch (kind.t) {
    case 'add': return genAdd(kind.min, kind.max, kind.sumMax);
    case 'sub': return genSub(kind.min, kind.max);
    case 'mixedAS': return genMixedAS(kind.min, kind.max, kind.sumMax);
    case 'doubles': return genDoubles(kind.min, kind.max);
    case 'nearDoubles': return genNearDoubles(kind.min, kind.max);
    case 'missingAddend': return genMissingAddend(kind.sumMin, kind.sumMax, kind.total);
    case 'tenPlus': return genTenPlus;
    case 'threeAdd': return genThreeAdd(kind.min, kind.max, kind.sumMax);
    case 'tenMoreLess': return genTenMoreLess(kind.min, kind.max);
    case 'addAcross10': return genAddAcross10;
    case 'subAcross10': return genSubAcross10;
    case 'subAcrossTen': return genSubAcrossTen;
    case 'addTens': return genAddTens;
    case 'skipCount': return genSkipCount;
    case 'countDots': return genCountDots(kind.min, kind.max);
    case 'shapeSides': return genShapeSides;
    case 'clock': return genClock;
    case 'numberLine': return genNumberLine;
    case 'barGraph': return genBarGraph;
    case 'timesTable': return genTimesTable(kind.tables);
    case 'divFacts': return genDivFacts(kind.divisors, kind.qMin, kind.qMax);
    case 'mixedMD': return genMixedMD;
    case 'twoByOne': return genTwoByOne(kind.aMin, kind.aMax, kind.bMin, kind.bMax);
    case 'multTens': return genMultTens;
    case 'divTens': return genDivTens;
    case 'missingFactor': return genMissingFactor(kind.min, kind.max);
    case 'shadedFraction': return genShadedFraction;
    case 'areaRect': return genAreaRect;
    case 'perimRect': return genPerimRect;
    case 'coordPoint': return genCoordPoint;
    case 'decAdd': return genDecAdd;
    case 'decSub': return genDecSub;
    case 'decMul': return genDecMul;
    case 'decMul2': return genDecMul2;
    case 'decDiv': return genDecDiv;
    case 'fracOf': return genFracOf(kind.fracs);
    case 'orderOps': return genOrderOps(kind.terms);
    case 'square': return genSquare(kind.max);
    case 'twoByTwo': return genTwoByTwo(kind.min, kind.max);
    case 'percentOf': return genPercentOf(kind.pcts ?? [50, 10, 25]);
    case 'percentInverse': return genPercentInverse;
    case 'discount': return genDiscount(kind.pcts ?? [10, 20, 25, 50]);
    case 'percentChange': return genPercentChange;
    case 'intAS': return genIntAS(kind.range);
    case 'intMD': return genIntMD;
    case 'exp': return genExp;
    case 'gcflcm': return genGcfLcm;
    case 'solveTwoStep': return genSolveTwoStep(kind.negatives);
    case 'proportion': return genProportion;
    case 'evalExpr': return genEvalExpr;
    case 'unitRate': return genUnitRate;
    case 'sqrt': return genSqrt(kind.max);
    case 'cbrt': return genCbrt;
    case 'expLaw': return genExpLaw;
    case 'sciNot': return genSciNot;
    case 'slope': return genSlope;
    case 'linEval': return genLinEval;
    case 'pythag': return genPythag;
    case 'circleCirc': return genCircleCirc;
    case 'circleArea': return genCircleArea;
    case 'triangleArea': return genTriangleArea;
    case 'triAngles': return genTriAngles;
    case 'systems': return genSystems;
    case 'distSolve': return genDistSolve;
    case 'bothSides': return genBothSides;
    case 'quadRoots': return genQuadRoots();
    case 'xsq': return genXsq;
    case 'absVal': return genAbsVal;
    case 'funcEval': return genFuncEval;
  }
}

/** Draw one level's question set. Kinds rotate deterministically (with a
 *  seeded random start) so every kind in a multi-kind level shows up. */
export function generateLevelQuestions(
  trackId: string,
  levelIndex: number,
  seed: number,
  count = QUESTIONS_PER_LEVEL,
): QuizQuestion[] {
  const track = QUIZ_TRACKS.find((t) => t.id === trackId);
  if (!track) throw new Error(`unknown quiz track: ${trackId}`);
  const level = track.levels[levelIndex];
  if (!level) throw new Error(`unknown level ${levelIndex} in track ${trackId}`);

  const r = rng(seed);
  const gens = level.kinds.map(generatorFor);
  const start = Math.floor(r() * gens.length);
  const out: QuizQuestion[] = [];
  // difficulty ramps inside every level: the opening questions are gentle
  // (tier 1), the middle settles into the core workload (tier 2), and the
  // closing stretch pushes the level's ceiling (tier 3)
  for (let i = 0; i < count; i++) {
    const tier = (i / count < 0.3 ? 1 : i / count < 0.7 ? 2 : 3) as 1 | 2 | 3;
    const idx = (start + i) % gens.length;
    // small domains (sqrt squares, pythag triples) would repeat the same
    // question inside one level — redraw a few times on a duplicate
    let next = gens[idx]!(r, tier);
    let tries = 0;
    while (tries < 6 && out.some((o) => o.display === next.display && o.answer === next.answer)) { next = gens[idx]!(r, tier); tries++; }
    out.push({ kind: level.kinds[idx]!.t, ...next });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Adaptive difficulty, class sets, daily challenge (2026-11-07 batch) */
/* ------------------------------------------------------------------ */

/** FNV-1a — stable seed from a string (class-set codes, daily dates). */
export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/** Adaptive tier: two right in a row steps up, two wrong in a row steps
 *  down. A softer cousin of IXL's SmartScore — pressure without the
 *  late-score penalty that frustrates kids. */
export interface TierState {
  tier: 1 | 2 | 3;
  streak: number;
}
export function startTier(): TierState {
  return { tier: 1, streak: 0 };
}
export function tierAfter(s: TierState, correct: boolean): TierState {
  const streak = correct ? s.streak + 1 : s.streak - 1;
  if (streak >= 2 && s.tier < 3) return { tier: (s.tier + 1) as 2 | 3, streak: 0 };
  if (streak <= -2 && s.tier > 1) return { tier: (s.tier - 1) as 1 | 2, streak: 0 };
  // pinned at the ceiling (or floor) the streak means nothing — drop it,
  // or two wrongs after a hot streak would take four answers to bite
  if (s.tier === 3 && streak > 0) return { tier: s.tier, streak: 0 };
  if (s.tier === 1 && streak < 0) return { tier: s.tier, streak: 0 };
  return { tier: s.tier, streak };
}

export interface TierPools {
  t1: QuizQuestion[];
  t2: QuizQuestion[];
  t3: QuizQuestion[];
}

/** The adaptive run draws questions live, so a level is prepared as three
 *  tier pools (deduped across pools). Facts levels ignore the tier
 *  argument — their pools come out same-difficulty, which is fine. */
export function generateLevelPool(
  trackId: string,
  levelIndex: number,
  seed: number,
  perTier = 4,
): TierPools {
  const track = QUIZ_TRACKS.find((t) => t.id === trackId);
  if (!track) throw new Error(`unknown quiz track: ${trackId}`);
  const level = track.levels[levelIndex];
  if (!level) throw new Error(`unknown level ${levelIndex} in track ${trackId}`);

  const r = rng(seed);
  const gens = level.kinds.map(generatorFor);
  const seen: QuizQuestion[] = [];
  const pools: TierPools = { t1: [], t2: [], t3: [] };
  for (const tier of [1, 2, 3] as const) {
    for (let i = 0; i < perTier; i++) {
      const idx = Math.floor(r() * gens.length);
      let next = gens[idx]!(r, tier);
      let tries = 0;
      while (tries < 6 && seen.some((o) => o.display === next.display && o.answer === next.answer)) {
        next = gens[idx]!(r, tier);
        tries++;
      }
      seen.push(next);
      pools[`t${tier}` as 't1' | 't2' | 't3'].push({ kind: level.kinds[idx]!.t, ...next });
    }
  }
  return pools;
}

/** Take the next question at the wanted tier; when that pool runs dry,
 *  borrow from the nearest tier that still has one. Mutates the pools. */
export function pullTierQuestion(
  pools: TierPools,
  tier: 1 | 2 | 3,
): { q: QuizQuestion; from: 1 | 2 | 3 } | null {
  const order: (1 | 2 | 3)[] = [tier, ...([1, 2, 3].filter((t) => t !== tier) as (1 | 2 | 3)[])];
  for (const t of order) {
    const pool = pools[`t${t}` as 't1' | 't2' | 't3'];
    if (pool.length > 0) return { q: pool.shift()!, from: t };
  }
  return null;
}

/** The daily challenge: one question from each of the 10 tracks (easy →
 *  Algebra 1 by track order). Same date string, same set, for everyone. */
export function generateDailySet(dateStr: string): QuizQuestion[] {
  const h = hashStr(`daily:${dateStr}`);
  const out: QuizQuestion[] = [];
  QUIZ_TRACKS.forEach((t, i) => {
    const r = rng((h + i * 0x9e3779b9) >>> 0);
    const level = int(r, 0, t.levels.length - 1);
    const qs = generateLevelQuestions(t.id, level, (h + i * 7919) >>> 0);
    out.push(qs[int(r, 0, qs.length - 1)]);
  });
  return out;
}


/* ------------------------------------------------------------------ */
/* The 10 tracks × 10 levels                                           */
/* ------------------------------------------------------------------ */

const ALL_TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DIVISORS_ALL = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DIVISORS_BIG = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const UNIT_FRACS: [number, number][] = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]];
const OTHER_FRACS: [number, number][] = [[2, 3], [3, 4], [2, 5], [3, 5], [3, 8]];

export const QUIZ_TRACKS: TrackSpec[] = [
  {
    id: 'k',
    label: 'Kindergarten',
    ages: 'ages 5–6',
    group: 'Elementary',
    blurb: 'Counting, shapes and facts inside 10',
    levels: [
      { title: 'Count the dots', focus: 'how many?', kinds: [{ t: 'countDots', min: 2, max: 10 }] },
      { title: 'Adding to 5', focus: 'a + b up to 5', kinds: [{ t: 'add', min: 0, max: 5, sumMax: 5 }] },
      { title: 'Adding to 10', focus: 'a + b up to 10', kinds: [{ t: 'add', min: 0, max: 10, sumMax: 10 }] },
      { title: 'Taking away within 10', focus: 'subtraction to 10', kinds: [{ t: 'sub', min: 0, max: 10 }] },
      { title: 'Add & take away to 10', focus: 'mixed + and −', kinds: [{ t: 'mixedAS', min: 0, max: 10, sumMax: 10 }] },
      { title: 'Doubles to 10', focus: '3 + 3, 4 + 4…', kinds: [{ t: 'doubles', min: 1, max: 5 }] },
      { title: 'Make 10', focus: '7 + ___ = 10', kinds: [{ t: 'missingAddend', sumMin: 6, sumMax: 10, total: 10 }] },
      { title: 'Teen numbers', focus: '10 + 4 = 14', kinds: [{ t: 'tenPlus' }] },
      { title: 'Shapes & sides', focus: 'triangles to hexagons', kinds: [{ t: 'shapeSides' }] },
      {
        title: 'Kindergarten review',
        focus: 'everything above',
        kinds: [
          { t: 'add', min: 0, max: 10, sumMax: 10 },
          { t: 'sub', min: 0, max: 10 },
          { t: 'doubles', min: 1, max: 5 },
          { t: 'missingAddend', sumMin: 6, sumMax: 10, total: 10 },
        ],
      },
    ],
  },
  {
    id: 'g1',
    label: '1st Grade',
    ages: 'ages 6–7',
    group: 'Elementary',
    blurb: 'Facts inside 20, and reading the clock',
    levels: [
      { title: 'Add within 20', focus: 'single-digit sums', kinds: [{ t: 'add', min: 1, max: 10 }] },
      { title: 'Subtract within 20', focus: 'facts and teens', kinds: [{ t: 'sub', min: 1, max: 20 }] },
      { title: 'Missing addends to 20', focus: '8 + ___ = 15', kinds: [{ t: 'missingAddend', sumMin: 6, sumMax: 20 }] },
      { title: 'Doubles & near doubles', focus: '6 + 7 = double 6 + 1', kinds: [{ t: 'doubles', min: 6, max: 10 }, { t: 'nearDoubles', min: 4, max: 9 }] },
      { title: 'Three addends to 20', focus: '2 + 5 + 6', kinds: [{ t: 'threeAdd', min: 1, max: 6, sumMax: 20 }] },
      { title: 'Add across 10', focus: '8 + 5 (regroup)', kinds: [{ t: 'addAcross10' }] },
      { title: 'Subtract across 10', focus: '13 − 5 (regroup)', kinds: [{ t: 'subAcross10' }] },
      { title: 'Ten more, ten less', focus: '34 ± 10', kinds: [{ t: 'tenMoreLess', min: 6, max: 89 }] },
      { title: 'Telling time', focus: 'o’clock and half past', kinds: [{ t: 'clock' }] },
      {
        title: '1st grade review',
        focus: 'everything above',
        kinds: [
          { t: 'add', min: 1, max: 10 },
          { t: 'sub', min: 1, max: 20 },
          { t: 'missingAddend', sumMin: 6, sumMax: 20 },
          { t: 'addAcross10' },
          { t: 'clock' },
        ],
      },
    ],
  },
  {
    id: 'g2',
    label: '2nd Grade',
    ages: 'ages 7–8',
    group: 'Elementary',
    blurb: 'Two-digit fluency, number lines and picture graphs',
    levels: [
      { title: 'Add within 100', focus: 'two-digit sums', kinds: [{ t: 'add', min: 5, max: 55, sumMax: 100 }] },
      { title: 'Subtract within 100', focus: 'two-digit take-aways', kinds: [{ t: 'sub', min: 5, max: 99 }] },
      { title: '2-digit + 1-digit', focus: '47 + 8', kinds: [{ t: 'twoByOne', aMin: 10, aMax: 89, bMin: 2, bMax: 9 }, { t: 'add', min: 2, max: 9 }] },
      { title: 'Missing numbers to 100', focus: '36 + ___ = 80', kinds: [{ t: 'missingAddend', sumMin: 20, sumMax: 100 }] },
      { title: 'Add & subtract within 100', focus: 'mixed two-digit', kinds: [{ t: 'mixedAS', min: 5, max: 99, sumMax: 100 }] },
      { title: 'Skip counting', focus: '5, 10, 15, 20, ___', kinds: [{ t: 'skipCount' }] },
      { title: 'Subtract across tens', focus: '62 − 7 (borrow)', kinds: [{ t: 'subAcrossTen' }] },
      { title: 'Number lines', focus: 'read the dot', kinds: [{ t: 'numberLine' }] },
      { title: 'Picture graphs', focus: 'read the bars', kinds: [{ t: 'barGraph' }] },
      {
        title: '2nd grade review',
        focus: 'everything above',
        kinds: [
          { t: 'add', min: 5, max: 55, sumMax: 100 },
          { t: 'sub', min: 5, max: 99 },
          { t: 'skipCount' },
          { t: 'subAcrossTen' },
          { t: 'numberLine' },
        ],
      },
    ],
  },
  {
    id: 'g3',
    label: '3rd Grade',
    ages: 'ages 8–9',
    group: 'Elementary',
    blurb: 'Times tables and division facts — in the order teachers teach them',
    levels: [
      { title: '2s and 5s', focus: 'the friendly rows', kinds: [{ t: 'timesTable', tables: [2, 5] }] },
      { title: '10s and 11s', focus: 'place-value shifts', kinds: [{ t: 'timesTable', tables: [10, 11] }] },
      { title: '3s', focus: 'skip-count rhythm', kinds: [{ t: 'timesTable', tables: [3] }] },
      { title: '4s and 9s', focus: 'double the 2s; the finger trick', kinds: [{ t: 'timesTable', tables: [4, 9] }] },
      { title: '6s and 7s', focus: 'the stubborn middle', kinds: [{ t: 'timesTable', tables: [6, 7] }] },
      { title: '8s and 12s', focus: 'the last rows', kinds: [{ t: 'timesTable', tables: [8, 12] }] },
      { title: 'All facts 1–12', focus: 'every table mixed', kinds: [{ t: 'timesTable', tables: ALL_TABLES }] },
      { title: 'Division facts', focus: '÷2 through ÷12', kinds: [{ t: 'divFacts', divisors: DIVISORS_ALL }] },
      { title: 'Shaded fractions', focus: 'what fraction is shaded?', kinds: [{ t: 'shadedFraction' }] },
      {
        title: 'Multiply & divide',
        focus: '× and ÷ mixed',
        kinds: [
          { t: 'timesTable', tables: ALL_TABLES },
          { t: 'divFacts', divisors: DIVISORS_ALL },
        ],
      },
    ],
  },
  {
    id: 'g4',
    label: '4th Grade',
    ages: 'ages 9–10',
    group: 'Elementary',
    blurb: 'Bigger factors, area and perimeter',
    levels: [
      { title: 'Fact fluency warm-up', focus: 'all facts 1–12', kinds: [{ t: 'timesTable', tables: ALL_TABLES }] },
      { title: 'Teens × 1-digit', focus: '14 × 6', kinds: [{ t: 'twoByOne', aMin: 11, aMax: 19, bMin: 2, bMax: 9 }] },
      { title: '2-digit × 1-digit', focus: '47 × 8', kinds: [{ t: 'twoByOne', aMin: 21, aMax: 99, bMin: 2, bMax: 9 }] },
      { title: 'Multiply by tens', focus: '30 × 7', kinds: [{ t: 'multTens' }] },
      { title: 'Missing factors', focus: '___ × 7 = 56', kinds: [{ t: 'missingFactor', min: 2, max: 12 }] },
      { title: 'Area of rectangles', focus: 'length × width', kinds: [{ t: 'areaRect' }] },
      { title: 'Perimeter of rectangles', focus: 'all the way around', kinds: [{ t: 'perimRect' }] },
      { title: 'Bigger division facts', focus: 'divisors 3–12', kinds: [{ t: 'divFacts', divisors: DIVISORS_BIG, qMin: 3, qMax: 12 }] },
      { title: 'Add & subtract within 1,000', focus: 'hundreds, mixed', kinds: [{ t: 'add', min: 45, max: 500, sumMax: 1000 }, { t: 'sub', min: 45, max: 999 }] },
      {
        title: '4th grade review',
        focus: 'everything above',
        kinds: [
          { t: 'twoByOne', aMin: 21, aMax: 99, bMin: 2, bMax: 9 },
          { t: 'multTens' },
          { t: 'divFacts', divisors: DIVISORS_BIG, qMin: 3, qMax: 12 },
          { t: 'areaRect' },
        ],
      },
    ],
  },
  {
    id: 'g5',
    label: '5th Grade',
    ages: 'ages 10–11',
    group: 'Elementary',
    blurb: 'Decimals, fractions of sets, the coordinate plane',
    levels: [
      { title: 'Decimal addition', focus: '0.7 + 0.5', kinds: [{ t: 'decAdd' }] },
      { title: 'Decimal subtraction', focus: '0.9 − 0.4', kinds: [{ t: 'decSub' }] },
      { title: 'Decimal × whole', focus: '0.6 × 8', kinds: [{ t: 'decMul' }] },
      { title: 'Decimal ÷ whole', focus: '4.8 ÷ 6', kinds: [{ t: 'decDiv' }] },
      { title: 'Unit fractions of numbers', focus: '⅓ of 27', kinds: [{ t: 'fracOf', fracs: UNIT_FRACS }] },
      { title: 'Other fractions of numbers', focus: '⅔ of 18', kinds: [{ t: 'fracOf', fracs: OTHER_FRACS }] },
      { title: 'Order of operations', focus: '7 + 8 × 6', kinds: [{ t: 'orderOps', terms: 3 }] },
      { title: 'Coordinate plane', focus: 'read the point', kinds: [{ t: 'coordPoint' }] },
      { title: '2-digit × 2-digit', focus: '23 × 14', kinds: [{ t: 'twoByTwo', min: 11, max: 29 }] },
      {
        title: '5th grade review',
        focus: 'everything above',
        kinds: [
          { t: 'decAdd' },
          { t: 'decMul' },
          { t: 'fracOf', fracs: [...UNIT_FRACS, ...OTHER_FRACS] },
          { t: 'orderOps', terms: 3 },
        ],
      },
    ],
  },
  {
    id: 'g6',
    label: '6th Grade',
    ages: 'ages 11–12',
    group: 'Middle school',
    blurb: 'Percents, negative numbers, exponents',
    levels: [
      { title: 'Percents of numbers', focus: '5% to 75%, both directions', kinds: [{ t: 'percentOf', pcts: [50, 10, 25, 20, 75, 5, 40] }, { t: 'percentInverse' }] },
      { title: 'Sale prices', focus: '25% off $60', kinds: [{ t: 'discount' }] },
      { title: 'Percent change', focus: 'up and down', kinds: [{ t: 'percentChange' }] },
      { title: 'Add & subtract negatives', focus: '−6 + 11', kinds: [{ t: 'intAS', range: 12 }] },
      { title: 'Multiply & divide negatives', focus: 'sign rules', kinds: [{ t: 'intMD' }] },
      { title: 'Exponents', focus: 'squares, cubes, 10ⁿ', kinds: [{ t: 'exp' }] },
      { title: 'Multiply decimals', focus: '0.7 × 0.4', kinds: [{ t: 'decMul2' }] },
      { title: 'Area of triangles', focus: 'base × height ÷ 2', kinds: [{ t: 'triangleArea' }] },
      { title: 'GCF & LCM', focus: 'common factors and multiples', kinds: [{ t: 'gcflcm' }] },
      {
        title: '6th grade review',
        focus: 'everything above',
        kinds: [
          { t: 'percentOf', pcts: [50, 25, 20, 10, 75, 5, 40] },
          { t: 'percentInverse' },
          { t: 'intAS', range: 12 },
          { t: 'intMD' },
          { t: 'exp' },
        ],
      },
    ],
  },
  {
    id: 'g7',
    label: '7th Grade',
    ages: 'ages 12–13',
    group: 'Middle school',
    blurb: 'Integers, proportions, first equations',
    levels: [
      { title: 'All operations with negatives', focus: 'add, subtract, multiply, divide', kinds: [{ t: 'intAS', range: 25 }, { t: 'intMD' }] },
      { title: 'Two-step equations', focus: '2x + 5 = 19', kinds: [{ t: 'solveTwoStep' }] },
      { title: 'Equations with negatives', focus: 'solutions below zero', kinds: [{ t: 'solveTwoStep', negatives: true }] },
      { title: 'Proportions', focus: '12/4 = ___/10', kinds: [{ t: 'proportion' }] },
      { title: 'Percent off', focus: 'harder discounts', kinds: [{ t: 'discount', pcts: [15, 30, 60] }] },
      { title: 'Percent up & down', focus: 'markups and markdowns', kinds: [{ t: 'percentChange' }] },
      { title: 'Circles: circumference & area', focus: 'π ≈ 3.14', kinds: [{ t: 'circleCirc' }, { t: 'circleArea' }] },
      { title: 'Evaluate expressions', focus: 'x = −3: 5x − 2', kinds: [{ t: 'evalExpr' }] },
      { title: 'Unit rates', focus: 'miles per hour', kinds: [{ t: 'unitRate' }] },
      {
        title: '7th grade review',
        focus: 'everything above',
        kinds: [
          { t: 'solveTwoStep', negatives: true },
          { t: 'proportion' },
          { t: 'evalExpr' },
          { t: 'intAS', range: 25 },
        ],
      },
    ],
  },
  {
    id: 'g8',
    label: '8th Grade',
    ages: 'ages 13–14',
    group: 'Middle school',
    blurb: 'Roots, exponent laws, slope, right triangles',
    levels: [
      { title: 'Square roots', focus: '√49', kinds: [{ t: 'sqrt', max: 15 }] },
      { title: 'Cube roots', focus: '∛125', kinds: [{ t: 'cbrt' }] },
      { title: 'Exponent laws', focus: '2³ × 2² = 2⁵', kinds: [{ t: 'expLaw' }] },
      { title: 'Scientific notation', focus: 'products of powers of ten', kinds: [{ t: 'sciNot' }] },
      { title: 'Slope from two points', focus: 'rise over run (plotted)', kinds: [{ t: 'slope' }] },
      { title: 'Triangle angle sum', focus: 'angles add to 180°', kinds: [{ t: 'triAngles' }] },
      { title: 'Multi-step equations', focus: '3(x + 2) − 4 = 17', kinds: [{ t: 'distSolve' }] },
      { title: 'Pythagorean theorem', focus: 'find the missing side', kinds: [{ t: 'pythag' }] },
      { title: 'Systems of equations', focus: 'x + y, x − y', kinds: [{ t: 'systems' }] },
      {
        title: '8th grade review',
        focus: 'everything above',
        kinds: [
          { t: 'sqrt', max: 15 },
          { t: 'slope' },
          { t: 'pythag' },
          { t: 'distSolve' },
        ],
      },
    ],
  },
  {
    id: 'alg1',
    label: 'Algebra 1',
    ages: 'grades 8–9',
    group: 'Algebra 1',
    blurb: 'Where symbols become routine',
    levels: [
      { title: 'Variables both sides', focus: '5x + 2 = 3x + 10', kinds: [{ t: 'bothSides' }] },
      { title: 'Distribute, then solve', focus: '2(3x − 4) = 22', kinds: [{ t: 'distSolve' }] },
      { title: 'Proportion equations', focus: 'cross-multiply', kinds: [{ t: 'proportion' }] },
      { title: 'x² = k', focus: 'undo a square', kinds: [{ t: 'xsq' }] },
      { title: 'Factored form', focus: 'zeros of (x − a)(x − b)', kinds: [{ t: 'quadRoots' }] },
      { title: 'Quadratic trinomials', focus: 'x² − 7x + 12 = 0', kinds: [{ t: 'quadRoots' }] },
      { title: 'Absolute value equations', focus: '|x − 4| = 6', kinds: [{ t: 'absVal' }] },
      { title: 'Evaluate functions', focus: 'f(−2)', kinds: [{ t: 'funcEval' }] },
      { title: 'Slope & lines', focus: 'from points and equations', kinds: [{ t: 'slope' }, { t: 'linEval' }] },
      {
        title: 'Algebra 1 review',
        focus: 'everything above',
        kinds: [
          { t: 'bothSides' },
          { t: 'quadRoots' },
          { t: 'funcEval' },
          { t: 'absVal' },
        ],
      },
    ],
  },
];

export const QUIZ_LEVEL_COUNT = QUIZ_TRACKS.reduce((acc, t) => acc + t.levels.length, 0);

/** CCSS anchor per level, in track order (index-aligned to levels[]).
 *  Reviews span several standards, so they carry the strand (e.g. '6.RP.A').
 *  Integer operations are formally 7th-grade standards; the 6th-grade
 *  track teaches them as acceleration and keeps the honest code. */
const CCSS_CODES: Record<string, string[]> = {
  k: ['K.CC.B.4', 'K.OA.A.5', 'K.OA.A.1', 'K.OA.A.1', 'K.OA.A.2', 'K.OA.A.3', 'K.OA.A.4', 'K.NBT.A.1', 'K.G.B.4', 'K.OA.A'],
  g1: ['1.OA.C.6', '1.OA.C.6', '1.OA.D.8', '1.OA.C.6', '1.OA.B.2', '1.OA.C.6', '1.OA.C.6', '1.NBT.C.5', '1.MD.B.3', '1.OA.C'],
  g2: ['2.NBT.B.5', '2.NBT.B.5', '2.NBT.B.5', '2.NBT.B.5', '2.NBT.B.5', '2.NBT.A.2', '2.NBT.B.5', '2.MD.B.6', '2.MD.D.10', '2.NBT.B'],
  g3: ['3.OA.C.7', '3.OA.C.7', '3.OA.C.7', '3.OA.C.7', '3.OA.C.7', '3.OA.C.7', '3.OA.C.7', '3.OA.C.7', '3.NF.A.1', '3.OA.C'],
  g4: ['3.OA.C.7', '4.NBT.B.5', '4.NBT.B.5', '4.NBT.B.5', '4.NBT.B.6', '4.MD.A.3', '4.MD.A.3', '4.NBT.B.6', '4.NBT.B.4', '4.NBT.B'],
  g5: ['5.NBT.B.7', '5.NBT.B.7', '5.NBT.B.7', '5.NBT.B.7', '5.NF.B.7', '5.NF.B.4', '5.OA.A.1', '5.G.A.2', '5.NBT.B.5', '5.NBT.B'],
  g6: ['6.RP.A.3', '6.RP.A.3', '7.RP.A.3', '7.NS.A.1', '7.NS.A.2', '6.EE.A.1', '6.NS.B.3', '6.G.A.1', '6.NS.B.4', '6.RP.A'],
  g7: ['7.NS.A', '7.EE.B.4', '7.EE.B.4', '7.RP.A.2', '7.RP.A.3', '7.RP.A.3', '7.G.B.4', '6.EE.A.2', '7.RP.A.1', '7.RP.A'],
  g8: ['8.EE.A.2', '8.EE.A.2', '8.EE.A.1', '8.EE.A.3', '8.EE.B.6', '8.G.A.5', '8.EE.C.7', '8.G.B.7', '8.EE.C.8', '8.EE'],
  alg1: ['A-REI.B.3', 'A-REI.B.3', 'A-REI.B.3', 'A-REI.B.4', 'A-SSE.B.3', 'A-REI.B.4', 'A-CED.A.1', 'F-IF.A.2', 'F-IF.B.6', 'A-REI.B'],
};
for (const t of QUIZ_TRACKS) {
  const codes = CCSS_CODES[t.id];
  if (!codes || codes.length !== t.levels.length) {
    throw new Error(`CCSS_CODES out of sync with track ${t.id}`);
  }
  t.levels.forEach((l, i) => {
    l.ccss = codes[i];
  });
}

/* ------------------------------------------------------------------ */
/* Progress (device-local by design: localStorage, no accounts —       */
/* nothing ever leaves the browser)                                    */
/* ------------------------------------------------------------------ */

export interface LevelResult {
  stars: number;
  best: number;
}
export interface QuizProgress {
  v: 1;
  tracks: Record<string, Record<string, LevelResult>>;
  name?: string;
  lastTrack?: string;
}

export const QUIZ_STORAGE_KEY = 'cg-math-quiz-v1';

export function emptyProgress(): QuizProgress {
  return { v: 1, tracks: {} };
}

export function parseProgress(raw: string | null): QuizProgress | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as QuizProgress;
    if (typeof p !== 'object' || p === null || p.v !== 1 || typeof p.tracks !== 'object') return null;
    return p;
  } catch {
    return null;
  }
}

export function starsFor(correct: number): number {
  if (correct >= 10) return 3;
  if (correct >= 9) return 2;
  if (correct >= PASS_SCORE) return 1;
  return 0;
}

/** A level counts as passed only with at least one star — a stored
 *  zero-star record (hand-edited or corrupt JSON) must never unlock. */
function passedLevel(p: QuizProgress, trackId: string, levelIndex: number): boolean {
  return (p.tracks[trackId]?.[String(levelIndex)]?.stars ?? 0) > 0;
}

export function levelUnlocked(p: QuizProgress, trackId: string, levelIndex: number): boolean {
  if (levelIndex === 0) return true;
  return passedLevel(p, trackId, levelIndex - 1);
}

export function trackPassed(p: QuizProgress, trackId: string): boolean {
  const track = QUIZ_TRACKS.find((t) => t.id === trackId);
  if (!track) return false;
  return track.levels.every((_, i) => passedLevel(p, trackId, i));
}

export function trackStars(p: QuizProgress, trackId: string): number {
  const levels = p.tracks[trackId] ?? {};
  return Object.values(levels).reduce((acc, r) => acc + (r?.stars ?? 0), 0);
}

/* ------------------------------------------------------------------ */
/* Answer checking (mode-aware)                                        */
/* ------------------------------------------------------------------ */

/**
 * int/dec: numeric compare with decimal tolerance (0.5 vs .5 vs 0.50).
 * frac: accepts "a/b", unicode glyphs, or an equal decimal.
 * time: accepts "h:mm" (colon optional) compared as minutes since midnight.
 */
export function isCorrect(q: QuizQuestion, input: string): boolean {
  const t = input.trim().replace('−', '-');
  if (!t) return false;
  if (q.mode === 'time') {
    const m = t.match(/^(\d{1,2}):?(\d{2})$/);
    if (!m) return false;
    return Number(m[1]) * 60 + Number(m[2]) === q.answer;
  }
  if (q.mode === 'frac') {
    const f = t.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (f && Number(f[2]) !== 0) {
      return Math.abs(Number(f[1]) / Number(f[2]) - q.answer) < 1e-9;
    }
    if (t in GLYPH_VALUE) return Math.abs(GLYPH_VALUE[t]! - q.answer) < 1e-9;
    const v = Number(t);
    return Number.isFinite(v) && Math.abs(v - q.answer) < 1e-9;
  }
  const v = Number(t);
  return Number.isFinite(v) && Math.abs(v - q.answer) < 1e-6;
}

/* ------------------------------------------------------------------ */
/* Radical typesetting (display layer)                                 */
/* ------------------------------------------------------------------ */

/**
 * √ (U+221A) and ∛ (U+221B) are the radical sign only — the horizontal
 * bar over the radicand (the vinculum) is not part of the character and
 * has to be drawn. This wraps a radical plus its numeric radicand in
 * spans so CSS can render that bar:
 *   √144 → <span class="mq-rad">√<span class="mq-radicand">144</span></span>
 * The input MUST already be HTML-escaped; the radicand pattern accepts
 * digits (with an optional decimal part) only, so the wrapped content
 * can never be injected markup.
 */
export function typesetRadicals(escaped: string): string {
  return escaped.replace(
    /([√∛])(\d+(?:\.\d+)?)/g,
    (_m, sign: string, digits: string) =>
      `<span class="mq-rad">${sign}<span class="mq-radicand">${digits}</span></span>`,
  );
}
