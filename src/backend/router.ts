import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import axios from 'axios';
import crypto from 'crypto';
import koaSend from 'koa-send';
import { v4 as uuid } from 'uuid';
import ms from 'ms';
import striptags from 'striptags';
import MarkdownIt from 'markdown-it';

import { config } from '../config';
import { upsertUser, getUser, updateUser } from './functions/users';
import { api } from './services/misskey';
import { die } from './die';
import { misskeyAppInfo } from './const';
import { Announcements } from './models';

export const router = new Router<DefaultState, Context>();

const sessionHostCache: Record<string, string> = {};
const tokenSecretCache: Record<string, string> = {};

const md = new MarkdownIt();

router.get('/login', async ctx => {
	let host = ctx.query.host as string | undefined;
	if (!host) {
		await die(ctx, 'invalidParamater');
		return;
	}

	// http://, https://を潰す
	host = host.trim().replace(/^https?:\/\//g, '').replace(/\/+/g, '');

	const meta = await api<{ name: string, uri: string, version: string, features: Record<string, boolean | undefined> }>(host, 'meta', {}).catch(async e => {
		if (!(e instanceof Error && e.name === 'Error')) throw e;
		await die(ctx, 'hostNotFound');
	});

	// NOTE: catchが呼ばれた場合はvoidとなるためundefinedのはず
	if (typeof meta === 'undefined') return;

	if (typeof meta !== 'object') {
		await die(ctx, 'other');
		return;
	}

	if (meta.version.includes('hitori')) {
		await die(ctx, 'hitorisskeyIsDenied');
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
		console.error('host is null or undefined');
		return;
	}

	const url = `https://${host}/api/miauth/${session}/check`;
	const { token, user } = (await axios.post(url)).data;

	if (!token || !user) {
		await die(ctx);
		if (!token) console.error('token is null or undefined');
		if (!user) console.error('user is null or undefined');
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

router.get('/announcements/:id', async (ctx) => {
	const a = await Announcements.findOne(ctx.params.id);
	const stripped = striptags(md.render(a?.body ?? '').replace(/\n/g, ' '));
	await ctx.render('frontend', a ? {
		t: a.title,
		d: stripped.length > 80 ? stripped.substring(0, 80) + '…' : stripped,
	} : null);
});

router.get('/__rescue__', async(ctx) => {
	await ctx.render('rescue');
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

	await ctx.render('frontend', { token: u.misshaiToken });
}
