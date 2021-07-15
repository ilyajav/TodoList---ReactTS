import React, {useCallback} from "react"
import {FilterCase, TaskType} from "./App";
import {AddItems} from "./AddItems";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[];
    removeTasks: (selectID: string, todoListID: string) => void;
    tasksFilter: (value: FilterCase, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void;
    changeStatus: (id: string, isDoneStatus: boolean, todoListID: string) => void;
    filter: FilterCase;
    id: string;
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void;
    changeTodoListTitle: (newTitle: string, todoListID: string) => void;
}

export const Todolist = React.memo<TodolistPropsType>(({title, tasks, removeTasks, tasksFilter, ...props}) => {


    const onTasksAllFilter = useCallback(() => tasksFilter('all', props.id), [tasksFilter, props.id])
    const onTasksActiveFilter = useCallback(() => tasksFilter('active', props.id), [tasksFilter, props.id])
    const onTasksCompletedFilter = useCallback(() => tasksFilter('completed', props.id), [tasksFilter, props.id])
    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
    const changeTodoListName = useCallback((newTitle: string) => props.changeTodoListTitle(props.id, newTitle), [props.id, props.changeTodoListTitle])

    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    } else if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={title} changeTitle={changeTodoListName}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton></h3>
            <AddItems addItem={addTask}/>
            <div>

                {
                    tasks.map(task => <Task
                        removeTasks={removeTasks}
                        changeStatus={props.changeStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        task={task}
                        todoListId={props.id}
                    />
                    )

                }

            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onTasksAllFilter}>All</Button>
                <Button color={"primary"}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onTasksActiveFilter}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onTasksCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
})
