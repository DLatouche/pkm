import { LOGIN, LOGOUT, SIGNIN, REFRESH, ADD_BOXES, SET_BOXES } from "./user.action";

export function userReducer(state, action) {
    console.log("user.reducer.jsx -> 5: action", action)
    console.log("user.reducer.jsx -> 6: state", state)
    switch (action.type) {
        case LOGIN:
            return { userId: action.userId, username: action.username, accessToken: action.accessToken, name: action.name, boxes: action.boxes }
        case LOGOUT: return { userId: null, accessToken: null }
        case SIGNIN: return { ...state, username: action.username, password: action.password }
        case REFRESH: return { ...state, accessToken: action.accessToken, userId: action.userId }
        case ADD_BOXES: return { ...state, boxes: [...state.boxes, action.boxes] }
        case SET_BOXES: return { ...state, boxes: action.boxes }
        default:
            return state
    }
}