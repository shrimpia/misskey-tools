import { config, meta } from '@/config.js';
import { startServer } from '@/server/index.js';
import { migrateLegacyUser } from '@/services/migration/legacy-user.js';

export default async () => {
  console.log(`** Misskey Tools ${meta.version} **`);
  console.log('(C) Shrimpia Network');
  await migrateLegacyUser();
  await startServer();
  console.log('GET READY!');
  console.log(`Server URL >> ${config.url}`);
};
