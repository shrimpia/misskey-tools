import { AlertMode } from './alert-mode';
import { Visibility } from './visibility';

export interface IUser {
	id: number;
	username: string;
	host: string;
	token: string;
	misshaiToken: string;
	prevNotesCount: number;
	prevFollowingCount: number;
	prevFollowersCount: number;
	alertMode: AlertMode;
	visibility: Visibility;
	localOnly: boolean;
	remoteFollowersOnly: boolean;
	template: string | null;
	prevRating: number;
	rating: number;
	bannedFromRanking: boolean;
}

