/**
 * Global free draw counter (accounts-and-ai-playbook.md 👤 11/08: "全局免费计数").
 * POST /api/count {tool} — increment (anonymous, no PII: a tool name is all we log).
 * GET  /api/count        — {tool: n, ..., total} for the homepage ticker.
 */
import { json, type Env } from './_shared';

const TOOLS = new Set([
  'fortune-stick',
  'number-oracle',
  'fortune-cookie',
  'magic-8-ball',
  'coin-flip',
  'yes-no',
  'daily-fortune',
]);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: 'counter not configured' }, 503);
  let tool = '';
  try {
    tool = String((await request.json() as { tool?: unknown }).tool ?? '');
  } catch {
    return json({ error: 'bad body' }, 400);
  }
  if (!TOOLS.has(tool)) return json({ error: 'unknown tool' }, 400);
  await env.DB
    .prepare('INSERT INTO counters (tool, count) VALUES (?1, 1) ON CONFLICT(tool) DO UPDATE SET count = count + 1')
    .bind(tool)
    .run();
  return json({ ok: true });
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return json({ error: 'counter not configured' }, 503);
  const { results } = await env.DB.prepare('SELECT tool, count FROM counters').all<{ tool: string; count: number }>();
  const totals: Record<string, number> = {};
  let sum = 0;
  for (const r of results) {
    totals[r.tool] = r.count;
    sum += r.count;
  }
  return json({ ...totals, total: sum });
};
