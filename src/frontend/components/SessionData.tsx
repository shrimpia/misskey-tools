import React from 'react';
import { useGetScoreQuery } from '../services/session';

export const SessionData: React.VFC = () => {
	const { data: score, error, isLoading } = useGetScoreQuery(undefined);

	return isLoading ? (
		<div>Loading...</div>
	) : score === undefined ? (
		<div>No score</div>
	) : (
		<>
			<section>
				<h2>みす廃データ</h2>
				<table className="table">
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
							<td>{score.notesCount}</td>
							<td>{score.notesDelta}</td>
						</tr>
						<tr>
							<td>フォロー</td>
							<td>{score.followingCount}</td>
							<td>{score.followingDelta}</td>
						</tr>
						<tr>
							<td>フォロワー</td>
							<td>{score.followersCount}</td>
							<td>{score.followersDelta}</td>
						</tr>
					</tbody>
				</table>
			</section>
		</>
	);
};
