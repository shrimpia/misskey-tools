import { trpcJotai } from '@/store/api';

export const accountAtom = trpcJotai.account.getMyself.atomWithQuery();

export const sessionsAtom = trpcJotai.account.getMisskeySessions.atomWithQuery();
