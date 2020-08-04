import { initDb } from './db';

(async () => {
	await initDb();
	(await import('./worker')).default();
	(await import('./server')).default();
})();