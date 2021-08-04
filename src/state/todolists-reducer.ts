import {v1} from "uuid";
import {Dispatch} from "redux";
import {todoListsAPI, TodoListType} from "../api/todolist-api";

export type SetTodoListsActionType = ReturnType<typeof setTodoLists>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListsTitle>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoLists>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListsFilter>
export type AddTodoListActionType = ReturnType<typeof addTodoLists>

type TodolistActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType

export type FilterCase = 'all' | 'active' | 'completed';

export type TodoListsDomainType = TodoListType & {
    filter: FilterCase
}


const initialState: TodoListsDomainType[] = []

export const todoListsReducer = (state: TodoListsDomainType[] = initialState, action: TodolistActionsType): TodoListsDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
           return  action.todoLists.map((tl =>{
               return {...tl, filter: 'all'}
           }))
        }
        case 'REMOVE-TODOLIST': {
            const copyState = [...state]
            return copyState.filter(tl => tl.id !== action.todoListID)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodoListsDomainType = {
                id: action.id,
                title: action.title,
                order: 0,
                addedDate: Date.now().toString(),
                filter: 'all',
            }
            return [...state, newTodoList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.todoListID)
            if (todoList) {
                todoList.title = action.newTitle
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.todoListID)
            if(todoList){
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodoLists = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID,
    } as const
}

export const addTodoLists = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        id: v1(),
    } as const
}

export const changeTodoListsTitle = (todoListID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID,
        newTitle,
    } as const
}

export const changeTodoListsFilter = (todoListID: string, filter: FilterCase) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID,
        filter,
    } as const
}

export const setTodoLists = (todoLists: TodoListType[]) =>{
    return{
        type: 'SET-TODOLISTS',
        todoLists,
    } as const
}

export const fetchTodoListThunkCreator = () => (dispatch: Dispatch) =>{
           todoListsAPI.getTodoLists()
               .then(res =>{
                   dispatch(setTodoLists(res.data))
               })
}
