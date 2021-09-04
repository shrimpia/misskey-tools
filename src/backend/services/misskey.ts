import axios from 'axios';
import _const from '../const';

export const ua = `Mozilla/5.0 misshaialertBot/${_const.version} +https://github.com/Xeltica/misshaialert Node/${process.version}`;

axios.defaults.headers['User-Agent'] = ua;
axios.defaults.validateStatus = (stat) => stat < 500;

/**
 * Misskey APIを呼び出す
 */
export const api = <T = Record<string, unknown>>(host: string, endpoint: string, arg: Record<string, unknown>, i?: string): Promise<T> => {
	const a = { ...arg };
	if (i) {
		a.i = i;
	}
	return axios.post<T>(`https://${host}/api/${endpoint}`, a).then(res => res.data);
};

/**
 * トークンが有効かどうかを確認する
 * @param host 対象のホスト名
 * @param i トークン
 * @returns トークンが有効ならtrue、無効ならfalse
 */
export const apiAvailable = async (host: string, i: string): Promise<boolean> => {
	try {
		const res = await api(host, 'i', {}, i);
		return !res.error;
	} catch {
		return false;
	}
};
