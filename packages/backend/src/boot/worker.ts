import cron from 'node-cron';

import { work } from '@/services/misshai/work.js';

export default (): void => {
  cron.schedule('0 0 0 * * *', work);
};
