import rndstr from 'rndstr';

import type { UsedToken } from '@prisma/client';

import { prisma } from '@/libs/prisma.js';

/**
 * Misskey Tools API アクセストークンを生成します
 */
export const generateAccessToken = async (): Promise<string> => {
  let used: UsedToken | null = null;
  let token: string;
  do {
    token = rndstr(32);
    used = await prisma.usedToken.findUnique({ where: { token } });
  } while (used != null);
  return token;
};
