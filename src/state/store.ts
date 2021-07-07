import {createStore, combineReducers} from 'redux'
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todoListsData: todoListsReducer,
    tasksData: tasksReducer,
})

export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>
