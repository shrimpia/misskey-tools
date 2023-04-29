import { trpcJotai } from '@/libs/trpc';

export const accountAtom = trpcJotai.account.getMyself.atomWithQuery();

export const sessionsAtom = trpcJotai.account.getMisskeySessions.atomWithQuery();
