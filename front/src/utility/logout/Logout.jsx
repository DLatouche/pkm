import './Logout.scss'
import React from 'react'
import { IconButton } from '@material-ui/core'
import ExitToApp from '@material-ui/icons/ExitToApp';
import './Logout.scss'
import { useAppContext } from '../../tools/redux/app.provider';
import { logOut } from '../../tools/redux/user/user.action';
import { useHistory } from 'react-router-dom';
export default function Logout() {

    const { dispatch } = useAppContext();
    const history = useHistory();
    

    const logout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("userId")
        dispatch(logOut())
        history.push('/')
    }

    return (
        <span>
            <IconButton aria-label="delete" color="secondary" onClick={logout}>
                <ExitToApp />
            </IconButton>
        </span>
    )
}