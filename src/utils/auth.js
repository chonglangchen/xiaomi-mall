import jsCookie from "js-cookie";
const TokenKey = 'xiaomi-token'
export function getToken() {
    return jsCookie.get(TokenKey)
}
export function setToken(value, options = { expires: 3 }) {
    jsCookie.set(TokenKey, value, options)
}
export function removeToken() {
    jsCookie.remove(TokenKey)
}