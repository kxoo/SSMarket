import Cookies from 'js-cookie';

const TokenKey = 'shop-token';

const getToken = (() => {
  Cookies.get(TokenKey);
});

const setToken = ((token) => {
  Cookies.set(TokenKey, token);
});

const removeToken = (() => {
  Cookies.remove(TokenKey);
});

export {
  getToken,
  setToken,
  removeToken,
};
