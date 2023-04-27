import { prisma } from '@/libs/prisma.js';

export const getSessionByMisskeyToken = async (misskeyToken: string) => {
  return await prisma.misskeySession.findFirst({ where: { token: misskeyToken } });
};

export const getSessionByMisskeyAcct = async (username: string, host: string) => {
  return await prisma.misskeySession.findUnique({
    where: { username_host: { username, host } },
    include: { account: true },
  });
};
