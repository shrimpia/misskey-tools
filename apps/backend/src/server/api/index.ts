import { router } from '@/server/api/trpc.js';
import { metaRouter } from './routers/meta.js';
import { sessionRouter } from './routers/session.js';

export const appRouter = router({
  meta: metaRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
