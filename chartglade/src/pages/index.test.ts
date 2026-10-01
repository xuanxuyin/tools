import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * The seasonal slot on the homepage (PLAN #17 offshoot, MiriCanvas lesson):
 * a small October block that rotates per season. Guards pin two things —
 * every seasonal link must resolve to a built page (rotation can't ship a
 * dead link), and the hero copy must not clash with the Download PNG
 * buttons (PLAN #18 softened "no downloads" → "no paywalls").
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');
const homeReady = existsSync(resolve(DIST, 'index.html'));

describe.skipIf(!homeReady)('homepage seasonal slot', () => {
  const raw = readFileSync(resolve(DIST, 'index.html'), 'utf8');
  const html = raw.replace(/\s+/g, ' '); // source line breaks split phrases in the markup
  const seasonalHrefs = [...raw.matchAll(/href="(\/halloween[a-z-]*\/)"/g)].map((m) => m[1]);

  it('shows the seasonal block with its hub link', () => {
    expect(seasonalHrefs).toContain('/halloween/');
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
