import {combineReducers, createStore} from "redux";
import {AppStateType} from "../state/store";
import {v1} from "uuid";
import {Provider} from "react-redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todolists-reducer";

const rootReducer = combineReducers({
    tasksData: tasksReducer,
    todoListsData: todoListsReducer,
})

const initialGlobalState = {
    todoListsData: [
        {id: "todoListID1", title: "What to learn", filter: "all"},
        {id: "todoListID2", title: "What to buy", filter: "all"}
    ] ,
    tasksData: {
        ["todoListID1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        ["todoListID2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
