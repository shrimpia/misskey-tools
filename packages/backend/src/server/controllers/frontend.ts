import { RouteHandler } from 'fastify';

/**
 * フロントエンドを返します。
 */
export const frontendController: RouteHandler = async (_, reply) => {
  await reply.view('frontend');
};
