import axios from 'axios';
import {printLog} from '../store.js';
import {delay} from '../utils/delay.js';

export const ua = `Mozilla/5.0 MisskeyTools +https://github.com/shrimpia/misskey-tools Node/${process.version}`;

const RETRY_COUNT = 5;

/**
 * Misskey APIを呼び出す
 */
export const api = async <T extends Record<string, unknown> = Record<string, unknown>>(host: string, endpoint: string, arg: Record<string, unknown>, token?: string): Promise<T> => {
  const a = { ...arg };
  if (token) {
    a.i = token;
  }

  for (let i = 0; i < RETRY_COUNT; i++) {
    let data: T;
    try {
      data = await axios.post<T>(`https://${host}/api/${endpoint}`, a).then(res => res.data);
    } catch (e) {
      printLog(`接続エラー: ${host}/api/${endpoint} リトライ中 (${i + 1} / ${RETRY_COUNT})\n${e}`, 'error');
      await delay(3000);
      continue;
    }
    if (!(typeof data === 'object' && 'error' in data)) {
      return data;
    }
    throw new MisskeyError((data as any).error);
  }
  throw new TimedOutError();
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

export class TimedOutError extends Error {}

export class MisskeyError extends Error {
  constructor(public error: MisskeyErrorObject) {
    super();
  }
}

export interface MisskeyErrorObject {
  message: string;
  code: string;
  id: string;
  kind: string;
}
