export interface ModalTypeMenu {
  type: 'menu';
  screenX: number;
  screenY: number;
  items: MenuItem[];
}

export type MenuItemClassName = `fas fa-${string}`;

export interface MenuItem {
  icon?: MenuItemClassName;
  name: string;
  onClick: VoidFunction;
  disabled?: boolean;
  danger?: boolean;
}
