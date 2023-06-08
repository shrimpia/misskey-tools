import React from 'react';
import GithubCorner from 'react-github-corner';
import { useTranslation } from 'react-i18next';
import Twemoji from 'react-twemoji';

import { LoginForm } from '@/components/domains/welcome/LoginForm';
import { Article } from '@/components/layouts/Article';
import { Flex } from '@/components/layouts/Flex';
import { VStack } from '@/components/layouts/VStack';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/primitives/Text';
import { styled } from '@/libs/stitches';

const Container = styled(Flex, {
  marginTop: '30vh',
  padding: '$m',
});

const Features = styled('article', {
  display: 'grid',
  gap: '$l',
  marginTop: '$xl',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
});

const Feature = styled('section', {
  padding: '$l',
  borderRadius: '$4',
  background: '$cardPale',
  '> h2': {
    fontSize: '$l',
    marginBottom: '$s',
  },
});

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  const onLogin = (host: string) => {
    location.href = `/login?host=${host}`;
  };
  return (
    <div>
      <GithubCorner href="https://github.com/shrimpia/misskey-tools" />
      <Container direction="vertical" alignItems="center" justifyContent="center">
        <Logo />
        <VStack gap="xl" alignItems="center" css={{ marginTop: '$s' }}>
          <Text color="muted">
					Made with <Twemoji tag="span">🦐</Twemoji> by Shrimpia Network
          </Text>
          <Text fontSize={{ '@initial': 'xl', '@phone': 'm' }}>
            {t('description')}
          </Text>
          <LoginForm onLogin={onLogin}/>
        </VStack>
      </Container>
      <Text fontSize="xl" align="center">
        <Twemoji>👍&emsp;❤&emsp;😆&emsp;🎉&emsp;🍮</Twemoji>
      </Text>
      <Article>
        <Features>
          <Feature>
            <h2>{t('misskeholicAlert')}</h2>
            <p>{t('_welcome.misskeholicAlertDescription')}</p>
            <p>{t('_welcome.misskeholicRankingDescription')}</p>
          </Feature>
          <Feature>
            <h2>{t('avatarCropper')}</h2>
            <p>{t('_welcome.avatarCropperDescription')}</p>
          </Feature>
          <Feature>
            <h2>{t('questionBox')}</h2>
            <p>{t('_welcome.questionBoxDescription')}</p>
          </Feature>
          <Feature>
            <h2>{t('followingManager')}</h2>
            <p>{t('_welcome.followingManagerDescription')}</p>
          </Feature>
          <Feature>
            <h2>{t('myPage')}</h2>
            <p>{t('_welcome.myPageDescription')}</p>
          </Feature>
        </Features>
      </Article>
    </div>
  );
};

export default WelcomePage;
