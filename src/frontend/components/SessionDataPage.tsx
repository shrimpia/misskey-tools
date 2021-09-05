import React from 'react';
import { useGetScoreQuery, useGetSessionQuery } from '../services/session';
import { Skeleton } from './Skeleton';

export const SessionDataPage: React.VFC = () => {
	const session = useGetSessionQuery(undefined);
	const score = useGetScoreQuery(undefined);

	return session.isLoading || score.isLoading ? (
		<div className="vstack">
			<Skeleton width="100%" height="1rem" />
			<Skeleton width="100%" height="1rem" />
			<Skeleton width="100%" height="2rem" />
			<Skeleton width="100%" height="160px" />
		</div>
	) : (
		<>
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
					<table className="table fluid">
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
		</>
	);
};
