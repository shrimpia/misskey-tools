import { accountRouter } from './routers/account.js';
import { metaRouter } from './routers/meta.js';

import { router } from '@/server/api/trpc.js';

export const appRouter = router({
  meta: metaRouter,
  account: accountRouter,
});

export type AppRouter = typeof appRouter;
