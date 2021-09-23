import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALSTORAGE_KEY_TOKEN } from '../const';
import { useGetScoreQuery, useGetSessionQuery } from '../services/session';
import { Skeleton } from './Skeleton';

export const SessionDataPage: React.VFC = () => {
	const session = useGetSessionQuery(undefined);
	const score = useGetScoreQuery(undefined);
	const {t} = useTranslation();

	/**
	 * Session APIのエラーハンドリング
	 * このAPIがエラーを返した = トークンが無効 なのでトークンを削除してログアウトする
	 */
	useEffect(() => {
		if (session.error) {
			console.error(session.error);
			localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN);
			location.reload();
		}
	}, [session.error]);

	return session.isLoading || score.isLoading ? (
		<div className="vstack">
			<Skeleton width="100%" height="1rem" />
			<Skeleton width="100%" height="1rem" />
			<Skeleton width="100%" height="2rem" />
			<Skeleton width="100%" height="160px" />
		</div>
	) : (
		<div className="fade">
			{session.data && (
				<section>
					<p>{t('welcomeBack', {acct: `@${session.data.username}@${session.data.host}`})}</p>
					<p>
						<strong>
							{t('_missHai.rating')}{': '}
						</strong>
						{session.data.rating}
					</p>
				</section>
			)}
			{score.data && (
				<section>
					<h2>{t('_missHai.data')}</h2>
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
								<td>{score.data.notesCount}</td>
								<td>{score.data.notesDelta}</td>
							</tr>
							<tr>
								<td>{t('following')}</td>
								<td>{score.data.followingCount}</td>
								<td>{score.data.followingDelta}</td>
							</tr>
							<tr>
								<td>{t('followers')}</td>
								<td>{score.data.followersCount}</td>
								<td>{score.data.followersDelta}</td>
							</tr>
						</tbody>
					</table>
				</section>
			)}
		</div>
	);
};
