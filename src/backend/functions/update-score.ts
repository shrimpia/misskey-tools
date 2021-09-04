import { User } from '../models/entities/user';
import { updateUser } from './users';

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
 * @param miUser Misskeyのユーザー
 */
export const updateScore = async (user: User, miUser: MiUser): Promise<void> => {
	await updateUser(user.username, user.host, {
		prevNotesCount: miUser.notesCount ?? 0,
		prevFollowingCount: miUser.followingCount ?? 0,
		prevFollowersCount: miUser.followersCount ?? 0,
	});
};
