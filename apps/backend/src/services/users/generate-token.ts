import { UsedToken } from '@prisma/client';
import rndstr from 'rndstr';

import {prisma} from '@/libs/prisma.js';

/**
 * トークンを生成します
 */
export const generateToken = async (): Promise<string> => {
  let used: UsedToken | null = null;
  let token: string;
  do {
    token = rndstr(32);
    used = await prisma.usedToken.findUnique({ where: {token} });
  } while (used !== undefined);
  return token;
};
