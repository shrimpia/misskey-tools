import Queue from 'bull';
import dayjs from 'dayjs';

import { config } from '@/config.js';

/**
 * ジョブキューを新規に作成します。
 */
export const createQueue = <T>(name: string, limitPerSec?: number) => {
  const q = new Queue<T>(name, {
    redis: {
      host: config.redis.host ?? 'localhost',
      port: config.redis.port ?? 6379,
    },
    limiter: limitPerSec != null ? {
      max: limitPerSec,
      duration: 1000,
    } : undefined,
  });
  q.on('failed', e => console.log(`[Queue ${name}] job id:${e.id} failed: ${e.failedReason}`));
  q.on('completed', e => console.log(`[Queue ${name}] job id:${e.id} completed`));
  q.on('stalled', e => console.log(`[Queue ${name}] job id:${e.id} is active! ${dayjs(e.timestamp).format('YYYY/MM/DD HH:mm:ss')}`));
  return q;
};
