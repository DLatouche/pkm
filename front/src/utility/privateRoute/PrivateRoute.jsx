import React, { useState, useEffect } from 'react'
import { useAppContext } from "../../tools/redux/app.provider";
import { Redirect, Route } from 'react-router-dom'
import { refresh } from '../../tools/redux/user/user.action';

export default function PrivateRoute({ component: Component, ...rest }) {

    const { store, dispatch } = useAppContext()
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'))
    const { user } = store;
    if (!isLoggedIn && !!localStorage.getItem('accessToken')) setIsLoggedIn(true)

    useEffect(() => {
        if (isLoggedIn) {
            if (user?.accessToken?.length > 0) setIsLoggedIn(true)
            let accessToken = localStorage.getItem('accessToken');
            console.log("PrivateRoute.jsx -> 16: accessToken", accessToken)
            let userId = localStorage.getItem('userId');
            if (accessToken) { //TO DO
                console.log("PrivateRoute.jsx -> 18: dis",)
                dispatch(refresh({ accessToken, userId }))
                setIsLoggedIn(true)
            }
        } else {
            let accessToken = localStorage.getItem('accessToken');
            console.log("PrivateRoute.jsx -> 23: accessToken", accessToken)
            console.log("PrivateRoute.jsx -> 28: set", user)
            if (!!accessToken) {
                localStorage.setItem("accessToken", user.accessToken)
                localStorage.setItem("userId", user.userId)
                setIsLoggedIn(true)
            }
        }
    }, [isLoggedIn])

    if (isLoggedIn) {
        return (
            <Route
                {...rest}
                render={props => {
                    const newProps = { ...props, dispatch, user }
                    console.log("PrivateRoute.jsx -> 38: isLoggedIn", isLoggedIn)
                    return <Component {...newProps} />
                }
                }
            />
        )
    } else {
        return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
    }
}
