import { RouteHandler } from "fastify";

export const rescueController: RouteHandler = async (_, reply) => {
	await reply.view('rescue');
};
