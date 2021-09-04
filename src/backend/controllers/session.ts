/**
 * トークンを必要とするセッションAPI
 * @author Xeltica
 */

import { CurrentUser, Get, JsonController } from 'routing-controllers';
import { User } from '../models/entities/user';

@JsonController('/session')
export class SessionController {
	@Get() get(@CurrentUser({ required: true }) user: User) {
		return user;
	}
}
