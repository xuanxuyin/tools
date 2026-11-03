/**
 * The site icon set — one drawing style for every chrome icon (header nav,
 * tool-nav pills, home tool cards): 24×24 grid, 2px round-cap strokes, the
 * visual language of modern icon sets (Lucide-style) instead of the old
 * cramped 16px hand-rolled paths (user call 2026-11-03: "find better icons").
 *
 * Each entry is the INNER markup of an <svg>; the consumer owns the wrapper
 * (`viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
 * stroke-linecap="round" stroke-linejoin="round"`) and renders via
 * set:html. Icons contain no <title>/<text> — i18n.test pins link text, and
 * the wrappers stay OUTSIDE [data-i18n] nodes because apply() wipes
 * textContent (see Header.astro note).
 */
export const ICONS = {
  /** Color Mixer — horizontal sliders with two knobs */
  mixer:
    '<path d="M3 7h9"/><path d="M17 7h4"/><path d="M14.5 4.5v5"/>' +
    '<path d="M3 17h4"/><path d="M11 17h10"/><path d="M9 14.5v5"/>',
  /** Color Converter — swap arrows */
  converter:
    '<path d="m8 3-4 4 4 4"/><path d="M4 7h16"/>' +
    '<path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
  /** Hue Test — target rings */
  hueTest:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  /** Color Mixes — two blended circles (venn) */
  mixes: '<circle cx="9.5" cy="12" r="6"/><circle cx="14.5" cy="12" r="6"/>',
  /** Guides — open book */
  guides:
    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>' +
    '<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  /** Bead Patterns — four board tiles */
  patterns:
    '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>' +
    '<rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  /** Gallery — trophy (the ranked board) */
  gallery:
    '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>' +
    '<path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>' +
    '<path d="M4 22h16"/>' +
    '<path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>' +
    '<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>' +
    '<path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  /** Photo → pattern — picture with mountain */
  photo:
    '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
    '<circle cx="9" cy="9" r="2"/>' +
    '<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  /** Coloring — paint brush on a frame */
  coloring:
    '<rect x="3" y="3" width="18" height="14" rx="2"/>' +
    '<path d="M7 17v4"/><path d="M17 17v4"/><path d="M7 21h10"/>' +
    '<path d="M12 6l3.5 5.5a2 2 0 1 1-3.4 1.4L12 6z"/>',
} as const;

export type IconName = keyof typeof ICONS;
