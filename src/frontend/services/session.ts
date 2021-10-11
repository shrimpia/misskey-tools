import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINT, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { IUser } from '../../common/types/user';
import { Score } from '../../common/types/score';

export const sessionApi = createApi({
	reducerPath: 'session',
	baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT + 'session' }),
	endpoints: (builder) => ({
		getSession: builder.query<IUser, undefined>({
			query: () => ({
				url: '/',
				headers: {
					'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
				}
			})
		}),
		getScore: builder.query<Score, undefined>({
			query: () => ({
				url: '/score',
				headers: {
					'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
				}
			})
		}),
	}),
});

export const {
	useGetSessionQuery,
	useGetScoreQuery,
} = sessionApi;
