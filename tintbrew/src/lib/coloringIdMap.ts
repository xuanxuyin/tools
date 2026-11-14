/**
 * Hit-test id map for coloring paint pages — pure functions, no DOM.
 *
 * 2026-11-13: the paint island went freehand-brush (coloringPaint.ts) and
 * no longer hit-tests at runtime. The module stays because fillableCount
 * is the authority that keeps data/coloring.ts regions in lockstep with
 * the payloads (coloring.test.ts guards all 210), and the id map + ink
 * attribution below pin the ring-segmentation contract the payloads were
 * built against.
 *
 * Each ring rasterized with an exact scanline fill (pixel-center sampling,
 * even-odd across all subpaths, no canvas antialiasing to blend neighbours
 * into wrong ids) into one Uint32Array: 0 = untappable paper, ring i = i+1.
 *
 * 2026-11-10 ink-attribution fix (user report: tapping the bee's left eye
 * filled the whole bee): payloads are one big base silhouette + small detail
 * rings on top, and the scanline previously claimed only pixel CENTERS inside
 * each polygon — every pixel of the 2-3px ink line around a detail ring fell
 * to the base ring, so a tap that landed on the eye's own outline selected
 * the whole-bee ring. Two layers fix this:
 *   1. each ring stamps its boundary pixels (+1px reach) with its id as it
 *      is processed; later rings overwrite earlier ones;
 *   2. with an ink mask (dark pixels of the line art, built by the caller
 *      from the <img>), unclaimed ink pixels adopt the largest neighbouring
 *      id and iterate to a fixpoint — a 2-5px sketch ink line converges onto
 *      the detail ring it borders, because that ring's stamp seeds the whole
 *      inner edge of the line and the largest id wins every contention.
 *      Ink with no owned neighbour (floating decoration strokes on paper)
 *      stays untappable instead of falling through to the base silhouette.
 */

export interface IdMapResult {
  /** w*h; 0 = untappable paper, ring index+1 otherwise */
  ids: Uint32Array;
  /** ring indexes that are background (paper white) — their pixels stay 0
   *  (untappable) and they are excluded from completion counts */
  bgRings: number[];
}

/** Options for buildColoringIdMap. */
export interface IdMapOptions {
  /** dark pixels of the line art (see the ink pass below) */
  inkMask?: Uint8Array | null;
  /** per-ring class from the segmentation pipeline: 0 = background
   *  (border-touching white, untappable), 1 = regular region. Authoritative
   *  — the geometric canvas-span test below is only the legacy fallback. */
  rc?: number[] | null;
}

const toPts = (s: string): [number, number][] => {
  const pts: [number, number][] = [];
  for (const tok of s.trim().split(/\s+/)) {
    const t = tok.replace(/^L/, '').replace(/Z$/, '');
    if (!t) continue;
    const c = t.split(',');
    const x = Number(c[0]);
    const y = Number(c[1]);
    if (Number.isFinite(x) && Number.isFinite(y)) pts.push([x, y]);
  }
  return pts;
};

/** SVG path ("M x,y L… Z" per subpath) or legacy bare "x,y x,y …" loop →
 *  subpath point lists. Guards mirror seg.mjs parseSpec: a bare trailing "Z"
 *  token must be skipped (it would parse as [0,0] and drag every scanline
 *  crossing to the canvas corner → garbage hit-testing), junk coords dropped. */
export function subpathsOf(spec: string): [number, number][][] {
  return spec.startsWith('M')
    ? spec
        .split('M')
        .filter((s) => s.trim())
        .map(toPts)
        .filter((pts) => pts.length >= 3)
    : [spec.split(' ').map((s) => s.split(',').map(Number)) as [number, number][]];
}

/** The page-background ring: its outer subpath spans the whole canvas
 *  (paper white — untappable, excluded from completion counts). */
export function isCanvasSpanning(spec: string, w: number, h: number): boolean {
  const subpaths = subpathsOf(spec);
  if (subpaths.length < 1) return false;
  const outer = subpaths[0]!;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [px, py] of outer) {
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }
  return minX <= 1 && minY <= 1 && maxX >= w - 1 && maxY >= h - 1;
}

/** Fillable ring count: rings the pipeline marks regular (rc=1); without rc,
 *  all rings minus canvas-spanning paper rings — the number the paint island
 *  shows and requires for done. */
export function fillableCount(specs: string[], w: number, h: number, rc?: number[] | null): number {
  if (rc && rc.length === specs.length) {
    let n = 0;
    for (const v of rc) if (v === 1) n++;
    return n;
  }
  let bg = 0;
  for (const spec of specs) if (isCanvasSpanning(spec, w, h)) bg++;
  return specs.length - bg;
}

export function buildColoringIdMap(specs: string[], w: number, h: number, opts?: IdMapOptions): IdMapResult {
  const inkMask = opts?.inkMask;
  const rc = opts?.rc;
  const haveRc = !!rc && rc.length === specs.length;
  const ids = new Uint32Array(w * h); // 0 = "no ring"
  const bgRings: number[] = [];
  for (let i = 0; i < specs.length; i++) {
    const id = i + 1;
    const subpaths = subpathsOf(specs[i]!);
    // Background rings: the pipeline's border-touching-white verdict (rc=0)
    // when present, else the geometric canvas-span test. Either way they
    // stay pure paper white — not rasterized into the id map (untappable),
    // never filled, and not counted toward completion downstream.
    const isBg = haveRc ? rc![i] === 0 : isCanvasSpanning(specs[i]!, w, h);
    if (isBg) {
      bgRings.push(i);
      continue; // keep ring order aligned; just no id pixels
    }
    // crossings per scanline at pixel centers (y + 0.5); even-odd pairs
    // across ALL subpaths, so a hole flips the span off again
    for (let y = 0; y < h; y++) {
      const yc = y + 0.5;
      const xs: number[] = [];
      for (const pts of subpaths) {
        let prev = pts[pts.length - 1]!;
        for (let k = 0; k < pts.length; k++) {
          const cur = pts[k]!;
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
        const x0 = Math.max(0, Math.ceil(xs[k]! - 0.5));
        const x1 = Math.min(w - 1, Math.floor(xs[k + 1]! - 0.5));
        const row = y * w;
        for (let x = x0; x <= x1; x++) ids[row + x] = id;
      }
    }
    // ink attribution: claim this ring's outline (±1px) so taps on the drawn
    // line select the shape it belongs to, not whatever big ring lies beneath
    for (const pts of subpaths) {
      let prev = pts[pts.length - 1]!;
      for (let k = 0; k < pts.length; k++) {
        const cur = pts[k]!;
        const steps = Math.max(1, Math.ceil(Math.hypot(cur[0] - prev[0], cur[1] - prev[1]) * 2));
        for (let s = 0; s <= steps; s++) {
          const x = Math.round(prev[0] + ((cur[0] - prev[0]) * s) / steps);
          const y = Math.round(prev[1] + ((cur[1] - prev[1]) * s) / steps);
          for (const [ox, oy] of [
            [0, 0],
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
          ] as const) {
            const px = x + ox;
            const py = y + oy;
            if (px < 0 || py < 0 || px >= w || py >= h) continue;
            ids[py * w + px] = id;
          }
        }
        prev = cur;
      }
    }
  }
  // ink-line ownership pass: unclaimed (or base-stamped) ink pixels upgrade
  // to the largest neighbouring id until stable. The detail ring that a line
  // draws seeds its inner edge via the stamp above, so the whole stroke —
  // outer half included — converges onto that ring instead of the base
  // silhouette beneath. Strictly increasing ids make the loop terminate.
  if (inkMask) {
    let changed = true;
    while (changed) {
      changed = false;
      for (let y = 0; y < h; y++) {
        const row = y * w;
        for (let x = 0; x < w; x++) {
          const i = row + x;
          if (!inkMask[i]) continue;
          let best = ids[i]!;
          for (let dy = -1; dy <= 1; dy++) {
            const ny = y + dy;
            if (ny < 0 || ny >= h) continue;
            const nrow = ny * w;
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = x + dx;
              if (nx < 0 || nx >= w) continue;
              const v = ids[nrow + nx]!;
              if (v > best) best = v;
            }
          }
          if (best > ids[i]!) {
            ids[i] = best;
            changed = true;
          }
        }
      }
    }
  }
  return { ids, bgRings };
}
