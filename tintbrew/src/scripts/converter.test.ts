/**
 * Converter island tests against real SSR markup from `astro build`.
 * Verifies four-format live sync, validation/revert, copy targets, URL state.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

const htmlPath = resolve(fileURLToPath(import.meta.url), '../../../dist/color-converter/index.html');

async function loadPage(search = '') {
  const html = readFileSync(htmlPath, 'utf8');
  const window = new Window({ url: `https://tintbrew.com/color-converter${search}` });
  const { document } = window;
  document.write(html);
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  (globalThis as Record<string, unknown>).history = window.history;
  vi.resetModules();
  await import('./converter');
  return { window, document: document as unknown as Document };
}

function fire(el: Element, type: 'input' | 'change') {
  el.dispatchEvent(new (el.ownerDocument!.defaultView!.Event)(type, { bubbles: true }));
}

const label = (doc: Document) => doc.querySelector('[data-c-label]')!.textContent!;
const field = (doc: Document, sel: string) => doc.querySelector<HTMLInputElement>(sel)!;
const copyVal = (doc: Document, block: string) =>
  doc.querySelector(`[data-f-block="${block}"] .btn-copy`)!.getAttribute('data-copy');

describe('converter island (real SSR markup)', () => {
  let ctx: Awaited<ReturnType<typeof loadPage>>;

  beforeEach(async () => {
    ctx = await loadPage();
  });

  it('initializes from SSR state without changing the pre-rendered answer', () => {
    expect(label(ctx.document)).toBe('#6d28d9');
    expect(field(ctx.document, '[data-f-rgb-r]').value).toBe('109');
    expect(field(ctx.document, '[data-f-hsl-h]').value).toBe('263');
    expect(copyVal(ctx.document, 'hex')).toBe('#6d28d9');
  });

  it('typing a valid hex updates every other format live', () => {
    const hexEl = field(ctx.document, '[data-f-hex]');
    hexEl.value = '#ff0000';
    fire(hexEl, 'input');
    expect(label(ctx.document)).toBe('#ff0000');
    expect(field(ctx.document, '[data-f-rgb-r]').value).toBe('255');
    expect(field(ctx.document, '[data-f-rgb-g]').value).toBe('0');
    expect(field(ctx.document, '[data-f-hsl-h]').value).toBe('0');
    expect(field(ctx.document, '[data-f-hsl-s]').value).toBe('100');
    expect(field(ctx.document, '[data-f-cmyk-m]').value).toBe('100');
    expect(field(ctx.document, '[data-f-cmyk-k]').value).toBe('0');
    expect(field(ctx.document, '[data-f-hex]').value).toBe('#ff0000'); // origin untouched
    expect(copyVal(ctx.document, 'rgb')).toBe('rgb(255, 0, 0)');
    expect(ctx.document.querySelector('[data-c-name]')!.textContent).toBe('Red');
  });

  it('invalid hex marks the field and reverts on commit', () => {
    const hexEl = field(ctx.document, '[data-f-hex]');
    hexEl.value = 'zzz';
    fire(hexEl, 'input');
    expect(hexEl.getAttribute('aria-invalid')).toBe('true');
    expect(label(ctx.document)).toBe('#6d28d9'); // state untouched
    fire(hexEl, 'change');
    expect(hexEl.value).toBe('#6d28d9');
    expect(hexEl.getAttribute('aria-invalid')).toBe('false');
  });

  it('editing RGB channels updates hex/hsl/cmyk', () => {
    const r = field(ctx.document, '[data-f-rgb-r]');
    r.value = '0';
    fire(r, 'input');
    expect(label(ctx.document)).toBe('#0028d9');
    expect(copyVal(ctx.document, 'rgb')).toBe('rgb(0, 40, 217)');
  });

  it('out-of-range RGB value is rejected and reverts on commit', () => {
    const g = field(ctx.document, '[data-f-rgb-g]');
    g.value = '999';
    fire(g, 'input');
    expect(g.getAttribute('aria-invalid')).toBe('true');
    expect(label(ctx.document)).toBe('#6d28d9');
    fire(g, 'change');
    expect(g.value).toBe('40');
    expect(g.getAttribute('aria-invalid')).toBe('false');
  });

  it('editing HSL fields converts back to rgb', () => {
    field(ctx.document, '[data-f-hsl-h]').value = '210';
    field(ctx.document, '[data-f-hsl-s]').value = '100';
    const l = field(ctx.document, '[data-f-hsl-l]');
    l.value = '50';
    fire(l, 'input');
    expect(label(ctx.document)).toBe('#0080ff'); // hue 210 = azure
    expect(copyVal(ctx.document, 'hsl')).toBe('hsl(210, 100%, 50%)');
  });

  it('editing CMYK fields converts back to rgb', () => {
    field(ctx.document, '[data-f-cmyk-c]').value = '0';
    field(ctx.document, '[data-f-cmyk-m]').value = '100';
    field(ctx.document, '[data-f-cmyk-y]').value = '100';
    const k = field(ctx.document, '[data-f-cmyk-k]');
    k.value = '0';
    fire(k, 'input');
    expect(label(ctx.document)).toBe('#ff0000');
    expect(copyVal(ctx.document, 'cmyk')).toBe('cmyk(0%, 100%, 100%, 0%)');
  });

  it('syncUrl writes the color to the query string', () => {
    const replaceState = vi.spyOn(ctx.window.history, 'replaceState');
    const hexEl = field(ctx.document, '[data-f-hex]');
    hexEl.value = '#00aa55';
    fire(hexEl, 'input');
    expect(replaceState).toHaveBeenCalled();
    expect(replaceState.mock.calls.at(-1)![2]).toContain('color=%2300aa55');
  });
});

describe('converter island URL restore', () => {
  it('restores the color from ?color=', async () => {
    const ctx = await loadPage('?color=%2300ff00');
    expect(label(ctx.document)).toBe('#00ff00');
    expect(field(ctx.document, '[data-f-rgb-g]').value).toBe('255');
  });

  it('ignores an invalid color param', async () => {
    const ctx = await loadPage('?color=nope');
    expect(label(ctx.document)).toBe('#6d28d9');
  });
});
