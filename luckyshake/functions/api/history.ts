/**
 * Signed-in reading history ("用 google 授权当账号记录").
 * POST /api/history {tool, signId} — record a draw for the signed-in user (401 if not).
 * GET  /api/history               — latest 100 rows for the signed-in user.
 * Rows store tool + numeric sign id only; sign names/slugs are resolved
 * client-side from the public SIGNS data (nothing user-authored is stored).
 */
import { currentUser, json, type Env } from './_shared';

const TOOLS = new Set(['fortune-stick', 'number-oracle', 'fortune-cookie']);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: 'history not configured' }, 503);
  const user = await currentUser(env, request);
  if (!user) return json({ error: 'not signed in' }, 401);
  let tool = '';
  let signId = 0;
  try {
    const body = await request.json() as { tool?: unknown; signId?: unknown };
    tool = String(body.tool ?? '');
    signId = Number(body.signId ?? 0);
  } catch {
    return json({ error: 'bad body' }, 400);
  }
  if (!TOOLS.has(tool) || !Number.isInteger(signId) || signId < 1 || signId > 100) {
    return json({ error: 'bad body' }, 400);
  }
  await env.DB
    .prepare('INSERT INTO history (user_id, tool, sign_id) VALUES (?1, ?2, ?3)')
    .bind(user.id, tool, signId)
    .run();
  return json({ ok: true });
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: 'history not configured' }, 503);
  const user = await currentUser(env, request);
  if (!user) return json({ error: 'not signed in' }, 401);
  const { results } = await env.DB
    .prepare('SELECT tool, sign_id, created_at FROM history WHERE user_id = ?1 ORDER BY id DESC LIMIT 100')
    .bind(user.id)
    .all<{ tool: string; sign_id: number; created_at: string }>();
  return json({ history: results });
};
