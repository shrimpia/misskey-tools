// Fluxもどき簡易Store
// getStateを介してステートを取得し、dispatchによって更新する
// stateを直接編集できないようになっている

const defaultState: State = {
	nowCalculating: false,
};

let _state: Readonly<State> = defaultState;

export type State = {
	nowCalculating: boolean,
};

export const getState = () => Object.freeze({..._state});

export const dispatch = (mutation: Partial<State>) => {
	_state = {
		..._state,
		...mutation,
	};
};