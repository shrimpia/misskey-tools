import { Account } from '@prisma/client';

import { prisma } from '@/libs/prisma.js';

export const getSessionsByAccount = async (account: Account) => {
  return await prisma.misskeySession.findMany({
    where: { accountId: account.id },
  });
};
