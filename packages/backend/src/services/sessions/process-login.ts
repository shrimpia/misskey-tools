import { currentTokenVersion } from 'tools-shared/dist/const.js';

import type { UserDetailed as MkUser } from 'misskey-js/built/entities.js';

import { prisma } from '@/libs/prisma.js';
import { generateAccessToken } from '@/services/accounts/generate-access-token.js';
import { getSessionByMisskeyAcct } from '@/services/sessions/get-session-by-misskey-acct';

/**
 * Misskey認証によるログイン処理
 * @return アクセストークン。
 */
export const processLogin = async (misskeyUser: MkUser, host: string, misskeyToken: string): Promise<string> => {
  const session = await getSessionByMisskeyAcct(misskeyUser.username, host);

  if (!session) {
    // アカウントを作成する
    const accessToken = await generateAccessToken();
    await prisma.account.create({
      data: {
        accessToken,
        name: misskeyUser.username,
        misskeySessions: {
          create: {
            username: misskeyUser.username,
            host,
            token: misskeyToken,
            tokenVersion: currentTokenVersion,
          },
        },
      },
      // Note: 少しでもデータ転送量を抑える（Prismaはcreateの後に絶対selectを実行してしまう）
      select: { id: true },
    });
    return accessToken;
  }

  // Misskey トークンを更新する
  await prisma.misskeySession.update({
    where: { id: session.id },
    data: { token: misskeyToken },
  });

  return session.account.accessToken;
};
