import {currentTokenVersion} from 'tools-shared/dist/const.js';

import {prisma} from '@/libs/prisma.js';
import {getUser} from '@/services/users/get-user.js';
import {updateUsersToolsToken} from '@/services/users/update-users-tools-token.js';

/**
 * ユーザー情報を更新するか新規作成します。
 * @param username ユーザー名
 * @param host ホスト名
 * @param token トークン
 */
export const upsertUser = async (username: string, host: string, token: string): Promise<void> => {
  const u = await getUser(username, host);
  if (u) {
    await prisma.user.update({
      where: {id: u.id},
      data: {
        token,
        tokenVersion: currentTokenVersion,
      },
    });
  } else {
    const result = await prisma.user.create({
      data: {
        username,
        host,
        token,
        tokenVersion: currentTokenVersion,
      },
    });
    await updateUsersToolsToken(result.id);
  }
};
