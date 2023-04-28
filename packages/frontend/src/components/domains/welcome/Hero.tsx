import React from 'react';
import { useTranslation } from 'react-i18next';
import Twemoji from 'react-twemoji';

import { LoginForm } from '@/components/domains/welcome/LoginForm.js';
import { Flex } from '@/components/layouts/Flex.js';
import { VStack } from '@/components/layouts/VStack.js';
import { Text } from '@/components/primitives/Text.js';
import { styled } from '@/libs/stitches.js';

const Container = styled(Flex, {
  marginTop: '30vh',
  padding: '$m',
});

const Title = styled('div', {
  fontSize: '$7xl',
  fontFamily: 'OTADESIGN Rounded',
  color: 'transparent',
  background: 'linear-gradient(to bottom right, $primaryLighten, $primary)',
  backgroundClip: 'text',

  '@phone': {
    fontSize: '$4xl',
  },
});

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const onLogin = (host: string) => {
    location.href = `/login?host=${host}`;
  };

  return (
    <Container direction="vertical" alignItems="center" justifyContent="center">
      <Title>Misskey Tools</Title>
      <VStack gap="xl" alignItems="center" css={{ marginTop: '$s' }}>
        <Text color="muted">
					Made with <Twemoji tag="span">🍶</Twemoji> by Shrimpia Network
        </Text>
        <Text fontSize={{ '@initial': 'xl', '@phone': 'm' }}>
          {t('description')}
        </Text>
        <LoginForm onLogin={onLogin}/>
      </VStack>
    </Container>
  );
};
