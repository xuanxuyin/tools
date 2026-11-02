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

/** Byline: "by BeadFan42" (the "by" word translates, the nick never does). */
export function bylineHtml(nick: string): string {
  return `<span class="gal-nick">${escapeHtml(t('gal.by'))} ${escapeHtml(nick)}</span>`;
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
      `<svg viewBox="0 0 26 32" width="26" height="32" aria-hidden="true">` +
      `<path d="M5 1h5l3 8-6-2z" fill="#c0392b"/><path d="M21 1h-5l-3 8 6-2z" fill="#a83226"/>` +
      `<circle cx="13" cy="20" r="10" fill="${disc}"/><circle cx="13" cy="20" r="7" fill="${inner}"/>` +
      `<path d="M13 15.5l1.4 2.9 3.2.4-2.3 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1-2.3-2.2 3.2-.4z" fill="#fff"/>` +
      `</svg>`;
    return `<span class="gal-rank gal-rank-medal" aria-hidden="true">${medal}</span>`;
  }
  return `<span class="gal-rank" aria-hidden="true">#${rank}</span>`;
}

/** Full card for the /gallery/ ranking. Like/Report carry data-i18n
 *  attributes so a later language switch rewrites them in place. The
 *  "Open in editor" link (2026-11-02) is the remix loop: the editor's
 *  ?from=<id> entry loads the piece onto a live board. */
export function cardHtml(p: GalleryPiece, rank: number | null): string {
  return (
    `<li class="gal-card" data-piece="${escapeHtml(p.id)}">` +
    rankHtml(rank) +
    thumbHtml(p) +
    `<div class="gal-cardbar">` +
    `<div class="gal-info"><strong class="gal-name">${escapeHtml(p.name)}</strong>${bylineHtml(p.nick)}</div>` +
    `<a class="btn btn-sm gal-edit" href="/bead-editor/?from=${encodeURIComponent(p.id)}" ` +
    `data-i18n="gal.openEd" title="${escapeHtml(t('gal.openEdT'))}">${escapeHtml(t('gal.openEd'))}</a>` +
    `<button type="button" class="btn btn-sm gal-like" data-gal-like data-i18n-aria="gal.likeAria" ` +
    `data-i18n-title="gal.likeTitle" aria-label="${escapeHtml(t('gal.likeAria'))}" ` +
    `title="${escapeHtml(t('gal.likeTitle'))}">` +
    `<span class="gal-heart" aria-hidden="true">♥</span> <span data-gal-likes>${p.likes}</span></button>` +
    `<button type="button" class="btn btn-sm gal-report" data-gal-report data-i18n="gal.report"` +
    ` title="${escapeHtml(t('gal.reportT'))}">${escapeHtml(t('gal.report'))}</button>` +
    `</div></li>`
  );
}

/** Mini card for the home-page top 9. The thumbnail + name/byline link
 *  into the gallery; the Like pill floats over the thumbnail's top-right
 *  corner as a real button (a button can't live inside a link), so the
 *  home page votes directly. Info reads as two stacked lines — name in
 *  bold, "by nick" in muted gray — instead of one crowded row. */
export function miniCardHtml(p: GalleryPiece, rank: number): string {
  return (
    `<li class="gal-mini" data-piece="${escapeHtml(p.id)}">` +
    `<a href="/gallery/">` +
    thumbHtml(p) +
    rankHtml(rank) +
    `</a>` +
    `<div class="gal-minimeta"><strong class="gal-mini-name">${escapeHtml(p.name)}</strong>${bylineHtml(p.nick)}</div>` +
    `<button type="button" class="btn btn-sm gal-like" data-gal-like data-i18n-aria="gal.likeAria"` +
    ` data-i18n-title="gal.likeTitle" aria-label="${escapeHtml(t('gal.likeAria'))}"` +
    ` title="${escapeHtml(t('gal.likeTitle'))}">` +
    `<span class="gal-heart" aria-hidden="true">♥</span> <span data-gal-likes>${p.likes}</span></button>` +
    `</li>`
  );
}
