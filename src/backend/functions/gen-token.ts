import rndstr from 'rndstr';
import { UsedToken } from '../models/entities/used-token.js';
import { UsedTokens } from '../models/index.js';

/**
 * トークンを生成します
 */
export const genToken = async (): Promise<string> => {
  let used: UsedToken | undefined = undefined;
  let token: string;
  do {
    token = rndstr(32);
    used = await UsedTokens.findOne({ token });
  } while (used !== undefined);
  return token;
};
