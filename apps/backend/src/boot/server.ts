import 'reflect-metadata';

import fastify from 'fastify';
import fastifyView from '@fastify/view';
import pug from 'pug';
import path from 'path';
import url from 'url';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import {config, meta} from '@/config.js';
import {router} from '@/server/router.js';
import { appRouter } from '@/server/api/index.js';

export default (): void => {
  const app = fastify();

  console.log(`** Misskey Tools ${meta.version} **`);
  console.log('(C) Shrimpia Network');

	const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
	app.register(fastifyView, {
		root: __dirname + '/../public/views',
		engine: { pug },
		defaultContext: { version: meta.version },
	})

	app.register(fastifyTRPCPlugin, {
		prefix: '/api',
		trpcOptions: { router: appRouter },
	})

	app.register(router);

  console.log('GET READY!');
  console.log(`Server URL >> ${config.url}`);

  app.listen(config.port || 3000);
};
