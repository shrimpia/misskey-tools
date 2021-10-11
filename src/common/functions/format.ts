import { config } from '../../config';
import { Score } from '../types/score';
import { defaultTemplate } from '../../backend/const';
import { IUser } from '../types/user';

/**
 * 埋め込み変数の型
 */
export type Variable = {
	replace?: string | ((score: Score, user: IUser) => string);
};

/**
 * 埋め込み可能な変数のリスト
 */
export const variables: Record<string, Variable> = {
	notesCount: {
		replace: (score) => String(score.notesCount),
	},
	followingCount: {
		replace: (score) => String(score.followingCount),
	},
	followersCount: {
		replace: (score) => String(score.followersCount),
	},
	notesDelta: {
		replace: (score) => String(score.notesDelta),
	},
	followingDelta: {
		replace: (score) => String(score.followingDelta),
	},
	followersDelta: {
		replace: (score) => String(score.followersDelta),
	},
	url: {
		replace: config.url,
	},
	username: {
		replace: (_, user) => String(user.username),
	},
	host: {
		replace: (_, user) => String(user.host),
	},
	rating: {
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
export const format = (score: Score, user: IUser): string => {
	const template = user.template || defaultTemplate;
	return template.replace(variableRegex, (m, name) => {
		const v = variables[name];
		return !v || !v.replace ? m : typeof v.replace === 'function' ? v.replace(score, user) : v.replace;
	}) + '\n\n#misshaialert';
};
