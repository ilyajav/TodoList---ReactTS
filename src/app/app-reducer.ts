
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }

    // Вынести название кейсов в контстанты или enum
}

export const setAppStatus = (status: RequestStatusType) => {
    return{
        type: 'APP/SET-STATUS',
        payload: {
            status,
        },
    } as const

    // Текст в контсанту
}

export const setAppError = (error: null | string) => {
    return{
        type: 'APP/SET-ERROR',
        payload: {
            error
        },
    } as const

    // Текст в контсанту
}

export type SetAppError = ReturnType<typeof setAppError>
export type SetAppStatus = ReturnType<typeof setAppStatus>
type ActionsType = SetAppStatus | SetAppError
