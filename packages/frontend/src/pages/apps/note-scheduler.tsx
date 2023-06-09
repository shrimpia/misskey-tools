import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { RouterOutput } from '@/libs/trpc';

import { HStack } from '@/components/layouts/HStack';
import { VStack } from '@/components/layouts/VStack';
import { PageRoot } from '@/components/PageRoot';
import { Alert } from '@/components/primitives/Alert';
import { Button } from '@/components/primitives/Button';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { styled } from '@/libs/stitches';
import { trpc } from '@/libs/trpc';

const NoteCardContainer = styled('div', {
  padding: '$m',
  borderRadius: '$3',
  background: '$card',
  color: '$fg',
  boxShadow: '$s',

  small: {
    color: '$muted',
  },

  variants: {
    pale: {
      true: {
        background: '$cardPale',
        boxShadow: 'none',
      },
    },
  },
});

const Header = styled('div', {
  display: 'flex',
  color: '$muted',
});

const Visibility = styled('div', {
  marginLeft: 'auto',
});

const MarginRight = styled('div', {
  marginRight: '$2xs',
});

const NoteCard: React.FC<{ note: RouterOutput['noteScheduler']['list'][number] }> = ({ note }) => {
  const [deleteConfirmDialogOpened, setDeleteConfirmDialogOpened] = useState(false);

  const { t } = useTranslation();
  const [sessions] = trpc.account.getMisskeySessions.useSuspenseQuery();
  const { mutateAsync: deleteAsync } = trpc.noteScheduler.delete.useMutation();
  const [_, { refetch }] = trpc.noteScheduler.list.useSuspenseQuery();

  const date = dayjs(note.date);
  const session = sessions.find(s => s.id === note.misskeySessionId);

  const deleteConfirm = () => {
    setDeleteConfirmDialogOpened(true);
  };

  const del = async () => {
    await deleteAsync(note.id);
    refetch();
  };

  const sent = date.isBefore(dayjs());

  return (
    <NoteCardContainer pale={sent}>
      <VStack>
        <Header>
          <span>@{session?.username}@{session?.host}</span>
          <Visibility>
            <i className={visibilityIcon[note.visibility]} />
            {note.localOnly && <Text as="i" color="danger" className="ti ti-rocket-off" />}
          </Visibility>
        </Header>
        {note.cw ? (
          <details>
            <summary>{note.cw}</summary>
            {note.text}
          </details>
        ) : <div>{note.text}</div>}


        <Text as="aside" color="muted" fontSize="s">
          <MarginRight as="i" className="ti ti-report" />
          <time dateTime={note.date}>{date.format('YYYY/MM/DD HH:mm')}</time>
          <span>
            {' '}に
            { sent ? '送信済み' : '送信予定' }
          </span>
        </Text>

        <HStack gap="xs" justifyContent="right">
          {!sent && (
            <Button as={Link} to={`/apps/note-scheduler/edit/${note.id}`} flat primary>
              <MarginRight as="i" className="ti ti-edit" /> {t('_noteScheduler.edit')}
            </Button>
          )}
          <Button flat danger onClick={deleteConfirm}>
            <MarginRight as="i" className="ti ti-trash" /> {t('_noteScheduler.delete')}
          </Button>
        </HStack>
      </VStack>
      <Alert
        danger
        hasCancel
        description={t('_noteScheduler.deleteConfirm', { note: note.text })}
        open={deleteConfirmDialogOpened}
        onOpenChange={setDeleteConfirmDialogOpened}
        onOkClick={del}
      />
    </NoteCardContainer>
  );
};

const visibilityIcon: Record<string, string> = {
  public: 'ti ti-world',
  home: 'ti ti-home',
  followers: 'ti ti-lock',
  specified: 'ti ti-mail',
};

const NoteSchedulerPage: React.FC = () => {
  const [notes] = trpc.noteScheduler.list.useSuspenseQuery();
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
          ) : (notes.map(n => <NoteCard note={n} key={n.id} />))}
        </VStack>
      </section>
    </PageRoot>
  );
};

export default NoteSchedulerPage;
