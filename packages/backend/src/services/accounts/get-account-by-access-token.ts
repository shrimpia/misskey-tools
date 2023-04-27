import { prisma } from '@/libs/prisma.js';

export const getAccountByAccessToken = async (accessToken: string) => {
  return await prisma.account.findUnique({
    where: { accessToken },
  });
};
