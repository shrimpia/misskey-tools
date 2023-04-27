import { trpcJotai } from '@/store/api';

export const accountAtom = trpcJotai.account.getMyself.atomWithQuery();
