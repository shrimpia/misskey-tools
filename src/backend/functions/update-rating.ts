import dayjs from 'dayjs';

import { updateUser } from './users.js';
import { MiUser } from './update-score.js';
import {User} from '@prisma/client';

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
