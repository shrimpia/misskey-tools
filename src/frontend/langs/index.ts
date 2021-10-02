import enUS from './en-US.json';
import jaJP from './ja-JP.json';

export const resources = {
	'en_US': { translation: enUS },
	'ja_JP': { translation: jaJP },
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
