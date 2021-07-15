import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListID_1, todoListID_2} from "./todolists-reducer";

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


const initialState: TasksStateType = {
    [todoListID_1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactTS', isDone: false},
    ],
    [todoListID_2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Bread', isDone: false},
        {id: v1(), title: 'Sugar', isDone: false},
    ]
}

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
            const newTask: TaskType = {
                id: newTaskID,
                title: action.title,
                isDone: false
            }
            copyState[action.todoListID] = [newTask, ...tasks]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone}
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

export const changeTaskStatus = (taskID: string, todoListID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        todoListID,
        isDone,
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
