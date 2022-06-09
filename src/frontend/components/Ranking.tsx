import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { $get } from '../misc/api';

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
	const {t} = useTranslation();

	// APIコール
	useEffect(() => {
		setIsFetching(true);
		$get<RankingResponse>(`ranking?limit=${limit ?? ''}`)
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
			<p className="text-dimmed">{t('fetching')}</p>
		) : isError ? (
			<div className="alert bg-danger">{t('failedToFetch')}</div>
		) : response ? (
			<>
				<aside>{t('registeredUsersCount')}: {response?.userCount}</aside>
				{response.isCalculating ? (
					<p>{t('isCalculating')}</p>
				) : (
					<div className="menu large">
						{response.ranking.map((r, i) => (
							<a href={`https://${r.host}/@${r.username}`} target="_blank" rel="noopener noreferrer nofollow" className="item flex" key={i}>
								<div className="text-bold pr-2">{i + 1}</div>
								<div>
									{r.username}@{r.host}<br/>
									<span className="text-dimmed text-75">{t('_missHai.rating')}: {r.rating}</span>
								</div>
							</a>
						))}
					</div>
					// <table className="table mt-1 fluid">
					// 	<thead>
					// 		<tr>
					// 			<th>{t('_missHai.order')}</th>
					// 			<th>{t('name')}</th>
					// 			<th>{t('_missHai.rating')}</th>
					// 		</tr>
					// 	</thead>
					// 	<tbody>
					// 		{response.ranking.map((r, i) => (
					// 			<tr key={i}>
					// 				<td>{i + 1}</td>
					// 				<td>
					// 					{r.username}@{r.host}
					// 				</td>
					// 				<td>{r.rating}</td>
					// 			</tr>
					// 		))}
					// 	</tbody>
					// </table>
				)}
			</>
		) : null
	);
};
