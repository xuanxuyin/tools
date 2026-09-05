/**
 * Global delegated handlers — no per-page wiring.
 *
 * 1. [data-print]            -> window.print()
 * 2. [data-fact-table] cells -> copy the cell's precomputed data-fact sentence
 *                               into the sibling .fact-line (SSR already holds a
 *                               meaningful default; the island only swaps text).
 */

function setFact(table: HTMLElement, fact: string): void {
  const scope = table.closest('[data-fact-scope]') ?? document;
  const line = scope.querySelector('.fact-line');
  if (line) line.textContent = fact;
}

function clearFact(table: HTMLElement, fallback: string | null): void {
  if (!fallback) return;
  setFact(table, fallback);
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target.closest('[data-print]')) {
    window.print();
    return;
  }

  const table = target.closest<HTMLElement>('[data-fact-table]');
  if (!table) return;

  const cell = target.closest<HTMLElement>('[data-fact]');
  const fallback = table.getAttribute('data-fact-default');
  table.querySelectorAll('.is-active').forEach((el) => el.classList.remove('is-active'));

  if (cell) {
    cell.classList.add('is-active');
    setFact(table, cell.getAttribute('data-fact') ?? '');
  } else {
    clearFact(table, fallback);
  }
});
