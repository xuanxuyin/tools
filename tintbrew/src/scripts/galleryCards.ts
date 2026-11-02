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
  return rank ? `<span class="gal-rank" aria-hidden="true">#${rank}</span>` : '';
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

/** Mini card for the home-page top 10 — no buttons, whole card is the
 *  link into the gallery. Two meta rows: name+byline, then the like count
 *  on its own line. */
export function miniCardHtml(p: GalleryPiece, rank: number): string {
  return (
    `<li class="gal-mini">` +
    `<a href="/gallery/">` +
    rankHtml(rank) +
    thumbHtml(p) +
    `<div class="gal-minimeta">` +
    `<div class="gal-minititle"><strong>${escapeHtml(p.name)}</strong>` +
    bylineHtml(p.nick) +
    `</div>` +
    `<span class="gal-minilikes"><span class="gal-heart" aria-hidden="true">♥</span> ${p.likes}</span>` +
    `</div>` +
    `</a></li>`
  );
}
