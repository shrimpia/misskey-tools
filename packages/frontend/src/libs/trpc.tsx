import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { createTRPCJotai } from 'jotai-trpc';
import React, { PropsWithChildren } from 'react';

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

const init = {
  links: [ link ],
};

export const trpcJotai = createTRPCJotai<AppRouter>({
  links: [ link ],
});

export const trpc = createTRPCReact<AppRouter, unknown, 'ExperimentalSuspense'>();

const providerInit = {
  client: trpc.createClient(init),
  queryClient: new QueryClient(),
};

export const TRPCProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <trpc.Provider {...providerInit}>
      <QueryClientProvider client={providerInit.queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
