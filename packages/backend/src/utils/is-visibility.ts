import { noteVisibilities } from 'misskey-js';

export const isVisibility = (visibility: any): visibility is typeof noteVisibilities[number] => {
  return noteVisibilities.includes(visibility);
};
