import { initDb } from './services/db';
import 'reflect-metadata';

(async () => {
	await initDb();
	(await import('./services/worker')).default();
	(await import('./server')).default();
})();