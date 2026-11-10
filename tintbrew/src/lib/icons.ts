/**
 * The site icon set — official Lucide (lucide.dev) path data, vendored inline.
 * License: ISC — free for commercial use, no attribution required
 * (source: lucide-static v0.525.0, https://github.com/lucide-icons/lucide).
 *
 * Why vendored inline SVG instead of an icon font (iconfont.cn etc.):
 *   - zero font requests / zero CDN dependency (repo discipline: system
 *     fonts only) and no icon-font FOUT
 *   - license is permissive and uniform — iconfont.cn mixes user uploads
 *     with varying terms, risky on a monetizing .com
 *   - stroke style matches the 2026-11-03 "modern icon set" direction
 *
 * Each entry is the INNER markup of an <svg>; the consumer owns the wrapper
 * (viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
 * stroke-linecap="round" stroke-linejoin="round") or just calls iconSvg().
 * Icons contain no <title>/<text> — i18n.test pins link text, and wrappers
 * stay OUTSIDE [data-i18n] nodes because apply() wipes textContent
 * (see Header.astro note).
 *
 * NOTE for runtime-injected markup: any DOM (re)built by an island must not
 * rely on Astro SCOPED styles for its children — injected nodes lack the
 * data-astro-cid-* attribute (the mixer steps-strip collapse, 2026-11-10).
 * Style such nodes from global.css or :global() rules only.
 */
export const ICONS = {
  /** Color Mixer — horizontal sliders with two knobs — lucide sliders-horizontal */
  mixer:
      '<line x1="21" x2="14" y1="4" y2="4" />' +
      '<line x1="10" x2="3" y1="4" y2="4" />' +
      '<line x1="21" x2="12" y1="12" y2="12" />' +
      '<line x1="8" x2="3" y1="12" y2="12" />' +
      '<line x1="21" x2="16" y1="20" y2="20" />' +
      '<line x1="12" x2="3" y1="20" y2="20" />' +
      '<line x1="14" x2="14" y1="2" y2="6" />' +
      '<line x1="8" x2="8" y1="10" y2="14" />' +
      '<line x1="16" x2="16" y1="18" y2="22" />',

  /** Color Converter — swap arrows — lucide arrow-right-left */
  converter:
      '<path d="m16 3 4 4-4 4" />' +
      '<path d="M20 7H4" />' +
      '<path d="m8 21-4-4 4-4" />' +
      '<path d="M4 17h16" />',

  /** Hue Test — target rings — lucide target */
  hueTest:
      '<circle cx="12" cy="12" r="10" />' +
      '<circle cx="12" cy="12" r="6" />' +
      '<circle cx="12" cy="12" r="2" />',

  /** Color Mixes — twin droplets — lucide droplets */
  mixes:
      '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />' +
      '<path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />',

  /** Guides — open book — lucide book-open */
  guides:
      '<path d="M12 7v14" />' +
      '<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />',

  /** Bead Patterns — four board tiles — lucide layout-grid */
  patterns:
      '<rect width="7" height="7" x="3" y="3" rx="1" />' +
      '<rect width="7" height="7" x="14" y="3" rx="1" />' +
      '<rect width="7" height="7" x="14" y="14" rx="1" />' +
      '<rect width="7" height="7" x="3" y="14" rx="1" />',

  /** Gallery — trophy (the ranked board) — lucide trophy */
  gallery:
      '<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />' +
      '<path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />' +
      '<path d="M18 9h1.5a1 1 0 0 0 0-5H18" />' +
      '<path d="M4 22h16" />' +
      '<path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />' +
      '<path d="M6 9H4.5a1 1 0 0 1 0-5H6" />',

  /** Photo → pattern — picture with mountain — lucide image */
  photo:
      '<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />' +
      '<circle cx="9" cy="9" r="2" />' +
      '<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />',

  /** Coloring — paint brush — lucide paintbrush */
  coloring:
      '<path d="m14.622 17.897-10.68-2.913" />' +
      '<path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />' +
      '<path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />',

  /** Copy — two rectangles — lucide copy */
  copy:
      '<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />' +
      '<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />',

  /** Check — single tick (copy success) — lucide check */
  check:
      '<path d="M20 6 9 17l-5-5" />',

  /** Chevron down (FAQ disclosure) — lucide chevron-down */
  chevronDown:
      '<path d="m6 9 6 6 6-6" />',

  /** Arrow right (CTAs) — lucide arrow-right */
  arrowRight:
      '<path d="M5 12h14" />' +
      '<path d="m12 5 7 7-7 7" />',

  /** Sparkles (hero / new) — lucide sparkles */
  sparkles:
      '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />' +
      '<path d="M20 3v4" />' +
      '<path d="M22 5h-4" />' +
      '<path d="M4 17v2" />' +
      '<path d="M5 18H3" />',

  /** Palette (color tools) — lucide palette */
  palette:
      '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />' +
      '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />' +
      '<circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />' +
      '<circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />' +
      '<circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />',

  /** Info circle (callouts) — lucide info */
  info:
      '<circle cx="12" cy="12" r="10" />' +
      '<path d="M12 16v-4" />' +
      '<path d="M12 8h.01" />',

  /** Shuffle (mixer) — lucide shuffle */
  shuffle:
      '<path d="m18 14 4 4-4 4" />' +
      '<path d="m18 2 4 4-4 4" />' +
      '<path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />' +
      '<path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />' +
      '<path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />',

  /** Plus (mixer add-color) — lucide plus */
  plus:
      '<path d="M5 12h14" />' +
      '<path d="M12 5v14" />',

  /** X / remove (mixer row) — lucide x */
  close:
      '<path d="M18 6 6 18" />' +
      '<path d="m6 6 12 12" />',

  /** Heart (likes) — lucide heart */
  heart:
      '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />',

  /** Printer (printables) — lucide printer */
  printer:
      '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />' +
      '<path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />' +
      '<rect x="6" y="14" width="12" height="8" rx="1" />',

  /** Download — lucide download */
  download:
      '<path d="M12 15V3" />' +
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />' +
      '<path d="m7 10 5 5 5-5" />',

  /** Mail (contact) — lucide mail */
  mail:
      '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />' +
      '<rect x="2" y="4" width="20" height="16" rx="2" />',

  /** Pipette (picker) — lucide pipette */
  pipette:
      '<path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" />' +
      '<path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />' +
      '<path d="m2 22 .414-.414" />',

  /** Wand sparkles (auto-magic) — lucide wand-sparkles */
  wand:
      '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />' +
      '<path d="m14 7 3 3" />' +
      '<path d="M5 6v4" />' +
      '<path d="M19 14v4" />' +
      '<path d="M10 2v2" />' +
      '<path d="M7 8H3" />' +
      '<path d="M21 16h-4" />' +
      '<path d="M11 3H9" />',

  /** Test tube (how-it-works) — lucide test-tube */
  testTube:
      '<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" />' +
      '<path d="M8.5 2h7" />' +
      '<path d="M14.5 16h-5" />',

  /** Pen tool (editor) — lucide pen-tool */
  penTool:
      '<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />' +
      '<path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />' +
      '<path d="m2.3 2.3 7.286 7.286" />' +
      '<circle cx="11" cy="11" r="2" />',

  /** Dashed circle (hue alt) — lucide circle-dashed */
  hueRings:
      '<path d="M10.1 2.182a10 10 0 0 1 3.8 0" />' +
      '<path d="M13.9 21.818a10 10 0 0 1-3.8 0" />' +
      '<path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />' +
      '<path d="M2.182 13.9a10 10 0 0 1 0-3.8" />' +
      '<path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />' +
      '<path d="M21.818 10.1a10 10 0 0 1 0 3.8" />' +
      '<path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />' +
      '<path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />',

};

export type IconName = keyof typeof ICONS;

/** Full <svg> wrapper for an icon — the one-liner consumers should prefer.
 *  aria-hidden: decorative only, labels live in adjacent text nodes. */
export function iconSvg(name: IconName, size = 18, attrs = ''): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${attrs ? ' ' + attrs : ''}>${ICONS[name]}</svg>`;
}
