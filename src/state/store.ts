import {createStore, combineReducers, applyMiddleware} from 'redux'
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoListsData: todoListsReducer,
    tasksData: tasksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>
