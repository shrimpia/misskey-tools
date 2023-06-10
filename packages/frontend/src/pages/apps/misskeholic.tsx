import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { RouterOutput } from '@/libs/trpc';

import { VStack } from '@/components/layouts/VStack';
import { PageRoot } from '@/components/PageRoot';
import { Button } from '@/components/primitives/Button';
import { Heading } from '@/components/primitives/Heading';
import { styled } from '@/libs/stitches';
import { trpc } from '@/libs/trpc';

const StyledButton = styled('button', {
  borderRadius: '$2',
  padding: '$m',
  background: '$card',
  boxShadow: '$s',
  textDecoration: 'none',
  color: '$fg',
});

type SessionSelectorProp = {
	onSelect?: (session: RouterOutput['account']['getMisskeySessions'][number]) => void;
};

const SessionSelector: React.FC<SessionSelectorProp> = (p) => {
  const [sessions] = trpc.account.getMisskeySessions.useSuspenseQuery();
  const { mutateAsync: run } = trpc.holic.adminForceRunAll.useMutation();

  const onClickForceRunButton = () => run();

  return (
    <>
      <p>Misskey アカウントを選択してください。</p>
      <VStack>
        {sessions.map(s => (
          <StyledButton key={s.id} as={Link} to={`/apps/misskeholic/${s.id}`} onClick={() => {
            p.onSelect?.(s);
          }}>
						@{s.username}@{s.host}
          </StyledButton>
        ))}
      </VStack>
      <Button danger onClick={onClickForceRunButton}>Force RUN</Button>
    </>
  );
};

const MisskeholicPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageRoot title={t('misskeholicAlert')}>
      <Heading>{t('misskeholicAlert')}</Heading>
      <SessionSelector/>
    </PageRoot>
  );
};

export default MisskeholicPage;
