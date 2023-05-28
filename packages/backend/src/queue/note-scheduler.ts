import { Queue, Worker } from 'bullmq';

import { getMisskey } from '@/libs/misskey.js';
import { prisma } from '@/libs/prisma.js';
import { connection } from '@/libs/redis.js';
import { isVisibility } from '@/utils/is-visibility.js';

export type NoteSchedulerQueueType = {
	id: string;
};

export const noteSchedulerQueue = new Queue<NoteSchedulerQueueType>('noteScheduler', { connection });

export const noteSchedulerWorker = new Worker<NoteSchedulerQueueType>('noteScheduler', async (job) => {
  const scheduledNote = await prisma.scheduledNote.findUnique({
    where: { id: job.data.id },
    include: {
      misskeySession: {
        select: {
          token: true,
          host: true,
        },
      },
    },
  });
  if (scheduledNote == null) {
    // データベース上に存在しない場合は処理しない
    // TODO 警告をログに流す
    console.warn(`the scheduled note id:${job.data} is not found. Ignored.`);
    return;
  }
  if (!isVisibility(scheduledNote.visibility)) {
    // 公開範囲の値がおかしい場合は処理しない
    // TODO 警告をログに流す
    console.warn(`the scheduled note id:${job.data} has wrong visibility ${scheduledNote.visibility}. Ignored.`);
    return;
  }
  await getMisskey(scheduledNote.misskeySession.host).request('notes/create', {
    cw: scheduledNote.cw,
    text: scheduledNote.text,
    visibility: scheduledNote.visibility,
    localOnly: scheduledNote.localOnly,
    visibleUserIds: scheduledNote.visibleUserIds,
  }, scheduledNote.misskeySession.token);
}, { connection });
