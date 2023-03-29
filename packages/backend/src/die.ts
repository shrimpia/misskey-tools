import { Context } from 'koa';
import { ErrorCode } from '../common/types/error-code.js';

export const die = (ctx: Context, error: ErrorCode = 'other', status = 400): Promise<void> => {
  ctx.status = status;
  return ctx.render('frontend', { error });
};
