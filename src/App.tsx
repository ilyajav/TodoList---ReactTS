import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItems} from "./AddItems";
import {AppBar, Toolbar, IconButton, Button, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons'


export type FilterCase = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodoListsType = {
    id: string
    title: string
    filter: FilterCase
}

type TasksStateType = {
    [key: string]: TaskType[]
}

const App = () => {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoList] = useState<TodoListsType[]>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
    })

    const removeTask = (selectID: string, todoListID: string) => {
        const todoList = tasks[todoListID]
        tasks[todoListID] = todoList.filter(t => t.id !== selectID)
        setTasks({...tasks})
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        const todoList = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoList]
        setTasks({...tasks})
    }

    const changeStatus = (id: string, isDoneStatus: boolean, todoListID: string) => {
        const todoList = tasks[todoListID]
        const task = todoList.find(t => t.id === id)
        if (task) {
            task.isDone = isDoneStatus
            setTasks({...tasks})
        }
    }

    const tasksFilter = (value: FilterCase, todoListID: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }

    const removeTodoList = (todoListID: string) => {
        const newTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        delete tasks[todoListID]
        setTodoList([...newTodoLists])
    }

    const addNewTodoList = (title: string) => {
        const newTodoListID = v1();
        const newTodoList: TodoListsType = {
            id: newTodoListID,
            title,
            filter: 'all'
        }
        setTodoList([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


    const changeTaskTitle = (taskID: string, newTitle: string, todoListID: string) => {
        const todoListTask = tasks[todoListID]
        const task = todoListTask.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const changeTodoListTile = (newTitle: string, todoListID: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoList([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h5">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={3} style={{padding: '20px'}}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                    <Typography variant={'h6'} style={{marginLeft: '12px', paddingBottom: '15'}}>
                        Add new TodoList
                        <AddItems addItem={addNewTodoList}/>
                    </Typography>
                    </Grid>
                    {
                        todoLists.map(tl => {

                            let tasksForTodoList = tasks[tl.id]

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            } else if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{ padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    removeTasks={removeTask}
                                    tasksFilter={tasksFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTile={changeTodoListTile}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
);
}

export default App;
