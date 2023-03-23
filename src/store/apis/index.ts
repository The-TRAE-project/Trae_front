import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestHeader } from '../../constants/requestHeader';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD
      ? import.meta.env.VITE_BACK_API_URL
      : import.meta.env.VITE_BACK_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set(
          RequestHeader.AUTHORIZATION,
          RequestHeader.AUTHORIZATION_PREFIX + token
        );
        headers.set(RequestHeader.ACCESS_CONTROL_ALLOW_ORIGIN, '*');
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
