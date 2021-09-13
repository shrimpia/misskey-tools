/**
 * トークンを必要とするセッションAPI
 * @author Xeltica
 */

import { IsEnum } from 'class-validator';
import { Body, CurrentUser, Get, HttpCode, JsonController, OnUndefined, Post, Put } from 'routing-controllers';
import { DeepPartial } from 'typeorm';
import { getScores } from '../functions/get-scores';
import { updateUser } from '../functions/users';
import { User } from '../models/entities/user';
import { UserSetting } from './UserSetting';

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
		if (setting.alertMode) s.alertMode = setting.alertMode;
		if (setting.visibility) s.visibility = setting.visibility;
		if (setting.localOnly) s.localOnly = setting.localOnly;
		if (setting.remoteFollowersOnly) s.remoteFollowersOnly = setting.remoteFollowersOnly;
		if (setting.template) s.template = setting.template;
		if (Object.keys(s).length === 0) return;
		await updateUser(user.username, user.host, s);
	}
}


