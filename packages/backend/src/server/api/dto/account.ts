import { z } from 'zod';

import type { Account } from '@prisma/client';

export const accountDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  isAdmin: z.boolean(),
}).strict();

export type AccountDto = z.infer<typeof accountDtoSchema>;

export const toAccountDto = (a: Account): AccountDto => ({
  id: a.id,
  name: a.name,
  isAdmin: a.isAdmin,
});
