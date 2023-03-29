import { updateUser } from './users.js';
import {Count} from '../models/count.js';
import {User} from '@prisma/client';

/**
 * Misskeyのユーザーモデル
 */
export type MiUser = {
  notesCount: number,
  followingCount: number,
  followersCount: number,
  createdAt: string,
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
