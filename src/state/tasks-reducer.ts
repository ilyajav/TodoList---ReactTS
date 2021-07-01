import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";


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
    isDone: boolean
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

export const tasksReducer = (state: TasksStateType, action: ActionCreatorTypes): TasksStateType => {
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
            const newTask: TaskType = {
                id: newTaskID,
                title: action.title,
                isDone: false
            }
            copyState[action.todoListID] = [newTask, ...tasks]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            copyState[action.todoListID] = [...tasks]
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.newTitle
            }
            copyState[action.todoListID] = [...tasks]
            return copyState
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


export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID
    }
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todoListID
    }
}

export const changeTaskStatusAC = (taskID: string, todoListID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        todoListID,
        isDone
    }
}

export const changeTaskTitleAC = (taskID: string, todoListID: string, newTitle: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskID,
        todoListID,
        newTitle
    }
}