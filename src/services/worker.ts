import cron from 'node-cron';
import delay from 'delay';
import { Not } from 'typeorm';

import { deleteUser } from '../functions/users';
import { MiUser, updateScore } from '../functions/update-score';
import { updateRating } from '../functions/update-rating';
import { AlertMode } from '../types/AlertMode';
import { Users } from '../models';
import { send } from './send';
import { api } from './misskey';

export default (): void => {
	cron.schedule('0 0 0 * * *', async () => {
		const users = await Users.find({
			alertMode: Not<AlertMode>('nothing'),
		});
		for (const user of users) {
			const miUser = await api<MiUser & { error: unknown }>(user.host, 'users/show', { username: user.username }, user.token);

			try {
				if (miUser.error) throw miUser.error;
				await updateRating(user, miUser);
				await send(user);
			} catch (e) {
				if (e.code === 'NO_SUCH_USER' || e.code === 'AUTHENTICATION_FAILED') {
					// ユーザーが削除されている場合、レコードからも消してとりやめ
					console.info(`${user.username}@${user.host} is deleted, so delete this user from the system`);
					await deleteUser(user.username, user.host);
				} else {
					console.error(e);
				}
			} finally {
				if (user.alertMode === 'note')
					await delay(3000);
				await updateScore(user, miUser);
			}
		}
	});
};