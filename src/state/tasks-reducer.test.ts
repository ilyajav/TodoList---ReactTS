import {changeTaskStatus, changeTasksTitle, removeTasks, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodoLists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(()=>{
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo1',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            },
            {
                id: "2",
                title: "JS",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo1',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            },
            {
                id: "3",
                title: "React",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo1',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            },
            {
                id: "2",
                title: "milk",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            },
            {
                id: "3",
                title: "tea",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTasks("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo1',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            },
            {
                id: "2",
                title: "JS",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo1',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            },
            {
                id: "3",
                title: "React",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo1',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            }
    ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            },
            {
                id: "3",
                title: "tea",
                deadline: '',
                startDate: '',
                description: '',
                todoListId: 'todo2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0
            }
        ]
    });

});


test('status of specified task should be changed', () => {

    const action = changeTaskStatus("2", "todolistId2", TaskStatuses.Completed);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(2)
});


test('title of specified task should be changed', () => {

    const action = changeTasksTitle("1", "todolistId1", 'Cars');

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].title).toBe('bread');
    expect(endState["todolistId1"][0].title).toBe('Cars');
});

test('new property with new array should be added when new todolist is added', () => {

    const action = addTodoLists("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
