/**
 * coloringIdMap unit tests — the hit-test map for coloring paint pages.
 *
 * The 2026-11-10 regression it pins (user report on /coloring/dk019-bee/):
 * "tapping the bee's left eye colored the whole bee". Payloads are one big
 * base silhouette + small detail rings; the old map claimed only pixel
 * CENTERS strictly inside each polygon, so the ink line around a detail ring
 * belonged to the base ring — a tap on the eye's outline selected the
 * whole-bee ring. The fix has two layers: boundary stamps (+1px per ring,
 * later rings overwrite) and — with an ink mask from the line art — a
 * fixpoint pass that upgrades every masked ink pixel to the largest
 * neighbouring id, so a 2-5px sketch stroke converges onto the detail ring
 * it draws and floating decoration ink stays untappable.
 *
 * The real bee payload (public/coloring/payload/, gitignored) is probed too
 * when present on the machine that built the site. Eye rings are found by
 * GEOMETRY (bbox inside the face zone, two largest), not indices — the
 * segmentation pipeline renumbers rings on every regen.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildColoringIdMap, fillableCount, subpathsOf } from './coloringIdMap';

const beePayloadPath = resolve(
  fileURLToPath(import.meta.url),
  '../../../public/coloring/payload/dk019-bee.json',
);

/** square SVG-path spec: "M x0,y0 Lx1,y0 Lx1,y1 Lx0,y1 Z" */
const box = (x0: number, y0: number, x1: number, y1: number): string =>
  `M ${x0},${y0} L${x1},${y0} L${x1},${y1} L${x0},${y1} Z`;

describe('buildColoringIdMap', () => {
  it('maps pixel centers inside each ring to ring index+1', () => {
    const { ids, bgRing } = buildColoringIdMap([box(10, 10, 90, 90), box(40, 40, 60, 60)], 100, 100);
    expect(bgRing).toBe(-1);
    expect(ids[55 * 100 + 50]).toBe(2); // inside the detail ring
    expect(ids[20 * 100 + 20]).toBe(1); // inside the base ring only
    expect(ids[5 * 100 + 5]).toBe(0); // outside everything: untappable paper
  });

  it('ink attribution: a tap on the detail ring outline selects the detail, not the base', () => {
    // the eye scenario in miniature: detail ring sits inside a big base ring;
    // its outline pixels lie geometrically inside the base polygon
    const { ids } = buildColoringIdMap([box(10, 10, 90, 90), box(40, 40, 60, 60)], 100, 100);
    // the detail ring's left edge at x=40 — center of pixel 39 is outside the
    // detail polygon (old behavior: base ring 1) but on its ink line
    expect(ids[50 * 100 + 39]).toBe(2);
    expect(ids[50 * 100 + 61]).toBe(2); // right edge
    expect(ids[39 * 100 + 50]).toBe(2); // top edge
    expect(ids[61 * 100 + 50]).toBe(2); // bottom edge
    // deep inside the base ring, away from any outline, stays the base
    expect(ids[25 * 100 + 25]).toBe(1);
  });

  it('later rings own shared ink lines (boundary overwrite order)', () => {
    // two adjacent detail rings sharing an edge: the later ring's stamp wins
    const { ids } = buildColoringIdMap([box(10, 10, 90, 90), box(40, 40, 60, 60), box(60, 40, 80, 60)], 100, 100);
    expect(ids[50 * 100 + 60]).toBe(3); // shared edge x=60
    expect(ids[50 * 100 + 40]).toBe(2); // first ring keeps its own edge
  });

  it('whole-canvas rings become the untappable background', () => {
    const { ids, bgRing } = buildColoringIdMap([box(0, 0, 100, 100), box(20, 20, 40, 40)], 100, 100);
    expect(bgRing).toBe(0);
    expect(ids[10 * 100 + 10]).toBe(0); // bg ring contributes no id pixels
    expect(ids[30 * 100 + 30]).toBe(2); // later ring unaffected
    // the fillable count excludes the paper ring — the number both the
    // catalog (SSR) and the island (completion) must agree on
    expect(fillableCount([box(0, 0, 100, 100), box(20, 20, 40, 40)], 100, 100)).toBe(1);
    expect(fillableCount([box(10, 10, 90, 90), box(40, 40, 60, 60)], 100, 100)).toBe(2);
  });

  it('even-odd semantics: a self-intersecting bowtie leaves the waist empty', () => {
    // hourglass: the two side lobes fill, the waist between the crossings
    // (which nonzero winding would fill) must stay 0 so render ('evenodd')
    // and hit-testing agree. Sample points chosen off the exact crossing
    // rows to avoid pixel-center degeneracy.
    const spec = 'M 20,20 L80,80 L80,20 L20,80 Z';
    const { ids } = buildColoringIdMap([spec], 100, 100);
    expect(ids[50 * 100 + 25]).toBe(1); // left lobe
    expect(ids[50 * 100 + 75]).toBe(1); // right lobe
    expect(ids[45 * 100 + 50]).toBe(0); // waist: crossed twice → empty
  });

  it('guards: bare trailing Z tokens and junk coords do not drag fill to the corner', () => {
    // seg.mjs guard mirror — a trailing bare "Z" would parse as [0,0] and
    // pull every scanline crossing toward (0,0)
    const spec = 'M 20,20 L80,20 L80,80 L20,80 Z Z';
    const { ids } = buildColoringIdMap([spec], 100, 100);
    expect(ids[50 * 100 + 50]).toBe(1);
    expect(ids[2 * 100 + 2]).toBe(0); // no ghost fill at the canvas corner
    const pts = subpathsOf(spec);
    expect(pts[0]).toHaveLength(4); // Z token dropped
  });

  it('ink mask: a wide sketch stroke converges onto the detail ring it borders', () => {
    // the real failure class: sketch ink is 2-5px thick, so outline taps can
    // land 2-3px OUTSIDE the polygon — past the ±1px stamp, still on the
    // base ring. The mask (dark line-art pixels) lets the whole stroke
    // upgrade to the detail ring via the fixpoint pass.
    const specs = [box(10, 10, 90, 90), box(40, 40, 60, 60)];
    const mask = dilateOutline(specs[1]!, 3, 100, 100);
    const { ids } = buildColoringIdMap(specs, 100, 100, mask);
    expect(ids[50 * 100 + 37]).toBe(2); // 3px left of the detail edge
    expect(ids[50 * 100 + 63]).toBe(2); // 3px right
    expect(ids[37 * 100 + 50]).toBe(2); // 3px above
    expect(ids[63 * 100 + 50]).toBe(2); // 3px below
    expect(ids[25 * 100 + 25]).toBe(1); // unmasked base interior untouched
    expect(ids[55 * 100 + 50]).toBe(2); // detail interior unchanged
  });

  it('ink mask: floating decoration ink with no owned neighbour stays untappable', () => {
    const specs = [box(10, 10, 90, 90)];
    const mask = new Uint8Array(100 * 100);
    mask[5 * 100 + 5] = 1; // a stroke on open paper, far from any ring
    const { ids } = buildColoringIdMap(specs, 100, 100, mask);
    expect(ids[5 * 100 + 5]).toBe(0); // no fall-through to the base ring
  });

  it('ink mask: base-silhouette outline ink stays with the base ring', () => {
    // the bee's outer black outline is genuinely part of the base — the fix
    // must not leak detail ownership across it
    const specs = [box(10, 10, 90, 90), box(40, 40, 60, 60)];
    const mask = dilateOutline(specs[0]!, 3, 100, 100);
    const { ids } = buildColoringIdMap(specs, 100, 100, mask);
    expect(ids[10 * 100 + 50]).toBe(1); // base outline band → base ring
    expect(ids[7 * 100 + 50]).toBe(1); // 3px outside the base edge: ink, owned by base
    expect(ids[3 * 100 + 3]).toBe(0); // far paper outside the mask stays paper
  });
});

/** mark every pixel within `r` of the spec's outline (test-only ink surrogate) */
function dilateOutline(spec: string, r: number, w: number, h: number): Uint8Array {
  const mask = new Uint8Array(w * h);
  for (const pts of subpathsOf(spec)) {
    let prev = pts[pts.length - 1]!;
    for (let k = 0; k < pts.length; k++) {
      const cur = pts[k]!;
      const steps = Math.max(1, Math.ceil(Math.hypot(cur[0] - prev[0], cur[1] - prev[1])));
      for (let s = 0; s <= steps; s++) {
        const x = Math.round(prev[0] + ((cur[0] - prev[0]) * s) / steps);
        const y = Math.round(prev[1] + ((cur[1] - prev[1]) * s) / steps);
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            const px = x + dx;
            const py = y + dy;
            if (px < 0 || py < 0 || px >= w || py >= h) continue;
            mask[py * w + px] = 1;
          }
        }
      }
      prev = cur;
    }
  }
  return mask;
}

describe('dk019-bee incident regression (real payload when present)', () => {
  /** rings fully inside the bee's face zone, two biggest = the two eyes.
   *  Geometry, not indices — the pipeline renumbers rings on every regen. */
  const faceZone = { x0: 560, y0: 180, x1: 740, y1: 260 };
  const eyeRings = (p: { r: string[] }): number[] => {
    const found: { ring: number; area: number; x0: number }[] = [];
    p.r.forEach((spec, ring) => {
      const pts = subpathsOf(spec).flat();
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      for (const [x, y] of pts) {
        if (x < x0) x0 = x;
        if (y < y0) y0 = y;
        if (x > x1) x1 = x;
        if (y > y1) y1 = y;
      }
      if (x0 >= faceZone.x0 && y0 >= faceZone.y0 && x1 <= faceZone.x1 && y1 <= faceZone.y1) {
        found.push({ ring, area: (x1 - x0) * (y1 - y0), x0 });
      }
    });
    return found
      .sort((a, b) => b.area - a.area)
      .slice(0, 2)
      .map((f) => f.ring)
      .sort((a, b) => a - b);
  };

  it('taps on either eye outline select the eye rings, never the whole-bee base', () => {
    if (!existsSync(beePayloadPath)) return; // payload is gitignored — CI skips
    const p = JSON.parse(readFileSync(beePayloadPath, 'utf8')) as {
      w: number;
      h: number;
      r: string[];
    };
    const eyes = eyeRings(p);
    expect(eyes).toHaveLength(2); // left + right eye whites both in the zone
    // without a mask: stamps alone must own each eye's outline (±1px)
    const { ids } = buildColoringIdMap(p.r, p.w, p.h);
    for (const eyeRing of eyes) {
      const pts = subpathsOf(p.r[eyeRing]!).flat();
      const cx = Math.round(pts.reduce((s, [x]) => s + x, 0) / pts.length);
      const cy = Math.round(pts.reduce((s, [, y]) => s + y, 0) / pts.length);
      expect(ids[cy * p.w + cx]).toBe(eyeRing + 1);
      for (let k = 0; k < pts.length; k += 2) {
        const [x, y] = pts[k]!;
        for (const [ox, oy] of [
          [0, 0],
          [1, 0],
          [0, 1],
        ] as const) {
          const px = Math.round(x) + ox;
          const py = Math.round(y) + oy;
          if (px < 0 || py < 0 || px >= p.w || py >= p.h) continue;
          const id = ids[py * p.w + px];
          expect(id).not.toBe(1); // never the whole-bee ring — the incident
          expect(id).not.toBe(0);
          // eye id, or a LATER ring that legitimately overlaps this outline
          // (the nose marking covers the right eye's top edge and is drawn
          // after it — shared-edge ink belongs to the later shape)
          expect(id).toBeGreaterThanOrEqual(eyeRing + 1);
        }
      }
    }
  });

  it('with an ink mask, taps up to 3px outside an eye outline still select the eye', () => {
    if (!existsSync(beePayloadPath)) return;
    const p = JSON.parse(readFileSync(beePayloadPath, 'utf8')) as {
      w: number;
      h: number;
      r: string[];
    };
    const eyes = eyeRings(p);
    expect(eyes).toHaveLength(2);
    // surrogate for the line-art ink: 3px dilation of each eye's outline
    const mask = new Uint8Array(p.w * p.h);
    for (const eyeRing of eyes) {
      const band = dilateOutline(p.r[eyeRing]!, 3, p.w, p.h);
      for (let i = 0; i < band.length; i++) if (band[i]) mask[i] = 1;
    }
    const { ids } = buildColoringIdMap(p.r, p.w, p.h, mask);
    for (const eyeRing of eyes) {
      const pts = subpathsOf(p.r[eyeRing]!).flat();
      for (let k = 0; k < pts.length; k++) {
        const [x, y] = pts[k]!;
        for (const [ox, oy] of [
          [2, 0],
          [-2, 0],
          [0, 2],
          [0, -2],
        ] as const) {
          const px = Math.round(x) + ox;
          const py = Math.round(y) + oy;
          if (px < 0 || py < 0 || px >= p.w || py >= p.h) continue;
          const id = ids[py * p.w + px];
          expect(id).not.toBe(1); // the reported failure class: ink → base
          expect(id).not.toBe(0);
        }
      }
    }
  });
});
