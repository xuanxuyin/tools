// Regenerate src/lib/icons.ts from lucide-static (vendored, ISC).
// Usage: node scripts/gen-icons.mjs   (run after changing the NEED list)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

// lucide icon name → export key used across the site
const NEED = {
  heart: 'heart',
  banknote: 'banknote',
  briefcase: 'briefcase',
  hash: 'hash',
  'dice-5': 'dice',
  cookie: 'cookie',
  coins: 'coins',
  'circle-dot': 'circleDot',
  'circle-check': 'circleCheck',
  'scroll-text': 'scrollText',
  'moon-star': 'moonStar',
  sun: 'sun',
  utensils: 'utensils',
  house: 'house',
  film: 'film',
  dumbbell: 'dumbbell',
  'calendar-days': 'calendarDays',
  users: 'users',
  'message-circle': 'messageCircle',
  wallet: 'wallet',
  compass: 'compass',
  sparkles: 'sparkles',
  mail: 'mail',
  'gamepad-2': 'gamepad2',
  handshake: 'handshake',
  smartphone: 'smartphone',
  'shopping-cart': 'shoppingCart',
  scale: 'scale',
  lock: 'lock',
  'arrow-left': 'arrowLeft',
  'arrow-right': 'arrowRight',
};

let out = `/**
 * The site icon set — official Lucide (lucide.dev) path data, vendored inline.
 * License: ISC — free for commercial use, no attribution required
 * (source: lucide-static v0.525.0, https://github.com/lucide-icons/lucide).
 * Regenerate with: node scripts/gen-icons.mjs (NEED table at top).
 *
 * Vendored inline SVG = zero font/CDN requests, uniform permissive license,
 * matches the repo discipline (system fonts only). Same pattern as tintbrew.
 * Runtime-injected markup must be styled from global.css (no scoped CSS).
 */
export const ICONS = {
`;

for (const [file, key] of Object.entries(NEED)) {
  const p = `node_modules/lucide-static/icons/${file}.svg`;
  if (!existsSync(p)) { console.error('MISSING:', p); process.exit(1); }
  const svg = readFileSync(p, 'utf8');
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  // one quoted element per line, joined with + (tintbrew style, no broken string literals)
  const lines = inner.replace(/></g, '>\n<').split('\n').map((l) => `      '${l}'`).join(' +\n');
  out += `  /** lucide ${file} */\n  ${key}:\n${lines},\n\n`;
}

out += `};

/**
 * The LuckyShake brand mark — a vermilion fortune-stick jar, three cream
 * sticks with gold caps poking out. Palette = the 3D jar constants
 * (LACQUER #d94a35, LACQUER_DARK #a52a1e, BAND #241611, GOLD #d4a017,
 * cream #f7efdd) on the site's deep ink. Used as nav brand-mark and the
 * Fortune Stick tool icon (no bg). Favicon itself = the licensed flat jar
 * render (public/favicon.png, from docs/fortune-draw/4.webp, 👤 11/11).
 */
const JAR_MARK_INNER =
  // sticks (behind the jar mouth), center one tallest — flat-color inline
  // variant of the favicon artwork (same coordinates as public/favicon.svg;
  // gradients would collide across same-page SVG instances)
  '<g transform="rotate(-10 23 26)">' +
  '<rect x="21" y="14" width="4.6" height="22" rx="2.3" fill="\#f7efdd" />' +
  '<rect x="21" y="14" width="4.6" height="5.2" rx="2.3" fill="\#d4a017" />' +
  '</g>' +
  '<g>' +
  '<rect x="30" y="10" width="4.6" height="26" rx="2.3" fill="\#f7efdd" />' +
  '<rect x="30" y="10" width="4.6" height="5.2" rx="2.3" fill="\#d4a017" />' +
  '</g>' +
  '<g transform="rotate(10 41 26)">' +
  '<rect x="39" y="14" width="4.6" height="22" rx="2.3" fill="\#f7efdd" />' +
  '<rect x="39" y="14" width="4.6" height="5.2" rx="2.3" fill="\#d4a017" />' +
  '</g>' +
  // elliptical jar mouth (perspective step)
  '<ellipse cx="32" cy="35.5" rx="17" ry="4.2" fill="\#8f2417" />' +
  '<ellipse cx="32" cy="34.6" rx="17" ry="4" fill="\#a52a1e" />' +
  // jar body — tapering, rounded bottom corners
  '<path d="M15.6 37.5h32.8l-3.1 17a4 4 0 0 1-3.94 3.3H22.6a4 4 0 0 1-3.94-3.3Z" fill="\#d94a35" />' +
  // left highlight
  '<path d="M20.2 40v13.5a3 3 0 0 0 .5 1.8l.9 1.5h3l-1.2-2.5a6 6 0 0 1-.6-2.2V40Z" fill="\#f7957a" opacity=".75" />' +
  // upper band + gold line
  '<path d="M16.4 42.2h31.2l-.5 3.6H16.9Z" fill="\#241611" />' +
  '<rect x="17" y="46.6" width="30" height="1.2" fill="\#d4a017" />' +
  // lower band + gold line
  '<path d="M18.3 52.4h27.4l-.7 4H19Z" fill="\#241611" />' +
  '<rect x="19" y="56.6" width="26" height="1.1" fill="\#d4a017" />';

/** Jar mark on a rounded ink tile — favicon artwork. */
export function jarMarkSvg(size = 64): string {
  return \`<svg width="\${size}" height="\${size}" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="\#241f3d"/>\${JAR_MARK_INNER}</svg>\`;
}

/** Bare jar mark (transparent bg) — nav brand-mark, tool icon. */
export function jarMarkBareSvg(size = 20): string {
  return \`<svg width="\${size}" height="\${size}" viewBox="0 0 64 64" aria-hidden="true">\${JAR_MARK_INNER}</svg>\`;
}

export type IconName = keyof typeof ICONS;

/** Full <svg> wrapper for an icon — the one-liner consumers should prefer.
 *  aria-hidden: decorative only, labels live in adjacent text nodes. */
export function iconSvg(name: IconName, size = 18, attrs = ''): string {
  return \`<svg width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"\${attrs ? ' ' + attrs : ''}>\${ICONS[name]}</svg>\`;
}
`;
writeFileSync('src/lib/icons.ts', out);
console.log('src/lib/icons.ts written,', Object.keys(NEED).length, 'icons');
