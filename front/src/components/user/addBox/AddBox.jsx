import React, { useState } from 'react'
import './AddBox.scss'
import { Dialog, DialogTitle, Button, TextField } from '@material-ui/core'
import Loader from '../../../utility/loader/Loader'
import Toast from '../../../utility/toast/Toast'
import { authRequest } from '../../../tools/api'
import { setBoxes } from '../../../tools/redux/user/user.action'


export default function AddBox({ open, handleClose, token, userId, dispatch }) {
    const [state, setState] = useState({ name: "", errorName: "", showLoader: false, severityToast: "success", messageToast: "Boîte enregistrée !", openToast: false })
    const onInputChange = (e, v) => {
        const { name, value } = e.target
        setState(prev => ({ ...prev, [name]: value }))
    }
    const closeToast = () => setState(prev => ({ ...prev, openToast: false }))

    const valider = async () => {
        setState(prev => ({ ...prev, showLoader: true }))
        const { name } = state;
        let errorName = ""
        let showLoader = true
        if (name.length > 0) {
            try {
                let result = await authRequest(token, 'trainers/' + userId + "/boxes", "POST", { boxName: name })
                dispatch(setBoxes({ boxes: result.data.boxes }))
                setState(prev => ({ name: "", errorName: "", showLoader: false, severityToast: "success", messageToast: "Boîte enregistrée !", openToast: false }))
                handleClose()
            } catch (e) {
                setState(prev => ({ ...prev, showLoader: false, openToast: true, errorName, severityToast: "error", messageToast: "Une erreur est survenue. " }))
            }
        } else {
            showLoader = false;
            if (name.length === 0) errorName = "Champ obligatoire"
            setState(prev => ({ ...prev, errorName, showLoader }))
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="dialogBox">
            <Toast open={state.openToast} severity={state.severityToast} message={state.messageToast} handleClose={closeToast} />
            <Loader show={state.showLoader} />
            <DialogTitle id="simple-dialog-title">Création de boîte</DialogTitle>
            <div className="input">
                <TextField name="name" label="Nom" onChange={onInputChange} error={state.errorName.length > 0} helperText={state.errorName} />
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