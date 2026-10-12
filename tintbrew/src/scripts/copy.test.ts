/**
 * Copy interaction tests against real SSR markup from `astro build`:
 * static [data-copy] buttons, [data-copy-link] share buttons (flagship pages
 * only — syncUrl gate), and the "Copied ✓" feedback.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

const dist = resolve(fileURLToPath(import.meta.url), '../../../dist');
const readPage = (rel: string) => readFileSync(resolve(dist, rel), 'utf8');

async function loadPage(rel: string, search = '') {
  const url = `https://tintbrew.com/${rel.replace(/index\.html$/, '')}${search}`;
  const window = new Window({ url });
  const { document } = window;
  document.write(readPage(rel));
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  vi.resetModules();
  await import('./copy');
  return { window, document: document as unknown as Document, url };
}

function fire(el: Element) {
  el.dispatchEvent(new (el.ownerDocument!.defaultView!.MouseEvent)('click', { bubbles: true }));
}

/** copy.ts reads globalThis.navigator at click time; stub the clipboard API. */
function stubClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { writeText } });
  return writeText;
}

const flush = () => new Promise((r) => setTimeout(r, 0));
const copied = () => {
  const nav = (globalThis as Record<string, unknown>).navigator as {
    clipboard: { writeText: ReturnType<typeof vi.fn> };
  };
  return nav.clipboard.writeText.mock.calls.at(-1)?.[0];
};

describe('copy handler (real SSR markup)', () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = stubClipboard();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('flagship mixer renders a share-row whose button copies the live URL', async () => {
    const ctx = await loadPage('color-mixer/index.html', '?colors=%23ff0000,%230000ff&ratios=3,1');
    const shareBtn = ctx.document.querySelector('[data-copy-link]') as HTMLButtonElement;
    expect(shareBtn).not.toBeNull();
    expect(shareBtn.textContent!.trim()).toBe('Copy link');
    expect(shareBtn.getAttribute('aria-label')).toBe('Copy shareable link');
    fire(shareBtn);
    await flush();
    // the share link carries the exact mix from the query string
    expect(copied()).toBe('https://tintbrew.com/color-mixer/?colors=%23ff0000,%230000ff&ratios=3,1');
    expect(writeText).toHaveBeenCalledTimes(1);
  });

  it('flagship converter renders a share-row button too', async () => {
    const ctx = await loadPage('color-converter/index.html');
    expect(ctx.document.querySelector('[data-copy-link]')).not.toBeNull();
  });

  it('matrix pages have no share-row (syncUrl gate)', async () => {
    const ctx = await loadPage('mix/black-red/index.html');
    expect(ctx.document.querySelector('[data-copy-link]')).toBeNull();
    // static copy buttons still present on matrix pages
    expect(ctx.document.querySelector('[data-copy]')).not.toBeNull();
  });

  it('static [data-copy] copies the attribute value and flashes feedback', async () => {
    const ctx = await loadPage('color-mixer/index.html');
    const btn = ctx.document.querySelector('.result-values [data-copy]') as HTMLButtonElement;
    const expected = btn.getAttribute('data-copy');
    expect(expected).toMatch(/^#/);
    // copy.ts schedules the revert on window.setTimeout — spy so we can fire
    // it deterministically instead of waiting 1.5s of real time.
    const setTimeoutSpy = vi.spyOn(ctx.window, 'setTimeout');
    fire(btn);
    await flush();
    expect(copied()).toBe(expected);
    expect(btn.classList.contains('copied')).toBe(true);
    expect(btn.textContent).toBe('Copied ✓');
    const [revert, delay] = setTimeoutSpy.mock.calls.at(-1)! as [(...a: unknown[]) => unknown, number];
    expect(delay).toBe(1500);
    revert();
    expect(btn.textContent).not.toBe('Copied ✓');
    expect(btn.classList.contains('copied')).toBe(false);
  });
});
