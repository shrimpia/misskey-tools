import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { Draft } from '@/components/domains/note-scheduler/NoteSchedulerForm';

import { NoteSchedulerForm } from '@/components/domains/note-scheduler/NoteSchedulerForm';
import { PageRoot } from '@/components/PageRoot';
import { Heading } from '@/components/primitives/Heading';
import { trpc } from '@/libs/trpc';

const NoteSchedulerNewPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: createAsync, isLoading } = trpc.scheduleNote.create.useMutation();

  const onSubmit = async (draft: Draft) => {
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

  return (
    <PageRoot slim title={`${t('noteScheduler')} - ${t('_noteScheduler.createNew')}`}>
      <Heading as="h1">{t('_noteScheduler.createNew')}</Heading>
      <NoteSchedulerForm disabled={isLoading} onSubmit={onSubmit} />
    </PageRoot>
  );
};

export default NoteSchedulerNewPage;
