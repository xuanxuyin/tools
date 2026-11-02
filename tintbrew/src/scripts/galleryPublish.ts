/**
 * Shared publish-to-gallery flow — one implementation, three pages. Any page
 * that ships the panel markup (components/GalleryPublishPanel.astro) and the
 * data-ed-publish* hooks can mount this:
 *
 *   mountPublishFlow(root, () => ({ width, height, grid }));
 *
 * Clicks are delegated on `root`, so buttons the page injects later (the
 * photo converter rebuilds its action row on every convert) keep working.
 * The page controls when its Publish button is visible; this module only
 * handles open → validate → POST → status.
 *
 * Optional nicety: set `data-gal-pub-name` on `root` (or at mount time via
 * the third arg) and the panel's piece-name input comes prefilled.
 */
import { t } from './i18n';
import { galleryUuid } from './deviceId';

export interface PublishBoard {
  width: number;
  height: number;
  grid: (string | null)[][];
}

/** Remembered nickname — typed once, prefilled on every later publish. */
const NICK_KEY = 'tb-gallery:nick';

function savedNick(): string {
  try {
    return window.localStorage.getItem(NICK_KEY) ?? '';
  } catch {
    return '';
  }
}

export function mountPublishFlow(
  root: HTMLElement,
  getBoard: () => PublishBoard | null,
  defaultName?: string,
): void {
  if (defaultName) root.dataset.galPubName = defaultName;
  root.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('[data-ed-publish]')) {
      open(root);
      return;
    }
    if (target.closest('[data-ed-publish-cancel]')) {
      close(root);
      return;
    }
    if (target.closest('[data-ed-publish-submit]')) {
      void submit(root, getBoard);
    }
  });
}

/** Parse a `<script type="application/json" data-gal-def>` payload — the
 *  shape the pattern pages embed at build time (rows already mapped to
 *  Mardiy ids). Returns a board getter for mountPublishFlow. */
export function boardFromDef(root: HTMLElement): PublishBoard | null {
  const raw = root.querySelector('[data-gal-def]')?.textContent;
  if (!raw) return null;
  try {
    const def = JSON.parse(raw) as {
      w: number;
      h: number;
      rows: string[];
      pal: Record<string, string>;
    };
    const grid: (string | null)[][] = def.rows.map((row) =>
      [...row].map((ch) => (ch === '.' ? null : def.pal[ch] ?? null)),
    );
    return { width: def.w, height: def.h, grid };
  } catch {
    return null;
  }
}

function open(root: HTMLElement): void {
  const panel = root.querySelector('[data-ed-publish-panel]');
  if (!panel) return;
  panel.classList.remove('hidden');
  const nameEl = panel.querySelector<HTMLInputElement>('[data-ed-publish-name]');
  const nickEl = panel.querySelector<HTMLInputElement>('[data-ed-publish-nick]');
  // prefill once per session of the panel — the user's own edit wins
  const prefill = root.dataset.galPubName;
  if (nameEl && prefill && !nameEl.value) nameEl.value = prefill;
  const nick = savedNick();
  if (nickEl && nick && !nickEl.value) nickEl.value = nick;
  nameEl?.focus();
}

function close(root: HTMLElement): void {
  root.querySelector('[data-ed-publish-panel]')?.classList.add('hidden');
}

async function submit(root: HTMLElement, getBoard: () => PublishBoard | null): Promise<void> {
  const status = root.querySelector('[data-ed-publish-status]');
  const panel = root.querySelector('[data-ed-publish-panel]');
  const nameEl = panel?.querySelector<HTMLInputElement>('[data-ed-publish-name]');
  const nickEl = panel?.querySelector<HTMLInputElement>('[data-ed-publish-nick]');
  const submitBtn = panel?.querySelector<HTMLButtonElement>('[data-ed-publish-submit]');
  const nick = nickEl?.value.trim() ?? '';
  const name = nameEl?.value.trim() || 'My creation';
  const board = getBoard();
  if (!board) {
    if (status) status.textContent = t('gal.errInvalid');
    return;
  }
  if (!nick) {
    if (status) status.textContent = t('gal.errNick');
    return;
  }
  if (window.localStorage.getItem('tb-gallery:piece-id') && !window.confirm(t('gal.replaceConfirm'))) return;

  submitBtn?.setAttribute('aria-disabled', 'true');
  try {
    const res = await fetch('/api/gallery/publish', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        uuid: galleryUuid(),
        name,
        nick,
        width: board.width,
        height: board.height,
        grid: board.grid,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    if (res.ok && data.id) {
      window.localStorage.setItem('tb-gallery:piece-id', data.id);
      try {
        window.localStorage.setItem(NICK_KEY, nick);
      } catch {
        /* private mode — the next publish just asks again */
      }
      if (status) {
        status.replaceChildren(document.createTextNode(t('gal.pubDone') + ' '));
        const a = document.createElement('a');
        a.href = '/gallery/';
        a.textContent = t('gal.viewLink');
        status.appendChild(a);
      }
      window.setTimeout(() => close(root), 2500);
    } else if (res.status === 429) {
      if (status) status.textContent = t('gal.errRate');
    } else if (res.status === 400) {
      if (status) status.textContent = t('gal.errInvalid');
    } else {
      if (status) status.textContent = t('gal.errNetwork');
    }
  } catch {
    if (status) status.textContent = t('gal.errNetwork');
  } finally {
    submitBtn?.removeAttribute('aria-disabled');
  }
}

/** Template loading helper shared by the editor: rows of palette ids → a
 *  Grid, dropping any id the palette doesn't know (defensive, same as the
 *  draft seeding path). */
export function gridFromRows(rows: string[], pal: Record<string, string>): (string | null)[][] {
  return rows.map((row) => [...row].map((ch) => (ch === '.' ? null : pal[ch] ?? null)));
}

/** The editor's ?from=<pieceId> remix entry: fetch the gallery list, find
 *  the piece, hand it to the callback (width/height/grid/name/nick). */
export async function fetchPiece(
  pieceId: string,
): Promise<{ width: number; height: number; grid: (string | null)[][]; name: string; nick: string } | null> {
  try {
    const res = await fetch(`/api/gallery/list?limit=100&d=${galleryUuid()}`);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      pieces?: { id: string; name: string; nick: string; width: number; height: number; cells: (string | null)[] }[];
    };
    const piece = data.pieces?.find((p) => p.id === pieceId);
    if (!piece) return null;
    const grid: (string | null)[][] = [];
    for (let y = 0; y < piece.height; y++) {
      grid.push(piece.cells.slice(y * piece.width, (y + 1) * piece.width));
    }
    return { width: piece.width, height: piece.height, grid, name: piece.name, nick: piece.nick };
  } catch {
    return null;
  }
}

/** Used by gallery cards (galleryCards.ts) for the remix link. */
export function editorFromUrl(pieceId: string): string {
  return `/bead-editor/?from=${encodeURIComponent(pieceId)}`;
}

// Studio pages (pattern detail pages) need no page-specific state: their
// board is the build-time def JSON embedded next to the panel. Self-boot
// on any section that opts in with [data-gal-pub-auto].
for (const el of document.querySelectorAll<HTMLElement>('[data-gal-pub-auto]')) {
  mountPublishFlow(el, () => boardFromDef(el));
}
