import React from 'react'
import { Snackbar } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import './Toast.scss'
export default function Toast({ open, severity, message, handleClose }) {
    let className = "toast toast-" + severity
    const icons = {
        error: "error",
        waring: "report_probleme",
        success: "check",
        info: "info"

    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}

        >
            <div className={className}>
                <Icon>{icons[severity]}</Icon>
                <p>
                    {message}
                </p>
            </div>
        </Snackbar>
    )
}