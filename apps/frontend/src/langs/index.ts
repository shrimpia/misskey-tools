import jaJP from './ja-JP.json';
import enUS from './en-US.json';
import koKR from './ko-KR.json';
import jaCR from './ja-cr.json';
import itIT from './it-IT.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';

import deepmerge from 'deepmerge';

const merge = (baseData: Record<string, unknown>, newData: Record<string, unknown>) => {
  return deepmerge(baseData, newData, {
    isMergeableObject: obj => typeof obj === 'object',
  });
};

const _enUS = merge(jaJP, enUS);

export const resources = {
  'ja_JP': { translation: jaJP },
  'en_US': { translation: _enUS },
  'ko_KR': { translation: merge(_enUS, koKR) },
  'it_IT': { translation: merge(_enUS, itIT) },
  'zh_CN': { translation: merge(_enUS, zhCN) },
  'zh_TW': { translation: merge(_enUS, zhTW) },
  'ja_CR': { translation: merge(jaJP, jaCR) },
};

export const languageName = {
  'ja_JP': '日本語',
  'en_US': 'English',
  'ko_KR': '한국어',
  'it_IT': 'Italiano',
  'zh_CN': '简体中文',
  'zh_TW': '繁體中文',
  'ja_CR': '怪レい日本语',
} as const;

export type LanguageCode = keyof typeof resources;

export const getBrowserLanguage = () => {
  const lang = navigator.language.replace('-', '_').toLowerCase();
  return (Object.keys(resources) as LanguageCode[]).find(k => k.toLowerCase().startsWith(lang)) ?? 'en_US';
};
