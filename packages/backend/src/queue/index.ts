import { holicAggregateQueue, holicAggregateWorker } from './holic-aggregate.js';
import { holicCronQueue, holicCronWorker } from './holic-cron.js';
import { holicNoteQueue, holicNoteWorker } from './holic-note.js';
import { holicNotificationQueue, holicNotificationWorker } from './holic-notification.js';
import { noteSchedulerQueue, noteSchedulerWorker } from './note-scheduler.js';

export const queues = {
  noteSchedulerQueue,
  holicAggregateQueue,
  holicCronQueue,
  holicNoteQueue,
  holicNotificationQueue,
};

export const workers = {
  noteSchedulerWorker,
  holicAggregateWorker,
  holicCronWorker,
  holicNoteWorker,
  holicNotificationWorker,
};
