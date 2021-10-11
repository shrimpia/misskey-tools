import { ModalTypeDialog } from './dialog';
import { ModalTypeMenu } from './menu';

export type Modal =
	| ModalTypeMenu
	| ModalTypeDialog;

