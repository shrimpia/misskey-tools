import cron from 'node-cron';
import { deleteUser } from '../functions/users';
import { MiUser, updateScore } from '../functions/update-score';
import { updateRating } from '../functions/update-rating';
import { Users } from '../models';
import {sendNoteAlert, sendNotificationAlert} from './send-alert';
import {api, MisskeyError, TimedOutError} from './misskey';
import * as Store from '../store';
import { User } from '../models/entities/user';
import {groupBy} from '../utils/group-by';
import {clearLog, printLog} from '../store';
import {errorToString} from '../functions/error-to-string';
import {Acct, toAcct} from '../models/acct';
import {Count} from '../models/count';
import {format} from '../../common/functions/format';

const ERROR_CODES_USER_REMOVED = ['NO_SUCH_USER', 'AUTHENTICATION_FAILED', 'YOUR_ACCOUNT_SUSPENDED'];

// TODO: Redisで持つようにしたい
const userScoreCache = new Map<Acct, Count>();

export default (): void => {
	cron.schedule('0 0 0 * * *', work);
};

export const work = async () => {
	Store.dispatch({ nowCalculating: true });

	clearLog();
	printLog('Started.');

	try {
		const users = await Users.find();
		const groupedUsers = groupBy(users, u => u.host);

		printLog(`${users.length} アカウントのレート計算を開始します。`);
		await calculateAllRating(groupedUsers);
		Store.dispatch({ nowCalculating: false });

		printLog(`${users.length} アカウントのアラート送信を開始します。`);
		await sendAllAlerts(groupedUsers);

		printLog('ミス廃アラートワーカーは正常に完了しました。');
	} catch (e) {
		printLog('ミス廃アラートワーカーが異常終了しました。', 'error');
		printLog(e instanceof Error ? errorToString(e) : e, 'error');
	} finally {
		Store.dispatch({ nowCalculating: false });
	}
};

const calculateAllRating = async (groupedUsers: [string, User[]][]) => {
	return await Promise.all(groupedUsers.map(kv => calculateRating(...kv)));
};

const calculateRating = async (host: string, users: User[]) => {
	for (const user of users) {
		let miUser: MiUser;
		try {
			miUser = await api<MiUser>(user.host, 'i', {}, user.token);
		} catch (e) {
			if (!(e instanceof Error)) {
				printLog('バグ：エラーオブジェクトはErrorを継承していないといけない', 'error');
			} else if (e instanceof MisskeyError) {
				if (ERROR_CODES_USER_REMOVED.includes(e.error.code)) {
					// ユーザーが削除されている場合、レコードからも消してとりやめ
					printLog(`アカウント ${toAcct(user)} は削除されているか、凍結されているか、トークンを失効しています。そのため、本システムからアカウントを削除します。`, 'warn');
					await deleteUser(user.username, user.host);
				} else {
					printLog(`Misskey エラー: ${JSON.stringify(e.error)}`, 'error');
				}
			} else if (e instanceof TimedOutError) {
				printLog(`サーバー ${user.host} との接続に失敗したため、このサーバーのレート計算を中断します。`, 'error');
				return;
			} else {
				// おそらく通信エラー
				printLog(`不明なエラーが発生しました。\n${errorToString(e)}`, 'error');
			}
			continue;
		}
		userScoreCache.set(toAcct(user), miUser);

		await updateRating(user, miUser);
	}
	printLog(`${host} ユーザー(${users.length}人) のレート計算が完了しました。`);
};

const sendAllAlerts = async (groupedUsers: [string, User[]][]) => {
	return await Promise.all(groupedUsers.map(kv => sendAlerts(...kv)));
};

const sendAlerts = async (host: string, users: User[]) => {
	const models = users
		.map(user => {
			const count = userScoreCache.get(toAcct(user));
			if (count == null) return null;
			return {
				user,
				count,
				message: format(user, count),
			};
		})
		.filter(u => u != null) as {user: User, count: Count, message: string}[];

	// 何もしない
	for (const {user, count} of models.filter(m => m.user.alertMode === 'nothing')) {
		await updateScore(user, count);
	}

	// 通知
	for (const {user, count, message} of models.filter(m => m.user.alertMode === 'notification' || m.user.alertMode === 'both')) {
		await sendNotificationAlert(message, user);
		if (user.alertMode === 'notification') {
			await updateScore(user, count);
		}
	}

	// 通知
	for (const {user, count, message} of models.filter(m => m.user.alertMode === 'note')) {
		await sendNoteAlert(message, user);
		await updateScore(user, count);
	}

	printLog(`${host} ユーザー(${users.length}人) へのアラート送信が完了しました。`);
};
