import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { languageAtom } from './store/client-settings';

import { globalStyles } from '@/libs/stitches.js';
import { useTheme } from '@/misc/theme.js';

/**
 * Misskey Tools アプリ全体に及ぶ副作用。
 */
export const useToolsGlobalEffects = () => {
  const language = useAtomValue(languageAtom);
  const { i18n } = useTranslation();

  globalStyles();
  useTheme();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
};
