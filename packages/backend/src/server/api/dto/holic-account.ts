import { z } from 'zod';

import type { HolicAccount } from '@prisma/client';

export const holicAccountDtoSchema = z.object({
  misskeySessionId: z.string(),
  alertAsNote: z.boolean(),
  alertAsNotification: z.boolean(),
  noteVisibility: z.string(),
  noteLocalOnly: z.boolean(),
  template: z.string().nullable(),
  rankingVisible: z.boolean(),
}).strict();

export type HolicAccountDto = z.infer<typeof holicAccountDtoSchema>;

export const toHolicAccountDto = (a: HolicAccount): HolicAccountDto => ({
  misskeySessionId: a.misskeySessionId,
  alertAsNote: a.alertAsNote,
  alertAsNotification: a.alertAsNotification,
  noteVisibility: a.noteVisibility,
  noteLocalOnly: a.noteLocalOnly,
  template: a.template,
  rankingVisible: a.rankingVisible,
});
