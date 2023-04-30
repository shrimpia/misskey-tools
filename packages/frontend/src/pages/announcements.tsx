import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
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

  const Title = styled('h1', {
    fontSize: '$3xl',
    marginBottom: '$2xl',
  });

  const Section = styled('section', {
    background: '$card',
    borderRadius: '$4',
    padding: '$xl $l',
    lineHeight: 2,

    'h1, h2, h3': {
      marginTop: '$l',
      marginBottom: '$xs',
    },
    'p': {
      marginBottom: '$m',
    },
    li: {
      marginLeft: '$l',
    },

    '@phone': {
      padding: '$m',
    },
  });

  const absoluteTime = useMemo(() => dayjs(announcement.createdAt).format('YYYY/MM/DD hh:mm:ss'), [announcement.createdAt]);
  const relativeTime = useMemo(() => dayjs(announcement.createdAt).locale(language.split('_')[0]).fromNow(), [announcement.createdAt, language]);

  return (
    <PageRoot title={t('announcements') ?? ''}>
      <Title>{announcement.title}{' '}</Title>
      <article>
        <Section>
          <ReactMarkdown>{announcement.body}</ReactMarkdown>

          <Text as="aside" color="muted" fontSize="m" css={{ marginTop: '$l' }}>
            <i className="ti ti-clock" /> {absoluteTime} ({relativeTime})
          </Text>
        </Section>
      </article>
    </PageRoot>
  );
};

export default AnnouncementsPage;
