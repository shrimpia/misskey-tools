import React, { PropsWithChildren } from 'react';

import { styled } from '@/libs/stitches';

export type WidgetBaseProp = PropsWithChildren<{
	/**
	 * タイトル
	 */
	title?: string;

	/**
	 * アイコンのCSSクラス
	 */
	iconClass?: string;

	/**
	 * 淡い色合いで表示するかどうか
	 */
	pale?: boolean;
}>;

const Container = styled('div', {
  padding: '$l',
  borderRadius: '$4',
  background: '$card',
  width: 320,
  height: 320,
  textDecoration: 'none',

  '> h1': {
    fontSize: '$m',
    fontWeight: 'bold',
    color: '$primary',
    marginBottom: '$s',

    '> i': {
      marginRight: '$xs',
    },
  },

  variants: {
    pale: {
      true: {
        background: '$cardPale',
      },
    },
  },
});

/**
 * ダッシュボードに配置するウィジェットの外装。
 */
export const WidgetBase: React.FC<WidgetBaseProp> = (p) => {
  return (
    <Container pale={p.pale}>
      {p.title && (
        <h1>{p.iconClass && <i className={p.iconClass}/>}{p.title}</h1>
      )}
      {p.children}
    </Container>
  );
};
