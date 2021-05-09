import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterCase = 'all' | 'active' | 'completed';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

const App = () => {
    debugger
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactTS', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false},
    ])
    debugger
    const removeTask = (selectID: number) =>{
        debugger
        let filteredTasks = tasks.filter(t => t.id !== selectID);
        debugger
        setTasks(filteredTasks);
    }
    debugger
    let [filter, setFilter] = useState<filterCase>('all')
    debugger
    let tasksForTodoList = tasks
    debugger
    if(filter === 'active'){
        debugger
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }else if(filter === 'completed'){
        debugger
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    debugger
   const tasksFilter = (value: filterCase) => {
        debugger
        setFilter(value)
   }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodoList}
               removeTasks={removeTask}
                tasksFilter={tasksFilter}
            />
        </div>
    );
}

export default App;
