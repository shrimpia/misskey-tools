// Fluxもどき簡易Store
// getStateを介してステートを取得し、dispatchによって更新する
// stateを直接編集できないようになっている

/**
 * 初期値
 */
const defaultState: State = {
	nowCalculating: false,
	misshaiWorkerLog: [],
};

let _state: Readonly<State> = defaultState;

/**
 * ステートの型
 */
export type State = {
	nowCalculating: boolean,
	misshaiWorkerLog: Log[],
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

export type Log = {
	text: string;
	level: 'error' | 'warn' | 'info';
	timestamp: Date;
}

export const clearLog = () => {
	dispatch({ misshaiWorkerLog: [] });
};

export const printLog = (log: unknown, level: Log['level'] = 'info') => {
	dispatch({ misshaiWorkerLog: [
		...getState().misshaiWorkerLog,
		{ text: String(log), level, timestamp: new Date() },
	] });
};
