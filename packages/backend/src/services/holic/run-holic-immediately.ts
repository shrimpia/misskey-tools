import { queues } from '@/queue/index.js';

/**
 * 今すぐミス廃アラートを実行するようキューイングします。
 */
export const runHolicImmediately = () => {
  queues.holicCronQueue.add('immediately', null, {
    jobId: 'immediately',
  });
};
