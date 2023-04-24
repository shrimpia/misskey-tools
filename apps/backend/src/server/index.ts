import { fastify, FastifyPluginCallback } from 'fastify';
import fastifyView from '@fastify/view';
import pug from 'pug';
import path from 'path';
import url from 'url';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { config, meta } from '@/config.js';
import { appRouter } from '@/server/api/index.js';
import { authMisskeyController } from '@/server/controllers/auth-misskey.js';
import { callbackMiauthController } from '@/server/controllers/callback-miauth.js';
import { callbackLegacyAuthController } from '@/server/controllers/callback-legacy-auth.js';
import { announcementsController } from '@/server/controllers/announcements.js';
import { rescueController } from '@/server/controllers/rescue.js';
import { frontendController } from '@/server/controllers/frontend.js';
import { createContext } from '@/server/api/trpc.js';

export const startServer = async () => {
  const app = fastify();
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

  await app.register(fastifyView, {
    root: __dirname + '/../public/views',
    engine: { pug },
    defaultContext: { version: meta.version },
  });

  await app.register(fastifyTRPCPlugin, {
    prefix: '/api',
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });

  app.get('/login', authMisskeyController);
  app.get('/miauth', callbackMiauthController);
  app.get('/legacy-auth', callbackLegacyAuthController);
  app.get('/announcements/:id', announcementsController);
  app.get('/__rescue__', rescueController);
  app.get('/vite/*', viteController);
  app.get('/*', frontendController);

  await app.listen(config.port || 3000);
};

