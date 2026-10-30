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
import { comboReadParts, ladderFrom } from '../lib/pairingRead';
import { t, tArgs, tg } from './i18n';

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
      chip.setAttribute('aria-label', tArgs('of.pickerUse', { h: hex }));
      picker.appendChild(chip);
    }

    const customLabel = document.createElement('label');
    customLabel.className = 'picker-custom';
    const input = document.createElement('input');
    input.type = 'color';
    input.dataset.custom = '';
    input.value = '#808080';
    input.setAttribute('aria-label', t('of.pickerCustomAria'));
    customLabel.appendChild(input);
    customLabel.append(t('of.pickerCustom'));
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

    // advisory label, rebuilt in the CURRENT language; the new nodes carry
    // their i18n keys (+ pre-seeded data-i18n-en) so a later language
    // switch still finds and re-translates them
    const label = li.dataset.label ?? '';
    const labelKey = li.dataset.labelKey ?? '';
    const displayLabel = labelKey ? tg(labelKey, label) : label;
    const labelEl = li.querySelector('.combo-label');
    if (labelEl) {
      const name = nearestColorName(hexToRgb(hex)).name;
      labelEl.replaceChildren();
      const text = document.createElement('span');
      if (labelKey) {
        text.dataset.i18n = labelKey;
        text.dataset.i18nEn = label;
      }
      text.textContent = displayLabel;
      labelEl.appendChild(text);
      if (!label.toLowerCase().includes(name.toLowerCase())) {
        const em = document.createElement('em');
        em.append(' · ');
        const nm = document.createElement('span');
        nm.dataset.i18n = 'cn.nameT';
        nm.dataset.i18nArgs = JSON.stringify({ v: name });
        nm.textContent = tArgs('cn.nameT', { v: name });
        em.appendChild(nm);
        labelEl.appendChild(em);
      }
    }

    const hexBtn = li.querySelector<HTMLButtonElement>('.combo-hex');
    if (hexBtn) {
      hexBtn.textContent = hex;
      hexBtn.dataset.copy = hex;
      hexBtn.dataset.i18nArgs = JSON.stringify({ label: displayLabel });
      hexBtn.setAttribute('aria-label', tArgs('of.copyAria', { label: displayLabel }));
    }

    // the figure: every part tagged with this role takes the new color
    const role = li.dataset.role;
    if (role) {
      this.card.querySelectorAll<SVGElement>(`[data-part="${role}"]`).forEach((el) => {
        el.setAttribute(el.dataset.attr === 'stroke' ? 'stroke' : 'fill', hex);
      });
    }

    const read = this.card.querySelector<HTMLElement>('.combo-read');
    if (read) {
      const parts = { ...comboReadParts(this.hexes) };
      read.dataset.i18nArgs = JSON.stringify(parts);
      read.textContent = tArgs('of.readT', parts);
    }

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
