const allKatakana = [
  ...('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨ'.split('')),
  'ウィ', 'ウェ',
  'キャ', 'キュ', 'キョ',
  'クァ', 'クォ',
  'シャ', 'シュ', 'ショ',
  'チャ', 'チュ', 'チョ',
  'ヒャ',	'ヒュ',	'ヒョ',
  'ミャ',	'ミュ',	'ミョ'
];

const allInfix = [ '', 'ー', 'ッ' ];

const getRandomKatakana = () => allKatakana[Math.floor(Math.random() * allKatakana.length)];
const getRandomInfix = () => allInfix[Math.floor(Math.random() * allInfix.length)];

export const createGacha = () => {
  return [
    getRandomKatakana(),
    getRandomInfix(),
    getRandomKatakana(),
    getRandomInfix(),
    ...(new Array(Math.floor(Math.random() * 2 + 1)).fill('').map(() => getRandomKatakana()))
  ].join('');
};
