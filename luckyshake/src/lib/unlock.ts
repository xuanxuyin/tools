/**
 * 签库解锁机制 (👤 2026-11-08 "签库应该开放给长期用户，不然上来抽签就没有意思了"):
 * the /signs/ library is earned, not browsed — a sign's full reading stays
 * veiled until that sign has actually landed in your hands (any of the three
 * sign tools, or your synced account history on a later visit).
 *
 * Mechanics:
 *  - drawn sign ids live in localStorage `ls_drawn` (sorted number array);
 *  - trackDraw() calls markDrawn() → the sign unlocks everywhere, instantly;
 *  - /signs/ pages render the full text in the DOM (SEO keeps the long tail)
 *    but blur it under a lock panel via CSS until `is-open` is applied;
 *  - signed-in visitors get their cloud history folded into the set on every
 *    library visit (best-effort fetch of /api/history, 401 swallowed).
 */
const KEY = 'ls_drawn';

export function getDrawn(): Set<number> {
  try {
    const raw = localStorage.getItem(KEY);
    const arr: unknown = raw ? JSON.parse(raw) : [];
    return new Set(
      Array.isArray(arr) ? arr.filter((n): n is number => typeof n === 'number') : []
    );
  } catch {
    return new Set();
  }
}

function persist(set: Set<number>): void {
  localStorage.setItem(KEY, JSON.stringify([...set].sort((a, b) => a - b)));
}

/** Record that this sign landed in the user's hands — unlocks it everywhere. */
export function markDrawn(signId: number): void {
  try {
    const set = getDrawn();
    const fresh = !set.has(signId);
    if (fresh) {
      set.add(signId);
      persist(set);
    }
    openLocks();
    if (fresh) refreshSignCards();
  } catch {
    /* storage unavailable — gating just stays locked this visit */
  }
}

/** Open every lock container on the page whose sign is in the drawn set. */
function openLocks(): void {
  const drawn = getDrawn();
  document.querySelectorAll<HTMLElement>('[data-sign-lock]').forEach((el) => {
    const id = Number(el.dataset.signLock);
    if (Number.isFinite(id) && drawn.has(id)) el.classList.add('is-open');
  });
}

/** Refresh the 🔓/🔒 badges on library index cards. */
export function refreshSignCards(): void {
  const drawn = getDrawn();
  document.querySelectorAll<HTMLElement>('[data-sign-card]').forEach((el) => {
    const id = Number(el.dataset.signCard);
    const flag = el.querySelector<HTMLElement>('.lock-flag');
    if (Number.isFinite(id) && flag) flag.textContent = drawn.has(id) ? '🔓' : '🔒';
  });
}

/**
 * Apply gating state on load: open locks / set badges from storage, then fold
 * in the signed-in user's cloud history (best-effort; static preview → 401).
 */
export function applyGating(): void {
  openLocks();
  refreshSignCards();
  try {
    fetch('/api/history')
      .then((r) => (r.ok ? (r.json() as Promise<{ history?: { sign_id: number }[] }>) : null))
      .then((data) => {
        const rows = data?.history ?? [];
        if (rows.length === 0) return;
        const set = getDrawn();
        let changed = false;
        for (const row of rows) {
          if (typeof row?.sign_id === 'number' && !set.has(row.sign_id)) {
            set.add(row.sign_id);
            changed = true;
          }
        }
        if (changed) {
          persist(set);
          openLocks();
          refreshSignCards();
        }
      })
      .catch(() => {});
  } catch {
    /* fetch unavailable */
  }
}
