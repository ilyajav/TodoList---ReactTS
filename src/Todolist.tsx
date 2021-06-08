import React, {ChangeEvent, FC} from "react"
import {FilterCase, TaskType} from "./App";
import {AddItems} from "./AddItems";
import {EditableSpan} from "./EditableSpan";

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
    changeTodoListTile: (newTitle: string, todoListID: string) => void;
}

export const Todolist: FC<TodolistPropsType> = ({title, tasks, removeTasks, tasksFilter, ...props}) => {

    const onTasksAllFilter = () => tasksFilter('all', props.id)
    const onTasksActiveFilter = () => tasksFilter('active', props.id)
    const onTasksCompletedFilter = () => tasksFilter('completed', props.id)
    const deleteTodoList = () => props.removeTodoList(props.id)
    const addTask = (title: string)=> props.addTask(title, props.id)
    const changeTodoListName = (newTitle:string) => props.changeTodoListTile(newTitle, props.id)


    return (
        <div>
            <h3><EditableSpan title={title} changeTitle={changeTodoListName} /> <button onClick={deleteTodoList}>x</button></h3>
            <AddItems addItem={addTask}/>
            <ul>

                {
                    tasks.map(task => {
                        const onRemoveTasks = () => {
                            removeTasks(task.id, props.id)
                        };
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        const changeTaskName = (newTitle: string) =>{
                            props.changeTaskTitle(task.id, newTitle, props.id)
                        }
                        return <li key={task.id} className={task.isDone ? 'check-isDone' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeStatus}/>
                            <EditableSpan title={task.title} changeTitle={changeTaskName}/>
                            <button onClick={onRemoveTasks}>X</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={onTasksAllFilter}>All</button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={onTasksActiveFilter}>Active</button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={onTasksCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}