import { trpc } from ".";

export const metaAtom = trpc.meta.get.atomWithQuery(null);
