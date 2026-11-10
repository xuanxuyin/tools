/**
 * Global delegated copy handler (~1KB). Any element with [data-copy] copies
 * its current attribute value and flashes "Copied" feedback; [data-copy-link]
 * copies the live page URL (islands keep the query string current, so the
 * link carries the user's exact colors/ratios).
 */
import { t } from './i18n';

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement | null)?.closest<HTMLElement>('.btn-copy');
  if (!btn) return;
  const isLink = btn.hasAttribute('data-copy-link');
  const value = isLink ? window.location.href : btn.getAttribute('data-copy');
  if (!value) return;
  void copyText(value).then((ok) => {
    if (!ok) return;
    // swap ONLY the label span — the copy/check icon pair around it must
    // survive the flash (buttons render two Lucide icons outside the
    // [data-i18n] span; wiping textContent would delete them permanently)
    const label = btn.querySelector<HTMLElement>('.copy-label');
    const orig = btn.getAttribute('data-orig-text') ?? (label ?? btn).textContent ?? 'Copy';
    btn.setAttribute('data-orig-text', orig);
    const target = label ?? btn;
    target.textContent = t('btn.copied');
    btn.classList.add('copied');
    window.setTimeout(() => {
      target.textContent = orig;
      btn.classList.remove('copied');
    }, 1500);
  });
});
