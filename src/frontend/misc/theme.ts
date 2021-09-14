export const actualThemes = [
	'light',
	'dark',
] as const;

export const themes = [
	...actualThemes,
	'system',
] as const;

export type Theme = typeof themes[number];

export type ActualTheme = typeof actualThemes[number];
