import { User } from '../models/entities/user.js';
import { toSignedString } from '../../common/functions/to-signed-string.js';
import {Count} from '../models/count.js';
import {api} from '../services/misskey.js';
import {Score} from '../../common/types/score.js';
import {MiUser} from './update-score.js';

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
