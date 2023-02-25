export const defaultTemplate = '昨日のMisskeyの活動は\n\nノート: {notesCount}({notesDelta})\nフォロー : {followingCount}({followingDelta})\nフォロワー :{followersCount}({followersDelta})\n\nでした。\n{url}';

/**
 * 現在のMisskeyアプリトークンバージョン。
 * ver 2:
 *   * 全権限を許可するように（将来的に使うため）
 *   * アプリ名をMisskey Toolsに
 * ver 1:
 *   * 初回バージョン
*/
export const currentTokenVersion = 2;

export const misskeyAppInfo = {
  name: 'Misskey Tools',
  description: 'A Professional Toolkit Designed for Misskey.',
  permission: [
    'read:account',
    'write:account',
    'read:blocks',
    'write:blocks',
    'read:drive',
    'write:drive',
    'read:favorites',
    'write:favorites',
    'read:following',
    'write:following',
    'read:messaging',
    'write:messaging',
    'read:mutes',
    'write:mutes',
    'write:notes',
    'read:notifications',
    'write:notifications',
    'read:reactions',
    'write:reactions',
    'write:votes',
    'read:pages',
    'write:pages',
    'write:page-likes',
    'read:page-likes',
    'read:user-groups',
    'write:user-groups',
    'read:channels',
    'write:channels',
    'read:gallery',
    'write:gallery',
    'read:gallery-likes',
    'write:gallery-likes',
  ],
} as const;
