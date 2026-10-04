/**
 * Hue test island. The SSR shell ships a complete, scored demo (zero-JS
 * content); this script only takes over interaction: tap-two-tiles-to-swap,
 * reshuffle, reset, and grading — which redraws the polar error fan in place
 * (spokes are keyed by tile id, so no DOM rebuilds).
 */
import { tierFor } from '../lib/hueTest';

const POLAR_CX = 170;
const POLAR_CY = 170;
const POLAR_R0 = 14; // error 0 still shows a nub at the hub
const POLAR_UNIT = 14; // radius per error unit (max error 10 → r 154)

function spokeEndpoint(hueDeg: number, error: number): { x: number; y: number } {
  const rad = ((hueDeg - 90) * Math.PI) / 180; // 0° hue at 12 o'clock
  const r = POLAR_R0 + error * POLAR_UNIT;
  return { x: POLAR_CX + r * Math.cos(rad), y: POLAR_CY + r * Math.sin(rad) };
}

class HueTestIsland {
  private root: HTMLElement;
  private rows: HTMLElement[];
  private spokes: SVGGElement[];
  private selected: HTMLButtonElement | null = null;
  private initialOrders: Map<HTMLElement, HTMLButtonElement[]>;

  constructor(root: HTMLElement) {
    this.root = root;
    this.rows = [...root.querySelectorAll<HTMLElement>('[data-tiles]')];
    this.spokes = [...root.querySelectorAll<SVGGElement>('.spoke')];
    this.initialOrders = new Map(
      this.rows.map((r) => [r, [...r.querySelectorAll<HTMLButtonElement>('.hue-tile')]]),
    );
    this.bind();
  }

  private bind() {
    this.root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const tile = target.closest<HTMLButtonElement>('.hue-tile');
      if (tile) {
        this.tap(tile);
        return;
      }
      if (target.closest('[data-hue-score]')) this.grade();
      else if (target.closest('[data-hue-shuffle]')) this.reshuffle();
      else if (target.closest('[data-hue-reset]')) this.reset();
    });
  }

  /** Tap two tiles to swap them; tap the selected one again to let go. */
  private tap(tile: HTMLButtonElement) {
    if (!this.selected) {
      this.selected = tile;
      tile.classList.add('is-selected');
      tile.setAttribute('aria-pressed', 'true');
      return;
    }
    if (this.selected === tile) {
      this.clearSelection();
      return;
    }
    this.swap(this.selected, tile);
    this.clearSelection();
  }

  private clearSelection() {
    if (this.selected) {
      this.selected.classList.remove('is-selected');
      this.selected.setAttribute('aria-pressed', 'false');
      this.selected = null;
    }
  }

  private swap(a: HTMLElement, b: HTMLElement) {
    const marker = document.createTextNode('');
    a.replaceWith(marker);
    b.replaceWith(a);
    marker.replaceWith(b);
  }

  private reshuffle() {
    this.clearSelection();
    for (const rowEl of this.rows) {
      const tiles = [...rowEl.querySelectorAll<HTMLButtonElement>('.hue-tile')];
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if (i !== j) this.swap(tiles[i]!, tiles[j]!);
      }
    }
  }

  private reset() {
    this.clearSelection();
    // initialOrders is the shipped (seeded) shuffle snapshotted at boot —
    // re-appending in that order restores it exactly.
    for (const [rowEl, order] of this.initialOrders) {
      for (const tile of order) rowEl.appendChild(tile);
    }
  }

  /** Per-tile error = how many slots the tile sits from its home slot. */
  private tileError(tile: HTMLButtonElement, slot: number): number {
    return Math.abs(slot - Number(tile.dataset.true));
  }

  private grade() {
    let total = 0;
    const perRow: number[] = [];
    for (const rowEl of this.rows) {
      let rowTotal = 0;
      [...rowEl.querySelectorAll<HTMLButtonElement>('.hue-tile')].forEach((tile, slot) => {
        const error = this.tileError(tile, slot);
        rowTotal += error;
        const spoke = this.spokes.find((s) => s.dataset.id === tile.dataset.id);
        if (spoke) this.drawSpoke(spoke, Number(tile.dataset.hue), error);
      });
      perRow.push(rowTotal);
      total += rowTotal;
    }

    const tier = tierFor(total);
    const panel = this.root.querySelector<HTMLElement>('[data-hue-result]');
    if (panel) {
      panel.hidden = false;
      const totalEl = panel.querySelector<HTMLElement>('[data-result-total]');
      if (totalEl) totalEl.textContent = String(total);
      const tierEl = panel.querySelector<HTMLElement>('[data-result-tier]');
      if (tierEl) tierEl.textContent = tier.label;
      const blurbEl = panel.querySelector<HTMLElement>('[data-result-blurb]');
      if (blurbEl) blurbEl.textContent = tier.blurb;
      perRow.forEach((rowTotal, i) => {
        const el = panel.querySelector<HTMLElement>(`[data-result-row="${i}"]`);
        if (el) el.textContent = String(rowTotal);
      });
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  private drawSpoke(spoke: SVGGElement, hue: number, error: number) {
    const { x, y } = spokeEndpoint(hue, error);
    const line = spoke.querySelector<SVGLineElement>('line');
    if (line) {
      line.setAttribute('x2', x.toFixed(1));
      line.setAttribute('y2', y.toFixed(1));
    }
    const dot = spoke.querySelector<SVGCircleElement>('circle');
    if (dot) {
      dot.setAttribute('cx', x.toFixed(1));
      dot.setAttribute('cy', y.toFixed(1));
    }
  }
}

document.querySelectorAll<HTMLElement>('[data-hue-test]').forEach((el) => new HueTestIsland(el));
