
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { sessionProcedure } from '../procedures/session';

import { prisma } from '@/libs/prisma';
import { announcementDtoSchema, announcementListItemDtoSchema } from '@/server/api/dto/announcement';
import { procedure, router } from '@/server/api/trpc.js';


export const announcementsRouter = router({
  getAll: procedure
    .output(z.array(announcementListItemDtoSchema))
    .query(async () => {
      return await prisma.announcement.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),
  get: procedure
    .output(announcementDtoSchema)
    .input(z.number())
    .query(async ({ input }) => {
      try {
        return await prisma.announcement.findUniqueOrThrow({
          where: { id: input },
        });
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
    }),
  like: sessionProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const announcement = await prisma.announcement.findUnique({
        where: { id: input },
        select: { id: true, like: true, createdAt: true },
      });
      if (announcement == null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
      await prisma.announcement.update({
        where: { id: input },
        data: { like: announcement.like + 1 },
      });
    }),
});
