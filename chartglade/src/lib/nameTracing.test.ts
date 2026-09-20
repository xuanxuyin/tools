import { describe, expect, it } from 'vitest';
import { DEFAULT_NAME, MAX_NAME_CHARS, renderNameSheetHtml, repetitions, sanitizeName } from './nameTracing';

describe('sanitizeName', () => {
  it('trims, capitalizes, and keeps letters', () => {
    expect(sanitizeName('  emma ')).toBe('Emma');
    expect(sanitizeName('mary jane')).toBe('Mary jane');
  });

  it('strips digits and symbols but keeps apostrophes and hyphens', () => {
    expect(sanitizeName('em4ma!')).toBe('Emma');
    expect(sanitizeName("o'neil")).toBe("O'neil");
    expect(sanitizeName('ann-marie')).toBe('Ann-marie');
  });

  it('caps length at the worksheet maximum', () => {
    expect(sanitizeName('a'.repeat(30))).toHaveLength(MAX_NAME_CHARS);
  });

  it('empty and junk-only input yields an empty string', () => {
    expect(sanitizeName('')).toBe('');
    expect(sanitizeName('   123   ')).toBe('');
  });
});

describe('repetitions', () => {
  it('short names repeat 4 times per row', () => {
    expect(repetitions('Emma')).toBe(4);
    expect(repetitions('Liam')).toBe(4);
  });

  it('medium names repeat 3 times', () => {
    expect(repetitions('Madison')).toBe(3);
    expect(repetitions('Charlotte'.slice(0, 8))).toBe(3);
  });

  it('long names repeat twice', () => {
    expect(repetitions('Charlotte')).toBe(2);
    expect(repetitions('Alexandra')).toBe(2);
  });
});

describe('renderNameSheetHtml', () => {
  it('default sheet: model row, five trace rows, two blank rows', () => {
    const html = renderNameSheetHtml(DEFAULT_NAME, 'print');
    expect(html.match(/name-row model/g)).toHaveLength(1);
    expect(html.match(/name-row trace/g)).toHaveLength(5);
    expect(html.match(/name-row empty/g)).toHaveLength(2);
    expect(html).toContain('>Emma<');
  });

  it('repeats the name to fill the row width', () => {
    const html = renderNameSheetHtml('Emma', 'print');
    expect(html.match(/<span class="glyph">Emma<\/span>/g)).toHaveLength(6 * 4); // 6 rows × 4 reps
  });

  it('empty name renders guide-only rows (still a usable sheet)', () => {
    const html = renderNameSheetHtml('', 'print');
    expect(html).not.toContain('glyph');
    expect(html.match(/name-row empty/g)).toHaveLength(2);
  });

  it('escapes html in the name', () => {
    // sanitizer already strips < >, but defense in depth for the renderer
    const html = renderNameSheetHtml(sanitizeName("O'Brien <b>x</b>"), 'cursive');
    expect(html).not.toContain('<b>');
    expect(html).toContain('&#39;Brien');
  });
});
