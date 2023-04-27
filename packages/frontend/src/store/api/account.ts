import { trpcJotai } from '.';

export const accountAtom = trpcJotai.account.get.atomWithQuery();
