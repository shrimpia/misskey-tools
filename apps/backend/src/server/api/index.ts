import { router } from '@/libs/trpc.js';
import { metaRouter } from './routers/meta';

export const appRouter = router({
	meta: metaRouter,
});

export type AppRouter = typeof appRouter;
