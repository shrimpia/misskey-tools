import { config } from '../../config.js';
import { Score } from '../types/score.js';
import { defaultTemplate } from '../../backend/const.js';
import { IUser } from '../types/user.js';
import { createGacha } from './create-gacha.js';
import {Count} from '../../backend/models/count.js';
import {getDelta} from '../../backend/functions/get-scores.js';

/**
 * 埋め込み変数の型
 */
export type Variable = string | ((score: Score, user: IUser) => string);

/**
 * 埋め込み可能な変数のリスト
 */
export const variables: Record<string, Variable> = {
  notesCount: score => String(score.notesCount),
  followingCount: score => String(score.followingCount),
  followersCount: score => String(score.followersCount),
  notesDelta: score => String(score.notesDelta),
  followingDelta: score => String(score.followingDelta),
  followersDelta: score => String(score.followersDelta),
  url: config.url,
  username: (_, user) => String(user.username),
  host: (_, user) => String(user.host),
  rating: (_, user) => String(user.rating),
  gacha: () => createGacha(),
};

const variableRegex = /\{([a-zA-Z0-9_]+?)}/g;

/**
 * スコア情報とユーザー情報からテキストを生成する
 * @param user ユーザー情報
 * @param count カウント
 * @returns 生成したテキスト
 */
export const format = (user: IUser, count: Count): string => {
  const score: Score = {
    ...count,
    ...getDelta(user, count),
  };
  const template = user.template || defaultTemplate;
  return template.replace(variableRegex, (m, name) => {
    const v = variables[name];
    return !v ? m : typeof v === 'function' ? v(score, user) : v;
  }) + '\n\n#misshaialert';
};
