/**
 * In-page language switch. The SSR document is always the English edition
 * (one URL, one canonical — Google US untouched); this module swaps UI
 * chrome text in place for visitors who picked 中文 / 한국어.
 *
 * Two cooperating mechanisms:
 *  - data-i18n="key" / data-i18n-aria="key" on any node: apply() rewrites
 *    textContent / aria-label. Runs once at load and again on every switch,
 *    so runtime-built controls (photoBead's action buttons) are covered as
 *    long as they carry the attribute.
 *  - t(key): runtime builders read the CURRENT language when they first
 *    create a node, so controls born after a switch are correct too.
 *
 * LangSwitch.astro owns the visible control; this module owns state.
 */
import { UI_STRINGS, MIX_RESULTS, LANGS, type Lang, type UiKey } from '../data/uiStrings';
import { BEAD_NAMES, BEAD_COLORS } from '../data/beadI18n';
import { COLOR_NAMES } from '../data/colorNamesI18n';
import { GUIDE_TEXTS } from '../data/guideTexts';
const STORE_KEY = 'tb-lang';
const HTML_LANG: Record<Lang, string> = { en: 'en', zh: 'zh-CN', ko: 'ko' };

let lang: Lang = 'en';

export function currentLang(): Lang {
  return lang;
}

export function t(key: UiKey): string {
  return UI_STRINGS[lang][key] ?? UI_STRINGS.en[key] ?? key;
}

/** Fill {name} placeholders in dictionary string `s`. Placeholder VALUES that
 *  name a color, a difficulty enum, an outfit role, a hand-written
 *  mix-result phrase, a bead pattern name, or a Perler color resolve through
 *  their dictionaries, so "red" renders as 红 / 빨강, "easy" as 简单,
 *  "purple (a muted violet)" as 紫色（偏灰的紫罗兰）, and "Purple Butterfly"
 *  as 紫蝴蝶 automatically; a capitalized arg ("Red" in "Red + Blue") stays
 *  capitalized after resolution. */
function fillArgs(s: string, args: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k: string) => {
    const v = args[k];
    if (v === undefined) return `{${k}}`;
    const lower = v.toLowerCase();
    const resolved =
      UI_STRINGS[lang][`color.${lower}` as UiKey] ??
      UI_STRINGS[lang][`diff.${lower}` as UiKey] ??
      UI_STRINGS[lang][`role.${v}` as UiKey] ??
      UI_STRINGS[lang][`cat.${lower}` as UiKey] ??
      UI_STRINGS[lang][`pr.${lower}` as UiKey] ??
      UI_STRINGS[lang][v as UiKey] ??
      (lang === 'en' ? undefined : MIX_RESULTS[lang][v]) ??
      (lang === 'en' ? undefined : BEAD_NAMES[lang][v] ?? BEAD_COLORS[lang][lower]) ??
      (lang === 'en' ? undefined : COLOR_NAMES[lang][lower]) ??
      v;
    return v[0] === v[0]!.toUpperCase() && resolved[0] !== resolved[0]!.toUpperCase()
      ? resolved[0]!.toUpperCase() + resolved.slice(1)
      : resolved;
  });
}

/** t() with {placeholders} — runtime builders (mixer ratio line, swap
 *  controls) pass computed values through the same resolution chain. */
export function tArgs(key: UiKey, args: Record<string, string>): string {
  return fillArgs(UI_STRINGS[lang][key] ?? UI_STRINGS.en[key] ?? key, args);
}

/** Keyed string read for runtime builders that rebuild SSR-tagged nodes
 *  (outfit swap): guide keys (gw./ow.) come from GUIDE_TEXTS with `en` as
 *  the caller-supplied SSR fallback, anything else is a UI key via t(). */
export function tg(key: string, en: string): string {
  if (GUIDE_KEY.test(key)) return lang === 'en' ? en : GUIDE_TEXTS[lang][key] ?? en;
  return UI_STRINGS[lang][key as UiKey] ?? en;
}

function fill(el: HTMLElement, s: string): string {
  let args: Record<string, string> | undefined;
  try {
    args = el.dataset.i18nArgs ? (JSON.parse(el.dataset.i18nArgs) as Record<string, string>) : undefined;
  } catch {
    args = undefined;
  }
  return args ? fillArgs(s, args) : s;
}

/** Guide-content keys (gw./ow. — the long hand-written page copy from
 *  data/scenarios.ts + outfitPalettes.ts). Their English edition is NOT in
 *  the client bundle: the first pass snapshots each node's SSR text into
 *  data-i18n-en, and switching back to English restores that snapshot —
 *  byte-identical to what the server shipped. */
const GUIDE_KEY = /^(gw|ow)\./;

/** Swap every tagged node under `root` to the active language. A node may
 *  carry data-i18n-args='{"name":"Panda"}' — {name} placeholders in the
 *  dictionary string fill from it, so word order can differ per language
 *  ("How to make the X" vs "X 怎么做"). All four mechanisms (text, aria,
 *  placeholder, title) share the same args handling. */
/** Attribute strings may name guide copy too (method-chip tooltips). Guide
 *  keys are not in UI_STRINGS: snapshot the SSR attribute on first sight
 *  (data-i18n-attr-en) and restore it for en, mirroring the textContent
 *  snapshot in apply(). */
function attrString(el: HTMLElement, attr: string, key: string): string | undefined {
  if (GUIDE_KEY.test(key)) {
    if (el.dataset.i18nAttrEn === undefined) el.dataset.i18nAttrEn = el.getAttribute(attr) ?? '';
    return lang === 'en' ? el.dataset.i18nAttrEn || undefined : GUIDE_TEXTS[lang][key];
  }
  return UI_STRINGS[lang][key as UiKey];
}

function apply(root: ParentNode = document) {
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const key = el.dataset.i18n as string;
    if (GUIDE_KEY.test(key)) {
      if (el.dataset.i18nEn === undefined) el.dataset.i18nEn = el.textContent ?? '';
      if (lang === 'en') {
        el.textContent = fill(el, el.dataset.i18nEn);
      } else {
        const s = GUIDE_TEXTS[lang][key];
        if (s) el.textContent = fill(el, s);
      }
      continue;
    }
    const s = UI_STRINGS[lang][key as UiKey];
    if (!s) continue;
    el.textContent = fill(el, s);
  }
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n-aria]')) {
    const s = attrString(el, 'aria-label', el.dataset.i18nAria as string);
    if (s) el.setAttribute('aria-label', fill(el, s));
  }
  // inputs carry translatable placeholder / title attributes the same way
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n-placeholder]')) {
    const s = attrString(el, 'placeholder', el.dataset.i18nPlaceholder as string);
    if (s) el.setAttribute('placeholder', fill(el, s));
  }
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n-title]')) {
    const s = attrString(el, 'title', el.dataset.i18nTitle as string);
    if (s) el.setAttribute('title', fill(el, s));
  }
  document.documentElement.lang = HTML_LANG[lang];
  for (const btn of document.querySelectorAll<HTMLElement>('[data-lang]')) {
    btn.setAttribute('aria-current', btn.dataset.lang === lang ? 'true' : 'false');
  }
  // the pill shows the ACTIVE language's own name (English / 简体中文 /
  // 한국어) — textContent, not a data-i18n node, because it is not a
  // translated string (competitor pattern)
  const current = LANGS.find((l) => l.code === lang);
  if (current) {
    for (const el of document.querySelectorAll<HTMLElement>('.lang-current')) {
      el.textContent = current.label;
    }
  }
}

export function setLang(next: Lang) {
  lang = next;
  try {
    localStorage.setItem(STORE_KEY, next);
  } catch {
    /* private mode — language lasts for this page view only */
  }
  apply();
}

function init() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORE_KEY);
  } catch {
    /* ignore */
  }
  lang = LANGS.some((l) => l.code === stored) ? (stored as Lang) : 'en';
  if (lang !== 'en') apply();

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest<HTMLElement>('[data-lang]');
    if (btn) {
      const next = btn.dataset.lang as Lang;
      if (LANGS.some((l) => l.code === next)) setLang(next);
      // close the dropdown after picking
      btn.closest('details')?.removeAttribute('open');
    }
  });
}

init();
