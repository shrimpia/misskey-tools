import { FastifyPluginCallback } from 'fastify';

import { authMisskeyController } from './controllers/auth-misskey.js';
import { callbackMiauthController } from './controllers/callback-miauth.js';
import { callbackLegacyAuthController } from './controllers/callback-legacy-auth.js';
import { announcementsController } from './controllers/announcements.js';
import { rescueController } from './controllers/rescue.js';
import { frontendController } from './controllers/frontend.js';

export const router: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.get('/login', authMisskeyController);
	fastify.get('/miauth', callbackMiauthController);
	fastify.get('/legacy-auth', callbackLegacyAuthController);
	fastify.get('/announcements/:id', announcementsController);
	fastify.get('/__rescue__', rescueController);
	fastify.get('/*', frontendController);

	done();
};
