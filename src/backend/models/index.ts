import { User } from './entities/user.js';
import { UsedToken } from './entities/used-token.js';
import { getRepository } from 'typeorm';
import { Announcement } from './entities/announcement.js';

export const Users = getRepository(User);
export const UsedTokens = getRepository(UsedToken);
export const Announcements = getRepository(Announcement);
