import { z } from 'zod';

import type { MisskeySession } from '@prisma/client';

export const misskeySessionDtoSchema = z.object({
  id: z.string(),
  username: z.string(),
  host: z.string(),
}).strict();

export type MisskeySessionDto = z.infer<typeof misskeySessionDtoSchema>;

export const toMisskeySessionDto = (s: MisskeySession): MisskeySessionDto => ({
  id: s.id,
  username: s.username,
  host: s.host,
});
