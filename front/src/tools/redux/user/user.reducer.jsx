import { LOGIN, LOGOUT, SIGNIN, REFRESH, ADD_BOXES, SET_BOXES, UPDATE_BOX, ADD_POKEMON } from "./user.action";

export function userReducer(state, action) {
    switch (action.type) {
        case LOGIN:
            return { userId: action.userId, username: action.username, accessToken: action.accessToken, name: action.name, boxes: action.boxes }
        case LOGOUT: return { userId: null, accessToken: null }
        case SIGNIN: return { ...state, username: action.username, password: action.password }
        case REFRESH: return { ...state, accessToken: action.accessToken, userId: action.userId }
        case ADD_BOXES: return { ...state, boxes: [...state.boxes, action.boxes] }
        case SET_BOXES: return { ...state, boxes: action.boxes }
        case UPDATE_BOX:

            let boxes = [...state.boxes]
            let i = 0
            let find = false
            while (!find && i < boxes) {
                if (boxes[i]._id === action.box._id) {
                    find = true
                    boxes[i] = action.box
                }
            }

            return { ...state, boxes: boxes }
            break
        case ADD_POKEMON: {
            console.log("user.reducer.jsx -> 27: state", state  )
            let boxes = [...state.boxes]
            let i = 0
            let find = false
            while (!find && i < boxes) {
                if (boxes[i]._id === action.boxId) {
                    find = true
                    boxes[i].pokemons = [...boxes[i].pokemons, action.pokemon]
                }
            }

            return { ...state, boxes: boxes }
        }
        default:
            return state
    }
}