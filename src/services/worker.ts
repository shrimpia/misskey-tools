import cron from 'node-cron';
import delay from 'delay';

import { Users } from '../models';
import { api } from './misskey';
import { format } from '../functions/format';
import { deleteUser } from '../functions/users';

export default (): void => {
	cron.schedule('0 0 0 * * *', async () => {
		const users = await Users.createQueryBuilder()
			.select()
			.getMany();
		for (const user of users) {
			try {
				const text = await format(user);
                                
				const res = await api<Record<string, unknown>>(user.host, 'notes/create', {
					text,
					visibility: 'home'
				}, user.token);
				if (res.error) {
					throw res.error;
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
				await delay(3000);
			}
		}
	});
};