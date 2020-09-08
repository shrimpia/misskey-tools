import { getConnection, createConnection, Connection } from 'typeorm';
import { config } from '../config';
import { User } from '../models/entities/user';
import { UsedToken } from '../models/entities/usedToken';

export const entities = [
	User,
	UsedToken,
];

export const initDb = async (force = false): Promise<Connection> => {
	if (!force) {
		try {
			const conn = getConnection();
			return Promise.resolve(conn);
		} catch (e) {
			// noop
			console.warn('connection is not fonud, so create');
		}
	}

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