import {combineReducers, createStore} from "redux";
import {AppStateType} from "../state/store";
import {Provider} from "react-redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasksData: tasksReducer,
    todoListsData: todoListsReducer,
})

const initialGlobalState = {
    todoListsData: [
        {id: "todoListID1", title: "What to learn",  addedDate: '', order: 0, filter: 'all'},
        {id: "todoListID2", title: "What to buy",  addedDate: '', order: 0, filter: 'all'}
    ] ,
    tasksData: {
        ["todoListID1"]: [
            {  description: '',
                title: 'task1',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',},
            {  description: '',
                title: 'task2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',},
        ],
        ["todoListID2"]: [
            {  description: '',
                title: 'task2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: '',},
            {  description: '',
                title: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
