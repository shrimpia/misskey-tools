import views from 'koa-views';
import path from 'path';
import url from 'url';

import { meta } from './config.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const render = views(__dirname + '/../public/views', {
  extension: 'pug',
  options: { version: meta.version },
});
