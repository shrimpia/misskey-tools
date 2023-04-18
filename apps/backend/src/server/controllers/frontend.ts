import { RouteHandler } from "fastify";

export const frontendController: RouteHandler = async (_, reply) => {
	await reply.view('frontend');
};
