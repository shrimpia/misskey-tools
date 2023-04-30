import { useAtomValue } from 'jotai';
import React from 'react';

import { styled } from '@/libs/stitches';
import { languageAtom } from '@/store/client-settings';


const Title = styled('h1', {
  fontWeight: 'normal',
  fontSize: '$7xl',
  fontFamily: 'OTADESIGN Rounded',
  color: 'transparent',
  background: 'linear-gradient(to bottom right, $primaryLighten, $primary)',
  backgroundClip: 'text',
  textShadow: '$s',

  '@phone': {
    fontSize: '$4xl',
  },
});

export const Logo = () => {
  const language = useAtomValue(languageAtom);

  return <Title>{language === 'ja_CR' ? 'ミスキ道具' : 'Misskey Tools'}</Title>;
};
