import IORedis from 'ioredis';

import { config } from '@/config.js';

export const connection = new IORedis(config.redis.port ?? 6379, config.redis.host ?? 'localhost');
