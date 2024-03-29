import { PrismaClient } from '@prisma/client';

/**
 * Prisma ORMクライアント
 */
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
