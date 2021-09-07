import React, { useMemo, useState }  from 'react';

import { Header } from '../components/Header';
import { SessionDataPage } from '../components/SessionDataPage';
import { Ranking } from '../components/Ranking';
import { Tab, TabItem } from '../components/Tab';
import { SettingPage } from '../components/SettingPage';

export const IndexSessionPage: React.VFC = () => {
	const [selectedTab, setSelectedTab] = useState<number>(0);

	const items = useMemo<TabItem[]>(() => ([
		{ label: 'データ' },
		{ label: 'ランキング' },
		{ label: '設定' },
	]), []);

	const component = useMemo(() => {
		switch (selectedTab) {
			case 0: return <SessionDataPage />;
			case 1: return <Ranking limit={10}/>;
			case 2: return <SettingPage/>;
			default: return null;
		}
	}, [selectedTab]);

	return (
		<>
			<Header />
			<div className="xarticle card" style={{borderRadius: 'var(--radius)'}}>
				<Tab items={items} selected={selectedTab} onSelect={setSelectedTab}/>
			</div>
			<article className="xarticle mt-4">
				{component}
			</article>
		</>
	);
};
