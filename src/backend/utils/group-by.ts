type GetKeyFunction<K extends PropertyKey, V> = (cur: V, idx: number, src: readonly V[]) => K;

export const groupBy = <K extends PropertyKey, V>(array: readonly V[], getKey: GetKeyFunction<K, V>) => {
  return Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const list = map.get(key);
      if (list) list.push(cur);
      else map.set(key, [cur]);
      return map;
    }, new Map<K, V[]>())
  );
};
