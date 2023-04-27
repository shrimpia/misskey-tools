import { TRPCError } from '@trpc/server';

import { middleware, procedure } from '@/server/api/trpc.js';

const hasSession = middleware(({ next, ctx }) => {
  const { account } = ctx;
  if (!account) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      token: ctx.token,
      account: account,
    },
  });
});
// you can reuse this for any procedure
export const sessionProcedure = procedure.use(hasSession);
