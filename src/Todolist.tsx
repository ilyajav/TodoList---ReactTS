import React, {FC} from "react"
import {filterCase, TaskType} from "./App";

type PropsType = {
    title: string;
    tasks: TaskType[]
    removeTasks: (selectID: number) => void;
    tasksFilter: (value: filterCase) => void
}

export const Todolist: FC<PropsType> = ({title, tasks, removeTasks, tasksFilter}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks
                        .map((task) =>
                            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => {removeTasks(task.id)}}>X</button>
                            </li>)
                }
            </ul>
            <div>
                <button onClick={() => {tasksFilter('all')}}>All</button>
                <button onClick={() => {tasksFilter('active')}}>Active</button>
                <button onClick={() => {tasksFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}