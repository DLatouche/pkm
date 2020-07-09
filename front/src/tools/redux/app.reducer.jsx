const { userReducer } = require("./user/user.reducer");

const appReducer = (state, action) => ({
    user: userReducer(state.user, action)
})

export { appReducer };