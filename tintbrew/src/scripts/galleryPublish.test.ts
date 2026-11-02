/**
 * Shared publish-to-gallery flow tests (2026-11-02). Three angles the other
 * suites don't cover:
 *  - editor-templates.json as built: every palette letter maps to a real
 *    Mardiy id and every row width matches the declared board width;
 *  - the gallery card's "Open in editor" remix link;
 *  - the pattern detail pages' self-booting publish flow — the build-time
 *    def JSON rides along, so a click on Publish must POST the canonical
 *    Mardiy grid without any page-specific island.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';
import { MARD_COLORS } from '../lib/mardPalette';

const dist = resolve(fileURLToPath(import.meta.url), '../../../dist');

interface TemplateEntry {
  slug: string;
  name: string;
  cat: string;
  w: number;
  h: number;
  rows: string[];
  pal: Record<string, string>;
}

describe('editor-templates.json (built catalog)', () => {
  it('ships every catalog pattern with mard-id palettes and aligned rows', () => {
    const raw = JSON.parse(readFileSync(resolve(dist, 'editor-templates.json'), 'utf8')) as {
      groups: { cat: string; items: TemplateEntry[] }[];
    };
    expect(raw.groups.length).toBeGreaterThan(0);
    const all = raw.groups.flatMap((g) => g.items);
    expect(all.length).toBeGreaterThanOrEqual(100); // the catalog, not a stub

    const slugs = new Set(all.map((t) => t.slug));
    expect(slugs.size).toBe(all.length); // no duplicate entries

    const ids = new Set(MARD_COLORS.map((b) => b.id));
    for (const t of all) {
      expect(t.w).toBeGreaterThan(0);
      expect(t.h).toBe(t.rows.length);
      for (const row of t.rows) expect(row).toHaveLength(t.w);
      const used = new Set(t.rows.join('').replace(/\./g, ''));
      expect(used.size).toBeGreaterThan(0);
      for (const ch of used) expect(t.pal[ch]).toBeDefined();
      for (const id of Object.values(t.pal)) expect(ids.has(id)).toBe(true);
    }
  });
});

describe('gallery card remix link', () => {
  it('cardHtml links "Open in editor" at /bead-editor/?from=<id>', async () => {
    const window = new Window({ url: 'https://tintbrew.com/gallery/' });
    (globalThis as Record<string, unknown>).document = window.document;
    (globalThis as Record<string, unknown>).window = window;
    vi.resetModules();
    const { cardHtml } = await import('./galleryCards');
    const html = cardHtml(
      {
        id: 'piece000001',
        name: 'Star <3',
        nick: 'Tester',
        width: 8,
        height: 8,
        cells: Array(64).fill(null),
        likes: 2,
      },
      1,
    );
    expect(html).toContain('href="/bead-editor/?from=piece000001"');
    expect(html).toContain('gal-edit');
    expect(html).toContain('Open in editor');
  });
});

describe('pattern page self-boot publish (dist detail page)', () => {
  const base = resolve(dist, 'perler-bead-animals');
  let pageRel: string;

  function firstDetailPage(): string {
    const dir = readdirSync(base).find((d) => existsSync(resolve(base, d, 'index.html')));
    if (!dir) throw new Error('no built animal pattern page under dist/perler-bead-animals/');
    return `perler-bead-animals/${dir}/index.html`;
  }

  function jsonResponse(body: unknown, status = 200) {
    return {
      ok: status < 400,
      status,
      json: async () => body,
    } as Response;
  }

  beforeEach(() => {
    pageRel = firstDetailPage();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(jsonResponse({ id: 'pub00000001' }))),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('the page ships the def JSON and the panel; a click posts the canonical mard grid', async () => {
    const html = readFileSync(resolve(dist, pageRel), 'utf8');
    const window = new Window({ url: `https://tintbrew.com/${pageRel.replace('index.html', '')}` });
    const { document } = window;
    document.write(html);
    (globalThis as Record<string, unknown>).document = document;
    (globalThis as Record<string, unknown>).window = window;
    (globalThis as Record<string, unknown>).localStorage = window.localStorage;
    vi.resetModules();
    await import('./galleryPublish'); // module tail self-boots [data-gal-pub-auto]

    const section = document.querySelector('[data-gal-pub-auto]')!;
    const defRaw = section.querySelector('[data-gal-def]')?.textContent ?? '';
    const def = JSON.parse(defRaw) as { w: number; h: number; rows: string[]; pal: Record<string, string> };
    expect(def.w).toBeGreaterThan(0);

    const pub = section.querySelector('[data-ed-publish]') as HTMLElement;
    expect(pub).toBeTruthy();
    (pub as unknown as HTMLElement).dispatchEvent(
      new (window as unknown as { MouseEvent: typeof MouseEvent }).MouseEvent('click', { bubbles: true }),
    );
    const panel = section.querySelector('[data-ed-publish-panel]') as HTMLElement;
    expect(panel.classList.contains('hidden')).toBe(false);
    // the pattern name prefills the piece-name input
    expect((panel.querySelector('[data-ed-publish-name]') as HTMLInputElement).value.length).toBeGreaterThan(0);

    (panel.querySelector('[data-ed-publish-nick]') as HTMLInputElement).value = 'Tester';
    (panel.querySelector('[data-ed-publish-submit]') as HTMLElement).dispatchEvent(
      new (window as unknown as { MouseEvent: typeof MouseEvent }).MouseEvent('click', { bubbles: true }),
    );
    await new Promise((r) => setTimeout(r, 0));

    const call = vi.mocked(globalThis.fetch).mock.calls[0]!;
    expect(String(call[0])).toBe('/api/gallery/publish');
    const body = JSON.parse((call[1] as RequestInit).body as string);
    expect(body.nick).toBe('Tester');
    expect(body.width).toBe(def.w);
    expect(body.height).toBe(def.h);
    expect(body.grid).toHaveLength(def.h);
    const ids = new Set(MARD_COLORS.map((b) => b.id));
    for (const row of body.grid as (string | null)[]) {
      for (const cell of row) {
        if (cell !== null) expect(ids.has(cell)).toBe(true);
      }
    }
    // at least one bead published — the canonical pattern is not blank
    expect((body.grid as (string | null)[][]).some((row) => row.some(Boolean))).toBe(true);
    // the nickname is remembered for the next publish
    expect(window.localStorage.getItem('tb-gallery:nick')).toBe('Tester');
  });

  it('a remembered nickname prefills the panel on open', async () => {
    const html = readFileSync(resolve(dist, pageRel), 'utf8');
    const window = new Window({ url: `https://tintbrew.com/${pageRel.replace('index.html', '')}` });
    const { document } = window;
    document.write(html);
    (globalThis as Record<string, unknown>).document = document;
    (globalThis as Record<string, unknown>).window = window;
    (globalThis as Record<string, unknown>).localStorage = window.localStorage;
    window.localStorage.setItem('tb-gallery:nick', 'BeadFan42');
    vi.resetModules();
    await import('./galleryPublish');

    const section = document.querySelector('[data-gal-pub-auto]')!;
    (section.querySelector('[data-ed-publish]') as HTMLElement).dispatchEvent(
      new (window as unknown as { MouseEvent: typeof MouseEvent }).MouseEvent('click', { bubbles: true }),
    );
    const nickEl = section.querySelector('[data-ed-publish-nick]') as HTMLInputElement;
    expect(nickEl.value).toBe('BeadFan42');
  });
});
