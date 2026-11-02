/**
 * Home-page top-10 block (user call, 2026-11-02: "排行榜放主页吸引玩家").
 * The section ships hidden; it only appears when the API returns at least
 * one piece, so a fresh install keeps the home page clean and an API
 * outage never breaks the home page. No Like buttons here — the whole
 * card links into /gallery/ where the interaction lives.
 */
import type { GalleryPiece } from './galleryCards';
import { miniCardHtml } from './galleryCards';

const zone = document.querySelector<HTMLElement>('[data-home-gallery]');
const listEl = document.querySelector<HTMLElement>('[data-home-gallery-list]');

if (zone && listEl) {
  void (async () => {
    try {
      const res = await fetch('/api/gallery/list?limit=10');
      if (!res.ok) return;
      const data = (await res.json()) as { pieces: GalleryPiece[] };
      if (!Array.isArray(data.pieces) || !data.pieces.length) return;
      listEl.innerHTML = data.pieces.map((p, i) => miniCardHtml(p, i + 1)).join('');
      zone.hidden = false;
    } catch {
      /* gallery unreachable — the home page simply stays without it */
    }
  })();
}
