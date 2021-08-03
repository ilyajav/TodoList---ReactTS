import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TasksType} from "../api/task-api";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskID: string,
    todoListID: string
}

type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoListID: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskID: string,
    todoListID: string,
    status: TaskStatuses,
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string,
    todoListID: string,
    newTitle: string
}


type ActionCreatorTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionCreatorTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            copyState[action.todoListID] = [...filteredTasks]
            return copyState
        }
        case "ADD-TASK": {
            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const newTaskID = v1()
            const newTask: TasksType = {
                id: newTaskID,
                title: action.title,
                description: '',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                order: 0,
                completed: false,
                addedDate: Date.now().toString(),
                todoListId: action.todoListID,
                startDate: '',
                deadline: '',
             }
            copyState[action.todoListID] = [newTask, ...tasks]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskID
                    ? {...t, status: action.status}
                    : t
                );
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskID
                    ? {...t, title: action.newTitle}
                    : t
                );
            return ({...state})
        }
        case "ADD-TODOLIST":{
            const copyState = {...state}
            copyState[action.id] = []
            return copyState
        }
        case 'REMOVE-TODOLIST':{
            const copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default: {
            return state
        }
    }
}

export const removeTasks = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID,
    }
}

export const addTasks = (title: string, todoListID: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todoListID,
    }
}

export const changeTaskStatus = (taskID: string, todoListID: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        todoListID,
        status,
    }
}

export const changeTasksTitle = (taskID: string, todoListID: string, newTitle: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskID,
        todoListID,
        newTitle,
    }
}
