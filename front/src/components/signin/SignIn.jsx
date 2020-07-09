import React, { useState } from 'react'
import '../login/LogIn.scss'
import { Paper, TextField, Button } from '@material-ui/core';
import { useAppContext } from '../../tools/redux/app.provider';
import { useHistory } from 'react-router-dom';
import { request } from '../../tools/api';
import { signIn } from '../../tools/redux/user/user.action';
import Toast from '../../utility/toast/Toast';
import Loader from '../../utility/loader/Loader';

export default function SignIn() {
    const { dispatch } = useAppContext();
    const history = useHistory();
    const [state, setState] = useState({ username: "", password: "", errorUsername: "", errorPassword: "", showLoader: false, openToast: false });

    const onInputChange = (e, v) => {
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
                let result = await request('trainers', "POST", { name: "toDo", username, password })
                dispatch(signIn({ username, password }))
                history.push('trainer')
            } catch (e) {
                console.log("%cSingIn.jsx -> 34 ERROR: e", 'background: #FF0000; color:#FFFFFF', e)
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
            <Toast open={state.openToast} severity="error" message="Une erreur est survenue lors de l'inscription" handleClose={closeToast} />
            <Loader show={state.showLoader} />
            <Paper elevation={3}>
                <h2>Inscription</h2>
                <div className="input">
                    <TextField name="username" label="Identifiant" onChange={onInputChange} error={state.errorUsername.length > 0} helperText={state.errorUsername} />
                </div>
                <div className="input">
                    <TextField name="password" label="Mot de passe" type="password" onChange={onInputChange} error={state.errorPassword.length > 0} helperText={state.errorPassword} />
                </div>
                <div className="button">
                    <Button onClick={validate} variant="contained" color="primary">
                        Inscription
                    </Button>
                </div>
            </Paper>
        </div>
    );
}