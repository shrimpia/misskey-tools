import type { Account } from '@prisma/client';

import { prisma } from '@/libs/prisma.js';
import { getSessionIdsByAccount } from '@/services/sessions/get-session-ids-by-account.js';

export const getScheduledNotes = async (account: Account) => {
  const sessionIds = await getSessionIdsByAccount(account);

  const notes = await prisma.scheduledNote.findMany({
    where: { misskeySessionId: { in: sessionIds } },
    orderBy: { date: 'desc' },
    select: {
      id: true,
      misskeySessionId: true,
      date: true,
      text: true,
      cw: true,
      localOnly: true,
      visibility: true,
      visibleUserIds: true,
    },
  });

  return notes;
};
