import { describe, it, expect } from 'vitest';
import {
  GENERAL_FORTUNES,
  CHRISTMAS_FORTUNES,
  FORTUNE_LIBRARY,
  CLASSIC_CORNER_LABELS,
  CHRISTMAS_CORNER_LABELS,
  pickSheetFortunes,
  wrapFortuneLine,
  cootieCatcherPage,
  cootieCatcherFortunesPage,
  christmasCootieCatcherPage,
} from './cootie';

/** IP red line: the adapted corpus must shed its source identity entirely —
 *  no deity/temple names on the user-facing side (IP-template policy,
 *  2026-11-02 precedent). */
const BANNED_IDENTITY = [
  'guanyin', 'guan yin', 'guan yu', 'guandi', 'guan gong', 'wong tai sin',
  'buddha', 'bodhisattva', 'temple', 'oracle', 'immortal', 'deity', 'god',
];

/** Tone red line: tiers top out at "gentle warning" — no doom register. */
const BANNED_DOOM = [
  'unlucky', 'bad luck', 'misfortune', 'doom', 'gloom', 'curse',
  'terrible', 'awful', 'worst', 'never', 'danger',
];

const ALL_FORTUNES = [...GENERAL_FORTUNES, ...CHRISTMAS_FORTUNES];

describe('cootie fortune library', () => {
  it('has the claimed inventory (24 general + 12 christmas = 36)', () => {
    expect(GENERAL_FORTUNES).toHaveLength(24);
    expect(CHRISTMAS_FORTUNES).toHaveLength(12);
    expect(FORTUNE_LIBRARY.total).toBe(36);
    expect(ALL_FORTUNES).toHaveLength(FORTUNE_LIBRARY.total);
  });

  it('spreads the three tiers in both pools (blessing > nudge > gentle warning)', () => {
    for (const pool of [GENERAL_FORTUNES, CHRISTMAS_FORTUNES]) {
      const counts = Object.groupBy(pool, (f) => f.tier);
      expect(counts['blessing']!.length).toBeGreaterThan(0);
      expect(counts['nudge']!.length).toBeGreaterThan(0);
      expect(counts['gentle warning']!.length).toBeGreaterThan(0);
    }
  });

  it('keeps flap lines short enough to wrap into a corner quadrant', () => {
    for (const f of ALL_FORTUNES) {
      expect(f.line.length, f.line).toBeLessThanOrEqual(48);
      const rows = wrapFortuneLine(f.line, 22);
      expect(rows.length, f.line).toBeLessThanOrEqual(4);
      expect(f.meaning.length, f.line).toBeGreaterThan(0);
    }
  });

  it('carries no source identity and no doom wording (IP + tone red lines)', () => {
    const joined = ALL_FORTUNES.map((f) => `${f.line} ${f.meaning}`).join(' ').toLowerCase();
    for (const banned of BANNED_IDENTITY) {
      expect(joined).not.toContain(banned);
    }
    for (const banned of BANNED_DOOM) {
      expect(joined).not.toContain(banned);
    }
  });

  it('has no duplicate flap lines', () => {
    const lines = ALL_FORTUNES.map((f) => f.line);
    expect(new Set(lines).size).toBe(lines.length);
  });
});

describe('sheet picking + wrapping (pure functions)', () => {
  it('picks a deterministic, tier-pure rotation', () => {
    const a = pickSheetFortunes(GENERAL_FORTUNES, 'blessing', 4, 0);
    const b = pickSheetFortunes(GENERAL_FORTUNES, 'blessing', 4, 0);
    expect(a).toEqual(b);
    expect(a).toHaveLength(4);
    expect(a.every((f) => f.tier === 'blessing')).toBe(true);
    // different seed rotates the window
    const c = pickSheetFortunes(GENERAL_FORTUNES, 'blessing', 4, 3);
    expect(c).not.toEqual(a);
  });

  it('wraps without splitting words', () => {
    const rows = wrapFortuneLine('Your hard work is about to show.', 12);
    expect(rows.length).toBeGreaterThan(1);
    for (const row of rows) {
      expect(row.length).toBeLessThanOrEqual(12 + 10); // one long word may overflow its row
    }
    expect(rows.join(' ')).toBe('Your hard work is about to show.');
  });
});

describe('cootie page definitions', () => {
  const pages = [cootieCatcherPage, cootieCatcherFortunesPage, christmasCootieCatcherPage];

  it('ships three pages with unique slugs and valid hubs', () => {
    const slugs = pages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(3);
    expect(cootieCatcherPage.hub).toBe('cootie');
    expect(christmasCootieCatcherPage.hub).toBe('christmas');
  });

  it('keeps the anti-thin layer honest (intro, tips, faqs, related)', () => {
    for (const p of pages) {
      expect(p.intro.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(p.tips.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(p.faqs.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(p.related.every((r) => r.href.startsWith('/')), p.slug).toBe(true);
    }
  });

  it('folding pages carry HowTo steps; the reference page does not', () => {
    expect(cootieCatcherPage.howTo?.steps.length).toBe(8);
    expect(christmasCootieCatcherPage.howTo?.steps.length).toBe(8);
    expect(cootieCatcherFortunesPage.howTo).toBeUndefined();
  });

  it('page copy passes the same red lines as the library', () => {
    let joined = pages
      .flatMap((p) => [p.h1, p.lead, p.metaTitle, p.metaDescription, ...p.intro, ...p.faqs.map((f) => `${f.q} ${f.a}`)])
      .join(' ')
      .toLowerCase();
    for (const banned of BANNED_IDENTITY) {
      expect(joined).not.toContain(banned);
    }
    // Doom words ARE allowed in copy that disavows doom ("never spooky, never doom") —
    // the ban targets fortune register, so strip the disavowals before checking.
    joined = joined.replace(/never (a diagnosis|spooky|doom)/g, '');
    for (const banned of BANNED_DOOM) {
      expect(joined).not.toContain(banned);
    }
  });

  it('claims only counts the library can back', () => {
    expect(cootieCatcherFortunesPage.h1).toContain('36');
    expect(cootieCatcherFortunesPage.metaDescription).toContain('36');
  });
});

describe('corner labels', () => {
  it('are the game tokens (4 per sheet, distinct)', () => {
    expect(CLASSIC_CORNER_LABELS).toHaveLength(4);
    expect(CHRISTMAS_CORNER_LABELS).toHaveLength(4);
    expect(new Set(CLASSIC_CORNER_LABELS).size).toBe(4);
    expect(new Set(CHRISTMAS_CORNER_LABELS).size).toBe(4);
  });
});
