import React from 'react';
import { useTranslation } from 'react-i18next';
import Twemoji from 'react-twemoji';

import { Hero } from '@/components/domains/welcome/Hero.js';
import { Article } from '@/components/layouts/Article.js';
import { Text } from '@/components/primitives/Text.js';
import { styled } from '@/libs/stitches.js';

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


export default function index() {
  const { t } = useTranslation();

  return (
    <>
      <Hero	/>
      <Text fontSize="xl" align="center">
        <Twemoji>👍&emsp;❤&emsp;😆&emsp;🎉&emsp;🍮</Twemoji>
      </Text>
      <Article>
        <Features>
          <Feature>
            <h2>{t('missHaiAlert')}</h2>
            <p>{t('_welcome.misshaiAlertDescription')}</p>
            <p>{t('_welcome.misshaiRankingDescription')}</p>
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
    </>
  );
}
