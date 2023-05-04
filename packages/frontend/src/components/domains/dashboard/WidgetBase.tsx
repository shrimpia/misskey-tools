import React from 'react';

import type { PropsWithChildren } from 'react';

import { Card } from '@/components/primitives/Card';
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

const Container = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  width: 320,
  height: 320,
  textDecoration: 'none',
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
