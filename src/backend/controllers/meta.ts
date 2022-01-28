/**
 * バージョン情報など、サーバーのメタデータを返すAPI
 * @author Xeltica
 */

import { readFile } from 'fs';
import { Get, JsonController } from 'routing-controllers';
import { promisify } from 'util';
import { Meta } from '../../common/types/meta';
import { currentTokenVersion } from '../const';

@JsonController('/meta')
export class MetaController {
	@Get() async get(): Promise<Meta> {
		const {version} = JSON.parse(await promisify(readFile)(__dirname + '/../../meta.json', { encoding: 'utf-8'}));
		return {
			version,
			currentTokenVersion,
		};
	}
}
