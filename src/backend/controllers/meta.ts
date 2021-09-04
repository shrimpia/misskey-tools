/**
 * バージョン情報など、サーバーのメタデータを返すAPI
 * @author Xeltica
 */

import { Get, JsonController } from 'routing-controllers';

@JsonController('/meta')
export class MetaController {
	@Get() get() {
		return {
			honi: 'ほに',
		};
	}
}
