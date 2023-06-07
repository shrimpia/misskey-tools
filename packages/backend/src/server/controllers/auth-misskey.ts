import { misskeyAppInfo } from 'tools-shared/dist/const.js';

import type { RouteHandler } from 'fastify';

import { config } from '@/config.js';
import { uuid } from '@/libs/id.js';
import { getMisskey } from '@/libs/misskey.js';
import { sessionHostCache, tokenSecretCache } from '@/server/cache.js';
import { die } from '@/server/utils/die.js';

const miAuth = (host: string) => {
  const { name, permission } = misskeyAppInfo;
  const callback = encodeURI(`${config.url}/miauth`);
  const session = uuid();
  sessionHostCache[session] = host;
  return `https://${host}/miauth/${session}?name=${encodeURI(name)}&callback=${encodeURI(callback)}&permission=${encodeURI(permission.join(','))}`;
};

const legacyAuth = async (host: string) => {
  const misskey = getMisskey(host);
  const { name, permission, description } = misskeyAppInfo;
  const callbackUrl = encodeURI(`${config.url}/legacy-auth`);
  const { secret } = await misskey.request('app/create', {
    name, description, permission, callbackUrl,
  });
  const { token, url } = await misskey.request('auth/session/generate', {
    appSecret: secret,
  });
  sessionHostCache[token] = host;
  tokenSecretCache[token] = secret;

  return url;
};

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

  try {
    const meta = await getMisskey(host).request('meta', { detail: true });

    if (typeof meta !== 'object') {
      await die(reply, 'other');
      return;
    }

    // NOTE:
    //   環境によってはアクセスしたドメインとMisskeyにおけるhostが異なるケースがある
    //   そういったインスタンスにおいてアカウントの不整合が生じるため、
    //   APIから戻ってきたホスト名を正しいものとして、改めて正規化する
    host = meta.uri.replace(/^https?:\/\//g, '').replace(/\/+/g, '').trim();

    if (meta.features.miauth) {
      reply.redirect(miAuth(host));
    } else {
      reply.redirect(await legacyAuth(host));
    }
  } catch(e) {
    if (!(e instanceof Error && e.name === 'Error')) throw e;
    await die(reply, 'hostNotFound');
  }
};
