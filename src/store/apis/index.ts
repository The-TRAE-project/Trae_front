import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
import { RequestHeader } from '../../constants/requestHeader';
import { removeItem } from '../../helpers/removeItem';
import { LocalStorage } from '../../constants/localStorage';
import { clearUserState, setCredentials } from '../slices/auth';
import { TokenValue } from '../slices/auth/types';
import { clearEmployeeState } from '../slices/employee';
import { clearWorkTypeState } from '../slices/workType';
import { clearProjectState } from '../slices/project';
import { TokenTypes } from '../../helpers/hooks/useCookies';
import instance from '../../config/axiosConfig';
import { isRefreshTokenNearExpiration } from '../../helpers/isRefreshTokenNearExpiration';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.PROD
    ? import.meta.env.VITE_BACK_API_URL
    : import.meta.env.VITE_BACK_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get(TokenTypes.ACCESS_TOKEN);
    if (accessToken) {
      headers.set(
        RequestHeader.AUTHORIZATION,
        RequestHeader.AUTHORIZATION_PREFIX + accessToken
      );
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = Cookies.get(TokenTypes.REFRESH_TOKEN);

  console.log('BASE_QUERY:', result, args, api, extraOptions, new Date());

  if (result?.error?.status === 401) {
    const accessResponse = await instance.post(`/auth/token`, {
      refreshToken,
    });

    if (accessResponse?.data) {
      const { accessToken } = accessResponse.data as TokenValue;
      api.dispatch(setCredentials(accessResponse.data as TokenValue));
      Cookies.set(TokenTypes.ACCESS_TOKEN, accessToken);

      if (isRefreshTokenNearExpiration()) {
        const refreshResponse = await instance.post(`/auth/refresh`, {
          refreshToken,
        });

        const { refreshToken: newRefreshToken } =
          refreshResponse.data as TokenValue;
        api.dispatch(setCredentials(refreshResponse.data as TokenValue));
        Cookies.set(TokenTypes.REFRESH_TOKEN, newRefreshToken);
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearUserState());
      api.dispatch(clearEmployeeState());
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
