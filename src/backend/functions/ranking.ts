import { Users } from '../models/index.js';
import { User } from '../models/entities/user.js';

/**
 * ミス廃ランキングを取得する
 * @param limit 取得する件数
 * @returns ミス廃ランキング
 */
export const getRanking = async (limit?: number | null): Promise<User[]> => {
  const query = Users.createQueryBuilder('user')
    .where('"user"."useRanking" IS TRUE')
    .andWhere('"user"."bannedFromRanking" IS NOT TRUE')
    .andWhere('"user"."rating" <> \'NaN\'')
    .orderBy('"user".rating', 'DESC');

  if (limit) {
    query.limit(limit);
  }

  return await query.getMany();
};
