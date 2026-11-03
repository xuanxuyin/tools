import { describe, expect, it } from 'vitest';
import {
  breakdownDecimal,
  DEFAULT_DECIMAL,
  DECIMAL_EXAMPLES,
  DECIMAL_PRESETS,
  renderDecimalBreakdownHtml,
  sanitizeDecimal,
} from './decimalBreakdown';
import { decimalPlaceColumns, placeValueColumns } from './mathCharts';

/**
 * Guards for the interactive decimal breakdown island: sanitize contract
 * (the island only ever renders engine-computed strings), arithmetic truth
 * (the expanded form must sum back to the number, every row's worth must
 * match digit × place), and the SSR-shell contract (default output is
 * seeded, complete markup — the page prints with JavaScript off).
 */
describe('sanitizeDecimal', () => {
  it('keeps digits and one point, strips everything else (commas paste-friendly)', () => {
    expect(sanitizeDecimal('3.156')).toBe('3.156');
    expect(sanitizeDecimal('4,302.6')).toBe('4302.6');
    expect(sanitizeDecimal('1.2.3')).toBe('1.23');
    expect(sanitizeDecimal('abc')).toBe(DEFAULT_DECIMAL);
  });

  it('normalizes leading zeros, bare points and overlong input to the chart span', () => {
    expect(sanitizeDecimal('0004.2')).toBe('4.2');
    expect(sanitizeDecimal('.5')).toBe('0.5');
    expect(sanitizeDecimal('1234567.8')).toBe('123456.8'); // 6 whole digits max
    expect(sanitizeDecimal('0.1234')).toBe('0.123'); // 3 decimal digits max
    expect(sanitizeDecimal('')).toBe(DEFAULT_DECIMAL);
  });
});

describe('breakdownDecimal', () => {
  it('names every digit, place and worth of the SSR default', () => {
    const b = breakdownDecimal(DEFAULT_DECIMAL); // 3.156
    expect(b.text).toBe('3.156');
    expect(b.rows.map((r) => r.place)).toEqual(['ones', 'tenths', 'hundredths', 'thousandths']);
    expect(b.rows.map((r) => r.digit)).toEqual([3, 1, 5, 6]);
    expect(b.rows.map((r) => r.valueLabel)).toEqual(['3', '0.1', '0.05', '0.006']);
    expect(b.expanded).toBe('3 + 0.1 + 0.05 + 0.006');
    expect(b.reading).toBe('three and one hundred fifty-six thousandths');
  });

  it('keeps typed placeholder zeros and trailing zeros on purpose', () => {
    const b = breakdownDecimal('12.05');
    expect(b.rows.map((r) => `${r.digit} ${r.place}`)).toEqual(['1 tens', '2 ones', '0 tenths', '5 hundredths']);
    expect(b.expanded).toBe('12 + 0.05');
    expect(b.reading).toBe('twelve and five hundredths');
    expect(breakdownDecimal('0.471').reading).toBe('four hundred seventy-one thousandths');
    expect(breakdownDecimal('8.209').expanded).toBe('8 + 0.2 + 0.009');
  });

  it('every row is arithmetically true and the expanded form sums back to the number', () => {
    for (const input of [DEFAULT_DECIMAL, ...DECIMAL_PRESETS, '0.000', '7', '0.1', '100.5']) {
      const b = breakdownDecimal(input);
      // worth labels match digit × place value for every row
      const wholeCols = placeValueColumns(Math.max(1, Math.floor(b.whole).toString().length));
      const decCols = decimalPlaceColumns(b.frac.length);
      b.rows.forEach((row) => {
        const col = [...wholeCols, ...decCols].find((c) => c.name === row.place)!;
        const worth = row.digit * 10 ** col.power;
        expect(Number(row.valueLabel), `${input} ${row.place}`).toBeCloseTo(worth, 6);
      });
      const sum = b.expanded.split(' + ').reduce((acc, term) => acc + Number(term), 0);
      expect(sum, `${input} expanded form sums back`).toBeCloseTo(
        b.whole + Number(b.frac || 0) / 10 ** b.frac.length,
        6,
      );
    }
  });
});

describe('renderDecimalBreakdownHtml (SSR shell contract)', () => {
  it('renders complete markup for the default, identical on every run (seeded content)', () => {
    const a = renderDecimalBreakdownHtml(DEFAULT_DECIMAL);
    const b = renderDecimalBreakdownHtml(DEFAULT_DECIMAL);
    expect(a).toBe(b);
    expect(a).toContain('class="sheet-title"');
    expect(a).toContain('Expanded form: <strong>3 + 0.1 + 0.05 + 0.006</strong>');
    expect(a).toContain('In words: <strong>three and one hundred fifty-six thousandths</strong>');
  });

  it('the worked examples are the presets the page advertises (copy and tool agree)', () => {
    expect([...DECIMAL_EXAMPLES]).toEqual(['0.471', '8.209', '12.05']);
    expect(DECIMAL_PRESETS).toContain('100.5');
  });
});
