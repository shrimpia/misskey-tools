import { FastifyPluginCallback, FastifyReply } from 'fastify';
import axios from 'axios';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import striptags from 'striptags';
import MarkdownIt from 'markdown-it';
import { misskeyAppInfo } from 'tools-shared/dist/const.js';

import { config } from '@/config.js';
import { die } from '@/server/die.js';
import { api } from '@/libs/misskey.js';
import {prisma} from '@/libs/prisma.js';
import { getUser } from '@/services/users/get-user.js';
import {upsertUser} from '@/services/users/upsert-user.js';
import {updateUser} from '@/services/users/update-user.js';

export const router: FastifyPluginCallback = (fastify, opts, done) => {
	const md = new MarkdownIt();
	const sessionHostCache: Record<string, string> = {};
	const tokenSecretCache: Record<string, string> = {};

	fastify.get<{Querystring: {host: string}}>('/login', async (req, reply) => {
		let host = req.query.host;
		if (!host) {
			await die(reply, 'invalidParamater');
			return;
		}

		// http://, https://を潰す
		host = host.trim().replace(/^https?:\/\//g, '').replace(/\/+/g, '');

		const meta = await api<{ name: string, uri: string, version: string, features: Record<string, boolean | undefined> }>(host, 'meta', {}).catch(async e => {
			if (!(e instanceof Error && e.name === 'Error')) throw e;
			await die(reply, 'hostNotFound');
		});

		// NOTE: catchが呼ばれた場合はvoidとなるためundefinedのはず
		if (typeof meta === 'undefined') return;

		if (typeof meta !== 'object') {
			await die(reply, 'other');
			return;
		}

		if (meta.version.includes('hitori')) {
			await die(reply, 'hitorisskeyIsDenied');
			return;
		}

		// NOTE:
		//   環境によってはアクセスしたドメインとMisskeyにおけるhostが異なるケースがある
		//   そういったインスタンスにおいてアカウントの不整合が生じるため、
		//   APIから戻ってきたホスト名を正しいものとして、改めて正規化する
		host = meta.uri.replace(/^https?:\/\//g, '').replace(/\/+/g, '').trim();

		const { name, permission, description } = misskeyAppInfo;

		if (meta.features.miauth) {
			// MiAuthを使用する
			const callback = encodeURI(`${config.url}/miauth`);

			const session = uuid();
			const url = `https://${host}/miauth/${session}?name=${encodeURI(name)}&callback=${encodeURI(callback)}&permission=${encodeURI(permission.join(','))}`;
			sessionHostCache[session] = host;

			reply.redirect(url);
		} else {
			// 旧型認証を使用する
			const callbackUrl = encodeURI(`${config.url}/legacy-auth`);

			const { secret } = await api<{ secret: string }>(host, 'app/create', {
				name, description, permission, callbackUrl,
			});

			const { token, url } = await api<{ token: string, url: string }>(host, 'auth/session/generate', {
				appSecret: secret
			});

			sessionHostCache[token] = host;
			tokenSecretCache[token] = secret;

			reply.redirect(url);
		}
	});

	fastify.get('/teapot', async (_, reply) => {
		await die(reply, 'teapot', 418);
	});

	fastify.get<{Querystring: {session: string}}>('/miauth', async (req, reply) => {
		const session = req.query.session as string | undefined;
		if (!session) {
			await die(reply, 'sessionRequired');
			return;
		}
		const host = sessionHostCache[session];
		delete sessionHostCache[session];
		if (!host) {
			await die(reply);
			console.error('host is null or undefined');
			return;
		}

		const url = `https://${host}/api/miauth/${session}/check`;
		const res = await axios.post(url, {});
		const { token, user } = res.data;

		if (!token || !user) {
			await die(reply);
			if (!token) console.error('token is null or undefined');
			if (!user) console.error('user is null or undefined');
			return;
		}

		await login(reply, user, host, token);

	});

	fastify.get<{Querystring: {token: string}}>('/legacy-auth', async (req, reply) => {
		const token = req.query.token as string | undefined;
		if (!token) {
			await die(reply, 'tokenRequired');
			return;
		}
		const host = sessionHostCache[token];
		delete sessionHostCache[token];
		if (!host) {
			await die(reply);
			return;
		}
		const appSecret = tokenSecretCache[token];
		delete tokenSecretCache[token];
		if (!appSecret) {
			await die(reply);
			return;
		}

		const { accessToken, user } = await api<{ accessToken: string, user: Record<string, unknown> }>(host, 'auth/session/userkey', {
			appSecret, token,
		});
		const i = crypto.createHash('sha256').update(accessToken + appSecret, 'utf8').digest('hex');

		await login(reply, user, host, i);
	});

	// fastify.get('/api(.*)', async (req, reply) => {

	// });

	fastify.get<{Params: {id: string}}>('/announcements/:id', async (req, reply) => {
		const a = await prisma.announcement.findUnique({ where: {id: Number(req.params.id)} });
		const stripped = striptags(md.render(a?.body ?? '').replace(/\n/g, ' '));
		await reply.view('frontend', a ? {
			t: a.title,
			d: stripped.length > 80 ? stripped.substring(0, 80) + '…' : stripped,
		} : {});
	});

	fastify.get('/__rescue__', async (_, reply) => {
		await reply.view('rescue');
	});

	fastify.get('/*', async (_, reply) => {
		await reply.view('frontend');
	});

	async function login(reply: FastifyReply, user: Record<string, unknown>, host: string, token: string) {
		const isNewcomer = !(await getUser(user.username as string, host));
		await upsertUser(user.username as string, host, token);

		const u = await getUser(user.username as string, host);

		if (!u) {
			await die(reply);
			return;
		}

		if (isNewcomer) {
			await updateUser(u.username, u.host, {
				prevNotesCount: user.notesCount as number ?? 0,
				prevFollowingCount: user.followingCount as number ?? 0,
				prevFollowersCount: user.followersCount as number ?? 0,
			});
		}

		await reply.view('frontend', { token: u.misshaiToken });
	}

	done();
};
