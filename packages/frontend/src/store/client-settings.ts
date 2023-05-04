import i18n from 'i18next';
import { atomWithStorage } from 'jotai/utils';

import type { Theme } from '@/misc/theme.js';

import { LOCALSTORAGE_KEY_LANG, LOCALSTORAGE_KEY_THEME } from '@/const';

export const themeAtom = atomWithStorage<Theme>(LOCALSTORAGE_KEY_THEME, 'system');
export const languageAtom = atomWithStorage<string>(LOCALSTORAGE_KEY_LANG, i18n.language ?? 'ja_JP');
