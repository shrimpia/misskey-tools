import { api as misskey } from 'misskey-js';

import { ua } from '@/app.js';

const clientsMap = new Map<string, misskey.APIClient>();

/**
 * ホスト名に対応するMisskeyクライアントを取得します。
 */
export const getMisskey = (host: string) => {
  let cli = clientsMap.get(host);
  if (cli != null) return cli;

  cli = new misskey.APIClient({
    origin: `https://${host}`,
    fetch: (input, init) => {
      return fetch(input, {
        ...init,
        headers: {
          ...(init?.headers ?? []),
          'User-Agent': ua,
        },
      });
    },
  });

  clientsMap.set(host, cli);
  return cli;
};
