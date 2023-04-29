import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { widget } from '@/components/domains/dashboard/def';
import { VStack } from '@/components/layouts/VStack';
import { Badge } from '@/components/primitives/Badge';
import { Text } from '@/components/primitives/Text';
import { styled } from '@/libs/stitches';
import { trpc } from '@/libs/trpc';

const Container = styled(Link, {
  display: 'block',
  padding: '$2xs',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '$2',

  '&:hover': {
    background: '$flatHover',
  },
});

const Title = styled('div', {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export default widget('announcements', 'ti ti-speakerphone', false, () => {
  const [announcements] = trpc.announcements.getAll.useSuspenseQuery();

  const data = useMemo(() => announcements.map(d => ({
    id: d.id,
    timestamp: dayjs(d.createdAt).format('YYYY/MM/DD hh:mm'),
    title: d.title,
    new: true,
    link: `/announcements/${d.id}`,
  })), [announcements]);

  return (
    <VStack gap="xs">
      {data.map(a => (
        <Container to={a.link} key={a.id}>
          <Title>{a.title}</Title>
          <div>
            <Text fontSize="s" color="muted">{a.timestamp}</Text>
            {a.new && <Badge css={{ marginLeft: '$2xs' }}>NEW</Badge>}
          </div>
        </Container>
      ))}
    </VStack>
  );
});
