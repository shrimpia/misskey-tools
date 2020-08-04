import { initDb } from './db';

(async () => {
	await initDb();
	(await import('./server')).default();
})();