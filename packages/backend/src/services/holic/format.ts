import { defaultTemplate } from 'tools-shared/dist/const.js';
import { createGacha } from 'tools-shared/dist/functions/create-gacha.js';

import type { HolicAccount, HolicRecord, MisskeySession } from '@prisma/client';

import { config } from '@/config.js';

export type VariableParameter = {
	today: HolicRecord;
	yesterday: HolicRecord;
	session: MisskeySession;
	account: HolicAccount;
};

/**
 * 埋め込み変数の型
 */
export type Variable = string | ((p: VariableParameter) => string);

/**
 * 埋め込み可能な変数のリスト
 */
export const variables: Record<string, Variable> = {
  notesCount: ({ today }) => String(today.notesCount),
  followingCount: ({ today }) => String(today.followingCount),
  followersCount: ({ today }) => String(today.followersCount),
  notesDelta: ({ today, yesterday }) => String(today.notesCount - yesterday.notesCount),
  followingDelta: ({ today, yesterday }) => String(today.followingCount - yesterday.followingCount),
  followersDelta: ({ today, yesterday }) => String(today.followersCount - yesterday.followersCount),
  rating: ({ today }) => String(today.rating),
  ratingDelta: ({ today, yesterday }) => String(today.rating - yesterday.rating),
  url: config.url,
  username: ({ session }) => String(session.host),
  host: ({ session }) => String(session.host),
  gacha: () => createGacha(),
};

const variableRegex = /\{([a-zA-Z0-9_]+?)}/g;

/**
 * アラート用のテキストを生成する
 * @param record ミス廃レコード
 * @param account ミス廃アカウント
 * @returns 生成したテキスト
 */
export const format = (p: VariableParameter): string => {
  const template = p.account.template || defaultTemplate;
  return template.replace(variableRegex, (m, name) => {
    const v = variables[name];
    return !v ? m : typeof v === 'function' ? v(p) : v;
  }) + '\n\n#missholic';
};
