import { Visibility } from "@prisma/client";

export const noteVisibilities = [
	'home',
	'followers',
] as const;

export type NoteVisibility = typeof noteVisibilities[number];

export const normalize = (v: Visibility) => {
	switch (v) {
		case 'public':
		case 'home':
		case 'users':
			return 'home';
		case 'followers':
			return 'followers';
		default:
			throw new Error(`Unknown visibility type ${v}`);
	}
}
