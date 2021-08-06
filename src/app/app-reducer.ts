export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => {
    return{
        type: 'APP/SET-STATUS',
        payload: {
            status,
        },
    } as const
}

export type SetAppStatus = ReturnType<typeof setAppStatus>
type ActionsType = SetAppStatus
