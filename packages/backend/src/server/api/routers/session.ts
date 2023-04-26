import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { sessionProcedure } from '@/server/api/procedures/session.js';
import { procedure, router } from '@/server/api/trpc.js';
import { getUserByToolsToken } from '@/services/users/get-user-by-tools-token';

export const sessionRouter = router({
  get: sessionProcedure.query(({ ctx }) => ctx.user),
  getByToken: procedure.input(z.string()).query(async ({ input: token }) => {
    const user = await getUserByToolsToken(token);
    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }
    return user;
  }),
});
