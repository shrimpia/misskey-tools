import { User } from '../models/entities/user';
import { Score } from '../../common/types/score';
import { api } from '../services/misskey';
import { toSignedString } from './to-signed-string';

/**
 * ユーザーのスコアを取得します。
 * @param user ユーザー
 * @returns ユーザーのスコア
 */
export const getScores = async (user: User): Promise<Score> => {
	const miUser = await api<Record<string, number>>(user.host, 'users/show', { username: user.username }, user.token);
	if (miUser.error) {
		throw miUser.error;
	}
	return {
		notesCount: miUser.notesCount,
		followingCount: miUser.followingCount,
		followersCount: miUser.followersCount,
		notesDelta: toSignedString(miUser.notesCount - user.prevNotesCount),
		followingDelta: toSignedString(miUser.followingCount - user.prevFollowingCount),
		followersDelta: toSignedString(miUser.followersCount - user.prevFollowersCount),
	};
};
