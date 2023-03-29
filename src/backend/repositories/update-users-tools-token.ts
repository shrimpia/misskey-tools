import {User} from '@prisma/client';
import {generateToken} from './generate-token.js';
import {prisma} from '../../libs/prisma.js';

/**
 * ユーザーのミス廃トークンを更新します。
 * @param user ユーザー
 * @returns ミス廃トークン
 */
export const updateUsersToolsToken = async (user: User | User['id']): Promise<string> => {
  const id = typeof user === 'number'
    ? user
    : user.id;

  const misshaiToken = await generateToken();
  prisma.user.update({
    where: {id},
    data: {misshaiToken},
  });
  return misshaiToken;
};
