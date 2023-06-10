import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { DRAFT_DEFAULT, HolicSettings } from '@/components/domains/holic/HolicSettings';
import { VStack } from '@/components/layouts/VStack';
import { PageRoot } from '@/components/PageRoot';
import { Button } from '@/components/primitives/Button';
import { Heading } from '@/components/primitives/Heading';
import { trpc } from '@/libs/trpc';

const MisskeholicUserPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [ sessions ] = trpc.account.getMisskeySessions.useSuspenseQuery();
  const [ holicAccount, { refetch } ] = trpc.holic.getAccount.useSuspenseQuery({ sessionId: id ?? '' });
  const { mutateAsync: createAccount } = trpc.holic.createAccount.useMutation();

  const session = useMemo(() => sessions.find(s => s.id === id), [id, sessions]);

  const [draft, setDraft] = useState(DRAFT_DEFAULT);

  if (session === null) return null;

  const startHolic = async () => {
    if (!session) return;
    await createAccount({
      sessionId: session.id,
      ...draft,
    });
    await refetch();
  };
  return (
    <PageRoot title={t('misskeholicAlert')}>
      <Heading>{t('misskeholicAlert')}</Heading>
      {!holicAccount ? (
        <>
          <VStack>
            <p>いくつかの項目を設定し、ミス廃アラートをセットアップしましょう。</p>
            <HolicSettings draft={draft} onUpdateDraft={setDraft} />
            <Button primaryGradient size="large" css={{ margin: '$xl auto 0 auto' }} onClick={startHolic}>
							ミス廃アラートを開始する
            </Button>
          </VStack>
        </>
      ) : (
        <pre>
          {JSON.stringify(holicAccount, null, '  ')}
        </pre>
      )}
    </PageRoot>
  );
};

export default MisskeholicUserPage;
