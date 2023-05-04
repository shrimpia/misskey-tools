import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { IUser } from 'tools-shared/dist/types/user.js';

import { LOCALSTORAGE_KEY_ACCOUNTS } from '@/const';

export const accountTokensAtom = atomWithStorage<string[]>(LOCALSTORAGE_KEY_ACCOUNTS, []);
export const accountsAtom = atom<IUser[]>([]);
