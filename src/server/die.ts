import { Context } from 'koa';

export const die = (ctx: Context, error: string, status = 400): Promise<void> => {
	ctx.status = status;
	return ctx.render('error', { error });
};
