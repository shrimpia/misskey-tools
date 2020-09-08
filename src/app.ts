import { initDb } from './services/db';

(async () => {
	await initDb();
	(await import('./services/worker')).default();
	(await import('./server/server')).default();
})();