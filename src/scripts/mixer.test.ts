/**
 * Island interaction tests against the real SSR markup from `astro build`.
 * Runs the actual compiled behaviors in happy-dom: init, recompute, row
 * add/remove bounds, hex validation, mode toggle, URL sync.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

const htmlPath = resolve(fileURLToPath(import.meta.url), '../../../dist/color-mixer/index.html');

async function loadPage(search = '') {
  const html = readFileSync(htmlPath, 'utf8');
  const window = new Window({ url: `https://tintbrew.com/color-mixer${search}` });
  const { document } = window;
  document.write(html);
  // Wire the globals the island module reads at import time.
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  (globalThis as Record<string, unknown>).history = window.history;
  vi.resetModules(); // fresh import so init() runs against this document
  await import('./mixer');
  return { window, document };
}

function fire(el: Element, type: 'input' | 'change' | 'click') {
  el.dispatchEvent(
    type === 'click'
      ? new (el.ownerDocument!.defaultView!.MouseEvent)('click', { bubbles: true })
      : new (el.ownerDocument!.defaultView!.Event)(type, { bubbles: true }),
  );
}

const rows = (doc: Document) => [...doc.querySelectorAll('[data-row]')];
const resultLabel = (doc: Document) => doc.querySelector('[data-result-label]')!.textContent!;

describe('mixer island (real SSR markup)', () => {
  let ctx: Awaited<ReturnType<typeof loadPage>>;

  beforeEach(async () => {
    ctx = await loadPage();
  });

  it('initializes from SSR state without changing the pre-rendered answer', () => {
    expect(resultLabel(ctx.document)).toBe('#b26f98');
    expect(rows(ctx.document)).toHaveLength(2);
  });

  it('ratio slider live-recomputes and pulls toward the heavier color', () => {
    const before = resultLabel(ctx.document);
    const range = rows(ctx.document)[0]!.querySelector('[data-ratio]') as HTMLInputElement;
    range.value = '10';
    fire(range, 'input');
    const after = resultLabel(ctx.document);
    expect(after).not.toBe(before);
    // heavier red → red channel of the result must rise
    const r = parseInt(after.slice(1, 3), 16);
    expect(r).toBeGreaterThan(parseInt(before.slice(1, 3), 16));
  });

  it('adds colors up to 5 and disables add, removes down to 2 and disables remove', () => {
    const add = ctx.document.querySelector('[data-add]') as HTMLButtonElement;
    for (let i = 0; i < 3; i++) fire(add, 'click');
    expect(rows(ctx.document)).toHaveLength(5);
    expect(add.disabled).toBe(true);

    const remove = rows(ctx.document)[2]!.querySelector('[data-remove]') as HTMLButtonElement;
    fire(remove, 'click');
    expect(rows(ctx.document)).toHaveLength(4);
    expect(add.disabled).toBe(false);

    // remove down to 2, then removal must be a no-op
    for (let i = 0; i < 3; i++) {
      const btn = rows(ctx.document)[0]!.querySelector('[data-remove]') as HTMLButtonElement;
      fire(btn, 'click');
    }
    expect(rows(ctx.document)).toHaveLength(2);
    const lastRemove = rows(ctx.document)[0]!.querySelector('[data-remove]') as HTMLButtonElement;
    expect(lastRemove.disabled).toBe(true);
  });

  it('validates hex on input and reverts invalid hex on change', () => {
    const hexInput = rows(ctx.document)[0]!.querySelector('[data-hex]') as HTMLInputElement;
    hexInput.value = 'zzz';
    fire(hexInput, 'input');
    expect(hexInput.getAttribute('aria-invalid')).toBe('true');
    fire(hexInput, 'change');
    expect(hexInput.value).toBe('#ff0000');
    expect(hexInput.getAttribute('aria-invalid')).toBe('false');
  });

  it('accepts a valid hex on change and recomputes', () => {
    const before = resultLabel(ctx.document);
    const hexInput = rows(ctx.document)[0]!.querySelector('[data-hex]') as HTMLInputElement;
    hexInput.value = '#00ff00';
    fire(hexInput, 'change');
    expect(resultLabel(ctx.document)).not.toBe(before);
    const colorInput = rows(ctx.document)[0]!.querySelector('[data-color]') as HTMLInputElement;
    expect(colorInput.value.toLowerCase()).toBe('#00ff00');
  });

  it('mode toggle flips aria-pressed and changes the math', () => {
    const oklabResult = resultLabel(ctx.document);
    const rgbBtn = ctx.document.querySelector('[data-mode-value="rgb"]') as HTMLButtonElement;
    const oklabBtn = ctx.document.querySelector('[data-mode-value="oklab"]') as HTMLButtonElement;
    fire(rgbBtn, 'click');
    expect(rgbBtn.getAttribute('aria-pressed')).toBe('true');
    expect(oklabBtn.getAttribute('aria-pressed')).toBe('false');
    // naive average of #ff0000 and #3b82f6 = rgb(157,65,123)
    expect(resultLabel(ctx.document)).toBe('#9d417b');
    fire(oklabBtn, 'click');
    expect(resultLabel(ctx.document)).toBe(oklabResult);
  });

  it('hides the color-mix() snippet beyond 2 colors and restores it at 2', () => {
    const block = ctx.document.querySelector('[data-snippet-block]') as HTMLElement;
    expect(block.hidden).toBe(false);
    const add = ctx.document.querySelector('[data-add]') as HTMLButtonElement;
    fire(add, 'click');
    expect(block.hidden).toBe(true);
    const remove = rows(ctx.document)[2]!.querySelector('[data-remove]') as HTMLButtonElement;
    fire(remove, 'click');
    expect(block.hidden).toBe(false);
  });

  it('syncUrl keeps query params in step with state', () => {
    const replaceState = vi.spyOn(ctx.window.history, 'replaceState');
    const range = rows(ctx.document)[1]!.querySelector('[data-ratio]') as HTMLInputElement;
    range.value = '3';
    fire(range, 'input');
    expect(replaceState).toHaveBeenCalled();
    const lastCall = replaceState.mock.calls.at(-1)![2] as string;
    expect(lastCall).toContain('colors=%23ff0000%2C%233b82f6');
    expect(lastCall).toContain('ratios=1%2C3');
  });
});

describe('mixer island URL restore', () => {
  it('restores colors and ratios from the query string', async () => {
    const ctx = await loadPage('?colors=%23ff0000,%230000ff&ratios=3,1');
    expect(rows(ctx.document)).toHaveLength(2);
    const range0 = rows(ctx.document)[0]!.querySelector('[data-ratio]') as HTMLInputElement;
    expect(range0.value).toBe('3');
    const hex1 = rows(ctx.document)[1]!.querySelector('[data-hex]') as HTMLInputElement;
    expect(hex1.value).toBe('#0000ff');
    // must equal the engine result for red:blue 3:1, not the default mix
    expect(resultLabel(ctx.document)).toBe('#c6496d');
  });

  it('ignores garbage params and falls back to SSR state', async () => {
    const ctx = await loadPage('?colors=nope&ratios=zzz');
    expect(resultLabel(ctx.document)).toBe('#b26f98');
    expect(rows(ctx.document)).toHaveLength(2);
  });
});
