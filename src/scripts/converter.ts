/**
 * Color Converter island. The SSR shell already shows every format; this
 * script keeps HEX / RGB / HSL / CMYK in sync as the user edits any field.
 * The field being edited is never overwritten by re-render (origin mask).
 */
import {
  cmykToRgb,
  formatCss,
  hslToRgb,
  normalizeHex,
  readableLabel,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
} from '../lib/color';
import { nearestColorName } from '../lib/colorName';

interface Rgb {
  r: number;
  g: number;
  b: number;
}

type Origin = 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'picker';

class ConverterIsland {
  private root: HTMLElement;
  private rgb: Rgb;
  private syncUrl: boolean;

  constructor(root: HTMLElement) {
    this.root = root;
    this.rgb = hexToRgbSafe(root.dataset.color ?? '#6d28d9');
    this.syncUrl = root.dataset.syncUrl === 'true';

    if (this.syncUrl) {
      const param = new URLSearchParams(window.location.search).get('color');
      const hex = param ? normalizeHex(param.trim()) : null;
      if (hex) this.rgb = hexToRgbSafe(hex);
    }

    this.bind();
    this.render();
  }

  private $(sel: string): HTMLInputElement | null {
    return this.root.querySelector<HTMLInputElement>(sel);
  }

  /* ---------------- DOM sync ---------------- */

  private render(origin?: Origin) {
    const hex = rgbToHex(this.rgb);
    const hsl = rgbToHsl(this.rgb);
    const cmyk = rgbToCmyk(this.rgb);
    const rgbCss = formatCss('rgb', this.rgb);
    const hslCss = formatCss('hsl', this.rgb);
    const cmykCss = formatCss('cmyk', this.rgb);

    this.root.dataset.color = hex;

    const swatch = this.root.querySelector<HTMLElement>('[data-c-swatch]');
    if (swatch) swatch.style.background = hex;
    const label = this.root.querySelector<HTMLElement>('[data-c-label]');
    if (label) {
      label.textContent = hex;
      label.style.color = readableLabel(this.rgb);
    }
    const picker = this.$('[data-c-picker]');
    if (picker) picker.value = hex;
    const pickerSwatch = this.root.querySelector<HTMLElement>('[data-c-picker-swatch]');
    if (pickerSwatch) pickerSwatch.style.background = hex;

    const nearest = nearestColorName(this.rgb);
    const nameEl = this.root.querySelector<HTMLElement>('[data-c-name]');
    if (nameEl) nameEl.textContent = nearest.name;
    const nameSwatch = this.root.querySelector<HTMLElement>('[data-c-name-swatch]');
    if (nameSwatch) nameSwatch.style.background = nearest.hex;

    if (origin !== 'hex') {
      const el = this.$('[data-f-hex]');
      if (el) {
        el.value = hex;
        el.setAttribute('aria-invalid', 'false');
      }
    }
    if (origin !== 'rgb') {
      const map: [string, number][] = [
        ['[data-f-rgb-r]', this.rgb.r],
        ['[data-f-rgb-g]', this.rgb.g],
        ['[data-f-rgb-b]', this.rgb.b],
      ];
      for (const [sel, v] of map) {
        const el = this.$(sel);
        if (el) {
          el.value = String(v);
          el.setAttribute('aria-invalid', 'false');
        }
      }
    }
    if (origin !== 'hsl') {
      const map: [string, number][] = [
        ['[data-f-hsl-h]', hsl.h],
        ['[data-f-hsl-s]', hsl.s],
        ['[data-f-hsl-l]', hsl.l],
      ];
      for (const [sel, v] of map) {
        const el = this.$(sel);
        if (el) {
          el.value = String(v);
          el.setAttribute('aria-invalid', 'false');
        }
      }
    }
    if (origin !== 'cmyk') {
      const map: [string, number][] = [
        ['[data-f-cmyk-c]', cmyk.c],
        ['[data-f-cmyk-m]', cmyk.m],
        ['[data-f-cmyk-y]', cmyk.y],
        ['[data-f-cmyk-k]', cmyk.k],
      ];
      for (const [sel, v] of map) {
        const el = this.$(sel);
        if (el) {
          el.value = String(v);
          el.setAttribute('aria-invalid', 'false');
        }
      }
    }

    const setCopy = (block: string, value: string) => {
      const btn = this.root
        .querySelector(`[data-f-block="${block}"]`)
        ?.querySelector<HTMLElement>('.btn-copy');
      if (btn) btn.setAttribute('data-copy', value);
    };
    setCopy('hex', hex);
    setCopy('rgb', rgbCss);
    setCopy('hsl', hslCss);
    setCopy('cmyk', cmykCss);

    if (this.syncUrl) {
      const params = new URLSearchParams({ color: hex });
      history.replaceState(null, '', `?${params.toString()}`);
    }
  }

  /* ---------------- events ---------------- */

  private bind() {
    // Live sync while typing.
    this.root.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement | null;
      if (!target) return;

      const hexEl = target.closest<HTMLInputElement>('[data-f-hex]');
      if (hexEl) {
        const hex = normalizeHex(hexEl.value);
        hexEl.setAttribute('aria-invalid', String(hex === null));
        if (hex) {
          this.rgb = hexToRgbSafe(hex);
          this.render('hex');
        }
        return;
      }

      const rgbChannel = target.closest<HTMLInputElement>('[data-f-rgb-r], [data-f-rgb-g], [data-f-rgb-b]');
      if (rgbChannel) {
        const r = parseChannel(this.$('[data-f-rgb-r]')!, 0, 255);
        const g = parseChannel(this.$('[data-f-rgb-g]')!, 0, 255);
        const b = parseChannel(this.$('[data-f-rgb-b]')!, 0, 255);
        const valid = [r, g, b].every((v) => v !== null);
        for (const el of [this.$('[data-f-rgb-r]'), this.$('[data-f-rgb-g]'), this.$('[data-f-rgb-b]')]) {
          el?.setAttribute('aria-invalid', String(!valid));
        }
        if (valid) {
          this.rgb = { r: r!, g: g!, b: b! };
          this.render('rgb');
        }
        return;
      }

      const hslField = target.closest<HTMLInputElement>('[data-f-hsl-h], [data-f-hsl-s], [data-f-hsl-l]');
      if (hslField) {
        const h = parseChannel(this.$('[data-f-hsl-h]')!, 0, 360);
        const s = parsePercent(this.$('[data-f-hsl-s]'));
        const l = parsePercent(this.$('[data-f-hsl-l]'));
        const valid = h !== null && s !== null && l !== null;
        for (const el of [this.$('[data-f-hsl-h]'), this.$('[data-f-hsl-s]'), this.$('[data-f-hsl-l]')]) {
          el?.setAttribute('aria-invalid', String(!valid));
        }
        if (valid) {
          this.rgb = hslToRgb({ h: h!, s: s!, l: l! });
          this.render('hsl');
        }
        return;
      }

      const cmykField = target.closest<HTMLInputElement>('[data-f-cmyk-c], [data-f-cmyk-m], [data-f-cmyk-y], [data-f-cmyk-k]');
      if (cmykField) {
        const c = parsePercent(this.$('[data-f-cmyk-c]'));
        const m = parsePercent(this.$('[data-f-cmyk-m]'));
        const y = parsePercent(this.$('[data-f-cmyk-y]'));
        const k = parsePercent(this.$('[data-f-cmyk-k]'));
        const valid = [c, m, y, k].every((v) => v !== null);
        for (const el of [this.$('[data-f-cmyk-c]'), this.$('[data-f-cmyk-m]'), this.$('[data-f-cmyk-y]'), this.$('[data-f-cmyk-k]')]) {
          el?.setAttribute('aria-invalid', String(!valid));
        }
        if (valid) {
          this.rgb = cmykToRgb({ c: c!, m: m!, y: y!, k: k! });
          this.render('cmyk');
        }
        return;
      }

      const picker = target.closest<HTMLInputElement>('[data-c-picker]');
      if (picker) {
        const hex = normalizeHex(picker.value);
        if (hex) {
          this.rgb = hexToRgbSafe(hex);
          this.render('picker');
        }
      }
    });

    // On commit, reset still-invalid fields to the current state's values.
    this.root.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement | null;
      if (!target) return;
      const invalid = target.getAttribute('aria-invalid') === 'true';
      if (invalid) this.render(); // no origin mask → refresh every field
    });
  }
}

function hexToRgbSafe(hex: string): Rgb {
  const normalized = normalizeHex(hex) ?? '#6d28d9';
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return { r, g, b };
}

/** parse a 0–100 percent field (kept separate for readability at call sites) */
function parsePercent(el: HTMLInputElement | null): number | null {
  if (!el) return null;
  return parseChannel(el, 0, 100);
}

function parseChannel(el: HTMLInputElement, min: number, max: number): number | null {
  const n = Number(el.value);
  if (el.value.trim() === '' || !Number.isFinite(n) || n < min || n > max) return null;
  return Math.round(n);
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-converter]').forEach((el) => new ConverterIsland(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
