export const SIGNIN = "SINGIN_USER";
export const LOGIN = "LOGIN_USER";
export const LOGOUT = "LOGOUT_USER"
export const REFRESH = "REFRESH_USER"
export const ADD_BOXES = "ADD_BOXES"
export const SET_BOXES = "SET_BOXES"

export function signIn({ username, password }) { return { type: SIGNIN, username, password } }
export function logIn({ username, password, accessToken, userId, name, boxes }) { return { type: LOGIN, username, password, accessToken, userId, name, boxes } }
export function logOut() { return { type: LOGOUT } }
export function refresh({ accessToken, userId }) { return { type: REFRESH, accessToken, userId } }
export function addBoxes({ boxes }) { return { type: ADD_BOXES, boxes } } 
export function setBoxes({ boxes }) { return { type: SET_BOXES, boxes } } 