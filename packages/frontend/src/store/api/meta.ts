import { trpcJotai } from '@/libs/trpc';

export const metaAtom = trpcJotai.meta.get.atomWithQuery();
