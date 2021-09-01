import { Context } from 'koa';

export const die = (ctx: Context, error = '問題が発生しました。お手数ですが、最初からやり直してください。', status = 400): Promise<void> => {
	ctx.status = status;
	return ctx.render('error', { error });
};
