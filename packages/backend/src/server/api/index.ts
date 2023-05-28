import { accountRouter } from '@/server/api/routers/account.js';
import { announcementsRouter } from '@/server/api/routers/announcements.js';
import { metaRouter } from '@/server/api/routers/meta.js';
import { noteSchedulerRouter } from '@/server/api/routers/note-scheduler.js';
import { router } from '@/server/api/trpc.js';

export const appRouter = router({
  meta: metaRouter,
  account: accountRouter,
  announcements: announcementsRouter,
  noteScheduler: noteSchedulerRouter,
});

export type AppRouter = typeof appRouter;
