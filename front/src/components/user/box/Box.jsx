import './Box.scss'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../../../utility/loader/Loader';
import Toast from '../../../utility/toast/Toast';
import { Button, Paper, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { authRequest, request } from '../../../tools/api';
import AddPokemon from './addPokemon/AddPokmon';

export default function Box({ user, dispatch }) {
    const [state, setState] = useState({ name: "", pokemons: [], openToast: false, showLoader: true, openAddPokemon: false, types: [] })
    const history = useHistory();
    let { id } = useParams();

    useEffect(() => {
        const fetchdData = async () => {
            try {

                let resultTypes = await request("types", "GET")
                console.log("Box.jsx -> 21: resultTypes", resultTypes)

                let url = 'trainers/' + user.userId + "/boxes/" + id
                let result = await authRequest(user.accessToken, url, "GET")
                console.log("Box.jsx -> 20: result", result)
                let pokemons = []
                result.data.pokemons.forEach((p) => {
                    pokemons.push({
                        _id: p._id,
                        name: p.name,
                        firstType: p.firstType.name,
                        secondType: p?.secondType?.name,
                    })
                })
                setState(prev => ({ ...prev, showLoader: false, name: result.data.name, pokemons: pokemons, types: resultTypes.data }))

            } catch (e) {
                setState(prev => ({ ...prev, showLoader: false, openToast: true }))
                console.log("Box.jsx -> 25: e", e)
            }
        }
        if (user.userId) fetchdData()
    }, [user])



    const closeToast = () => setState(prev => ({ ...prev, openToast: false }))
    const openAddPokemon = () => setState(prev => ({ ...prev, openAddPokemon: true }))
    const closeAddPokemon = (pokemonAdded) => setState(prev => ({ ...prev, openAddPokemon: false, pokemons: [...state.pokemons, pokemonAdded] }))


    return (
        <div>
            <Loader show={state.showLoader} />
            <Toast open={state.openToast} severity="error" message="Impossible de récupérer les données" handleClose={closeToast} />
            <AddPokemon userId={user.userId} token={user.accessToken} handleClose={closeAddPokemon} open={state.openAddPokemon} boxId={id} dispatch={dispatch} types={state.types} />
            <div className="containerBox">
                <Paper elevation={3}>
                    <div className="button">
                        <IconButton aria-label="delete" color="secondary" onClick={history.goBack}>
                            <ArrowBack />
                        </IconButton>
                        <h2>Boîte</h2>
                    </div>
                    <div className="button">
                        <Button onClick={openAddPokemon} disabled={state.pokemons.length >= 24} tooltip="al" variant="contained" color="primary">
                            Ajouter un pokemon
                    </Button>
                    </div>
                    <div className="containerPokemons">
                        {state.pokemons.length === 0 ? <p>Aucun pokemon...</p> :
                            state.pokemons.map(p => (<div key={p._id} className="pokemon"><p>{p.name}</p><p>{p.firstType}</p><p>{p.secondType}</p></div>))}
                    </div>
                </Paper>
            </div>
        </div>
    )

}