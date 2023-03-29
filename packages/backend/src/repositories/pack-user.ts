import {User} from '@prisma/client';
import {IUser} from '../../common/types/user.js';
import {config} from '../config.js';

/**
 * IUser インターフェイスに変換します。
 */
export const packUser = (user: User | null): IUser | null => {
  if (!user) return null;
  const {username: adminName, host: adminHost} = config.admin;

  return {
    ...user,
    isAdmin: adminName === user.username && adminHost === user.host,
  };
};
