import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { RequestHeader } from '../../constants/requestHeader';
import { logOutUser, setCredentials } from '../slices/auth';
import { logOutEmployee } from '../slices/employee';
import { TokenValue } from '../slices/auth/types';
import { RootState } from '..';
import { clearConstructorState } from '../slices/constructor';

const baseQuery = fetchBaseQuery({
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
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 400) {
    // eslint-disable-next-line no-console
    console.log('sending refresh token');
    const { refreshToken } = (api.getState() as RootState).auth;

    const refreshResponse = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      {
        refreshToken,
      }
    );
    // eslint-disable-next-line no-console
    console.log(refreshResponse);
    if (refreshResponse?.data) {
      api.dispatch(setCredentials(refreshResponse.data as TokenValue));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOutUser());
      api.dispatch(logOutEmployee());
      api.dispatch(clearConstructorState());
      localStorage.removeItem('navbar-list');
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
