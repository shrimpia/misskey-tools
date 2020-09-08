import { api } from '../services/misskey';
import { config } from '../config';
import { User } from '../models/entities/user';
import { updateUser } from './users';

export const format = async (user: User): Promise<string> => {
	const miUser = await api<Record<string, number>>(user.host, 'users/show', { username: user.username }, user.token);
	if (miUser.error) {
		throw miUser.error;
	}
	const notesDelta = toSignedString(miUser.notesCount - user.prevNotesCount);
	const followingDelta = toSignedString(miUser.followingCount - user.prevFollowingCount);
	const followersDelta = toSignedString(miUser.followersCount - user.prevFollowersCount);
                
	await updateUser(user.username, user.host, {
		prevNotesCount: miUser.notesCount,
		prevFollowingCount: miUser.followingCount,
		prevFollowersCount: miUser.followersCount,
	});

	return `昨日のMisskeyの活動は

ノート: ${miUser.notesCount}(${notesDelta})
フォロー : ${miUser.followingCount}(${followingDelta})
フォロワー :${miUser.followersCount}(${followersDelta})

でした。
${config.url}

#misshaialert`;
};

export const toSignedString = (num: number): string => num < 0 ? num.toString() : '+' + num;