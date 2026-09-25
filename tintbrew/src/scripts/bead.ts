/**
 * Bead coloring island. The SSR shell already shows the reference figure,
 * the zone-divided blank template and the default bead list; this script
 * adds the play: tap a zone (legend chip or bead in the template), pick
 * any of the 32 real bead colors or a custom hex (snapped to the nearest
 * bead via the same Oklab engine used at build time), and the template
 * plus the materials list update live. No pattern data is imported —
 * every count comes from the DOM it renders.
 */
import { normalizeHex } from '../lib/color';
import { BEAD_COLORS, beadById, beadListFrom, nearestBead } from '../lib/beadPalette';

interface ZoneState {
  hex: string;
  beadId: string;
  exact: boolean;
}

let openPicker: { chip: HTMLButtonElement; root: HTMLElement } | null = null;

function closePicker() {
  if (!openPicker) return;
  openPicker.chip.querySelector('.bead-picker')?.remove();
  openPicker.chip.setAttribute('aria-expanded', 'false');
  openPicker.chip.classList.remove('zone-open');
  openPicker = null;
}

class BeadStudio {
  private fig: SVGSVGElement | null;
  private list: HTMLElement | null;
  private zones = new Map<string, ZoneState>();

  constructor(private root: HTMLElement) {
    this.fig = root.querySelector<SVGSVGElement>('[data-bead-mode="blank"]');
    this.list = root.querySelector<HTMLElement>('[data-bead-list]');

    for (const chip of root.querySelectorAll<HTMLButtonElement>('[data-zone]')) {
      const key = chip.dataset.zone!;
      this.zones.set(key, {
        hex: chip.dataset.hex ?? '#888888',
        beadId: chip.dataset.beadId ?? '',
        exact: true,
      });
    }

    root.addEventListener('click', (e) => this.onClick(e));
    root.addEventListener('input', (e) => this.onInput(e));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePicker();
    });
  }

  private onClick(e: Event) {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const pick = target.closest<HTMLButtonElement>('[data-bead-pick]');
    if (pick && openPicker) {
      const bead = beadById(pick.dataset.beadPick!);
      if (bead) this.apply(openPicker.chip.dataset.zone!, bead.hex, bead.id, true);
      closePicker();
      return;
    }

    const chip = target.closest<HTMLButtonElement>('[data-zone]');
    if (chip) {
      if (openPicker && openPicker.chip === chip) {
        closePicker();
      } else {
        closePicker();
        this.openPicker(chip);
      }
      return;
    }

    // tapping a bead inside the blank template selects that zone
    const beadEl = target.closest<SVGElement>('[data-bead-mode="blank"] [data-region]');
    if (beadEl) {
      const key = beadEl.dataset.region!;
      const chip = this.root.querySelector<HTMLButtonElement>(`[data-zone="${key}"]`);
      if (chip) {
        closePicker();
        this.openPicker(chip);
        chip.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      return;
    }

    if (target.closest('[data-reset]')) {
      this.reset();
      closePicker();
      return;
    }

    if (target.closest('[data-print]')) {
      window.print();
      return;
    }

    if (!target.closest('.bead-picker')) closePicker();
  }

  /** native color input fires continuously — live preview */
  private onInput(e: Event) {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>('[data-custom]');
    if (!input || !openPicker) return;
    const hex = normalizeHex(input.value);
    if (!hex) return;
    const bead = nearestBead(hex);
    this.apply(openPicker.chip.dataset.zone!, bead.hex, bead.id, bead.hex === hex);
    const hint = openPicker.chip.querySelector('.picker-hint');
    if (hint) {
      hint.textContent =
        bead.hex === hex ? `exact match: ${bead.name}` : `nearest bead: ${bead.name}`;
    }
  }

  private openPicker(chip: HTMLButtonElement) {
    const picker = document.createElement('div');
    picker.className = 'bead-picker no-print';

    const grid = document.createElement('div');
    grid.className = 'picker-grid';
    for (const bead of BEAD_COLORS) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'picker-bead';
      b.dataset.beadPick = bead.id;
      b.style.background = bead.hex;
      b.title = bead.name;
      b.setAttribute('aria-label', `Color zone with ${bead.name}`);
      grid.appendChild(b);
    }
    picker.appendChild(grid);

    const row = document.createElement('label');
    row.className = 'picker-custom';
    const input = document.createElement('input');
    input.type = 'color';
    input.dataset.custom = '';
    input.setAttribute('aria-label', 'Pick a custom color for this zone');
    row.appendChild(input);
    const hint = document.createElement('span');
    hint.className = 'picker-hint';
    hint.textContent = 'custom — snapped to the nearest bead';
    row.appendChild(hint);
    picker.appendChild(row);

    chip.appendChild(picker);
    chip.setAttribute('aria-expanded', 'true');
    chip.classList.add('zone-open');
    openPicker = { chip, root: this.root };
  }

  /** Color one zone and recompute everything derived from the zone colors. */
  private apply(key: string, hex: string, beadId: string, exact: boolean) {
    const zone = this.zones.get(key);
    if (!zone) return;
    zone.hex = hex;
    zone.beadId = beadId;
    zone.exact = exact;

    this.fig
      ?.querySelectorAll<SVGElement>(`.bd-blank[data-region="${key}"]`)
      .forEach((g) => {
        g.classList.add('colored');
        g.style.setProperty('--zone', hex);
      });

    const chip = this.root.querySelector<HTMLButtonElement>(`[data-zone="${key}"]`);
    if (chip) {
      const swatch = chip.querySelector<HTMLElement>('.zone-swatch');
      if (swatch) swatch.style.background = hex;
      const name = chip.querySelector('.zone-bead');
      if (name) {
        const bead = beadById(beadId);
        name.textContent = bead ? bead.name : hex;
        name.classList.toggle('zone-approx', !exact);
      }
    }

    this.renderList();
  }

  private reset() {
    for (const chip of this.root.querySelectorAll<HTMLButtonElement>('[data-zone]')) {
      const key = chip.dataset.zone!;
      const zone = this.zones.get(key)!;
      zone.hex = chip.dataset.defaultHex ?? zone.hex;
      zone.beadId = chip.dataset.beadId ?? zone.beadId;
      zone.exact = true;

      this.fig
        ?.querySelectorAll<SVGElement>(`.bd-blank[data-region="${key}"]`)
        .forEach((g) => {
          g.classList.remove('colored');
          g.style.removeProperty('--zone');
        });

      const swatch = chip.querySelector<HTMLElement>('.zone-swatch');
      if (swatch) swatch.style.background = zone.hex;
      const name = chip.querySelector('.zone-bead');
      if (name) {
        const bead = beadById(zone.beadId);
        name.textContent = bead ? bead.name : zone.hex;
        name.classList.remove('zone-approx');
      }
    }
    this.renderList();
  }

  /** Materials list from the live zone state — same engine as the SSR list. */
  private renderList() {
    if (!this.list) return;
    const regions = [...this.zones.entries()].map(([key, z]) => ({
      hex: z.hex,
      count: Number(this.root.querySelector(`[data-zone="${key}"]`)?.getAttribute('data-count') ?? 0),
    }));
    const entries = beadListFrom(regions);
    this.list.innerHTML = '';
    for (const e of entries) {
      const li = document.createElement('li');
      const swatch = document.createElement('span');
      swatch.className = 'list-swatch';
      swatch.style.background = e.bead.hex;
      const text = document.createElement('span');
      text.textContent = `${e.bead.name} ×${e.count}`;
      if (!e.exact) {
        const approx = document.createElement('em');
        approx.textContent = '≈ custom';
        approx.className = 'list-approx';
        text.appendChild(approx);
      }
      li.appendChild(swatch);
      li.appendChild(text);
      this.list.appendChild(li);
    }
  }
}

for (const el of document.querySelectorAll<HTMLElement>('[data-bead-studio]')) {
  new BeadStudio(el);
}
