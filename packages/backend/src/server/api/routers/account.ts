import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { sessionProcedure } from '@/server/api/procedures/session.js';
import { procedure, router } from '@/server/api/trpc.js';
import { getAccountByAccessToken } from '@/services/accounts/get-account-by-access-token.js';

export const accountRouter = router({
  get: sessionProcedure.query(({ ctx }) => ctx.user),
  getByToken: procedure.input(z.string()).query(async ({ input: token }) => {
    const account = await getAccountByAccessToken(token);
    if (!account) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }
    return account;
  }),
});
