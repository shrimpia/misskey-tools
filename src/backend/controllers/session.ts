/**
 * トークンを必要とするセッションAPI
 * @author Xeltica
 */

import { CurrentUser, Get, JsonController } from 'routing-controllers';
import { getScores } from '../functions/get-scores';
import { User } from '../models/entities/user';

@JsonController('/session')
export class SessionController {
	@Get() get(@CurrentUser({ required: true }) user: User) {
		return user;
	}

	@Get('/score')
	async getScore(@CurrentUser({ required: true }) user: User) {
		return getScores(user);
	}
}
