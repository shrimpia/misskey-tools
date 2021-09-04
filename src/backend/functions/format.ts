import { config } from '../../config';
import { User } from '../models/entities/user';
import { Score } from '../../common/types/score';

export const defaultTemplate = `昨日のMisskeyの活動は

ノート: {notesCount}({notesDelta})
フォロー : {followingCount}({followingDelta})
フォロワー :{followersCount}({followersDelta})

でした。
{url}`;

export type Variable = {
	description?: string;
	replace?: string | ((score: Score, user: User) => string);
};

export const variables: Record<string, Variable> = {
	notesCount: {
		description: 'ノート数',
		replace: (score) => String(score.notesCount),
	},
	followingCount: {
		description: 'フォロー数',
		replace: (score) => String(score.followingCount),
	},
	followersCount: {
		description: 'フォロワー数',
		replace: (score) => String(score.followersCount),
	},
	notesDelta: {
		description: '昨日とのノート数の差',
		replace: (score) => String(score.notesDelta),
	},
	followingDelta: {
		description: '昨日とのフォロー数の差',
		replace: (score) => String(score.followingDelta),
	},
	followersDelta: {
		description: '昨日とのフォロワー数の差',
		replace: (score) => String(score.followersDelta),
	},
	url: {
		description: 'みす廃アラートのURL',
		replace: config.url,
	},
	username: {
		description: 'ユーザー名',
		replace: (_, user) => String(user.username),
	},
	host: {
		description: '所属するインスタンスのホスト名',
		replace: (_, user) => String(user.host),
	},
	rating: {
		description: 'みす廃レート',
		replace: (_, user) => String(user.rating),
	},
};

const variableRegex = /\{([a-zA-Z0-9_]+?)\}/g;

export const format = (score: Score, user: User): string => {
	const template = user.template || defaultTemplate;
	return template.replace(variableRegex, (m, name) => {
		const v = variables[name];
		return !v || !v.replace ? m : typeof v.replace === 'function' ? v.replace(score, user) : v.replace;
	}) + '\n\n#misshaialert';
};
