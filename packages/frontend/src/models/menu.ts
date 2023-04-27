type MenuItemCommon = {
	label: string;
	iconClassName?: string;
	disabled?: boolean;
};

export type MenuItem =
	| MenuItemHeading
	| MenuItemLink
	| MenuItemButton
	| MenuItemSeparator
	| MenuItemSub
	;

export type MenuItemLink = MenuItemCommon & {
	type: 'link';
	href: string;
	target?: string;
	rel?: string;
};

export type MenuItemButton = MenuItemCommon & {
	type: 'button';
	onClick?: () => void;
};

export type MenuItemSub = MenuItemCommon & {
	type: 'sub',
	items: MenuItem[];
};

export type MenuItemSeparator = {
	type: 'seprator';
};

export type MenuItemHeading = {
	type: 'heading';
	label: string;
};
