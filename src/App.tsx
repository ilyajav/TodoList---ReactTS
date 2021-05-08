import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

const task1: TaskType[] = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactTS', isDone: false},
]

const task2: TaskType[] = [
    {id: 1, title: 'Hello world', isDone: true},
    {id: 2, title: 'I am Happy', isDone: false},
    {id: 3, title: 'Yo', isDone: false},
]



const App = () => {
    return (
        <div className="App">
            <Todolist title='What to learn' tasks={task1} />
            <Todolist title='Songs' tasks={task2} />
        </div>
    );
}

export default App;
