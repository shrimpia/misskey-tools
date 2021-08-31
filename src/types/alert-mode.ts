export const alertModes = [
	'note',
	'notification',
	'nothing'
] as const;

export type AlertMode = typeof alertModes[number];