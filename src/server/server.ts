import 'reflect-metadata';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mount from 'koa-mount';

import constant from '../const';
import { router } from './router';
import { render } from './render';
import { config } from '../config';

export default (): void => {
	const app = new Koa();

	console.log('Misshaialert v' + constant.version);

	console.log('Initializing DB connection...');


	app.use(bodyParser());
	app.use(render);
	app.use(mount('/assets', serve(__dirname + '/../assets')));
	app.use(router.routes());

	app.keys = [ '人類', 'ミス廃化', '計画', 'ここに極まれり', 'ﾌｯﾌｯﾌ...' ];

	console.log(`listening port ${config.port}...`);
	console.log('App launched!');

	app.listen(config.port || 3000);
};