import { config } from '../../config';
import { User } from '../models/entities/user';
import { Score } from '../../common/types/score';
import { defaultTemplate } from '../../common/default-template';

/**
 * 埋め込み変数の型
 */
export type Variable = {
	description?: string;
	replace?: string | ((score: Score, user: User) => string);
};

/**
 * 埋め込み可能な変数のリスト
 */
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

/**
 * スコア情報とユーザー情報からテキストを生成する
 * @param score スコア情報
 * @param user ユーザー情報
 * @returns 生成したテキスト
 */
export const format = (score: Score, user: User): string => {
	const template = user.template || defaultTemplate;
	return template.replace(variableRegex, (m, name) => {
		const v = variables[name];
		return !v || !v.replace ? m : typeof v.replace === 'function' ? v.replace(score, user) : v.replace;
	}) + '\n\n#misshaialert';
};
