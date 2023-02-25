export const visibilities = [
  'public', // パブリック
  'home', // ホーム
  'followers', // フォロワー
  'users' // ログインユーザー (Groundpolis 限定)
] as const;

export type Visibility = typeof visibilities[number];