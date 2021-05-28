import React, {KeyboardEvent, ChangeEvent, FC, useState} from "react"
import {FilterCase, TaskType} from "./App";

type PropsType = {
    title: string;
    tasks: TaskType[];
    removeTasks: (selectID: string, todoListID: string) => void;
    tasksFilter: (value: FilterCase, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void;
    changeStatus: (id: string, isDoneStatus: boolean, todoListID: string) => void;
    filter: FilterCase;
    id: string;
    removeTodoList: (todoListID: string) => void
}

export const Todolist: FC<PropsType> = ({title, tasks, removeTasks, tasksFilter, ...props}) => {
    const [newTitleTask, setNewTitleTask] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onTasksAllFilter = () => tasksFilter('all', props.id)
    const onTasksActiveFilter = () => tasksFilter('active', props.id)
    const onTasksCompletedFilter = () => tasksFilter('completed', props.id)
    const deleteTodoList = () => props.removeTodoList(props.id)

    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleTask(e.currentTarget.value)
        setError(false)
    }

    const onButtonClick = () => {
        if (newTitleTask.trim() !== '') {
            props.addTask(newTitleTask.trim(), props.id);
            setNewTitleTask('');
        } else {
            setError(true)
        }
    }

    const onEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onButtonClick()
        }
    }


    return (
        <div>
            <h3>{title} <button onClick={deleteTodoList}>x</button></h3>
            <div>
                <input value={newTitleTask} onChange={onTaskTitleChange}
                       onKeyPress={onEnterClick} className={error ? 'error' : ''}/>
                <button onClick={onButtonClick}>+</button>
                {error && <div className={'error-text'}>Field is required</div>}
            </div>
            <ul>

                {
                    tasks.map(task => {
                        const onRemoveTasks = () => {
                            removeTasks(task.id, props.id)
                        };
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeStatus}/>
                            <span className={task.isDone ? 'check-isDone' : ''}>{task.title}</span>
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