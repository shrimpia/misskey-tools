import { atom } from 'jotai';

import { trpcJotai } from '@/store/api';

export const announcementListAtom = trpcJotai.announcements.getAll.atomWithQuery();

export const currentAnnouncementIdAtom = atom(0);

export const announcementAtom = trpcJotai.announcements.get.atomWithQuery((get) => get(currentAnnouncementIdAtom));

export const likeAtom = trpcJotai.announcements.like.atomWithMutation();
