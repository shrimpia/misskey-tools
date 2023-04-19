import { LOCALSTORAGE_KEY_TOKEN } from '@/const';
import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { createTRPCJotai } from 'jotai-trpc';
import type { AppRouter } from 'tools-backend';

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

export const trpcClient = createTRPCProxyClient<AppRouter>({
	links: [ link ],
});
