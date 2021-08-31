import { Get, JsonController, QueryParam } from "routing-controllers";
import { getRanking } from "../functions/ranking";
import { getState } from "../store";

@JsonController()
export class RankingController {
    @Get('/ranking')    
    get(
        @QueryParam('limit', { type: Number, required: false })
        limit?: number
    ) {
        return this.getResponse(getState().nowCalculating)
    }

    private getResponse(isCalculating: boolean, limit?: number) {
        return {
            isCalculating,
            ranking: isCalculating ? [] : getRanking(limit),
        };
    }
}