import { Queue, Worker } from 'bullmq';
import { isAPIError } from 'misskey-js/built/api';

import type { MisskeySession, HolicAccount } from '@prisma/client';

import { getMisskey } from '@/libs/misskey.js';
import { connection } from '@/libs/redis.js';

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
  try {
    await api.request('notes/create', {
      text,
      visibility: account.noteVisibility as any,
      localOnly: account.noteLocalOnly,
    }, session.token);
  } catch (e) {
    if (!isAPIError(e)) throw e;
    if (e.code === 'RATE_LIMIT_EXCEEDED') {
      // delay 1h
      holicNoteWorker.rateLimit(1000 * 60 * 60);
      throw Worker.RateLimitError();
    }
  }

}, { connection });
