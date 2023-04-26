import axios from 'axios';

import { printLog } from '@/libs/store.js';
import { MisskeyError } from '@/types/misskey-error.js';
import { TimedOutError } from '@/types/timed-out-error.js';
import { delay } from '@/utils/delay.js';

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

