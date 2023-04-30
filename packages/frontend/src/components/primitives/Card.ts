import { styled } from '@/libs/stitches';

export const Card = styled('div', {
  padding: '$l',
  borderRadius: '$4',
  background: '$card',

  variants: {
    pale: {
      true: {
        background: '$cardPale',
      },
    },
  },

  '> h1': {
    fontSize: '$m',
    fontWeight: 'bold',
    color: '$primary',
    marginBottom: '$s',

    '> i': {
      marginRight: '$xs',
    },
  },
});
