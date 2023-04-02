/**
 * バージョン情報など、サーバーのメタデータを返すAPI
 * @author Xeltica
 */

import { Get, JsonController } from 'routing-controllers';
import { Meta } from 'tools-shared/dist/types/meta.js';
import { currentTokenVersion } from 'tools-shared/dist/const.js';
import { meta } from '../config.js';

@JsonController('/meta')
export class MetaController {
  @Get() async get(): Promise<Meta> {
    return {
      version: meta.version,
      currentTokenVersion,
    };
  }
}
