import {IUser} from '../../common/types/user.js';
import {User} from '@prisma/client';
import {prisma} from '../libs/prisma.js';
import {DeepPartial} from '../types/deep-partial.js';
import {Count} from '../types/count.js';
import {MiUser} from '../types/mi-user.js';
import dayjs from 'dayjs';
import {packUser} from './pack-user.js';

/**
 * ユーザーを取得します
 * @param username ユーザー名
 * @param host ホスト名
 * @returns ユーザー
 */
export const getUser = (username: string, host: string): Promise<IUser | null> => {
  return prisma.user.findUnique({ where: { username_host: { username, host } } }).then(packUser);
};

/**
 * ユーザー情報を更新します。
 * @param username ユーザー名
 * @param host ホスト名
 * @param record 既存のユーザー情報
 */
export const updateUser = async (username: string, host: string, record: DeepPartial<User>): Promise<void> => {
  await prisma.user.update({
    where: {username_host: { username, host }},
    data: record,
  });
};

/**
 * 指定したユーザーを削除します。
 * @param username ユーザー名
 * @param host ホスト名
 */
export const deleteUser = async (username: string, host: string): Promise<void> => {
  await prisma.user.delete({
    where: {username_host: { username, host }}
  });
};

/**
 * ユーザー数を取得します。
 * @returns ユーザー数
 */
export const getUserCount = (): Promise<number> => {
  return prisma.user.count();
};
/**
 * スコアを更新します
 * @param user ユーザー
 * @param count 統計
 */
export const updateScore = async (user: User, count: Count): Promise<void> => {
  await updateUser(user.username, user.host, {
    prevNotesCount: count.notesCount ?? 0,
    prevFollowingCount: count.followingCount ?? 0,
    prevFollowersCount: count.followersCount ?? 0,
  });
};

/**
 * ユーザーのレーティングを更新します
 * @param user ユーザー
 * @param miUser Misskeyのユーザー
 */
export const updateRating = async (user: User, miUser: MiUser): Promise<void> => {
  const elapsedDays = dayjs().diff(dayjs(miUser.createdAt), 'd') + 1;
  await updateUser(user.username, user.host, {
    prevRating: user.rating,
    rating: miUser.notesCount / elapsedDays,
  });
};
