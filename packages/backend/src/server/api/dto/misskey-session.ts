import { MisskeySession } from '@prisma/client';
import { z } from 'zod';

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
