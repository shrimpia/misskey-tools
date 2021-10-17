import views from 'koa-views';

export const render = views(__dirname + '/views', {
	extension: 'pug',
});
