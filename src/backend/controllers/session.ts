/**
 * トークンを必要とするセッションAPI
 * @author Xeltica
 */

import { BadRequestError, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Post, Put } from 'routing-controllers';
import { DeepPartial } from 'typeorm';
import { getScores } from '../functions/get-scores.js';
import { deleteUser, updateUser } from '../functions/users.js';
import { User } from '../models/entities/user.js';
import { sendAlert } from '../services/send-alert.js';
import { UserSetting } from './body/user-setting.js';

@JsonController('/session')
export class SessionController {
  @Get() get(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Get('/score')
  async getScore(@CurrentUser({ required: true }) user: User) {
    return getScores(user);
  }

  @OnUndefined(204)
  @Put() async updateSetting(@CurrentUser({ required: true }) user: User, @Body() setting: UserSetting) {
    const s: DeepPartial<User> = {};
    if (setting.alertMode != null) s.alertMode = setting.alertMode;
    if (setting.visibility != null) {
      console.log(setting.visibility);
      if (setting.visibility === 'public' || setting.visibility === 'users') {
        throw new BadRequestError('Unsupported visibility');
      }
      s.visibility = setting.visibility;
    }
    if (setting.localOnly != null) s.localOnly = setting.localOnly;
    if (setting.remoteFollowersOnly != null) s.remoteFollowersOnly = setting.remoteFollowersOnly;
    if (setting.template !== undefined) s.template = setting.template;
    if (setting.useRanking !== undefined) s.useRanking = setting.useRanking;
    if (Object.keys(s).length === 0) return;
    await updateUser(user.username, user.host, s);
  }

  @OnUndefined(204)
  @Post('/alert') async testAlert(@CurrentUser({ required: true }) user: User) {
    await sendAlert(user);
  }

  @OnUndefined(204)
  @Delete() async delete(@CurrentUser({ required: true }) user: User) {
    await deleteUser(user.username, user.host);
  }
}


