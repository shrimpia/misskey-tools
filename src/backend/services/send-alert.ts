import { User } from '../models/entities/user';
import { format } from '../../common/functions/format';
import { getScores } from '../functions/get-scores';
import { api } from './misskey';

/**
 * アラートを送信する
 * @param user ユーザー
 */
export const sendAlert = async (user: User) => {
	const text = format(await getScores(user), user);
	switch (user.alertMode) {
		case 'note':
			await sendNoteAlert(text, user);
			break;
		case 'notification':
			await sendNotificationAlert(text, user);
			break;
		case 'both':
			await Promise.all([
				sendNotificationAlert(text, user),
				sendNoteAlert(text, user),
			]);
			break;
	}
};

/**
 * ノートアラートを送信する
 * @param text 通知内容
 * @param user ユーザー
 */
const sendNoteAlert = async (text: string, user: User) => {
	const res = await api<Record<string, unknown>>(user.host, 'notes/create', {
		text,
		visibility: user.visibility,
		localOnly: user.localOnly,
		remoteFollowersOnly: user.remoteFollowersOnly,
	}, user.token);

	if (res.error) {
		throw res.error || res;
	}
};

/**
 * 通知アラートを送信する
 * @param text 通知内容
 * @param user ユーザー
 */
const sendNotificationAlert = async (text: string, user: User) => {
	const res = await api(user.host, 'notifications/create', {
		header: 'みす廃あらーと',
		icon: 'https://i.imgur.com/B991yTl.png',
		body: text,
	}, user.token);

	if (res.error) {
		throw res.error || res;
	}
};
