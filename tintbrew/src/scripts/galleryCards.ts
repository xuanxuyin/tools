/**
 * Shared card markup for the community gallery — used by the /gallery/
 * island (full cards with Like/Report) and the home-page top-10 block
 * (mini cards, whole card links to the gallery). Name/nick are user
 * input, so everything goes through escapeHtml before innerHTML.
 */
import { buildBoardSvg, escapeHtml } from '../lib/boardSvg';
import { t } from './i18n';
import type { UiKey } from '../data/uiStrings';

export interface GalleryPiece {
  id: string;
  name: string;
  nick: string;
  width: number;
  height: number;
  cells: (string | null)[];
  likes: number;
  hidden?: boolean;
}

/** Pegboard thumbnail. Aspect ratio is NOT inline — every card gets the
 *  same square frame from CSS, so a mixed-size top-10 reads as one even
 *  grid (the SVG letterboxes inside, centered). */
export function thumbHtml(p: GalleryPiece): string {
  const svg = buildBoardSvg({ cols: p.width, rows: p.height, cells: p.cells });
  return `<div class="gal-thumb">${svg}</div>`;
}

/** Outline heart (filled by CSS once liked) — crisper than the ♥ glyph
 *  and scales with the button. */
function heartSvg(cls: string, size: number): string {
  return (
    `<svg class="${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false">` +
    `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>` +
    `</svg>`
  );
}

/** Card info block: a small-caps field label on the left ("Name" /
 *  "Artist") with the value beside it — reads as a spec sheet instead of
 *  two loose lines. Labels carry data-i18n so a language switch rewrites
 *  them in place (they are leaf text nodes, safe for apply()). */
export function metaHtml(name: string, nick: string, nameClass: string): string {
  return (
    `<div class="gal-meta">` +
    `<span class="gal-label" data-i18n="gal.nameL">${escapeHtml(t('gal.nameL'))}</span>` +
    `<strong class="${nameClass}">${escapeHtml(name)}</strong>` +
    `<span class="gal-label" data-i18n="gal.artistL">${escapeHtml(t('gal.artistL'))}</span>` +
    `<span class="gal-nick">${escapeHtml(nick)}</span>` +
    `</div>`
  );
}

function rankHtml(rank: number | null): string {
  if (!rank) return '';
  if (rank <= 3) {
    const [disc, inner] =
      rank === 1
        ? ['#e8a925', '#f7c948']
        : rank === 2
          ? ['#9aa3ad', '#c6cdd6']
          : ['#b06a32', '#d18d54'];
    const medal =
      `<svg viewBox="0 0 26 32" width="24" height="30" aria-hidden="true">` +
      `<path d="M5 1h5l3 8-6-2z" fill="#c0392b"/><path d="M21 1h-5l-3 8 6-2z" fill="#a83226"/>` +
      `<circle cx="13" cy="20" r="10" fill="${disc}"/><circle cx="13" cy="20" r="7" fill="${inner}"/>` +
      `<path d="M13 15.5l1.4 2.9 3.2.4-2.3 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1-2.3-2.2 3.2-.4z" fill="#fff"/>` +
      `</svg>`;
    return `<span class="gal-rank gal-rank-medal" aria-hidden="true">${medal}</span>`;
  }
  return `<span class="gal-rank" aria-hidden="true">#${rank}</span>`;
}

/** The shared Like button — big heart + big count, its own design (not a
 *  generic btn). Both the /gallery/ card bar and the home mini card embed
 *  it; the islands call likeFeedback() when the POST lands. */
export function likeBtnHtml(p: GalleryPiece): string {
  return (
    `<button type="button" class="gal-like" data-gal-like data-i18n-aria="gal.likeAria"` +
    ` data-i18n-title="gal.likeTitle" aria-label="${escapeHtml(t('gal.likeAria'))}"` +
    ` title="${escapeHtml(t('gal.likeTitle'))}">` +
    `<span class="gal-heart">${heartSvg('', 20)}</span>` +
    `<span class="gal-count" data-gal-likes>${p.likes}</span></button>`
  );
}

const LIKED_KEY = 'tb-gallery:liked-piece';

/** Remember which piece this visitor liked (one like per hour, so at most
 *  one id) so a reload can repaint its heart as filled. */
export function rememberLiked(pieceId: string): void {
  try {
    localStorage.setItem(LIKED_KEY, pieceId);
  } catch {
    /* private mode — the visual state just won't survive a reload */
  }
}

/** Paint the remembered liked piece's heart(s) filled after a render. */
export function applyLikedState(root: HTMLElement): void {
  let id = '';
  try {
    id = localStorage.getItem(LIKED_KEY) ?? '';
  } catch {
    return;
  }
  if (!id) return;
  root.querySelectorAll<HTMLElement>('[data-piece]').forEach((card) => {
    if (card.getAttribute('data-piece') === id) {
      card.querySelector('.gal-like')?.classList.add('is-liked');
    }
  });
}

/** Celebrate a landed like: the heart pops, the count bumps, and three
 *  spark hearts drift up out of the button. Pure CSS keyframes triggered
 *  by classes; sparks remove themselves on animationend. */
export function likeFeedback(btn: HTMLButtonElement): void {
  btn.classList.add('is-liked');
  btn.classList.remove('is-pop');
  void btn.offsetWidth; // reflow so a repeat pop restarts from 0%
  btn.classList.add('is-pop');
  for (let i = 0; i < 3; i++) {
    const s = document.createElement('span');
    s.className = 'gal-spark';
    s.style.setProperty('--sx', `${(i - 1) * 14}px`);
    s.style.setProperty('--sr', `${(i - 1) * 28}deg`);
    s.innerHTML = heartSvg('', 12);
    s.addEventListener('animationend', () => s.remove());
    btn.appendChild(s);
  }
}

/** Full card for the /gallery/ ranking. Like/Report carry data-i18n
 *  attributes so a later language switch rewrites them in place. The
 *  "Open in editor" link (2026-11-02) is the remix loop: the editor's
 *  ?from=<id> entry loads the piece onto a live board. opts.mine adds the
 *  Delete action (2026-11-03 slot economy: removing a piece frees its
 *  gallery slot) and drops Report — you don't report yourself. */
export function cardHtml(p: GalleryPiece, rank: number | null, opts?: { mine?: boolean }): string {
  const tail = opts?.mine
    ? `<button type="button" class="btn btn-sm gal-del" data-gal-del data-i18n="gal.del"` +
      ` title="${escapeHtml(t('gal.delT'))}">${escapeHtml(t('gal.del'))}</button>`
    : `<button type="button" class="btn btn-sm gal-report" data-gal-report data-i18n="gal.report"` +
      ` title="${escapeHtml(t('gal.reportT'))}">${escapeHtml(t('gal.report'))}</button>`;
  return (
    `<li class="gal-card" data-piece="${escapeHtml(p.id)}">` +
    rankHtml(rank) +
    thumbHtml(p) +
    `<div class="gal-cardbar">` +
    metaHtml(p.name, p.nick, 'gal-name') +
    `<a class="btn btn-sm gal-edit" href="/bead-editor/?from=${encodeURIComponent(p.id)}" ` +
    `data-i18n="gal.openEd" title="${escapeHtml(t('gal.openEdT'))}">${escapeHtml(t('gal.openEd'))}</a>` +
    likeBtnHtml(p) +
    tail +
    `</div></li>`
  );
}

/** Mini card for the home-page top 9. The thumbnail + name/byline link
 *  into the gallery; the Like pill floats over the card's bottom-right
 *  corner as a real button (a button can't live inside a link), so the
 *  home page votes directly. Info reads as a labeled spec sheet —
 *  Name / Artist rows. */
export function miniCardHtml(p: GalleryPiece, rank: number): string {
  return (
    `<li class="gal-mini" data-piece="${escapeHtml(p.id)}">` +
    `<a href="/gallery/">` +
    thumbHtml(p) +
    rankHtml(rank) +
    `</a>` +
    `<div class="gal-minimeta">` +
    metaHtml(p.name, p.nick, 'gal-mini-name') +
    `</div>` +
    likeBtnHtml(p) +
    `</li>`
  );
}
