import {User} from '@prisma/client';
import {prisma} from '../../libs/prisma.js';
import {Not} from 'typeorm';

/**
 * ミス廃ランキングを取得する
 * @param limit 取得する件数
 * @returns ミス廃ランキング
 */
export const getRanking = async (limit?: number | null): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      bannedFromRanking: false,
    },
    orderBy: {
      rating: 'desc'
    },
    take: limit ?? undefined,
  });
};
