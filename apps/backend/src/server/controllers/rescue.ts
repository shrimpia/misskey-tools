import { RouteHandler } from "fastify";

/**
 * フロントエンドのlocalStorageを初期化するレスキューページを配信します。
 */
export const rescueController: RouteHandler = async (_, reply) => {
	await reply.view('rescue');
};
