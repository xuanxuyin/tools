/**
 * Generates public/og-default.png (1200×630) — brand OG card:
 * violet gradient, three overlapping blend circles (red → purple → blue),
 * "TINTBREW" stamped with a hand-coded 5×7 pixel font. Pure JS (pngjs).
 *
 * Run: node scripts/generate-og.mjs
 */
import { PNG } from 'pngjs';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const W = 1200;
const H = 630;

const png = new PNG({ width: W, height: H });

// --- 5×7 pixel font (only the letters we need) ---
const FONT = {
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  I: ['111', '010', '010', '010', '010', '010', '111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
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

function set(x, y, [r, g, b], a = 1) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (W * y + x) << 2;
  const data = png.data;
  data[i] = Math.round(r * a + data[i] * (1 - a));
  data[i + 1] = Math.round(g * a + data[i + 1] * (1 - a));
  data[i + 2] = Math.round(b * a + data[i + 2] * (1 - a));
  data[i + 3] = 255;
}

// vertical gradient background
for (let y = 0; y < H; y++) {
  const t = y / H;
  const c = TOP.map((v, i) => Math.round(v + (BOTTOM[i] - v) * t));
  for (let x = 0; x < W; x++) set(x, y, c);
}

// overlapping blend circles (alpha-composited, purple last so it reads as "mix")
function circle(cx, cy, r, color, alpha) {
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
circle(430, 240, 105, RED, 0.92);
circle(770, 240, 105, BLUE, 0.92);
circle(600, 300, 105, PURPLE, 0.95);

// wordmark
const SCALE = 14;
const GAP = 3 * SCALE;
const word = 'TINTBREW';
const width =
  word.split('').reduce((w, ch) => w + FONT[ch][0].length * SCALE, 0) + GAP * (word.length - 1);
let x0 = Math.round((W - width) / 2);
const y0 = 430;
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

// underline accent
for (let y = 560; y < 568; y++) {
  for (let x = 500; x < 700; x++) set(x, y, PURPLE, 0.9);
}

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../public/og-default.png');
writeFileSync(out, PNG.sync.write(png));
console.log(`wrote ${out} (${W}x${H})`);
