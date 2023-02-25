import {MisskeyError} from '../services/misskey.js';

export const errorToString =  (e: Error) => {
  if (e instanceof MisskeyError) {
    return JSON.stringify(e.error, null, '  ');
  }
  return `${e.name}: ${e.message}\n${e.stack}`;
};
