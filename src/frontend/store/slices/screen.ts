import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCALSTORAGE_KEY_THEME } from '../../const';
import { Theme } from '../../misc/theme';
import { Modal } from '../../modal/modal';

interface ScreenState {
	modal: Modal | null;
	modalShown: boolean;
	theme: Theme;
}

const initialState: ScreenState = {
	modal: null,
	modalShown: false,
	theme: localStorage[LOCALSTORAGE_KEY_THEME] ?? 'system',
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
		changeTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
			localStorage[LOCALSTORAGE_KEY_THEME] = action.payload;
		},
	},
});

export const { showModal, hideModal, changeTheme } = screenSlice.actions;

export default screenSlice.reducer;
