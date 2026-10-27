/**
 * Chart engines — pure functions, vitest-tested. Every printable on the site
 * renders from these, the same way tintbrew's swatches render from color.ts.
 * Integers only; format for display with `formatUs` (commas, en-US).
 */

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = [
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];
const TENS = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/** 1234567 -> "1,234,567" */
export function formatUs(n: number): string {
  return n.toLocaleString('en-US');
}

/** A multiplication grid: row r (1..size) × column c (1..size). */
export function multTable(size: number): number[][] {
  const rows: number[][] = [];
  for (let r = 1; r <= size; r++) {
    const row: number[] = [];
    for (let c = 1; c <= size; c++) row.push(r * c);
    rows.push(row);
  }
  return rows;
}

/** An addition grid: row r (0..size) + column c (0..size). */
export function additionTable(size: number): number[][] {
  const rows: number[][] = [];
  for (let r = 0; r <= size; r++) {
    const row: number[] = [];
    for (let c = 0; c <= size; c++) row.push(r + c);
    rows.push(row);
  }
  return rows;
}

/** The classic hundred chart sequence, row-major: 1..100. */
export function hundredNumbers(upTo = 100): number[] {
  return Array.from({ length: upTo }, (_, i) => i + 1);
}

/** True when row === col on a multiplication grid (perfect squares). */
export function isDiagonal(r: number, c: number): boolean {
  return r === c;
}

export interface PlaceColumn {
  /** "hundred thousands" */
  name: string;
  /** 10^5 */
  power: number;
  /** 100000 (unformatted) */
  value: number;
  /** "1,000,000" style display */
  valueLabel: string;
  /** "millions" | "thousands" | "ones" — the comma group the place belongs to */
  period: string;
}

const PERIODS = ['ones', 'thousands', 'millions', 'billions'];

/** Place names for whole-number columns, ones first: index 0 = ones. */
const PLACE_NAMES = [
  'ones',
  'tens',
  'hundreds',
  'thousands',
  'ten thousands',
  'hundred thousands',
  'millions',
  'ten millions',
  'hundred millions',
  'billions',
  'ten billions',
  'hundred billions',
];

/** Decimal place names, tenths first: index 0 = tenths (10^-1). */
const DECIMAL_PLACE_NAMES = [
  'tenths',
  'hundredths',
  'thousandths',
  'ten thousandths',
  'hundred thousandths',
  'millionths',
];

/** Whole-number place columns from ones up (count columns, ones first). */
export function placeValueColumns(count: number): PlaceColumn[] {
  const cols: PlaceColumn[] = [];
  for (let i = 0; i < count && i < PLACE_NAMES.length; i++) {
    const power = i;
    const value = 10 ** power;
    cols.push({
      name: PLACE_NAMES[i],
      power,
      value,
      valueLabel: formatUs(value),
      period: PERIODS[Math.floor(i / 3)],
    });
  }
  return cols;
}

export interface DecimalPlaceColumn {
  name: string;
  /** negative power: tenths = -1 */
  power: number;
  /** "0.1" style display */
  valueLabel: string;
}

/** Decimal place columns, tenths first (count columns). */
export function decimalPlaceColumns(count: number): DecimalPlaceColumn[] {
  const cols: DecimalPlaceColumn[] = [];
  for (let i = 0; i < count && i < DECIMAL_PLACE_NAMES.length; i++) {
    cols.push({
      name: DECIMAL_PLACE_NAMES[i],
      power: -(i + 1),
      valueLabel: (10 ** -(i + 1)).toFixed(i + 1),
    });
  }
  return cols;
}

/**
 * The sentence the interactive fact line shows when a whole-number column is
 * picked: digit + place + value. Precomputed here so the island is a text swap.
 */
export function placeFact(digit: number, placeName: string, power: number): string {
  const worth = digit * 10 ** power;
  return `The ${digit} is in the ${placeName} place — it is worth ${formatUs(worth)}.`;
}

/** Digit of `n` at 10^power (0 when the digit is absent). */
export function digitAt(n: number, power: number): number {
  return Math.floor(n / 10 ** power) % 10;
}

/** Split a whole number into digits, ones first (right-aligned for the chart). */
export function digitsOf(n: number, length: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < length; i++) out.push(digitAt(n, i));
  return out;
}

/** English reading of 0-999 (the size of one period group): 914 -> "nine hundred fourteen". */
export function periodWords(n: number): string {
  if (n < 0 || n > 999) throw new Error('periodWords: 0-999 only');
  if (n < 100) return smallNumberWord(n);
  const h = Math.floor(n / 100);
  const r = n % 100;
  return r ? `${ONES[h]} hundred ${smallNumberWord(r)}` : `${ONES[h]} hundred`;
}

/** Period family -> the word you say after its digits: thousands -> "thousand". */
const PERIOD_SAID: Record<string, string> = {
  ones: '',
  thousands: 'thousand',
  millions: 'million',
  billions: 'billion',
};

export interface NumberPeriod {
  /** 'billions' | 'millions' | 'thousands' | 'ones' — same names as PlaceColumn.period */
  name: string;
  /** the 1-999 group inside that period */
  value: number;
}

/**
 * The comma groups of a whole number, highest period first:
 * numberPeriods(471930862505) -> billions 471, millions 930, thousands 862, ones 505.
 * Leading empty periods are dropped; the ones period always stays.
 */
export function numberPeriods(n: number): NumberPeriod[] {
  if (!Number.isInteger(n) || n < 0 || n > 999_999_999_999) {
    throw new Error('numberPeriods: whole numbers 0..999,999,999,999 only');
  }
  const out: NumberPeriod[] = [];
  let rest = n;
  for (const name of PERIODS) {
    out.push({ name, value: rest % 1000 });
    rest = Math.floor(rest / 1000);
  }
  while (out.length > 1 && out[out.length - 1].value === 0) out.pop();
  return out.reverse();
}

/** One period group read aloud: periodPhrase(930, 'millions') -> "nine hundred thirty million". */
export function periodPhrase(value: number, period: string): string {
  const said = PERIOD_SAID[period];
  if (said === undefined) throw new Error(`periodPhrase: unknown period "${period}"`);
  return said ? `${periodWords(value)} ${said}` : periodWords(value);
}

/** The full spoken sentence, comma by comma (matches how Americans read big numbers). */
export function readNumberWithPeriods(n: number): string {
  const parts = numberPeriods(n).filter((p) => p.value > 0);
  if (parts.length === 0) return 'zero';
  return parts.map((p) => periodPhrase(p.value, p.name)).join(', ');
}

/** Fraction strip rows: unit fractions 1/2..1/den (whole bar handled by caller). */
export function fractionDenominators(max: number): number[] {
  const out: number[] = [];
  for (let d = 2; d <= max; d++) out.push(d);
  return out;
}

/** English reading of 0-99 (used in number-line/word-fact copy). */
export function smallNumberWord(n: number): string {
  if (n < 0 || n > 99) throw new Error('smallNumberWord: 0-99 only');
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  const t = TENS[Math.floor(n / 10) - 2];
  const r = n % 10;
  return r ? `${t}-${ONES[r]}` : t;
}
