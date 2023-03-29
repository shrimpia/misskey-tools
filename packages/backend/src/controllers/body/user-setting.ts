import { IsIn, IsOptional } from 'class-validator';
import { AlertMode, alertModes } from '../../../common/types/alert-mode.js';
import { visibilities, Visibility } from '../../../common/types/visibility.js';

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

  @IsOptional()
    useRanking?: boolean;
}
