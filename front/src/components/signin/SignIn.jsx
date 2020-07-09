import React from 'react'
import '../login/LogIn.scss'
import { Paper, TextField, Button } from '@material-ui/core';

const onInputChange = (e, v) => {
    console.log("Log.jsx -> 9: e", e.target.value, v)
}

export default function SignIn() {
    return (
        <div className="form">
            <Paper elevation={3}>
                <h2>Inscription</h2>
                <div className="input">
                    <TextField id="username" label="Identifiant" onChange={onInputChange} />
                </div>
                <div className="input">
                    <TextField id="paswword" label="Mot de passe" />
                </div>
                <div className="button">
                    <Button variant="contained" color="primary">
                        Inscription
                    </Button>
                </div>
            </Paper>
        </div>
    );
}