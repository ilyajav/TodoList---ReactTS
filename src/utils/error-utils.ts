import {
    SetAppError,
    setAppError,
    SetAppStatus,
    setAppStatus
} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsActionType>, message: string)=>{
    dispatch(setAppError(message))
    dispatch(setAppStatus('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsActionType>, data:ResponseType<T>)=>{
    if(data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    }else {
        dispatch(setAppError('неизвестная ошибка. Свяжитесь с администрацией'))
    }
    dispatch(setAppStatus('failed'))
}

export type ErrorUtilsActionType = | SetAppStatus | SetAppError


function f5<T>(a: T): T {
     return  a
}
