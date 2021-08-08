import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {
    RequestStatusType,
    SetAppError,
    setAppStatus,
    SetAppStatus
} from "../../app/app-reducer";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
          return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => (
    {
        type: 'REMOVE-TODOLIST',
        id
    } as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({
        type: 'SET-TODOLISTS', todolists
    } as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
   return{
       type: 'CHANGE-TODOLIST-ENTITY-STATUS',
       id,
       entityStatus,
   } as const
}

// thunks
export const fetchTodolistsTC = () => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setAppStatus('loading'))
            const res = await todolistsAPI.getTodolists()
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatus('succeeded'))
        }catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
           const res = await todolistsAPI.deleteTodolist(todolistId)
                    if(res.data.resultCode === 0){
                        dispatch(removeTodolistAC(todolistId))
                        dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
                    }else {
                        handleServerAppError(dispatch, res.data)
                    }
        }catch (err){
            handleServerAppError(dispatch, err.message)
        }
    }
}
export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setAppStatus('loading'))
          const res = await todolistsAPI.createTodolist(title)
                    if(res.data.resultCode === 0) {
                        dispatch(setAppStatus('succeeded'))
                        dispatch(addTodolistAC(res.data.data.item))
                    }else {
                        handleServerAppError<{item: TodolistType}>(dispatch, res.data)
                    }
        } catch (err){
            handleServerNetworkError(dispatch, err.message)
        }
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            dispatch(setAppStatus('loading'))
           const res = await todolistsAPI.updateTodolist(id, title)
            if(res.data.resultCode === 0) {
                dispatch(setAppStatus('succeeded'))
                dispatch(changeTodolistTitleAC(id, title))
            }
        } catch (err){
            handleServerNetworkError(dispatch, err.message)
        }
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | SetAppStatus
    | SetAppError
    | ChangeTodolistEntityStatusActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
