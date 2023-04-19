import { trpcJotai } from ".";

export const metaAtom = trpcJotai.meta.get.atomWithQuery(null);
