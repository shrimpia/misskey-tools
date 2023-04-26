type GetKeyFunction<K extends PropertyKey, V> = (cur: V, idx: number, src: readonly V[]) => K;

/**
 * オブジェクト型配列について、選択したキーでグループ化します。
 * @param array グループ化対象の配列。配列の要素はオブジェクトである必要があります。
 * @param getKey キーを選択するための関数。
 */
export const groupBy = <K extends PropertyKey, V>(array: readonly V[], getKey: GetKeyFunction<K, V>) => {
  return Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const list = map.get(key);
      if (list) list.push(cur);
      else map.set(key, [cur]);
      return map;
    }, new Map<K, V[]>()),
  );
};
