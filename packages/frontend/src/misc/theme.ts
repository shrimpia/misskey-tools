import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import { darkTheme } from '@/libs/stitches.js';
import { themeAtom } from '@/store/client-settings.js';

export const actualThemes = [
  'light',
  'dark',
] as const;
export type Theme = typeof themes[number];

export const themes = [
  ...actualThemes,
  'system',
] as const;
export type ActualTheme = typeof actualThemes[number];

export const useTheme = () => {
  const theme = useAtomValue(themeAtom);

  const [ osTheme, setOsTheme ] = useState<ActualTheme>('dark');

  const applyTheme = useCallback(() => {
    const actualTheme = theme === 'system' ? osTheme : theme;
    if (actualTheme === 'dark') {
      document.documentElement.classList.add(darkTheme);
    } else {
      document.documentElement.classList.remove(darkTheme);
    }
  }, [theme, osTheme]);

  // テーマ変更に追従する
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  // システムテーマ変更に追従する
  useEffect(() => {
    const q = window.matchMedia('(prefers-color-scheme: dark)');
    setOsTheme(q.matches ? 'dark' : 'light');

    const listener = () => setOsTheme(q.matches ? 'dark' : 'light');
    q.addEventListener('change', listener);
    return () => {
      q.removeEventListener('change', listener);
    };
  }, [osTheme, setOsTheme]);
};
