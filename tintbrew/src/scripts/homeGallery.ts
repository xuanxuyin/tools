/**
 * Home-page top-10 block (user call, 2026-11-02: "排行榜放主页吸引玩家").
 * The section ships hidden; it only appears when the API returns at least
 * one piece, so a fresh install keeps the home page clean and an API
 * outage never breaks the home page. Each mini card carries a working Like
 * pill (user call, same day: "Community gallery 里不能直接点赞吗") — same
 * one-like-per-UTC-hour budget as the gallery page, enforced client-side
 * by disabling every pill once the hour's vote is spent.
 */
import type { GalleryPiece } from './galleryCards';
import { miniCardHtml } from './galleryCards';
import { galleryUuid, markVoted, votedThisHour } from './deviceId';
import { t } from './i18n';

const zone = document.querySelector<HTMLElement>('[data-home-gallery]');
const listEl = document.querySelector<HTMLElement>('[data-home-gallery-list]');

function disablePills(root: HTMLElement): void {
  root.querySelectorAll<HTMLButtonElement>('[data-gal-like]').forEach((b) => {
    b.setAttribute('aria-disabled', 'true');
    b.title = t('gal.oneVote');
  });
}

if (zone && listEl) {
  listEl.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-gal-like]');
    if (!btn || btn.getAttribute('aria-disabled') === 'true') return;
    const pieceId = btn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
    btn.setAttribute('aria-disabled', 'true');
    void (async () => {
      try {
        const res = await fetch('/api/gallery/like', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ uuid: galleryUuid(), pieceId }),
        });
        if (res.ok) {
          const count = btn.querySelector('[data-gal-likes]');
          if (count) count.textContent = String(Number(count.textContent ?? '0') + 1);
          markVoted();
          disablePills(listEl);
        } else if (res.status === 429) {
          markVoted();
          disablePills(listEl);
        } else {
          btn.removeAttribute('aria-disabled');
        }
      } catch {
        btn.removeAttribute('aria-disabled');
      }
    })();
  });

  void (async () => {
    try {
      const res = await fetch('/api/gallery/list?limit=10');
      if (!res.ok) return;
      const data = (await res.json()) as { pieces: GalleryPiece[] };
      if (!Array.isArray(data.pieces) || !data.pieces.length) return;
      listEl.innerHTML = data.pieces.map((p, i) => miniCardHtml(p, i + 1)).join('');
      zone.hidden = false;
      if (votedThisHour()) disablePills(listEl);
    } catch {
      /* gallery unreachable — the home page simply stays without it */
    }
  })();
}
