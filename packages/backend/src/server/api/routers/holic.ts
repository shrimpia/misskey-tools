
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { adminProcedure } from '../procedures/admin';

import { prisma } from '@/libs/prisma';
import { queues } from '@/queue';
import { holicAccountDtoSchema, toHolicAccountDto } from '@/server/api/dto/holic-account.js';
import { sessionProcedure } from '@/server/api/procedures/session.js';
import { router } from '@/server/api/trpc.js';
import { getSession } from '@/services/sessions/get-session.js';

export const holicRouter = router({
  getAccount: sessionProcedure
    .output(holicAccountDtoSchema.nullable())
    .input(z.object({
      sessionId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const accountId = ctx.account.id;
      const session = await getSession(input.sessionId, accountId);
      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      const holicAccount = await prisma.holicAccount.findUnique({
        where: { misskeySessionId: session.id },
      });
      if (!holicAccount) {
        return null;
      }

      return toHolicAccountDto(holicAccount);
    }),

  createAccount: sessionProcedure
    .output(holicAccountDtoSchema)
    .input(z.object({
      sessionId: z.string(),
      alertAsNote: z.boolean(),
      alertAsNotification: z.boolean(),
      noteVisibility: z.string(),
      noteLocalOnly: z.boolean(),
      template: z.string().nullable(),
      rankingVisible: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      const accountId = ctx.account.id;
      const session = await getSession(input.sessionId, accountId);
      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
      const isExists = await prisma.holicAccount.findUnique({
        where: { misskeySessionId: session.id },
        select: { misskeySessionId: true },
      });

      if (isExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
        });
      }

      const account = await prisma.holicAccount.create({
        data: {
          misskeySessionId: session.id,
          alertAsNote: input.alertAsNote,
          alertAsNotification: input.alertAsNotification,
          rankingVisible: input.rankingVisible,
          noteVisibility: input.noteVisibility,
          noteLocalOnly: input.noteLocalOnly,
          template: input.template === '' ? null : input.template,
        },
      });
      return toHolicAccountDto(account);
    }),

  updateAccount: sessionProcedure
    .output(holicAccountDtoSchema)
    .input(z.object({
      sessionId: z.string(),
      alertAsNote: z.boolean().optional(),
      alertAsNotification: z.boolean().optional(),
      noteVisibility: z.string().optional(),
      noteLocalOnly: z.boolean().optional(),
      template: z.string().nullable().optional(),
      rankingVisible: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const accountId = ctx.account.id;
      const session = await getSession(input.sessionId, accountId);
      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
      const isExists = await prisma.holicAccount.findUnique({
        where: { misskeySessionId: session.id },
        select: { misskeySessionId: true },
      });

      if (!isExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      const account = await prisma.holicAccount.update({
        where: { misskeySessionId: session.id },
        data: {
          alertAsNote: input.alertAsNote,
          alertAsNotification: input.alertAsNotification,
          rankingVisible: input.rankingVisible,
          noteVisibility: input.noteVisibility,
          noteLocalOnly: input.noteLocalOnly,
          template: input.template === '' ? null : input.template,
        },
      });
      return toHolicAccountDto(account);
    }),

  deleteAccount: sessionProcedure
    .output(z.void())
    .input(z.object({
      sessionId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const accountId = ctx.account.id;
      const session = await getSession(input.sessionId, accountId);
      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
      const isExists = await prisma.holicAccount.findUnique({
        where: { misskeySessionId: session.id },
        select: { misskeySessionId: true },
      });

      if (!isExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      await prisma.holicAccount.delete({
        where: { misskeySessionId: session.id },
      });
    }),

  adminForceRunAll: adminProcedure
    .mutation(async () => {
      await queues.holicCronQueue.add('force-run', null);
    }),
});
