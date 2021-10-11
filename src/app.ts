import { initDb } from './backend/services/db';
import 'reflect-metadata';

(async () => {
	await initDb();
	(await import('./backend/services/worker')).default();
	(await import('./backend/server')).default();
})();
