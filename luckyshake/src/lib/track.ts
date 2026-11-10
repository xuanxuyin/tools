/**
 * Best-effort telemetry for the Pages Functions layer (fails silently on the
 * static preview / offline — the tools never depend on it):
 *  - trackDraw(tool): global free counter (anonymous, tool name only, no PII)
 *  - trackDraw(tool, signId): also records to the signed-in user's history
 *    (401 when signed out is expected and swallowed), and unlocks that sign
 *    in the /signs/ library (markDrawn → localStorage `ls_drawn`)
 */
import { markDrawn } from './unlock';

export function trackDraw(tool: string, signId?: number): void {
  if (typeof signId === 'number') {
    markDrawn(signId);
  }
  try {
    fetch('/api/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool }),
      keepalive: true,
    }).catch(() => {});
    if (typeof signId === 'number') {
      fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, signId }),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* static preview — no Functions, no problem */
  }
}

export async function fetchTotals(): Promise<{ total: number } | null> {
  try {
    const r = await fetch('/api/count');
    if (!r.ok) return null;
    const data = (await r.json()) as { total?: number };
    return typeof data.total === 'number' ? { total: data.total } : null;
  } catch {
    return null;
  }
}
