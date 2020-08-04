import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import { die } from './die';
import { v4 as uuid } from 'uuid';
import { config } from './config';
import axios from 'axios';
import { upsertUser, getUser, getUserCount } from './users';

export const router = new Router<DefaultState, Context>();

export const sessionHostCache: Record<string, string> = { };

router.get('/', async ctx => {
	await ctx.render('welcome', {
		usersCount: await getUserCount(),
	});
});

router.get('/login', async ctx => {
	const host = ctx.query.host as string | undefined;
	if (!host) { 
		await die(ctx, 'ホストを空欄にしてはいけない');
		return;
	}
	const session = uuid();
	const name = encodeURI('みす廃あらーと');
	const permission = encodeURI('write:notes');
	const callback = encodeURI(`${config.url}/miauth`);
	const url = `https://${host}/miauth/${session}?name=${name}&callback=${callback}&permission=${permission}`;
	sessionHostCache[session] = host;

	ctx.redirect(url);
});

router.get('/miauth', async ctx => {
	const session = ctx.query.session as string | undefined;
	if (!session) {
		await die(ctx, 'セッションが見つからなかった');
		return;
	}
	const host = sessionHostCache[session];
	if (!host) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
	}
	const url = `https://${host}/api/miauth/${session}/check`;
	const { token, user } = (await axios.post(url)).data;

	if (!token || !user) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
	}

	await upsertUser(user.username, host, token);
	const u = await getUser(user.username, host);

	if (!u) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
	}
	await ctx.render('logined', { user: u });
});

router.get('/legacy-auth', async ctx => {
	await die(ctx, 'coming soon');
});


// Return 404 for other pages
router.all('(.*)', async ctx => {
	ctx.status = 404;
	await die(ctx, 'ページが見つかりませんでした');
});