
import React from 'react';
import { Helmet } from 'react-helmet';

import type { PropsWithChildren } from 'react';

import { styled } from '@/libs/stitches';

const Container = styled('main', {
  width: '100%',
  padding: '$xl',
  margin: '0 auto',
  marginTop: '$2xl',
  maxWidth: 1400,

  '@pad': {
    padding: '$m',
  },

  '@phone': {
    padding: '$s',
  },

  variants: {
    slim: {
      true: {
        maxWidth: 800,
      },
    },
  },
});

export type PageRootProp = PropsWithChildren<{
	title?: string;
	slim?: boolean;
}>;

export const PageRoot: React.FC<PageRootProp> = (p) => {
  return (
    <Container slim={p.slim ?? false}>
      <Helmet>
        {p.title && <title>{p.title} | Misskey Tools</title>}
      </Helmet>
      {p.children}
    </Container>
  );
};
