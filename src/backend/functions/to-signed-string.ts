/**
 * 数値を符号付き数値の文字列に変換する
 * @param num 数値
 * @returns 符号付き数値の文字列
 */
export const toSignedString = (num: number): string => num < 0 ? num.toString() : '+' + num;
