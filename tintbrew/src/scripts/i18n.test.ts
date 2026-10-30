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
import { BEAD_PATTERNS } from '../data/beadPatterns';
import { parseTagline } from '../lib/beadContent';
import { BEAD_COLORS as PALETTE_LINE } from '../lib/beadPalette';
import { BEAD_NAMES, BEAD_COLORS } from '../data/beadI18n';

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
  const SYMBOL_ONLY = new Set([
    'mix.heroEq',
    'mix.cardA',
    'mix.period',
    // identity templates — the translation happens on the {arg}, not the string
    'bs.nameT',
    'bs.colT',
    // ko tail sentence is a bare period (zh '。' carries full-width punctuation)
    'pat.fa3b',
  ]);
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

/** Bead universe (user call, 2026-10-30): every catalog name, tagline and
 *  color word must carry zh/ko translations before the build ships — a new
 *  pattern that forgets its dictionary rows fails here, not in prod. */
describe('bead i18n coverage', () => {
  it('every pattern name translates in zh and ko', () => {
    for (const p of BEAD_PATTERNS) {
      expect(BEAD_NAMES.zh[p.name], p.slug).toBeTruthy();
      expect(BEAD_NAMES.ko[p.name], p.slug).toBeTruthy();
    }
  });

  it('every tagline parses into a template and every color word translates', () => {
    for (const p of BEAD_PATTERNS) {
      const tag = parseTagline(p.tagline);
      expect(tag, p.slug).not.toBeNull();
      for (const v of Object.values(tag!.args)) {
        if (/^\d[\d,]*$/.test(v)) continue;
        expect(BEAD_COLORS.zh[v.toLowerCase()], `${p.slug}:${v}`).toBeTruthy();
        expect(BEAD_COLORS.ko[v.toLowerCase()], `${p.slug}:${v}`).toBeTruthy();
      }
    }
  });

  it('every Perler palette color and region label translates', () => {
    for (const b of PALETTE_LINE) {
      expect(BEAD_COLORS.zh[b.name.toLowerCase()], b.code).toBeTruthy();
      expect(BEAD_COLORS.ko[b.name.toLowerCase()], b.code).toBeTruthy();
    }
    for (const p of BEAD_PATTERNS) {
      for (const r of Object.values(p.regions)) {
        expect(BEAD_COLORS.zh[r.label.toLowerCase()], `${p.slug}:${r.label}`).toBeTruthy();
        expect(BEAD_COLORS.ko[r.label.toLowerCase()], `${p.slug}:${r.label}`).toBeTruthy();
      }
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

  it('footer: guides and beads columns swap every link in zh (user call, batch 4)', async () => {
    const { document, mod } = await loadPage('index.html');
    mod.setLang('zh');
    const footer = document.querySelector('.site-footer')!;
    // color-guides column: 18 guide links take guide.<slug>
    const guidesCol = footer.querySelector('[data-i18n="foot.guides"]')?.parentElement;
    const guideLinks = [...(guidesCol?.querySelectorAll('a') ?? [])].map((a) => a.textContent);
    expect(guideLinks).toContain('什么颜色能调出棕色');
    expect(guideLinks).toContain('酒红色配什么颜色好看');
    expect(guideLinks.every((t) => /[一-鿿]/.test(t ?? ''))).toBe(true);
    // beads column: every link (hub, categories, collections, tools) swaps
    const beadsCol = footer.querySelector('[data-i18n="foot.beads"]')?.parentElement;
    const beadLinks = [...(beadsCol?.querySelectorAll('a') ?? [])].map((a) => a.textContent);
    expect(beadLinks).toContain('免费拼豆图纸');
    expect(beadLinks).toContain('可爱拼豆图纸');
    expect(beadLinks.every((t) => /[一-鿿]/.test(t ?? ''))).toBe(true);
  });

  it('bead category page: group label, card names, taglines all swap in zh (user call, batch 5)', async () => {
    const { document, mod } = await loadPage('perler-bead-animals/index.html');
    mod.setLang('zh');
    // the group header the user screenshotted: "Animal patterns — 52 张"
    expect(document.querySelector('.gallery h2 [data-i18n="bs.catAn"]')?.textContent).toBe('动物图纸');
    const first = document.querySelector('.pattern-card')!;
    expect(first.querySelector('.card-name')?.textContent).toBe('紫蝴蝶');
    expect(first.querySelector('.card-tag')?.textContent).toBe(
      '61 颗珠、2 种颜色，主要是李子紫和霜彩丁香紫。',
    );
    const names = [...document.querySelectorAll('.card-name')].map((n) => n.textContent);
    expect(names.length).toBeGreaterThan(40);
    expect(names.every((n) => /[一-鿿]/.test(n ?? ''))).toBe(true);
    const tags = [...document.querySelectorAll('.card-tag')].map((n) => n.textContent);
    expect(tags.every((n) => /[一-鿿]/.test(n ?? ''))).toBe(true);
  });

  it('pattern detail: crumbs, h1, lead, zones, steps, FAQ, bead list swap in zh', async () => {
    const { document, mod } = await loadPage('perler-bead-animals/purple-butterfly/index.html');
    mod.setLang('zh');
    expect(document.querySelector('h1')?.textContent).toContain('紫蝴蝶');
    expect(document.querySelector('.lead')?.textContent).toContain('占 11 × 8 格');
    const crumbs = [...document.querySelectorAll('.crumbs a')].map((a) => a.textContent);
    expect(crumbs).toContain('免费拼豆图纸');
    expect(crumbs).toContain('动物');
    expect(document.querySelector('.zone-label')?.textContent).toBe('李子紫');
    expect(document.querySelector('.steps')?.textContent).toContain('备珠');
    expect(document.querySelector('.steps')?.textContent).toContain('两面熨');
    const faq = document.querySelector('.faq')?.textContent ?? '';
    expect(faq).toContain('紫蝴蝶图纸需要多少颗珠子？');
    expect(faq).toContain('。成品宽约 2.2 英寸。');
    // the SSR materials list swaps too (the runtime rebuild carries the same attrs)
    expect(document.querySelector('[data-bead-list]')?.textContent).toContain('李子紫');
    expect(document.querySelector('.related-name')?.textContent ?? '').toMatch(/[一-鿿]/);
    // round trip: the en template rebuilds the exact SSR blurb (unit included)
    mod.setLang('en');
    expect(document.querySelector('.lead')?.textContent).toContain(
      'The Purple Butterfly spans 11 × 8 beads — about 2.2 inches wide on the board',
    );
    expect(document.querySelector('.faq')?.textContent).toContain(
      '. The finished piece measures about 2.2 in wide.',
    );
  });

  it('easy gallery: every group label swaps in zh', async () => {
    const { document, mod } = await loadPage('easy-perler-bead-patterns/index.html');
    mod.setLang('zh');
    const labels = [...document.querySelectorAll('.gallery h2 [data-i18n^="bs.ez"]')].map(
      (h) => h.textContent,
    );
    expect(labels).toContain('从这里开始——迷你款');
    expect(labels.length).toBeGreaterThan(3);
  });

  it('scenario + outfit pages swap h1 and crumb tail in zh (batch 5)', async () => {
    const scn = await loadPage('what-colors-make-brown/index.html');
    scn.mod.setLang('zh');
    expect(scn.document.querySelector('h1')?.textContent).toBe('什么颜色能调出棕色');
    const outfit = await loadPage('what-colors-go-with-burgundy/index.html');
    outfit.mod.setLang('zh');
    expect(outfit.document.querySelector('h1')?.textContent).toBe('酒红色配什么颜色好看');
  });
});
