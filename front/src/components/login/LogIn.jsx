import React, { useState } from 'react'
import { logIn } from '../../tools/redux/user/user.action'
import './LogIn.scss'
import { Paper, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../tools/redux/app.provider';
import { request } from '../../tools/api';
import { useHistory } from "react-router-dom";
import Loader from '../../utility/loader/Loader';
import Toast from '../../utility/toast/Toast';

export default function LogIn() {
    const {store,  dispatch } = useAppContext();
    let {user} = store
    if(!user?.username){
        user.username = ""
        user.password = ""
    }
    const history = useHistory();
    const [state, setState] = useState({ username: user?.username, password: user?.password, errorUsername: "", errorPassword: "", showLoader: false, openToast: false });
    const onInputChange = (e) => {
        const { name, value } = e.target
        setState(prev => ({ ...prev, [name]: value }))
    }

    const validate = async () => {
        setState(prev => ({ ...prev, showLoader: true }))
        const { username, password } = state;
        let errorPassword = ""
        let errorUsername = ""
        let showLoader = true
        if (username.length > 0 && password.length > 0) {
            try {
                let result = await request('auth/login', "POST", { username, password })
                dispatch(logIn({username, password, accessToken: result.data.access_token, userId: result.data.userId}))
                history.push('trainer')
            } catch (e) {
                console.log("%cLogin.jsx -> 34 ERROR: e", 'background: #FF0000; color:#FFFFFF', e)
                setState(prev => ({ ...prev, showLoader: false, openToast: true, errorUsername, errorPassword }))
            }
        } else {
            showLoader = false;
            if (username.length === 0) errorUsername = "Champ obligatoire"
            if (password.length === 0) errorPassword = "Champ obligatoire"
            setState(prev => ({ ...prev, errorUsername, errorPassword, showLoader }))
        }
    }

    const closeToast = () => setState(prev => ({ ...prev, openToast: false }))

    return (
        <div className="form">
            <Toast open={state.openToast} severity="error" message="Identifiants incorrects" handleClose={closeToast} />
            <Loader show={state.showLoader} />
            <Paper elevation={3}>
                <h2>Connexion</h2>
                <div className="input">
                    <TextField name="username" label="Identifiant" onChange={onInputChange} error={state.errorUsername.length > 0} helperText={state.errorUsername} defaultValue={user?.username}/>
                </div>
                <div className="input">
                    <TextField name="password" type="password" label="Mot de passe" onChange={onInputChange} error={state.errorPassword.length > 0} helperText={state.errorPassword} defaultValue={user.password} />
                </div>
                <div className="link">
                    <Link to="/signin">S'inscrire</Link>
                </div>
                <div className="button">
                    <Button onClick={validate} variant="contained" color="primary">
                        Connexion
                    </Button>
                </div>
            </Paper>
        </div>
    );
}