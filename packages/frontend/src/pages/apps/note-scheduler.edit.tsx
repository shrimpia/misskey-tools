import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import type { Draft } from '@/components/domains/note-scheduler/NoteSchedulerForm';

import { NoteSchedulerForm } from '@/components/domains/note-scheduler/NoteSchedulerForm';
import { PageRoot } from '@/components/PageRoot';
import { Heading } from '@/components/primitives/Heading';
import { trpc } from '@/libs/trpc';

const NoteSchedulerEditPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: createAsync, isLoading: isCreating } = trpc.noteScheduler.create.useMutation();
  const { mutateAsync: deleteAsync, isLoading: isDeleting } = trpc.noteScheduler.delete.useMutation();
  const [list] = trpc.noteScheduler.list.useSuspenseQuery();
  const { id } = useParams();

  const note = list.find(n => n.id === id);

  if (!id || !note) throw new Error('no such note');

  const onSubmit = async (draft: Draft) => {
    await deleteAsync(id);
    await createAsync({
      note: {
        cw: draft.isCwEnabled ? draft.cw : null,
        localOnly: draft.localOnly,
        text: draft.text,
        visibility: draft.visibility as any,
        visibleUserIds: [],
      },
      timestamp: dayjs.tz(draft.dateString).utc().toDate(),
      sessionId: draft.sessionId,
    });
    navigate('/apps/note-scheduler');
  };

  const initialNote: Draft = {
    text: note.text,
    isCwEnabled: note.cw != null,
    cw: note.cw ?? '',
    dateString: dayjs(note.date).tz().format('YYYY-MM-DDTHH:mm'),
    visibility: note.visibility,
    localOnly: note.localOnly,
    sessionId: note.misskeySessionId,
  };

  return (
    <PageRoot slim title={`${t('noteScheduler')} - ${t('_noteScheduler.edit')}`}>
      <Heading as="h1">{t('_noteScheduler.edit')}</Heading>
      <NoteSchedulerForm disabled={isCreating || isDeleting} initialNote={initialNote} onSubmit={onSubmit} />
    </PageRoot>
  );
};

export default NoteSchedulerEditPage;
