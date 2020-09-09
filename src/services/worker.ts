import cron from 'node-cron';
import delay from 'delay';

import { Users } from '../models';
import { api } from './misskey';
import { format } from '../functions/format';
import { deleteUser } from '../functions/users';
import { updateScore } from '../functions/update-score';
import { getScores } from '../functions/get-scores';

export default (): void => {
	cron.schedule('0 0 0 * * *', async () => {
		const users = await Users.createQueryBuilder()
			.select()
			.getMany();
		for (const user of users) {
			try {
				const text = format(await getScores(user));
				await updateScore(user);

				if (user.alertMode === 'note') {
					console.info(`send ${user.username}@${user.host}'s misshaialert as a note`);
					const res = await api<Record<string, unknown>>(user.host, 'notes/create', {
						text,
					}, user.token);
					if (res.error) {
						throw res.error;
					}
					break;
				} else if (user.alertMode === 'notification') {
					console.log(`send ${user.username}@${user.host}'s misshaialert as a notification`);
					const res = await api(user.host, 'notifications/create', {
						header: 'みす廃あらーと',
						icon: 'https://i.imgur.com/B991yTl.png',
						body: text,
					}, user.token);
					if (res.error) {
						throw res.error;
					}
				} else {
					console.info(`will not send ${user.username}@${user.host}'s misshaialert`);
				}
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
			}
		}
	});
};