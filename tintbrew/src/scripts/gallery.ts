/**
 * Gallery island — takes over the /gallery/ ranking from the API.
 * The SSR shell carries all static copy (hero, rules, FAQ); the list is
 * dynamic UGC so it renders client-side by design. Also renders the
 * caller's own piece (any state, "under review" included) above the
 * ranking.
 */
import { t } from './i18n';
import type { UiKey } from '../data/uiStrings';
import { cardHtml, type GalleryPiece } from './galleryCards';
import { currentHour, galleryUuid } from './deviceId';

const VOTED_KEY = 'tb-gallery:voted-hour';

function votedThisHour(): boolean {
  try {
    return window.localStorage.getItem(VOTED_KEY) === currentHour();
  } catch {
    return false;
  }
}

class GalleryIsland {
  private root: HTMLElement;
  private listEl: HTMLElement | null;
  private mineEl: HTMLElement | null;
  private statusEl: HTMLElement | null;
  private pieces: GalleryPiece[] = [];
  private mine: GalleryPiece | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.listEl = root.querySelector('[data-gallery-list]');
    this.mineEl = root.querySelector('[data-gallery-mine]');
    this.statusEl = root.querySelector('[data-gallery-status]');
    this.root.addEventListener('click', (e) => this.onClick(e));
    void this.load();
  }

  private status(msg: string): void {
    if (this.statusEl) {
      this.statusEl.textContent = msg;
      this.statusEl.hidden = !msg;
    }
  }

  private async load(): Promise<void> {
    const d = galleryUuid();
    try {
      const res = await fetch(`/api/gallery/list?limit=100&d=${encodeURIComponent(d)}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { pieces: GalleryPiece[]; mine: GalleryPiece | null };
      this.pieces = Array.isArray(data.pieces) ? data.pieces : [];
      this.mine = data.mine;
      this.renderMine();
      this.renderList();
    } catch {
      if (this.listEl) this.listEl.innerHTML = `<li class="gal-empty">${t('gal.errNetwork')}</li>`;
    }
  }

  /** Own piece sits above the ranking — hidden pieces show as under review.
   *  No published piece: leave the SSR "you haven't published" note alone. */
  private renderMine(): void {
    if (!this.mineEl || !this.mine) return;
    const rank = this.pieces.findIndex((p) => p.id === this.mine!.id);
    const note = this.mine.hidden
      ? `<p class="gal-underreview" data-i18n="gal.mineHidden">${t('gal.mineHidden')}</p>`
      : '';
    this.mineEl.innerHTML =
      `<h2 data-i18n="gal.mineH">${t('gal.mineH')}</h2>` + note + cardHtml(this.mine, rank >= 0 ? rank + 1 : null);
    this.refreshVoteState();
  }

  private renderList(): void {
    if (!this.listEl) return;
    if (!this.pieces.length) {
      this.listEl.innerHTML = `<li class="gal-empty">${t('gal.empty')}</li>`;
      return;
    }
    this.listEl.innerHTML = this.pieces.map((p, i) => cardHtml(p, i + 1)).join('');
    this.refreshVoteState();
  }

  /** One like per UTC hour across the whole gallery — spent votes disable
   *  every Like button until the hour rolls over. */
  private refreshVoteState(): void {
    if (!votedThisHour()) return;
    this.root.querySelectorAll<HTMLButtonElement>('[data-gal-like]').forEach((b) => {
      b.setAttribute('aria-disabled', 'true');
      b.title = t('gal.oneVote');
    });
  }

  private async onClick(e: MouseEvent): Promise<void> {
    const target = e.target as HTMLElement;

    const likeBtn = target.closest<HTMLButtonElement>('[data-gal-like]');
    if (likeBtn && likeBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = likeBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      await this.like(likeBtn, pieceId);
      return;
    }

    const reportBtn = target.closest<HTMLButtonElement>('[data-gal-report]');
    if (reportBtn && reportBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = reportBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      this.report(reportBtn, pieceId);
    }
  }

  private async like(btn: HTMLButtonElement, pieceId: string): Promise<void> {
    btn.setAttribute('aria-disabled', 'true');
    try {
      const res = await fetch('/api/gallery/like', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uuid: galleryUuid(), pieceId }),
      });
      if (res.ok) {
        // A piece renders twice on this page (own-piece shelf + ranking),
        // so bump the model everywhere the id matches and repaint every
        // counter copy — bumping only the clicked button left the twin
        // card showing the old number.
        const piece = this.pieces.find((p) => p.id === pieceId);
        if (piece) piece.likes += 1;
        if (this.mine && this.mine.id === pieceId) {
          this.mine.likes = piece ? piece.likes : this.mine.likes + 1;
        }
        const total = piece ? piece.likes : this.mine && this.mine.id === pieceId ? this.mine.likes : null;
        if (total !== null) {
          this.root.querySelectorAll<HTMLElement>('[data-piece]').forEach((card) => {
            if (card.getAttribute('data-piece') !== pieceId) return;
            const el = card.querySelector<HTMLElement>('[data-gal-likes]');
            if (el) el.textContent = String(total);
          });
        }
        try {
          window.localStorage.setItem(VOTED_KEY, currentHour());
        } catch {
          /* private mode — the server still enforces the cap */
        }
        this.refreshVoteState();
      } else if (res.status === 429) {
        this.status(t('gal.oneVote'));
        try {
          window.localStorage.setItem(VOTED_KEY, currentHour());
        } catch {
          /* ignore */
        }
        this.refreshVoteState();
      } else {
        this.status(t('gal.errNetwork'));
        btn.removeAttribute('aria-disabled');
      }
    } catch {
      this.status(t('gal.errNetwork'));
      btn.removeAttribute('aria-disabled');
    }
  }

  private async report(btn: HTMLButtonElement, pieceId: string): Promise<void> {
    if (!window.confirm(t('gal.reportConfirm'))) return;
    btn.setAttribute('aria-disabled', 'true');
    try {
      const res = await fetch('/api/gallery/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ pieceId }),
      });
      if (res.ok) {
        this.status(t('gal.reported'));
      } else {
        this.status(t('gal.errNetwork'));
        btn.removeAttribute('aria-disabled');
      }
    } catch {
      this.status(t('gal.errNetwork'));
      btn.removeAttribute('aria-disabled');
    }
  }
}

document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((el) => new GalleryIsland(el));
