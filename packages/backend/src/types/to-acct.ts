import {Acct} from './acct.js';

export const toAcct = (it: { username: string, host: string }): Acct => `@${it.username}@${it.host}`;
