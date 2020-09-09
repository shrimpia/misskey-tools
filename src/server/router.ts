import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import axios from 'axios';
import crypto from 'crypto';

import { die } from './die';
import { v4 as uuid } from 'uuid';
import { config } from '../config';
import { upsertUser, getUser, getUserCount, updateUser, updateUsersMisshaiToken, getUserByMisshaiToken, deleteUser } from '../functions/users';
import { api, apiAvailable } from '../services/misskey';
import { getScores } from '../functions/get-scores';
import { AlertMode, alertModes } from '../types/AlertMode';
import { Users } from '../models';

export const router = new Router<DefaultState, Context>();

const sessionHostCache: Record<string, string> = { };
const tokenSecretCache: Record<string, string> = { };

const welcomeMessage = [
	'ついついノートしすぎていませんか？',
	'Misskey, しすぎていませんか？',
	'今日、何ノート書いた？',
	'10000 ノートは初心者、そう思っていませんか？',
	'息するように Misskey、そんなあなたへ。',
	'あなたは真の Misskey 廃人ですか？'
];

const login = async (ctx: Context, user: Record<string, unknown>, host: string, token: string) => {
	await upsertUser(user.username as string, host, token);

	const u = await getUser(user.username as string, host);

	if (!u) {
		await die(ctx);
		return;
	}

	await updateUser(u.username, u.host, {
		prevNotesCount: user.notesCount as number,
		prevFollowingCount: user.followingCount as number,
		prevFollowersCount: user.followersCount as number,
	});

	const misshaiToken = await updateUsersMisshaiToken(u);

	ctx.cookies.set('token', misshaiToken, { signed: true });

	// await ctx.render('logined', { user: u });
	ctx.redirect('/');
};

router.get('/', async ctx => {
	const token = ctx.cookies.get('token', { signed: true });
	const user = token ? await getUserByMisshaiToken(token) : undefined;
	
	const isAvailable = user && await apiAvailable(user.host, user.token);
	console.log(isAvailable);
	if (user && isAvailable) {
		await ctx.render('mypage', {
			user,
			usersCount: await getUserCount(),
			score: await getScores(user),
		});
	} else {
		// 非ログイン
		await ctx.render('welcome', {
			usersCount: await getUserCount(),
			welcomeMessage:  welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)],
		});
	}
});

router.get('/login', async ctx => {
	let host = ctx.query.host as string | undefined;

	if (!host) { 
		await die(ctx, 'ホストを空欄にしてはいけない');
		return;
	}
	const meta = await api<{ name: string, uri: string, features: Record<string, boolean | undefined> }>(host, 'meta', {});

	// ホスト名の正規化
	host = meta.uri.replace(/^https?:\/\//, '');
	const name = 'みす廃あらーと';
	const description = 'ついついノートしすぎていませんか？';
	const permission = [ 'write:notes', 'write:notifications' ];

	if (meta.features.miauth) {
		// Use MiAuth
		const callback = encodeURI(`${config.url}/miauth`);

		const session = uuid();
		const url = `https://${host}/miauth/${session}?name=${encodeURI(name)}&callback=${encodeURI(callback)}&permission=${encodeURI(permission.join(','))}`;
		sessionHostCache[session] = host;
	
		ctx.redirect(url);
	} else {
		// Use legacy authentication
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

router.get('/logout', async ctx => {
	const token = ctx.cookies.get('token');
	if (!token) {
		await die(ctx, 'ログインしていません');
		return;	
	}
	ctx.cookies.set('token', '');
	await ctx.render('welcome', {
		usersCount: await getUserCount(),
		welcomeMessage:  'ログアウトしました。',
	});
});

router.get('/optout', async ctx => {
	const token = ctx.cookies.get('token');
	if (!token) {
		await die(ctx, 'ログインしていません');
		return;	
	}
	ctx.cookies.set('token', '');

	const u = await getUserByMisshaiToken(token);

	if (!u) {
		await die(ctx);
		return;
	}

	await deleteUser(u.username, u.host);
	
	await ctx.render('welcome', {
		usersCount: await getUserCount(),
		welcomeMessage:  '連携を解除しました。',
	});
});

router.get('/terms', async ctx => {
	await ctx.render('term');
});

router.get('/about', async ctx => {
	await ctx.render('about');
});

router.get('/teapot', async ctx => {
	await die(ctx, 'I\'m a teapot', 418);
});

router.get('/miauth', async ctx => {
	const session = ctx.query.session as string | undefined;
	if (!session) {
		await die(ctx, 'session required');
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
		await die(ctx, 'token required');
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

	console.log(host);
	
	const { accessToken, user } = await api<{ accessToken: string, user: Record<string, unknown> }>(host, 'auth/session/userkey', {
		appSecret, token,
	});
	const i = crypto.createHash('sha256').update(accessToken + appSecret, 'utf8').digest('hex');

	await login(ctx, user, host, i);
});

router.post('/update-settings', async ctx => {
	const mode = ctx.request.body.alertMode as AlertMode;
	// 一応型チェック
	if (!alertModes.includes(mode)) {
		await die(ctx, `${mode} is an invalid value`);
		return;
	}

	const token = ctx.cookies.get('token');
	if (!token) {
		await die(ctx, 'ログインしていません');
		return;	
	}
	
	const u = await getUserByMisshaiToken(token);

	if (!u) {
		await die(ctx);
		return;
	}

	await Users.update(u.id, { alertMode: mode });

	ctx.redirect('/');
});


// Return 404 for other pages
router.all('(.*)', async ctx => {
	await die(ctx, 'ページが見つかりませんでした', 404);
});