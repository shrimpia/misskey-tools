import { prisma } from '@/libs/prisma.js';

export const getSessionByMisskeyToken = async (misskeyToken: string) => {
  return await prisma.misskeySession.findFirst({ where: { token: misskeyToken } });
};

