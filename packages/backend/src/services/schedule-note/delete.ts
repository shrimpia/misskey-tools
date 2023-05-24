import type { Account } from '@prisma/client';

import { prisma } from '@/libs/prisma.js';
import { getSessionIdsByAccount } from '@/services/sessions/get-session-ids-by-account.js';

export const deleteScheduledNote = async (id: string, account: Account) => {
  const sessionIds = await getSessionIdsByAccount(account);

  const note = await prisma.scheduledNote.findUnique({
    where: { id },
    select: {
      misskeySessionId: true,
    },
  });
  if (note == null || !sessionIds.includes(note.misskeySessionId)) return;

  await prisma.scheduledNote.delete({
    where: { id },
  });
};
