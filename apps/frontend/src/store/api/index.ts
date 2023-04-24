import { httpLink } from '@trpc/client';
import { createTRPCJotai } from 'jotai-trpc';

import type { AppRouter } from 'tools-backend';

import { LOCALSTORAGE_KEY_TOKEN } from '@/const';

const link = httpLink({
  url: `${location.origin}/api`,
  headers() {
    const token = localStorage[LOCALSTORAGE_KEY_TOKEN];
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  },
});

export const trpcJotai = createTRPCJotai<AppRouter>({
  links: [ link ],
});
