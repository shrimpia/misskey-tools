import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mount from 'koa-mount';
import { createKoaServer } from 'routing-controllers';

import constant from './const';
import { config } from './config';
import controllers from './controllers';

import 'reflect-metadata';

export default (): void => {
	const app = createKoaServer({
		controllers,
		routePrefix: '/api/v1',
	});

	console.log('Misshaialert v' + constant.version);

	console.log('Initializing DB connection...');

	app.use(bodyParser());
	app.use(mount('/assets', serve(__dirname + '/../assets')));

	app.keys = [ '人類', 'ミス廃化', '計画', 'ここに極まれり', 'ﾌｯﾌｯﾌ...' ];

	console.log(`listening port ${config.port}...`);
	console.log('App launched!');

	app.listen(config.port || 3000);
};