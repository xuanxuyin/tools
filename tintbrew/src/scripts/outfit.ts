/**
 * Outfit combo island. The SSR shell already shows ten complete outfits
 * with computed reads; this script only adds the swap interaction: click
 * any swatch chip, pick any color already used on this page (or a custom
 * one), and the figure, the nearest-name sublabel, the Oklab read, and
 * the ladder all recompute live from the same engine used at build time
 * (lib/pairingRead.ts — a vitest parity test keeps the two in lockstep).
 */
import { hexToRgb, normalizeHex } from '../lib/color';
import { nearestColorName } from '../lib/colorName';
import { comboReadHexes, ladderFrom } from '../lib/pairingRead';

const PRESET_CAP = 18;

let openPicker: { li: Element; btn: HTMLButtonElement } | null = null;

function closePicker() {
  if (!openPicker) return;
  openPicker.li.querySelector('.combo-picker')?.remove();
  openPicker.btn.setAttribute('aria-expanded', 'false');
  openPicker = null;
}

class OutfitCard {
  private hexes: string[];

  constructor(
    private card: HTMLElement,
    private presets: string[],
  ) {
    this.hexes = Array.from(card.querySelectorAll<HTMLButtonElement>('.combo-hex')).map(
      (b) => b.dataset.copy ?? '#808080',
    );
    card.addEventListener('click', (e) => this.onClick(e));
  }

  private onClick(e: Event) {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const swapBtn = target.closest<HTMLButtonElement>('[data-swap]');
    if (swapBtn) {
      const li = swapBtn.closest('li')!;
      if (openPicker && openPicker.li === li) {
        closePicker();
      } else {
        closePicker();
        this.openPicker(li, swapBtn);
      }
      return;
    }

    const chip = target.closest<HTMLElement>('[data-preset]');
    if (chip?.dataset.preset) {
      this.apply(chip.closest<HTMLLIElement>('li')!, chip.dataset.preset);
      closePicker();
      return;
    }

    const custom = target.closest<HTMLInputElement>('[data-custom]');
    if (custom) {
      // fires continuously while the native picker is open — live preview
      const hex = normalizeHex(custom.value);
      if (hex) this.apply(custom.closest<HTMLLIElement>('li')!, hex);
      return;
    }

    if (!target.closest('.combo-picker')) closePicker();
  }

  private openPicker(li: Element, btn: HTMLButtonElement) {
    const picker = document.createElement('div');
    picker.className = 'combo-picker no-print';

    for (const hex of this.presets) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'picker-chip';
      chip.dataset.preset = hex;
      chip.style.background = hex;
      chip.title = hex;
      chip.setAttribute('aria-label', `Use ${hex}`);
      picker.appendChild(chip);
    }

    const customLabel = document.createElement('label');
    customLabel.className = 'picker-custom';
    const input = document.createElement('input');
    input.type = 'color';
    input.dataset.custom = '';
    input.value = '#808080';
    input.setAttribute('aria-label', 'Pick a custom color');
    customLabel.appendChild(input);
    customLabel.append('custom');
    picker.appendChild(customLabel);

    li.appendChild(picker);
    btn.setAttribute('aria-expanded', 'true');
    openPicker = { li, btn };
  }

  /** Recolor one item and recompute everything derived from the hexes. */
  private apply(li: HTMLElement, hex: string) {
    const idx = Number(li.dataset.index);
    if (!Number.isInteger(idx) || !this.hexes[idx]) return;
    this.hexes[idx] = hex;

    const chip = li.querySelector<HTMLElement>('.combo-swatch');
    if (chip) chip.style.background = hex;

    const hexBtn = li.querySelector<HTMLButtonElement>('.combo-hex');
    if (hexBtn) {
      hexBtn.textContent = hex;
      hexBtn.dataset.copy = hex;
      hexBtn.setAttribute('aria-label', `Copy ${li.dataset.label ?? 'item'} hex code`);
    }

    // advisory nearest-name sublabel, same dedup rule as the template
    const label = li.dataset.label ?? '';
    const labelEl = li.querySelector('.combo-label');
    if (labelEl) {
      const name = nearestColorName(hexToRgb(hex)).name;
      labelEl.replaceChildren(label);
      if (!label.toLowerCase().includes(name.toLowerCase())) {
        const em = document.createElement('em');
        em.textContent = ` · ${name}`;
        labelEl.appendChild(em);
      }
    }

    // the figure: every part tagged with this role takes the new color
    const role = li.dataset.role;
    if (role) {
      this.card.querySelectorAll<SVGElement>(`[data-part="${role}"]`).forEach((el) => {
        el.setAttribute(el.dataset.attr === 'stroke' ? 'stroke' : 'fill', hex);
      });
    }

    const read = this.card.querySelector<HTMLElement>('.combo-read');
    if (read) read.textContent = comboReadHexes(this.hexes);

    const ladder = this.card.querySelector<HTMLElement>('.combo-ladder');
    if (ladder) {
      ladderFrom(this.hexes).forEach((h, i) => {
        const span = ladder.children[i];
        if (span) (span as HTMLElement).style.background = h;
      });
    }
  }
}

function init() {
  const cards = document.querySelectorAll<HTMLElement>('.combo-card');
  if (!cards.length) return;

  // swap palette = every color already used by this page's combos
  const seen = new Set<string>();
  document.querySelectorAll<HTMLButtonElement>('.combo-hex').forEach((b) => {
    if (b.dataset.copy) seen.add(b.dataset.copy);
  });
  const presets = Array.from(seen).slice(0, PRESET_CAP);

  cards.forEach((card) => new OutfitCard(card, presets));

  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement | null;
    if (!t?.closest('.combo-picker') && !t?.closest('[data-swap]')) closePicker();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePicker();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
