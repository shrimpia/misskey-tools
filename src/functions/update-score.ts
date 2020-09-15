import { User } from '../models/entities/user';
import { api } from '../services/misskey';
import { updateUser } from './users';

export const updateScore = async (user: User): Promise<void>  => {
	const miUser = await api<Record<string, number>>(user.host, 'users/show', { username: user.username }, user.token);
	if (miUser.error) {
		throw miUser.error;
	}
                
	await updateUser(user.username, user.host, {
		prevNotesCount: miUser.notesCount ?? 0,
		prevFollowingCount: miUser.followingCount ?? 0,
		prevFollowersCount: miUser.followersCount ?? 0,
	});
};