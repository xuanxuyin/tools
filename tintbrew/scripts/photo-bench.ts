/**
 * Photo→pattern conversion fidelity benchmark (user call, 2026-11-12:
 * "识别算法不精细 — 更精细的实现"). Pure-TS, no DOM — run with tsx.
 *
 * Fixtures are deterministic photo-like synthetics (fields + camera blur +
 * JPEG-style noise). Metrics per board:
 *   • color error — Oklab distance between each cell's bead and the
 *     area-weighted linear-light average of the source under that cell
 *     (mean / median / p95 / %<0.05)
 *   • field purity — on cells ≥90% covered by ONE true field, fraction
 *     carrying that field's expected bead
 *   • small-feature recall — eye/mouth cells on a face fixture that kept a
 *     non-field bead
 *   • runtime
 *
 * Usage: npx tsx scripts/photo-bench.ts [--only scene|checker|face|big]
 */
import { performance } from 'node:perf_hooks';
import { MARD_COLORS, mardById } from '../src/lib/mardPalette';
import { hexToRgb, rgbToOklab, srgbToLinear, linearToSrgb } from '../src/lib/color';
import type { PhotoPattern, SampleImage } from '../src/lib/photoToPattern';

/** ENGINE=old runs the pre-rewrite engine from git (staged at
 *  .bench-tmp/oldEngine.ts by the operator) for before/after comparison. */
const { photoToPattern } =
  process.env.ENGINE === 'old'
    ? await import('../.bench-tmp/oldEngine')
    : await import('../src/lib/photoToPattern');

/* ------------------------------ helpers ------------------------------ */

const LINEAR = (() => {
  const t = new Float64Array(256);
  for (let i = 0; i < 256; i++) t[i] = srgbToLinear(i / 255);
  return t;
})();

interface Fixture {
  name: string;
  img: SampleImage;
  /** per-pixel expected bead id (guarded nearest of the field color), or
   *  null for blur zones / mixed pixels excluded from purity */
  expect: (string | null)[];
  /** per-pixel CLEAN field hex parallel to `expect` (null wherever expect
   *  is null) — the perceptual-equivalence metric needs the source color */
  expectHex: (string | null)[];
  cols: number;
}

/** Perceptual-equivalence slack: a cell counts as a near-hit when its bead's
 *  guarded cost to the field color is within this of the best bead's cost —
 *  sibling shades a coin flip apart (two identical whites) don't read as
 *  errors, real color losses do. */
const NEAR_SLACK = 0.008;

const BEAD_LAB = new Map(MARD_COLORS.map((b) => [b.id, rgbToOklab(hexToRgb(b.hex))]));

/** The engine's own matcher (Oklab + chroma guard, copied from
 *  photoToPattern.ts matchDistance) — purity then measures pipeline losses
 *  (quantization, absorption, merging), not disagreements between two
 *  different matching rules. */
function plainNearest(r: number, g: number, b: number): string {
  const lab = rgbToOklab({ r, g, b });
  const srcChroma = Math.hypot(lab.a, lab.b);
  let best = MARD_COLORS[0]!.id;
  let bestD = Infinity;
  for (const c of MARD_COLORS) {
    const l = BEAD_LAB.get(c.id)!;
    const d = Math.hypot(lab.L - l.L, lab.a - l.a, lab.b - l.b);
    const candChroma = Math.hypot(l.a, l.b);
    const gap = Math.abs(srcChroma - candChroma);
    const vivid = Math.max(0, candChroma - srcChroma);
    const total = d + 0.35 * gap + 0.75 * (srcChroma < 0.12 ? vivid : 0.35 * vivid);
    if (total < bestD) {
      bestD = total;
      best = c.id;
    }
  }
  return best;
}

/** Deterministic LCG noise in [−amp, +amp]. */
function makeNoise(seed: number, amp: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return ((s / 0x7fffffff) * 2 - 1) * amp;
  };
}

/** 3×3 separable box blur on RGB — a cheap camera-lens boundary soften. */
function boxBlur(img: SampleImage, radius = 1): void {
  const { data, width, height } = img;
  const tmp = new Float64Array(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          const i = (ny * width + nx) * 4;
          r += data[i]!;
          g += data[i + 1]!;
          b += data[i + 2]!;
          n++;
        }
      }
      const t = (y * width + x) * 3;
      tmp[t] = r / n;
      tmp[t + 1] = g / n;
      tmp[t + 2] = b / n;
    }
  }
  for (let p = 0; p < width * height; p++) {
    data[p * 4] = Math.round(tmp[p * 3]!);
    data[p * 4 + 1] = Math.round(tmp[p * 3 + 1]!);
    data[p * 4 + 2] = Math.round(tmp[p * 3 + 2]!);
  }
}

/** Build a fixture: paint fields, blur boundaries, add noise, and mark each
 *  pixel with its field's expected bead (null where the blur mixed fields). */
class Painter {
  data: Uint8ClampedArray;
  field: Int32Array; // field index per pixel, −1 = none
  constructor(
    public width: number,
    public height: number,
  ) {
    this.data = new Uint8ClampedArray(width * height * 4);
    this.field = new Int32Array(width * height).fill(-1);
  }
  fill(x0: number, y0: number, x1: number, y1: number, hex: string, fieldIdx: number): void {
    const c = hexToRgb(hex);
    for (let y = Math.max(0, y0); y < Math.min(this.height, y1); y++) {
      for (let x = Math.max(0, x0); x < Math.min(this.width, x1); x++) {
        const i = (y * this.width + x) * 4;
        this.data[i] = c.r;
        this.data[i + 1] = c.g;
        this.data[i + 2] = c.b;
        this.data[i + 3] = 255;
        this.field[y * this.width + x] = fieldIdx;
      }
    }
  }
  disc(cx: number, cy: number, r: number, hex: string, fieldIdx: number): void {
    const c = hexToRgb(hex);
    for (let y = Math.max(0, Math.floor(cy - r)); y < Math.min(this.height, Math.ceil(cy + r)); y++) {
      for (let x = Math.max(0, Math.floor(cx - r)); x < Math.min(this.width, Math.ceil(cx + r)); x++) {
        if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue;
        const i = (y * this.width + x) * 4;
        this.data[i] = c.r;
        this.data[i + 1] = c.g;
        this.data[i + 2] = c.b;
        this.data[i + 3] = 255;
        this.field[y * this.width + x] = fieldIdx;
      }
    }
  }
}

/* ------------------------------ fixtures ------------------------------ */

/** Structured scene: sky gradient, sun, grass, house (roof/walls/door/
 *  windows), camera blur, ±8 channel noise. 800×600, board 58 wide. */
function sceneFixture(): Fixture {
  const w = 800;
  const h = 600;
  const p = new Painter(w, h);
  // vertical sky ramp — field −2 marks "gradient" (excluded from purity,
  // still counts for color error)
  for (let y = 0; y < 380; y++) {
    const t = y / 380;
    const r = Math.round(120 + 60 * t);
    const g = Math.round(170 + 50 * t);
    const b = 235;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      p.data[i] = r;
      p.data[i + 1] = g;
      p.data[i + 2] = b;
      p.data[i + 3] = 255;
      p.field[y * w + x] = -2;
    }
  }
  const grass = hexToRgb('#4a8f3c');
  for (let y = 380; y < h; y++) {
    const t = (y - 380) / (h - 380);
    const r = Math.round(grass.r - 18 * t);
    const g = Math.round(grass.g - 22 * t);
    const b = Math.round(grass.b - 10 * t);
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      p.data[i] = r;
      p.data[i + 1] = g;
      p.data[i + 2] = b;
      p.data[i + 3] = 255;
      p.field[y * w + x] = -2;
    }
  }
  p.disc(660, 110, 55, '#ffd83d', 0); // sun
  p.fill(280, 300, 520, 345, '#b3392c', 1); // roof
  p.fill(300, 345, 500, 460, '#f2ede4', 2); // walls
  p.fill(360, 390, 390, 460, '#7a4a2b', 3); // door
  p.fill(310, 355, 340, 385, '#274060', 4); // window L
  p.fill(460, 355, 490, 385, '#274060', 5); // window R
  const img: SampleImage = { data: p.data, width: w, height: h };
  boxBlur(img, 1);
  // expected bead per pixel from the PRE-blur paint; blur-mixed pixels → null
  const expect: (string | null)[] = new Array(w * h).fill(null);
  const expectHex: (string | null)[] = new Array(w * h).fill(null);
  const fieldColors = ['#ffd83d', '#b3392c', '#f2ede4', '#7a4a2b', '#274060'];
  const fieldBeads = fieldColors.map((hex) => plainNearest(...Object.values(hexToRgb(hex)) as [number, number, number]));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const f = p.field[y * w + x]!;
      if (f < 0) continue;
      let uniform = true;
      for (let dy = -1; dy <= 1 && uniform; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (p.field[ny * w + nx]! !== f) {
            uniform = false;
            break;
          }
        }
      }
      if (uniform) {
        expect[y * w + x] = fieldBeads[f]!;
        expectHex[y * w + x] = fieldColors[f]!;
      }
    }
  }
  const noise = makeNoise(777, 8);
  for (let i = 0; i < w * h; i++) {
    const n = noise();
    img.data[i * 4] += n;
    img.data[i * 4 + 1] += n;
    img.data[i * 4 + 2] += n;
  }
  return { name: 'scene', img, expect, expectHex, cols: 58 };
}

/** 30-swatch color checker drawn from the palette itself — each interior
 *  cell must come back as its exact source bead. 840×700, board 70 wide. */
function checkerFixture(): Fixture {
  const w = 840;
  const h = 700;
  const swatch = 120;
  // 30 palette colors, reasonably separated: stride-sample the palette and
  // keep each color only if it is ≥0.12 Oklab from every kept one
  const kept: typeof MARD_COLORS = [];
  for (const c of MARD_COLORS) {
    const l = BEAD_LAB.get(c.id)!;
    if (kept.every((k) => Math.hypot(l.L - BEAD_LAB.get(k.id)!.L, l.a - BEAD_LAB.get(k.id)!.a, l.b - BEAD_LAB.get(k.id)!.b) >= 0.12)) {
      kept.push(c);
    }
    if (kept.length === 30) break;
  }
  if (kept.length < 24) throw new Error(`checker fixture degenerated: only ${kept.length} swatches`);
  const p = new Painter(w, h);
  const expect: (string | null)[] = new Array(w * h).fill(null);
  const expectHex: (string | null)[] = new Array(w * h).fill(null);
  kept.forEach((c, idx) => {
    const cx = (idx % 7) * swatch;
    const cy = Math.floor(idx / 7) * swatch;
    const rgb = hexToRgb(c.hex);
    p.fill(cx, cy, cx + swatch, cy + swatch, c.hex, idx);
    for (let y = cy + 6; y < cy + swatch - 6; y++) {
      for (let x = cx + 6; x < cx + swatch - 6; x++) {
        expect[y * w + x] = plainNearest(rgb.r, rgb.g, rgb.b);
        expectHex[y * w + x] = c.hex;
      }
    }
  });
  const img: SampleImage = { data: p.data, width: w, height: h };
  boxBlur(img, 1);
  const noise = makeNoise(31337, 6);
  for (let i = 0; i < w * h; i++) {
    const n = noise();
    img.data[i * 4] += n;
    img.data[i * 4 + 1] += n;
    img.data[i * 4 + 2] += n;
  }
  return { name: 'checker', img, expect, expectHex, cols: 70 };
}

/** Face fixture: beige field, two dark-brown eyes (36×24), red mouth
 *  (90×14) — small features vs cell size ≈ 13px. 800×600, board 58. */
function faceFixture(): Fixture {
  const w = 800;
  const h = 600;
  const p = new Painter(w, h);
  p.fill(0, 0, w, h, '#e8c49a', 0); // skin field
  p.fill(240, 250, 276, 274, '#4a3320', 1); // eye L
  p.fill(520, 250, 556, 274, '#4a3320', 1); // eye R
  p.fill(350, 400, 440, 414, '#c03535', 2); // mouth
  const img: SampleImage = { data: p.data, width: w, height: h };
  boxBlur(img, 1);
  const expect: (string | null)[] = new Array(w * h).fill(null);
  const expectHex: (string | null)[] = new Array(w * h).fill(null);
  const fieldColors = ['#e8c49a', '#4a3320', '#c03535'];
  const fieldBeads = fieldColors.map((hex) => {
    const c = hexToRgb(hex);
    return plainNearest(c.r, c.g, c.b);
  });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const f = p.field[y * w + x]!;
      let uniform = true;
      for (let dy = -1; dy <= 1 && uniform; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (p.field[ny * w + nx]! !== f) {
            uniform = false;
            break;
          }
        }
      }
      if (uniform) {
        expect[y * w + x] = fieldBeads[f]!;
        expectHex[y * w + x] = fieldColors[f]!;
      }
    }
  }
  const noise = makeNoise(999, 8);
  for (let i = 0; i < w * h; i++) {
    const n = noise();
    img.data[i * 4] += n;
    img.data[i * 4 + 1] += n;
    img.data[i * 4 + 2] += n;
  }
  return { name: 'face', img, expect, expectHex, cols: 58 };
}

/** Big-image runtime probe: 1600×1200 structured noise scene, board 116. */
function bigFixture(): Fixture {
  const w = 1600;
  const h = 1200;
  const p = new Painter(w, h);
  p.fill(0, 0, w, h, '#8899aa', -2); // background FIRST — blocks paint over it
  for (let f = 0; f < 40; f++) {
    const c = MARD_COLORS[(f * 7) % MARD_COLORS.length]!;
    p.fill(((f * 331) % w), ((f * 211) % h), ((f * 331) % w) + 180, ((f * 211) % h) + 140, c.hex, f);
  }
  const img: SampleImage = { data: p.data, width: w, height: h };
  boxBlur(img, 1);
  return { name: 'big', img, expect: new Array(w * h).fill(null), expectHex: new Array(w * h).fill(null), cols: 116 };
}

/* ------------------------------ metrics ------------------------------ */

/** Guarded match distance (the engine's own metric) from a hex to a bead. */
function guardedCost(srcHex: string, beadHex: string): number {
  const lab = rgbToOklab(hexToRgb(srcHex));
  const srcChroma = Math.hypot(lab.a, lab.b);
  const c = rgbToOklab(hexToRgb(beadHex));
  const candChroma = Math.hypot(c.a, c.b);
  const d = Math.hypot(lab.L - c.L, lab.a - c.a, lab.b - c.b);
  const gap = Math.abs(srcChroma - candChroma);
  const vivid = Math.max(0, candChroma - srcChroma);
  return d + 0.35 * gap + 0.75 * (srcChroma < 0.12 ? vivid : 0.35 * vivid);
}

/** Per-field-hex cache: best bead cost, and cost of any bead on demand. */
const fieldCost = new Map<string, { best: number }>();
function fieldBest(hex: string): number {
  let e = fieldCost.get(hex);
  if (!e) {
    let best = Infinity;
    for (const c of MARD_COLORS) best = Math.min(best, guardedCost(hex, c.hex));
    e = { best };
    fieldCost.set(hex, e);
  }
  return e.best;
}

/** A bead is a perceptual near-hit for a field color when its guarded cost
 *  sits within NEAR_SLACK of the best bead's. */
function nearHit(fieldHex: string, beadHex: string | undefined): boolean {
  if (!beadHex) return false;
  return guardedCost(fieldHex, beadHex) <= fieldBest(fieldHex) + NEAR_SLACK;
}

interface Metrics {
  name: string;
  cells: number;
  colors: number;
  meanErr: number;
  medianErr: number;
  p95Err: number;
  within005: number;
  purityStrict?: number;
  purity?: number;
  purityCells?: number;
  featureRecall?: number;
  ms: number;
}

/** Area-weighted linear-light mean color of the source under one cell. */
function cellMean(img: SampleImage, x0: number, x1: number, y0: number, y1: number): { L: number; a: number; b: number } | null {
  const { data, width, height } = img;
  let lr = 0;
  let lg = 0;
  let lb = 0;
  let wsum = 0;
  for (let py = Math.floor(y0); py < Math.ceil(y1); py++) {
    if (py < 0 || py >= height) continue;
    const wy = Math.min(y1, py + 1) - Math.max(y0, py);
    if (wy <= 0) continue;
    for (let px = Math.floor(x0); px < Math.ceil(x1); px++) {
      if (px < 0 || px >= width) continue;
      const wx = Math.min(x1, px + 1) - Math.max(x0, px);
      if (wx <= 0) continue;
      const wgt = wx * wy * (data[(py * width + px) * 4 + 3]! / 255);
      const i = (py * width + px) * 4;
      lr += LINEAR[data[i]!]! * wgt;
      lg += LINEAR[data[i + 1]!]! * wgt;
      lb += LINEAR[data[i + 2]!]! * wgt;
      wsum += wgt;
    }
  }
  if (wsum <= 0) return null;
  const rgb = {
    r: Math.round(linearToSrgb(lr / wsum) * 255),
    g: Math.round(linearToSrgb(lg / wsum) * 255),
    b: Math.round(linearToSrgb(lb / wsum) * 255),
  };
  return rgbToOklab(rgb);
}

function run(fx: Fixture): Metrics {
  const t0 = performance.now();
  const out = photoToPattern(fx.img, { cols: fx.cols, mode: 'smooth', simplify: 'keep' });
  const ms = performance.now() - t0;

  const errs: number[] = [];
  let within = 0;
  const beadOf = (id: string | null) => (id ? BEAD_LAB.get(id)! : null);
  // expected-bead id → clean field hex (for the near-hit metric)
  const fieldHexOf = new Map<string, string>();
  for (let p = 0; p < fx.expect.length; p++) {
    const e = fx.expect[p]!;
    const hx = fx.expectHex[p];
    if (e && hx && !fieldHexOf.has(e)) fieldHexOf.set(e, hx);
  }

  // purity: cells ≥90% one expected field (area-weighted over expect pixels)
  let pureCells = 0;
  let pureHits = 0;
  let pureStrict = 0;
  // per-field purity breakdown (scene fixture diagnosis)
  const perField = new Map<string, { hit: number; tot: number }>();
  // feature recall (face): cells ≥50% eye/mouth pixels that kept a non-field bead
  let featCells = 0;
  let featHits = 0;
  const fieldBeadFace = (() => {
    const c = hexToRgb('#e8c49a');
    return plainNearest(c.r, c.g, c.b);
  })();

  for (let y = 0; y < out.rows; y++) {
    for (let x = 0; x < out.cols; x++) {
      const idx = y * out.cols + x;
      const id = out.cells[idx];
      if (!id) continue;
      const lab = beadOf(id)!;
      const mean = cellMean(fx.img, (x * fx.img.width) / out.cols, ((x + 1) * fx.img.width) / out.cols, (y * fx.img.height) / out.rows, ((y + 1) * fx.img.height) / out.rows);
      if (mean) {
        const e = Math.hypot(mean.L - lab.L, mean.a - lab.a, mean.b - lab.b);
        errs.push(e);
        if (e < 0.05) within++;
      }
      // purity over expected pixels in the cell footprint
      const tally = new Map<string, number>();
      const px0 = Math.floor((x * fx.img.width) / out.cols);
      const px1 = Math.ceil(((x + 1) * fx.img.width) / out.cols);
      const py0 = Math.floor((y * fx.img.height) / out.rows);
      const py1 = Math.ceil(((y + 1) * fx.img.height) / out.rows);
      let tot = 0;
      for (let py = py0; py < py1 && py < fx.img.height; py++) {
        for (let px = px0; px < px1 && px < fx.img.width; px++) {
          const e = fx.expect[py * fx.img.width + px]!;
          if (!e) continue;
          tot++;
          tally.set(e, (tally.get(e) ?? 0) + 1);
        }
      }
      if (tot > 0) {
        let top = '';
        let topN = 0;
        for (const [bid, n] of tally) if (n > topN) ((topN = n), (top = bid));
        const topHex = fieldHexOf.get(top);
        const near = topHex ? nearHit(topHex, mardById(id!)?.hex) : false;
        if (topN / tot >= 0.9) {
          pureCells++;
          if (id === top) pureStrict++;
          if (id === top || near) pureHits++;
          const f = perField.get(top) ?? { hit: 0, tot: 0 };
          f.tot++;
          if (id === top || near) f.hit++;
          perField.set(top, f);
        }
        if (fx.name === 'face' && top !== fieldBeadFace && topN / tot >= 0.5) {
          featCells++;
          if (id !== fieldBeadFace && near) featHits++;
        }
      }
    }
  }
  errs.sort((a, b) => a - b);
  const q = (p: number) => errs[Math.min(errs.length - 1, Math.floor(p * errs.length))]!;
  const colors = new Set(out.cells.filter(Boolean)).size;
  if (process.env.BENCH_DEBUG) {
    for (const [bid, f] of perField) {
      const bead = mardById(bid)!;
      console.log(`    field ${bead.code} ${bead.hex}: ${f.hit}/${f.tot} = ${((f.hit / f.tot) * 100).toFixed(0)}%`);
    }
  }
  return {
    name: fx.name,
    cells: errs.length,
    colors,
    meanErr: errs.reduce((s, e) => s + e, 0) / errs.length,
    medianErr: q(0.5),
    p95Err: q(0.95),
    within005: within / errs.length,
    purityStrict: pureCells ? pureStrict / pureCells : undefined,
    purity: pureCells ? pureHits / pureCells : undefined,
    purityCells: pureCells,
    featureRecall: featCells ? featHits / featCells : undefined,
    ms,
  };
}

/* ------------------------------ main ------------------------------ */

const only = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : null;
const fixtures = [sceneFixture(), checkerFixture(), faceFixture(), bigFixture()].filter(
  (f) => !only || f.name === only,
);

const rows: Metrics[] = [];
for (const fx of fixtures) rows.push(run(fx));

const fmt = (n: number | undefined) => (n === undefined ? '—' : n.toFixed(3));
console.log(
  'fixture    cells  colors  meanErr  medErr  p95Err  <0.05   purityNear(cells)      strict   featRecall   ms',
);
for (const r of rows) {
  console.log(
    `${r.name.padEnd(9)} ${String(r.cells).padStart(6)} ${String(r.colors).padStart(6)}  ` +
      `${fmt(r.meanErr).padStart(7)} ${fmt(r.medianErr).padStart(7)} ${fmt(r.p95Err).padStart(7)} ` +
      `${(r.within005 * 100).toFixed(1).padStart(5)}%  ` +
      `${r.purity === undefined ? '—' : (r.purity * 100).toFixed(1) + '%'} (${r.purityCells ?? 0})`.padEnd(20) +
      `${r.purityStrict === undefined ? '—' : (r.purityStrict * 100).toFixed(1) + '%'}`.padEnd(9) +
      `${r.featureRecall === undefined ? '—' : (r.featureRecall * 100).toFixed(1) + '%'}`.padEnd(13) +
      `${r.ms.toFixed(0)}`,
  );
}
