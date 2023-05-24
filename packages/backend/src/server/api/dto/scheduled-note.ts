import { z } from 'zod';

import type { ScheduledNote } from '@prisma/client';

export const scheduledNoteDtoSchema = z.object({
  id: z.string(),
  date: z.date(),
  text: z.string(),
  cw: z.string().nullable(),
  localOnly: z.boolean(),
  visibility: z.string(),
  visibleUserIds: z.array(z.string()),
  misskeySessionId: z.string(),
}).strict();

export type ScheduledNoteDto = z.infer<typeof scheduledNoteDtoSchema>;

export const toScheduledNoteDto = (s: ScheduledNote): ScheduledNoteDto => ({
  id: s.id,
  date: s.date,
  text: s.text,
  cw: s.cw,
  localOnly: s.localOnly,
  visibility: s.visibility,
  visibleUserIds: s.visibleUserIds,
  misskeySessionId: s.misskeySessionId,
});
