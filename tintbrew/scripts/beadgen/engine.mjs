// Bead pattern engine — vector shapes → supersampled raster → zone grid.
// Shared by every pattern definition in scripts/beadgen/*.mjs.
// A pattern is drawn as closed polygons in painter's order; each cell gets a
// 12×12 majority vote; an optional K rim pass outlines zones that touch empty
// space. This file is the single source of the grid — never hand-edit rows.
import { BEAD_COLORS_SNAPSHOT } from './palette.mjs';

export const SS = 12; // supersamples per cell edge
export const FILL_MIN = 0.32 * SS * SS;

// ---------- geometry: everything flattens to a closed polygon [[x,y],...] ----------
export const cubic = (p0, c1, c2, p1, n) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0],
      u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1],
    ];
  });

export const quad = (p0, c, p1, n) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]];
  });

// arc bulging toward (nx,ny) by w (k = w*1.3333 control offset)
export function arcSide(p0, p1, nx, ny, w, n = 24) {
  const k = w * 1.3333;
  const c1 = [p0[0] + (p1[0] - p0[0]) / 3 + nx * k, p0[1] + (p1[1] - p0[1]) / 3 + ny * k];
  const c2 = [p0[0] + 2 * (p1[0] - p0[0]) / 3 + nx * k, p0[1] + 2 * (p1[1] - p0[1]) / 3 + ny * k];
  return cubic(p0, c1, c2, p1, n);
}

// lens: two pointed tips, bulge wR right of the chord, wL left (locks, horns, ears)
export function banana(t0, t1, wR, wL, n = 26) {
  const dx = t1[0] - t0[0], dy = t1[1] - t0[1], len = Math.hypot(dx, dy);
  const nx = dy / len, ny = -dx / len;
  return [...arcSide(t0, t1, nx, ny, wR, n), ...arcSide(t1, t0, -nx, -ny, wL, n)];
}

// leaf: wide base, pointed tip (ears, spikes)
export const leaf = (baseL, tip, baseR, wL, wR) => [
  ...arcSide(baseL, tip, -1, 0, wL, 16),
  ...arcSide(tip, baseR, 1, 0, wR, 16),
];

export const ellipse = (cx, cy, rx, ry, seg = 56) =>
  Array.from({ length: seg }, (_, i) => {
    const t = (i / seg) * 2 * Math.PI;
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
  });

export const circle = (cx, cy, r, seg = 48) => ellipse(cx, cy, r, r, seg);

// egg: width tapers toward the bottom (rounder cheeks, narrower chin)
export const egg = (cx, cy, a, b, taper, seg = 72) =>
  Array.from({ length: seg }, (_, i) => {
    const t = (i / seg) * 2 * Math.PI;
    return [cx + a * Math.cos(t) * (1 - taper * Math.max(0, Math.sin(t))), cy + b * Math.sin(t)];
  });

// right-edge shading crescent that follows the egg outline exactly
export function eggRingRight(cx, cy, a, b, taper, inset, n = 30) {
  const P = (aa, bb, t) => [cx + aa * Math.cos(t) * (1 - taper * Math.max(0, Math.sin(t))), cy + bb * Math.sin(t)];
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = -Math.PI / 2 + (Math.PI * i) / n; pts.push(P(a, b, t)); }
  for (let i = n; i >= 0; i--) { const t = -Math.PI / 2 + (Math.PI * i) / n; pts.push(P(a - inset, b - inset, t)); }
  return pts;
}

export function heart(cx, cy, s, n = 72) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * 2 * Math.PI;
    return [
      cx + 16 * Math.sin(t) ** 3 * s,
      cy - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s,
    ];
  });
}

// half-annulus hugging the right / bottom / left edge of an ellipse pair
function halfRing(cx, cy, RX, RY, rx, ry, a0, a1, n = 30) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = a0 + ((a1 - a0) * i) / n; pts.push([cx + RX * Math.cos(t), cy + RY * Math.sin(t)]); }
  for (let i = n; i >= 0; i--) { const t = a0 + ((a1 - a0) * i) / n; pts.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); }
  return pts;
}
export const halfRingRight = (cx, cy, RX, RY, rx, ry) => halfRing(cx, cy, RX, RY, rx, ry, -Math.PI / 2, Math.PI / 2);
export const halfRingLeft = (cx, cy, RX, RY, rx, ry) => halfRing(cx, cy, RX, RY, rx, ry, Math.PI / 2, (3 * Math.PI) / 2);
export const halfRingBottom = (cx, cy, RX, RY, rx, ry) => halfRing(cx, cy, RX, RY, rx, ry, 0, Math.PI);
export const halfRingTop = (cx, cy, RX, RY, rx, ry) => halfRing(cx, cy, RX, RY, rx, ry, Math.PI, 2 * Math.PI);

// full annulus (wreath, donut, rings)
export const ring = (cx, cy, R, r, n = 56) => [
  ...Array.from({ length: n }, (_, i) => {
    const t = (i / n) * 2 * Math.PI;
    return [cx + R * Math.cos(t), cy + R * Math.sin(t)];
  }),
  ...Array.from({ length: n }, (_, i) => {
    const t = ((n - i) / n) * 2 * Math.PI;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  }),
];

// annular sector (smiles, eyebrows) — degrees
export function sector(cx, cy, r0, r1, a0, a1, n = 22) {
  const P = (r, a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(P(r1, a0 + ((a1 - a0) * i) / n));
  for (let i = n; i >= 0; i--) pts.push(P(r0, a0 + ((a1 - a0) * i) / n));
  return pts;
}

// open polyline sampled along an elliptical arc (degrees) — feed to stroke()
export const arcPts = (cx, cy, rx, ry, a0, a1, n = 20) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
  });

// thick open stroke with round caps (antennae, legs, steam, whiskers, smiles)
export function stroke(pts, w, cap = 8) {
  const h = w / 2;
  const dense = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const n = Math.max(2, Math.round(Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]) * 2));
    for (let j = 0; j < n; j++) dense.push(quad(pts[i], [(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2], pts[i + 1], n)[j]);
  }
  dense.push(pts[pts.length - 1]);
  const L = [], R = [];
  for (let i = 0; i < dense.length; i++) {
    const a = dense[Math.max(0, i - 1)], b = dense[Math.min(dense.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    L.push([dense[i][0] + nx * h, dense[i][1] + ny * h]);
    R.push([dense[i][0] - nx * h, dense[i][1] - ny * h]);
  }
  const start = dense[0], end = dense[dense.length - 1];
  // caps rotate with the end direction: each sweeps a semicircle from the
  // L-side normal, through the outward point, to the R-side normal — the
  // loop stays continuous and never self-intersects (fixed angles broke
  // horizontal strokes by crossing back over the cap)
  const a0 = Math.atan2(dense[1][1] - dense[0][1], dense[1][0] - dense[0][0]);
  const a1 = Math.atan2(end[1] - dense[dense.length - 2][1], end[0] - dense[dense.length - 2][0]);
  const capPts = (p, base) =>
    Array.from({ length: cap }, (_, k) => {
      const t = base - (Math.PI * (k + 0.5)) / cap;
      return [p[0] + h * Math.cos(t), p[1] + h * Math.sin(t)];
    });
  return [...L, ...capPts(end, a1 + Math.PI / 2), ...R.reverse(), ...capPts(start, a0 - Math.PI / 2)];
}

// polygon with rounded corners (boxes, slices, cones)
export function roundedPoly(pts, r) {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    const d1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) || 1;
    const d2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) || 1;
    const r1 = Math.min(r, d1 / 2.2), r2 = Math.min(r, d2 / 2.2);
    const a = [p1[0] + ((p0[0] - p1[0]) / d1) * r1, p1[1] + ((p0[1] - p1[1]) / d1) * r1];
    const b = [p1[0] + ((p2[0] - p1[0]) / d2) * r2, p1[1] + ((p2[1] - p1[1]) / d2) * r2];
    out.push(...quad(a, p1, b, 10));
  }
  return out;
}

export const roundedRect = (x, y, w, h, r = 3) =>
  roundedPoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], r);

// star polygon (straight edges; rot = -90 points up)
export function star(cx, cy, R, r, points = 5, rot = -90) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = ((rot + (180 * i) / points) * Math.PI) / 180;
    pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  return pts;
}

// scalloped band under a straight top edge (fringes, lettuce, hems)
export function scallopBand(x0, x1, yTop, depth, th, n = 4) {
  const outer = [], inner = [];
  for (let i = 0; i < n; i++) {
    const xa = x1 - ((x1 - x0) * i) / n, xb = x1 - ((x1 - x0) * (i + 1)) / n;
    outer.push(...arcSide([xa, yTop], [xb, yTop], 0, 1, depth, 10));
    inner.push(...arcSide([xb, yTop], [xa, yTop], 0, 1, depth - th, 10));
  }
  return [...outer, ...inner.reverse()];
}

// sine band between two wavy horizontal curves (lettuce ruffle, steam)
export function waveBand(x0, x1, y, amp, waves, th, n = 72) {
  const top = [], bot = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const dy = Math.sin((i / n) * waves * 2 * Math.PI) * amp;
    top.push([x, y + dy]);
    bot.push([x, y + dy - th]);
  }
  return [...top, ...bot.reverse()];
}

// rotate a polygon around (cx,cy) by degrees
export const rot = (poly, cx, cy, deg) => {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return poly.map(([x, y]) => {
    const dx = x - cx, dy = y - cy;
    return [cx + dx * c - dy * s, cy + dx * s + dy * c];
  });
};

export const mirrorX = (poly, W) => poly.map(([x, y]) => [W - x, y]);

// single-bead dot centered on cell (x,y) — radius keeps the whole vote in one cell
export const dot = (G, z, x, y) => G.add(z, ellipse(x + 0.5, y + 0.5, 0.85, 0.85));

// ---------- rasterizer ----------
export function rasterize(meta) {
  const { W: GW, H: GH } = meta;
  const zoneIds = ['.', ...Object.keys(meta.zones)];
  const id = Object.fromEntries(zoneIds.map((z, i) => [z, i]));
  const shapes = [];
  const add = (zone, poly, clip) => shapes.push({ zone, poly, clip });

  const G = {
    W: GW, H: GH, CX: GW / 2, add, mirror: (poly) => mirrorX(poly, GW),
    // draw poly + its mirror in one call
    addM(zone, poly, clip) { add(zone, poly, clip); add(zone, mirrorX(poly, GW), clip); },
  };
  meta.draw(G);

  const SW = GW * SS, SH = GH * SS;
  const samples = new Uint8Array(SW * SH);
  for (const sh of shapes) {
    const z = id[sh.zone], clip = sh.clip ? id[sh.clip] : 0;
    if (z === undefined) throw new Error(`unknown zone '${sh.zone}'`);
    if (sh.clip && id[sh.clip] === undefined) throw new Error(`unknown clip '${sh.clip}'`);
    const ys = sh.poly.map((p) => p[1]);
    const y0 = Math.max(0, Math.floor(Math.min(...ys) * SS)), y1 = Math.min(SH - 1, Math.ceil(Math.max(...ys) * SS));
    const n = sh.poly.length;
    for (let sy = y0; sy <= y1; sy++) {
      const yy = (sy + 0.5) / SS;
      const xs = [];
      for (let i = 0; i < n; i++) {
        const [x1, y1p] = sh.poly[i], [x2, y2p] = sh.poly[(i + 1) % n];
        if ((y1p <= yy) !== (y2p <= yy)) xs.push(x1 + ((yy - y1p) * (x2 - x1)) / (y2p - y1p));
      }
      xs.sort((p, q) => p - q);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const sx0 = Math.max(0, Math.ceil(xs[k] * SS - 0.5)), sx1 = Math.min(SW - 1, Math.floor(xs[k + 1] * SS - 0.5));
        for (let sx = sx0; sx <= sx1; sx++) {
          if (!clip || samples[sy * SW + sx] === clip) samples[sy * SW + sx] = z;
        }
      }
    }
  }

  // per-cell majority vote
  const grid = [];
  const counts = new Map();
  for (let cy = 0; cy < GH; cy++) {
    let row = '';
    for (let cx = 0; cx < GW; cx++) {
      const tally = new Uint8Array(zoneIds.length);
      for (let j = 0; j < SS; j++) for (let i = 0; i < SS; i++) tally[samples[(cy * SS + j) * SW + cx * SS + i]]++;
      let best = 0, bn = 0;
      for (let zi = 1; zi < tally.length; zi++) if (tally[zi] > bn) { bn = tally[zi]; best = zi; }
      const z = bn >= FILL_MIN ? zoneIds[best] : '.';
      row += z;
      if (z !== '.') counts.set(z, (counts.get(z) ?? 0) + 1);
    }
    grid.push(row);
  }

  // K rim pass: zones in `rim` get a black rim where they touch empty space,
  // or where they touch a zone listed in `rimAgainst[z]`. Marks are decided
  // against the pre-rim grid and applied afterwards — converting cells
  // in-place mid-scan used to hide the empty neighbor from the next cell
  // over, leaving scan-order holes in the ring (the bear's ears shipped
  // without side outlines that way).
  const rimSet = new Set(meta.rim ?? []);
  const rimAgainst = new Map(Object.entries(meta.rimAgainst ?? {}).map(([z, v]) => [z, new Set(v)]));
  const rimMarks = [];
  for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
    const z = grid[y][x];
    if (z === '.' || z === 'K' || !rimSet.has(z)) continue;
    const nb = [[0, -1], [0, 1], [-1, 0], [1, 0]].map(([dx, dy]) => grid[y + dy]?.[x + dx] ?? '.');
    const against = rimAgainst.get(z);
    if (nb.some((v) => v === '.') || (against && nb.some((v) => against.has(v)))) rimMarks.push([x, y, z]);
  }
  for (const [x, y, z] of rimMarks) {
    grid[y] = grid[y].slice(0, x) + 'K' + grid[y].slice(x + 1);
    counts.set(z, counts.get(z) - 1);
    counts.set('K', (counts.get('K') ?? 0) + 1);
  }

  // drop isolated single beads of outline-ish zones (rim-pass noise at thin
  // tips); intentional singles (sprinkles, seeds) are declared in singlesOk.
  // Neighbors include diagonals: outline staircases connect diagonally, and
  // straight 4-adjacency deleted every corner bead of a diagonal rim.
  for (const z of meta.dropSingles ?? ['K']) {
    for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
      if (grid[y][x] !== z) continue;
      const nb = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(([dx, dy]) => grid[y + dy]?.[x + dx] ?? '.');
      if (!nb.some((v) => v === z)) {
        grid[y] = grid[y].slice(0, x) + '.' + grid[y].slice(x + 1);
        counts.set(z, counts.get(z) - 1);
      }
    }
  }

  // trim fully-empty leading/trailing rows unless the def keeps them (unicorn)
  let rows = grid;
  if (meta.trim !== false) {
    while (rows.length && rows[0].split('').every((c) => c === '.')) rows = rows.slice(1);
    while (rows.length && rows[rows.length - 1].split('').every((c) => c === '.')) rows = rows.slice(0, -1);
  }
  return { rows, counts, W: GW };
}

// ---------- audits ----------
export function audit(meta, rows, counts) {
  const problems = [], notes = [];
  const W = meta.W;
  for (const [y, r] of rows.entries()) if (r.length !== W) problems.push(`row ${y} length ${r.length} ≠ ${W}`);
  const declared = Object.keys(meta.zones);
  for (const z of declared) if (!counts.has(z)) problems.push(`zone ${z} (${meta.zones[z].label}) unused`);
  for (const z of counts.keys()) if (!declared.includes(z)) problems.push(`undeclared zone ${z} in grid`);
  if (declared.length < 4) problems.push(`only ${declared.length} zones (min 4)`);
  for (const [z, n] of counts) if (n < 4 && !((meta.singlesOk ?? []).includes(z))) notes.push(`zone ${z} (${meta.zones[z].label}) has only ${n} beads`);

  // symmetry: per-row span center vs grid center (mirror designs only)
  if (meta.mirror) {
    let spanL = Infinity, spanR = -Infinity;
    rows.forEach((r) => {
      const xs = [...r].map((c, i) => (c === '.' ? -1 : i)).filter((i) => i >= 0);
      if (xs.length) { spanL = Math.min(spanL, xs[0]); spanR = Math.max(spanR, xs[xs.length - 1]); }
    });
    const C = (spanL + spanR) / 2;
    const bad = [];
    rows.forEach((r, y) => {
      const xs = [...r].map((c, i) => (c === '.' ? -1 : i)).filter((i) => i >= 0);
      if (!xs.length) return;
      const c = (xs[0] + xs[xs.length - 1]) / 2;
      if (Math.abs(c - C) > 0.75) bad.push(`r${y}(off ${c - C > 0 ? '+' : ''}${(c - C).toFixed(1)})`);
    });
    if (bad.length) notes.push(`asym rows: ${bad.slice(0, 8).join(' ')}${bad.length > 8 ? ` +${bad.length - 8}` : ''}`);
  }

  // isolated single beads (flood fill per zone)
  const singles = [];
  const seen = rows.map((r) => [...r].map(() => false));
  for (let y = 0; y < rows.length; y++) for (let x = 0; x < W; x++) {
    const z = rows[y][x];
    if (z === '.' || seen[y][x]) continue;
    const stack = [[x, y]], comp = [];
    seen[y][x] = true;
    while (stack.length) {
      const [px, py] = stack.pop();
      comp.push([px, py]);
      for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
        const nx = px + dx, ny = py + dy;
        if (rows[ny]?.[nx] === z && !seen[ny][nx]) { seen[ny][nx] = true; stack.push([nx, ny]); }
      }
    }
    if (comp.length === 1) singles.push(`${z}@${x},${y}`);
  }
  if (singles.length) notes.push(`isolated single beads: ${singles.slice(0, 8).join(' ')}${singles.length > 8 ? ` +${singles.length - 8}` : ''}`);

  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  return { problems, notes, total };
}

// ---------- SVG render ----------
const U = 10;
export function svg(def, rows) {
  const hex = (z) => BEAD_COLORS_SNAPSHOT[def.zones[z].color];
  let inner = '';
  rows.forEach((row, y) => {
    for (let x = 0; x < def.W; x++) {
      const ch = row[x];
      if (ch === '.') continue;
      inner += `<rect x="${(x * U + 0.8).toFixed(1)}" y="${(y * U + 0.8).toFixed(1)}" width="${U - 1.6}" height="${U - 1.6}" rx="2.6" fill="${hex(ch)}"/>`;
    }
  });
  const w = def.W * U, h = rows.length * U, pad = 16;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w + pad * 2} ${h + pad * 2}" width="${w + pad * 2}" height="${h + pad * 2}">` +
    `<rect width="${w + pad * 2}" height="${h + pad * 2}" fill="#fbfaf7"/>` +
    `<g transform="translate(${pad},${pad})">${inner}</g></svg>`
  );
}

export function generate(def) {
  const { rows, counts } = rasterize(def);
  const a = audit(def, rows, counts);
  return { rows, counts, audit: a };
}
