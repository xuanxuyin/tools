/**
 * Generates the OG image set (1200×630 each, pure JS + pngjs):
 *
 *   public/og-default.png           brand card (unchanged design)
 *   public/og/mix-{a}-{b}.png ×24   Venn: circle A + circle B, the overlap
 *                                   painted with the real Oklab blend
 *   public/og/{slug}.png ×8         scenario/chart cards: source swatches
 *                                   → arrow → the computed hero answer
 *
 * Colors come from scripts/og-data.mjs and the mix math from
 * scripts/og-color.mjs (faithful ports of the TS engine) — src/lib/og.test.ts
 * locks both against the source of truth, so regenerate on any data change.
 *
 * Run: npm run og
 */
import { PNG } from 'pngjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { COLORS, PAIRS, SCENARIOS } from './og-data.mjs';
import { mixHex } from './og-color.mjs';

const W = 1200;
const H = 630;

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OG_DIR = resolve(ROOT, 'public/og');
mkdirSync(OG_DIR, { recursive: true });

// --- 5×7 pixel font (wordmark + hex codes: 0-9 A-F # +) ---
const FONT = {
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  I: ['111', '010', '010', '010', '010', '010', '111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  2: ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  3: ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  5: ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  6: ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  9: ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  '#': ['01010', '11111', '01010', '01010', '01010', '11111', '01010'],
  '+': ['00100', '00100', '00100', '11111', '00100', '00100', '00100'],
};

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const TOP = hex('#1c1030');
const BOTTOM = hex('#2e1a4e');
const RED = hex('#ff3d5a');
const PURPLE = hex('#8c53a2');
const BLUE = hex('#3b82f6');
const WHITE = [255, 255, 255];

// --- card primitives -------------------------------------------------------

function newCard() {
  const png = new PNG({ width: W, height: H });
  const set = (x, y, [r, g, b], a = 1) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = (W * y + x) << 2;
    const data = png.data;
    data[i] = Math.round(r * a + data[i] * (1 - a));
    data[i + 1] = Math.round(g * a + data[i + 1] * (1 - a));
    data[i + 2] = Math.round(b * a + data[i + 2] * (1 - a));
    data[i + 3] = 255;
  };
  // vertical gradient background
  for (let y = 0; y < H; y++) {
    const t = y / H;
    const c = TOP.map((v, i) => Math.round(v + (BOTTOM[i] - v) * t));
    for (let x = 0; x < W; x++) set(x, y, c);
  }
  return { png, set };
}

function circle(set, cx, cy, r, color, alpha) {
  for (let y = cy - r; y <= cy + r; y++) {
    for (let x = cx - r; x <= cx + r; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= r) {
        const edge = Math.min(1, Math.max(0, r - d)); // 1px soft edge
        set(x, y, color, alpha * Math.min(1, edge));
      }
    }
  }
}

/** Lens-shaped intersection of two equal circles — the "blend" region. */
function lens(set, cx1, cx2, cy, r, color, alpha) {
  for (let y = cy - r; y <= cy + r; y++) {
    for (let x = Math.min(cx1, cx2) - r; x <= Math.max(cx1, cx2) + r; x++) {
      const d1 = Math.hypot(x - cx1, y - cy);
      const d2 = Math.hypot(x - cx2, y - cy);
      if (d1 <= r && d2 <= r) {
        const edge = Math.min(r - d1, r - d2);
        set(x, y, color, alpha * Math.min(1, Math.max(0, edge)));
      }
    }
  }
}

function measure(word, scale, gap = 3 * scale) {
  return (
    word.split('').reduce((w, ch) => w + (ch === ' ' ? 2 * scale : FONT[ch][0].length * scale), 0) +
    gap * (word.length - 1)
  );
}

function text(set, word, x0, y0, scale, color, alpha) {
  const GAP = 3 * scale;
  let x = x0;
  for (const ch of word.split('')) {
    if (ch === ' ') {
      x += 2 * scale + GAP;
      continue;
    }
    const glyph = FONT[ch];
    const gw = glyph[0].length;
    for (let gy = 0; gy < 7; gy++) {
      for (let gx = 0; gx < gw; gx++) {
        if (glyph[gy][gx] === '1') {
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              set(x + gx * scale + sx, y0 + gy * scale + sy, color, alpha);
            }
          }
        }
      }
    }
    x += gw * scale + GAP;
  }
}

/** Uppercase hex code centered on cx. */
function hexLabel(set, hexStr, cx, y, scale, alpha) {
  const word = `#${hexStr.slice(1).toUpperCase()}`;
  text(set, word, Math.round(cx - measure(word, scale) / 2), y, scale, WHITE, alpha);
}

function wordmark(set, y0, scale, alpha) {
  const word = 'TINTBREW';
  const width = measure(word, scale);
  text(set, word, Math.round((W - width) / 2), y0, scale, WHITE, alpha);
}

function write(png, rel) {
  const out = resolve(ROOT, 'public', rel);
  writeFileSync(out, PNG.sync.write(png));
  console.log(`wrote ${rel} (${W}x${H})`);
}

// --- 1. brand default card (unchanged design) --------------------------------

{
  const { png, set } = newCard();
  circle(set, 430, 240, 105, RED, 0.92);
  circle(set, 770, 240, 105, BLUE, 0.92);
  circle(set, 600, 300, 105, PURPLE, 0.95);
  wordmark(set, 430, 14, 0.96);
  for (let y = 560; y < 568; y++) {
    for (let x = 500; x < 700; x++) set(x, y, PURPLE, 0.9);
  }
  write(png, 'og-default.png');
}

// --- 2. mix pages: Venn with the real blend in the overlap -------------------

for (const [a, b] of PAIRS) {
  const hexA = COLORS[a];
  const hexB = COLORS[b];
  const result = mixHex(hexA, hexB);

  const { png, set } = newCard();
  circle(set, 505, 230, 140, hex(hexA), 0.92);
  circle(set, 695, 230, 140, hex(hexB), 0.92);
  lens(set, 505, 695, 230, 140, hex(result), 0.95);

  // "#HEXA + #HEXB" line, then the answer, then the wordmark
  const line = `#${hexA.slice(1).toUpperCase()} + #${hexB.slice(1).toUpperCase()}`;
  text(set, line, Math.round((W - measure(line, 4)) / 2), 392, 4, WHITE, 0.82);
  hexLabel(set, result, W / 2, 440, 6, 0.97);
  wordmark(set, 545, 8, 0.75);

  // Page slug is data order (`${a}-${b}` in getStaticPaths) — the reversed
  // order is 301'd by public/_redirects, never a real page.
  write(png, `og/mix-${a}-${b}.png`);
}

// --- 3. scenario pages: sources → arrow → computed hero answer ---------------

for (const s of SCENARIOS) {
  const { png, set } = newCard();

  const [s1, s2] = s.swatches;
  circle(set, 275, 250, 85, hex(s1), 0.92);
  circle(set, 475, 250, 85, hex(s2), 0.92);

  // arrow: shaft + head
  for (let y = 246; y < 254; y++) {
    for (let x = 585; x < 735; x++) set(x, y, WHITE, 0.9);
  }
  for (let dy = -14; dy <= 14; dy++) {
    for (let dx = 0; dx <= 22; dx++) {
      if (Math.abs(dy) <= 14 - (14 / 22) * dx) set(735 + dx, 250 + dy, WHITE, 0.9);
    }
  }

  circle(set, 885, 250, 115, hex(s.resultHex), 0.95);

  hexLabel(set, s1, 275, 352, 4, 0.82);
  hexLabel(set, s2, 475, 352, 4, 0.82);
  hexLabel(set, s.resultHex, 885, 382, 6, 0.97);
  wordmark(set, 545, 8, 0.75);

  write(png, `og/${s.slug}.png`);
}
