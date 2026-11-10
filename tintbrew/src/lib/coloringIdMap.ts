/**
 * Hit-test id map for coloring paint pages — pure functions, no DOM.
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
 * the whole-bee ring. Now each ring also stamps its boundary pixels (+1px
 * reach) with its id as it is processed; later rings overwrite earlier ones,
 * so shared ink lines end up owned by the detail that encloses them — taps
 * on an outline select the shape the outline draws.
 */

export interface IdMapResult {
  /** w*h; 0 = untappable paper, ring index+1 otherwise */
  ids: Uint32Array;
  /** ring whose outer contour spans the whole canvas (paper white) — its
   *  pixels stay 0 (untappable) and it is excluded from completion counts */
  bgRing: number;
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

export function buildColoringIdMap(specs: string[], w: number, h: number): IdMapResult {
  const ids = new Uint32Array(w * h); // 0 = "no ring"
  let bgRing = -1;
  for (let i = 0; i < specs.length; i++) {
    const id = i + 1;
    const subpaths = subpathsOf(specs[i]!);
    // The page-background ring (outer contour = the whole canvas) spans most
    // of the page, so one stray tap on any open-curve pocket connected to it
    // would recolor ~everything at once. It stays pure paper white instead:
    // not rasterized into the id map (untappable), never filled, and not
    // counted toward completion downstream.
    if (subpaths.length >= 1) {
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
      if (minX <= 1 && minY <= 1 && maxX >= w - 1 && maxY >= h - 1) {
        bgRing = i;
        continue; // keep ring order aligned; just no id pixels
      }
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
  return { ids, bgRing };
}
