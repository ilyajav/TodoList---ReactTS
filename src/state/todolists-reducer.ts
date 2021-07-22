import {FilterCase, TodoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    todoListID: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
    id: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todoListID: string,
    newTitle: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todoListID: string,
    filter: FilterCase
}

type TodolistActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType| ChangeTodoListFilterActionType



const initialState: TodoListsType[] = []

export const todoListsReducer = (state: TodoListsType[] = initialState, action: TodolistActionsType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const copyState = [...state]
            return copyState.filter(tl => tl.id !== action.todoListID)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodoListsType = {
                id: action.id,
                title: action.title,
                filter: 'all'
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

export const removeTodoLists = (todoListID: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID,
    }
}

export const addTodoLists = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        id: v1(),
    }
}

export const changeTodoListsTitle = (todoListID: string, newTitle: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID,
        newTitle,
    }
}

export const changeTodoListsFilter = (todoListID: string, filter: FilterCase): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID,
        filter,
    }
}
