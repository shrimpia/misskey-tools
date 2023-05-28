import dayjs from 'dayjs';

import type { MisskeySession, ScheduledNote } from '@prisma/client';

import { prisma } from '@/libs/prisma.js';
import { queues } from '@/queue';

export const createScheduledNote = async (session: MisskeySession, note: Omit<ScheduledNote, 'id' | 'date' | 'misskeySessionId'>, timestamp: Date): Promise<ScheduledNote> => {
  const data = await prisma.scheduledNote.create({
    data: {
      date: timestamp,
      misskeySessionId: session.id,
      text: note.text,
      cw: note.cw,
      visibility: note.visibility,
      localOnly: note.localOnly,
      visibleUserIds: note.visibleUserIds,
    },
  });
  const delay = dayjs(timestamp).diff(dayjs());
  console.log('note after ' + (delay / 1000) + 's');
  await queues.noteSchedulerQueue.add('noteScheduler', { id: data.id }, {
    delay,
    attempts: 5,
    backoff: 10000,
  });

  return data;
};
