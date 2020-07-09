import React from 'react'
import { useAppContext } from "../../tools/redux/app.provider";
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ component: Component, ...rest }) {

    const { store } = useAppContext()

    const { user } = store;
    let isLoggedIn = false
    if (user?.accessToken?.length > 0) isLoggedIn = true
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
            }
        />
    )
}
