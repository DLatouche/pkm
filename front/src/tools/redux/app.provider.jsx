import React, { useReducer, useContext } from "react";

const { appReducer } = require("./app.reducer");
const { AppContext } = require("./app.context");

const initialState = {user:{id: null}};

function AppProvider(props) {
    const [store, dispatch] = useReducer(appReducer, initialState)
    const data = { store, dispatch }

    return <AppContext.Provider value={data} {...props} />
}

function useAppContext() {
    return useContext(AppContext)
}

export { AppProvider, useAppContext }