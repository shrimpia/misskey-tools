import React, { useEffect }  from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { LOCALSTORAGE_KEY_ACCOUNTS } from '../const';
import { IUser } from '../../common/types/user';
import { setAccounts } from '../store/slices/screen';
import { useGetScoreQuery, useGetSessionQuery } from '../services/session';
import { $get } from '../misc/api';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { Link } from 'react-router-dom';

export const IndexSessionPage: React.VFC = () => {
	const {t} = useTranslation();
	const dispatch = useDispatch();
	const { data: session } = useGetSessionQuery(undefined);
	const score = useGetScoreQuery(undefined);

	const announcements = useAnnouncements();

	useEffect(() => {
		const accounts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_ACCOUNTS) || '[]') as string[];
		Promise.all(accounts.map(token => $get<IUser>('session', token))).then(a => dispatch(setAccounts(a as IUser[])));
	}, [dispatch]);

	return (
		<article className="fade">
			<section>
				<h2><i className="fas fa-bell"></i> {t('announcements')}</h2>
				<div className="large menu xmenu fade">
					{announcements.map(a => (
						<Link className="item fluid" key={a.id} to={`/announcements/${a.id}`}>
							{a.title}
						</Link>
					))}
				</div>
			</section>
			<div className="misshaiPageLayout">
				<section className="misshaiData">
					<h2><i className="fas fa-chart-line"></i> {t('_missHai.data')}</h2>
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
				</section>
				<section className="developerInfo">
					<h2><i className="fas fa-circle-question"></i> {t('_developerInfo.title')}</h2>
					<p>{t('_developerInfo.description')}</p>
					<div className="menu large">
						<a className="item" href="//mk.shrimpia.network/@Lutica" target="_blank" rel="noopener noreferrer">
							<i className="icon fas fa-at"></i>
							Lutica@mk.shrimpia.network
						</a>
					</div>
				</section>
			</div>
		</article>
	);
};
