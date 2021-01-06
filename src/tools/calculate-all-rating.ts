import { initDb } from '../services/db';
import 'reflect-metadata';

(async () => {
	await initDb();
	(await import('./calculate-all-rating.worker')).default();
})();