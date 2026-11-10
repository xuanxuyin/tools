/**
 * coloringIdMap unit tests — the hit-test map for coloring paint pages.
 *
 * The 2026-11-10 regression it pins (user report on /coloring/dk019-bee/):
 * "tapping the bee's left eye colored the whole bee". Payloads are one big
 * base silhouette + small detail rings; the old map claimed only pixel
 * CENTERS strictly inside each polygon, so the ink line around a detail ring
 * belonged to the base ring — a tap on the eye's outline selected the
 * whole-bee ring. The fix stamps each ring's boundary pixels (+1px) with its
 * id, later rings overwriting earlier ones.
 *
 * The real bee payload (public/coloring/payload/, gitignored) is probed too
 * when present on the machine that built the site — the exact coordinates
 * from the incident report.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildColoringIdMap, subpathsOf } from './coloringIdMap';

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
});

describe('dk019-bee incident regression (real payload when present)', () => {
  it('taps on either eye outline select the eye rings, never the whole-bee base', () => {
    if (!existsSync(beePayloadPath)) return; // payload is gitignored — CI skips
    const p = JSON.parse(readFileSync(beePayloadPath, 'utf8')) as {
      w: number;
      h: number;
      r: string[];
    };
    const { ids } = buildColoringIdMap(p.r, p.w, p.h);
    // rings 14/15 are the eye whites, ring 0 the whole-bee silhouette
    // (verified by outline overlay against the line art, 2026-11-10)
    for (const eyeRing of [14, 15]) {
      const pts = subpathsOf(p.r[eyeRing]!).flat();
      const cx = Math.round(pts.reduce((s, [x]) => s + x, 0) / pts.length);
      const cy = Math.round(pts.reduce((s, [, y]) => s + y, 0) / pts.length);
      expect(ids[cy * p.w + cx]).toBe(eyeRing + 1);
      // every sampled point ON the eye outline must be the eye (±1px stamp
      // reach), not ring 1 (the whole bee) — that was the reported failure
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
          expect(id).not.toBe(1);
          expect(id).toBe(eyeRing + 1);
        }
      }
    }
  });
});
