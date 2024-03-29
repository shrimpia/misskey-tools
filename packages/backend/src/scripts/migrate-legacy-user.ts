import { prisma } from '@/libs/prisma.js';
import { normalize } from '@/utils/visibility.js';

/**
 * user テーブルを Account, MisskeySession, HolicAccount テーブルに移行します。
 */
export const migrateLegacyUser = async () => {
  if ((await prisma.user.count()) === 0) return;
  console.log('System will migrate legacy `user` table into `accounts` table.');
  const users = await prisma.user.findMany();
  for (const user of users) {
    const account = await prisma.account.create({
      data: {
        name: user.username,
        accessToken: user.misshaiToken,
      },
    });
    const session = await prisma.misskeySession.create({
      data: {
        username: user.username,
        host: user.host,
        token: user.token,
        tokenVersion: user.tokenVersion,
        accountId: account.id,
      },
    });
    await prisma.holicAccount.create({
      data: {
        misskeySessionId: session.id,
        alertAsNote: user.alertMode === 'note' || user.alertMode === 'both',
        alertAsNotification: user.alertMode === 'notification' || user.alertMode === 'both',
        noteVisibility: normalize(user.visibility),
        noteLocalOnly: user.localOnly,
        template: user.template,
        bannedFromRanking: user.bannedFromRanking,
        rankingVisible: user.useRanking,
      },
    });
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    console.log(`Processed for ${user.username}@${user.host}`);
  }
  console.log('All done.');
};
