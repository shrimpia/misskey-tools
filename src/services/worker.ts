import cron from 'node-cron';
import delay from 'delay';
import { Not } from 'typeorm';

import { deleteUser } from '../functions/users';
import { MiUser, updateScore } from '../functions/update-score';
import { updateRating } from '../functions/update-rating';
import { AlertMode } from '../types/alert-mode';
import { Users } from '../models';
import { send } from './send';
import { api } from './misskey';
import * as Store from '../store';

export default (): void => {
	cron.schedule('0 0 0 * * *', async () => {
		Store.dispatch({
			nowCalculating: true,
		});
		const users = await Users.find({
			alertMode: Not<AlertMode>('nothing'),
		});
		for (const user of users) {
			try {
				const miUser = await api<MiUser & { error: unknown }>(user.host, 'users/show', { username: user.username }, user.token);
				if (miUser.error) throw miUser.error;
				await updateRating(user, miUser);
				await send(user);

				await updateScore(user, miUser);

				if (user.alertMode === 'note')
					await delay(3000);
			} catch (e) {
				if (e.code) {
					if (e.code === 'NO_SUCH_USER' || e.code === 'AUTHENTICATION_FAILED') {
						// ユーザーが削除されている場合、レコードからも消してとりやめ
						console.info(`${user.username}@${user.host} is deleted, so delete this user from the system`);
						await deleteUser(user.username, user.host);
					} else {
						console.error(`Misskey Error: ${JSON.stringify(e)}`);
					}
				} else {
					// おそらく通信エラー
					console.error(`Unknown error: ${e.name} ${e.message}`);
				}
			}
		}
		Store.dispatch({
			nowCalculating: false,
		});
	});
};