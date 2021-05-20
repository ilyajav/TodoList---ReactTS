import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterCase = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const App = () => {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactTS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    const removeTask = (selectID: string) => {
        let filteredTasks = tasks.filter(t => t.id !== selectID);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterCase>('all')
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    const tasksFilter = (value: FilterCase) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        const newDataTasks = [newTask, ...tasks]
        setTasks(newDataTasks)
    }

    const changeStatus = (id: string, isDoneStatus: boolean) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDoneStatus
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodoList}
                removeTasks={removeTask}
                tasksFilter={tasksFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
