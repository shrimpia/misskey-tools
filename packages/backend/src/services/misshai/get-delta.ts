import { User } from '@prisma/client';
import { toSignedString } from 'tools-shared/dist/functions/to-signed-string.js';

import { Count } from '@/types/count.js';

/**
 * ユーザーのスコア差分を取得します。
 * @param user ユーザー
 * @param count 統計
 * @returns ユーザーのスコア差分
 */
export const getDelta = (user: User, count: Count) => {
  return {
    notesDelta: toSignedString(count.notesCount - user.prevNotesCount),
    followingDelta: toSignedString(count.followingCount - user.prevFollowingCount),
    followersDelta: toSignedString(count.followersCount - user.prevFollowersCount),
  };
};
