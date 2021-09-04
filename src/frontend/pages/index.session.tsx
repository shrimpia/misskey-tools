import React, { useMemo, useState }  from 'react';

import { Header } from '../components/Header';
import { SessionData } from '../components/SessionData';
import { Tab, TabItem } from '../components/Tab';
import { useGetSessionQuery } from '../services/session';

export const IndexSessionPage: React.VFC = () => {
	const { data: session, error, isLoading } = useGetSessionQuery(undefined);
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

	return isLoading ? (
		<div>Loading...</div>
	) : error ? (
		<div>Error: {error}</div>
	) : (
		<>
			<Header>
				<article className="mt-4">
					おかえりなさい、{session?.username}さん。
				</article>
			</Header>
			<div className="xarticle card" style={{borderRadius: 'var(--radius)'}}>
				<Tab items={items} selected={selectedTab} onSelect={setSelectedTab}/>
				<article className="container">
					{selectedTab === 0 && <SessionData /> }
				</article>
			</div>
		</>
	);
};
