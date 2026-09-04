/**
 * Canonical mix slugs: `{a}-{b}` with the two color ids sorted, so red+blue
 * and blue+red always resolve to the same page. Reversed orders are 301'd
 * in vercel.json.
 */
export function mixSlug(a: string, b: string): string {
  return [a, b].sort().join('-');
}

/** Small deterministic string hash (FNV-1a) for stable template variants. */
export function slugHash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
