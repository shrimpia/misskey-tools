import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { Action, useKoaServer } from 'routing-controllers';

import constant from './const';
import { config } from '../config';
import { render } from './render';
import { router } from './router';
import { getUserByMisshaiToken } from './functions/users';

import 'reflect-metadata';

export default (): void => {
	const app = new Koa();

	console.log('Misshaialert v' + constant.version);

	console.log('Initializing DB connection...');

	app.use(render);
	app.use(bodyParser());

	useKoaServer(app, {
		controllers: [__dirname + '/controllers/**/*{.ts,.js}'],
		routePrefix: '/api/v1',
		classTransformer: true,
		validation: true,
		currentUserChecker: async ({ request }: Action) => {
			const { authorization } = request.header;
			if (!authorization || !authorization.startsWith('Bearer ')) return null;

			const token = authorization.split(' ')[1].trim();
			const user = await getUserByMisshaiToken(token);
			return user;
		},
	});

	app.use(router.routes());
	app.use(router.allowedMethods());

	app.keys = ['人類', 'ミス廃化', '計画', 'ここに極まれり', 'ﾌｯﾌｯﾌ...'];

	console.log(`listening port ${config.port}...`);
	console.log('App launched!');

	app.listen(config.port || 3000);
};
