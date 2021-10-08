import React, { useEffect, useMemo, useState }  from 'react';

import { Header } from '../components/Header';
import { MisshaiPage } from '../components/MisshaiPage';
import { Tab, TabItem } from '../components/Tab';
import { SettingPage } from '../components/SettingPage';
import { useTranslation } from 'react-i18next';
import { AccountsPage } from '../components/AccountsPage';
import { useDispatch } from 'react-redux';
import { API_ENDPOINT, LOCALSTORAGE_KEY_ACCOUNTS } from '../const';
import { IUser } from '../../common/types/user';
import { setAccounts } from '../store/slices/screen';

const getSession = (token: string) => {
	return fetch(`${API_ENDPOINT}session`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	}).then(r => r.json()).then(r => r as IUser);
};

export const IndexSessionPage: React.VFC = () => {
	const [selectedTab, setSelectedTab] = useState<number>(0);
	const {t, i18n} = useTranslation();
	const dispatch = useDispatch();

	useEffect(() => {
		const accounts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[];
		Promise.all(accounts.map(getSession)).then(a => dispatch(setAccounts(a)));
	}, [dispatch]);

	const items = useMemo<TabItem[]>(() => ([
		{ label: t('_nav.misshai') },
		{ label: t('_nav.accounts') },
		{ label: t('_nav.settings') },
	]), [i18n.language]);

	const component = useMemo(() => {
		switch (selectedTab) {
			case 0: return <MisshaiPage />;
			case 1: return <AccountsPage />;
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
