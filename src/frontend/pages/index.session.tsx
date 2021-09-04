import React, { useMemo, useState }  from 'react';

import { Header } from '../components/Header';
import { SessionData } from '../components/SessionData';
import { Ranking } from '../components/Ranking';
import { Tab, TabItem } from '../components/Tab';

export const IndexSessionPage: React.VFC = () => {
	const [selectedTab, setSelectedTab] = useState<number>(0);

	const items = useMemo<TabItem[]>(() => ([
		{
			label: 'データ',
		},
		{
			label: 'ランキング',
		},
		{
			label: '設定',
		},
	]), []);

	const component = useMemo(() => {
		switch (selectedTab) {
			case 0: return <SessionData />;
			case 1: return <Ranking limit={10}/>;
			default: return null;
		}
	}, [selectedTab]);

	return (
		<>
			<Header />
			<div className="xarticle card" style={{borderRadius: 'var(--radius)'}}>
				<Tab items={items} selected={selectedTab} onSelect={setSelectedTab}/>
				<article className="container">
					{component}
				</article>
			</div>
		</>
	);
};
