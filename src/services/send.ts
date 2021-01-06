import { User } from '../models/entities/user';
import { format } from '../functions/format';
import { getScores } from '../functions/get-scores';
import { api } from './misskey';

export const send = async (user: User): Promise<void> => {
	const text = format(await getScores(user), user);

	if (user.alertMode === 'note') {
		console.info(`send ${user.username}@${user.host}'s misshaialert as a note`);
		const opts = {
			text,
			visibility: user.visibility,
		} as Record<string, unknown>;
		if (user.localOnly) opts.localOnly = user.localOnly;
		if (user.remoteFollowersOnly) opts.remoteFollowersOnly = user.remoteFollowersOnly;
		const res = await api<Record<string, unknown>>(user.host, 'notes/create', opts, user.token);
		if (res.error) {
			throw res.error || res;
		}
	} else if (user.alertMode === 'notification') {
		console.info(`send ${user.username}@${user.host}'s misshaialert as a notification`);
		const res = await api(user.host, 'notifications/create', {
			header: 'みす廃あらーと',
			icon: 'https://i.imgur.com/B991yTl.png',
			body: text,
		}, user.token);
		if (res.error) {
			throw res.error || res;
		}
	} else {
		console.info(`will not send ${user.username}@${user.host}'s misshaialert`);
	}
};