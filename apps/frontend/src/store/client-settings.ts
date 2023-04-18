import i18n from 'i18next';
import { atomWithStorage } from 'jotai/utils';
import { DesignSystemColor } from "tools-shared/dist/types/design-system-color";

import { LOCALSTORAGE_KEY_ACCENT_COLOR, LOCALSTORAGE_KEY_LANG, LOCALSTORAGE_KEY_THEME } from "@/const";
import { Theme } from '@/misc/theme';

export const themeAtom = atomWithStorage<Theme>(LOCALSTORAGE_KEY_THEME, 'system');
export const languageAtom = atomWithStorage<string>(LOCALSTORAGE_KEY_LANG, i18n.language ?? 'ja_JP');
export const accentColorAtom = atomWithStorage<DesignSystemColor>(LOCALSTORAGE_KEY_ACCENT_COLOR, 'green');
