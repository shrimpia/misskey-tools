import { RouteHandler } from 'fastify';
import { v4 as uuid } from 'uuid';

import { sessionHostCache, tokenSecretCache } from '@/server/cache.js';
import { die } from '@/server/utils/die.js';
import { api } from '@/libs/misskey.js';
import { config } from '@/config.js';
import { misskeyAppInfo } from 'tools-shared/dist/const.js';

/**
 * Misskeyサーバーに接続するコントローラーです。
 */
export const authMisskeyController: RouteHandler<{Querystring: {host: string}}> = async (req, reply) => {
  let host = req.query.host;
  if (!host) {
    await die(reply, 'invalidParamater');
    return;
  }
  // http://, https://を潰す
  host = host.trim().replace(/^https?:\/\//g, '').replace(/\/+/g, '');

  const meta = await api<{ name: string, uri: string, version: string, features: Record<string, boolean | undefined> }>(host, 'meta', {}).catch(async e => {
    if (!(e instanceof Error && e.name === 'Error')) throw e;
    await die(reply, 'hostNotFound');
  });

  if (typeof meta !== 'object') {
    await die(reply, 'other');
    return;
  }

  // NOTE:
  //   環境によってはアクセスしたドメインとMisskeyにおけるhostが異なるケースがある
  //   そういったインスタンスにおいてアカウントの不整合が生じるため、
  //   APIから戻ってきたホスト名を正しいものとして、改めて正規化する
  host = meta.uri.replace(/^https?:\/\//g, '').replace(/\/+/g, '').trim();

  const { name, permission, description } = misskeyAppInfo;

  if (meta.features.miauth) {
    // MiAuthを使用する
    const callback = encodeURI(`${config.url}/miauth`);
    const session = uuid();
    const url = `https://${host}/miauth/${session}?name=${encodeURI(name)}&callback=${encodeURI(callback)}&permission=${encodeURI(permission.join(','))}`;
    sessionHostCache[session] = host;

    reply.redirect(url);
  } else {
    // 旧型認証を使用する
    const callbackUrl = encodeURI(`${config.url}/legacy-auth`);
    const { secret } = await api<{ secret: string }>(host, 'app/create', {
      name, description, permission, callbackUrl,
    });
    const { token, url } = await api<{ token: string, url: string }>(host, 'auth/session/generate', {
      appSecret: secret,
    });
    sessionHostCache[token] = host;
    tokenSecretCache[token] = secret;

    reply.redirect(url);
  }
};
