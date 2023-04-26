import { User } from '@prisma/client';
import { Score } from 'tools-shared/dist/types/score.js';

import { api } from '@/libs/misskey.js';
import { getDelta } from '@/services/misshai/get-delta.js';
import { MiUser } from '@/types/mi-user.js';

/**
 * ユーザーのスコアを取得します。
 * @param user ユーザー
 * @returns ユーザーのスコア
 */
export const getScores = async (user: User): Promise<Score> => {
  // TODO 毎回取ってくるのも微妙なので、ある程度キャッシュしたいかも
  const miUser = await api<MiUser>(user.host, 'users/show', { username: user.username }, user.token);

  return {
    notesCount: miUser.notesCount,
    followingCount: miUser.followingCount,
    followersCount: miUser.followersCount,
    ...getDelta(user, miUser),
  };
};

