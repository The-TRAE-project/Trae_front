import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { TokenTypes } from './hooks/useCookies';
import { Token } from '../store/apis/types';

export function isRefreshTokenNearExpiration() {
  const refreshToken = Cookies.get(TokenTypes.REFRESH_TOKEN);

  const expirationDate = refreshToken
    ? dayjs(jwt_decode<Token>(refreshToken).exp * 1000)
    : undefined;
  return expirationDate === undefined || expirationDate.diff(dayjs(), 'd') <= 7;
}
