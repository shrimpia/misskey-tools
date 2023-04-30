import { useAtomValue } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/components/domains/welcome/LoginForm';
import { VStack } from '@/components/layouts/VStack';
import { Logo } from '@/components/Logo';
import { PageRoot } from '@/components/PageRoot';
import { Card } from '@/components/primitives/Card';
import { metaAtom } from '@/store/api/meta';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const meta = useAtomValue(metaAtom);

  const share = (host: string) => {
    window.open(`https://${host}/share?text=${encodeURIComponent(t('shareMisskeyToolsNote') ?? '')}`);
  };

  return (
    <PageRoot title={t('aboutMisskeyTools')}>
      <VStack gap="l">
        <VStack alignItems="center">
          <Logo /> ver {meta.version}
        </VStack>
        <Card pale>
          <h1><i className="ti ti-user-circle" /> {t('developer')}</h1>
          <p>Ebise Lutica</p>
          <ul>
            <li>Misskey: @lutica@mk.shrimpia.network</li>
            <li>Email: <a href="mailto:shrimpia@shrimpia.network">shrimpia@shrimpia.network</a></li>
          </ul>
          <p>
            {t('developedAsOpenSourceSoftware')}<br/>
            <a href="https://github.com/shrimpia/misskey-tools" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </Card>
        <Card pale>
          <h1><i className="ti ti-share-2" />{t('shareMisskeyTools')}</h1>
          <LoginForm buttonText={t('share') ?? ''} onLogin={share} />
        </Card>
        <Card pale>
          <h1><i className="ti ti-chart-line" /> {t('statistics')}</h1>
          <p>TBD</p>
        </Card>
        <Card pale>
          <h1><i className="ti ti-award-filled" /> {t('sponsors')}</h1>
          <p>TBD</p>
        </Card>
      </VStack>
    </PageRoot>
  );
};

export default AboutPage;
