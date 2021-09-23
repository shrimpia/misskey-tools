import enUS from './en_US.json5';
import jaJP from './ja_JP.json5';

export const resources = {
	'en_US': enUS,
	'ja_JP': jaJP,
};

export const languageName = {
	'en_US': 'English',
	'ja_JP': '日本語',
} as const;

export type LanguageCode = keyof typeof resources;

export const getBrowserLanguage = () => {
	const lang = navigator.language;
	return (Object.keys(resources) as LanguageCode[]).find(k => k.startsWith(lang)) ?? 'en_US';
};
