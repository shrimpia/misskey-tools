import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { IUser } from '../../../common/types/user';

import { LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_LANG, LOCALSTORAGE_KEY_THEME } from '../../const';
import { Theme } from '../../misc/theme';
import { Modal } from '../../modal/modal';

interface ScreenState {
	modal: Modal | null;
	modalShown: boolean;
	theme: Theme;
	language: string;
	accounts: IUser[];
	accountTokens: string[];
}

const initialState: ScreenState = {
	modal: null,
	modalShown: false,
	theme: localStorage[LOCALSTORAGE_KEY_THEME] ?? 'system',
	language: localStorage[LOCALSTORAGE_KEY_LANG] ?? i18n.language ?? 'ja_JP',
	accounts: [],
	accountTokens: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[],
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
		changeTheme: (state, action: PayloadAction<ScreenState['theme']>) => {
			state.theme = action.payload;
			localStorage[LOCALSTORAGE_KEY_THEME] = action.payload;
		},
		changeLang: (state, action: PayloadAction<ScreenState['language']>) => {
			state.language = action.payload;
			localStorage[LOCALSTORAGE_KEY_LANG] = action.payload;
			i18n.changeLanguage(action.payload);
		},
		setAccounts: (state, action: PayloadAction<ScreenState['accounts']>) => {
			state.accounts = action.payload;
			state.accountTokens = action.payload.map(a => a.misshaiToken);
			localStorage[LOCALSTORAGE_KEY_ACCOUNTS] = JSON.stringify(state.accountTokens);
		},
	},
});

export const { showModal, hideModal, changeTheme, changeLang, setAccounts } = screenSlice.actions;

export default screenSlice.reducer;
