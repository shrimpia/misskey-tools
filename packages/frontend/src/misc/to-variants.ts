import type { CSS } from '@stitches/react';

/**
 * デザイントークンから Variant を生成します。
 * @param tokens デザイントークンの配列。
 * @param predicate 各トークンごとのCSS定義を返す関数。
 * @example toVariants(theme.fontSizes, k => ({fontSize: `$${k} !important`}))
 */
export const toVariants = <T extends object>(tokens: T, predicate: (k: keyof T) => CSS) => {
  const keys = Object.keys(tokens) as Array<keyof T>;
  return Object.fromEntries(keys.map(k => [k, predicate(k)])) as Record<keyof T, CSS>;
};
