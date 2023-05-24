import type { Account } from '@prisma/client';

import { prisma } from '@/libs/prisma.js';

export const getSessionIdsByAccount = async (account: Account) => {
  return (await prisma.misskeySession.findMany({
    where: { accountId: account.id },
    select: { id: true },
  })).map(s => s.id);
};
