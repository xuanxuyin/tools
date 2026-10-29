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
import { UI_STRINGS, LANGS, type Lang, type UiKey } from '../data/uiStrings';
const STORE_KEY = 'tb-lang';
const HTML_LANG: Record<Lang, string> = { en: 'en', zh: 'zh-CN', ko: 'ko' };

let lang: Lang = 'en';

export function currentLang(): Lang {
  return lang;
}

export function t(key: UiKey): string {
  return UI_STRINGS[lang][key] ?? UI_STRINGS.en[key] ?? key;
}

/** Swap every tagged node under `root` to the active language. A node may
 *  carry data-i18n-args='{"name":"Panda"}' — {name} placeholders in the
 *  dictionary string fill from it, so word order can differ per language
 *  ("How to make the X" vs "X 怎么做"). */
function apply(root: ParentNode = document) {
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const key = el.dataset.i18n as UiKey;
    const s = UI_STRINGS[lang][key];
    if (!s) continue;
    let args: Record<string, string> | undefined;
    try {
      args = el.dataset.i18nArgs ? (JSON.parse(el.dataset.i18nArgs) as Record<string, string>) : undefined;
    } catch {
      args = undefined;
    }
    el.textContent = args
      ? s.replace(/\{(\w+)\}/g, (_, k: string) => args![k] ?? `{${k}}`)
      : s;
  }
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n-aria]')) {
    const key = el.dataset.i18nAria as UiKey;
    const s = UI_STRINGS[lang][key];
    if (s) el.setAttribute('aria-label', s);
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
