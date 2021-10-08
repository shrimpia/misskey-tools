import React, { useMemo, useState }  from 'react';

import { Header } from '../components/Header';
import { MisshaiPage } from '../components/MisshaiPage';
import { Tab, TabItem } from '../components/Tab';
import { SettingPage } from '../components/SettingPage';
import { useTranslation } from 'react-i18next';


export const IndexSessionPage: React.VFC = () => {
	const [selectedTab, setSelectedTab] = useState<number>(0);
	const {t, i18n} = useTranslation();

	const items = useMemo<TabItem[]>(() => ([
		{ label: t('_nav.misshai') },
		{ label: t('_nav.settings') },
	]), [i18n.language]);

	const component = useMemo(() => {
		switch (selectedTab) {
			case 0: return <MisshaiPage />;
			case 1: return <SettingPage/>;
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
