import { User } from './entities/user';
import { UsedToken } from './entities/used-token';
import { getRepository } from 'typeorm';

export const Users = getRepository(User);
export const UsedTokens = getRepository(UsedToken);