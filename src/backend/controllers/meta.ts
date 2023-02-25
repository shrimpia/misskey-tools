/**
 * バージョン情報など、サーバーのメタデータを返すAPI
 * @author Xeltica
 */

import { Get, JsonController } from 'routing-controllers';
import { Meta } from '../../common/types/meta.js';
import { currentTokenVersion } from '../const.js';
import { meta } from '../../config.js';

@JsonController('/meta')
export class MetaController {
  @Get() async get(): Promise<Meta> {
    return {
      version: meta.version,
      currentTokenVersion,
    };
  }
}
