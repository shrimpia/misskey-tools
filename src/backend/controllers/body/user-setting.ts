import { IsIn, IsOptional } from 'class-validator';
import { AlertMode, alertModes } from '../../../common/types/alert-mode';
import { visibilities, Visibility } from '../../../common/types/visibility';

export class UserSetting {
	@IsIn(alertModes)
	@IsOptional()
	alertMode?: AlertMode;

	@IsIn(visibilities)
	@IsOptional()
	visibility?: Visibility;

	@IsOptional()
	localOnly?: boolean;

	@IsOptional()
	remoteFollowersOnly?: boolean;

	@IsOptional()
	template?: string;
}
