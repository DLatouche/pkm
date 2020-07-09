export const SIGNIN = "SINGIN_USER";
export const LOGIN = "LOGIN_USER";
export const LOGOUT = "LOGOUT_USER"

export function signIn({ username, password }) { return { type: SIGNIN, username, password } }
export function logIn({ username, password, accessToken, userId, name}) { return { type: LOGIN, username, password, accessToken, userId, name} }
export function logOut() { return { type: LOGOUT } } 