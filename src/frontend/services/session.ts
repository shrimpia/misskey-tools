import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiEndpoint } from '../const';
import { IUser } from '../../common/types/user';
import { Score } from '../../common/types/score';

export const sessionApi = createApi({
	reducerPath: 'session',
	baseQuery: fetchBaseQuery({ baseUrl: apiEndpoint + 'session' }),
	endpoints: (builder) => ({
		getSession: builder.query<IUser, undefined>({
			query: () => ({
				url: '/',
				headers: {
					'Authorization': `Bearer ${localStorage['token']}`,
				}
			})
		}),
		getScore: builder.query<Score, undefined>({
			query: () => ({
				url: '/score',
				headers: {
					'Authorization': `Bearer ${localStorage['token']}`,
				}
			})
		}),
	}),
});

export const {
	useGetSessionQuery,
	useGetScoreQuery,
} = sessionApi;
