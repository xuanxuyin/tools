import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_NAME,
  MAX_NAME_CHARS,
  nameCells,
  renderNameSheetHtml,
  repetitions,
  sanitizeName,
} from './nameTracing';

describe('sanitizeName', () => {
  it('trims, capitalizes, and keeps letters', () => {
    expect(sanitizeName('  emma ')).toBe('Emma');
    expect(sanitizeName('mary jane')).toBe('Mary Jane');
  });

  it('capitalizes every name part — space- and hyphen-separated, not apostrophe', () => {
    expect(sanitizeName('mary jane smith')).toBe('Mary Jane Sm'); // 12-char cap
    expect(sanitizeName('smith-o\'neil')).toBe('Smith-O\'neil');
    expect(sanitizeName('ann-marie')).toBe('Ann-Marie');
    expect(sanitizeName("o'neil")).toBe("O'neil"); // apostrophe is not a word start
  });

  it('strips digits and symbols but keeps apostrophes and hyphens', () => {
    expect(sanitizeName('em4ma!')).toBe('Emma');
    expect(sanitizeName("o'neil")).toBe("O'neil");
  });

  it('drops stray leading/trailing hyphens and spaces', () => {
    expect(sanitizeName('-mary-')).toBe('Mary');
    expect(sanitizeName(' - emma - ')).toBe('Emma');
  });

  it('caps length at the worksheet maximum', () => {
    expect(sanitizeName('a'.repeat(30))).toHaveLength(MAX_NAME_CHARS);
  });

  it('empty and junk-only input yields an empty string', () => {
    expect(sanitizeName('')).toBe('');
    expect(sanitizeName('   123   ')).toBe('');
    expect(sanitizeName('!!!')).toBe('');
  });
});

describe('nameCells (one letter per cell)', () => {
  it('simple name: cap flag on the first letter only', () => {
    const cells = nameCells('Emma');
    expect(cells.map((c) => c.char).join('')).toBe('Emma');
    expect(cells[0].cap).toBe(true);
    expect(cells.slice(1).every((c) => !c.cap && !c.gap)).toBe(true);
  });

  it('space becomes a gap cell and capitalizes the next part', () => {
    const cells = nameCells('Mary Jane');
    expect(cells).toHaveLength(9);
    expect(cells[4]).toEqual({ char: ' ', cap: false, gap: true });
    expect(cells[5].cap).toBe(true);
    expect(cells[0].cap).toBe(true);
  });

  it('hyphen is a written character (not a gap) and starts a new part', () => {
    const cells = nameCells('Ann-Marie');
    expect(cells).toHaveLength(9);
    expect(cells.every((c) => !c.gap)).toBe(true);
    expect(cells[3].char).toBe('-');
    expect(cells[4].cap).toBe(true);
  });
});

describe('repetitions (letter cells keep the row print-sized)', () => {
  it('short names repeat more, long names once', () => {
    expect(repetitions('Jo')).toBe(6);
    expect(repetitions('Ava')).toBe(4);
    expect(repetitions('Emma')).toBe(3);
    expect(repetitions('Liam')).toBe(3);
    expect(repetitions('James')).toBe(2);
    expect(repetitions('Harper')).toBe(2);
    expect(repetitions('Madison')).toBe(1);
    expect(repetitions('Charlotte')).toBe(1);
  });

  it('empty name falls back to the guide-only column count', () => {
    expect(repetitions('')).toBe(4);
  });
});

describe('renderNameSheetHtml', () => {
  it('default sheet: model row, five trace rows, two blank rows, one letter per cell', () => {
    const html = renderNameSheetHtml(DEFAULT_NAME, 'trace');
    expect(html.match(/name-row model/g)).toHaveLength(1);
    expect(html.match(/name-row trace/g)).toHaveLength(5);
    expect(html.match(/name-row empty/g)).toHaveLength(2);
    expect(html).not.toContain('>Emma<'); // whole name never sits in one cell
    // Emma = 4 letters x 3 reps = 12 cells per row, 6 filled rows
    expect(html.match(/<span class="glyph">E<\/span>/g)).toHaveLength(6 * 3);
    expect(html.match(/<span class="glyph">m<\/span>/g)).toHaveLength(6 * 6);
  });

  it('every row carries an explicit column grid, blank rows included', () => {
    const html = renderNameSheetHtml('Emma', 'trace');
    expect(html.match(/grid-template-columns:repeat\(12,1fr\)/g)).toHaveLength(8);
  });

  it('first-and-last name: gap cells, per-part capitals, one repetition', () => {
    const html = renderNameSheetHtml(sanitizeName('mary jane'), 'trace');
    expect(html.match(/grid-template-columns:repeat\(9,1fr\)/g)).toHaveLength(8);
    // gap cell = guides only, no glyph to trace
    expect(html.match(/<div class="name-cell gap"><\/div>/g)).toHaveLength(6);
    expect(html.match(/<div class="name-cell cap">/g)).toHaveLength(6 * 2);
  });

  it('hollow style renders outline rows instead of trace rows', () => {
    const html = renderNameSheetHtml('Emma', 'hollow');
    expect(html.match(/name-row model/g)).toHaveLength(1);
    expect(html.match(/name-row hollow/g)).toHaveLength(5);
    expect(html).not.toContain('name-row trace');
  });

  it('wipe style fades row by row, darkest first', () => {
    const html = renderNameSheetHtml('Emma', 'wipe');
    for (let i = 1; i <= 5; i++) {
      expect(html.match(new RegExp(`name-row fade-${i}`, 'g'))).toHaveLength(1);
    }
    expect(html.indexOf('name-row fade-1')).toBeLessThan(html.indexOf('name-row fade-5'));
    expect(html).not.toContain('name-row trace');
  });

  it('empty name renders guide-only rows (still a usable sheet)', () => {
    const html = renderNameSheetHtml('', 'trace');
    expect(html).not.toContain('glyph');
    expect(html).not.toContain('name-row model');
    expect(html.match(/name-row empty/g)).toHaveLength(2);
    expect(html.match(/grid-template-columns:repeat\(4,1fr\)/g)).toHaveLength(2);
  });

  it('escapes html in the name', () => {
    // sanitizer already strips < >, but defense in depth for the renderer
    const html = renderNameSheetHtml(sanitizeName("O'Brien <b>x</b>"), 'trace');
    expect(html).not.toContain('<b>');
    // one cell per letter: the apostrophe is its own escaped glyph
    expect(html).toContain('<span class="glyph">&#39;</span>');
  });
});

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');

describe.skipIf(!existsSync(resolve(DIST, 'name-tracing', 'index.html')))(
  'name tracing page (real dist)',
  () => {
    it('H1 + island controls + complete SSR sheet with JS off', () => {
      const html = readFileSync(resolve(DIST, 'name-tracing', 'index.html'), 'utf8');
      expect(html).toContain('<h1>Name Tracing Generator</h1>');
      expect(html).toContain('id="name-input"');
      expect(html).toContain('id="name-style"');
      expect(html).toContain('id="name-trace"');
      expect(html.match(/name-row model/g)).toHaveLength(1);
      expect(html.match(/name-row trace/g)).toHaveLength(5);
      expect(html).toContain('<span class="glyph">E</span>');
    });

    it('JSON-LD trio + slashed canonical + indexable', () => {
      const html = readFileSync(resolve(DIST, 'name-tracing', 'index.html'), 'utf8');
      expect(html).toContain('"@type":"WebApplication"');
      expect(html).toContain('"@type":"BreadcrumbList"');
      expect(html).toContain('"@type":"FAQPage"');
      expect(html).toContain('rel="canonical" href="https://chartglade.com/name-tracing/"');
      expect(html).toContain('name="robots" content="max-image-preview:large"');
    });

    it('print CSS: row pagination guard + the three tracing styles', () => {
      const html = readFileSync(resolve(DIST, 'name-tracing', 'index.html'), 'utf8');
      expect(html).toMatch(/break-inside:\s?avoid/);
      expect(html).toContain('-webkit-text-stroke');
      expect(html).toContain('.name-row.hollow');
      expect(html).toContain('.name-row.fade-5');
    });

    it('internal links: footer entry + cursive hub and chart page link back', () => {
      const html = readFileSync(resolve(DIST, 'name-tracing', 'index.html'), 'utf8');
      expect(html).toContain('href="/name-tracing/"'); // footer on the page itself
      const cursiveChart = readFileSync(resolve(DIST, 'cursive-alphabet', 'index.html'), 'utf8');
      expect(cursiveChart).toContain('href="/name-tracing/"');
      const cursiveHub = readFileSync(resolve(DIST, 'cursive', 'index.html'), 'utf8');
      expect(cursiveHub).toContain('href="/name-tracing/"');
    });
  },
);
