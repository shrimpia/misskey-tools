import { atomWithStorage } from 'jotai/utils';
import { LOCALSTORAGE_KEY_ACCOUNTS } from '@/const';
import {atom} from 'jotai';
import {IUser} from 'tools-shared/dist/types/user.js';

export const accountTokensAtom = atomWithStorage<string[]>(LOCALSTORAGE_KEY_ACCOUNTS, []);
export const accountsAtom = atom<IUser[]>([]);
