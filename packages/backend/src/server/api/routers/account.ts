
import { z } from 'zod';

import { accountDtoSchema, toAccountDto } from '../dto/account';
import { misskeySessionDtoSchema } from '../dto/misskey-session';

import { prisma } from '@/libs/prisma';
import { sessionProcedure } from '@/server/api/procedures/session.js';
import { router } from '@/server/api/trpc.js';
import { delay } from '@/utils/delay';


export const accountRouter = router({
  getMyself: sessionProcedure
    .output(accountDtoSchema)
    .query(({ ctx }) => {
      return toAccountDto(ctx.account);
    }),
  getMisskeySessions: sessionProcedure
    .output(z.array(misskeySessionDtoSchema))
    .query(async ({ ctx }) => {
      await delay(1000);
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
});
