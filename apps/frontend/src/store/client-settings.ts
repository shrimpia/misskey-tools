import i18n from 'i18next';
import { atomWithStorage } from 'jotai/utils';
import { DesignSystemColor } from "tools-shared/dist/types/design-system-color";

import { LOCALSTORAGE_KEY_ACCENT_COLOR, LOCALSTORAGE_KEY_LANG, LOCALSTORAGE_KEY_THEME } from "@/const";
import { Theme } from '@/misc/theme';

export const theme = atomWithStorage<Theme>(LOCALSTORAGE_KEY_THEME, 'system');
export const language = atomWithStorage<string>(LOCALSTORAGE_KEY_LANG, i18n.language ?? 'ja_JP');
export const accentColor = atomWithStorage<DesignSystemColor>(LOCALSTORAGE_KEY_ACCENT_COLOR, 'green');
