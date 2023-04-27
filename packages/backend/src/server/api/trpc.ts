import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import { getAccountByAccessToken } from '@/services/accounts/get-account-by-access-token.js';

export async function createContext({ req }: CreateFastifyContextOptions) {
  const tokens = req.headers.authorization?.split(' ');
  const token = tokens?.length === 2 && tokens[0] === 'Bearer' ? tokens[1] : null;
  const account = token ? await getAccountByAccessToken(token) : null;
  return { token, account };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const {
  router,
  procedure,
  middleware,
} = t;
