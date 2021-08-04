import {TasksStateType} from "../App";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppStateType} from "./store";

type SetTaskActionType = ReturnType<typeof setTasks>
type RemoveTaskActionType = ReturnType<typeof removeTasks>
type AddTasksActionType = ReturnType<typeof addTasks>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
type ChangeTaskTitleActionType = ReturnType<typeof changeTasksTitle>

type ActionCreatorTypes =
    RemoveTaskActionType
    | AddTasksActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTaskActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionCreatorTypes): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":{
            const copyState = {...state}
            copyState[action.todoListId] = action.tasks
            return copyState
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) =>{
                  stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            copyState[action.todoListID] = [...filteredTasks]
            return copyState
        }
        case "ADD-TASK": {
            const copyState = {...state}
            const tasks = copyState[action.task.todoListId]
            copyState[action.task.todoListId] = [action.task, ...tasks]
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

export const removeTasks = (taskID: string, todoListID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID,
    } as const
}

export const addTasks = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        task,
    } as const
}

export const changeTaskStatus = (taskID: string, todoListID: string, status: TaskStatuses) => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        todoListID,
        status,
    } as const
}

export const changeTasksTitle = (taskID: string, todoListID: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskID,
        todoListID,
        newTitle,
    } as const
}

export const setTasks = (tasks: TaskType[], todoListId: string) =>{
    return{
        type: 'SET-TASKS',
        tasks,
        todoListId,
    } as const
}

export const fetchTasksThunkCreator = (todoListId: string) => (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todoListId)
        .then(res =>{
            dispatch(setTasks(res.data.items, todoListId))
        })
}

export const deleteTaskThunkCreator = (taskId: string, todoListId: string) => (dispatch: Dispatch) =>{
    todoListsAPI.deleteTask(todoListId, taskId)
        .then(res =>{
            dispatch(removeTasks(taskId, todoListId))
        })
}

export const addTaskThunkCreator = (title: string, todoListId: string) => (dispatch: Dispatch) =>{
     todoListsAPI.createTask(todoListId, title)
         .then(res =>{
             dispatch(addTasks(res.data.data.item))
         })
}

export const updateTaskStatusThunkCreator = (todoListId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppStateType) =>{
    const appState = getState()
    const allTasks = appState.tasksData
    const tasksForClickedTodo = allTasks[todoListId]
    const clickedTask = tasksForClickedTodo.find(t => t.id === taskId)

    if(clickedTask){
        const model: UpdateTaskModelType = {
            title: clickedTask.title,
            status,
            priority: clickedTask.priority,
            description: clickedTask.description,
            startDate: clickedTask.startDate,
            deadline: clickedTask.deadline,
    }
        todoListsAPI.updateTask(todoListId, taskId, model)
            .then(res => {
                dispatch(changeTaskStatus(taskId, todoListId, status))
            })
    }
}
