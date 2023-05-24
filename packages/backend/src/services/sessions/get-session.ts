import type { Account, MisskeySession } from '@prisma/client';

import { prisma } from '@/libs/prisma.js';

export const getSession = async (sessionId: MisskeySession['id'], accountId: Account['id']) => {
  const session = await prisma.misskeySession.findUnique({ where: { id: sessionId } });
  if (!session) return null;
  if (session.accountId !== accountId) return null;

  return session;
};
