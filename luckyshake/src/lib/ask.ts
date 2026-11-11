/**
 * Question-first ritual helpers (PRODUCT.md v1.1): every tool asks before it
 * answers. The visitor's question is echoed above the reading — it is raw
 * user input rendered into innerHTML, so it MUST go through escapeHtml.
 */

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

/** Read the optional question box on this page (trimmed, capped). */
export function readQuestion(): string {
  const el = document.querySelector<HTMLInputElement>('[data-q]');
  return (el?.value ?? '').trim().slice(0, 80);
}

/** "You asked: …" echo line for the top of an outcome block. Empty if no question. */
export function youAsked(q: string, lang: 'en' | 'zh' = 'en'): string {
  const t = q.trim().slice(0, 80);
  if (!t) return '';
  const label = lang === 'zh' ? '你的问题' : 'You asked';
  const quote = lang === 'zh' ? '「」' : '“”';
  return `<p class="you-asked">${label}: ${quote[0]}${escapeHtml(t)}${quote[1]}</p>`;
}
