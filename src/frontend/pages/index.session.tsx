import React, { useEffect, useMemo, useState }  from 'react';

import { Header } from '../components/Header';
import { MisshaiPage } from '../components/MisshaiPage';
import { Tab, TabItem } from '../components/Tab';
import { SettingPage } from '../components/SettingPage';
import { useTranslation } from 'react-i18next';
import { AccountsPage } from '../components/AccountsPage';
import { useDispatch } from 'react-redux';
import { LOCALSTORAGE_KEY_ACCOUNTS } from '../const';
import { IUser } from '../../common/types/user';
import { setAccounts } from '../store/slices/screen';
import { useGetSessionQuery } from '../services/session';
import { AdminPage } from '../components/AdminPage';
import { $get } from '../misc/api';

export const IndexSessionPage: React.VFC = () => {
	const [selectedTab, setSelectedTab] = useState<string>('misshai');
	const {t, i18n} = useTranslation();
	const dispatch = useDispatch();
	const { data } = useGetSessionQuery(undefined);

	useEffect(() => {
		const accounts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[];
		Promise.all(accounts.map(token => $get<IUser>('session', token))).then(a => dispatch(setAccounts(a as IUser[])));
	}, [dispatch]);

	const items = useMemo<TabItem[]>(() => {
		const it: TabItem[] = [];
		it.push({ label: t('_nav.misshai'), key: 'misshai' });
		it.push({ label: t('_nav.accounts'), key: 'accounts' });
		if (data?.isAdmin) {
			it.push({ label: 'Admin', key: 'admin' });
		}
		it.push({ label: t('_nav.settings'), key: 'settings' });
		return it;
	}, [i18n.language, data]);

	const component = useMemo(() => {
		switch (selectedTab) {
			case 'misshai': return <MisshaiPage />;
			case 'accounts': return <AccountsPage />;
			case 'admin': return <AdminPage />;
			case 'settings': return <SettingPage/>;
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
