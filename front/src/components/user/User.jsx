import React from 'react'
import './User.scss'
import { useAppContext } from '../../tools/redux/app.provider'



export default function User() {
    const { state } = useAppContext({ user: { username: "" } })
    const { user } = state
    console.log("User.jsx -> 10: state", state)
    return (
        <div>
            <p>{user.username}</p>
        </div>
    )
}