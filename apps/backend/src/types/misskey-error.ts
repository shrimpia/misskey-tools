import {MisskeyErrorObject} from './misskey-error-object.js';

export class MisskeyError extends Error {
  constructor(public error: MisskeyErrorObject) {
    super();
  }
}
