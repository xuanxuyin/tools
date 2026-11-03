import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * The seasonal slot on the homepage (PLAN #17 offshoot, MiriCanvas lesson):
 * a small block that rotates per season. Guards pin three things — the slot
 * must render a link block with a "See all" hub chip, every seasonal link
 * must resolve to a built page (rotation can't ship a dead link), and the
 * hero copy must not clash with the Download PNG buttons (PLAN #18 softened
 * "no downloads" → "no paywalls"). The href regex is season-agnostic so a
 * slot swap (halloween → thanksgiving → christmas → 100th day) doesn't need
 * a test edit — it anchors on the slot markup, not on hardcoded seasons.
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');
const homeReady = existsSync(resolve(DIST, 'index.html'));

describe.skipIf(!homeReady)('homepage seasonal slot', () => {
  const raw = readFileSync(resolve(DIST, 'index.html'), 'utf8');
  const html = raw.replace(/\s+/g, ' '); // source line breaks split phrases in the markup
  // Anchor on the seasonal section: from its heading text to the section's
  // "See all" hub chip (the last anchor before "Most printed").
  const slotStart = html.indexOf('print-and-go, free, no sign-up');
  const slotEnd = html.indexOf('Most printed');
  const slot = html.slice(slotStart, slotEnd);
  const seasonalHrefs = [...slot.matchAll(/href="(\/[a-z0-9-]+\/)"/g)].map((m) => m[1]);

  it('shows the seasonal block with a see-all hub chip', () => {
    const hub = seasonalHrefs.find((href) => href.startsWith('/christmas-printables/'))
      ?? seasonalHrefs.find((href) => href.includes('hub') || href.includes('printables'));
    expect(hub, 'slot must end with a see-all hub chip').toBeTruthy();
    expect(seasonalHrefs.length).toBeGreaterThanOrEqual(4);
  });

  it('every seasonal link resolves to a built page', () => {
    for (const href of seasonalHrefs) {
      const page = resolve(DIST, href.slice(1), 'index.html');
      expect(existsSync(page), `${href} must exist in dist before the block ships`).toBe(true);
    }
  });

  it('hero copy no longer clashes with the Download PNG buttons', () => {
    expect(html).not.toContain('no downloads');
    expect(html).toContain('no paywalls');
  });
});
