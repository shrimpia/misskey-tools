import React from 'react';

import { Hero } from '@/components/domains/welcome/Hero.js';
import { Button } from '@/components/primitives/Button.js';
import { Text } from '@/components/primitives/Text.js';
import { styled } from '@/libs/stitches.js';

const Title = styled('div', {
  fontSize: '$xxxxxl',
  fontFamily: 'OTADESIGN Rounded',
  color: 'transparent',
  background: 'linear-gradient(to bottom right, $primaryLighten, $primary)',
  backgroundClip: 'text',
});

export default function index() {
  return (
    <Hero gap="xl" alignItems="center" justifyContent="center">
      <Title>Misskey Tools</Title>
      <Text fontSize="xxl"><b>ミスキスト必携ツール集。一度使ったら、手放せない。</b></Text>
      <Button radius="5" primaryGradient>
				Misskeyでログイン
      </Button>
    </Hero>
  );
}
