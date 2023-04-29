import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { PageRoot } from '@/components/PageRoot';
import { Text } from '@/components/primitives/Text';
import { styled } from '@/libs/stitches';
import { trpc } from '@/libs/trpc';
import { languageAtom } from '@/store/client-settings';

const AnnouncementsPage: React.FC = () => {
  const { id } = useParams<{id: string}>();

  const [announcement] = trpc.announcements.get.useSuspenseQuery(Number(id));

  const language = useAtomValue(languageAtom);

  const { t } = useTranslation();

  const Section = styled('section', {
    padding: '$m',
    'h1, h2, h3': {
      marginTop: '$l',
      marginBottom: '$xs',
    },
    'p, ul': {
      marginBottom: '$m',
    },
    li: {
      marginLeft: '$l',
    },
  });

  return (
    <PageRoot title={t('announcements') ?? ''}>
      <article>
        <h2>
          {announcement.title}{' '}
        </h2>
        <Text as="aside" color="muted" fontSize="m" css={{ marginLeft: '$l' }}>
          <i className="ti ti-clock" />&nbsp;
          {dayjs(announcement.createdAt).locale(language.split('_')[0]).fromNow()}
        </Text>
        <Section>
          <ReactMarkdown>{announcement.body}</ReactMarkdown>
        </Section>
      </article>
    </PageRoot>
  );
};

export default AnnouncementsPage;
