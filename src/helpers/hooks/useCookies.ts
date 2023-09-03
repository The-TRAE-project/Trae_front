import Cookies from 'js-cookie';

export const TokenTypes = {
  ACCESS_TOKEN: import.meta.env.VITE_ACCESS_TOKEN,
  REFRESH_TOKEN: import.meta.env.VITE_REFRESH_TOKEN,
};

const ACCESS_TOKEN_DURATION = import.meta.env.VITE_ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_DURATION = import.meta.env.VITE_REFRESH_TOKEN_EXPIRATION;

export const ACCESS_TOKEN_EXPIRATION = new Date(
  new Date().getTime() + Number(ACCESS_TOKEN_DURATION) * 60 * 1000
);
export const REFRESH_TOKEN_EXPIRATION = new Date(
  new Date().getTime() + Number(REFRESH_TOKEN_DURATION) * 24 * 60 * 60 * 1000
);

export function useAccessCookies() {
  const setAccessCookie = (token: string) => {
    Cookies.set(TokenTypes.ACCESS_TOKEN, token, {
      expires: ACCESS_TOKEN_EXPIRATION,
    });
  };

  const removeAccessCookie = () => {
    Cookies.remove(TokenTypes.ACCESS_TOKEN);
  };

  return { setAccessCookie, removeAccessCookie };
}

export function useRefreshCookies() {
  const setRefreshCookie = (token: string) => {
    Cookies.set(TokenTypes.REFRESH_TOKEN, token, {
      expires: REFRESH_TOKEN_EXPIRATION,
    });
  };

  const removeRefreshCookie = () => {
    Cookies.remove(TokenTypes.REFRESH_TOKEN);
  };

  return { setRefreshCookie, removeRefreshCookie };
}
