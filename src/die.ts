import { Context } from 'koa';

export const die = (ctx: Context, error: string): Promise<void> => {
	ctx.status = 400;
	return ctx.render('error', { error });
};
