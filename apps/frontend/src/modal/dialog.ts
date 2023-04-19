export interface ModalTypeDialog {
  type: 'dialog';
  title?: string | null;
  message: string;
  icon?: DialogIcon;
  buttons?: DialogButtonType;
  primaryClassName?: string;
  onSelect?: (clickedButtonIndex: number) => void;
}

export type DialogIcon = 'info' | 'warning' | 'error' | 'question';

export type DialogButtonType = 'ok' | 'yesNo' | DialogButton[];

export type DialogButtonStyle = 'primary' | 'danger';

export interface DialogButton {
  text: string;
  style?: DialogButtonStyle;
}

export const builtinDialogButtonOk: DialogButton = {
  text: 'OK',
  style: 'primary',
};

export const builtinDialogButtonYes: DialogButton = {
  text: 'はい',
  style: 'primary',
};

export const builtinDialogButtonNo: DialogButton = {
  text: 'いいえ',
};
