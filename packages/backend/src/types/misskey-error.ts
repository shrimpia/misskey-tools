import { MisskeyErrorObject } from '@/types/misskey-error-object.js';

export class MisskeyError extends Error {
  constructor(public error: MisskeyErrorObject) {
    super();
  }
}
