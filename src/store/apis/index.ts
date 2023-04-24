import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { RequestHeader } from '../../constants/requestHeader';
import { removeItem } from '../../helpers/removeItem';
import { LocalStorage } from '../../constants/localStorage';
import { clearUserState, setCredentials } from '../slices/auth';
import { TokenValue } from '../slices/auth/types';
import { clearEmployeeState } from '../slices/employee';
import { clearConstructorState } from '../slices/constructor';
import { clearWorkTypeState } from '../slices/workType';
import { clearProjectState } from '../slices/project';
import { RootState } from '..';

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
    const { refreshToken } = (api.getState() as RootState).auth;

    const refreshResponse = await baseQuery(
      { url: '/auth/token', method: 'POST' },
      api,
      {
        refreshToken,
      }
    );

    if (refreshResponse?.data) {
      api.dispatch(setCredentials(refreshResponse.data as TokenValue));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearUserState());
      api.dispatch(clearEmployeeState());
      api.dispatch(clearConstructorState());
      api.dispatch(clearWorkTypeState());
      api.dispatch(clearProjectState());
      removeItem(LocalStorage.NAVBAR_LIST);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
