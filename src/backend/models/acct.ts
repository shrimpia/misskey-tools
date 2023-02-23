export type Acct = `@${string}@${string}`;

export const toAcct = (it: {username: string, host: string}): Acct => `@${it.username}@${it.host}`;
