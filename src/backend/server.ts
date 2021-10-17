import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { Action, useKoaServer } from 'routing-controllers';

import { config } from '../config';
import { render } from './render';
import { router } from './router';
import { getUserByToolsToken } from './functions/users';
import { version } from '../meta.json';

import 'reflect-metadata';

export default (): void => {
	const app = new Koa();

	console.log('Misskey Tools v' + version);

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
			const user = await getUserByToolsToken(token);
			return user;
		},
	});

	app.use(router.routes());
	app.use(router.allowedMethods());

	console.log(`listening port ${config.port}...`);
	console.log('App launched!');

	app.listen(config.port || 3000);
};
