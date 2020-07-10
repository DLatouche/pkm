import React, { useState, useEffect } from 'react'
import { useAppContext } from "../../tools/redux/app.provider";
import { Redirect, Route } from 'react-router-dom'
import { refresh } from '../../tools/redux/user/user.action';

export default function PrivateRoute({ component: Component, ...rest }) {

    const { store, dispatch } = useAppContext()
    let hasToken = localStorage.getItem('accessToken') && localStorage.getItem('accessToken') !== undefined && localStorage.getItem('accessToken') !== "undefined"
    const [isLoggedIn, setIsLoggedIn] = useState(hasToken)
    const { user } = store;

    useEffect(() => {
        if (isLoggedIn) {
            if (user?.accessToken?.length > 0) {
                setIsLoggedIn(true)
            }
            let accessToken = localStorage.getItem('accessToken');
            let userId = localStorage.getItem('userId');
            let hasToken = accessToken && accessToken !== undefined && accessToken !== "undefined"
            if (hasToken) {
                dispatch(refresh({ accessToken, userId }))
                setIsLoggedIn(true)
            }
        } else {
            let accessToken = localStorage.getItem('accessToken');
            if (accessToken !== user.accessToken) {
                localStorage.setItem("accessToken", user.accessToken)
                localStorage.setItem("userId", user.userId)
            }
        }
    }, [isLoggedIn])

    if (isLoggedIn) {
        return (
            <Route
                {...rest}
                render={props => {
                    const newProps = { ...props, user, dispatch}
                    return <Component {...newProps} />
                }
                }
            />
        )
    } else {
        return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
    }
}
