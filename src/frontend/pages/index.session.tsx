import React, { useEffect }  from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { LOCALSTORAGE_KEY_ACCOUNTS } from '../const';
import { IUser } from '../../common/types/user';
import { setAccounts } from '../store/slices/screen';
import { useGetScoreQuery, useGetSessionQuery } from '../services/session';
import { $get } from '../misc/api';
import { AnnouncementList } from '../components/AnnouncementList';
import { DeveloperInfo } from '../components/DeveloperInfo';

export const IndexSessionPage: React.VFC = () => {
	const {t} = useTranslation();
	const dispatch = useDispatch();
	const { data: session } = useGetSessionQuery(undefined);
	const score = useGetScoreQuery(undefined);

	useEffect(() => {
		const accounts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[];
		Promise.all(accounts.map(token => $get<IUser>('session', token))).then(a => dispatch(setAccounts(a as IUser[])));
	}, [dispatch]);

	return (
		<div className="vstack fade">
			<div className="card announcement">
				<div className="body">
					<AnnouncementList />
				</div>
			</div>
			<div className="misshaiPageLayout">
				<div className="card misshaiData">
					<div className="body">
						<h1><i className="fas fa-chart-line"></i> {t('_missHai.data')}</h1>
						<table className="table fluid">
							<thead>
								<tr>
									<th></th>
									<th>{t('_missHai.dataScore')}</th>
									<th>{t('_missHai.dataDelta')}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{t('notes')}</td>
									<td>{score.data?.notesCount ?? '...'}</td>
									<td>{score.data?.notesDelta ?? '...'}</td>
								</tr>
								<tr>
									<td>{t('following')}</td>
									<td>{score.data?.followingCount ?? '...'}</td>
									<td>{score.data?.followingDelta ?? '...'}</td>
								</tr>
								<tr>
									<td>{t('followers')}</td>
									<td>{score.data?.followersCount ?? '...'}</td>
									<td>{score.data?.followersDelta ?? '...'}</td>
								</tr>
							</tbody>
						</table>
						<p>
							<strong>
								{t('_missHai.rating')}{': '}
							</strong>
							{session?.rating ?? '...'}
						</p>
					</div>
				</div>
				<div className="card developerInfo">
					<div className="body">
						<DeveloperInfo />
					</div>
				</div>
			</div>
		</div>
	);
};
