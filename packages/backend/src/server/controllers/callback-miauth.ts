import axios from 'axios';

import type { RouteHandler } from 'fastify';

import { sessionHostCache } from '@/server/cache.js';
import { die } from '@/server/utils/die.js';
import { processLogin } from '@/services/sessions/process-login.js';

/**
 * MisskeyにMiAuth認証を飛ばしたときに返ってくるコールバックのハンドラーです。
 */
export const callbackMiauthController: RouteHandler<{Querystring: {session: string}}> = async (req, reply) => {
  const session = req.query.session as string | undefined;
  if (!session) {
    await die(reply, 'sessionRequired');
    return;
  }
  const host = sessionHostCache[session];
  delete sessionHostCache[session];
  if (!host) {
    await die(reply);
    console.error('host is null or undefined');
    return;
  }

  const url = `https://${host}/api/miauth/${session}/check`;
  const res = await axios.post(url, {});
  const { token, user } = res.data;

  if (!token || !user) {
    await die(reply);
    if (!token) console.error('token is null or undefined');
    if (!user) console.error('user is null or undefined');
    return;
  }

  const accessToken = await processLogin(user, host, token);
  await reply.view('frontend', { token: accessToken });
};
