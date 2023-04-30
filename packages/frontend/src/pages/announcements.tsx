import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import Twemoji from 'react-twemoji';

import { PageRoot } from '@/components/PageRoot';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { styled } from '@/libs/stitches';
import { trpc } from '@/libs/trpc';
import { token } from '@/misc/token';
import { languageAtom } from '@/store/client-settings';

const Title = styled('h1', {
  fontSize: '$3xl',
  marginBottom: '$2xl',
});

const Article = styled('article', {
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

const AnnouncementsPage: React.FC = () => {
  const { id: _id } = useParams<{id: string}>();
  const id = Number(_id);
  const [announcement] = trpc.announcements.get.useSuspenseQuery(Number(id));
  const likeMutation = trpc.announcements.like.useMutation();
  const language = useAtomValue(languageAtom);
  const { t } = useTranslation();

  const [like, setLike] = useState(announcement.like);

  const absoluteTime = useMemo(() => dayjs(announcement.createdAt).format('YYYY/MM/DD hh:mm:ss'), [announcement.createdAt]);
  const relativeTime = useMemo(() => dayjs(announcement.createdAt).locale(language.split('_')[0]).fromNow(), [announcement.createdAt, language]);

  const incrementLike = async () => {
    setLike(await likeMutation.mutateAsync(id));
  };

  return (
    <PageRoot title={t('announcements') ?? ''}>
      <Title>{announcement.title}{' '}</Title>
      <Article>
        <ReactMarkdown>{announcement.body}</ReactMarkdown>

        <Text as="aside" color="muted" fontSize="m" css={{ marginTop: '$l' }}>
          <i className="ti ti-clock" /> {absoluteTime} ({relativeTime})
        </Text>

        {token && <Button flat onClick={incrementLike}><Twemoji>👍</Twemoji>&nbsp;{like}</Button>}
      </Article>
    </PageRoot>
  );
};

export default AnnouncementsPage;
