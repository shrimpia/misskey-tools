import cron from 'node-cron';
import delay from 'delay';

import { Users } from '../models';
import { deleteUser } from '../functions/users';
import { updateScore } from '../functions/update-score';
import { send } from './send';

export default (): void => {
	cron.schedule('0 0 0 * * *', async () => {
		const users = await Users.createQueryBuilder()
			.select()
			.getMany();
		for (const user of users) {
			try {
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
				await updateScore(user);
			}
		}
	});
};