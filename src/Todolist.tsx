import React, {KeyboardEvent, ChangeEvent, FC, useState} from "react"
import {filterCase, TaskType} from "./App";

type PropsType = {
    title: string;
    tasks: TaskType[]
    removeTasks: (selectID: string) => void;
    tasksFilter: (value: filterCase) => void;
    addTask: (title: string) => void;
}

export const Todolist: FC<PropsType> = ({title, tasks, removeTasks, tasksFilter, ...props}) => {
    const [newTitleTask, setNewTitleTask] = useState()

    const onTasksAllFilter = () => {
        tasksFilter('all')
    }
    const onTasksActiveFilter = () => {
        tasksFilter('active')
    }
    const onTasksCompletedFilter = () => {
        tasksFilter('completed')
    }
    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleTask(e.currentTarget.value)
    }
    const onButtonClick = () => {
        props.addTask(newTitleTask);
        setNewTitleTask('')
    }
    const onEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTitleTask)
            setNewTitleTask('')
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitleTask} onChange={onTaskTitleChange} onKeyPress={onEnterClick}/>
                <button onClick={onButtonClick}>+</button>
            </div>
            <ul>

                {
                    tasks.map(task => {
                        const onRemoveTasks = () => {
                            removeTasks(task.id)
                        }
                        return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onRemoveTasks}>X</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button onClick={onTasksAllFilter}>All</button>
                <button onClick={onTasksActiveFilter}>Active
                </button>
                <button onClick={onTasksCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}