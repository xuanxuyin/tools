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

  // Cross-language sweep hardening (user call, 2026-10-29): a zh value that
  // is pure ASCII is almost always an untranslated leak; same for ko.
  // Placeholder-only / pure-punctuation values are exempt by design (zh
  // full-width punctuation alone qualifies — trailing '。' segments).
  const SYMBOL_ONLY = new Set(['mix.heroEq', 'mix.cardA', 'mix.period']);
  const HAN = /[一-鿿，。！？；：·（）“”——…]/;
  const HANGUL = /[가-힯]/;

  it('zh values carry Han characters (no English leaks)', () => {
    const leaks = Object.keys(UI_STRINGS.zh).filter(
      (k) => !SYMBOL_ONLY.has(k) && !HAN.test(UI_STRINGS.zh[k as UiKey]),
    );
    expect(leaks).toEqual([]);
  });

  it('ko values carry Hangul (no English leaks)', () => {
    const leaks = Object.keys(UI_STRINGS.ko).filter(
      (k) => !SYMBOL_ONLY.has(k) && !HANGUL.test(UI_STRINGS.ko[k as UiKey]),
    );
    expect(leaks).toEqual([]);
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
    expect(document.querySelector('.lang-current')?.textContent?.trim()).toBe('简体中文');
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

  it('data-i18n-args fills {placeholders} per language word order', async () => {
    const { document, mod } = await loadPage('index.html');
    const all = document.querySelector('[data-i18n="home.allPatterns"]');
    expect(all?.textContent?.trim()).toBe('All 116 patterns →');
    mod.setLang('zh');
    expect(all?.textContent?.trim()).toBe('全部 116 张图纸 →');
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

/** Cross-language sweep (user call, 2026-10-29): every page family gets a
 *  real switch on its shipped dist HTML — placeholders resolve (color names,
 *  hand-written mix phrases, difficulty enums), chrome swaps, and a round
 *  trip back to English restores the SSR text including capitalization. */
describe('cross-language sweep over dist pages', () => {
  it('mix [slug]: h1/hero/FAQ fill color + phrase dictionaries in zh', async () => {
    const { document, mod } = await loadPage('mix/red-blue/index.html');
    mod.setLang('zh');
    expect(document.querySelector('[data-i18n="mix.h1"]')?.textContent).toContain('红和蓝混成什么颜色');
    expect(document.querySelector('[data-i18n="mix.heroEq"]')?.textContent).toContain(
      '红 + 蓝 = 紫色（偏灰的紫罗兰）',
    );
    expect(document.querySelector('[data-i18n="mix.fq1"]')?.textContent).toContain('红和蓝混出来是紫');
    // ratio table headers take the color.* dictionary, not raw ids
    expect(document.querySelector('.mix-th [data-i18n="color.red"]')?.textContent).toBe('红');
    expect(document.querySelector('.mix-th [data-i18n="mix.thResult"]')?.textContent).toBe('结果');
    expect(document.querySelector('.tints-labels [data-i18n="mix.tsT"]')?.textContent).toBe('浅化');
  });

  it('mix [slug]: round trip back to en keeps SSR capitalization (Red + Blue)', async () => {
    const { document, mod } = await loadPage('mix/red-blue/index.html');
    const hero = () => document.querySelector('[data-i18n="mix.heroEq"]')?.textContent;
    mod.setLang('zh');
    expect(hero()).toContain('红 + 蓝');
    mod.setLang('en');
    expect(hero()).toContain('Red + Blue = purple (a muted violet)');
  });

  it('mix hub: group titles and card questions swap in zh', async () => {
    const { document, mod } = await loadPage('mix/index.html');
    mod.setLang('zh');
    expect(document.querySelector('[data-i18n="mix.popH"]')?.textContent).toBe('热门混色');
    const card = document.querySelector('[data-i18n="mix.qCard"]');
    expect(card?.textContent).toMatch(/和.+混成什么？/);
    expect(document.querySelector('[data-i18n="mix.cardA"]')?.textContent).toContain(
      '紫色（偏灰的紫罗兰）',
    );
  });

  it('scenario template: methods note and drop counters swap in zh', async () => {
    const { document, mod } = await loadPage('icing-color-chart/index.html');
    mod.setLang('zh');
    expect(document.querySelector('[data-i18n="sec.tipsH"]')?.textContent).toBe('实用建议');
    // the gel chart's drop counters (base / N drops) take the sc.* dictionary
    expect(document.querySelector('[data-i18n="sc.dropsBase"]')?.textContent).toBe('本色');
    expect(document.querySelector('[data-i18n="sc.dropsN"]')?.textContent).toMatch(/^\d+ 滴$/);
    expect(document.querySelector('[data-i18n="sc.gelWord"]')?.textContent).toBe(' 凝胶');
  });

  it('outfit template: roles, aria and print button swap in ko', async () => {
    const { document, mod } = await loadPage('what-colors-go-with-brown/index.html');
    mod.setLang('ko');
    expect(document.querySelector('[data-i18n="of.printBtn"]')?.textContent).toBe(
      '팔레트 카드 인쇄',
    );
    const role = document.querySelector('.combo-role');
    expect(role?.textContent).toMatch(/상의|바지\/치마|신발|포인트|레이어/);
    const swap = document.querySelector('[data-swap]');
    expect(swap?.getAttribute('aria-label')).toContain('색 바꾸기');
    expect(document.querySelector('[data-i18n="of.avoidH"]')?.textContent).toBe(
      '어울리지 않는 색',
    );
  });

  it('bead hub: h1 and difficulty enum in card meta swap in zh', async () => {
    const { document, mod } = await loadPage('perler-bead-patterns/index.html');
    mod.setLang('zh');
    expect(document.querySelector('[data-i18n="bs.hub"]')?.textContent).toBe('免费拼豆图纸');
    const meta = document.querySelector('[data-i18n="bs.cardMeta"]');
    expect(meta?.textContent).toMatch(/简单|中等/);
  });

  it('photo page: h1 and hero lead swap in zh (guide cards covered by ph.*/pg.*)', async () => {
    const { document, mod } = await loadPage('photo-to-perler-bead-pattern/index.html');
    mod.setLang('zh');
    expect(document.querySelector('[data-i18n="ph.h1"]')?.textContent).toBe('照片转拼豆图纸');
    expect(document.querySelector('[data-i18n="ph.lead"]')?.textContent).toContain('上传图片');
    expect(document.querySelector('[data-i18n="pg.faqTitle"]')?.textContent).toBe('常见问题');
  });

  it('color-guides hub: groups, tiles and more-links swap in zh (user call, batch 3)', async () => {
    const { document, mod } = await loadPage('color-guides/index.html');
    mod.setLang('zh');
    expect(document.querySelector('[data-i18n="cg.h1"]')?.textContent).toBe('配色指南');
    expect(document.querySelector('[data-i18n="cg.makeH"]')?.textContent).toBe('什么颜色能调出……');
    // featured tile carries the whole translated page title
    const tile = document.querySelector('.link-tile [data-i18n^="guide."]');
    expect(tile?.textContent).toBe('什么颜色能调出棕色');
    // overflow row: prefix + translated link title
    const more = document.querySelector('.more-links');
    expect(more?.textContent).toMatch(/更多：/);
    expect(more?.textContent).toContain('什么颜色能调出蓝色');
  });

  it('color-mixer: h1, Oklab strong, tiles and FAQ swap in zh', async () => {
    const { document, mod } = await loadPage('color-mixer/index.html');
    mod.setLang('zh');
    expect(document.querySelector('[data-i18n="cmx.h1"]')?.textContent).toBe('在线调色混合器');
    expect(document.querySelector('[data-i18n="cmx.oklab"]')?.textContent).toBe('Oklab 色彩空间');
    expect(document.querySelector('[data-i18n="cmx.t1"]')?.textContent).toContain('经典的紫罗兰');
    expect(document.querySelector('[data-i18n="cmx.fq1"]')?.textContent).toContain('有什么区别');
    // round trip back to English restores the SSR lead around <code>color-mix()</code>
    mod.setLang('en');
    const lead = document.querySelector('.lead');
    expect(lead?.textContent).toContain('copy-ready CSS color-mix() snippet');
  });

  it('P3 pages: fuse group labels and letters stats swap in zh', async () => {
    const fuse = await loadPage('fuse-bead-patterns/index.html');
    fuse.mod.setLang('zh');
    expect(fuse.document.querySelector('[data-i18n="bs.gAnL"]')?.textContent).toBe('动物');
    expect(fuse.document.querySelector('[data-i18n="bs.fuNarrow"]')?.textContent).toBe(
      '想找更细的分类？',
    );

    const letters = await loadPage('perler-bead-letters/index.html');
    letters.mod.setLang('zh');
    expect(letters.document.querySelector('h1')?.textContent).toBe('拼豆字母');
    expect(letters.document.querySelector('[data-i18n="bl.boards"]')?.textContent).toContain(
      '26 块板',
    );
    expect(letters.document.querySelector('[data-i18n="bl.demo"]')?.textContent).toContain('EMMA');
  });
});
