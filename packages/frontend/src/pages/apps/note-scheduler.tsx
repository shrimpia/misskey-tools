import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { VStack } from '@/components/layouts/VStack';
import { PageRoot } from '@/components/PageRoot';
import { Button } from '@/components/primitives/Button';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { trpc } from '@/libs/trpc';

const NoteSchedulerPage: React.FC = () => {
  const [notes] = trpc.scheduleNote.list.useSuspenseQuery();
  const { t } = useTranslation();

  return (
    <PageRoot slim title={t('noteScheduler')}>
      <section>
        <Heading as="h1">
					予約投稿
          <Button as={Link} to="/apps/note-scheduler/new" inline flat primary>
            <i className="ti ti-circle-plus"></i>
          </Button>
        </Heading>
        <VStack>
          {notes.length === 0 ? (
            <Text as="p" color="muted">
						予約投稿はまだ作成されていません。
            </Text>
          ) : (notes.map(n => <p key={n.id}>{n.text}</p>))}
        </VStack>
      </section>
    </PageRoot>
  );
};

export default NoteSchedulerPage;
