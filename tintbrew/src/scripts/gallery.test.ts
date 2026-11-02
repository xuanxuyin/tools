/**
 * Community gallery tests (UGC, 2026-11-02). Two layers:
 *  - the /gallery/ SSR shell from `astro build` (hero copy, loading state,
 *    FAQ, JSON-LD, ToolNav entry) — content survives without JS;
 *  - the gallery island running against that real markup with a stubbed
 *    API: ranking render, XSS-safe name/nick, own-piece zone (including
 *    the under-review state), the one-like-per-hour flow and Report.
 *  The home-page top-10 block gets the same treatment with its contract:
 *  ships hidden, only reveals when the API returns pieces.
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
    expect(cards[0]!.querySelector('.gal-rank')?.textContent).toBe('#1');
    expect(cards[1]!.querySelector('.gal-rank')?.textContent).toBe('#2');
    expect(cards[0]!.querySelector('.gal-name')?.textContent).toBe('Rainbow Cat');
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
    const likes = doc.querySelectorAll('[data-gal-like]');
    expect(likes).toHaveLength(2);
    likes.forEach((b) => expect(b.getAttribute('aria-disabled')).toBe('true'));
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
    expect(doc.querySelector('[data-gallery-mine] .gal-rank')?.textContent).toBe('#2');
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
});

describe('home-page top-10 block (dist/index.html)', () => {
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

  it('reveals with mini cards when the API has pieces; no like buttons on home', async () => {
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
    const minis = doc.querySelectorAll('[data-home-gallery-list] .gal-mini');
    expect(minis).toHaveLength(2);
    expect(minis[0]!.querySelector('a')?.getAttribute('href')).toBe('/gallery/');
    expect(doc.querySelector('[data-home-gallery] [data-gal-like]')).toBeNull();
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
