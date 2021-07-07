import {TodoListsType} from "../App";
import {v1} from "uuid";
import {
    addTodoLists,
    changeTodoListsFilter,
    changeTodoListsTitle,
    removeTodoLists,
    todoListsReducer
} from "./todolists-reducer";


let todoListID_1: string
let todoListID_2: string
let startState: TodoListsType[]

beforeEach(() => {
    todoListID_1 = v1()
    todoListID_2 = v1()
    startState = [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoLists(todoListID_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)
})

test('correct todolist should be added', () => {

    const endState = todoListsReducer(startState, addTodoLists('newTodoList'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('newTodoList')
})

test('correct todolist should change its name', () => {

    const endState = todoListsReducer(startState, changeTodoListsTitle(todoListID_1, 'changedName'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('changedName')
})

test('correct todolist should change its filter', () => {

    const endState = todoListsReducer(startState, changeTodoListsFilter(todoListID_1, 'active'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')
})
