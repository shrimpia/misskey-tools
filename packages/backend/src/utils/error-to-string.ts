import { MisskeyError } from '@/types/misskey-error.js';

export const errorToString =  (e: Error) => {
  if (e instanceof MisskeyError) {
    return JSON.stringify(e.error, null, '  ');
  }
  return `${e.name}: ${e.message}\n${e.stack}`;
};
