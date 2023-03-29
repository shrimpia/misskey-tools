import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {Action, useKoaServer} from 'routing-controllers';

import {config, meta} from './config.js';
import {render} from './render.js';
import {router} from './router.js';
import controllers from './controllers/index.js';

import 'reflect-metadata';
import {getUserByToolsToken} from './repositories/get-user-by-tools-token.js';

export default (): void => {
  const app = new Koa();

  console.log(`** Misskey Tools ${meta.version} **`);
  console.log('(C) Shrimpia Network');

  app.use(render);
  app.use(bodyParser());

  useKoaServer(app, {
    controllers,
    routePrefix: '/api/v1',
    classTransformer: true,
    validation: true,
    currentUserChecker: async ({ request }: Action) => {
      const { authorization } = request.header;
      if (!authorization || !authorization.startsWith('Bearer ')) return null;

      const token = authorization.split(' ')[1].trim();
      return await getUserByToolsToken(token);
    },
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log('GET READY!');
  console.log(`Server URL >> ${config.url}`);

  app.listen(config.port || 3000);
};
