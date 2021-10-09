/**
 * バージョン情報など、サーバーのメタデータを返すAPI
 * @author Xeltica
 */

import { Get, JsonController } from 'routing-controllers';
import { config } from '../../config';

 @JsonController('/admin')
export class AdminController {
	@Get() getAdmin() {
		const { username, host } = config.admin;
		return {
			username, host,
			acct: `@${username}@${host}`,
		};
	}
}
