import { TRPCError } from '@trpc/server';
import { noteVisibilities } from 'misskey-js';
import { z } from 'zod';

import { scheduledNoteDtoSchema, toScheduledNoteDto } from '@/server/api/dto/scheduled-note';
import { sessionProcedure } from '@/server/api/procedures/session.js';
import { router } from '@/server/api/trpc.js';
import { createScheduledNote } from '@/services/note-scheduler/create';
import { deleteScheduledNote } from '@/services/note-scheduler/delete';
import { getScheduledNotes } from '@/services/note-scheduler/get';
import { getSession } from '@/services/sessions/get-session.js';

export const noteSchedulerRouter = router({
  create: sessionProcedure
    .input(z.object({
      sessionId: z.string(),
      note: z.object({
        text: z.string(),
        cw: z.string().nullable(),
        localOnly: z.boolean(),
        visibility: z.enum(noteVisibilities),
        visibleUserIds: z.array(z.string()).default([]),
      }),
      timestamp: z.coerce.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const session = await getSession(input.sessionId, ctx.account.id);
      if (session == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No such session.',
        });
      }
      await createScheduledNote(session, input.note, input.timestamp);
    }),
  list: sessionProcedure
    .output(z.array(scheduledNoteDtoSchema))
    .query(async ({ ctx }) => {
      const notes = await getScheduledNotes(ctx.account);
      return notes.map(n => toScheduledNoteDto(n));
    }),
  delete: sessionProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      await deleteScheduledNote(id, ctx.account);
    }),
});
