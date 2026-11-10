/**
 * Coloring feature tests (2026-11-03). Three layers, same split as the
 * gallery suites:
 *  - the pure kernel (save encoding, unlock state machine, publish validation);
 *  - the built dist: hub grid, detail pages, line/thumb assets, image
 *    sitemap declarations — the crawlable surface, checked as shipped;
 *  - card markup: publish date on every card, escaping of user input,
 *    preview URL + base-thumb fallback.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

const dist = resolve(fileURLToPath(import.meta.url), '../../../dist');
import {
  encodeColors,
  decodeColors,
  checkUnlock,
  validateColoringPublish,
  todayUtc,
} from '../../functions/api/coloring/_kernel';
import { COLORING_PIECES } from '../data/coloring';

describe('coloring kernel', () => {
  it('encodeColors/decodeColors round-trips palette indices and holes', () => {
    const colors = [0, 35, null, 7, null];
    const enc = encodeColors(colors);
    expect(enc).toBe('0z.7.');
    expect(decodeColors(enc)).toEqual(colors);
  });

  it('checkUnlock gates on order, completion and the daily limit', () => {
    const state = { unlocked: 3, lastUnlockDate: null };
    expect(checkUnlock(state, { ord: 2, rings: 10 }, true).ok).toBe(false); // not-next
    expect(checkUnlock(state, { ord: 3, rings: 10 }, true).ok).toBe(true); // free today
    expect(checkUnlock(state, { ord: 3, rings: 10 }, false).reason).toBe('not-done');
    const today = { unlocked: 3, lastUnlockDate: todayUtc() };
    expect(checkUnlock(today, { ord: 3, rings: 10 }, true).reason).toBe('daily-limit');
    // ord 0 needs no predecessor even on day one
    expect(checkUnlock({ unlocked: 0, lastUnlockDate: null }, { ord: 0, rings: 1 }, false).ok).toBe(
      true,
    );
  });

  it('validateColoringPublish rejects wrong length, bad charset, oversize text', () => {
    expect(validateColoringPublish('A', '', '0123', 4)).toEqual({
      name: 'A',
      nick: '',
      colors: '0123',
    });
    expect(validateColoringPublish('A', '', '012', 4).error).toBe('bad-colors');
    expect(validateColoringPublish('A', '', '0123', 3).error).toBe('bad-colors');
    expect(validateColoringPublish('A', '', '01Z3', 4).error).toBe('bad-colors');
    expect(validateColoringPublish('', '', '0123', 4).error).toBe('bad-name');
    expect(validateColoringPublish('ok', 'x'.repeat(21), '0123', 4).error).toBe('bad-nick');
    expect(validateColoringPublish('x'.repeat(41), '', '0123', 4).error).toBe('bad-name');
  });
});

describe('coloring dist (shipped surface)', () => {
  it('catalog matches the shipped assets: 210 pieces, line + thumb webp on disk', () => {
    expect(COLORING_PIECES).toHaveLength(210);
    const slugs = new Set(COLORING_PIECES.map((p) => p.slug));
    expect(slugs.size).toBe(210);
    for (const p of COLORING_PIECES) {
      expect(existsSync(resolve(dist, `coloring/line/${p.slug}.webp`))).toBe(true);
      expect(existsSync(resolve(dist, `coloring/thumb/${p.slug}.webp`))).toBe(true);
      expect(p.regions).toBeGreaterThan(0);
      expect(p.w).toBeGreaterThan(0);
      expect(p.h).toBeGreaterThan(0);
    }
  });

  it('hub ships all 210 cards with thumbs, links and region counts', () => {
    const html = readFileSync(resolve(dist, 'coloring/index.html'), 'utf8');
    expect(html).toContain('data-coloring-hub');
    const cards = html.match(/data-col-card/g);
    expect(cards?.length).toBe(210);
    expect(html).toContain('/coloring/thumb/ag015-palette.webp');
    expect(html).toContain('/coloring/ag015-palette/');
    // no-JS fallback copy present
    expect(html).toContain('<noscript>');
    // JSON-LD ItemList ranks the catalog
    expect(html).toContain('"ItemList"');
    expect(html).toContain('"numberOfItems":210');
  });

  it('a detail page ships line art, island hooks and breadcrumb JSON-LD', () => {
    const html = readFileSync(resolve(dist, 'coloring/ag015-palette/index.html'), 'utf8');
    expect(html).toContain('/coloring/line/ag015-palette.webp');
    expect(html).toContain('data-coloring-paint');
    expect(html).toContain('data-col-canvas');
    expect(html).toContain('data-col-publish');
    expect(html).toContain('"BreadcrumbList"');
    expect(html).toContain('Paint Palette');
    // neighbors nav links both directions from the first page (next = lowest
    // region count after 15 → bee at 44)
    expect(html).toContain('href="/coloring/dk019-bee/"');
    expect(html).toContain('href="/coloring/"');
  });

  it('the coloring gallery page ships the island shell with SSR copy', () => {
    const html = readFileSync(resolve(dist, 'coloring/gallery/index.html'), 'utf8');
    expect(html).toContain('data-coloring-gallery');
    expect(html).toContain('data-col-gal-list');
    expect(html).toContain('data-col-gal-mine');
    expect(html).toContain('<noscript>');
  });

  it('image sitemap declares every coloring page thumb and detail line art', () => {
    const xml = readFileSync(resolve(dist, 'sitemap-images.xml'), 'utf8');
    expect((xml.match(/<image:image>/g) ?? []).length).toBeGreaterThanOrEqual(420);
    expect(xml).toContain('/coloring/line/ag015-palette.webp');
    expect(xml).toContain('/coloring/thumb/axolotl'.replace('axolotl', 'al008-axolotl') + '.webp');
    expect(xml).toContain('<loc>https://tintbrew.com/coloring/</loc>');
  });

  it('paint island renders fills in even-odd (same rule as the hit-test map)', () => {
    // 2026-11-10: the id map is even-odd; a nonzero canvas fill would paint
    // over holes/self-intersections the tap map excludes. Pin the shipped
    // island bundle to the matching fill rule.
    const html = readFileSync(resolve(dist, 'coloring/dk019-bee/index.html'), 'utf8');
    const srcs = [...html.matchAll(/<script[^>]*src="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]!);
    const paintChunk = srcs.find((s) => /_slug_/.test(s));
    expect(paintChunk).toBeTruthy();
    const js = readFileSync(resolve(dist, paintChunk!.replace(/^\//, '')), 'utf8');
    expect(js).toContain('"evenodd"');
    expect(js).toMatch(/\.fill\([^,)]+,\s*"?evenodd/);
  });
});

describe('coloring gallery cards', () => {
  beforeEach(() => {
    const window = new Window({ url: 'https://tintbrew.com/coloring/gallery/' });
    (globalThis as Record<string, unknown>).document = window.document;
    (globalThis as Record<string, unknown>).window = window;
    vi.resetModules();
  });

  it('cardHtml carries the publish date, preview URL and like button', async () => {
    const { cardHtml } = await import('./coloringCards');
    const piece = {
      id: 'c1test',
      slug: 'al008-axolotl',
      name: 'My Axolotl',
      nick: 'ColorFan',
      colors: '0102.',
      likes: 4,
      hidden: false,
      createdAt: Date.UTC(2026, 10, 3, 9, 0, 0),
      updatedAt: Date.UTC(2026, 10, 3, 9, 0, 0),
    };
    const html = cardHtml(piece, 2);
    expect(html).toContain('/api/coloring/preview?piece=c1test&v=');
    expect(html).toContain('data-col-like');
    expect(html).toContain('data-col-report');
    expect(html).toContain('href="/coloring/al008-axolotl/"');
    expect(html).toContain('Published'); // the publish date is user-visible copy
    expect(html).toContain('gal-rank-medal'); // rank 2
    expect(html).not.toContain('data-col-del'); // not mine — Report instead
  });

  it('escapes user input and flags republished artwork as updated', async () => {
    const { cardHtml } = await import('./coloringCards');
    const piece = {
      id: 'c2test',
      slug: 'ag015-palette',
      name: '<img src=x onerror=alert(1)>',
      nick: '<script>',
      colors: '0',
      likes: 0,
      hidden: false,
      createdAt: Date.UTC(2026, 10, 1),
      updatedAt: Date.UTC(2026, 10, 3),
    };
    const html = cardHtml(piece, null, { mine: true });
    expect(html).not.toContain('<img src=x');
    expect(html).not.toContain('<script>');
    expect(html).toContain('data-col-del');
    expect(html).toContain('updated'); // createdAt ≠ updatedAt → the date line notes it
  });
});

describe('coloring hub language switch', () => {
  beforeEach(() => {
    const win = new Window({ url: 'https://tintbrew.com/coloring/' });
    (globalThis as Record<string, unknown>).document = win.document;
    (globalThis as Record<string, unknown>).window = win;
    vi.resetModules();
  });

  it('repaints badges and the progress line when the visitor switches language', async () => {
    const win = (globalThis as { window: Window }).window;
    const doc = win.document;
    const root = doc.createElement('div');
    root.setAttribute('data-coloring-hub', '');
    root.setAttribute('data-total', '3');
    for (const [ord, slug] of [['0', 's0'], ['1', 's1'], ['2', 's2']] as const) {
      const card = doc.createElement('article');
      card.setAttribute('data-col-card', '');
      card.setAttribute('data-ord', ord);
      card.setAttribute('data-slug', slug);
      card.innerHTML =
        `<a class="col-link" href="/coloring/${slug}/">t</a>` +
        '<span data-col-badge hidden></span>' +
        '<button data-col-unlock hidden></button>';
      root.appendChild(card);
    }
    root.innerHTML +=
      '<div data-col-status hidden></div>' +
      '<section data-col-progress hidden><p class="col-progress-line">' +
      '<span data-col-progress-text></span>' +
      '<span class="col-progress-bar" aria-hidden="true"><span data-col-progress-fill></span></span>' +
      '</p></section>';
    doc.body.appendChild(root);

    (globalThis as Record<string, unknown>).fetch = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ unlocked: 1, lastUnlockDate: '2020-01-01', done: ['s0'] }),
    }));

    const { setLang } = await import('./i18n');
    await import('./coloringHub');

    const badges = doc.querySelectorAll<HTMLElement>('[data-col-badge]');
    // locked badge (ord 2 > unlocked 1) renders in the SSR default language
    await vi.waitFor(() => expect(badges[2].textContent).toBe('Locked'));
    const progressText = doc.querySelector('[data-col-progress-text]') as HTMLElement;
    expect(progressText.textContent).toContain('1 of 1');
    expect(badges[2].title).toContain('finish the page before this one');

    setLang('zh');
    expect(badges[2].textContent).toBe('未解锁');
    expect(badges[2].title).toContain('先完成前面一页');
    expect(progressText.textContent).toContain('已解锁 1 页');

    setLang('en');
    expect(badges[2].textContent).toBe('Locked');
    expect(progressText.textContent).toContain('1 of 1');
  });
});
