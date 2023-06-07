export const avg = (values: number[]) => {
  let n = 0;
  for (const value of values) {
    n += value;
  }
  return n / values.length;
};
