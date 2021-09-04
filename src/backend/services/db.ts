import { getConnection, createConnection, Connection } from 'typeorm';
import { config } from '../../config';
import { User } from '../models/entities/user';
import { UsedToken } from '../models/entities/used-token';

export const entities = [
	User,
	UsedToken,
];

/**
 * データベース接続が既に存在すれば取得し、なければ新規作成する
 * @param force 既存の接続があっても新規作成するかどうか
 * @returns 取得または作成したDBコネクション
 */
export const initDb = async (force = false): Promise<Connection> => {
	// forceがtrueでない限り、既に接続が存在する場合はそれを返す
	if (!force) {
		try {
			const conn = getConnection();
			return Promise.resolve(conn);
		} catch (e) {
			// noop
			console.warn('connection is not found, so create');
		}
	}

	// 接続がないか、forceがtrueの場合は新規作成する
	return createConnection({
		type: 'postgres',
		host: config.db.host,
		port: config.db.port,
		username: config.db.user,
		password: config.db.pass,
		database: config.db.db,
		extra: config.db.extra,
		entities,
	});
};
