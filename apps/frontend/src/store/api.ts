import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { createTRPCJotai } from 'jotai-trpc';
import type { AppRouter } from 'tools-backend';

const trpc = createTRPCJotai<AppRouter>({
  links: [
    httpLink({
      url: `${location.origin}/trpc`,
    }),
  ],
})

export const metaAtom = trpc.meta.get.atomWithQuery(null);
