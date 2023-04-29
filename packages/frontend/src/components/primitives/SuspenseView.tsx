import React, { Suspense } from 'react';

import { slideUpAndFade } from '@/components/keyframes/slide-up-and-fade';
import { Centered } from '@/components/layouts/Centered';
import { Spinner } from '@/components/primitives/Spinner';
import { styled } from '@/libs/stitches';

const Content = styled('div', {
  animation: `${slideUpAndFade} 0.6s $timingFunction$default`,
});

const LoadingContainer = styled(Centered, {
  padding: '$l',

  variants: {
    fullscreen: {
      true: {
        width: '100vw',
        height: '100vh',
      },
    },
  },
});

export type SuspenseViewProp = React.ComponentProps<typeof Content> & {
	fullscreen?: boolean;
};

export const SuspenseView: React.FC<SuspenseViewProp> = (p) => {
  return (
    <Suspense fallback={<LoadingContainer fullscreen={p.fullscreen}><Spinner /></LoadingContainer>}>
      <Content {...p} />
    </Suspense>
  );
};
