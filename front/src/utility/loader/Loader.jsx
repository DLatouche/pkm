import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.scss'

export default function Loader({ show }) {
    return (
        <div className={show ? "loader loaderShow": "loader loaderHide"}>
            <CircularProgress color="secondary" size={64}/>
        </div>
    );
}