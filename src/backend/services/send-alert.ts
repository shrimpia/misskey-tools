import { User } from '../models/entities/user';
import { api } from './misskey';

/**
 * ノートアラートを送信する
 * @param text 通知内容
 * @param user ユーザー
 */
export const sendNoteAlert = async (text: string, user: User) => {
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
export const sendNotificationAlert = async (text: string, user: User) => {
	const res = await api(user.host, 'notifications/create', {
		header: 'Misskey Tools',
		icon: 'https://i.imgur.com/B991yTl.png',
		body: text,
	}, user.token);

	if (res.error) {
		throw res.error || res;
	}
};
