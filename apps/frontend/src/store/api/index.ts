import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { createTRPCJotai } from 'jotai-trpc';
import type { AppRouter } from 'tools-backend';

export const trpc = createTRPCJotai<AppRouter>({
  links: [
    httpLink({
      url: `${location.origin}/trpc`,
    }),
  ],
})
