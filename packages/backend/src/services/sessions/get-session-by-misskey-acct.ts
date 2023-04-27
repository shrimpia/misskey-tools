import { prisma } from '@/libs/prisma';

export const getSessionByMisskeyAcct = async (username: string, host: string) => {
  return await prisma.misskeySession.findUnique({
    where: { username_host: { username, host } },
    include: { account: true },
  });
};
