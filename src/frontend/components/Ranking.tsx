import React, { useEffect, useState } from 'react';

interface RankingResponse {
	isCalculating: boolean;
	userCount: number;
	ranking: Ranking[];
}

interface Ranking {
	id: number;
	username: string;
	host: string;
	rating: number;
}

export type RankingProps = {
	limit?: number;
};

export const Ranking: React.VFC<RankingProps> = ({limit}) => {
	const [response, setResponse] = useState<RankingResponse | null>(null);
	const [isFetching, setIsFetching] = useState(true);
	const [isError, setIsError] = useState(false);

	// APIコール
	useEffect(() => {
		setIsFetching(true);
		fetch(`//${location.host}/api/v1/ranking?limit=${limit ?? ''}`)
			.then((r) => (r.json() as unknown) as RankingResponse)
			.then((result) => {
				setResponse(result);
				setIsFetching(false);
			})
			.catch(c => {
				console.error(c);
				setIsError(true);
			});
	}, [limit, setIsFetching, setIsError]);

	return (
		isFetching ? (
			<p className="text-dimmed">取得中…</p>
		) : isError ? (
			<div className="alert bg-danger">取得エラー</div>
		) : response ? (
			<>
				<aside>登録者数：{response?.userCount}</aside>
				{response.isCalculating ? (
					<p>現在算出中です。後ほどご確認ください！</p>
				) : (
					<table className="table shadow-2 mt-1 fluid">
						<thead>
							<tr>
								<th>順位</th>
								<th>名前</th>
								<th>レート</th>
							</tr>
						</thead>
						<tbody>
							{response.ranking.map((r, i) => (
								<tr key={i}>
									<td>{i + 1}位</td>
									<td>
										{r.username}@{r.host}
									</td>
									<td>{r.rating}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</>
		) : null
	);
};
