import { api } from '../backend/services/misskey/misskey.js';
import { prisma } from '../libs/prisma.js';
import {MiUser} from '../backend/types/mi-user.js';
import {updateRating} from '../backend/repositories/get-user.js';

export default async () => {
  const users = await prisma.user.findMany();
  for (const u of users) {
    console.log(`Update rating of ${u.username}@${u.host}...`);
    const miUser = await api<MiUser & { error: unknown }>(u.host, 'users/show', { username: u.username }, u.token);
    if (miUser.error) {
      console.log(`Failed to fetch data of ${u.username}@${u.host}. Skipped`);
      continue;
    }
    await updateRating(u, miUser);
  }
};
