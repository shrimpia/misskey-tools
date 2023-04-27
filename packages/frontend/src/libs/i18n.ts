import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from '@/langs';

i18n
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false, // Reactは常にXSS対策をしてくれるので、i18next側では対応不要
    },
  });
