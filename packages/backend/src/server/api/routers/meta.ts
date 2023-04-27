import { currentTokenVersion } from 'tools-shared/dist/const.js';

import { metaDtoSchema } from '../dto/meta';

import { meta } from '@/config';
import { procedure, router } from '@/server/api/trpc';

export const metaRouter = router({
  get: procedure
    .output(metaDtoSchema)
    .query(() => ({
      version: meta.version,
      currentTokenVersion,
    })),
});
