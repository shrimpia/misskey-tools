// Fluxもどき簡易Store
// getStateを介してステートを取得し、dispatchによって更新する
// stateを直接編集できないようになっている

/**
 * 初期値
 */
const defaultState: State = {
	nowCalculating: false,
	misshaiWorkerRecentError: null,
};

let _state: Readonly<State> = defaultState;

/**
 * ステートの型
 */
export type State = {
	nowCalculating: boolean,
	misshaiWorkerRecentError: string | null,
};

/**
 * 現在のステートを読み取り専用な形式で取得します。
 * @returns
 */
export const getState = () => Object.freeze({ ..._state });

/**
 * ステートを更新します。
 * @param mutation ステートの一部を更新するためのオブジェクト
 */
export const dispatch = (mutation: Partial<State>) => {
	_state = {
		..._state,
		...mutation,
	};
};
