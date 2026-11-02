/**
 * Stable anonymous device id for the gallery — lives in localStorage, the
 * server only ever sees its salted hash (functions/api/gallery/_shared.ts).
 * Shared by the editor publish flow and the gallery island.
 */
export function galleryUuid(): string {
  let id = window.localStorage.getItem('tb-gallery:uuid');
  if (!id) {
    id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `u-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.localStorage.setItem('tb-gallery:uuid', id);
  }
  return id;
}

/** The UTC hour bucket mirrored from lib/gallery.ts hourBucket() — lets the
 *  client disable its Like button for the rest of the hour without a
 *  server round-trip (the server stays the source of truth either way). */
export function currentHour(): string {
  return new Date().toISOString().slice(0, 13);
}

/** One like per UTC hour, shared across the whole site (gallery page AND
 *  the home top-10) — the localStorage mirror of the server's vote_log. */
const VOTED_KEY = 'tb-gallery:voted-hour';

export function votedThisHour(): boolean {
  try {
    return window.localStorage.getItem(VOTED_KEY) === currentHour();
  } catch {
    return false;
  }
}

export function markVoted(): void {
  try {
    window.localStorage.setItem(VOTED_KEY, currentHour());
  } catch {
    /* private mode — the server still enforces the cap */
  }
}
