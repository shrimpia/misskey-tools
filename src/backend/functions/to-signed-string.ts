export const toSignedString = (num: number): string => num < 0 ? num.toString() : '+' + num;
