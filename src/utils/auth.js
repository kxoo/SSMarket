import Cookies from 'js-cookie';

const TokenKey = 'shop-token';

getToken(() => {
  Cookies.get(TokenKey)
})

setToken((token) => {
  Cookies.set(TokenKey, token)
})

removeToken(() => {
  Cookies.remove(TokenKey)
})

export {
  getToken,
  setToken,
  removeToken
}
