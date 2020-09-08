import { User } from '../models/entities/user';
import { Score } from '../types/Score';
import { api } from '../services/misskey';
import { toSignedString } from './to-signed-string';

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