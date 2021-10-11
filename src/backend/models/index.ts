import { User } from './entities/user';
import { UsedToken } from './entities/used-token';
import { getRepository } from 'typeorm';
import { Announcement } from './entities/announcement';

export const Users = getRepository(User);
export const UsedTokens = getRepository(UsedToken);
export const Announcements = getRepository(Announcement);
