/**
 * Coloring hub island — overlays per-device unlock state onto the SSR grid.
 * The server ships all 210 cards (crawlable thumbs); this module marks done
 * pages, arms the daily-unlock button on the next card, and locks the rest
 * (grayscale + link removed). All gating decisions re-run server-side on
 * every API call; these states are just the honest client mirror.
 */
import { t, tArgs } from './i18n';
import type { UiKey } from '../data/uiStrings';
import { galleryUuid } from './deviceId';
import { checkUnlock, todayUtc } from '../../functions/api/coloring/_kernel';

interface Progress {
  unlocked: number;
  lastUnlockDate: string | null;
  done: string[];
}

class ColoringHub {
  private root: HTMLElement;
  private cards: HTMLElement[];
  private statusEl: HTMLElement | null;
  private progressEl: HTMLElement | null;
  private progressText: HTMLElement | null;
  private progressFill: HTMLElement | null;
  private progress: Progress = { unlocked: 1, lastUnlockDate: null, done: [] };
  private total: number;

  constructor(root: HTMLElement) {
    this.root = root;
    this.total = Number(root.dataset.total ?? '0');
    this.cards = [...root.querySelectorAll<HTMLElement>('[data-col-card]')];
    this.statusEl = root.querySelector('[data-col-status]');
    this.progressEl = root.querySelector('[data-col-progress]');
    this.progressText = root.querySelector('[data-col-progress-text]');
    this.progressFill = root.querySelector('[data-col-progress-fill]');
    root.addEventListener('click', (e) => this.onClick(e));
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
      const res = await fetch(`/api/coloring/progress?d=${encodeURIComponent(d)}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as Progress;
      this.progress = {
        unlocked: Number.isFinite(data.unlocked) ? Math.max(1, data.unlocked) : 1,
        lastUnlockDate: data.lastUnlockDate ?? null,
        done: Array.isArray(data.done) ? data.done : [],
      };
      this.render();
    } catch {
      // failed load: offer an in-place retry, keep the plain SSR grid
      if (this.statusEl)
        this.statusEl.innerHTML =
          `${t('col.errNetwork')} <button type="button" class="btn btn-sm" data-col-retry>` +
          `${t('col.retry')}</button>`;
      this.statusEl?.removeAttribute('hidden');
    }
  }

  /** Paint every card's state from the progress model. */
  private render(): void {
    const doneSet = new Set(this.progress.done);
    let doneCount = 0;
    // slug of the previous piece in order — completing it is what allows
    // the next unlock (ord 0 has no predecessor, always "done")
    const slugAt = new Map<number, string>();
    for (const card of this.cards) {
      slugAt.set(Number(card.dataset.ord ?? '-1'), card.dataset.slug ?? '');
    }
    const prevDone = !slugAt.has(this.progress.unlocked - 1) || doneSet.has(slugAt.get(this.progress.unlocked - 1) ?? '');
    const verdict = checkUnlock(
      { unlocked: this.progress.unlocked, lastUnlockDate: this.progress.lastUnlockDate },
      { ord: this.progress.unlocked, rings: 0 },
      prevDone,
      todayUtc(),
    );

    for (const card of this.cards) {
      const ord = Number(card.dataset.ord ?? '-1');
      const slug = card.dataset.slug ?? '';
      const link = card.querySelector<HTMLAnchorElement>('.col-link');
      const badge = card.querySelector<HTMLElement>('[data-col-badge]');
      const unlockBtn = card.querySelector<HTMLButtonElement>('[data-col-unlock]');
      const isDone = doneSet.has(slug);

      // reset to the neutral (open) state, then specialize
      card.classList.remove('is-done', 'is-locked');
      if (badge) badge.hidden = true;
      if (unlockBtn) unlockBtn.hidden = true;
      link?.removeAttribute('aria-disabled');
      if (isDone) {
        doneCount += 1;
        card.classList.add('is-done');
        if (badge) {
          badge.textContent = t('col.done');
          badge.title = t('col.doneT');
          badge.className = 'col-badge is-done';
          badge.hidden = false;
        }
      } else if (ord < this.progress.unlocked) {
        if (badge) {
          badge.textContent = t('col.open');
          badge.title = t('col.openT');
          badge.className = 'col-badge';
          badge.hidden = false;
        }
      } else if (ord === this.progress.unlocked && verdict.ok) {
        // the daily-unlock card: keep the link off until unlocked
        if (link) {
          link.setAttribute('aria-disabled', 'true');
          card.classList.add('is-locked');
        }
        if (unlockBtn) {
          unlockBtn.textContent = t('col.unlock');
          unlockBtn.title = t('col.unlockT');
          unlockBtn.hidden = false;
        }
      } else {
        // locked: badge explains why; the link stays for noscript but the
        // click handler intercepts (aria-disabled + card class)
        if (link) {
          link.setAttribute('aria-disabled', 'true');
          card.classList.add('is-locked');
        }
        if (badge) {
          badge.textContent =
            ord === this.progress.unlocked ? t('col.unlockedTomorrow') : t('col.locked');
          badge.title = t('col.lockedT');
          badge.className = 'col-badge is-locked';
          badge.hidden = false;
        }
      }
    }

    // progress header — the pct label lives in the TEXT line: the bar itself
    // is a 0.6rem tube and any text inside it is clipped to mush
    const unlockedCount = Math.min(this.progress.unlocked, this.total);
    if (this.progressEl && this.progressText && this.progressFill) {
      this.progressEl.hidden = false;
      const pct = unlockedCount ? Math.round((doneCount / unlockedCount) * 100) : 0;
      const pctText = tArgs('col.pct' as UiKey, { pct: String(pct) });
      this.progressText.textContent =
        tArgs('col.progress' as UiKey, {
          done: String(doneCount),
          unlocked: String(unlockedCount),
        }) + ` · ${pctText}`;
      this.progressFill.textContent = '';
      this.progressFill.setAttribute('aria-label', pctText);
      (this.progressFill as HTMLElement).style.width = `${pct}%`;
    }
  }

  private async onClick(e: MouseEvent): Promise<void> {
    const target = e.target as HTMLElement;

    const retry = target.closest<HTMLButtonElement>('[data-col-retry]');
    if (retry) {
      retry.disabled = true;
      this.status('');
      await this.load();
      return;
    }

    const unlockBtn = target.closest<HTMLButtonElement>('[data-col-unlock]');
    if (unlockBtn && unlockBtn.getAttribute('aria-disabled') !== 'true') {
      await this.unlock(unlockBtn);
      return;
    }

    // intercept clicks on locked cards (the link keeps its href for noscript)
    const link = target.closest<HTMLAnchorElement>('.col-link');
    if (link && link.getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      this.status(t('col.errNotNext'));
    }
  }

  /** POST /api/coloring/unlock; on success repaint with the new count. */
  private async unlock(btn: HTMLButtonElement): Promise<void> {
    btn.setAttribute('aria-disabled', 'true');
    const slug = btn.closest('[data-col-card]')?.getAttribute('data-slug') ?? '';
    try {
      const res = await fetch('/api/coloring/unlock', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, d: galleryUuid() }),
      });
      if (res.ok) {
        const data = (await res.json()) as { unlocked: number };
        this.progress.unlocked = data.unlocked;
        this.progress.lastUnlockDate = todayUtc();
        this.status(t('col.unlockDone'));
        this.render();
      } else if (res.status === 409) {
        const data = (await res.json()) as { error?: string };
        this.status(
          data.error === 'not-done'
            ? t('col.errNotDone')
            : data.error === 'not-next'
              ? t('col.errNotNext')
              : t('col.errDaily'),
        );
        await this.load(); // resync with the server's truth
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

document.querySelectorAll<HTMLElement>('[data-coloring-hub]').forEach((el) => new ColoringHub(el));
