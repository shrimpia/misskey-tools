import React from 'react';

export type TabItem = {
	label: string;
};

export type TabProps = {
	items: TabItem[];
	selected: number;
	onSelect: (index: number) => void;
};

// タブコンポーネント
export const Tab: React.VFC<TabProps> = (props) => {
	return (
		<div className="tab">
			{props.items.map((item, index) => {
				return (
					<button
						key={index}
						className={'item ' + (index === props.selected ? 'active' : '')}
						onClick={() => props.onSelect(index)}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
};
