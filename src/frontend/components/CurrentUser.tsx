import React from 'react';
import { useGetSessionQuery } from '../services/session';
import { Skeleton } from './Skeleton';

export const CurrentUser: React.VFC = () => {
	const {data} = useGetSessionQuery(undefined);
	return data ? (
		<h1 className="text-125"><i className="fas fa-users"></i> {data.username}<span className="text-dimmed">@{data.host}</span></h1>
	) : <Skeleton height="1.5rem" />;
};
