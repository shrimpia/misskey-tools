import { accountRouter } from '@/server/api/routers/account.js';
import { announcementsRouter } from '@/server/api/routers/announcements.js';
import { metaRouter } from '@/server/api/routers/meta.js';
import { scheduleNoteRouter } from '@/server/api/routers/schedule-note.js';
import { router } from '@/server/api/trpc.js';

export const appRouter = router({
  meta: metaRouter,
  account: accountRouter,
  announcements: announcementsRouter,
  scheduleNote: scheduleNoteRouter,
});

export type AppRouter = typeof appRouter;
