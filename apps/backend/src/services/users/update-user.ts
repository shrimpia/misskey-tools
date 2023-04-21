import {User} from '@prisma/client';

import {prisma} from '@/libs/prisma.js';
import {DeepPartial} from '@/types/deep-partial.js';

/**
 * ユーザー情報を更新します。
 * @param username ユーザー名
 * @param host ホスト名
 * @param record 既存のユーザー情報
 */
export const updateUser = async (username: string, host: string, record: DeepPartial<User>): Promise<void> => {
  await prisma.user.update({
    where: {username_host: {username, host}},
    data: record,
  });
};
