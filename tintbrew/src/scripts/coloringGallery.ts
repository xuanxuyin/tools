/**
 * Coloring gallery island — takes over /coloring/gallery/ from the API.
 * Mirrors the bead gallery island: own pieces + wallet above the ranking,
 * one like per hour, slot expansion, delete, report. Endpoint set and slot
 * pool are coloring-specific (authors.coloring_slots); the credit balance
 * is the same shared wallet.
 */
import { t, tArgs } from './i18n';
import type { UiKey } from '../data/uiStrings';
import {
  applyLikedState,
  cardHtml,
  likeFeedback,
  rememberLiked,
  type ColPiece,
} from './coloringCards';
import { galleryUuid } from './deviceId';
import { COLORING_ECONOMY } from '../../functions/api/coloring/_kernel';

interface Wallet {
  credits: number;
  coloringSlots: number;
}

/** Hour bucket for the client-side one-like-per-hour mirror. Separate key
 *  from the bead gallery: the coloring vote log is its own budget. */
function currentHour(): string {
  return new Date().toISOString().slice(0, 13);
}
function votedThisHour(): boolean {
  try {
    return localStorage.getItem('tb-coloring:voted-hour') === currentHour();
  } catch {
    return false;
  }
}
function markVoted(): void {
  try {
    localStorage.setItem('tb-coloring:voted-hour', currentHour());
  } catch {
    /* private mode — the server still enforces the cap */
  }
}

class ColoringGalleryIsland {
  private root: HTMLElement;
  private listEl: HTMLElement | null;
  private mineEl: HTMLElement | null;
  private statusEl: HTMLElement | null;
  private pieces: ColPiece[] = [];
  private mine: ColPiece[] = [];
  private wallet: Wallet | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.listEl = root.querySelector('[data-col-gal-list]');
    this.mineEl = root.querySelector('[data-col-gal-mine]');
    this.statusEl = root.querySelector('[data-col-gal-status]');
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
      const res = await fetch(`/api/coloring/list?limit=100&d=${encodeURIComponent(d)}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as {
        pieces: ColPiece[];
        mine: ColPiece[] | null;
        wallet: Wallet | null;
      };
      this.pieces = Array.isArray(data.pieces) ? data.pieces : [];
      this.mine = data.mine == null ? [] : data.mine;
      this.wallet = data.wallet ?? null;
      this.renderMine();
      this.renderList();
    } catch {
      // in-place retry — same pattern as the bead gallery (2026-11-03)
      if (this.listEl)
        this.listEl.innerHTML =
          `<li class="gal-empty">${t('col.errNetwork')} ` +
          `<button type="button" class="btn btn-sm gal-retry" data-col-gal-retry data-i18n="col.retry">${t('col.retry')}</button></li>`;
    }
  }

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
    const slots = this.wallet?.coloringSlots ?? 1;
    const canExpand =
      this.wallet != null && credits >= COLORING_ECONOMY.slotCost && slots < COLORING_ECONOMY.maxSlots;
    this.mineEl.innerHTML =
      `<h2 data-i18n="col.g.mineH">${t('col.g.mineH')}</h2>` +
      `<div class="gal-wallet">` +
      `<span class="gal-wallet-stat gal-wallet-credits"><span class="gal-heart">♥</span> <strong>${credits}</strong> ` +
      `<span data-i18n="gal.creditsW">${t('gal.creditsW')}</span></span>` +
      `<span class="gal-wallet-sep" aria-hidden="true"></span>` +
      `<span class="gal-wallet-stat">${tArgs('gal.slotUse' as UiKey, {
        used: String(this.mine.length),
        slots: String(slots),
      })}</span>` +
      `<button type="button" class="btn btn-sm gal-expand" data-col-gal-expand${canExpand ? '' : ' aria-disabled="true"'}` +
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
      this.listEl.innerHTML = `<li class="gal-empty">${t('col.g.empty')}</li>`;
      return;
    }
    this.listEl.innerHTML = this.pieces.map((p, i) => cardHtml(p, i + 1)).join('');
    applyLikedState(this.listEl);
    this.refreshVoteState();
  }

  private refreshVoteState(): void {
    if (!votedThisHour()) return;
    this.root.querySelectorAll<HTMLButtonElement>('[data-col-like]').forEach((b) => {
      b.setAttribute('aria-disabled', 'true');
      b.title = t('gal.oneVote');
    });
  }

  private async onClick(e: MouseEvent): Promise<void> {
    const target = e.target as HTMLElement;

    const retryBtn = target.closest<HTMLButtonElement>('[data-col-gal-retry]');
    if (retryBtn) {
      retryBtn.disabled = true;
      await this.load();
      return;
    }

    const likeBtn = target.closest<HTMLButtonElement>('[data-col-like]');
    if (likeBtn && likeBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = likeBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      await this.like(likeBtn, pieceId);
      return;
    }

    const expandBtn = target.closest<HTMLButtonElement>('[data-col-gal-expand]');
    if (expandBtn && expandBtn.getAttribute('aria-disabled') !== 'true') {
      await this.expand();
      return;
    }

    const delBtn = target.closest<HTMLButtonElement>('[data-col-del]');
    if (delBtn && delBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = delBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      await this.removePiece(pieceId);
      return;
    }

    const reportBtn = target.closest<HTMLButtonElement>('[data-col-report]');
    if (reportBtn && reportBtn.getAttribute('aria-disabled') !== 'true') {
      const pieceId = reportBtn.closest('[data-piece]')?.getAttribute('data-piece') ?? '';
      this.report(reportBtn, pieceId);
    }
  }

  private async expand(): Promise<void> {
    try {
      const res = await fetch('/api/coloring/slot', {
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
        this.status(t('col.errNetwork'));
      }
    } catch {
      this.status(t('col.errNetwork'));
    }
  }

  private async removePiece(pieceId: string): Promise<void> {
    if (!window.confirm(t('gal.delConfirm'))) return;
    try {
      const res = await fetch('/api/coloring/delete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uuid: galleryUuid(), pieceId }),
      });
      if (res.ok) {
        this.status(t('gal.delDone'));
        await this.load();
      } else {
        this.status(t('col.errNetwork'));
      }
    } catch {
      this.status(t('col.errNetwork'));
    }
  }

  private async like(btn: HTMLButtonElement, pieceId: string): Promise<void> {
    btn.setAttribute('aria-disabled', 'true');
    try {
      const res = await fetch('/api/coloring/like', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uuid: galleryUuid(), pieceId }),
      });
      if (res.ok) {
        // a piece can render twice (own shelf + ranking) — bump the model
        // everywhere the id matches, repaint every counter copy
        const bump = (list: ColPiece[]) => {
          const p = list.find((x) => x.id === pieceId);
          if (p) p.likes += 1;
          return p?.likes ?? null;
        };
        const a = bump(this.pieces);
        const b = bump(this.mine);
        const total = a ?? b;
        if (total !== null) {
          this.root.querySelectorAll<HTMLElement>('[data-piece]').forEach((card) => {
            if (card.getAttribute('data-piece') !== pieceId) return;
            const el = card.querySelector<HTMLElement>('[data-col-likes]');
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
        this.status(t('col.errNetwork'));
        btn.removeAttribute('aria-disabled');
      }
    } catch {
      this.status(t('col.errNetwork'));
      btn.removeAttribute('aria-disabled');
    }
  }

  private async report(btn: HTMLButtonElement, pieceId: string): Promise<void> {
    if (!window.confirm(t('gal.reportConfirm'))) return;
    btn.setAttribute('aria-disabled', 'true');
    try {
      const res = await fetch('/api/coloring/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ pieceId }),
      });
      if (res.ok) {
        this.status(t('gal.reported'));
      } else {
        this.status(t('col.errNetwork'));
        btn.removeAttribute('aria-disabled');
      }
    } catch {
      this.status(t('col.errNetwork'));
      btn.removeAttribute('aria-disabled');
    }
  }
}

document
  .querySelectorAll<HTMLElement>('[data-coloring-gallery]')
  .forEach((el) => new ColoringGalleryIsland(el));
