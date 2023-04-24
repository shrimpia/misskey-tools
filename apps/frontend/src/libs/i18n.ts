import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LOCALSTORAGE_KEY_LANG } from '@/const';
import { getBrowserLanguage, languageName, resources } from '@/langs';

let lng = localStorage[LOCALSTORAGE_KEY_LANG];

if (!lng || !Object.keys(languageName).includes(lng)) {
  lng = localStorage[LOCALSTORAGE_KEY_LANG] = getBrowserLanguage();
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    interpolation: {
      escapeValue: false, // Reactは常にXSS対策をしてくれるので、i18next側では対応不要
    },
  });
