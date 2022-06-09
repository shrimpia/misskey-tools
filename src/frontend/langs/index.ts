import jaJP from './ja-JP.json';
import enUS from './en-US.json';
import koKR from './ko-KR.json';

import deepmerge from 'deepmerge';

const merge = (baseData: Record<string, unknown>, newData: Record<string, unknown>) => {
	return deepmerge(baseData, newData, {
		isMergeableObject: obj => typeof obj === 'object'
	});
};

export const resources = {
	'ja_JP': { translation: jaJP },
	'en_US': { translation: merge(jaJP, enUS) },
	'ko_KR': { translation: merge(jaJP, koKR) },
};

export const languageName = {
	'ja_JP': '日本語',
	'en_US': 'English',
	'ko_KR': '한국어',
} as const;

export type LanguageCode = keyof typeof resources;

export const getBrowserLanguage = () => {
	const lang = navigator.language;
	return (Object.keys(resources) as LanguageCode[]).find(k => k.startsWith(lang)) ?? 'en_US';
};
