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
            let userId = localStorage.getItem('userId');
            if (accessToken) { //TO DO
                dispatch(refresh({ accessToken, userId }))
                setIsLoggedIn(true)
            }
        } else {
            let accessToken = localStorage.getItem('accessToken');
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
                    return <Component {...newProps} />
                }
                }
            />
        )
    } else {
        return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
    }
}
