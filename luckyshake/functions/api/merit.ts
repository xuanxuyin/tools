/**
 * Communal merit-box counter (👤 2026-11-11 "功德箱上面把所有人捐献的功德值写在上面…做累计"):
 * POST /api/merit {amount} — one donation, 1..8 merit (👤 2026-11-12 per-click
 * drops POST 1 each; the blocked panel completes a partial ticket and POSTs the
 * remainder 1..7; a fresh cycle costs the full 8). Ticket math stays client-side.
 * GET  /api/merit — { total } lifetime sum of every donation, never reset.
 */
import { json, type Env } from './_shared';

const MIN_DROP = 1;
const BOX_RATE = 8;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: 'not configured' }, 503);
  let amount = 0;
  try {
    amount = Number((await request.json() as { amount?: unknown }).amount ?? 0);
  } catch {
    return json({ error: 'bad body' }, 400);
  }
  if (!Number.isInteger(amount) || amount < MIN_DROP || amount > BOX_RATE) {
    return json({ error: 'bad amount' }, 400);
  }
  const row = await env.DB
    .prepare('INSERT INTO merit_box (id, total) VALUES (1, ?1) ON CONFLICT(id) DO UPDATE SET total = total + ?1 RETURNING total')
    .bind(amount)
    .first<{ total: number }>();
  return json({ ok: true, total: row?.total ?? null });
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return json({ error: 'not configured' }, 503);
  const row = await env.DB.prepare('SELECT total FROM merit_box WHERE id = 1').first<{ total: number }>();
  return json({ total: row?.total ?? 0 });
};
