import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { useGetSessionQuery } from '../services/session';
import { useSelector } from '../store';
import { setAccounts } from '../store/slices/screen';
import { LoginForm } from '../components/LoginForm';
import { Skeleton } from '../components/Skeleton';
import { useTitle } from '../hooks/useTitle';

export const AccountsPage: React.VFC = () => {
	const {data} = useGetSessionQuery(undefined);
	const {t} = useTranslation();
	const dispatch = useDispatch();

	useTitle('_sidebar.accounts');

	const {accounts, accountTokens} = useSelector(state => state.screen);

	const switchAccount = (token: string) => {
		const newAccounts = accountTokens.filter(a => a !== token);
		newAccounts.push(localStorage.getItem(LOCALSTORAGE_KEY_TOKEN) ?? '');
		localStorage.setItem(LOCALSTORAGE_KEY_ACCOUNTS, JSON.stringify(newAccounts));
		localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, token);
		location.reload();
	};

	return !data ? (
		<div className="vstack">
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	) :  (
		<article className="card fade">
			<div className="body">
				<div>
					<strong>{t('_accounts.switchAccount')}</strong>
				</div>
				<div className="menu large fluid mb-2">
					{
						accounts.length === accountTokens.length ? (
							accounts.map(account => (
								<button className="item fluid" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick={() => switchAccount(account.misshaiToken)}>
									<i className="icon fas fa-chevron-right" />
										@{account.username}@{account.host}
									<button className="btn flat text-danger" style={{marginLeft: 'auto'}} onClick={e => {
										const filteredAccounts = accounts.filter(ac => ac.id !== account.id);
										dispatch(setAccounts(filteredAccounts));
										e.stopPropagation();
									}}>
										<i className="fas fa-trash-can"/>
									</button>
								</button>
							))
						) : (
							<div className="item">...</div>
						)
					}
				</div>
				<LoginForm />
			</div>
		</article>
	);
};