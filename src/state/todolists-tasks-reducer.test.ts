import {TasksStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodoLists, removeTodoLists, TodoListsDomainType, todoListsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


test('ids should be equals', () => {

    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListsDomainType> = [];

    const action = addTodoLists("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodoLists).toBe(action.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                order: 0,
                addedDate: '',
                description: '',
                deadline: '',
                startDate: '',
                todoListId: '2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
            },
            {
                id: "2",
                title: "JS",
                order: 0,
                addedDate: '',
                description: '',
                deadline: '',
                startDate: '',
                todoListId: '2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,

            },
            {
                id: "3",
                title: "React",
                order: 0,
                addedDate: '',
                description: '',
                deadline: '',
                startDate: '',
                todoListId: '2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                order: 0,
                addedDate: '',
                description: '',
                deadline: '',
                startDate: '',
                todoListId: '2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
            },
            {
                id: "2",
                title: "milk",
                order: 0,
                addedDate: '',
                description: '',
                deadline: '',
                startDate: '',
                todoListId: '2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
            },
            {
                id: "3",
                title: "tea",
                order: 0,
                addedDate: '',
                description: '',
                deadline: '',
                startDate: '',
                todoListId: '2',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
            }
        ]
    };

    const action = removeTodoLists("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});
