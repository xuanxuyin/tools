/**
 * Scoped printing. A button declares which block it means to print via
 * data-print-zone="reference|blank|preview"; this tags <html> with the
 * matching data attribute right before window.print() so @media print
 * rules can show only that block (see the global <style is:global> blocks
 * in BeadPatternPage / photo-to-perler-bead-pattern — scoped styles cannot
 * reach the runtime-built DOM). afterprint clears the tag; the direct
 * cleanup call covers engines where the dialog never blocks.
 */
export function printZone(zone: string) {
  const root = document.documentElement;
  root.dataset.printZone = zone;
  const cleanup = () => delete root.dataset.printZone;
  window.addEventListener('afterprint', cleanup, { once: true });
  window.print();
  cleanup();
}
