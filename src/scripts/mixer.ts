/**
 * Color Mixer island. The SSR shell already contains a valid answer; this
 * script only takes over interaction: color/hex/ratio editing, row add/remove,
 * mode toggle, URL sharing (flagship page only). DOM updates are targeted
 * (text nodes + styles) so focus and transitions survive re-computation.
 */
import {
  colorMixSnippet,
  formatCss,
  hexToRgb,
  mixSteps,
  normalizeHex,
  normalizeWeights,
  oklabMix,
  readableLabel,
  rgbMix,
  rgbToHex,
} from '../lib/color';

type Mode = 'oklab' | 'rgb';

const MIN_COLORS = 2;
const MAX_COLORS = 5;
const STEP_COUNT = 9;
const NEW_ROW_COLORS = ['#22c55e', '#f59e0b', '#a855f7'];

class MixerIsland {
  private root: HTMLElement;
  private rowsEl: HTMLElement;
  private template: HTMLTemplateElement | null;
  private colors: string[] = [];
  private ratios: number[] = [];
  private mode: Mode = 'oklab';
  private syncUrl: boolean;

  constructor(root: HTMLElement) {
    this.root = root;
    this.rowsEl = root.querySelector<HTMLElement>('[data-rows]')!;
    this.template = root.parentElement?.querySelector<HTMLTemplateElement>(
      'template[data-row-template]',
    ) ?? null;

    const parsedColors: string[] = [];
    try {
      for (const c of JSON.parse(root.dataset.colors ?? '[]') as unknown[]) {
        const hex = normalizeHex(String(c));
        if (hex) parsedColors.push(hex);
      }
    } catch {
      /* fall through to defaults */
    }
    if (parsedColors.length >= MIN_COLORS) this.colors = parsedColors.slice(0, MAX_COLORS);
    else this.colors = ['#ff0000', '#3b82f6'];

    const parsedRatios: number[] = [];
    try {
      for (const r of JSON.parse(root.dataset.ratios ?? '[]') as unknown[]) {
        const n = Number(r);
        parsedRatios.push(Number.isFinite(n) && n >= 0 ? Math.round(n) : 1);
      }
    } catch {
      /* defaults below */
    }
    this.ratios = this.colors.map((_, i) => parsedRatios[i] ?? 1);

    this.syncUrl = root.dataset.syncUrl === 'true';
    this.mode = root.dataset.mode === 'rgb' ? 'rgb' : 'oklab';

    if (this.syncUrl) this.applyUrl();

    this.bind();
    this.rebuildRows(); // ensures DOM matches state (URL may have changed it)
    this.render();
  }

  /* ---------------- state helpers ---------------- */

  private rowIndex(row: Element): number {
    return Array.from(this.rowsEl.children).indexOf(row);
  }

  private setMode(mode: Mode) {
    this.mode = mode;
    this.root.dataset.mode = mode;
    this.root
      .querySelectorAll<HTMLElement>('[data-mode-btn]')
      .forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.modeValue === mode)));
  }

  /* ---------------- DOM sync ---------------- */

  private rebuildRows() {
    this.rowsEl.replaceChildren();
    this.colors.forEach((hex, i) => {
      const node = this.template?.content.firstElementChild?.cloneNode(true) as HTMLElement | null;
      if (!node) return;
      const colorInput = node.querySelector<HTMLInputElement>('[data-color]')!;
      const hexInput = node.querySelector<HTMLInputElement>('[data-hex]')!;
      const rangeInput = node.querySelector<HTMLInputElement>('[data-ratio]')!;
      const removeBtn = node.querySelector<HTMLButtonElement>('[data-remove]')!;
      const swatch = node.querySelector<HTMLElement>('[data-swatch]')!;

      colorInput.value = hex;
      hexInput.value = hex;
      rangeInput.value = String(this.ratios[i] ?? 1);
      swatch.style.background = hex;
      colorInput.setAttribute('aria-label', `Pick color ${i + 1}`);
      hexInput.setAttribute('aria-label', `Hex value for color ${i + 1}`);
      rangeInput.setAttribute('aria-label', `Mixing ratio for color ${i + 1}`);
      removeBtn.setAttribute('aria-label', `Remove color ${i + 1}`);
      removeBtn.disabled = this.colors.length <= MIN_COLORS;

      this.rowsEl.appendChild(node);
    });

    const addBtn = this.root.querySelector<HTMLButtonElement>('[data-add]');
    if (addBtn) addBtn.disabled = this.colors.length >= MAX_COLORS;
  }

  private setValue(key: 'hex' | 'rgb' | 'hsl' | 'cmyk', value: string) {
    const span = this.root.querySelector(`[data-v-${key}]`);
    if (span) span.textContent = value;
    const row = span?.closest('.value-row');
    const btn = row?.querySelector<HTMLElement>('.btn-copy');
    if (btn) btn.setAttribute('data-copy', value);
  }

  private render() {
    const rgbs = this.colors.map(hexToRgb);
    const weights = normalizeWeights(this.ratios);
    const result =
      this.mode === 'oklab' ? oklabMix(rgbs, this.ratios) : rgbMix(rgbs, this.ratios);
    const resultHex = rgbToHex(result);

    const swatch = this.root.querySelector<HTMLElement>('[data-result-swatch]');
    if (swatch) swatch.style.background = resultHex;
    const label = this.root.querySelector<HTMLElement>('[data-result-label]');
    if (label) {
      label.textContent = resultHex;
      label.style.color = readableLabel(result);
    }

    this.setValue('hex', resultHex);
    this.setValue('rgb', formatCss('rgb', result));
    this.setValue('hsl', formatCss('hsl', result));
    this.setValue('cmyk', formatCss('cmyk', result));

    const stepsEl = this.root.querySelector<HTMLElement>('[data-steps]');
    if (stepsEl) {
      const steps =
        this.mode === 'oklab'
          ? mixSteps(rgbs, STEP_COUNT)
          : rgbs.map((rgb) => rgb); // naive path builds below
      const colorsOut =
        this.mode === 'oklab'
          ? steps.map((s) => rgbToHex(s))
          : this.naiveSteps(rgbs);
      stepsEl.innerHTML = colorsOut.map((s) => `<span style="background:${s}"></span>`).join('');
    }

    const snippetBlock = this.root.querySelector<HTMLElement>('[data-snippet-block]');
    const snippetEl = this.root.querySelector<HTMLElement>('[data-snippet]');
    if (snippetBlock && snippetEl) {
      if (this.colors.length === 2) {
        const pct = Math.round((weights[0]! / (weights[0]! + weights[1]!)) * 100);
        const snippet = colorMixSnippet(this.colors[0]!, this.colors[1]!, pct);
        snippetEl.textContent = snippet;
        snippetBlock.querySelector('.btn-copy')?.setAttribute('data-copy', snippet);
        snippetBlock.hidden = false;
      } else {
        snippetBlock.hidden = true;
      }
    }

    this.root.dataset.colors = JSON.stringify(this.colors);
    this.root.dataset.ratios = JSON.stringify(this.ratios);

    if (this.syncUrl) {
      const params = new URLSearchParams({
        colors: this.colors.join(','),
        ratios: this.ratios.join(','),
      });
      if (this.mode !== 'oklab') params.set('mode', this.mode);
      history.replaceState(null, '', `?${params.toString()}`);
    }
  }

  private naiveSteps(rgbs: { r: number; g: number; b: number }[]): string[] {
    const out: string[] = [];
    const segs = rgbs.length - 1;
    for (let i = 0; i < STEP_COUNT; i++) {
      if (segs === 0) {
        out.push(rgbToHex(rgbs[0]!));
        continue;
      }
      const t = (i / (STEP_COUNT - 1)) * segs;
      const seg = Math.min(segs - 1, Math.floor(t));
      const local = t - seg;
      out.push(
        rgbToHex(rgbMix([rgbs[seg]!, rgbs[seg + 1]!], [1 - local, local])),
      );
    }
    return out;
  }

  /* ---------------- events ---------------- */

  private bind() {
    this.root.addEventListener('input', (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const row = target.closest('[data-row]');
      if (!row) return;
      const i = this.rowIndex(row);
      if (i < 0) return;

      const colorInput = target.closest<HTMLInputElement>('[data-color]');
      if (colorInput) {
        const hex = normalizeHex(colorInput.value);
        if (hex) {
          this.colors[i] = hex;
          row.querySelector<HTMLInputElement>('[data-hex]')!.value = hex;
          row.querySelector<HTMLElement>('[data-swatch]')!.style.background = hex;
          this.render();
        }
        return;
      }

      const rangeInput = target.closest<HTMLInputElement>('[data-ratio]');
      if (rangeInput) {
        this.ratios[i] = Math.max(0, Math.round(Number(rangeInput.value)));
        this.render();
        return;
      }

      // live hex validation (applied on change)
      const hexInput = target.closest<HTMLInputElement>('[data-hex]');
      if (hexInput) {
        hexInput.setAttribute('aria-invalid', String(normalizeHex(hexInput.value) === null));
      }
    });

    this.root.addEventListener('change', (e) => {
      const hexInput = (e.target as HTMLElement | null)?.closest<HTMLInputElement>('[data-hex]');
      if (!hexInput) return;
      const row = hexInput.closest('[data-row]')!;
      const i = this.rowIndex(row);
      const hex = normalizeHex(hexInput.value);
      if (hex && i >= 0) {
        this.colors[i] = hex;
        row.querySelector<HTMLElement>('[data-swatch]')!.style.background = hex;
        row.querySelector<HTMLInputElement>('[data-color]')!.value = hex;
        hexInput.setAttribute('aria-invalid', 'false');
      } else {
        hexInput.value = this.colors[i] ?? '#000000';
        hexInput.setAttribute('aria-invalid', 'false');
      }
      this.render();
    });

    this.root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const removeBtn = target.closest<HTMLButtonElement>('[data-remove]');
      if (removeBtn) {
        const row = removeBtn.closest('[data-row]')!;
        const i = this.rowIndex(row);
        if (this.colors.length > MIN_COLORS && i >= 0) {
          this.colors.splice(i, 1);
          this.ratios.splice(i, 1);
          this.rebuildRows();
          this.render();
        }
        return;
      }

      const addBtn = target.closest<HTMLButtonElement>('[data-add]');
      if (addBtn && !addBtn.disabled && this.colors.length < MAX_COLORS) {
        this.colors.push(NEW_ROW_COLORS[this.colors.length % NEW_ROW_COLORS.length]!);
        this.ratios.push(1);
        this.rebuildRows();
        this.render();
        return;
      }

      const modeBtn = target.closest<HTMLButtonElement>('[data-mode-btn]');
      if (modeBtn) {
        this.setMode(modeBtn.dataset.modeValue === 'rgb' ? 'rgb' : 'oklab');
        this.render();
      }
    });
  }

  /* ---------------- URL state (flagship only) ---------------- */

  private applyUrl() {
    const params = new URLSearchParams(window.location.search);
    const colorsParam = params.get('colors');
    if (colorsParam) {
      const parsed = colorsParam
        .split(',')
        .map((c) => normalizeHex(c.trim()))
        .filter((c): c is string => c !== null);
      if (parsed.length >= MIN_COLORS && parsed.length <= MAX_COLORS) {
        this.colors = parsed;
        this.ratios = this.colors.map(() => 1);
      }
    }
    const ratiosParam = params.get('ratios');
    if (ratiosParam) {
      const parsed = ratiosParam
        .split(',')
        .map((r) => Number(r))
        .map((n) => (Number.isFinite(n) && n >= 0 ? Math.round(n) : 1));
      if (parsed.length === this.colors.length) this.ratios = parsed;
    }
    const modeParam = params.get('mode');
    if (modeParam === 'rgb' || modeParam === 'oklab') this.mode = modeParam;

    this.setMode(this.mode);
  }
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-mixer]').forEach((el) => new MixerIsland(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
