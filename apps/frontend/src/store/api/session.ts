import { trpcJotai } from '.';

export const sessionAtom = trpcJotai.session.get.atomWithQuery(null);
