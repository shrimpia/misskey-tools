import axios from 'axios';
import dotenv from 'dotenv';

import { config } from '@/config.js';

export type { AppRouter } from '@/server/api/index.js';

dotenv.config();

export const ua = `Mozilla/5.0 MisskeyTools +https://github.com/shrimpia/misskey-tools Node/${process.version} ${config.uaExtra ?? ''}`;

axios.defaults.headers['User-Agent'] = ua;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.validateStatus = (stat) => stat < 500;

(async () => {
  await import('@/boot/server.js').then(server => server.default());
})();
