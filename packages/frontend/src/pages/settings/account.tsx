import React from 'react';
import { useTranslation } from 'react-i18next';

import { MisskeyAccounts } from '@/components/domains/settings/account/MisskeyAccounts';
import { VStack } from '@/components/layouts/VStack';
import { SubHeading } from '@/components/primitives/Heading';
import { Input } from '@/components/primitives/Input';
import { InputLabel } from '@/components/primitives/InputLabel';
import { SuspenseView } from '@/components/primitives/SuspenseView';

const AccountSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <VStack as="article">
      <section>
        <InputLabel>
          {t('name')}
          <Input type="text" />
        </InputLabel>
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
