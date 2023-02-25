import 'reflect-metadata';

import axios from 'axios';

import { initDb } from './backend/services/db.js';
import { ua } from './backend/services/misskey.js';

axios.defaults.headers['User-Agent'] = ua;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.validateStatus = (stat) => stat < 500;

(async () => {
  await initDb();
  (await import('./backend/services/worker.js')).default();
  (await import('./backend/server.js')).default();
})();
