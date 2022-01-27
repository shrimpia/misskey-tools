import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { LOCALSTORAGE_KEY_ACCOUNTS, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { useGetSessionQuery } from '../services/session';
import { useSelector } from '../store';
import { setAccounts } from '../store/slices/screen';
import { LoginForm } from './LoginForm';
import { Skeleton } from './Skeleton';

export const AccountsPage: React.VFC = () => {
	const {data} = useGetSessionQuery(undefined);
	const {t} = useTranslation();
	const dispatch = useDispatch();

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
		<article className="fade">
			<h1 className="text-125 text-bold">{data.username}<span className="text-dimmed">@{data.host}</span></h1>
			<div>
				<strong>{t('_accounts.switchAccount')}</strong>
			</div>
			<div className="menu large fluid mb-2">
				{
					accounts.length === accountTokens.length ? (
						accounts.map(account => (
							<button className="item fluid" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick={() => switchAccount(account.misshaiToken)}>
								<i className="icon bi bi-chevron-right" />
										@{account.username}@{account.host}
								<button className="btn flat text-danger" style={{marginLeft: 'auto'}} onClick={e => {
									const filteredAccounts = accounts.filter(ac => ac.id !== account.id);
									dispatch(setAccounts(filteredAccounts));
									e.stopPropagation();
								}}>
									<i className="bi bi-trash"/>
								</button>
							</button>
						))
					) : (
						<div className="item">...</div>
					)
				}
			</div>
			<LoginForm />
		</article>
	);
};
