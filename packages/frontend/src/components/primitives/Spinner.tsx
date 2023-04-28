import React from 'react';

import { scaleOut } from '@/components/keyframes/scale-out';
import { styled } from '@/libs/stitches';

const DELAY = 0.09;

export type SpinnerProp = {
  size?: string | number,
};

const Wrapper = styled('div', {
  $$size: '64px',
  position: 'relative',
  width: '$$size',
  height: '$$size',

  '> div': {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '$$size',
    height: '$$size',
    backgroundColor: 'none',
    border: '3px solid $primary',
    opacity: 0,
    translate: 'scale(0)',
    borderRadius: '100%',
    animationName: scaleOut,
    animationDuration: '1.5s',
    animationTimingFunction: '$timingFunction$default',
    animationIterationCount: 'infinite',
  },
});


export const Spinner: React.FC<SpinnerProp> = (p) => {
  return (
    <Wrapper>
      <div />
      <div style={{ animationDelay: `${DELAY * 2}s` }}/>
      <div style={{ animationDelay: `${DELAY * 4}s` }}/>
    </Wrapper>
  );
};
