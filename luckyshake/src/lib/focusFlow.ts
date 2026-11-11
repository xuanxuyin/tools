/**
 * Focus panel (PRODUCT.md 流程规范 v1.2): AFTER the draw, the visitor names
 * what they asked about — exactly ONE of love / money / career, or one
 * question in their own words.
 * 👤 11/08: the choice is ONE-SHOT. Once the answer is revealed the panel
 * locks — no switching lenses on the same sign. One question, one answer;
 * shake again to ask something else.
 */
import type { Focus } from './reading';

export function focusPanelHTML(lang: 'en' | 'zh' = 'en'): string {
  const zh = lang === 'zh';
  return `
  <div class="focus-panel" data-focus-panel data-lang="${lang}">
    <p class="focus-q">${zh ? '现在——你问的是哪件事？' : 'Now — what did you ask about?'}</p>
    <div class="focus-chips">
      <button type="button" class="fchip" data-focus="love">❤️ ${zh ? '感情' : 'Love'}</button>
      <button type="button" class="fchip" data-focus="money">💰 ${zh ? '财运' : 'Money'}</button>
      <button type="button" class="fchip" data-focus="career">💼 ${zh ? '事业' : 'Career'}</button>
    </div>
    <p class="focus-or">${zh ? '或者自己写一句——只能选一样' : 'or ask in your own words — just one'}</p>
    <div class="focus-own">
      <input class="q-input" data-q type="text" maxlength="80"
        placeholder="${zh ? '写下你的问题——只留在你的设备里' : 'Type your question — it stays on your device'}"
        aria-label="${zh ? '你的问题' : 'Your question'}" />
      <button type="button" class="btn small" data-reveal>${zh ? '揭示答案' : 'Reveal my answer'}</button>
    </div>
    <div class="focus-answer" data-answer></div>
  </div>`;
}

/**
 * Wire the panel inside `scope`. `onPick(focus, ownText)` fires ONCE —
 * ownText is non-empty only for focus === 'own'. After the first pick the
 * panel locks (chips/input removed, lock line shown). Custom text is
 * rendered via youAsked (escaped) inside renderFocusedReading.
 */
export function wireFocusPanel(
  scope: ParentNode,
  onPick: (focus: Focus, ownText: string) => void,
): void {
  const panel = scope.querySelector<HTMLElement>('[data-focus-panel]');
  if (!panel) return;
  const zh = panel.dataset.lang === 'zh';
  const chips = Array.from(panel.querySelectorAll<HTMLButtonElement>('[data-focus]'));
  const input = panel.querySelector<HTMLInputElement>('[data-q]');
  const reveal = panel.querySelector<HTMLButtonElement>('[data-reveal]');
  const clearChips = () => chips.forEach((c) => c.classList.remove('active'));
  let locked = false;
  /** 👤 11/08: one-shot reveal — the chooser collapses into a lock line */
  const lock = () => {
    locked = true;
    panel.classList.add('locked');
    chips.forEach((c) => (c.disabled = true));
    if (input) input.disabled = true;
    if (reveal) reveal.disabled = true;
    panel.querySelector('.focus-chips')?.remove();
    panel.querySelector('.focus-or')?.remove();
    panel.querySelector('.focus-own')?.remove();
    const q = panel.querySelector('.focus-q');
    if (q) q.textContent = zh
      ? '一事一签——想问别的，再摇一次。'
      : 'One question, one answer — shake again to ask something else.';
  };
  const submitOwn = () => {
    if (locked) return;
    const t = (input?.value ?? '').trim().slice(0, 80);
    if (!t) {
      input?.focus();
      return;
    }
    clearChips();
    lock();
    onPick('own', t);
  };
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      if (locked) return;
      clearChips();
      if (input) input.value = '';
      chip.classList.add('active');
      lock();
      onPick(chip.dataset.focus as Focus, '');
    }),
  );
  // typing anything cancels the chip selection — one question, one answer
  input?.addEventListener('input', () => {
    if (!locked && input.value.trim()) clearChips();
  });
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitOwn();
    }
  });
  reveal?.addEventListener('click', submitOwn);
}
