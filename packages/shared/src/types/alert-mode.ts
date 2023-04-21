export const alertModes = [
  'note',
  'notification',
  'both',
  'nothing',
] as const;

export type AlertMode = typeof alertModes[number];
