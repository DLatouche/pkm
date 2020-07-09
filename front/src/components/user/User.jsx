import React from 'react'
import './User.scss'
import { useAppContext } from '../../tools/redux/app.provider'



export default function User() {
    const { store } = useAppContext({ user: { username: "" } })
    const { user } = store
    return (
        <div>
            <p>{user.username}</p>
            <p>{user.name}</p>
        </div>
    )
}