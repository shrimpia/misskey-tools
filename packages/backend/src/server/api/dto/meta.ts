import { currentTokenVersion } from 'tools-shared/dist/const';
import { z } from 'zod';

export const metaDtoSchema = z.object({
  version: z.string(),
  currentTokenVersion: z.literal(currentTokenVersion),
}).strict();

export type MetaDto = z.infer<typeof metaDtoSchema>;
