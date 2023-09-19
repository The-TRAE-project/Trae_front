import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { RequestHeader } from '../../constants/requestHeader';
import { removeItem } from '../../helpers/removeItem';
import { LocalStorage } from '../../constants/localStorage';
import { clearUserState, setCredentials } from '../slices/auth';
import { TokenValue } from '../slices/auth/types';
import { clearEmployeeState } from '../slices/employee';
import { clearWorkTypeState } from '../slices/workType';
import { clearProjectState } from '../slices/project';
import { TokenTypes } from '../../helpers/hooks/useCookies';
import { isRefreshTokenNearExpiration } from '../../helpers/isRefreshTokenNearExpiration';
import { Token } from './types';

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
  const accessTokenOld = Cookies.get(TokenTypes.ACCESS_TOKEN);

  // console.log('BASE_QUERY:', result, args, api, extraOptions, new Date());
  // console.log(
  //   'REFRESH_TOKEN',
  //   refreshToken,
  //   refreshToken ? jwtDecode(refreshToken) : undefined,
  //   refreshToken
  //     ? new Date(jwtDecode<Token>(refreshToken).exp * 1000)
  //     : undefined
  // );
  // console.log(
  //   'ACCESS_TOKEN',
  //   accessTokenOld,
  //   accessTokenOld ? jwtDecode(accessTokenOld) : undefined,
  //   accessTokenOld
  //     ? new Date(jwtDecode<Token>(accessTokenOld).exp * 1000)
  //     : undefined
  // );

  if (result?.error?.status === 401) {
    const accessResponse = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACK_API_URL}/auth/token`,
      headers: {},
      data: {
        refreshToken,
      },
    });
    // console.log('NEW_ACCESS_TOKEN', accessResponse.data);

    if (accessResponse?.data) {
      const { accessToken } = accessResponse.data as TokenValue;
      api.dispatch(setCredentials(accessResponse.data as TokenValue));
      Cookies.set(TokenTypes.ACCESS_TOKEN, accessToken);

      if (isRefreshTokenNearExpiration()) {
        const refreshResponse = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_BACK_API_URL}/auth/refresh`,
          headers: {
            Authorization: RequestHeader.AUTHORIZATION_PREFIX + accessToken,
          },
          data: {
            refreshToken,
          },
        });

        // console.log('NEW_REFRESH_TOKEN', refreshResponse.data);
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
