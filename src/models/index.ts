import { User } from './entities/user';
import { getRepository } from 'typeorm';

export const Users = getRepository(User);