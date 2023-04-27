import { TRPCError } from '@trpc/server';

import { middleware, procedure } from '@/server/api/trpc.js';

const isAdmin = middleware(({ next, ctx }) => {
  if (!ctx.account?.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      token: ctx.token,
      account: ctx.account,
    },
  });
});
// you can reuse this for any procedure
export const adminProcedure = procedure.use(isAdmin);
