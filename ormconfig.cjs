const fs = require('fs');

const entities = require('./built/backend/services/db').entities;

const config = Object.freeze(JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8')));

module.exports = {
	type: 'postgres',
	host: config.db.host,
	port: config.db.port,
	username: config.db.user,
	password: config.db.pass,
	database: config.db.db,
	extra: config.db.extra,
	entities: entities,
	migrations: ['migration/*.ts'],
	cli: {
		migrationsDir: 'migration'
	}
};
