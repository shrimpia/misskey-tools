import 'reflect-metadata';

import axios from 'axios';

import { initDb } from './backend/services/db';
import { ua } from './backend/services/misskey';

axios.defaults.headers['User-Agent'] = ua;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.validateStatus = (stat) => stat < 500;

(async () => {
	await initDb();
	(await import('./backend/services/worker')).default();
	(await import('./backend/server')).default();
})();
