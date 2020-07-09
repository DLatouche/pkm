import { ADD_TODO } from "./todo.action";

export function todoReducer(state, action) {
    console.log("todo.reducer.jsx -> 4: state", state  )
    switch (action.type) {
        case ADD_TODO:
            return [...state, {text: action.text, id: Math.random()}]
        default:
            return state
    }
}