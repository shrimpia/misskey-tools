import { Users } from '../models';
import { User } from '../models/entities/user';

/**
 * ミス廃ランキングを取得する
 * @param limit 取得する件数
 * @returns ミス廃ランキング
 */
export const getRanking = async (limit: number | null = 10): Promise<User[]> => {
	const query = Users.createQueryBuilder('user')
		.where('"user"."bannedFromRanking" IS NOT TRUE')
		.orderBy('"user".rating', 'DESC');

	if (limit !== null) {
		query.limit(limit);
	}

	return await query.getMany();
};
