/**
 * Community gallery tests (UGC, 2026-11-02). Two layers:
 *  - the /gallery/ SSR shell from `astro build` (hero copy, loading state,
 *    FAQ, JSON-LD, ToolNav entry) — content survives without JS;
 *  - the gallery island running against that real markup with a stubbed
 *    API: ranking render, XSS-safe name/nick, own-piece zone (including
 *    the under-review state), the one-like-per-hour flow and Report.
 *  The home-page gallery block (top-9 big cards) gets the same treatment
 *  with its contract: ships hidden, only reveals when the API returns pieces.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';
import { MARD_COLORS } from '../lib/mardPalette';

const dist = resolve(fileURLToPath(import.meta.url), '../../../dist');
const readPage = (rel: string) => readFileSync(resolve(dist, rel), 'utf8');

interface Piece {
  id: string;
  name: string;
  nick: string;
  width: number;
  height: number;
  cells: (string | null)[];
  likes: number;
  hidden?: boolean;
}

function piece(id: string, name: string, nick: string, likes: number, hidden = false): Piece {
  return {
    id,
    name,
    nick,
    width: 8,
    height: 8,
    cells: Array.from({ length: 64 }, (_, i) => (i % 7 === 0 ? MARD_COLORS[i % MARD_COLORS.length]!.id : null)),
    likes,
    hidden,
  };
}

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status < 400,
    status,
    json: async () => body,
  } as Response;
}

type FetchMock = ReturnType<typeof vi.fn>;

async function loadPage(rel: string, fetchMock: FetchMock, confirmValue = true) {
  const window = new Window({ url: `https://tintbrew.com/${rel.replace(/index\.html$/, '')}` });
  const { document } = window;
  document.write(readPage(rel));
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  (globalThis as Record<string, unknown>).localStorage = window.localStorage;
  (window as unknown as { confirm: (s?: string) => boolean }).confirm = () => confirmValue;
  vi.stubGlobal('fetch', fetchMock);
  vi.resetModules();
  return { window, document: document as unknown as Document };
}

/** Drain the island's async load() — two microtask hops (fetch + json). */
const flush = () => new Promise((r) => setTimeout(r, 0));

describe('gallery SSR shell (dist/gallery/index.html)', () => {
  let fetchMock: FetchMock;
  beforeEach(() => {
    fetchMock = vi.fn();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('ships hero copy, the loading list, FAQ and JSON-LD without JS', async () => {
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    expect(doc.querySelector('.hero h1')?.textContent).toBe('Bead gallery');
    expect(doc.querySelector('[data-gallery-list] .gal-empty')?.textContent).toContain('Loading the gallery');
    expect(doc.querySelector('[data-gallery] noscript')).toBeTruthy();
    expect(doc.querySelectorAll('.faq details')).toHaveLength(5);
    // SeoHead emits one ld+json script per item
    const types = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) =>
      (Array.isArray(JSON.parse(s.textContent ?? '[]')) ? JSON.parse(s.textContent ?? '[]') : [JSON.parse(s.textContent ?? '{}')]).map(
        (o: { '@type': string }) => o['@type'],
      ),
    );
    expect(types).toContain('FAQPage');
    expect(types).toContain('WebApplication');
    expect(types).toContain('BreadcrumbList');
  });

  it('the footer link points at the gallery; the ToolNav pill lives on the home page', async () => {
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    expect(doc.querySelector('.site-footer a[href="/gallery/"]')).toBeTruthy();
    const home = await loadPage('index.html', fetchMock);
    expect(home.document.querySelector('.tool-nav a[href="/gallery/"]')).toBeTruthy();
  });
});

describe('gallery island (real markup + stubbed API)', () => {
  let fetchMock: FetchMock;
  beforeEach(() => {
    fetchMock = vi.fn((input: string | URL | Request) => {
      const url = String(input);
      if (url.includes('/api/gallery/list')) {
        return Promise.resolve(
          jsonResponse({
            pieces: [piece('top1', 'Rainbow Cat', 'Ada', 12), piece('top2', '<b>bold</b>', 'Grace', 3)],
            mine: null,
          }),
        );
      }
      return Promise.resolve(jsonResponse({ ok: true }));
    });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function boot() {
    const ctx = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    return ctx;
  }

  it('renders the ranking with rank badges and like counts', async () => {
    const { document: doc } = await boot();
    const cards = doc.querySelectorAll('[data-gallery-list] .gal-card');
    expect(cards).toHaveLength(2);
    // top-3 get medal SVGs (gold/silver/bronze), the rest keep the #N pill
    expect(cards[0]!.querySelector('.gal-rank-medal svg')).toBeTruthy();
    expect(cards[1]!.querySelector('.gal-rank-medal svg')).toBeTruthy();
    // info is a labeled spec sheet: NAME / ARTIST rows
    const labels = [...cards[0]!.querySelectorAll('.gal-label')].map((el) => el.textContent);
    expect(labels).toEqual(['Name', 'Artist']);
    expect(cards[0]!.querySelector('.gal-name')?.textContent).toBe('Rainbow Cat');
    // the Like button carries a real heart SVG, not a text glyph
    expect(cards[0]!.querySelector('.gal-like .gal-heart svg')).toBeTruthy();
    expect(cards[0]!.querySelector('[data-gal-likes]')?.textContent).toBe('12');
    expect(doc.querySelector('[data-gallery-list] .gal-empty')).toBeNull();
  });

  it('user text is escaped — a <b> name renders as text, not markup', async () => {
    const { document: doc } = await boot();
    const second = doc.querySelectorAll('[data-gallery-list] .gal-card')[1]!;
    expect(second.querySelector('.gal-name')?.textContent).toBe('<b>bold</b>');
    expect(second.querySelector('.gal-name')?.querySelector('b')).toBeNull();
  });

  it('an API failure degrades to the error note instead of a broken list', async () => {
    fetchMock.mockImplementation(() => Promise.reject(new Error('down')));
    const { document: doc } = await boot();
    expect(doc.querySelector('[data-gallery-list] .gal-empty')?.textContent).toContain("Couldn’t reach");
  });

  it('liking posts uuid+piece, bumps the count and spends the hour (all buttons disabled)', async () => {
    const { document: doc, window } = await boot();
    const like = doc.querySelector('[data-gal-like]') as HTMLButtonElement;
    like.click();
    await flush();

    const call = fetchMock.mock.calls.find(([u]) => String(u).includes('/api/gallery/like'));
    expect(call).toBeTruthy();
    const body = JSON.parse((call![1] as RequestInit).body as string);
    expect(body.pieceId).toBe('top1');
    expect(body.uuid).toMatch(/^[0-9a-f-]{36}$/);

    expect(like.querySelector('[data-gal-likes]')?.textContent).toBe('13');
    expect(window.localStorage.getItem('tb-gallery:voted-hour')).toBe(
      new Date().toISOString().slice(0, 13),
    );
    // the like lands with a celebration: filled heart + spark burst
    expect(like.classList.contains('is-liked')).toBe(true);
    expect(like.querySelectorAll('.gal-spark').length).toBeGreaterThanOrEqual(1);
    expect(window.localStorage.getItem('tb-gallery:liked-piece')).toBe('top1');
    const likes = doc.querySelectorAll('[data-gal-like]');
    expect(likes).toHaveLength(2);
    likes.forEach((b) => expect(b.getAttribute('aria-disabled')).toBe('true'));
  });

  it('a reload repaints the liked piece’s heart as filled', async () => {
    const { window, document: doc } = await loadPage('gallery/index.html', fetchMock);
    window.localStorage.setItem('tb-gallery:liked-piece', 'top2');
    await import('./gallery');
    await flush();
    const liked = doc.querySelectorAll('[data-gallery-list] .gal-card')[1]!.querySelector('.gal-like')!;
    expect(liked.classList.contains('is-liked')).toBe(true);
    const other = doc.querySelectorAll('[data-gallery-list] .gal-card')[0]!.querySelector('.gal-like')!;
    expect(other.classList.contains('is-liked')).toBe(false);
  });

  it('a 429 vote shows the one-per-hour note and still marks the hour spent', async () => {
    fetchMock.mockImplementation((input: string | URL | Request) => {
      if (String(input).includes('/api/gallery/like')) {
        return Promise.resolve(jsonResponse({ error: 'one-per-hour' }, 429));
      }
      return Promise.resolve(jsonResponse({ pieces: [piece('top1', 'Rainbow Cat', 'Ada', 12)], mine: null }));
    });
    const { document: doc } = await boot();
    const like = doc.querySelector('[data-gal-like]') as HTMLButtonElement;
    like.click();
    await flush();
    const status = doc.querySelector('[data-gallery-status]') as unknown as HTMLElement;
    expect(status?.textContent).toContain('one like per hour');
    expect(status?.hidden).toBe(false);
    expect(like.getAttribute('aria-disabled')).toBe('true');
  });

  it('report asks first, then posts and shows the thanks note', async () => {
    const { document: doc } = await boot();
    (doc.querySelector('[data-gal-report]') as HTMLButtonElement).click();
    await flush();
    const call = fetchMock.mock.calls.find(([u]) => String(u).includes('/api/gallery/report'));
    expect(JSON.parse((call![1] as RequestInit).body as string)).toEqual({ pieceId: 'top1' });
    expect(doc.querySelector('[data-gallery-status]')?.textContent).toContain('Reported — thanks');
  });

  it('a declined confirm never posts the report', async () => {
    const { document: doc } = await loadPage('gallery/index.html', fetchMock, false);
    await import('./gallery');
    await flush();
    (doc.querySelector('[data-gal-report]') as HTMLButtonElement).click();
    await flush();
    expect(fetchMock.mock.calls.filter(([u]) => String(u).includes('/api/gallery/report'))).toHaveLength(0);
  });
});

describe('my piece (mine zone)', () => {
  let fetchMock: FetchMock;
  beforeEach(() => {
    fetchMock = vi.fn();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('a hidden piece still shows for its author, flagged under review', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        jsonResponse({ pieces: [piece('top1', 'Rainbow Cat', 'Ada', 12)], mine: piece('mine1', 'Doom', 'Me', 0, true) }),
      ),
    );
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    const mine = doc.querySelector('[data-gallery-mine]')!;
    expect(mine.querySelector('.gal-card .gal-name')?.textContent).toBe('Doom');
    expect(mine.querySelector('.gal-underreview')?.textContent).toContain('Under review');
    expect(mine.querySelector('.gal-rank')).toBeNull(); // hidden → not ranked
  });

  it('a ranked own piece carries its real rank badge', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        jsonResponse({ pieces: [piece('top1', 'Rainbow Cat', 'Ada', 12), piece('mine1', 'Doom', 'Me', 5)], mine: piece('mine1', 'Doom', 'Me', 5) }),
      ),
    );
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    expect(doc.querySelector('[data-gallery-mine] .gal-rank-medal svg')).toBeTruthy();
  });

  it('liking one copy repaints every copy of the same piece', async () => {
    fetchMock.mockImplementation((input: string | URL | Request) => {
      if (String(input).includes('/api/gallery/list')) {
        return Promise.resolve(
          jsonResponse({
            pieces: [piece('top1', 'Rainbow Cat', 'Ada', 12), piece('mine1', 'Doom', 'Me', 5)],
            mine: piece('mine1', 'Doom', 'Me', 5),
          }),
        );
      }
      return Promise.resolve(jsonResponse({ ok: true }));
    });
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    // the piece lives in two DOM copies: the ranking card + the mine-zone card
    const copies = [...doc.querySelectorAll('[data-piece="mine1"] [data-gal-likes]')];
    expect(copies).toHaveLength(2);
    // like it from the mine-zone card
    (doc.querySelector('[data-gallery-mine] [data-gal-like]') as HTMLButtonElement).click();
    await flush();
    copies.forEach((el) => expect(el.textContent).toBe('6'));
  });

  it('every own piece gets a Delete (no Report), and the wallet panel gates Expand on 100 credits', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        jsonResponse({
          pieces: [piece('top1', 'Rainbow Cat', 'Ada', 12)],
          mine: [piece('m1', 'Alpha', 'Me', 40), piece('m2', 'Beta', 'Me', 3)],
          wallet: { credits: 120, slots: 2 },
        }),
      ),
    );
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    const mineCards = doc.querySelectorAll('[data-gallery-mine] .gal-card');
    expect(mineCards).toHaveLength(2);
    mineCards.forEach((c) => {
      expect(c.querySelector('[data-gal-del]')).toBeTruthy();
      expect(c.querySelector('[data-gal-report]')).toBeNull();
    });
    const wallet = doc.querySelector('.gal-wallet')!;
    expect(wallet.textContent).toContain('120');
    expect(wallet.textContent).toContain('2 of 2 slots used');
    // 120 ≥ 100 and 2 < 5 — expandable
    expect(wallet.querySelector('[data-gal-expand]')?.getAttribute('aria-disabled')).toBeNull();
  });

  it('expand is disabled below 100 credits or at the 5-slot cap', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(jsonResponse({ pieces: [], mine: [piece('m1', 'Alpha', 'Me', 3)], wallet: { credits: 40, slots: 5 } })),
    );
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    expect(doc.querySelector('[data-gal-expand]')?.getAttribute('aria-disabled')).toBe('true');
  });

  it('expanding spends 100 credits, shows the done note and reloads the island', async () => {
    let wallet = { credits: 120, slots: 2 };
    fetchMock.mockImplementation((input: string | URL | Request) => {
      const url = String(input);
      if (url.includes('/api/gallery/slot')) {
        wallet = { credits: 20, slots: 3 };
        return Promise.resolve(jsonResponse({ ok: true, credits: 20, slots: 3 }));
      }
      if (url.includes('/api/gallery/list')) {
        return Promise.resolve(
          jsonResponse({ pieces: [], mine: [piece('m1', 'Alpha', 'Me', 3)], wallet }),
        );
      }
      return Promise.resolve(jsonResponse({ ok: true }));
    });
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    (doc.querySelector('[data-gal-expand]') as HTMLButtonElement).click();
    await flush();
    const call = fetchMock.mock.calls.find(([u]) => String(u).includes('/api/gallery/slot'));
    expect(call).toBeTruthy();
    expect(JSON.parse((call![1] as RequestInit).body as string)).toEqual({ uuid: expect.stringMatching(/^[0-9a-f-]{36}$/) });
    expect(doc.querySelector('[data-gallery-status]')?.textContent).toContain('expanded');
    // the island reloaded: the panel now shows the spent wallet
    expect(doc.querySelector('.gal-wallet')?.textContent).toContain('20');
  });

  it('delete confirms, posts the piece id and reloads', async () => {
    fetchMock.mockImplementation((input: string | URL | Request) => {
      const url = String(input);
      if (url.includes('/api/gallery/delete')) {
        return Promise.resolve(jsonResponse({ ok: true, used: 0 }));
      }
      if (url.includes('/api/gallery/list')) {
        return Promise.resolve(jsonResponse({ pieces: [], mine: [piece('m1', 'Alpha', 'Me', 3)], wallet: { credits: 3, slots: 1 } }));
      }
      return Promise.resolve(jsonResponse({ ok: true }));
    });
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    (doc.querySelector('[data-gal-del]') as HTMLButtonElement).click();
    await flush();
    const call = fetchMock.mock.calls.find(([u]) => String(u).includes('/api/gallery/delete'));
    expect(call).toBeTruthy();
    expect(JSON.parse((call![1] as RequestInit).body as string).pieceId).toBe('m1');
    expect(doc.querySelector('[data-gallery-status]')?.textContent).toContain('deleted');
  });

  it('a failed load shows an in-place retry button that reloads the list', async () => {
    let fail = true;
    fetchMock.mockImplementation(() => {
      if (fail) return Promise.reject(new Error('offline'));
      return Promise.resolve(
        jsonResponse({ pieces: [piece('p1', 'Fox', 'nick', 3)], mine: [], wallet: null }),
      );
    });
    const { document: doc } = await loadPage('gallery/index.html', fetchMock);
    await import('./gallery');
    await flush();
    // the error state carries the message and a real retry button
    const retry = doc.querySelector('[data-gal-retry]') as HTMLButtonElement | null;
    expect(retry).toBeTruthy();
    expect(doc.querySelector('[data-gallery-list]')?.textContent).toContain('reach the gallery');
    // clicking it re-runs the load against a now-working API
    fail = false;
    retry!.click();
    await flush();
    expect(doc.querySelector('[data-gallery-list]')?.textContent).toContain('Fox');
    expect(doc.querySelector('[data-gal-retry]')).toBeNull();
  });
});

describe('home-page gallery block (dist/index.html)', () => {
  let fetchMock: FetchMock;
  beforeEach(() => {
    fetchMock = vi.fn();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('ships hidden and empty in the static build', async () => {
    const { document: doc } = await loadPage('index.html', fetchMock);
    const zone = doc.querySelector('[data-home-gallery]') as unknown as HTMLElement;
    expect(zone.hidden).toBe(true);
    expect(doc.querySelector('[data-home-gallery-list]')?.children).toHaveLength(0);
    // SSR copy is in place regardless
    expect(doc.querySelector('[data-home-gallery] [data-i18n="home.galH"]')?.textContent).toBe('Community gallery');
  });

  it('reveals with mini cards when the API has pieces', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        jsonResponse({ pieces: [piece('a', 'First', 'Ann', 9), piece('b', 'Second', 'Bo', 4)], mine: null }),
      ),
    );
    const { document: doc } = await loadPage('index.html', fetchMock);
    await import('./homeGallery');
    await flush();
    const zone = doc.querySelector('[data-home-gallery]') as unknown as HTMLElement;
    expect(zone.hidden).toBe(false);
    // the home grid is 3 big cards × 3 rows — ask for exactly 9
    const listUrl = fetchMock.mock.calls.find(([u]) => String(u).includes('/api/gallery/list'))![0];
    expect(String(listUrl)).toBe('/api/gallery/list?limit=9');
    const minis = doc.querySelectorAll('[data-home-gallery-list] .gal-mini');
    expect(minis).toHaveLength(2);
    expect(minis[0]!.querySelector('a')?.getAttribute('href')).toBe('/gallery/');
    // every card shows its author…
    expect(minis[0]!.querySelector('.gal-nick')?.textContent).toContain('Ann');
    // …and thumbnails share one uniform square frame (no per-piece inline ratio)
    expect(minis[0]!.querySelector('.gal-thumb')?.getAttribute('style')).toBeNull();
    // medal badges for ranks 1–3, the #N pill from rank 4 on
    expect(minis[0]!.querySelector('.gal-rank-medal svg')).toBeTruthy();
    const { miniCardHtml } = await import('./galleryCards');
    expect(miniCardHtml(piece('d', 'Fourth', 'Cy', 1), 4)).toContain('#4');
    // info block stacks name (bold) over byline, Like pill floats on the thumb
    expect(minis[0]!.querySelector('.gal-mini-name')?.textContent).toBe('First');
    expect(minis[0]!.querySelector('.gal-like')?.className).toContain('gal-like');
  });

  it('mini cards carry a working Like pill: posts uuid+piece, bumps, spends the hour', async () => {
    fetchMock.mockImplementation((input: string | URL | Request) => {
      if (String(input).includes('/api/gallery/list')) {
        return Promise.resolve(
          jsonResponse({ pieces: [piece('a', 'First', 'Ann', 9), piece('b', 'Second', 'Bo', 4)], mine: null }),
        );
      }
      return Promise.resolve(jsonResponse({ ok: true }));
    });
    const { document: doc, window } = await loadPage('index.html', fetchMock);
    await import('./homeGallery');
    await flush();

    const like = doc.querySelector('[data-home-gallery-list] [data-gal-like]') as HTMLButtonElement;
    like.click();
    await flush();

    const call = fetchMock.mock.calls.find(([u]) => String(u).includes('/api/gallery/like'));
    expect(call).toBeTruthy();
    const body = JSON.parse((call![1] as RequestInit).body as string);
    expect(body.pieceId).toBe('a');
    expect(body.uuid).toMatch(/^[0-9a-f-]{36}$/);

    expect(like.querySelector('[data-gal-likes]')?.textContent).toBe('10');
    expect(window.localStorage.getItem('tb-gallery:voted-hour')).toBe(new Date().toISOString().slice(0, 13));
    // landed likes celebrate: filled heart + spark burst + remembered id
    expect(like.classList.contains('is-liked')).toBe(true);
    expect(like.querySelectorAll('.gal-spark').length).toBeGreaterThanOrEqual(1);
    expect(window.localStorage.getItem('tb-gallery:liked-piece')).toBe('a');
    // both pills disabled for the rest of the hour
    const pills = doc.querySelectorAll('[data-home-gallery-list] [data-gal-like]');
    expect(pills).toHaveLength(2);
    pills.forEach((b) => expect(b.getAttribute('aria-disabled')).toBe('true'));
  });

  it('a spent hour disables the home pills without a click', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        jsonResponse({ pieces: [piece('a', 'First', 'Ann', 9), piece('b', 'Second', 'Bo', 4)], mine: null }),
      ),
    );
    const { document: doc, window } = await loadPage('index.html', fetchMock);
    window.localStorage.setItem('tb-gallery:voted-hour', new Date().toISOString().slice(0, 13));
    await import('./homeGallery');
    await flush();
    const pills = doc.querySelectorAll('[data-home-gallery-list] [data-gal-like]');
    expect(pills).toHaveLength(2);
    pills.forEach((b) => expect(b.getAttribute('aria-disabled')).toBe('true'));
  });

  it('stays hidden when the gallery is empty or unreachable', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(jsonResponse({ pieces: [], mine: null })));
    const { document: doc } = await loadPage('index.html', fetchMock);
    await import('./homeGallery');
    await flush();
    expect((doc.querySelector('[data-home-gallery]') as unknown as HTMLElement).hidden).toBe(true);

    fetchMock.mockImplementation(() => Promise.reject(new Error('down')));
    vi.resetModules();
    const win2 = new Window({ url: 'https://tintbrew.com/' });
    const doc2 = win2.document;
    doc2.write(readPage('index.html'));
    (globalThis as Record<string, unknown>).document = doc2;
    (globalThis as Record<string, unknown>).window = win2;
    (globalThis as Record<string, unknown>).localStorage = win2.localStorage;
    vi.stubGlobal('fetch', fetchMock);
    vi.resetModules();
    await import('./homeGallery');
    await flush();
    expect((doc2.querySelector('[data-home-gallery]') as unknown as HTMLElement).hidden).toBe(true);
  });
});
