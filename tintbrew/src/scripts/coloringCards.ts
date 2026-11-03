/**
 * Card markup for the coloring gallery — parallel to galleryCards.ts but
 * for published colored artwork: the thumbnail is the client-rendered WebP
 * preview served by /api/coloring/preview (falls back to the base page's
 * watermarked thumb while a preview is missing), plus the publish date on
 * every card. User input goes through escapeHtml before innerHTML.
 */
import { escapeHtml } from '../lib/boardSvg';
import { t, tArgs, currentLang } from './i18n';
import type { UiKey } from '../data/uiStrings';

const DATE_LOCALE: Record<string, string> = { en: 'en-US', zh: 'zh-CN', ko: 'ko-KR' };

/** Shared date vocabulary for coloring gallery cards (publish + updated). */
export function formatColDate(ts: number): string {
  const lang = currentLang();
  const locale = DATE_LOCALE[lang] ?? 'en-US';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(ts),
  );
}

export interface ColPiece {
  id: string;
  slug: string;
  name: string;
  nick: string;
  colors: string;
  likes: number;
  hidden?: boolean;
  createdAt: number;
  updatedAt: number;
}

/** Outline heart — kept visually identical to the bead gallery's. */
function heartSvg(size: number): string {
  return (
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false">` +
    `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>` +
    `</svg>`
  );
}

/** Same medal treatment as the bead gallery (uniform 32×40 set). */
export function rankHtml(rank: number | null): string {
  if (!rank) return '';
  if (rank <= 3) {
    const [disc, inner] =
      rank === 1
        ? ['#e8a925', '#f7c948']
        : rank === 2
          ? ['#9aa3ad', '#c6cdd6']
          : ['#b06a32', '#d18d54'];
    const medal =
      `<svg viewBox="0 0 26 32" width="32" height="40" aria-hidden="true">` +
      `<path d="M5 1h5l3 8-6-2z" fill="#c0392b"/><path d="M21 1h-5l-3 8 6-2z" fill="#a83226"/>` +
      `<circle cx="13" cy="20" r="10" fill="${disc}"/><circle cx="13" cy="20" r="7" fill="${inner}"/>` +
      `<path d="M13 15.5l1.4 2.9 3.2.4-2.3 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1-2.3-2.2 3.2-.4z" fill="#fff"/>` +
      `</svg>`;
    return `<span class="gal-rank gal-rank-medal" aria-hidden="true">${medal}</span>`;
  }
  return `<span class="gal-rank" aria-hidden="true">#${rank}</span>`;
}

export function likeBtnHtml(p: ColPiece): string {
  return (
    `<button type="button" class="gal-like" data-col-like data-i18n-aria="gal.likeAria"` +
    ` data-i18n-title="gal.likeTitle" aria-label="${escapeHtml(t('gal.likeAria'))}"` +
    ` title="${escapeHtml(t('gal.likeTitle'))}">` +
    `<span class="gal-heart">${heartSvg(20)}</span>` +
    `<span class="gal-count" data-col-likes>${p.likes}</span></button>`
  );
}

/** Publish-date line: first-publish day, plus "updated" when the artwork
 *  was republished later (user asked for dates on gallery cards). */
function dateHtml(p: ColPiece): string {
  const main = tArgs('col.g.pubDate' as UiKey, { date: formatColDate(p.createdAt) });
  const republished = p.updatedAt - p.createdAt > 3600_000;
  const sub = republished
    ? ` <span class="col-date-sub">${tArgs('col.g.updated' as UiKey, {
        date: formatColDate(p.updatedAt),
      })}</span>`
    : '';
  return `<span class="col-date">${main}${sub}</span>`;
}

function metaHtml(p: ColPiece, nameClass: string): string {
  return (
    `<div class="gal-meta">` +
    `<span class="gal-label" data-i18n="gal.nameL">${escapeHtml(t('gal.nameL'))}</span>` +
    `<strong class="${nameClass}">${escapeHtml(p.name)}</strong>` +
    `<span class="gal-label" data-i18n="gal.artistL">${escapeHtml(t('gal.artistL'))}</span>` +
    `<span class="gal-nick">${escapeHtml(p.nick)}</span>` +
    `<span class="gal-label" data-i18n="col.g.baseL">${escapeHtml(t('col.g.baseL'))}</span>` +
    `<span class="gal-nick col-basename">${escapeHtml(p.slug)}</span>` +
    `</div>`
  );
}

/** Full card for the coloring gallery. mine: Delete instead of Report
 *  (same trade as the bead gallery). */
export function cardHtml(p: ColPiece, rank: number | null, opts?: { mine?: boolean }): string {
  const tail = opts?.mine
    ? `<button type="button" class="btn btn-sm gal-del" data-col-del data-i18n="gal.del"` +
      ` title="${escapeHtml(t('gal.delT'))}">${escapeHtml(t('gal.del'))}</button>`
    : `<button type="button" class="btn btn-sm gal-report" data-col-report data-i18n="gal.report"` +
      ` title="${escapeHtml(t('gal.reportT'))}">${escapeHtml(t('gal.report'))}</button>`;
  return (
    `<li class="gal-card col-gcard" data-piece="${escapeHtml(p.id)}">` +
    rankHtml(rank) +
    `<div class="col-gthumb">` +
    `<img src="/api/coloring/preview?piece=${encodeURIComponent(p.id)}&v=${p.updatedAt}"` +
    ` alt="${escapeHtml(p.name)} — colored ${escapeHtml(p.slug)} page"` +
    ` loading="lazy" decoding="async" data-col-preview` +
    ` onerror="this.onerror=null;this.src='/coloring/thumb/${encodeURIComponent(p.slug)}.webp'" />` +
    `</div>` +
    `<div class="gal-cardbar">` +
    metaHtml(p, 'gal-name') +
    dateHtml(p) +
    `<a class="btn btn-sm gal-edit" href="/coloring/${encodeURIComponent(p.slug)}/" ` +
    `data-i18n="col.g.viewPage" title="${escapeHtml(t('col.g.viewPageT'))}">${escapeHtml(t('col.g.viewPage'))}</a>` +
    likeBtnHtml(p) +
    tail +
    `</div></li>`
  );
}

const LIKED_KEY = 'tb-coloring:liked-piece';

export function rememberLiked(pieceId: string): void {
  try {
    localStorage.setItem(LIKED_KEY, pieceId);
  } catch {
    /* private mode — the visual state just won't survive a reload */
  }
}

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

/** Celebrate a landed like — same sparks as the bead gallery. */
export function likeFeedback(btn: HTMLButtonElement): void {
  btn.classList.add('is-liked');
  btn.classList.remove('is-pop');
  void btn.offsetWidth;
  btn.classList.add('is-pop');
  for (let i = 0; i < 3; i++) {
    const s = document.createElement('span');
    s.className = 'gal-spark';
    s.style.setProperty('--sx', `${(i - 1) * 14}px`);
    s.style.setProperty('--sr', `${(i - 1) * 28}deg`);
    s.innerHTML = heartSvg(12);
    s.addEventListener('animationend', () => s.remove());
    btn.appendChild(s);
  }
}
