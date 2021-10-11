import dayjs from 'dayjs';

import { User } from '../models/entities/user';
import { updateUser } from './users';
import { MiUser } from './update-score';

/**
 * ユーザーのレーティングを更新します
 * @param user ユーザー
 * @param miUser Misskeyのユーザー
 */
export const updateRating = async (user: User, miUser: MiUser): Promise<void> => {
	const elapsedDays = dayjs().diff(dayjs(miUser.createdAt), 'd') + 1;
	await updateUser(user.username, user.host, {
		prevRating: user.rating,
		rating: miUser.notesCount / elapsedDays,
	});
};
