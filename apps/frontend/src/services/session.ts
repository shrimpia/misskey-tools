import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT, LOCALSTORAGE_KEY_TOKEN } from '../const';
import { IUser } from 'tools-shared/dist/types/user';
import { Score } from 'tools-shared/dist/types/score';
import { Meta } from 'tools-shared/dist/types/meta';

export const sessionApi = createApi({
  reducerPath: 'session',
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  endpoints: (builder) => ({
    getSession: builder.query<IUser, undefined>({
      query: () => ({
        url: '/session/',
        headers: {
          'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
        }
      })
    }),
    getScore: builder.query<Score, undefined>({
      query: () => ({
        url: '/session/score',
        headers: {
          'Authorization': `Bearer ${localStorage[LOCALSTORAGE_KEY_TOKEN]}`,
        }
      })
    }),
    getMeta: builder.query<Meta, undefined>({
      query: () => ({
        url: '/meta',
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
  useGetMetaQuery,
} = sessionApi;
