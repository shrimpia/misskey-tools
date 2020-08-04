import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import { die } from './die';
import { v4 as uuid } from 'uuid';
import { config } from './config';
import axios from 'axios';
import { upsertUser, getUser, getUserCount, updateUser } from './users';

export const router = new Router<DefaultState, Context>();

export const sessionHostCache: Record<string, string> = { };

router.get('/', async ctx => {
	await ctx.render('welcome', {
		usersCount: await getUserCount(),
	});
});

router.get('/login', async ctx => {
	let host = ctx.query.host as string | undefined;
	if (!host) { 
		await die(ctx, 'ホストを空欄にしてはいけない');
		return;
	}
	const meta = await api<{ name: string, uri: string, features: Record<string, boolean | undefined> }>(host, 'meta', {});

	// MiAuth 以外はサポートしていない
	if (!meta.features.miauth) {
		await die(ctx, 'ごめんなさい。お使いのインスタンス "' + (meta.name || host) + '" はまだサポートされていません。現在、MiAuth 認証方式をサポートするバージョンの Misskey のみご利用頂けます。対象の Misskey バージョンは Misskey v12, Groundpolis v3 の最新版です。インスタンス管理者にご問い合わせください。');
		return;
	}

	// ホスト名の正規化
	host = meta.uri.replace(/^https?:\/\//, '');
	
	const session = uuid();
	const name = encodeURI('みす廃あらーと');
	const permission = encodeURI('write:notes');
	const callback = encodeURI(`${config.url}/miauth`);
	const url = `https://${host}/miauth/${session}?name=${name}&callback=${callback}&permission=${permission}`;
	sessionHostCache[session] = host;

	ctx.redirect(url);
});

router.get('/terms', async ctx => {
	await ctx.render('term');
});

router.get('/about', async ctx => {
	await ctx.render('about');
});

router.get('/teapot', async ctx => {
	await die(ctx, 'I\'m teapot', 418);
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
		return;
	}
	const url = `https://${host}/api/miauth/${session}/check`;
	const { token, user } = (await axios.post(url)).data;

	if (!token || !user) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
		return;
	}

	await upsertUser(user.username, host, token);
	const u = await getUser(user.username, host);

	if (!u) {
		await die(ctx, '問題が発生しました。お手数ですが、最初からやり直してください。');
		return;
	}

	await updateUser(u.username, u.host, {
		prevNotesCount: user.notesCount,
		prevFollowingCount: user.followingCount,
		prevFollowersCount: user.followersCount,
	});

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