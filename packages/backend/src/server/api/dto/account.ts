import { Account } from '@prisma/client';
import { z } from 'zod';


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
