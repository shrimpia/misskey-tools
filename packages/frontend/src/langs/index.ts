import deepmerge from 'deepmerge';

import enUS from '@/langs/en-US.json';
import itIT from '@/langs/it-IT.json';
import jaCR from '@/langs/ja-cr.json';
import jaJP from '@/langs/ja-JP.json';
import jaKS from '@/langs/ja-KS.json';
import koKR from '@/langs/ko-KR.json';
import zhCN from '@/langs/zh-CN.json';
import zhTW from '@/langs/zh-TW.json';


const merge = (baseData: Record<string, unknown>, newData: Record<string, unknown>) => {
  return deepmerge(baseData, newData, {
    isMergeableObject: obj => typeof obj === 'object',
  });
};

export const resources = {
  'ja_JP': { translation: jaJP },
  'ja_KS': { translation: merge(jaJP, jaKS) },
  'ja_CR': { translation: merge(jaJP, jaCR) },
  'en_US': { translation: merge(jaJP, enUS) },
  'ko_KR': { translation: merge(jaJP, koKR) },
  'it_IT': { translation: merge(jaJP, itIT) },
  'zh_CN': { translation: merge(jaJP, zhCN) },
  'zh_TW': { translation: merge(jaJP, zhTW) },
};

export const languageName = Object.entries(resources).map(([k, v]) => [k, v.translation.$languageName as string]);

export type LanguageCode = keyof typeof resources;

export const getBrowserLanguage = () => {
  const lang = navigator.language.replace('-', '_').toLowerCase();
  return (Object.keys(resources) as LanguageCode[]).find(k => k.toLowerCase().startsWith(lang)) ?? 'en_US';
};
