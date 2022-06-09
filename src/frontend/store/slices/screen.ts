import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { WritableDraft } from 'immer/dist/internal';
import { IUser } from '../../../common/types/user';

import { LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_LANG, LOCALSTORAGE_KEY_THEME } from '../../const';
import { Theme } from '../../misc/theme';
import { Modal } from '../../modal/modal';

interface ScreenState {
	modal: Modal | null;
	modalShown: boolean;
	theme: Theme;
	title: string | null;
	language: string;
	accounts: IUser[];
	accountTokens: string[];
	isMobile: boolean;
}

const initialState: ScreenState = {
	modal: null,
	modalShown: false,
	theme: localStorage[LOCALSTORAGE_KEY_THEME] ?? 'system',
	language: localStorage[LOCALSTORAGE_KEY_LANG] ?? i18n.language ?? 'ja_JP',
	title: null,
	accounts: [],
	accountTokens: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[],
	isMobile: false,
};

/**
 * 値を設定するReducerを生成します。
 */
const generateSetter = <T extends keyof WritableDraft<ScreenState>>(key: T, callback?: (state: WritableDraft<ScreenState>, action: PayloadAction<ScreenState[T]>) => void) => {
	return (state: WritableDraft<ScreenState>, action: PayloadAction<ScreenState[T]>) => {
		state[key] = action.payload;
		if (callback) callback(state, action);
	};
};

export const screenSlice = createSlice({
	name: 'screen',
	initialState,
	reducers: {
		showModal: (state, action: PayloadAction<Modal>) => {
			state.modal = action.payload;
			state.modalShown = true;
		},
		hideModal: (state) => {
			state.modal = null;
			state.modalShown = false;
		},
		changeTheme: generateSetter('theme', (_, action) => {
			localStorage[LOCALSTORAGE_KEY_THEME] = action.payload;
		}),
		changeLang: generateSetter('language', (_, action) => {
			localStorage[LOCALSTORAGE_KEY_LANG] = action.payload;
			i18n.changeLanguage(action.payload);
		}),
		setAccounts: generateSetter('accounts', (state, action) => {
			state.accountTokens = action.payload.map(a => a.misshaiToken);
			localStorage[LOCALSTORAGE_KEY_ACCOUNTS] = JSON.stringify(state.accountTokens);
		}),
		setMobile: generateSetter('isMobile'),
		setTitle: generateSetter('title'),
	},
});

export const { showModal, hideModal, changeTheme, changeLang, setAccounts, setMobile, setTitle } = screenSlice.actions;

export default screenSlice.reducer;
