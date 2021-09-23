export const errorCodes = [
	'hitorisskeyIsDenied',
	'teapot',
	'sessionRequired',
	'tokenRequired',
	'invalidParamater',
	'notAuthorized',
	'other',
] as const;

export type ErrorCode = typeof errorCodes[number];
