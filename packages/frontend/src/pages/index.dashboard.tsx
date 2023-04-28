import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { widgets } from '@/components/domains/dashboard/widgets';
import { PageRoot } from '@/components/PageRoot';
import { Text } from '@/components/primitives/Text';
import { styled } from '@/libs/stitches';
import { accountAtom } from '@/store/api/account';

const Greeting = styled(Text, {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  fontSize: '$3xl',
  marginBottom: '$xl',

  '@phone': {
    fontSize: '$2xl',
    marginBottom: '$xl',
  },
});

const WidgetContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '$l',
  gap: '$l',
});

const DashboardPage: React.FC = () => {
  const account = useAtomValue(accountAtom);
  const { t } = useTranslation();

  const greetingMessage = useMemo(() => {
    const hour = dayjs().hour();
    if (hour <= 4 || 17 <= hour) {
      // 17時から翌日の4時まで夜
      return t('_dashboard.evening', { name: account.name });
    } else if (5 <= hour && hour <= 10) {
      // 5時から10時まで朝
      return t('_dashboard.morning', { name: account.name });
    } else {
      // あとは全部昼
      return t('_dashboard.afternoon', { name: account.name });
    }
  }, [account.name, t]);

  return (
    <PageRoot title={t('dashboard') ?? ''}>
      <Greeting as="h1">{greetingMessage}</Greeting>
      <WidgetContainer>
        {widgets.map(w => <w.render key={w.name} />)}
      </WidgetContainer>
    </PageRoot>
  );
};

export default DashboardPage;
