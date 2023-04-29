import { currentTokenVersion } from 'tools-shared/dist/const.js';

import { meta } from '@/config';
import { metaDtoSchema } from '@/server/api/dto/meta';
import { procedure, router } from '@/server/api/trpc';

export const metaRouter = router({
  get: procedure
    .output(metaDtoSchema)
    .query(() => ({
      version: meta.version,
      currentTokenVersion,
    })),
});
