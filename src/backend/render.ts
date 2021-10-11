import views from 'koa-views';

import constant from './const';

export const render = views(__dirname + '/views', {
	extension: 'pug', options: {
		...constant,
	}
});
