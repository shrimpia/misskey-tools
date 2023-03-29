/**
 * ランキング一覧取得API
 * @author Xeltica
 */

import { Get, JsonController, QueryParam } from 'routing-controllers';
import { getRanking } from '../repositories/get-ranking.js';
import { getUserCount } from '../repositories/get-user.js';
import { getState } from '../store.js';

@JsonController('/ranking')
export class RankingController {
  @Get()
  async get(@QueryParam('limit', { required: false }) limit?: string) {
    return this.getResponse(getState().nowCalculating, limit ? Number(limit) : undefined);
  }

  /**
   * DBに問い合わせてランキングを取得する
   * @param isCalculating 現在算出中かどうか
   * @param limit 何件取得するか
   * @returns ランキング
   */
  private async getResponse(isCalculating: boolean, limit?: number) {
    const ranking = isCalculating ? [] : (await getRanking(limit)).map((u) => ({
      username: u.useRanking ? u.username : undefined,
      host: u.useRanking ? u.host : undefined,
      rating: u.rating,
    }));
    return {
      isCalculating,
      userCount: await getUserCount(),
      ranking,
    };
  }
}
