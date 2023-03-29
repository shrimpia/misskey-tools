/**
 * 指定したミリ秒単位の時間だけ待機する Promise を生成します。
 * await delay(5000) とすると、5秒間待機します。
 * @param ms
 */
export const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));
