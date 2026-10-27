import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { teachingCalendarFaqs, teachingCalendarMonths } from './teachingCalendar';
import { placeValuePages } from './placeValue';
import { multiplicationPages } from './multiplication';
import { formulaSheetPages } from './formulaSheets';
import { sightWordPages } from './sightWordsContent';
import { cursivePages } from './cursive';
import { graphPaperPages } from './graphPaper';
import { loosePages } from './loose';
import { signInSheetPages } from './signInSheets';
import { nameTracingPage } from './nameTracing';
import { halloweenPages } from './halloween';
import { thanksgivingPages } from './thanksgiving';
import { statesPage } from './cursiveStates';

/**
 * Teaching Calendar hub guards (November pre-dev wave 1). The hub is the
 * static answer to the rolling "october/november/december printables"
 * cluster, so two promises are pinned: (1) the calendar follows the US
 * school calendar — August start, 100th Day Jan-Feb, Thanksgiving on the
 * fourth Thursday — never the calendar-year-at-a-glance defaults; (2) every
 * month link resolves to a page that already ships (the classweekly lesson:
 * an index page must never pre-announce pages that don't exist). Data-level
 * tests derive the allowed link set from the real PageDef modules; dist-level
 * tests re-check the built page against real dist output.
 */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

/** Single source of truth for linkable pages: the PageDef modules + hub dirs. */
const pageDefs = [
  ...placeValuePages,
  ...multiplicationPages,
  ...formulaSheetPages,
  ...sightWordPages,
  ...cursivePages,
  ...graphPaperPages,
  ...loosePages,
  ...signInSheetPages,
  nameTracingPage,
  ...halloweenPages,
  ...thanksgivingPages,
  statesPage,
];
const HUBS = ['charts', 'graph-paper', 'sight-words', 'cursive', 'halloween', 'thanksgiving-printables', 'sign-in-sheets'];

const allowedHref = (slug: string) => `/${slug}/`;
const ALLOWED = new Set<string>([
  ...pageDefs.map((p) => allowedHref(p.slug)),
  ...HUBS.map(allowedHref),
]);
/** slug → h1, so link labels can be pinned to the target page's real name. */
const H1_BY_HREF = new Map(pageDefs.map((p) => [allowedHref(p.slug), p.h1] as const));

describe('teaching calendar months', () => {
  it('covers all twelve months in calendar order', () => {
    expect(teachingCalendarMonths.map((m) => m.month)).toEqual([
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ]);
  });

  it('every month carries a dates line and a hand-written scene (2 paragraphs)', () => {
    for (const m of teachingCalendarMonths) {
      expect(m.dates.length, `${m.month} dates line`).toBeGreaterThanOrEqual(10);
      expect(m.scene.length, `${m.month} scene paragraphs`).toBe(2);
      for (const para of m.scene) {
        expect(para.length, `${m.month} scene paragraph too thin`).toBeGreaterThan(80);
      }
    }
  });

  it('every month links at least two already-shipping pages', () => {
    for (const m of teachingCalendarMonths) {
      expect(m.links.length, `${m.month} link count`).toBeGreaterThanOrEqual(2);
    }
  });

  it('link hrefs are unique within a month and point only at built pages', () => {
    for (const m of teachingCalendarMonths) {
      const hrefs = m.links.map((l) => l.href);
      expect(new Set(hrefs).size, `${m.month} duplicate links`).toBe(hrefs.length);
      for (const href of hrefs) {
        expect(ALLOWED.has(href), `${m.month} links ${href}, which is not a shipping page`).toBe(true);
      }
    }
  });

  it('link labels match the target page\'s real h1 (data-driven pages)', () => {
    for (const m of teachingCalendarMonths) {
      for (const l of m.links) {
        const h1 = H1_BY_HREF.get(l.href);
        if (h1) expect(l.label, `${m.month} label for ${l.href}`).toBe(h1);
      }
    }
  });

  it('every link note is a full sentence of when-in-the-month guidance', () => {
    for (const m of teachingCalendarMonths) {
      for (const l of m.links) {
        expect(l.note.length, `${m.month} → ${l.href} note`).toBeGreaterThan(25);
      }
    }
  });
});

describe('teaching calendar follows the US school calendar', () => {
  const monthByName = new Map(teachingCalendarMonths.map((m) => [m.month, m] as const));
  const text = (name: string) => {
    const m = monthByName.get(name)!;
    return [m.dates, ...m.scene].join(' ');
  };

  it('pins the anchor dates to each month', () => {
    expect(text('January')).toContain('MLK Day');
    expect(text('February')).toContain('100th Day');
    expect(text('March')).toContain('Read Across America');
    expect(text('April')).toContain('Earth Day');
    expect(text('May')).toContain('Teacher Appreciation Week');
    expect(text('September')).toContain('Grandparents Day');
    expect(text('October')).toContain('Fire Prevention Week');
    expect(text('November')).toContain('fourth Thursday');
    expect(text('November')).toContain('Veterans Day');
  });

  it('back to school lives in August, not September (US districts start mid-to-late August)', () => {
    const august = text('August');
    expect(august.toLowerCase()).toContain('back to school');
    expect(august).toContain('mid-to-late August');
    // September is routines month — it must not claim the first day of school
    expect(text('September')).not.toContain('first day of school');
  });

  it('the 100th Day of School sits in the January-February window', () => {
    expect(text('January')).toContain('100th day');
    expect(text('February')).toContain('100th');
  });

  it('October and November link their seasonal clusters (rolling-month entry points)', () => {
    const octoberHrefs = monthByName.get('October')!.links.map((l) => l.href);
    const novemberHrefs = monthByName.get('November')!.links.map((l) => l.href);
    expect(octoberHrefs).toContain('/halloween/');
    expect(novemberHrefs).toContain('/thanksgiving-printables/');
    expect(novemberHrefs).toContain('/i-am-thankful-for-worksheet/');
  });
});

describe('teaching calendar FAQ', () => {
  it('holds 4-7 real questions, each answered in depth', () => {
    expect(teachingCalendarFaqs.length).toBeGreaterThanOrEqual(4);
    expect(teachingCalendarFaqs.length).toBeLessThanOrEqual(7);
    for (const f of teachingCalendarFaqs) {
      expect(f.q.endsWith('?'), `question: ${f.q}`).toBe(true);
      expect(f.a.length, `answer to "${f.q}"`).toBeGreaterThan(80);
    }
  });

  it('opens with what a teaching calendar is and how to use it', () => {
    expect(teachingCalendarFaqs[0]!.q).toContain('What is a teaching calendar');
    expect(teachingCalendarFaqs.some((f) => /how do i use/i.test(f.q))).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/* Dist guards — run after `npm run build` (release order: build first) */
/* ------------------------------------------------------------------ */

const hubBuilt = existsSync(resolve(DIST, 'teaching-calendar', 'index.html'));

describe.skipIf(!hubBuilt)('teaching calendar dist guards (real dist)', () => {
  const raw = readFileSync(resolve(DIST, 'teaching-calendar', 'index.html'), 'utf8');

  it('lands in the sitemap and self-canonicalizes with a trailing slash', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    expect(xml).toContain('<loc>https://chartglade.com/teaching-calendar/</loc>');
    expect(raw).toContain('rel="canonical" href="https://chartglade.com/teaching-calendar/"');
  });

  it('prints as a year index: printable block, print button, all twelve months inside it', () => {
    expect(raw).toContain('class="printable"');
    expect(raw.match(/data-print/g)!.length).toBeGreaterThanOrEqual(1);
    expect(raw).toContain('Teaching Calendar — Printables by Month');
    // Anchor on markup attributes, not bare class names — CSS is inlined into
    // <head>, so 'cal-grid' first appears in a selector, not the grid itself.
    const grid = raw.slice(raw.indexOf('class="cal-grid"'), raw.indexOf('class="section cal-block"'));
    for (const m of teachingCalendarMonths) {
      expect(grid, `${m.month} in the printed grid`).toContain(`<h3>${m.month}</h3>`);
    }
  });

  it('every month section links its pages, and every internal link on the page is built', () => {
    for (const m of teachingCalendarMonths) {
      for (const l of m.links) {
        expect(raw, `${m.month} → ${l.href}`).toContain(`href="${l.href}"`);
      }
    }
    // Homepage-seasonal-slot pattern: internal hrefs must resolve in dist.
    const hrefs = [...raw.matchAll(/href="(\/[a-z0-9/-]*\/)"/g)].map((m) => m[1]!);
    expect(hrefs.length).toBeGreaterThan(30);
    for (const href of hrefs) {
      const page = resolve(DIST, ...href.slice(1).split('/'), 'index.html');
      expect(existsSync(page), `${href} must exist in dist`).toBe(true);
    }
  });

  it('ships FAQPage JSON-LD with every FAQ question', () => {
    expect(raw).toContain('"@type":"FAQPage"');
    for (const f of teachingCalendarFaqs) {
      expect(raw, `JSON-LD carries "${f.q}"`).toContain(JSON.stringify(f.q).slice(1, -1));
    }
  });
});
