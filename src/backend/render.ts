import views from 'koa-views';
import { version } from '../../package.json';

export const render = views(__dirname + '/views', {
	extension: 'pug',
	options: { version },
});
