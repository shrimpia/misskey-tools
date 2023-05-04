import type { FastifyReply } from 'fastify';
import type { ErrorCode } from 'tools-shared/dist/types/error-code.js';

export const die = async (reply: FastifyReply, error: ErrorCode = 'other', status = 400): Promise<void> => {
  reply.statusCode = status;
  return await reply.view('frontend', { error });
};
