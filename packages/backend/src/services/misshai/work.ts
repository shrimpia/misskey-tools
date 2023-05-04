
import type { PromisedReturnType } from '@/types/promised-return-type';

import { prisma } from '@/libs/prisma.js';

// const ERROR_CODES_USER_REMOVED = ['NO_SUCH_USER', 'AUTHENTICATION_FAILED', 'YOUR_ACCOUNT_SUSPENDED'];

export const work = async () => {
  // TODO 作り直し
};

const getAllAccounts = async () => {
  return await prisma.misshaiAccount.findMany({
    select: {
      alertAsNote: true,
      alertAsNotification: true,
      noteVisibility: true,
      noteLocalOnly: true,
      template: true,

      misskeySession: {
        select: {
          username: true,
          host: true,
          token: true,
        },
      },
    },
  });
};

export type Account = (PromisedReturnType<typeof getAllAccounts>)[0];
