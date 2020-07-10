import React, { useState } from 'react'
import './AddPokemon.scss'
import { Dialog, DialogTitle, Button, TextField, InputLabel, MenuItem, Select, FormHelperText, FormControl } from '@material-ui/core'
import { authRequest } from '../../../../tools/api'
import Loader from '../../../../utility/loader/Loader'
import Toast from '../../../../utility/toast/Toast'
import { updateBox, addPokemon } from '../../../../tools/redux/user/user.action'


export default function AddPokemon({ open, handleClose, token, userId, boxId, dispatch, types }) {
    const [state, setState] = useState({
        name: "", errorName: "", showLoader: false, severityToast: "success", messageToast: "Pokemon enregistré !",
        openToast: false, firstType: "Aucun", errorType: "", secondType: "Aucun"
    })
    const onInputChange = (e, v) => {
        const { name, value } = e.target
        setState(prev => ({ ...prev, [name]: value }))
    }
    const closeToast = () => setState(prev => ({ ...prev, openToast: false }))

    const valider = async () => {
        setState(prev => ({ ...prev, showLoader: true }))
        const { name, firstType } = state;
        let errorName = ""
        let errorType = ""
        let showLoader = true
        if (name.length > 0 && firstType !== "Aucun") {
            try {
                let data = { name: state.name, firstType: state.firstType }
                if (state.secondType !== "Aucun") data.secondType = state.secondType
                else data.secondType = ""
                let url = 'trainers/' + userId + "/boxes/" + boxId
                console.log("AddPokmon.jsx -> 32: url", url)
                console.log("AddPokmon.jsx -> 31: data", data)
                let result = await authRequest(token, url, "POST", data)
                console.log("AddPokmon.jsx -> 31: result", result)
                let pokemon = { _id: result.data._id, name: result.data.name, firstType: result.data.firstType.name, secondType: result.data?.secondType?.name }
                //dispatch(addPokemon({ boxId, pokemon }))
                setState(prev => ({ name: "", errorName: "", errorType: "", showLoader: false, severityToast: "success", messageToast: "Pokemon enregistré !", openToast: false, firstType: "Aucun", secondType: "Aucun" }))
                handleClose(pokemon)
            } catch (e) {
                console.log("AddPokmon.jsx -> 51: e", e)
                setState(prev => ({ ...prev, showLoader: false, openToast: true, errorName, severityToast: "error", messageToast: "Une erreur est survenue. " }))
            }
        } else {
            showLoader = false;
            if (name.length === 0) errorName = "Champ obligatoire"
            if (firstType === "Aucun") errorType = "Champ obligatoire"
            setState(prev => ({ ...prev, errorName, errorType, showLoader }))
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="dialogPokemon">
            <Toast open={state.openToast} severity={state.severityToast} message={state.messageToast} handleClose={closeToast} />
            <Loader show={state.showLoader} />
            <DialogTitle id="simple-dialog-title">Création d'un pokemon</DialogTitle>
            <div className="input">
                <TextField name="name" label="Nom" onChange={onInputChange} error={state.errorName.length > 0} helperText={state.errorName} />
            </div>
            <div className="select">
                <FormControl
                    error={!!state.errorType}
                >
                    <InputLabel>Premier type</InputLabel>

                    <Select
                        name="firstType"
                        value={state.firstType}
                        onChange={onInputChange}
                        style={{ minWidth: 120 }}
                    >
                        <MenuItem key={"ftAucun"} value={"Aucun"}>{"Aucun"}</MenuItem>
                        {types.map(t => <MenuItem key={t._id + "ft"} value={t._id}>{t.name}</MenuItem>)}

                    </Select>
                    <FormHelperText>{state.errorType}</FormHelperText>
                </FormControl>
            </div>
            <div className="select">
                <FormControl>
                    <InputLabel >Second type</InputLabel>
                    <Select
                        name="secondType"
                        value={state.secondType}
                        onChange={onInputChange}
                        style={{ minWidth: 120 }}
                    >
                        <MenuItem key={"stAucun"} value={"Aucun"}>{"Aucun"}</MenuItem>
                        {types.map(t => <MenuItem key={t._id + "st"} value={t._id}>{t.name}</MenuItem>)}

                    </Select>
                </FormControl>

            </div>
            <div className="button">
                <Button onClick={valider} variant="contained" color="primary">
                    Valider
                    </Button>
                <Button onClick={handleClose} variant="contained" color="primary">
                    Annuler
                    </Button>
            </div>
        </Dialog>
    )
}