const { todoReducer } = require("./todo/todo.reducer");
const { userReducer } = require("./user/user.reducer");

const appReducer = (state, action) => ({
    items: todoReducer(state.items, action),
    users: userReducer(state.users, action)
})

export { appReducer };