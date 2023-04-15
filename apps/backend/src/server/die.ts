import { FastifyReply } from 'fastify';
import { Context } from 'koa';
import { ErrorCode } from 'tools-shared/dist/types/error-code.js';

export const die = async (reply: FastifyReply, error: ErrorCode = 'other', status = 400): Promise<void> => {
	reply.statusCode = status;
	return await reply.view('frontend', { error });
};
