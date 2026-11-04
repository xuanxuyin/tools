/**
 * Region-polygon extractor for /coloring/ payloads — the in-repo generator the
 * launch pipeline never had. The line art IS the ground truth (it is what the
 * player sees composited with 'multiply'), so regions are cut from its pixels:
 *
 *   1. label      4-connected white components (luma >= INK_T is fillable);
 *                 border-touching components merge into one background ring
 *   2. absorb     white specks under MIN_AREA merge into their longest-border
 *                 neighbour, so texture dots stay colorable but not fiddly
 *   3. claim ink  every ink pixel joins the smallest adjacent region, dilated
 *                 to convergence — polygons tile the WHOLE canvas, so there is
 *                 no white halo between a fill and its line, and tapping a
 *                 line still fills the cell it belongs to
 *   4. split      re-label connected components (absorbs can disconnect a
 *                 label; each component becomes its own ring)
 *   5. trace      Moore outer contour per ring, Douglas-Peucker(1.1px)
 *   6. verify     rings re-rasterized with the paint island's EXACT scanline
 *                 algorithm must reproduce the label map (>= VERIFY_MIN)
 *
 * Usage:  node scripts/coloring-seg/seg.mjs <outDir> [slug ...]   (no slugs = all 210)
 * Emits   <outDir>/data/<slug>.json  +  <outDir>/index.json  (+ verify report)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require(require.resolve('sharp', { paths: [fileURLToPath(new URL('../..', import.meta.url))] }));

const INK_T = 185; // luma below = boundary ink (AA-thin lines included); above = fillable
const MIN_AREA = +(process.env.SEG_MIN_AREA ?? 14); // speck cutoff, px
const DP_EPS = +(process.env.SEG_EPS ?? 1.1); // contour simplification tolerance, px
const VERIFY_MIN = 0.985; // required rasterizer-vs-labelmap agreement
const ROOT = fileURLToPath(new URL('../..', import.meta.url));

// ------------------------------------------------------------------ labeling

/** 4-connected components over `lab0`, grouping pixels where sameKind(v) is
 *  equal and non-zero. Returns {lab, area}: lab holds new component ids
 *  (1..n, 0 = ungrouped), area maps id -> pixel count. Fresh ids never collide
 *  with source values — visited state is tracked separately. */
function labelComponents(lab0, w, h, sameKind) {
  const lab = new Int32Array(w * h);
  const seen = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  let next = 1;
  const area = new Map();
  for (let i = 0; i < w * h; i++) {
    const kind = sameKind(lab0[i]);
    if (kind === 0 || seen[i]) continue;
    const id = next++;
    area.set(id, 0);
    let sp = 0;
    stack[sp++] = i;
    seen[i] = 1;
    lab[i] = id;
    while (sp > 0) {
      const p = stack[--sp];
      area.set(id, area.get(id) + 1);
      const x = p % w;
      const y = (p / w) | 0;
      if (x > 0 && !seen[p - 1] && sameKind(lab0[p - 1]) === kind) (seen[(stack[sp++] = p - 1)] = 1), (lab[p - 1] = id);
      if (x < w - 1 && !seen[p + 1] && sameKind(lab0[p + 1]) === kind) (seen[(stack[sp++] = p + 1)] = 1), (lab[p + 1] = id);
      if (y > 0 && !seen[p - w] && sameKind(lab0[p - w]) === kind) (seen[(stack[sp++] = p - w)] = 1), (lab[p - w] = id);
      if (y < h - 1 && !seen[p + w] && sameKind(lab0[p + w]) === kind) (seen[(stack[sp++] = p + w)] = 1), (lab[p + w] = id);
    }
  }
  return { lab, area };
}

/** Merge speck labels (< MIN_AREA, excluding background) into the neighbouring
 *  non-speck label with the longest shared border. Larger specks resolve first
 *  so chains funnel into a real region. Single label-map rewrite afterwards. */
function absorbSpecks(lab, area, w, h) {
  const specks = [...area.keys()].filter((id) => id > 0 && area.get(id) < MIN_AREA).sort((a, b) => area.get(b) - area.get(a));
  const speckSet = new Set(specks);
  // adjacency: speck -> Map(neighbour -> shared edge count), one full scan
  const adj = new Map();
  for (let i = 0; i < lab.length; i++) {
    const a = lab[i];
    if (!speckSet.has(a)) continue;
    const x = i % w;
    if (x > 0) tally(adj, a, lab[i - 1], speckSet);
    if (x < w - 1) tally(adj, a, lab[i + 1], speckSet);
    if (i >= w) tally(adj, a, lab[i - w], speckSet);
    if (i < lab.length - w) tally(adj, a, lab[i + w], speckSet);
  }
  const target = new Map(); // speck -> live label (or another speck)
  for (const s of specks) {
    let best = 0;
    let bestLen = 0;
    for (const [n, len] of adj.get(s) ?? []) {
      const live = speckSet.has(n) ? (target.get(n) ?? 0) : n;
      if (live > 0 && live !== s && len > bestLen) {
        best = live;
        bestLen = len;
      }
    }
    if (best > 0) target.set(s, best);
  }
  for (let i = 0; i < lab.length; i++) {
    let t = target.get(lab[i]);
    let guard = 0;
    while (t !== undefined && target.has(t) && guard++ < 128) t = target.get(t);
    if (t !== undefined) lab[i] = t;
  }
}
function tally(adj, a, b, speckSet) {
  if (b === a || b === 0 || b === undefined) return; // 0 = ink, skip
  if (speckSet.has(b)) return; // speck-speck edges resolved via chains below
  let m = adj.get(a);
  if (!m) adj.set(a, (m = new Map()));
  m.set(b, (m.get(b) ?? 0) + 1);
}

/** Every ink pixel joins its smallest-area labelled neighbour, dilating to
 *  convergence (thick texture masses split between surrounding cells). */
function claimInk(lab, area, w, h) {
  const areaOf = (id) => (id < 0 ? 1e12 : area.get(id) ?? 1e12); // bg never wins
  let active = [];
  for (let i = 0; i < lab.length; i++) {
    if (lab[i] !== 0) continue;
    const x = i % w;
    if (
      (x > 0 && lab[i - 1] !== 0) || (x < w - 1 && lab[i + 1] !== 0) ||
      (i >= w && lab[i - w] !== 0) || (i < lab.length - w && lab[i + w] !== 0)
    ) active.push(i);
  }
  while (active.length) {
    const next = [];
    const wake = (q) => {
      if (lab[q] === 0) next.push(q); // wavefront must GROW: a freshly
      // claimed pixel turns its still-ink neighbours claimable — without
      // this, ink more than one px deep inside a thick stroke is never
      // reached and stays dead under every ring
    };
    for (const p of active) {
      if (lab[p] !== 0) continue;
      const x = p % w;
      let best = 0;
      let bestA = Infinity;
      const try_ = (q) => {
        const l = lab[q];
        if (l !== 0 && areaOf(l) < bestA) {
          best = l;
          bestA = areaOf(l);
        }
      };
      if (x > 0) try_(p - 1);
      if (x < w - 1) try_(p + 1);
      if (p >= w) try_(p - w);
      if (p < lab.length - w) try_(p + w);
      if (best !== 0) {
        lab[p] = best;
        if (x > 0) wake(p - 1);
        if (x < w - 1) wake(p + 1);
        if (p >= w) wake(p - w);
        if (p < lab.length - w) wake(p + w);
      }
    }
    active = next;
  }
}

// ------------------------------------------------------------------ morphology

/** Separable binary erode/dilate with a square(r) structuring element. */
function morph(mask, w, h, r, pickMax) {
  const tmp = new Uint8Array(mask.length);
  const out = new Uint8Array(mask.length);
  const pick = pickMax ? Math.max : Math.min;
  // horizontal
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let v = pickMax ? 0 : 1;
      const x0 = Math.max(0, x - r);
      const x1 = Math.min(w - 1, x + r);
      for (let k = x0; k <= x1; k++) v = pick(v, mask[row + k]);
      tmp[row + x] = v;
    }
  }
  // vertical
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let v = pickMax ? 0 : 1;
      const y0 = Math.max(0, y - r);
      const y1 = Math.min(h - 1, y + r);
      for (let k = y0; k <= y1; k++) v = pick(v, tmp[k * w + x]);
      out[y * w + x] = v;
    }
  }
  return out;
}

/**
 * Line mask for heavy-texture art. luma < INK_T catches both the (AA-soft)
 * outlines and interior shading blobs; players should color OVER shading while
 * outlines stay boundaries. Blobs survive an opening of radius SEG_OPEN_R and
 * are subtracted; structures thinner than ~2r+1 (the drawn lines) remain ink.
 */
function lineMask(data, w, h) {
  const r = +(process.env.SEG_OPEN_R ?? 0);
  const gray = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) gray[i] = data[i] < INK_T ? 1 : 0;
  if (r <= 0) return gray;
  const blobs = morph(morph(gray, w, h, r, false), w, h, r, true); // opening
  const ink = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) ink[i] = gray[i] && !blobs[i] ? 1 : 0;
  return ink;
}

// ------------------------------------------------------------------ contour

const DIRS = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];

/** Moore-neighbour outer contour of one label. `start` = its topmost-leftmost
 *  pixel. Returns flat [x,y, x,y, ...] vertices. */
function traceContour(lab, id, start, w, h) {
  const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : lab[y * w + x] === id ? 1 : 0);
  const sx = start % w;
  const sy = (start / w) | 0;
  const pts = [sx, sy];
  let cx = sx;
  let cy = sy;
  let dir = 0; // entered from the West (scan order), backtrack points West
  let guard = w * h * 4;
  for (;;) {
    if (guard-- <= 0) break;
    let found = false;
    for (let k = 1; k <= 8; k++) {
      const d = (dir + k) & 7;
      const nx = cx + DIRS[d][0];
      const ny = cy + DIRS[d][1];
      if (at(nx, ny)) {
        pts.push(nx, ny);
        dir = (d + 4) & 7;
        cx = nx;
        cy = ny;
        found = true;
        break;
      }
    }
    if (!found) break; // single-pixel ring
    // Jacob's stopping criterion: closed only when the start pixel is
    // re-entered moving East (backtrack West), i.e. the walk is back at its
    // initial state. A deterministic walk over a finite state space always
    // returns to its initial state, so this fires; stopping at any earlier
    // revisit truncates the contour (spur starts, pinch points) and the
    // polygon balloons over its neighbours.
    if (cx === sx && cy === sy && dir === 0) break;
  }
  return pts;
}

/** Iterative Douglas-Peucker over flat [x,y,...]; keeps first/last, min 3 pts. */
function simplify(flat, eps) {
  const n = flat.length / 2;
  if (n < 4) return flat;
  const keep = new Uint8Array(n);
  keep[0] = keep[n - 1] = 1;
  const stack = [[0, n - 1]];
  const eps2 = eps * eps;
  while (stack.length) {
    const [a, b] = stack.pop();
    const ax = flat[2 * a];
    const ay = flat[2 * a + 1];
    const dx = flat[2 * b] - ax;
    const dy = flat[2 * b + 1] - ay;
    const len2 = dx * dx + dy * dy;
    let worst = -1;
    let wd = 0;
    for (let i = a + 1; i < b; i++) {
      const px = flat[2 * i];
      const py = flat[2 * i + 1];
      let d;
      if (len2 === 0) d = (px - ax) ** 2 + (py - ay) ** 2;
      else {
        let t = ((px - ax) * dx + (py - ay) * dy) / len2;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        d = (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2;
      }
      if (d > wd) {
        wd = d;
        worst = i;
      }
    }
    if (wd > eps2 && worst > 0) {
      keep[worst] = 1;
      stack.push([a, worst], [worst, b]);
    }
  }
  const out = [];
  for (let i = 0; i < n; i++) if (keep[i]) out.push(flat[2 * i], flat[2 * i + 1]);
  return out;
}

/** Crack-follow one component's full boundary as corner-coordinate loops.
 *  Directed unit edges run along pixel-grid lines with the component on a
 *  fixed side; the successor of every directed edge is unique and the state
 *  graph is a permutation of edges, so every walk closes exactly (no
 *  early-termination heuristics) and the loops partition into outer boundary
 *  (clockwise in y-down screen coords) plus one loop per HOLE
 *  (counterclockwise — the winding canvas 'nonzero' needs). Vertices are
 *  emitted only where the walk turns, collapsing straight runs. */
function crackLoops(lab, id, w, h) {
  const inR = (x, y) => x >= 0 && y >= 0 && x < w && y < h && lab[y * w + x] === id;
  const DX = [1, 0, -1, 0];
  const DY = [0, 1, 0, -1];
  const seen = new Set(); // directed edge key: ((y*(w+1)+x)<<2)|dir
  const loops = [];
  const key = (x, y, d) => ((y * (w + 1) + x) << 2) | d;
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      if (lab[py * w + px] !== id) continue;
      // every boundary edge this pixel emits (region kept on its due side)
      const seeds = [];
      if (!inR(px, py - 1)) seeds.push([px, py, 0]); // E, region below
      if (!inR(px + 1, py)) seeds.push([px + 1, py, 1]); // S, region on its left
      if (!inR(px, py + 1)) seeds.push([px + 1, py + 1, 2]); // W, region above
      if (!inR(px - 1, py)) seeds.push([px, py + 1, 3]); // N, region on its right
      for (const [sx, sy, sd] of seeds) {
        if (seen.has(key(sx, sy, sd))) continue;
        const loop = [];
        let cx = sx;
        let cy = sy;
        let d = sd;
        let guard = 4 * (w + 1) * (h + 1); // permutation cycles close; paranoia only
        for (;;) {
          if (guard-- <= 0) break;
          seen.add(key(cx, cy, d));
          const bx = cx + DX[d];
          const by = cy + DY[d];
          // turn rule at the arrival corner keeps the region on the same side
          let fl;
          let fr;
          if (d === 0) { fl = inR(bx, by - 1); fr = inR(bx, by); }
          else if (d === 1) { fl = inR(bx, by); fr = inR(bx - 1, by); }
          else if (d === 2) { fl = inR(bx - 1, by); fr = inR(bx - 1, by - 1); }
          else { fl = inR(bx - 1, by - 1); fr = inR(bx, by - 1); }
          const nd = fl ? (d + 3) & 3 : fr ? d : (d + 1) & 3;
          if (nd !== d || loop.length === 0) loop.push(bx, by);
          if (bx === sx && by === sy && nd === sd) break; // about to repeat the start edge
          cx = bx;
          cy = by;
          d = nd;
        }
        loops.push(loop);
      }
    }
  }
  return loops;
}

// ------------------------------------------------------------------ verify

/** Parse a ring spec into subpath point lists. New format (emitted since the
 *  annulus fix): "M x,y L x,y ... Z M x,y ..." — outer contour first, then
 *  reversed hole contours, so canvas 'nonzero' fill leaves holes open and the
 *  even-odd scanline below sees each subpath as its own crossing loop. Legacy
 *  payloads are bare "x,y x,y ..." single loops. */
function parseSpec(spec) {
  if (!spec.startsWith('M')) return [spec.split(' ').map((s) => s.split(',').map(Number))];
  const subs = [];
  for (const part of spec.split('M')) {
    if (!part.trim()) continue;
    const pts = [];
    for (const tok of part.trim().split(/\s+/)) {
      const t = tok.replace(/^L/, '').replace(/Z$/, '');
      if (!t) continue;
      const [x, y] = t.split(',');
      const nx = +x;
      const ny = +y;
      if (Number.isFinite(nx) && Number.isFinite(ny)) pts.push([nx, ny]);
    }
    if (pts.length >= 3) subs.push(pts);
  }
  return subs;
}

/** The paint island's scanline rasterizer (coloringPaint.prepare), verbatim:
 *  even-odd crossings at pixel centres over every subpath, last ring wins. */
function rasterize(rings, w, h) {
  const ids = new Int32Array(w * h);
  rings.forEach((spec, i) => {
    const id = i + 1;
    const subs = parseSpec(spec);
    const xs = [];
    for (let y = 0; y < h; y++) {
      const yc = y + 0.5;
      xs.length = 0;
      for (const pts of subs) {
        let prev = pts[pts.length - 1];
        for (let k = 0; k < pts.length; k++) {
          const cur = pts[k];
          const y1 = prev[1];
          const y2 = cur[1];
          if ((y1 <= yc && y2 > yc) || (y2 <= yc && y1 > yc)) {
            xs.push(prev[0] + ((yc - y1) / (y2 - y1)) * (cur[0] - prev[0]));
          }
          prev = cur;
        }
      }
      if (xs.length < 2) continue;
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const x0 = Math.max(0, Math.ceil(xs[k] - 0.5));
        const x1 = Math.min(w - 1, Math.floor(xs[k + 1] - 0.5));
        const row = y * w;
        for (let x = x0; x <= x1; x++) ids[row + x] = id;
      }
    }
  });
  return ids;
}

// ------------------------------------------------------------------ pipeline

/** Old repo payloads (scripts/coloring-d1) supply each piece's palette. */
function loadOldPayloads() {
  const out = new Map();
  const dir = `${ROOT}/scripts/coloring-d1`;
  const files = readdirSync(dir).filter((f) => /^\d+\.sql$/.test(f)).sort();
  let cur = null;
  for (const f of files) {
    for (const ln of readFileSync(`${dir}/${f}`, 'utf8').split('\n')) {
      if (!ln.trim()) continue;
      let m = ln.match(/^INSERT OR REPLACE INTO coloring_assets \(slug, ord, rings, data\) VALUES \('([^']+)', (\d+), (\d+), '(.*)'\);$/);
      if (m) {
        cur = m[1];
        out.set(cur, m[4]);
        continue;
      }
      m = ln.match(/^UPDATE coloring_assets SET data = data \|\| '(.*)' WHERE slug = '([^']+)';$/);
      if (m && m[2] === cur) out.set(cur, out.get(cur) + m[1]);
    }
  }
  for (const [k, v] of out) out.set(k, JSON.parse(v.replace(/''/g, "'")));
  return out;
}
const DBG = process.env.SEG_DEBUG;
const tick = (msg) => { if (DBG) console.error(`  [${Date.now() - DBG_T0}ms] ${msg}`); };
let DBG_T0 = 0;

async function segment(slug, oldPal, eps) {
  DBG_T0 = Date.now();
  const { data, info } = await sharp(`${ROOT}/public/coloring/line/${slug}.webp`).greyscale().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  tick('decode');

  // 1. white components over the line mask (shading blobs are fillable)
  const ink = lineMask(data, w, h);
  const mask = new Int32Array(w * h);
  for (let i = 0; i < w * h; i++) mask[i] = ink[i] ? 0 : -9;
  const c1 = labelComponents(mask, w, h, (v) => (v === -9 ? 1 : 0));
  tick(`label1 (${c1.area.size} comps)`);
  // border components -> background (-1); others keep their ids
  const bg = new Set();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if ((x === 0 || y === 0 || x === w - 1 || y === h - 1) && c1.lab[y * w + x] > 0) bg.add(c1.lab[y * w + x]);
  }
  const lab = new Int32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const l = c1.lab[i];
    lab[i] = l === 0 ? 0 : bg.has(l) ? -1 : l;
  }
  // 2. speck absorb, 3. ink claim
  absorbSpecks(lab, c1.area, w, h);
  tick('absorb');
  const area2 = new Map([[-1, 0]]);
  for (let i = 0; i < lab.length; i++) if (lab[i] !== 0) area2.set(lab[i], (area2.get(lab[i]) ?? 0) + 1);
  claimInk(lab, area2, w, h);
  tick('claimInk');
  // 4. split into connected components again (absorbs may disconnect)
  const c2 = labelComponents(lab, w, h, (v) => v);
  const bgComps = new Set(); // new ids of components whose source label was bg
  for (let i = 0; i < lab.length; i++) if (lab[i] === -1) bgComps.add(c2.lab[i]);
  tick(`label2 (${c2.area.size} comps)`);
  // 5. rings = components, area desc (background first, details last).
  //    Each ring = one SVG path: crack-followed boundary loops at pixel
  //    CORNERS — the outer loop comes out clockwise, holes counterclockwise
  //    (both windings fall out of the same walk rule), which is exactly what
  //    canvas 'nonzero' and the even-odd scanline need. Corner polygons also
  //    tile the canvas exactly: no half-open edge shaving, no dead ink lines.
  const ids = [...c2.area.keys()].sort((a, b) => c2.area.get(b) - c2.area.get(a));
  const r = [];
  const rc = [];
  const idMap = new Map(); // component id -> ring index (for verify)
  const sub = (flat) =>
    'M ' + Array.from({ length: flat.length / 2 }, (_, i) => `${i ? 'L' : ''}${flat[2 * i]},${flat[2 * i + 1]}`).join(' ') + ' Z';
  for (const id of ids) {
    const loops = crackLoops(c2.lab, id, w, h);
    let spec = '';
    for (const loop of loops) {
      const poly = simplify(loop, eps);
      if (poly.length < 6) continue; // degenerate sliver
      spec += (spec ? ' ' : '') + sub(poly);
    }
    if (!spec) continue;
    idMap.set(id, r.length);
    r.push(spec);
    rc.push(bgComps.has(id) ? 0 : 1);
  }
  tick(`trace+simplify (${r.length} rings)`);
  const payload = { w, h, bg: '#FFFFFF', pal: oldPal, r, rc };
  // 6. verify with the island's own rasterizer. Pixel-exact equality is
  //    impossible by design: the scanline fills half-open spans, so every
  //    ring's top/right edge loses the boundary pixel — invisible under the
  //    ink ('multiply'). What MUST hold: (a) each ring's eroded interior
  //    rasterizes to itself (taps land in the right cell) and (b) virtually
  //    every pixel belongs to some ring (taps are never dead).
  const rendered = rasterize(r, w, h);
  tick('rasterize');
  let interior = 0;
  let interiorHit = 0;
  let covered = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const id = rendered[i];
      if (id !== 0) covered++;
      const c = c2.lab[i];
      if (
        x === 0 || y === 0 || x === w - 1 || y === h - 1 ||
        c2.lab[i - 1] !== c || c2.lab[i + 1] !== c || c2.lab[i - w] !== c || c2.lab[i + w] !== c
      ) continue; // boundary pixel — skip
      interior++;
      if (idMap.get(c) !== undefined && id === idMap.get(c) + 1) interiorHit++;
    }
  }
  const agreement = interiorHit / Math.max(1, interior);
  const coverage = covered / (w * h);
  tick('verify');
  return { payload, agreement, coverage, passed: agreement >= VERIFY_MIN && coverage >= 0.995 };
}

/** Segment at progressively tighter simplification until verify passes.
 *  Corner-tiling makes 100% tap accuracy structural; coverage is what a too-
 *  loose Douglas-Peucker chips away at (chamfered corners on dense lattices),
 *  so only the pieces that need it pay for the extra vertices. */
async function extractSlug(slug, oldPal) {
  let best = null;
  for (const eps of [DP_EPS, 0.8, 0.5]) {
    const res = await segment(slug, oldPal, eps);
    res.eps = eps;
    if (!best || res.coverage > best.coverage || (res.coverage === best.coverage && res.agreement > best.agreement)) best = res;
    if (res.passed) break;
  }
  return best;
}

// ------------------------------------------------------------------ cli
export { extractSlug, labelComponents, absorbSpecks, claimInk, traceContour, crackLoops, simplify, rasterize, parseSpec, loadOldPayloads };

const oldRingsOf = (old) => old.r.length;


const isMain = process.argv[1] && import.meta.url === require('node:url').pathToFileURL(process.argv[1]).href;
if (isMain) {
  const outDir = process.argv[2];
  if (!outDir) {
    console.error('usage: node seg.mjs <outDir> [slug ...]');
    process.exit(1);
  }
  mkdirSync(`${outDir}/data`, { recursive: true });
  const catalog = readFileSync(`${ROOT}/src/data/coloring.ts`, 'utf8').match(/slug: '[^']+'/g).map((s) => s.slice(7, -1));
  const wanted = process.argv.length > 3 ? process.argv.slice(3) : catalog;
  const olds = loadOldPayloads();
  const index = [];
  let failed = 0;
  for (const slug of wanted) {
    const t0 = Date.now();
    const old = olds.get(slug);
    if (!old) {
      console.error(`${slug}: no old payload for palette — skipped`);
      failed++;
      continue;
    }
    const { payload, agreement, coverage, passed } = await extractSlug(slug, old.pal);
    const json = JSON.stringify(payload);
    writeFileSync(`${outDir}/data/${slug}.json`, json);
    index.push({ slug, rings: payload.r.length, bytes: json.length, agree: +agreement.toFixed(4), cov: +coverage.toFixed(4), oldRings: old.r.length });
    if (!passed) failed++;
    console.log(
      `${slug.padEnd(18)} rings ${String(payload.r.length).padStart(4)} (was ${String(oldRingsOf(old)).padStart(4)})  ${(json.length / 1024).toFixed(0)}KB  tap ${(agreement * 100).toFixed(2)}%  cov ${(coverage * 100).toFixed(2)}%${passed ? '' : '  FAIL'}  ${((Date.now() - t0) / 1000).toFixed(1)}s`,
    );
  }
  index.sort((a, b) => a.rings - b.rings || (a.slug < b.slug ? -1 : 1));
  writeFileSync(`${outDir}/index.json`, JSON.stringify(index, null, 1));
  const totalMB = index.reduce((n, e) => n + e.bytes, 0) / 1e6;
  console.log(`\n${index.length} payloads, ${totalMB.toFixed(1)}MB total, ${failed} failing verify`);
  process.exit(failed ? 2 : 0);
}
