const { userReducer } = require("./user/user.reducer");

const appReducer = (store, action) => ({
    user: userReducer(store.user, action)
})

export { appReducer };