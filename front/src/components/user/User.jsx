import React, { useEffect, useState } from 'react'
import './User.scss'
import { authRequest } from '../../tools/api'
import './User.scss'
import Loader from '../../utility/loader/Loader'
import Toast from '../../utility/toast/Toast'
import { Paper, Button } from '@material-ui/core'
import AddBox from './addBox/AddBox'


export default function User({ user, dispatch }) {
    const [state, setState] = useState({ username: "", name: "", boxes: [], openToast: false, showLoader: true, openAddBox: false })
    useEffect(() => {
        const fetchdData = async () => {
            try {
                let url = 'trainers/' + user.userId
                let result = await authRequest(user.accessToken, url, "GET")
                setState(prev => ({ ...prev, showLoader: false, username: result.data.username, name: result.data.name, boxes: result.data.boxes }))

            } catch (e) {
                setState(prev => ({ ...prev, showLoader: false, openToast: true }))
                console.log("User.jsx -> 15: e", e)
            }
        }
        if (user.userId) fetchdData()
    }, [user])

    const closeToast = () => setState(prev => ({ ...prev, openToast: false }))

    const openAddBox = () => setState(prev => ({ ...prev, openAddBox: true }))
    const closeAddBox = () => setState(prev => ({ ...prev, openAddBox: false }))
    return (
        <div>
            <Toast open={state.openToast} severity="error" message="Impossible de récupérer les données" handleClose={closeToast} />
            <Loader show={state.showLoader} />
            <AddBox open={state.openAddBox} handleClose={closeAddBox} userId={user.userId} token={user.accessToken} dispatch={dispatch} />
            <div className="userContainer">
                <Paper elevation={3}>
                    <h2>Dresseur</h2>
                    <p>Nom: {state.name}</p>
                    <p>Identifiant: {state.username}</p>
                    <div className="containerBoxes">
                        {state.boxes.map(b => (<div key={b._id} className="box"><p>{b.name}</p><p>Pokemons: {b.pokemons.length}</p></div>))}
                    </div>
                    <div className="button">
                        <Button onClick={openAddBox} variant="contained" color="primary">
                            Ajouter une boite
                    </Button>
                    </div>
                </Paper>
            </div>

        </div>
    )
}