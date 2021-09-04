import { Users } from '../models';
import { User } from '../models/entities/user';

export const getRanking = async (limit: number | null = 10): Promise<User[]> => {
	const query = Users.createQueryBuilder('user')
		.where('"user"."bannedFromRanking" IS NOT TRUE')
		.orderBy('"user".rating', 'DESC');
	
	if (limit !== null) {
		query.limit(limit);
	}
		
	return await query.getMany();
};