import Cookies from 'js-cookie';

export const TokenTypes = {
  A_TOKEN: import.meta.env.VITE_A_TOKEN,
};

const EXPIRATION = import.meta.env.VITE_A_TOKEN_EXPIRATION;

export const A_TOKEN_EXPIRATION = new Date(
  new Date().getTime() + Number(EXPIRATION) * 60 * 1000
);

export function useCookies() {
  const setCookie = (token: string) => {
    Cookies.set(TokenTypes.A_TOKEN, token, { expires: A_TOKEN_EXPIRATION });
  };

  const removeCookie = () => {
    Cookies.remove(TokenTypes.A_TOKEN);
  };

  return { setCookie, removeCookie };
}
