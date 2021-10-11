import cron from 'node-cron';
import delay from 'delay';
import { Not } from 'typeorm';

import { deleteUser } from '../functions/users';
import { MiUser, updateScore } from '../functions/update-score';
import { updateRating } from '../functions/update-rating';
import { AlertMode } from '../../common/types/alert-mode';
import { Users } from '../models';
import { sendAlert } from './send-alert';
import { api } from './misskey';
import * as Store from '../store';
import { User } from '../models/entities/user';

export default (): void => {
	cron.schedule('0 0 0 * * *', async () => {
		Store.dispatch({ nowCalculating: true });

		const users = await Users.find({ alertMode: Not<AlertMode>('nothing') });
		for (const user of users) {
			await update(user).catch(e => handleError(user, e));

			if (user.alertMode === 'note') {
				return delay(3000);
			}
		}

		Store.dispatch({ nowCalculating: false });
	});
};

/**
 * アラートを送信します。
 * @param user アラートの送信先ユーザー
 */
const update = async (user: User) => {
	const miUser = await api<MiUser & { error: unknown }>(user.host, 'users/show', { username: user.username }, user.token);
	if (miUser.error) throw miUser.error;

	await updateRating(user, miUser);
	await sendAlert(user);

	await updateScore(user, miUser);
};

/**
 * アラート送信失敗のエラーをハンドリングします。
 * @param user 送信に失敗したアラートの送信先ユーザー
 * @param e エラー。ErrorだったりObjectだったりするのでanyだけど、いずれ型定義したい
 */
const handleError = async (user: User, e: any) => {
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
};
