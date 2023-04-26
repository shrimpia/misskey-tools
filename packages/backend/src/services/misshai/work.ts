import { User } from '@prisma/client';

import { api } from '@/libs/misskey.js';
import { prisma } from '@/libs/prisma.js';
import { clearLog, dispatch, printLog } from '@/libs/store.js';
import { format } from '@/services/misshai/format.js';
import { sendNoteAlert, sendNotificationAlert } from '@/services/misshai/send-alert.js';
import { deleteUser, updateRating, updateScore } from '@/services/users/get-user.js';
import { Acct } from '@/types/acct.js';
import { Count } from '@/types/count.js';
import { MiUser } from '@/types/mi-user.js';
import { MisskeyError } from '@/types/misskey-error.js';
import { TimedOutError } from '@/types/timed-out-error.js';
import { delay } from '@/utils/delay.js';
import { errorToString } from '@/utils/error-to-string.js';
import { groupBy } from '@/utils/group-by.js';
import { toAcct } from '@/utils/to-acct.js';

const ERROR_CODES_USER_REMOVED = ['NO_SUCH_USER', 'AUTHENTICATION_FAILED', 'YOUR_ACCOUNT_SUSPENDED'];

// TODO: Redisで持つようにしたい
const userScoreCache = new Map<Acct, Count>();

export const work = async () => {
  dispatch({ nowCalculating: true });

  clearLog();
  printLog('Started.');

  try {
    const users = await prisma.user.findMany();
    const groupedUsers = groupBy(users, u => u.host);

    printLog(`${users.length} アカウントのレート計算を開始します。`);
    await calculateAllRating(groupedUsers);
    dispatch({ nowCalculating: false });

    printLog(`${users.length} アカウントのアラート送信を開始します。`);
    await sendAllAlerts(groupedUsers);

    printLog('ミス廃アラートワーカーは正常に完了しました。');
  } catch (e) {
    printLog('ミス廃アラートワーカーが異常終了しました。', 'error');
    printLog(e instanceof Error ? errorToString(e) : JSON.stringify(e, null, '  '), 'error');
  } finally {
    dispatch({ nowCalculating: false });
  }
};

const calculateAllRating = async (groupedUsers: [string, User[]][]) => {
  return await Promise.all(groupedUsers.map(kv => calculateRating(...kv)));
};

const calculateRating = async (host: string, users: User[]) => {
  for (const user of users) {
    let miUser: MiUser;
    try {
      miUser = await api<MiUser>(user.host, 'i', {}, user.token);
    } catch (e) {
      if (!(e instanceof Error)) {
        printLog('バグ：エラーオブジェクトはErrorを継承していないといけない', 'error');
      } else if (e instanceof MisskeyError) {
        if (ERROR_CODES_USER_REMOVED.includes(e.error.code)) {
          // ユーザーが削除されている場合、レコードからも消してとりやめ
          printLog(`アカウント ${toAcct(user)} は削除されているか、凍結されているか、トークンを失効しています。そのため、本システムからアカウントを削除します。`, 'warn');
          await deleteUser(user.username, user.host);
        } else {
          printLog(`Misskey エラー: ${JSON.stringify(e.error)}`, 'error');
        }
      } else if (e instanceof TimedOutError) {
        printLog(`サーバー ${user.host} との接続に失敗したため、このサーバーのレート計算を中断します。`, 'error');
        return;
      } else {
        // おそらく通信エラー
        printLog(`不明なエラーが発生しました。\n${errorToString(e)}`, 'error');
      }
      continue;
    }
    userScoreCache.set(toAcct(user), miUser);

    await updateRating(user, miUser);
  }
  printLog(`${host} ユーザー(${users.length}人) のレート計算が完了しました。`);
};

const sendAllAlerts = async (groupedUsers: [string, User[]][]) => {
  return await Promise.all(groupedUsers.map(kv => sendAlerts(...kv)));
};

const sendAlerts = async (host: string, users: User[]) => {
  const models = users
    .map(user => {
      const count = userScoreCache.get(toAcct(user));
      if (count == null) return null;
      return {
        user,
        count,
        message: format(user, count),
      };
    })
    .filter(u => u != null) as {user: User, count: Count, message: string}[];

  // 何もしない
  for (const { user, count } of models.filter(m => m.user.alertMode === 'nothing')) {
    await updateScore(user, count);
  }

  // 通知
  for (const { user, count, message } of models.filter(m => m.user.alertMode === 'notification' || m.user.alertMode === 'both')) {
    await sendNotificationAlert(message, user);
    if (user.alertMode === 'notification') {
      await updateScore(user, count);
    }
  }

  // アラート
  for (const { user, count, message } of models.filter(m => m.user.alertMode === 'note' || m.user.alertMode === 'both')) {
    await sendNoteAlert(message, user);
    await Promise.all([
      updateScore(user, count),
      delay(1000),
    ]);
  }

  printLog(`${host} ユーザー(${users.length}人) へのアラート送信が完了しました。`);
};
