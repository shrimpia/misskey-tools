/**
 * Admin API
 * @author Xeltica
 */

import { BadRequestError, CurrentUser, Get, JsonController, OnUndefined, Post } from 'routing-controllers';
import { IUser } from 'tools-shared/dist/types/user.js';
import { config } from '@/config.js';
import * as Store from '../libs/store.js';
import { work } from '@/services/misshai/work.js';

@JsonController('/admin')
export class AdminController {
  @Get() getAdmin() {
    const { username, host } = config.admin;
    return {
      username, host,
      acct: `@${username}@${host}`,
    };
  }

  @Get('/misshai/log') getMisshaiLog(@CurrentUser({ required: true }) user: IUser) {
    if (!user.isAdmin) {
      throw new BadRequestError('Not an Admin');
    }

    return Store.getState().misshaiWorkerLog;
  }

  @OnUndefined(204)
  @Post('/misshai/start') startMisshai(@CurrentUser({ required: true }) user: IUser) {
    if (!user.isAdmin) {
      throw new BadRequestError('Not an Admin');
    }
    if (Store.getState().nowCalculating) {
      throw new BadRequestError('Already started');
    }

    work();
  }
}
