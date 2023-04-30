
import { z } from 'zod';

import { prisma } from '@/libs/prisma';
import { accountDtoSchema, toAccountDto } from '@/server/api/dto/account';
import { misskeySessionDtoSchema } from '@/server/api/dto/misskey-session';
import { sessionProcedure } from '@/server/api/procedures/session.js';
import { router } from '@/server/api/trpc.js';

export const accountRouter = router({
  getMyself: sessionProcedure
    .output(accountDtoSchema)
    .query(({ ctx }) => {
      return toAccountDto(ctx.account);
    }),
  getMisskeySessions: sessionProcedure
    .output(z.array(misskeySessionDtoSchema))
    .query(async ({ ctx }) => {
      const sessions = await prisma.misskeySession.findMany({
        where: { accountId: ctx.account.id },
        select: {
          id: true,
          username: true,
          host: true,
        },
      });
      return sessions;
    }),
  changeName: sessionProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await prisma.account.update({
        where: { id: ctx.account.id },
        data: { name: input },
        select: { id: true },
      });
    }),
});
