
import type { ProcessPromiseFunction } from 'bull';

import { getMisskey } from '@/libs/misskey.js';
import { prisma } from '@/libs/prisma.js';
import { isVisibility } from '@/utils/is-visibility.js';

/**
 * 予約投稿ジョブを処理します
 */
export const processScheduleNote: ProcessPromiseFunction<{id: string}> = async (job) => {
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
};
