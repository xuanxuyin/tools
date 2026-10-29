/**
 * In-page language switch (user call, 2026-10-29): the SSR document is
 * always the English edition — one URL, one canonical, Google US untouched.
 * These tests pin that contract: shipped HTML stays English, the dictionary
 * covers every key in all three languages, and switching swaps only the
 * tagged chrome (nav pills, tool controls) plus html lang.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';
import { UI_STRINGS, type UiKey } from '../data/uiStrings';

const dist = resolve(fileURLToPath(import.meta.url), '../../../dist');
const readPage = (rel: string) => readFileSync(resolve(dist, rel), 'utf8');

/** Load a real dist page into happy-dom, then (re)import the island with
 *  modules reset — the copy.test.ts pattern, plus localStorage because
 *  i18n reads/writes the tb-lang preference. */
async function loadPage(rel: string, stored?: string) {
  const url = `https://tintbrew.com/${rel.replace(/index\.html$/, '')}`;
  const window = new Window({ url });
  const { document } = window;
  document.write(readPage(rel));
  if (stored) window.localStorage.setItem('tb-lang', stored);
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  (globalThis as Record<string, unknown>).localStorage = window.localStorage;
  vi.resetModules();
  const mod = await import('./i18n');
  return { window, document: document as unknown as Document, mod };
}

describe('uiStrings dictionary', () => {
  it('every key exists in all three languages, non-empty', () => {
    const enKeys = Object.keys(UI_STRINGS.en);
    expect(enKeys.length).toBeGreaterThan(50);
    for (const code of ['zh', 'ko'] as const) {
      expect(new Set(Object.keys(UI_STRINGS[code])), code).toEqual(new Set(enKeys));
      for (const k of enKeys) {
        expect(UI_STRINGS[code][k as UiKey], `${code}:${k}`).toBeTruthy();
      }
    }
  });

  it('zh/ko genuinely differ from en (the switch is visible)', () => {
    expect(UI_STRINGS.zh['nav.mixer']).not.toBe(UI_STRINGS.en['nav.mixer']);
    expect(UI_STRINGS.ko['nav.mixer']).not.toBe(UI_STRINGS.en['nav.mixer']);
  });
});

describe('i18n against real SSR markup', () => {
  it('shipped HTML is the English edition (SEO contract)', () => {
    const html = readPage('index.html');
    for (const k of Object.keys(UI_STRINGS.zh)) {
      expect(html, k).not.toContain(UI_STRINGS.zh[k as UiKey]);
    }
    expect(html).toContain('Color Mixer');
  });

  it('default load keeps en; setLang swaps chrome, lang tag and pill', async () => {
    const { document, mod } = await loadPage('index.html');
    expect(document.documentElement.lang).toBe('en');
    const nav = document.querySelector('[data-i18n="nav.mixer"]');
    expect(nav?.textContent?.trim()).toBe('Color Mixer');

    mod.setLang('zh');
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(nav?.textContent?.trim()).toBe('调色混合器');
    expect(document.querySelector('.lang-current')?.textContent?.trim()).toBe('中');
    expect(document.querySelector('[data-lang="zh"]')?.getAttribute('aria-current')).toBe('true');

    mod.setLang('ko');
    expect(nav?.textContent?.trim()).toBe('색 혼합기');

    mod.setLang('en');
    expect(nav?.textContent?.trim()).toBe('Color Mixer');
    expect(document.documentElement.lang).toBe('en');
  });

  it('data-i18n-aria swaps aria-label (LangSwitch summary)', async () => {
    const { document, mod } = await loadPage('index.html');
    const summary = document.querySelector('[data-i18n-aria="lang.label"]');
    expect(summary?.getAttribute('aria-label')).toBe('Language');
    mod.setLang('zh');
    expect(summary?.getAttribute('aria-label')).toBe('语言');
  });

  it('stored tb-lang applies on load (returning visitor, mix page)', async () => {
    const { document } = await loadPage('mix/black-red/index.html', 'zh');
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.querySelector('[data-i18n="mixer.shuffle"]')?.textContent?.trim()).toBe(
      '随机配色'
    );
  });

  it('editor controls carry the ed.* tags the switch relies on', () => {
    const html = readPage('bead-editor/index.html');
    for (const key of ['ed.brush', 'ed.eraser', 'ed.pick', 'ed.undo', 'ed.mirror', 'ed.reset', 'ed.png', 'ed.print']) {
      expect(html, key).toContain(`data-i18n="${key}"`);
    }
  });
});
