/**
 * Interactive decimal breakdown — the island on the decimal place value chart
 * page (GSC 10/26: "place value chart with decimals interactive"). Same shape
 * as nameTracing/madMinute: pure functions shared by the SSR sheet (default
 * number fully rendered, printable with JavaScript off) and the live island
 * (type a decimal, the breakdown re-renders as text replacement only).
 *
 * Span mirrors the page chart: whole part up to hundred thousands, decimals
 * up to thousandths.
 */
import { decimalPlaceColumns, digitsOf, formatUs, periodWords, placeValueColumns, readNumberWithPeriods } from './mathCharts';

/** Default SSR number — seeded content, not randomness (prints with JS off). */
export const DEFAULT_DECIMAL = '3.156';
/** Worked examples on the static tenths/hundredths/thousandths reference table. */
export const DECIMAL_EXAMPLES = ['0.471', '8.209', '12.05'] as const;
/** Quick-pick buttons next to the input. */
export const DECIMAL_PRESETS = ['0.471', '8.209', '12.05', '100.5'] as const;
/** Whole digits (hundred thousands) + point + 3 decimal digits. */
export const DECIMAL_INPUT_MAX_LEN = 10;
const MAX_WHOLE_DIGITS = 6;
const MAX_FRAC_DIGITS = 3;

const DECIMAL_SAID_SINGULAR = ['tenth', 'hundredth', 'thousandth'];
const DECIMAL_SAID_PLURAL = ['tenths', 'hundredths', 'thousandths'];

/**
 * Digits, one decimal point, leading zeros of the whole part stripped,
 * lengths capped to the chart's span. Commas are stripped (paste-friendly),
 * a leading point becomes "0.". Anything empty falls back to the default.
 */
export function sanitizeDecimal(raw: string): string {
  let s = raw.replace(/[^0-9.]/g, '');
  const dot = s.indexOf('.');
  if (dot !== -1) s = s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, '');
  let [w = '', f = ''] = s.split('.');
  w = w.replace(/^0+(?=\d)/, '').slice(0, MAX_WHOLE_DIGITS);
  f = f.slice(0, MAX_FRAC_DIGITS);
  if (!w && !f) return DEFAULT_DECIMAL;
  if (!w) w = '0';
  return f ? `${w}.${f}` : w;
}

export interface BreakdownRow {
  digit: number;
  /** place name, e.g. 'tens' or 'hundredths' */
  place: string;
  /** computed worth, e.g. '0.05' (or '0' for placeholder zeros) */
  valueLabel: string;
}

export interface DecimalBreakdown {
  /** the sanitized input, e.g. '12.05' */
  text: string;
  whole: number;
  /** decimal digits as typed, e.g. '05' (trailing zeros kept on purpose) */
  frac: string;
  rows: BreakdownRow[];
  /** '12 + 0.05' — whole part stays whole, zero terms dropped */
  expanded: string;
  /** 'twelve and five hundredths' */
  reading: string;
}

function decimalWords(frac: string): string {
  const value = parseInt(frac, 10);
  const noun = value === 1 ? DECIMAL_SAID_SINGULAR[frac.length - 1] : DECIMAL_SAID_PLURAL[frac.length - 1];
  return `${periodWords(value)} ${noun}`;
}

/** Full digit-by-digit breakdown of any decimal the chart can hold. */
export function breakdownDecimal(raw: string): DecimalBreakdown {
  const text = sanitizeDecimal(raw);
  const [ws = '0', f = ''] = text.split('.');
  const whole = parseInt(ws, 10);

  const rows: BreakdownRow[] = [];
  const wholeCols = placeValueColumns(ws.length).reverse();
  const wholeDigits = digitsOf(whole, ws.length).reverse();
  wholeCols.forEach((c, i) => {
    const d = wholeDigits[i] ?? 0;
    rows.push({ digit: d, place: c.name, valueLabel: d === 0 ? '0' : formatUs(d * 10 ** c.power) });
  });

  const terms: string[] = whole > 0 ? [formatUs(whole)] : [];
  decimalPlaceColumns(f.length).forEach((c, i) => {
    const d = Number(f[i] ?? 0);
    rows.push({ digit: d, place: c.name, valueLabel: d === 0 ? '0' : (d * 10 ** c.power).toFixed(-c.power) });
    if (d > 0) terms.push((d * 10 ** c.power).toFixed(-c.power));
  });

  const expanded = terms.length ? terms.join(' + ') : '0';
  const reading = f ? (whole > 0 ? `${readNumberWithPeriods(whole)} and ${decimalWords(f)}` : decimalWords(f)) : readNumberWithPeriods(whole);

  return { text, whole, frac: f, rows, expanded, reading };
}

/** The island/SSR markup — one table + two summary lines, all computed. */
export function renderDecimalBreakdownHtml(raw: string): string {
  const b = breakdownDecimal(raw);
  const rows = b.rows
    .map((r) => `<tr><td>${r.digit}</td><td>${r.place}</td><td>${r.valueLabel}</td></tr>`)
    .join('');
  return (
    `<p class="sheet-title">${b.text} — every digit named</p>` +
    '<table class="chart-table db-table">' +
    '<thead><tr><th scope="col">Digit</th><th scope="col">Place</th><th scope="col">Worth</th></tr></thead>' +
    `<tbody>${rows}</tbody></table>` +
    `<p class="db-line">Expanded form: <strong>${b.expanded}</strong></p>` +
    `<p class="db-line">In words: <strong>${b.reading}</strong></p>`
  );
}
