import React from "react";
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setAppError} from "../../app/app-reducer";

// Пробелы между импортами


function Alert(props: AlertProps){
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export function ErrorSnackBar() {

    const error = useSelector<AppRootStateType, null | string>(state =>
    state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        // Удалить ненужный аргумент
        if (reason === 'clickway') {
             // Текст в константу
            return
        }
        dispatch(setAppError(null))
    }


    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
 // Текст в константу
}
