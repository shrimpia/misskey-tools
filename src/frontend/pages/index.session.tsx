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
import { useGetMetaQuery, useGetSessionQuery } from '../services/session';
import { AdminPage } from '../components/AdminPage';
import { $get } from '../misc/api';
import { NekomimiPage } from '../components/NekomimiPage';
import { Card } from '../components/Card';
import { CurrentUser } from '../components/CurrentUser';

export const IndexSessionPage: React.VFC = () => {
	const [selectedTab, setSelectedTab] = useState<string>('misshai');
	const {t, i18n} = useTranslation();
	const dispatch = useDispatch();
	const { data: session } = useGetSessionQuery(undefined);
	const { data: meta } = useGetMetaQuery(undefined);

	useEffect(() => {
		const accounts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[];
		Promise.all(accounts.map(token => $get<IUser>('session', token))).then(a => dispatch(setAccounts(a as IUser[])));
	}, [dispatch]);

	const items = useMemo<TabItem[]>(() => {
		const it: TabItem[] = [];
		it.push({ label: t('_nav.misshai'), key: 'misshai' });
		it.push({ label: t('_nav.accounts'), key: 'accounts' });
		it.push({ label: t('_nav.catAdjuster'), key: 'nekomimi' });
		if (session?.isAdmin) {
			it.push({ label: 'Admin', key: 'admin' });
		}
		it.push({ label: t('_nav.settings'), key: 'settings' });
		return it;
	}, [i18n.language, session]);

	const component = useMemo(() => {
		switch (selectedTab) {
			case 'misshai': return <MisshaiPage />;
			case 'accounts': return <AccountsPage />;
			case 'admin': return <AdminPage />;
			case 'nekomimi': return <NekomimiPage />;
			case 'settings': return <SettingPage/>;
			default: return null;
		}
	}, [selectedTab]);

	return (
		<>
			<div className="xarticle vgroup shadow-4" style={{position: 'sticky', top: 0, zIndex: 100}}>
				<Header />
				<div className="card">
					<Tab items={items} selected={selectedTab} onSelect={setSelectedTab}/>
				</div>
			</div>
			<div className="xarticle mt-2">
				<Card className="mb-2">
					<CurrentUser/>
					{session && meta && meta.currentTokenVersion !== session.tokenVersion && (
						<div className="text-danger mt-1">
							{t('shouldUpdateToken')}
							<a href={`/login?host=${encodeURIComponent(session.host)}`}>{t('update')}</a>
						</div>
					)}
				</Card>
				{component}
			</div>
		</>
	);
};
