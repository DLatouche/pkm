import { LOGIN, LOGOUT, SIGNIN } from "./user.action";

export function userReducer(state, action) {
    console.log("user.reducer.jsx -> 5: action", action)
    console.log("user.reducer.jsx -> 6: state", state)
    switch (action.type) {
        case LOGIN:
            return { id: action.userId, username: action.username, accessToken: action.accessToken, name: action.name }
        case LOGOUT: return { id: null, accessToken: null }
        case SIGNIN: return { ...state, username: action.username, password: action.password }
        default:
            return state
    }
}