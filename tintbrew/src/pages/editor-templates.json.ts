/**
 * Build-time template catalog for the bead editor's "Start from a template"
 * picker (2026-11-02: "at least let users pick one of ours" — the editor
 * opened on a blank board). The whole pattern catalog ships as one JSON the
 * island fetches lazily on first open, so the main bundle stays lean.
 * Rows are the padded '.'-grid; pal maps region letters to Mard ids via the
 * same Oklab nearest-color rule the editor's custom colors snap by.
 */
import type { APIRoute } from 'astro';
import { patternContents } from '../lib/beadContent';
import { nearestMardId } from '../lib/mardNearest';

export const GET: APIRoute = async () => {
  const byCat = new Map<string, { cat: string; items: unknown[] }>();
  for (const v of patternContents) {
    const cat = v.def.category;
    const group = byCat.get(cat) ?? { cat, items: [] };
    group.items.push({
      slug: v.def.slug,
      name: v.def.name,
      cat,
      w: v.def.width,
      h: v.grid.length,
      rows: v.grid,
      pal: Object.fromEntries(v.regions.map((r) => [r.key, nearestMardId(r.hex)])),
    });
    byCat.set(cat, group);
  }

  return new Response(JSON.stringify({ groups: [...byCat.values()] }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
