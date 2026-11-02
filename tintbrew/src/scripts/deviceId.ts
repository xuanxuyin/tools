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
