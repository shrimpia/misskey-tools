import { TRPCError } from "@trpc/server";

import { middleware, procedure } from "@/server/api/trpc.js";

const hasSession = middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
			token: ctx.token,
      user: ctx.user,
    },
  });
});
// you can reuse this for any procedure
export const sessionProcedure = procedure.use(hasSession);
