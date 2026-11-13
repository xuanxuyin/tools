// @vitest-environment happy-dom
/**
 * 十方功德 chain regression (👤 2026-11-13 "我已经捐了一个点的功德，怎么全局还是 十方功德：—"):
 *  1. the REAL /api/merit handler against real SQLite (node:sqlite, same SQL as D1)
 *     — one 1-point drop on a fresh box must return total: 1;
 *  2. mountMeritBox UI — GET total renders "十方功德：N"; a drop POSTs and the
 *     response total is written straight back to the row;
 *  3. where the API is missing (astro preview / offline) the row folds away
 *     instead of dangling an em dash.
 */
import { describe, it, expect, vi } from 'vitest';
import { DatabaseSync } from 'node:sqlite';

/* ---------- 1. real handler vs real SQLite ---------- */

const makeDb = () => {
  const db = new DatabaseSync(':memory:');
  db.exec('CREATE TABLE merit_box (id INTEGER PRIMARY KEY, total INTEGER NOT NULL DEFAULT 0)');
  // shape of env.DB as used by functions/api/merit.ts (prepare → bind?.first)
  return {
    prepare(sql: string) {
      return {
        bind: (...args: unknown[]) => ({
          first: async () =>
            (db.prepare(sql).all(...args) as Record<string, unknown>[])[0] ?? null,
        }),
        first: async () =>
          (db.prepare(sql).all() as Record<string, unknown>[])[0] ?? null,
      };
    },
  };
};

describe('merit API handler (real SQL, fresh box)', () => {
  it('one 1-point drop → total 1; second drop → 2; GET echoes', async () => {
    const { onRequestPost, onRequestGet } = await import('../functions/api/merit');
    const env = { DB: makeDb() } as never;
    const post = async (amount: number) => {
      const request = new Request('https://x/api/merit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const res = await onRequestPost({ request, env } as never);
      return await (res as Response).json();
    };
    expect(await post(1)).toEqual({ ok: true, total: 1 }); // 👤 the exact reported scenario
    expect(await post(1)).toEqual({ ok: true, total: 2 });
    const getRes = await onRequestGet({ env } as never);
    expect(await (getRes as Response).json()).toEqual({ total: 2 });
  });
});

/* ---------- 2+3. the UI chain (fetch mocked) ---------- */

describe('merit box communal row', () => {
  it('renders the fetched total, updates from the POST response, folds when API missing', async () => {
    vi.useFakeTimers(); // mountMeritBox starts a 1s tick — keep it from leaking
    document.documentElement.lang = 'zh-CN';

    // server state behind the mock: starts at 0, POST adds and returns the new total
    let serverTotal = 0;
    const okMock = vi.fn(async (url: string, init?: RequestInit): Promise<Response> => {
      if (init?.method === 'POST') {
        serverTotal += JSON.parse(String(init.body)).amount as number;
        return { ok: true, json: async () => ({ ok: true, total: serverTotal }) } as unknown as Response;
      }
      return { ok: true, json: async () => ({ total: serverTotal }) } as unknown as Response;
    });
    vi.stubGlobal('fetch', okMock);

    const root = document.createElement('div');
    document.body.appendChild(root);
    localStorage.setItem('fw_ration', JSON.stringify(
      { day: '', merit: 3, accrueTs: Date.now() - 2 * 3600_000, extras: 0, donated: 0 }));

    const { mountMeritBox } = await import('../src/lib/rationUi');
    mountMeritBox(root as unknown as HTMLElement);
    const row = root.querySelector('.merit-communal') as HTMLElement;
    const total = () => root.querySelector('[data-merit-total]')?.textContent ?? '';

    // GET rendered the live total, row visible (placeholder "…" until the fetch lands)
    for (let i = 0; i < 50 && !/十方功德：/.test(total()); i++) await Promise.resolve();
    expect(total()).toBe('十方功德：0');
    expect(row.classList.contains('is-hidden')).toBe(false);

    // fund + one drop: POST 1 → response total 1 written straight to the row
    (root.querySelector('[data-merit-num]') as unknown as HTMLButtonElement).click();
    for (let i = 0; i < 50 && total() !== '十方功德：1'; i++) await Promise.resolve();
    expect(total()).toBe('十方功德：1'); // 👤 "不应该显示 1 吗" — now it does
    const calls = okMock.mock.calls.map(c => String(c[0]));
    expect(calls).toContain('/api/merit');

    // API gone (astro preview / offline): fetch fails → the row folds, no em dash
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline'); }));
    const root2 = document.createElement('div');
    document.body.appendChild(root2);
    localStorage.setItem('fw_ration', JSON.stringify(
      { day: '', merit: 0, accrueTs: Date.now(), extras: 0, donated: 0 }));
    mountMeritBox(root2 as unknown as HTMLElement);
    for (let i = 0; i < 20 && !(root2.querySelector('.merit-communal') as HTMLElement)?.classList?.contains('is-hidden'); i++) {
      await Promise.resolve();
    }
    const row2 = root2.querySelector('.merit-communal') as HTMLElement;
    expect(row2.classList.contains('is-hidden')).toBe(true);
    expect(row2.textContent).not.toContain('—');
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });
});
