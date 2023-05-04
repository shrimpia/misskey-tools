import type { Acct } from '@/types/acct.js';

export const toAcct = (it: { username: string, host: string }): Acct => `@${it.username}@${it.host}`;
