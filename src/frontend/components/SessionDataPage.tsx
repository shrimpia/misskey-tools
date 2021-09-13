import React, { useEffect } from 'react';
import { LOCALSTORAGE_KEY_TOKEN } from '../const';
import { useGetScoreQuery, useGetSessionQuery } from '../services/session';
import { Skeleton } from './Skeleton';

export const SessionDataPage: React.VFC = () => {
	const session = useGetSessionQuery(undefined);
	const score = useGetScoreQuery(undefined);

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
					<p>
						おかえりなさい、
						<a
							href={`https://${session.data.host}/@${session.data.username}`}
							target="_blank"
							rel="noreferrer noopener"
						>
							@{session.data.username}@{session.data.host}
						</a>
						さん。
					</p>
					<p>
						<strong>
							みす廃レート:
						</strong>
						{session.data.rating}
					</p>
				</section>
			)}
			{score.data && (
				<section>
					<h2>みす廃データ</h2>
					<table className="table fluid shadow-2" style={{border: 'none'}}>
						<thead>
							<tr>
								<th>内容</th>
								<th>スコア</th>
								<th>前日比</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>ノート</td>
								<td>{score.data.notesCount}</td>
								<td>{score.data.notesDelta}</td>
							</tr>
							<tr>
								<td>フォロー</td>
								<td>{score.data.followingCount}</td>
								<td>{score.data.followingDelta}</td>
							</tr>
							<tr>
								<td>フォロワー</td>
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
