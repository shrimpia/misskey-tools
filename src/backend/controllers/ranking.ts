/**
 * ランキング一覧取得API
 * @author Xeltica
 */

import { Get, JsonController, QueryParam } from 'routing-controllers';
import { getRanking } from '../functions/ranking';
import { getUserCount } from '../functions/users';
import { getState } from '../store';

@JsonController('/ranking')
export class RankingController {
	@Get()
	async get(@QueryParam('limit', { required: false }) limit?: string) {
		return this.getResponse(getState().nowCalculating, limit ? Number(limit) : undefined);
	}

	private async getResponse(isCalculating: boolean, limit?: number) {
		const ranking = isCalculating ? [] : (await getRanking(limit)).map((u) => ({
			id: u.id,
			username: u.username,
			host: u.host,
			rating: u.rating,
		}));
		return {
			isCalculating,
			userCount: await getUserCount(),
			ranking,
		};
	}
}
