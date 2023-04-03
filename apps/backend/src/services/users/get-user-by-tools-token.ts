import {IUser} from 'tools-shared/dist/types/user.js';

import {prisma} from '@/libs/prisma.js';
import {packUser} from '@/services/users/pack-user.js';

/**
 * ミス廃トークンからユーザーを取得します。
 * @param token ミス廃トークン
 * @returns ユーザー
 */
export const getUserByToolsToken = (token: string): Promise<IUser | null> => {
  return prisma.user.findFirst({where: {misshaiToken: token}}).then(packUser);
};
