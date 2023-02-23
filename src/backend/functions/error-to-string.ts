import {MisskeyError} from '../services/misskey';

export const errorToString =  (e: Error) => {
	if (e instanceof MisskeyError) {
		return JSON.stringify(e.error);
	}
	return `${e.name}: ${e.message}\n${e.stack}`;
};
