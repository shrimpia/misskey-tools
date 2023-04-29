import { accountRouter } from './routers/account.js';
import { announcementsRouter } from './routers/announcements.js';
import { metaRouter } from './routers/meta.js';

import { router } from '@/server/api/trpc.js';

export const appRouter = router({
  meta: metaRouter,
  account: accountRouter,
  announcements: announcementsRouter,
});

export type AppRouter = typeof appRouter;
