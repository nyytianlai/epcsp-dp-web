import Cookies from 'js-cookie';

const TokenKey = 'sutpc-sso-token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  
  sessionStorage.setItem('token', token);

  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
