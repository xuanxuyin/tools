/**
 * Gallery island — takes over the /gallery/ ranking from the API.
 * The SSR shell carries all static copy (hero, rules, FAQ); the list is
 * dynamic UGC so it renders client-side by design. Also renders the
 * caller's gallery (every piece, any state, "under review" included) with
 * the like-economy wallet above the ranking.
 */
import { t, tArgs } from './i18n';
import type { UiKey } from '../data/uiStrings';
import { applyLikedState, cardHtml, likeFeedback, rememberLiked, type GalleryPiece } from './galleryCards';
import { galleryUuid, markVoted, votedThisHour } from './deviceId';
import { ECONOMY } from '../../functions/api/gallery/_kernel';

interface Wallet {
  credits: number;
  slots: number;
}

class GalleryIsland {
  private root: HTMLElement;
  private listEl: HTMLElement | null;
  private mineEl: HTMLElement | null;
  private statusEl: HTMLElement | null;
  private pieces: GalleryPiece[] = [];
  private mine: GalleryPiece[] = [];
  private wallet: Wallet | null = null;

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
      const data = (await res.json()) as {
        pieces: GalleryPiece[];
        mine: GalleryPiece[] | GalleryPiece | null;
        wallet: Wallet | null;
      };
      this.pieces = Array.isArray(data.pieces) ? data.pieces : [];
      // pre-2026-11-03 payloads carry a single mine piece — normalize
      this.mine = data.mine == null ? [] : Array.isArray(data.mine) ? data.mine : [data.mine];
      this.wallet = data.wallet ?? null;
      this.renderMine();
      this.renderList();
    } catch {
      // Failed load: keep the SSR message and add an in-place retry button —
      // a bare "try again later" forced a full page reload (user hit this
      // during a deploy window, 2026-11-03).
      if (this.listEl)
        this.listEl.innerHTML =
          `<li class="gal-empty">${t('gal.errNetwork')} ` +
          `<button type="button" class="btn btn-sm gal-retry" data-gal-retry data-i18n="gal.retry">${t('gal.retry')}</button></li>`;
    }
  }

  /** The wallet panel + every own piece sit above the ranking — hidden
   *  pieces show as under review. No pieces yet: leave the SSR note. */
  private renderMine(): void {
    if (!this.mineEl || !this.mine.length) return;
    const cards = this.mine
      .map((p) => {
        const rank = this.pieces.findIndex((r) => r.id === p.id);
        const note = p.hidden
          ? `<p class="gal-underreview" data-i18n="gal.mineHidden">${t('gal.mineHidden')}</p>`
          : '';
        return note + cardHtml(p, rank >= 0 ? rank + 1 : null, { mine: true });
      })
      .join('');
    const credits = this.wallet?.credits ?? 0;
    const slots = this.wallet?.slots ?? 1;
    const canExpand = this.wallet != null && credits >= ECONOMY.slotCost && slots < ECONOMY.maxSlots;
    this.mineEl.innerHTML =
      `<h2 data-i18n="gal.mineH">${t('gal.mineH')}</h2>` +
      `<div class="gal-wallet">` +
      `<span class="gal-wallet-stat gal-wallet-credits"><span class="gal-heart">♥</span> <strong>${credits}</strong> ` +
      `<span data-i18n="gal.creditsW">${t('gal.creditsW')}</span></span>` +
      `<span class="gal-wallet-sep" aria-hidden="true"></span>` +
      `<span class="gal-wallet-stat">${tArgs('gal.slotUse' as UiKey, { used: String(this.mine.length), slots: String(slots) })}</span>` +
      `<button type="button" class="btn btn-sm gal-expand" data-gal-expand${canExpand ? '' : ' aria-disabled="true"'}` +
      ` data-i18n="gal.expand" title="${t('gal.walletNote')}">${t('gal.expand')}</button>` +
      `</div>` +
      `<p class="gal-wallet-note" data-i18n="gal.walletNote">${t('gal.walletNote')}</p>` +
      cards;
    applyLikedState(this.mineEl);
    this.refreshVoteState();
  }

  private renderList(): void {
    if (!this.listEl) return;
    if (!this.pieces.length) {
      this.listEl.innerHTML = `<li class="gal-empty">${t('gal.empty')}</li>`;
      return;
    }
    this.listEl.innerHTML = this.pieces.map((p, i) => cardHtml(p, i + 1)).join('');
    applyLikedState(this.listEl);
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

    const retryBtn = target.closest<HTMLButtonElement>('[data-gal-retry]');
    if (retryBtn) {
      retryBtn.disabled = true;
      await this.load();
      return;
    }

    const likeBtn = target.closest<HTMLButtonElement>('[data-gal-like]');
    if (likeBtn && likeBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = likeBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      await this.like(likeBtn, pieceId);
      return;
    }

    const expandBtn = target.closest<HTMLButtonElement>('[data-gal-expand]');
    if (expandBtn && expandBtn.getAttribute('aria-disabled') !== 'true') {
      await this.expand();
      return;
    }

    const delBtn = target.closest<HTMLButtonElement>('[data-gal-del]');
    if (delBtn && delBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = delBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      await this.removePiece(pieceId);
      return;
    }

    const reportBtn = target.closest<HTMLButtonElement>('[data-gal-report]');
    if (reportBtn && reportBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = reportBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      this.report(reportBtn, pieceId);
    }
  }

  /** Spend 100 credits on one more gallery slot, then reload the island —
   *  the wallet panel and the slot count both live in renderMine. */
  private async expand(): Promise<void> {
    try {
      const res = await fetch('/api/gallery/slot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uuid: galleryUuid() }),
      });
      if (res.ok) {
        this.status(t('gal.expandDone'));
        await this.load();
      } else if (res.status === 402) {
        this.status(t('gal.noCredits'));
      } else if (res.status === 409) {
        this.status(t('gal.slotMax'));
      } else {
        this.status(t('gal.errNetwork'));
      }
    } catch {
      this.status(t('gal.errNetwork'));
    }
  }

  /** Delete one of your pieces (confirm first) — frees its slot, then
   *  reloads so the wallet and gallery reflect the new counts. */
  private async removePiece(pieceId: string): Promise<void> {
    if (!window.confirm(t('gal.delConfirm'))) return;
    try {
      const res = await fetch('/api/gallery/delete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uuid: galleryUuid(), pieceId }),
      });
      if (res.ok) {
        this.status(t('gal.delDone'));
        await this.load();
      } else {
        this.status(t('gal.errNetwork'));
      }
    } catch {
      this.status(t('gal.errNetwork'));
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
        likeFeedback(btn);
        rememberLiked(pieceId);
        markVoted();
        this.refreshVoteState();
      } else if (res.status === 429) {
        this.status(t('gal.oneVote'));
        markVoted();
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
