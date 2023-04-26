import { currentTokenVersion } from 'tools-shared/dist/const.js';

import { meta } from '@/config';
import { procedure, router } from '@/server/api/trpc';


export const metaRouter = router({
  get: procedure.query(() => ({
    version: meta.version,
    currentTokenVersion,
  })),
});
