import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
			<p className="text-dimmed">{t('fetching')}</p>
		) : isError ? (
			<div className="alert bg-danger">{t('failedToFetch')}</div>
		) : response ? (
			<>
				<aside>{t('registeredUsersCount')}: {response?.userCount}</aside>
				{response.isCalculating ? (
					<p>{t('isCalculating')}</p>
				) : (
					<table className="table mt-1 fluid">
						<thead>
							<tr>
								<th>{t('_missHai.order')}</th>
								<th>{t('name')}</th>
								<th>{t('_missHai.rating')}</th>
							</tr>
						</thead>
						<tbody>
							{response.ranking.map((r, i) => (
								<tr key={i}>
									<td>{i + 1}</td>
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
