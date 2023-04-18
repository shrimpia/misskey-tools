import { FastifyPluginCallback } from 'fastify';

import { loginController } from './controllers/login.js';
import { miauthController } from './controllers/miauth.js';
import { legacyAuthController } from './controllers/legacy-auth.js';
import { announcementsController } from './controllers/announcements.js';
import { rescueController } from './controllers/rescue.js';
import { frontendController } from './controllers/frontend.js';

export const router: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.get('/login', loginController);
	fastify.get('/miauth', miauthController);
	fastify.get('/legacy-auth', legacyAuthController);
	fastify.get('/announcements/:id', announcementsController);
	fastify.get('/__rescue__', rescueController);
	fastify.get('/*', frontendController);

	done();
};
