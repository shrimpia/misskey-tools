import { Queue, Worker } from 'bullmq';

import type { BulkJobOptions } from 'bullmq';

import { prisma } from '@/libs/prisma.js';
import { connection } from '@/libs/redis.js';
import { queues } from '@/queue/index.js';
import { toAcct } from '@/utils/to-acct.js';

const NAME = 'holicCron';

export const holicCronQueue = new Queue(NAME, { connection });

export const holicCronWorker = new Worker(NAME, async () => {
  const jobData = (await prisma.holicAccount.findMany({
    include: {
      misskeySession: true,
    },
  })).map(account => ({
    name: toAcct(account.misskeySession),
    data: { account },
    opts: {
      backoff: 5,
      delay: 3000,
      removeOnComplete: true,
    } as BulkJobOptions,
  }));

  queues.holicAggregateQueue.addBulk(jobData);
}, { connection });
