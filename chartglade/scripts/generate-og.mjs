/**
 * Generates public/og-default.png (1200×630) — brand OG card:
 * deep-green gradient, faint chart gridlines, three rising white bars
 * (the favicon mark, enlarged), "CHARTGLADE" stamped with a hand-coded
 * 5×7 pixel font. Pure JS (pngjs), same pattern as tintbrew.
 *
 * Run: npm run og
 */
import { PNG } from 'pngjs';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const W = 1200;
const H = 630;

const png = new PNG({ width: W, height: H });

// --- 5×7 pixel font (only the letters we need: C H A R T G L D E) ---
const FONT = {
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  G: ['01110', '10001', '10000', '10011', '10001', '10001', '01111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
};

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const TOP = hex('#12301e');
const BOTTOM = hex('#2f7d4f');
const MINT = hex('#7ddba3');
const WHITE = [255, 255, 255];

function set(x, y, [r, g, b], a = 1) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (W * y + x) << 2;
  const data = png.data;
  data[i] = Math.round(r * a + data[i] * (1 - a));
  data[i + 1] = Math.round(g * a + data[i + 1] * (1 - a));
  data[i + 2] = Math.round(b * a + data[i + 2] * (1 - a));
  data[i + 3] = 255;
}

// vertical gradient background (favicon green, deepened)
for (let y = 0; y < H; y++) {
  const t = y / H;
  const c = TOP.map((v, i) => Math.round(v + (BOTTOM[i] - v) * t));
  for (let x = 0; x < W; x++) set(x, y, c);
}

// faint horizontal gridlines — "chart paper" texture
for (const gy of [90, 150, 210, 270]) {
  for (let x = 120; x < W - 120; x++) set(x, gy, WHITE, 0.06);
}
for (const gx of [300, 600, 900]) {
  for (let y = 60; y < 330; y++) set(gx, y, WHITE, 0.05);
}

// three rising white bars (the favicon mark, enlarged) over a baseline
const BASE = 330;
function bar(x, w, h) {
  for (let y = BASE - h; y < BASE; y++) {
    for (let bx = x; bx < x + w; bx++) set(bx, y, WHITE, 0.92);
  }
}
bar(470, 80, 110);
bar(585, 80, 175);
bar(700, 80, 245);
for (let y = BASE; y < BASE + 8; y++) {
  for (let x = 420; x < 830; x++) set(x, y, WHITE, 0.9);
}

// wordmark
const SCALE = 13;
const GAP = 3 * SCALE;
const word = 'CHARTGLADE';
const width =
  word.split('').reduce((w, ch) => w + FONT[ch][0].length * SCALE, 0) + GAP * (word.length - 1);
let x0 = Math.round((W - width) / 2);
const y0 = 400;
for (const ch of word.split('')) {
  const glyph = FONT[ch];
  const gw = glyph[0].length;
  for (let gy = 0; gy < 7; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      if (glyph[gy][gx] === '1') {
        for (let sy = 0; sy < SCALE; sy++) {
          for (let sx = 0; sx < SCALE; sx++) {
            set(x0 + gx * SCALE + sx, y0 + gy * SCALE + sy, WHITE, 0.96);
          }
        }
      }
    }
  }
  x0 += gw * SCALE + GAP;
}

// mint underline accent
for (let y = 545; y < 553; y++) {
  for (let x = 520; x < 680; x++) set(x, y, MINT, 0.9);
}

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../public/og-default.png');
writeFileSync(out, PNG.sync.write(png));
console.log(`wrote ${out} (${W}x${H})`);
