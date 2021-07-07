import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItems} from "./AddItems";
import {AppBar, Toolbar, IconButton, Button, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons'
import {useDispatch, useSelector} from "react-redux";
import {addTasks, changeTaskStatus, changeTasksTitle, removeTasks} from "./state/tasks-reducer";
import {AppStateType} from "./state/store";
import {addTodoLists, changeTodoListsFilter, changeTodoListsTitle, removeTodoLists} from "./state/todolists-reducer";

export type FilterCase = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodoListsType = {
    id: string
    title: string
    filter: FilterCase
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const todoListsData = useSelector<AppStateType, TodoListsType[]>(state => state.todoListsData)
    const tasksData = useSelector<AppStateType, TasksStateType>(state => state.tasksData)

    const dispatch = useDispatch()

    const removeTask = (selectID: string, todoListID: string) => {
        dispatch(removeTasks(selectID, todoListID))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTasks(title, todoListID))
    }

    const changeStatus = (id: string, isDoneStatus: boolean, todoListID: string) => {
       dispatch(changeTaskStatus(id, todoListID, isDoneStatus))
    }

    const tasksFilter = (value: FilterCase, todoListID: string) => {
        dispatch(changeTodoListsFilter(todoListID, value))
    }

    const removeTodoList = (todoListID: string) => {
       dispatch(removeTodoLists(todoListID))
    }

    const addNewTodoList = (title: string) => {
       dispatch(addTodoLists(title))
    }


    const changeTaskTitle = (taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTasksTitle(taskID, newTitle, todoListID))
    }

    const changeTodoListTitle = (newTitle: string, todoListID: string) => {
       dispatch(changeTodoListsTitle(newTitle, todoListID))
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
                        todoListsData.map(tl => {

                            let tasksForTodoList = tasksData[tl.id]

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            } else if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }

                            return <Grid item key={tl.id}>
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
                                    changeTodoListTitle={changeTodoListTitle}
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
