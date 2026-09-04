/**
 * Global delegated copy handler (~1KB). Any element with [data-copy] copies
 * its current attribute value and flashes "Copied" feedback.
 */

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
  const value = btn.getAttribute('data-copy');
  if (!value) return;
  void copyText(value).then((ok) => {
    if (!ok) return;
    const orig = btn.getAttribute('data-orig-text') ?? btn.textContent ?? 'Copy';
    btn.setAttribute('data-orig-text', orig);
    btn.textContent = 'Copied ✓';
    btn.classList.add('copied');
    window.setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1500);
  });
});
