import {User} from '@prisma/client';
import {Count} from '../types/count.js';
import {toSignedString} from '../../common/functions/to-signed-string.js';

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
