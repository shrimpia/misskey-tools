import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import axios from 'axios';
import crypto from 'crypto';

import { die } from './die';
import { v4 as uuid } from 'uuid';
import { config } from './config';
import { upsertUser, getUser, getUserCount, updateUser } from './users';
import { api } from './misskey';

export const router = new Router<DefaultState, Context>();

const sessionHostCache: Record<string, string> = { };
const tokenSecretCache: Record<string, string> = { };
const ipAccessCount: Record<string, { time: number, count: number }> = {};

const freshIpAccessCount = (time: number) => {
	for (const ips of Object.keys(ipAccessCount)) {
		if (time - ipAccessCount[ips].time > 2000) {
			delete ipAccessCount[ips];
		}
	}
};

const welcomeMessage = [
	'ついついノートしすぎていませんか？',
	'Misskey, しすぎていませんか？',
	'今日、何ノート書いた？',
	'10000 ノートは初心者、そう思っていませんか？',
	'息するように Misskey、そんなあなたへ。',
	'あなたは真の Misskey 廃人ですか？'
];

const scoldingMessage = [
	'さてはリロードを繰り返しているな？',
	'何パターンあるか調べようとしてることはバレてんだぞ',
	'何度もリロードして楽しいかい？',
	'はいはいわかったから早うログインしな！',
	'君には他にやるべきことがあるんじゃないか？',
];

const login = async (ctx: Context, user: Record<string, unknown>, host: string, token: string) => {
	await upsertUser(user.username as string, host, token);
	const u = await getUser(user.username as string, host);

	if (!u) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
		return;
	}

	await updateUser(u.username, u.host, {
		prevNotesCount: user.notesCount as number,
		prevFollowingCount: user.followingCount as number,
		prevFollowersCount: user.followersCount as number,
	});

	await ctx.render('logined', { user: u });
};

router.get('/', async ctx => {
	const time = new Date().getTime();
	freshIpAccessCount(time);
	if (!ipAccessCount[ctx.ip]) {
		ipAccessCount[ctx.ip] = { count: 0, time };
	} else {
		ipAccessCount[ctx.ip] = { count: ipAccessCount[ctx.ip].count + 1, time };
	}
	await ctx.render('welcome', {
		usersCount: await getUserCount(),
		welcomeMessage: ipAccessCount[ctx.ip].count > 5 ? scoldingMessage[Math.floor(Math.random() * scoldingMessage.length)] : welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)],
	});
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
	const permission = [ 'write:notes' ];

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
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
		return;
	}

	const url = `https://${host}/api/miauth/${session}/check`;
	const { token, user } = (await axios.post(url)).data;

	if (!token || !user) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
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
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
		return;
	}
	const appSecret = tokenSecretCache[token];
	delete tokenSecretCache[token];
	if (!appSecret) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
		return;
	}

	console.log(host);
	
	const { accessToken, user } = await api<{ accessToken: string, user: Record<string, unknown> }>(host, 'auth/session/userkey', {
		appSecret, token,
	});
	const i = crypto.createHash('sha256').update(accessToken + appSecret, 'utf8').digest('hex');

	await login(ctx, user, host, i);
});


// Return 404 for other pages
router.all('(.*)', async ctx => {
	await die(ctx, 'ページが見つかりませんでした', 404);
});