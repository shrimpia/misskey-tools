import { Queue, Worker } from 'bullmq';

import type { MisskeySession, HolicAccount } from '@prisma/client';

import { getMisskey } from '@/libs/misskey.js';
import { connection } from '@/libs/redis.js';

const NAME = 'holicNotification';

export type HolicNotificationQueueType = {
	session: MisskeySession;
	account: HolicAccount;
	text: string;
};

export const holicNotificationQueue = new Queue<HolicNotificationQueueType>(NAME, { connection });

export const holicNotificationWorker = new Worker<HolicNotificationQueueType>(NAME, async (job) => {
  const { session, text } = job.data;

  const api = getMisskey(session.host);
  await api.request('notifications/create', {
    header: 'Misskey Tools',
    icon: 'https://i.imgur.com/B991yTl.png',
    body: text,
  }, session.token);

}, { connection });
