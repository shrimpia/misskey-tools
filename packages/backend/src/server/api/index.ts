import { metaRouter } from './routers/meta.js';
import { sessionRouter } from './routers/session.js';

import { router } from '@/server/api/trpc.js';

export const appRouter = router({
  meta: metaRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
