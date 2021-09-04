import { User } from '../models/entities/user';
import { Users } from '../models';
import { DeepPartial } from 'typeorm';
import { genToken } from './gen-token';

/**
 * ユーザーを取得します
 * @param username ユーザー名
 * @param host ホスト名
 * @returns ユーザー
 */
export const getUser = (username: string, host: string): Promise<User | undefined> => {
	return Users.findOne({ username, host });
};

/**
 * ユーザーのミス廃トークンを更新します。
 * @param user ユーザー
 * @returns ミス廃トークン
 */
export const updateUsersMisshaiToken = async (user: User | User['id']): Promise<string> => {
	const u = typeof user === 'number'
		? user
		: user.id;

	const misshaiToken = await genToken();
	Users.update(u, { misshaiToken });
	return misshaiToken;
};

/**
 * ミス廃トークンからユーザーを取得します。
 * @param token ミス廃トークン
 * @returns ユーザー
 */
export const getUserByMisshaiToken = (token: string): Promise<User | undefined> => {
	return Users.findOne({ misshaiToken: token });
};

/**
 * ユーザー情報を更新するか新規作成します。
 * @param username ユーザー名
 * @param host ホスト名
 * @param token トークン
 */
export const upsertUser = async (username: string, host: string, token: string): Promise<void> => {
	const u = await getUser(username, host);
	if (u) {
		await Users.update(u.id, { token });
	} else {
		await Users.insert({ username, host, token });
	}
};

/**
 * ユーザー情報を更新します。
 * @param username ユーザー名
 * @param host ホスト名
 * @param record 既存のユーザー情報
 */
export const updateUser = async (username: string, host: string, record: DeepPartial<User>): Promise<void> => {
	await Users.update({ username, host }, record);
};

/**
 * 指定したユーザーを削除します。
 * @param username ユーザー名
 * @param host ホスト名
 */
export const deleteUser = async (username: string, host: string): Promise<void> => {
	await Users.delete({ username, host });
};

/**
 * ユーザー数を取得します。
 * @returns ユーザー数
 */
export const getUserCount = (): Promise<number> => {
	return Users.count();
};
