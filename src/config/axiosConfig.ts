import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { TokenTypes } from '../helpers/hooks/useCookies';
import { TokenValue } from '../store/slices/auth/types';
import { isRefreshTokenNearExpiration } from '../helpers/isRefreshTokenNearExpiration';
import { RequestHeader } from '../constants/requestHeader';

function getCurrentAccessToken() {
  // this is how you access the zustand store outside of React.
  return Cookies.get(TokenTypes.ACCESS_TOKEN);
}

function getCurrentRefreshToken() {
  // this is how you access the zustand store outside of React.
  return Cookies.get(TokenTypes.REFRESH_TOKEN);
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACK_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getCurrentAccessToken();
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error: {
    config: InternalAxiosRequestConfig;
    response: AxiosResponse;
  }) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const refreshToken = getCurrentRefreshToken();
      const accessResponse = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACK_API_URL}/auth/token`,
        headers: {},
        data: {
          refreshToken,
        },
      });
      const { accessToken } = accessResponse.data as TokenValue;

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

        const { refreshToken: newRefreshToken } =
          refreshResponse.data as TokenValue;
        Cookies.set(TokenTypes.REFRESH_TOKEN, newRefreshToken);
      }

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
