import { User } from '../models/entities/user';
import { Users } from '../models';
import { DeepPartial } from 'typeorm';
import { genToken } from './gen-token';
import { IUser } from '../../common/types/user';
import { config } from '../../config';
import { currentTokenVersion } from '../const';

/**
 * IUser インターフェイスに変換します。
 */
const packUser = (user: User | undefined): IUser | undefined => {
	if (!user) return undefined;
	const { username: adminName, host: adminHost } = config.admin;

	return {
		...user,
		isAdmin: adminName === user.username && adminHost === user.host,
	};
};

/**
 * ユーザーを取得します
 * @param username ユーザー名
 * @param host ホスト名
 * @returns ユーザー
 */
export const getUser = (username: string, host: string): Promise<IUser | undefined> => {
	return Users.findOne({ username, host }).then(packUser);
};

/**
 * ユーザーのミス廃トークンを更新します。
 * @param user ユーザー
 * @returns ミス廃トークン
 */
export const updateUsersToolsToken = async (user: User | User['id']): Promise<string> => {
	const id = typeof user === 'number'
		? user
		: user.id;

	const misshaiToken = await genToken();
	Users.update(id, { misshaiToken });
	return misshaiToken;
};

/**
 * ミス廃トークンからユーザーを取得します。
 * @param token ミス廃トークン
 * @returns ユーザー
 */
export const getUserByToolsToken = (token: string): Promise<IUser | undefined> => {
	return Users.findOne({ misshaiToken: token }).then(packUser);
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
		await Users.update(u.id, { token, tokenVersion: currentTokenVersion });
	} else {
		const result = await Users.save({ username, host, token, tokenVersion: currentTokenVersion });
		await updateUsersToolsToken(result.id);
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
