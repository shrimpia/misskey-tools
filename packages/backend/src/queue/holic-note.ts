import { Queue, Worker } from 'bullmq';
import * as misskey from 'misskey-js';

import type { MisskeySession, HolicAccount } from '@prisma/client';

import { getMisskey } from '@/libs/misskey.js';
import { connection } from '@/libs/redis.js';
import { isVisibility } from '@/utils/is-visibility';

const NAME = 'holicNote';

export type HolicNoteQueueType = {
	session: MisskeySession;
	account: HolicAccount;
	text: string;
};

export const holicNoteQueue = new Queue<HolicNoteQueueType>(NAME, { connection });

export const holicNoteWorker = new Worker<HolicNoteQueueType>(NAME, async (job) => {
  const { session, account, text } = job.data;

  const api = getMisskey(session.host);

  if (!isVisibility(account.noteVisibility)) {
    // 公開範囲の値がおかしい場合は処理しない
    // TODO 警告をログに流す
    console.warn(`The scheduled note id:${job.data} has wrong visibility ${account.noteVisibility}. Ignored.`);
    return;
  }

  try {
    await api.request('notes/create', {
      text,
      visibility: account.noteVisibility,
      localOnly: account.noteLocalOnly,
    }, session.token);
  } catch (e) {
    if (!misskey.api.isAPIError(e)) throw e;
    if (e.code === 'RATE_LIMIT_EXCEEDED') {
      // delay 1h
      holicNoteWorker.rateLimit(1000 * 60 * 60);
      throw Worker.RateLimitError();
    }
  }

}, { connection });
