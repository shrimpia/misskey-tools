import React from 'react';

export type TabItem = {
	label: string;
	key: string;
};

export type TabProps = {
	items: TabItem[];
	selected: string;
	onSelect: (key: string) => void;
};

// タブコンポーネント
export const Tab: React.VFC<TabProps> = (props) => {
	return (
		<div className="tab">
			{props.items.map((item) => {
				return (
					<button
						key={item.key}
						className={'item ' + (item.key === props.selected ? 'active' : '')}
						onClick={() => props.onSelect(item.key)}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
};
