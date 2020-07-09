import { ADD_USER } from "./user.action";

export function userReducer(state, action) {
    console.log("user.reducer.jsx -> 4: state", state  )
    switch (action.type) {
        case ADD_USER:
            return [...state, { name: action.name, id: Math.random() }]
        default:
            return state
    }
}