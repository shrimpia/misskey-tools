import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MisskeyAccounts } from '@/components/domains/settings/account/MisskeyAccounts';
import { VStack } from '@/components/layouts/VStack';
import { SubHeading } from '@/components/primitives/Heading';
import { Input } from '@/components/primitives/Input';
import { InputLabel } from '@/components/primitives/InputLabel';
import { SuspenseView } from '@/components/primitives/SuspenseView';
import { Text } from '@/components/primitives/Text';
import { trpc } from '@/libs/trpc';

const AccountSettings: React.FC = () => {
  const [ account, query ] = trpc.account.getMyself.useSuspenseQuery();
  const nameMutation = trpc.account.changeName.useMutation();

  const { t } = useTranslation();

  const [name, setName] = useState(account.name);

  const updateName = async () => {
    await nameMutation.mutateAsync(name);
    await query.refetch();
  };

  return (
    <VStack as="article">
      <section>
        <SubHeading as="h2">Misskey Tools アカウント設定</SubHeading>
        <InputLabel>
          {t('name')}
          <Input type="text" value={name} onChange={e => setName(e.target.value)} onBlur={updateName} />
        </InputLabel>
        <Text as="aside" fontSize="s" color="muted">マイページや質問ボックス、寄付者の表示などで一般に公開されます。個人情報を含まないよう注意してください。</Text>
      </section>
      <section>
        <SubHeading as="h2">連携済み Misskey アカウント</SubHeading>
        <SuspenseView>
          <MisskeyAccounts />
        </SuspenseView>
      </section>
    </VStack>
  );
};

export default AccountSettings;
