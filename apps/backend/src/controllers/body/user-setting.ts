import { IsIn, IsOptional } from 'class-validator';
import { AlertMode, alertModes } from '../tools-shared/dist/types/alert-mode.js';
import { visibilities, Visibility } from '../tools-shared/dist/types/visibility.js';

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
