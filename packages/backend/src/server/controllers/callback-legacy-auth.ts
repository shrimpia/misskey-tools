import crypto from 'crypto';

import type { RouteHandler } from 'fastify';
import type { UserDetailed } from 'misskey-js/built/entities.js';

import { api } from '@/libs/misskey';
import { tokenSecretCache, sessionHostCache } from '@/server/cache.js';
import { die } from '@/server/utils/die.js';
import { processLogin } from '@/services/sessions/process-login.js';

/**
 * Misskeyに旧型認証を飛ばしたときに返ってくるコールバックのハンドラーです。
 */
export const callbackLegacyAuthController: RouteHandler<{Querystring: {token: string}}> = async (req, reply) => {
  const token = req.query.token as string | undefined;
  if (!token) {
    await die(reply, 'tokenRequired');
    return;
  }
  const host = sessionHostCache[token];
  delete sessionHostCache[token];
  if (!host) {
    await die(reply);
    return;
  }
  const appSecret = tokenSecretCache[token];
  delete tokenSecretCache[token];
  if (!appSecret) {
    await die(reply);
    return;
  }

  const { accessToken: misskeyToken, user } = await api<{ accessToken: string, user: UserDetailed }>(host, 'auth/session/userkey', {
    appSecret, token,
  });
  const i = crypto.createHash('sha256').update(misskeyToken + appSecret, 'utf8').digest('hex');

  const accessToken = await processLogin(user, host, i);
  await reply.view('frontend', { token: accessToken });
};
