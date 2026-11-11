/**
 * GET /api/me — signed-in user + recent history, or 401.
 */
import { currentUser, json, type Env } from './_shared';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: 'accounts not configured' }, 503);
  const user = await currentUser(env, request);
  if (!user) return json({ error: 'not signed in' }, 401);
  const { results } = await env.DB
    .prepare('SELECT tool, sign_id, created_at FROM history WHERE user_id = ?1 ORDER BY id DESC LIMIT 100')
    .bind(user.id)
    .all<{ tool: string; sign_id: number; created_at: string }>();
  return json({ user, history: results });
};
