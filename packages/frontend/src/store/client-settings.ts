import i18n from 'i18next';
import { atomWithStorage } from 'jotai/utils';

import { LOCALSTORAGE_KEY_LANG } from '@/const';

export const languageAtom = atomWithStorage<string>(LOCALSTORAGE_KEY_LANG, i18n.language ?? 'ja_JP');
