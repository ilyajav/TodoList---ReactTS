import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {
    setAppError,
    SetAppError,
    setAppStatus,
    SetAppStatus
} from "../../app/app-reducer";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error-utils";

 // Сделать пробелы между импортами

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }

    // Вынести название кейсов в контсанты
}

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
    // Вынести название типа в контсанту
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
     // Вынести название типа в контсанту
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
     // Вынести название типа в контсанту
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
     // Вынести название типа в контсанту

export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus('loading'))
         // Вынести строку в контсанту
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        const action = setTasksAC(tasks, todolistId)
        dispatch(action)
        dispatch(setAppStatus('succeeded'))
        // Вынести строку в контсанту
    } catch (err) {
        handleServerNetworkError(dispatch, err.message)
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus('loading'))
        // Вынести строку в контсанту
        const res = await todolistsAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus('succeeded'))
            // Вынести строку в контсанту
            dispatch(removeTaskAC(taskId, todolistId))
        }
    } catch (err) {
        handleServerNetworkError(dispatch, err.message)
    }
}

enum ResponseStatuses {
    'succeeded' = 0,
    'error' = 1,
    captcha = 10
}

// удалить неиспользованный enum

export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus('loading'))
        // Вынести текст в контсанту
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus('succeeded'))
            // Вынести текст в контсанту
            dispatch(addTaskAC(res.data.data.item))
        } else {
            handleServerAppError<{ item: TaskType }>(dispatch, res.data)
        }
    } catch (err) {
        handleServerNetworkError(dispatch, err.message)
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatus('loading'))
        // Вынести текст в контсанту
        try {
            const state = getState()
            const task = state.tasks[todolistId].find(t => t.id === taskId)
            if (!task) {
                console.warn('task not found in the state')
                // Вынести текст в контсанту
                return
            }
            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...domainModel
            }
            const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
            if(res.data.resultCode === 0){
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
                dispatch(setAppStatus('succeeded'))
                // Вынести текст в контсанту
            }else {
                dispatch(setAppError('Some error occurred'))
                // Вынести текст в контсанту
            }
            dispatch(setAppStatus('failed'))
            // Вынести текст в контсанту

        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetAppStatus
    | SetAppError
