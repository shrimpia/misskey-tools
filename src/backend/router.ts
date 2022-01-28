import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import axios from 'axios';
import crypto from 'crypto';
import koaSend from 'koa-send';
import { v4 as uuid } from 'uuid';
import ms from 'ms';

import { config } from '../config';
import { upsertUser, getUser, updateUser, updateUsersToolsToken } from './functions/users';
import { api } from './services/misskey';
import { die } from './die';
import { misskeyAppInfo } from './const';

export const router = new Router<DefaultState, Context>();

const sessionHostCache: Record<string, string> = {};
const tokenSecretCache: Record<string, string> = {};

router.get('/login', async ctx => {
	let host = ctx.query.host as string | undefined;
	if (!host) {
		await die(ctx, 'invalidParamater');
		return;
	}

	const meta = await api<{ name: string, uri: string, version: string, features: Record<string, boolean | undefined> }>(host, 'meta', {});
	if (typeof meta !== 'object') {
		await die(ctx, 'other');
		return;
	}

	if (meta.version.includes('hitori')) {
		await die(ctx, 'hitorisskeyIsDenied');
		return;
	}

	// ホスト名の正規化
	host = meta.uri.replace(/^https?:\/\//, '');

	const { name, permission, description } = misskeyAppInfo;

	if (meta.features.miauth) {
		// MiAuthを使用する
		const callback = encodeURI(`${config.url}/miauth`);

		const session = uuid();
		const url = `https://${host}/miauth/${session}?name=${encodeURI(name)}&callback=${encodeURI(callback)}&permission=${encodeURI(permission.join(','))}`;
		sessionHostCache[session] = host;

		ctx.redirect(url);
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

		ctx.redirect(url);
	}
});

router.get('/teapot', async ctx => {
	await die(ctx, 'teapot', 418);
});

router.get('/miauth', async ctx => {
	const session = ctx.query.session as string | undefined;
	if (!session) {
		await die(ctx, 'sessionRequired');
		return;
	}
	const host = sessionHostCache[session];
	delete sessionHostCache[session];
	if (!host) {
		await die(ctx);
		return;
	}

	const url = `https://${host}/api/miauth/${session}/check`;
	const { token, user } = (await axios.post(url)).data;

	if (!token || !user) {
		await die(ctx);
		return;
	}

	await login(ctx, user, host, token);

});

router.get('/legacy-auth', async ctx => {
	const token = ctx.query.token as string | undefined;
	if (!token) {
		await die(ctx, 'tokenRequired');
		return;
	}
	const host = sessionHostCache[token];
	delete sessionHostCache[token];
	if (!host) {
		await die(ctx);
		return;
	}
	const appSecret = tokenSecretCache[token];
	delete tokenSecretCache[token];
	if (!appSecret) {
		await die(ctx);
		return;
	}

	const { accessToken, user } = await api<{ accessToken: string, user: Record<string, unknown> }>(host, 'auth/session/userkey', {
		appSecret, token,
	});
	const i = crypto.createHash('sha256').update(accessToken + appSecret, 'utf8').digest('hex');

	await login(ctx, user, host, i);
});

router.get('/assets/(.*)', async ctx => {
	await koaSend(ctx as any, ctx.path.replace('/assets/', ''), {
		root: `${__dirname}/../assets/`,
		maxage: process.env.NODE_ENV !== 'production' ? 0 : ms('7 days'),
	});
});

router.get('/api(.*)', async (ctx, next) => {
	next();
});

router.get('(.*)', async (ctx) => {
	await ctx.render('frontend');
});

async function login(ctx: Context, user: Record<string, unknown>, host: string, token: string) {
	const isNewcomer = !(await getUser(user.username as string, host));
	await upsertUser(user.username as string, host, token);

	const u = await getUser(user.username as string, host);

	if (!u) {
		await die(ctx);
		return;
	}

	if (isNewcomer) {
		await updateUser(u.username, u.host, {
			prevNotesCount: user.notesCount as number ?? 0,
			prevFollowingCount: user.followingCount as number ?? 0,
			prevFollowersCount: user.followersCount as number ?? 0,
		});
	}

	const toolsToken = await updateUsersToolsToken(u);

	await ctx.render('frontend', { token: toolsToken });
}
