import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItems} from "./AddItems";
import {AppBar, Toolbar, IconButton, Button, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons'
import {useDispatch, useSelector} from "react-redux";
import {
    addTasks,
    addTaskThunkCreator,
    changeTaskStatus,
    changeTasksTitle,
    deleteTaskThunkCreator, updateTaskStatusThunkCreator
} from "./state/tasks-reducer";
import {AppStateType} from "./state/store";
import {
    addTodoLists,
    changeTodoListsFilter,
    changeTodoListsTitle, fetchTodoListThunkCreator,
    FilterCase,
    removeTodoLists, TodoListsDomainType
} from "./state/todolists-reducer";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    useEffect(() =>{
        dispatch(fetchTodoListThunkCreator())
    }, [])

    const todoListsData = useSelector<AppStateType, TodoListsDomainType[]>(state => state.todoListsData)
    const tasksData = useSelector<AppStateType, TasksStateType>(state => state.tasksData)

    const dispatch = useDispatch()

    const removeTask = useCallback((selectID: string, todoListID: string) => {
           dispatch(deleteTaskThunkCreator(selectID, todoListID))
    },[dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskThunkCreator(title, todoListID))
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todoListID: string) => {
       dispatch(updateTaskStatusThunkCreator(todoListID, id, status))
    }, [dispatch])

    const tasksFilter = useCallback((value: FilterCase, todoListID: string) => {
        dispatch(changeTodoListsFilter(todoListID, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
       dispatch(removeTodoLists(todoListID))
    }, [dispatch])

    const addNewTodoList = useCallback((title: string) => {
       dispatch(addTodoLists(title))
    }, [dispatch])


    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTasksTitle(taskID, newTitle, todoListID))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string, ) => {
       dispatch(changeTodoListsTitle(todoListID, newTitle))
    }, [dispatch])

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
